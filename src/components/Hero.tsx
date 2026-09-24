"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Swap in a real cut once one exists — the hero prefers video and only
// falls back to a slow-zoom still when this is null.
const heroVideoSrc: string | null = null;

const trailerUrl = "https://youtu.be/gxszHktHC4o";
const heroStill = "/images/hero-critic.png";

// Frames stacked inside the intro box, each opening out from its centre.
// After the last one, the real hero opens in the same box and grows to fill
// the screen, so the intro hands off to the page without a cut.
const introFrames = [
  "/images/scene-nula-exterior.png",
  "/images/scene-morning-room.png",
  "/images/scene-signal-night.png",
  "/images/scene-tasting-overhead.png",
  "/images/scene-nula-interior.png",
  "/images/scene-aeter-restaurant.png",
  "/images/scene-tasting-sweets.png",
];
const BOX_ASPECT = 1.9;

// Only the first full page load gets the intro — client-side trips back to
// the homepage skip straight to the hero.
let introPlayed = false;

export default function Hero() {
  const [showIntro, setShowIntro] = useState(() => !introPlayed);
  const introRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!showIntro) return;

    const intro = introRef.current;
    const hero = heroRef.current;
    const root = document.documentElement;
    const skip =
      !intro ||
      !hero ||
      window.location.hash !== "" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      introPlayed = true;
      setShowIntro(false);
      return;
    }

    window.scrollTo({ top: 0, behavior: "instant" });
    root.dataset.intro = "playing";
    document.body.style.overflow = "hidden";

    const box = intro.querySelector<HTMLElement>("[data-box]")!;
    const fill = intro.querySelector<HTMLElement>("[data-fill]")!;
    const frames = Array.from(intro.querySelectorAll<HTMLElement>("[data-frame]"));
    const risers = [
      ...Array.from(document.querySelectorAll<HTMLElement>("header [data-intro-rise]")),
      ...Array.from(hero.querySelectorAll<HTMLElement>("[data-intro-rise]")),
    ].filter((el) => el.offsetParent !== null);
    const faders = Array.from(document.querySelectorAll<HTMLElement>("[data-intro-fade]"));

    // Box size, and the hero's transform that shows the whole page shrunk
    // down into exactly that box.
    const vw = window.innerWidth;
    const boxW = Math.min(520, Math.max(240, vw * 0.26));
    const boxH = boxW / BOX_ASPECT;
    const { width: heroW, height: heroH } = hero.getBoundingClientRect();
    const scale = boxW / heroW;
    const insetY = Math.max(0, (heroH - boxH / scale) / 2);

    gsap.set(risers, { autoAlpha: 0, y: 36 });
    gsap.set(faders, { autoAlpha: 0 });
    // Frames open from their centre. The clip is driven through a proxy because
    // browsers normalise `inset(50% 50% 50% 50%)` to `inset(50%)`, and GSAP
    // would then tween only the first value (a bottom-up wipe).
    const openFrame = (frame: HTMLElement, duration: number) => {
      const state = { v: 50 };
      return gsap.to(state, {
        v: 0,
        duration,
        ease: "expo.out",
        onUpdate: () => {
          frame.style.clipPath = `inset(${state.v}% ${state.v}% ${state.v}% ${state.v}%)`;
        },
      });
    };
    const [firstFrame, ...restFrames] = frames;
    gsap.set(hero, {
      zIndex: 80,
      pointerEvents: "none",
      scale,
      transformOrigin: "50% 50%",
      clipPath: `inset(${heroH / 2}px ${heroW / 2}px)`,
    });

    const release = () => {
      gsap.set(hero, { clearProps: "zIndex,pointerEvents,transform,clipPath,transformOrigin" });
      intro.style.visibility = "hidden";
    };
    const finish = () => {
      introPlayed = true;
      gsap.set([...risers, ...faders], { clearProps: "opacity,visibility,transform" });
      delete root.dataset.intro;
      document.body.style.overflow = "";
      setShowIntro(false);
    };

    const tl = gsap.timeline({ paused: true, onComplete: finish });
    // The white square fills, then the first photo takes over as it grows —
    // the box is never seen as a large white rectangle.
    tl.to(fill, { scaleY: 1, duration: 0.8, ease: "power2.inOut" }, 0.2)
      .addLabel("grow", "+=0.15")
      .set(firstFrame, { clipPath: "inset(0% 0% 0% 0%)" }, "grow")
      .fromTo(firstFrame, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: "none" }, "grow")
      .to(box, { width: boxW, height: boxH, duration: 0.9, ease: "expo.inOut" }, "grow")
      .from(
        firstFrame.querySelector("img"),
        { scale: 1.3, duration: 1.1, ease: "expo.out" },
        "grow"
      )
      .addLabel("stack", "-=0.05");
    restFrames.forEach((frame, i) => {
      tl.add(openFrame(frame, 0.7), `stack+=${i * 0.2}`).from(
        frame.querySelector("img"),
        { scale: 1.4, duration: 0.9, ease: "expo.out" },
        `stack+=${i * 0.2}`
      );
    });
    tl.to(
        hero,
        { clipPath: `inset(${insetY}px 0px)`, duration: 0.7, ease: "expo.out" },
        `stack+=${restFrames.length * 0.2}`
      )
      .to(hero, {
        scale: 1,
        clipPath: "inset(0px 0px)",
        duration: 1.3,
        ease: "expo.inOut",
        delay: 0.2,
      })
      .add(release)
      .to(faders, { autoAlpha: 1, duration: 0.8, ease: "power2.out" })
      .to(
        risers,
        { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.12 },
        "<"
      );

    // Hold on black until the frames have loaded (or a short timeout passes).
    const imgs = [...intro.querySelectorAll("img"), ...hero.querySelectorAll("img")];
    const loaded = Promise.all(
      imgs.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => undefined)))
    );
    const timeout = new Promise((r) => setTimeout(r, 2500));
    let cancelled = false;
    Promise.race([loaded, timeout]).then(() => {
      if (!cancelled) tl.play();
    });

    return () => {
      cancelled = true;
      tl.kill();
      gsap.set(hero, { clearProps: "zIndex,pointerEvents,transform,clipPath,transformOrigin" });
      gsap.set([...risers, ...faders], { clearProps: "opacity,visibility,transform" });
      delete root.dataset.intro;
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  return (
    <>
      {showIntro && (
        <div
          ref={introRef}
          aria-hidden
          className="fixed inset-0 z-[70] overflow-hidden bg-black"
        >
          <div
            data-box
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          >
            <div
              data-fill
              className="absolute inset-0 origin-bottom bg-white"
              style={{ transform: "scaleY(0)" }}
            />
            {introFrames.map((src) => (
              <div
                key={src}
                data-frame
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: "inset(50% 50% 50% 50%)" }}
              >
                <Image src={src} alt="" fill priority sizes="30vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <a
        ref={heroRef}
        href={trailerUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        data-cursor-label="Watch full film"
        aria-label="Watch the full film on YouTube"
        className="snap-section relative flex h-[100svh] min-h-[560px] w-full flex-col justify-between overflow-hidden bg-stage"
      >
        <div className="absolute inset-0">
          {heroVideoSrc ? (
            <video
              src={heroVideoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={heroStill}
              alt="Jonah Keller, reviewing dinner through the AETER interface from the back seat of a car"
              fill
              priority
              sizes="100vw"
              className="animate-kenburns object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto mt-24 w-full max-w-[1600px] px-4 sm:mt-28 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <h1
              data-intro-rise
              className="font-display shrink-0 text-3xl uppercase leading-[0.92] tracking-tight text-stage-text sm:text-5xl lg:text-6xl"
            >
              The Critic
            </h1>
            <p
              data-intro-rise
              className="max-w-2xl text-[14px] leading-snug text-stage-text-soft sm:text-[15px]"
            >
              A film about a food critic who writes with the help of AI—
              <br />
              and begins to lose track of where his own judgment ends and its suggestions begin.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mb-10 flex w-full max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <p
            data-intro-rise
            className="text-[12px] uppercase tracking-[0.2em] text-stage-text-soft"
          >
            A Film by Jein Kim
          </p>
          <span
            data-intro-rise
            className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-stage-text-soft"
          >
            Scroll
            <span aria-hidden className="text-accent">+</span>
          </span>
        </div>
      </a>
    </>
  );
}
