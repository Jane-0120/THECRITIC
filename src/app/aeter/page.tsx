import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "AETER",
  description: "THE CRITIC 속 가상의 AI 브랜드 AETER — 스마트 글래스와 AI 어시스턴트 VERA.",
};

const intro =
  "영화 속에서 일상에 널리 보급된 AETER는 일상의 감각과 선택을 분석하고 판단을 돕는 가상의 AI 브랜드이다.\n스마트 글래스와 AI 어시스턴트 VERA로 경험과 신체 반응을 기록하고, 일정 관리부터 분석과 글쓰기까지 일상 전반을 지원한다.\nAETER는 현대인의 일상에서 반복되는 ‘선택의 피로’에 대한 관찰에서 시작되었고, 그 피로를 덜어주겠다고 약속한다.";

const specs = [
  { label: "Slogan", value: "Choose less. Live better. — 덜 고민하고, 더 나은 삶으로." },
  { label: "Naming", value: "AETER /ˈeɪtər/ — Latin for the purest upper air; the fifth element, the air the gods breathe." },
  { label: "Typeface", value: "Helvetica Neue, Ultra Light to Bold" },
];

export default function AeterPage() {
  return (
    <div>
      <PageHero index="04" eyebrow="AETER" title="Brand">
        {/* One sentence per line on wide screens, so neither breaks mid-phrase. */}
        <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-ink-soft lg:whitespace-pre">
          {intro}
        </p>
        <dl className="mt-8 max-w-3xl space-y-1.5 text-[13px]">
          {specs.map((spec) => (
            <div key={spec.label} className="grid grid-cols-[6rem_1fr] gap-4">
              <dt className="text-[11px] uppercase tracking-[0.12em] text-ink-faint">{spec.label}</dt>
              <dd className="leading-relaxed text-ink-soft">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* The full brand sheet, on the same margins as the copy above. */}
      <div className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-6">
        <Image
          src="/images/aeter-brand-sheet.jpg"
          alt="AETER brand book: identity, smart glasses, the VERA assistant and campaign visuals"
          width={2800}
          height={18648}
          sizes="(min-width: 1600px) 1600px, 100vw"
          className="mt-10 h-auto w-full"
        />
      </div>
    </div>
  );
}
