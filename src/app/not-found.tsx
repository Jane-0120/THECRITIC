import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col items-start px-4 pb-24 pt-40 sm:px-6 sm:pt-48">
      <p className="text-[12px] uppercase tracking-[0.18em] text-ink-faint">404</p>
      <h1 className="font-display mt-4 text-3xl text-ink sm:text-4xl">
        페이지를 찾을 수 없습니다.
      </h1>
      <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ink-soft">
        주소가 바뀌었거나 더 이상 존재하지 않는 페이지입니다.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-[13px] text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        Film으로 돌아가기
      </Link>
    </div>
  );
}
