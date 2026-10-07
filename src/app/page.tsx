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
import { higgsfieldProjectUrl, site, trailerUrl } from "@/data/site";

export const metadata: Metadata = {
  title: site.shortName,
  description: site.description,
};

const HIGGSFIELD_PREVIEW_ASPECT = "3392/1756";
const instagramUrl =
  "https://www.instagram.com/aeter.ai?stkn=MW9xb3B6Y3Y0cGl6bQ%3D%3D&utm_source=qr";

const contextText =
  "AI가 일상에 깊이 스며들면서, 선택과 판단을 기술에 맡기는 일이 자연스러워지고 있다.\n본 프로젝트는 이러한 변화를 가까운 미래로 확장한 스페큘러티브 디자인 프로젝트이다.\n가상의 AI 브랜드 AETER와 AI 글래스, 이를 사용하는 음식 비평가의 이야기를 담은 단편 영화로 구성된다.";

const narrativeParagraphs = [
  "유명 음식 비평가 조나 켈러가 AI 평가 시스템을 거부하는 레스토랑 NULA를 찾는다. 셰프 마르코는 조나가 오래전 쓴 칼럼을 간직한 채 그를 맞지만, 돌아온 비평가의 눈앞에는 AI 어시스턴트 VERA가 있다. 일곱 코스가 나오는 동안 VERA는 재료를 분석하고 평가를 제안한다. 조나는 직접 메모하는 대신 완성된 문장들을 저장한다. 마르코가 건넨 개인적인 메시지도, 마지막 무화과 요리도 예외는 아니다. 식사를 마칠 즈음, 비평문에 필요한 말은 이미 갖춰져 있다.\n\n그러나 집에서 초안을 읽던 조나는 뜻밖의 질문에 막힌다. “그 무화과, 나한테는 무슨 맛이었지?” VERA는 맛의 특징과 그의 신체 반응을 기억하지만, 그에게 그 한입이 무엇이었는지는 답하지 못한다. 조나는 망설임 끝에 글을 제출한다. 이후 식사 중 글래스를 사용하는 모습이 온라인에 퍼지고, 다른 비평문에서 똑같은 표현이 발견되면서 그의 판단은 의심받기 시작한다. 편집자 레나가 마지막 코스를 자신의 말로 설명해보라고 하자, 조나는 답을 찾지 못한다. 비평문은 철회되고, 그는 습관처럼 안경으로 향하던 손을 멈춘다.\n누구보다 맛을 잘 설명하던 비평가에게, 이제 자신의 말이 필요하다.",
];

const aeterText =
  "영화 속에서 일상에 널리 보급된 AETER는 일상의 감각과 선택을 분석하고 판단을 돕는 가상의 AI 브랜드이다.\n스마트 글래스와 AI 어시스턴트 VERA로 경험과 신체 반응을 기록하고, 일정 관리부터 분석과 글쓰기까지 일상 전반을 지원한다.";

const processSteps = [
  {
    title: "Research & Script",
    body: "Claude, ChatGPT, Perplexity를 활용한 세계관·시나리오 구축 및 프롬프트 작성",
  },
  {
    title: "Visual Production",
    body: "Higgsfield 중심의 영상 제작, Midjourney·GPT Image를 활용한 디자인 및 디테일 보완",
  },
  {
    title: "Sound & Final Edit",
    body: "ElevenLabs를 활용한 배경 음악·캐릭터 목소리 제작 및 최종 영상 완성",
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
            <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,48rem)_minmax(0,1fr)] lg:gap-20">
            <div className="max-w-3xl">
              <Reveal duration={2400} delay={700} className="reveal-slow">
                <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">Context</p>
                <div className="mt-4 text-ink-soft">
                  <ScrollReveal baseOpacity={0.15} baseRotation={2} blurStrength={6} textClassName="is-airy">
                    {contextText}
                  </ScrollReveal>
                </div>
              </Reveal>

              <Reveal duration={2400} delay={2700} className="reveal-slow">
                <p className="mt-12 text-[11px] uppercase tracking-[0.14em] text-ink-faint">Narrative</p>
                <div className="mt-4 space-y-6 text-ink-soft">
                  {narrativeParagraphs.map((paragraph, i) => (
                    <ScrollReveal key={i} baseOpacity={0.15} baseRotation={2} blurStrength={6} textClassName="is-airy">
                      {paragraph}
                    </ScrollReveal>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal duration={2400} delay={1200} className="reveal-slow lg:justify-self-end">
              <a
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                data-cursor-label="Watch full film"
                aria-label="Watch the full film on YouTube"
                className="group relative block w-full max-w-[420px] overflow-hidden"
              >
                <Image
                  src="/images/poster.png"
                  alt="THE CRITIC film poster"
                  width={1190}
                  height={1684}
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </a>
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
                  Scene gallery
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
          className="snap-section relative h-[100svh] overflow-hidden bg-stage"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/aeter-brand.png"
              alt="AETER campaign billboard, seen from a passing train: adaptive intelligence built for immersion"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/50" />
          </div>

          <div className="relative">
            <div className="mx-auto flex h-[100svh] max-w-[1600px] flex-col justify-between px-4 pb-12 pt-24 sm:px-6 sm:pb-14 sm:pt-28">
              <div>
                <SectionLabel label="AETER" />
              </div>

              <div className="flex justify-end pb-2 sm:pb-4">
                <div className="max-w-xl text-right xl:max-w-none">
                  <div className="text-stage-text-soft">
                    <ScrollReveal baseOpacity={0.15} baseRotation={2} blurStrength={6} textClassName="text-right text-balance xl:whitespace-nowrap">
                      {aeterText}
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
                        <p className="mt-1 max-w-xl text-[clamp(0.8rem,0.95vw,0.9rem)] leading-[1.7] text-ink-soft">
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
