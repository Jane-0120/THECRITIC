import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import CharacterShowcase from "@/components/CharacterShowcase";
import ScenesShowcase from "@/components/ScenesShowcase";
import ToolMarquee, { type ToolItem } from "@/components/ToolMarquee";
import PagedScroll from "@/components/PagedScroll";
import { higgsfieldProjectUrl, site } from "@/data/site";

export const metadata: Metadata = {
  title: site.shortName,
  description: site.description,
};

const AETER_BRAND_ASPECT = "2324/1080";
const HIGGSFIELD_PREVIEW_ASPECT = "3392/1756";
const instagramUrl =
  "https://www.instagram.com/aeter.ai?stkn=MW9xb3B6Y3Y0cGl6bQ%3D%3D&utm_source=qr";

const narrativeParagraphs = [
  "Food critic Jonah Keller visits NULA, a restaurant that refuses to participate in the AI rating system AETER. Its chef, Marco, still keeps a column Jonah wrote years ago. But the critic who returns now wears smart glasses and assesses the meal with his AI assistant, VERA.",
  "Across seven courses, VERA identifies ingredients and suggests sentences for the review. Jonah saves them instead of writing his own notes. Even a personal card from Marco and a dish of figs become material for the system to interpret.",
  "Back home, Jonah reads the draft VERA has written and asks what the fig tasted like—to him. VERA can describe the food and recall his physical response, but it cannot tell him what the experience meant. After a pause, Jonah submits the review without changing its conclusion.",
];

const processSteps = [
  {
    title: "Research & Script",
    body: "Claude, ChatGPT, and Perplexity supported worldbuilding, script development, and prompts.",
  },
  {
    title: "Visual Production",
    body: "Higgsfield led film production, with Midjourney and GPT Image supporting design and refinement.",
  },
  {
    title: "Sound & Final Edit",
    body: "ElevenLabs provided background music and character voices for the final film.",
  },
];

const aiTools: ToolItem[] = [
  { name: "Claude", logo: "/images/logos/claude.jpg" },
  { name: "ChatGPT", logo: "/images/logos/chatgpt.jpg" },
  { name: "Perplexity", logo: "/images/logos/perplexity.avif" },
  { name: "Gemini", logo: "/images/logos/gemini.jpeg" },
  { name: "Google AI Studio", logo: "/images/logos/google-ai-studio.jpeg" },
  { name: "Midjourney", logo: "/images/logos/midjourney.png" },
  { name: "GPT Image", logo: "/images/logos/chatgpt.jpg" },
  { name: "Higgsfield", logo: "/images/logos/higgsfield.png" },
  { name: "ElevenLabs", logo: "/images/logos/elevenlabs.png" },
];

export default function Home() {
  return (
    <PagedScroll>
      <div>
        <Hero />

        <section
          id="story"
          className="snap-section relative flex min-h-[100svh] flex-col justify-center py-24 sm:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6">
            <Reveal>
              <SectionLabel label="Story" />
            </Reveal>
            <div className="mt-12 max-w-3xl">
              <Reveal duration={2400} delay={700} className="reveal-slow">
                <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">Context</p>
                <div className="mt-4 text-ink-soft">
                  <ScrollReveal baseOpacity={0.15} baseRotation={2} blurStrength={6}>
                    {"If AI can describe what we ate and how we felt, what remains the critic's job? THE CRITIC follows the small, ordinary decisions through which assistance becomes dependence. At its center is a question of authorship: who stands behind a judgment when someone else has supplied the words?"}
                  </ScrollReveal>
                </div>
              </Reveal>

              <Reveal duration={2400} delay={2700} className="reveal-slow">
                <p className="mt-12 text-[11px] uppercase tracking-[0.14em] text-ink-faint">Narrative</p>
                <div className="mt-4 space-y-6 text-ink-soft">
                  {narrativeParagraphs.map((paragraph, i) => (
                    <ScrollReveal key={i} baseOpacity={0.15} baseRotation={2} blurStrength={6}>
                      {paragraph}
                    </ScrollReveal>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          id="characters"
          className="snap-section relative flex min-h-[100svh] flex-col justify-center py-24 sm:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <SectionLabel label="Characters" />
                <Link
                  href="/characters"
                  data-cursor="hover"
                  className="group flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
                >
                  All characters
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </Reveal>
            <div className="mt-14">
              <CharacterShowcase />
            </div>
          </div>
        </section>

        <section id="scenes" className="snap-section relative">
          <ScenesShowcase
            header={
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <SectionLabel label="Scenes & Spaces" />
                  <Link
                    href="/scenes"
                    data-cursor="hover"
                    className="group flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
                  >
                    All scenes
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </Reveal>
            }
          />
        </section>

        <section
          id="aeter"
          className="snap-section relative flex h-[100svh] items-center justify-center overflow-hidden"
        >
          <div
            className="relative"
            style={{
              aspectRatio: AETER_BRAND_ASPECT,
              width: `min(100%, calc(100svh * ${AETER_BRAND_ASPECT}))`,
            }}
          >
            <Image
              src="/images/aeter-brand.png"
              alt="AETER campaign billboard, seen from a passing train: adaptive intelligence built for immersion"
              fill
              sizes="100vw"
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />

            <div className="absolute inset-0 mx-auto flex max-w-[1600px] flex-col justify-between px-4 py-8 sm:px-6 sm:py-10">
              <div>
                <SectionLabel label="AETER" />
              </div>

              <div className="flex justify-end pb-2 sm:pb-4">
                <div className="max-w-lg text-right">
                  <div className="text-stage-text-soft">
                    <ScrollReveal baseOpacity={0.15} baseRotation={2} blurStrength={6} textClassName="text-right">
                      {"AETER is the adaptive AI brand behind VERA, woven into the daily lives of millions. From everyday choices to professional judgment, it quietly shapes what a city trusts, values, and desires. For Jonah, it's the voice behind every verdict—and the intelligence shaping his taste before the first bite."}
                    </ScrollReveal>
                  </div>
                  <div className="mt-7 flex flex-wrap justify-end gap-3">
                    <span
                      title="No URL set yet."
                      className="inline-flex items-center gap-2 bg-stage-text px-6 py-2.5 text-[13px] uppercase tracking-[0.14em] text-stage opacity-90"
                    >
                      Learn about AETER
                      <span className="text-[11px] normal-case tracking-normal opacity-70">· pending</span>
                    </span>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="inline-flex items-center gap-2 border border-stage-text/50 bg-stage-text/10 px-6 py-2.5 text-[13px] uppercase tracking-[0.14em] text-stage-text backdrop-blur-sm transition-colors hover:bg-stage-text/20"
                    >
                      Instagram
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="process"
          className="snap-section relative flex min-h-[100svh] flex-col justify-center py-24 sm:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6">
            <Reveal>
              <SectionLabel label="Process" />
            </Reveal>

            <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <Reveal delay={100} className="flex flex-col items-start justify-between gap-10">
                <ol className="space-y-6 pt-2">
                  {processSteps.map((step, i) => (
                    <li key={step.title} className="flex gap-5">
                      <span className="text-[12px] text-ink-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[13px] uppercase tracking-[0.1em] text-ink">
                          {step.title}
                        </p>
                        <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-ink-soft">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <a
                  href={higgsfieldProjectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 border border-ink px-6 py-3 text-[13px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-[#D1FE16] hover:text-[#D1FE16]"
                >
                  View the Higgsfield project
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </Reveal>

              <Reveal delay={140}>
                <a
                  href={higgsfieldProjectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group relative block w-full overflow-hidden"
                  style={{ aspectRatio: HIGGSFIELD_PREVIEW_ASPECT }}
                >
                  <Image
                    src="/images/higgsfield-preview.png"
                    alt="The Higgsfield project used to produce this film's stills"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </a>
              </Reveal>
            </div>

            <div className="mt-16">
              <ToolMarquee items={aiTools} />
            </div>
          </div>
        </section>
      </div>
    </PagedScroll>
  );
}
