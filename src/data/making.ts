import type { MakingRecord, MakingStage } from "./types";

export const stages: MakingStage[] = [
  { key: "planning", label: "기획", description: "방향과 레퍼런스를 정리하는 단계." },
  { key: "exploration", label: "시각 탐색", description: "톤·무드·스타일을 실험하는 단계." },
  { key: "finalize", label: "캐릭터·공간 확정", description: "인물과 공간의 설정을 확정하는 단계." },
  { key: "generation", label: "이미지·영상 생성", description: "AI로 실제 컷을 생성하는 단계." },
  { key: "post", label: "편집·사운드", description: "편집과 사운드로 완성도를 높이는 단계." },
  { key: "final", label: "최종본", description: "최종 버전으로 확정하는 단계." },
];

function versions(prefix: string) {
  return [
    { image: { label: `${prefix} 초기안`, alt: `${prefix} 초기안 (준비 중)`, aspect: "16/9" as const }, label: "초기안", note: "초기안에서 시도한 방향과 그 의도를 입력하세요." },
    { image: { label: `${prefix} 수정안`, alt: `${prefix} 수정안 (준비 중)`, aspect: "16/9" as const }, label: "수정안", note: "수정안에서 바뀐 지점과 그 판단 근거를 입력하세요." },
    { image: { label: `${prefix} 최종안`, alt: `${prefix} 최종안 (준비 중)`, aspect: "16/9" as const, tone: "stage" as const }, label: "최종안", note: "최종안으로 확정한 이유를 입력하세요." },
  ];
}

// PLACEHOLDER — one record per stage is provided as a working example.
export const makingRecords: MakingRecord[] = [
  {
    slug: "making-01",
    stage: "planning",
    title: "레퍼런스 및 방향 정리",
    goal: "이 작업의 목표를 입력하세요.",
    tools: ["무드보드 도구", "레퍼런스 수집"],
    inputs: ["레퍼런스 이미지", "대본 발췌"],
    issues: ["방향을 좁히는 과정에서 겪은 문제를 입력하세요."],
    revisions: ["논의 후 조정한 지점을 입력하세요."],
    rationale: "이 방향을 선택한 이유를 입력하세요.",
    humanInvolvement: "이 단계에서 사람이 직접 판단하거나 개입한 지점을 입력하세요.",
    prompt: null,
    versions: versions("기획"),
  },
  {
    slug: "making-02",
    stage: "exploration",
    title: "장면 01 톤 탐색",
    goal: "이 작업의 목표를 입력하세요.",
    tools: ["AI 이미지 생성 도구", "Higgsfield"],
    inputs: ["레퍼런스 이미지", "컬러 팔레트"],
    issues: ["생성 과정에서 겪은 문제를 입력하세요."],
    revisions: ["프롬프트나 설정을 조정한 내역을 입력하세요."],
    rationale: "이 톤을 최종적으로 선택한 이유를 입력하세요.",
    humanInvolvement: "사람이 직접 고른 컷과 그 기준을 입력하세요.",
    prompt: "실제 사용한 프롬프트 전문을 이곳에 입력하세요.",
    versions: versions("시각 탐색"),
    sceneSlug: "scene-01",
  },
  {
    slug: "making-03",
    stage: "finalize",
    title: "인물 디자인 확정",
    goal: "이 작업의 목표를 입력하세요.",
    tools: ["AI 이미지 생성 도구"],
    inputs: ["초기 디자인 시트", "의상 레퍼런스"],
    issues: ["일관성을 맞추는 과정에서 겪은 문제를 입력하세요."],
    revisions: ["확정까지 거친 수정 내역을 입력하세요."],
    rationale: "최종 디자인을 확정한 이유를 입력하세요.",
    humanInvolvement: "사람이 직접 판단한 지점을 입력하세요.",
    prompt: "실제 사용한 프롬프트 전문을 이곳에 입력하세요.",
    versions: versions("캐릭터 확정"),
  },
  {
    slug: "making-04",
    stage: "generation",
    title: "장면 01–02 컷 생성",
    goal: "이 작업의 목표를 입력하세요.",
    tools: ["Higgsfield", "AI 영상 생성 도구"],
    inputs: ["스토리보드", "공간 디자인 시트"],
    issues: ["생성 결과의 일관성 문제를 입력하세요."],
    revisions: ["재생성하며 조정한 파라미터를 입력하세요."],
    rationale: "최종 컷을 선택한 이유를 입력하세요.",
    humanInvolvement: "사람이 직접 컷을 고르거나 보정한 지점을 입력하세요.",
    prompt: "실제 사용한 프롬프트 전문을 이곳에 입력하세요.",
    versions: versions("컷 생성"),
    sceneSlug: "scene-01",
  },
  {
    slug: "making-05",
    stage: "post",
    title: "장면 03 편집·사운드",
    goal: "이 작업의 목표를 입력하세요.",
    tools: ["편집 소프트웨어", "사운드 디자인 도구"],
    inputs: ["생성된 컷", "사운드 레퍼런스"],
    issues: ["편집·사운드 작업에서 겪은 문제를 입력하세요."],
    revisions: ["리듬이나 사운드를 조정한 내역을 입력하세요."],
    rationale: "최종 편집안을 선택한 이유를 입력하세요.",
    humanInvolvement: "사람이 직접 편집하거나 판단한 지점을 입력하세요.",
    prompt: null,
    versions: versions("편집·사운드"),
    sceneSlug: "scene-03",
  },
  {
    slug: "making-06",
    stage: "final",
    title: "최종본 확정",
    goal: "이 작업의 목표를 입력하세요.",
    tools: ["편집 소프트웨어"],
    inputs: ["전체 편집본"],
    issues: ["최종 확정 전 겪은 문제를 입력하세요."],
    revisions: ["최종 확정까지의 수정 내역을 입력하세요."],
    rationale: "최종본으로 확정한 이유를 입력하세요.",
    humanInvolvement: "최종 승인 과정에서 사람이 개입한 지점을 입력하세요.",
    prompt: null,
    versions: versions("최종본"),
    sceneSlug: "scene-04",
  },
];

export function getMakingRecord(slug: string) {
  return makingRecords.find((m) => m.slug === slug);
}

export function stageLabel(key: string) {
  return stages.find((s) => s.key === key)?.label ?? key;
}
