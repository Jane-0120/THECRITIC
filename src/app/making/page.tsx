import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Disclosure from "@/components/Disclosure";
import VersionSwitcher from "@/components/VersionSwitcher";
import { stages, makingRecords } from "@/data/making";
import { getScene } from "@/data/scenes";

export const metadata: Metadata = {
  title: "Making with AI",
  description: "기획부터 최종본까지, AI와 함께한 제작 기록입니다.",
};

export default function MakingPage() {
  const groups = stages.map((stage) => ({
    stage,
    records: makingRecords.filter((r) => r.stage === stage.key),
  }));

  return (
    <div>
      <PageHero
        index="06"
        eyebrow="Making with AI"
        title="AI와 함께 만든 과정"
        lead="기획 → 시각 탐색 → 캐릭터·공간 확정 → 이미지·영상 생성 → 편집·사운드 → 최종본. 각 단계의 목표와 판단, 사람의 개입을 기록합니다."
      />

      <nav aria-label="제작 단계" className="mx-auto max-w-[1400px] overflow-x-auto px-4 sm:px-6">
        <ol className="flex min-w-max gap-8 border-y border-paper-line py-5">
          {stages.map((s, i) => (
            <li key={s.key} className="flex items-start gap-3">
              <a href={`#stage-${s.key}`} className="flex items-start gap-3">
                <span className="font-display text-sm text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[14px] text-ink">{s.label}</span>
                  <span className="mt-0.5 block max-w-[16ch] text-[11px] leading-snug text-ink-soft">
                    {s.description}
                  </span>
                </span>
              </a>
              {i < stages.length - 1 && (
                <span aria-hidden className="mt-1 text-ink-faint">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {groups.map(({ stage, records }) => (
          <section key={stage.key} id={`stage-${stage.key}`} className="scroll-mt-32 border-b border-paper-line py-14">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.14em] text-accent">
                {stage.label}
              </p>
            </Reveal>

            {records.length === 0 ? (
              <p className="mt-4 text-[13px] text-ink-soft">
                이 단계의 기록이 아직 없습니다.
              </p>
            ) : (
              <div className="space-y-16">
                {records.map((record, i) => {
                  const scene = record.sceneSlug ? getScene(record.sceneSlug) : undefined;
                  return (
                    <Reveal key={record.slug} delay={i * 60}>
                      <article id={record.slug} className="scroll-mt-32">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <h2 className="font-display text-2xl text-ink">{record.title}</h2>
                          {scene && (
                            <Link
                              href={`/scenes/${scene.slug}`}
                              className="text-[12px] text-accent hover:underline"
                            >
                              장면 {scene.number} · {scene.title}
                            </Link>
                          )}
                        </div>
                        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-soft">
                          {record.rationale}
                        </p>

                        <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-faint">목표</dt>
                            <dd className="mt-1 text-[13px] leading-relaxed text-ink">{record.goal}</dd>
                          </div>
                          <div>
                            <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-faint">사용 도구</dt>
                            <dd className="mt-1 text-[13px] leading-relaxed text-ink">
                              {record.tools.join(" · ")}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-faint">입력 자료</dt>
                            <dd className="mt-1 text-[13px] leading-relaxed text-ink">
                              {record.inputs.join(" · ")}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-faint">사람의 개입</dt>
                            <dd className="mt-1 text-[13px] leading-relaxed text-ink">
                              {record.humanInvolvement}
                            </dd>
                          </div>
                        </dl>

                        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                          <div>
                            <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-faint">문제점</dt>
                            <dd className="mt-1 space-y-1 text-[13px] leading-relaxed text-ink-soft">
                              {record.issues.map((issue, idx) => (
                                <p key={idx}>· {issue}</p>
                              ))}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-faint">수정 내용</dt>
                            <dd className="mt-1 space-y-1 text-[13px] leading-relaxed text-ink-soft">
                              {record.revisions.map((rev, idx) => (
                                <p key={idx}>· {rev}</p>
                              ))}
                            </dd>
                          </div>
                        </dl>

                        <div className="mt-8">
                          <VersionSwitcher versions={record.versions} />
                        </div>

                        {record.prompt && (
                          <div className="mt-4 max-w-2xl">
                            <Disclosure summary="프롬프트 보기">
                              <pre className="whitespace-pre-wrap break-words font-mono text-[12px] leading-relaxed text-ink-soft">
                                {record.prompt}
                              </pre>
                            </Disclosure>
                          </div>
                        )}
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
