import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "AETER",
  description: "THE CRITIC 속 가상의 AI 브랜드 AETER — 스마트 글래스와 AI 어시스턴트 VERA.",
};

const intro =
  "영화 속에서 일상에 널리 보급된 AETER는 일상의 감각과 선택을 분석하고 판단을 돕는 가상의 AI 브랜드이다.\n스마트 글래스와 AI 어시스턴트 VERA로 경험과 신체 반응을 기록하고, 일정 관리부터 분석과 글쓰기까지 일상 전반을 지원한다.";

export default function AeterPage() {
  return (
    <div>
      <PageHero index="03" eyebrow="AETER" title="Brand">
        {/* One sentence per line on wide screens, so neither breaks mid-phrase. */}
        <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-ink-soft lg:whitespace-pre">
          {intro}
        </p>
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
