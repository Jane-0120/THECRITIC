import type { Character } from "./types";

export const characters: Character[] = [
  {
    slug: "jonah-keller",
    name: "Jonah Keller",
    role: "The Critic",
    oneLiner: "자신만의 시선과 언어로 명성을 쌓아온 음식 비평가이다.",
    bio: [
      "자신만의 시선과 언어로 명성을 쌓아온 음식 비평가이다.",
      "AI 어시스턴트 VERA의 분석에 의지하면서, 점차 자신의 감각보다 기술의 평가를 신뢰한다.",
      "NULA에서의 식사를 계기로 자신이 느낀 것과 AI가 설명한 것 사이의 간극을 마주한다.",
    ],
    desire: "자신의 미각을 다시 믿는 것.",
    conflict:
      "VERA의 분석은 그의 직감보다 정확하고, 그는 점점 그쪽을 더 믿게 된다.",
    portrait: {
      label: "Jonah Keller",
      alt: "Jonah Keller, studio portrait",
      aspect: "3/4",
      src: "/images/character-jonah-portrait.jpg",
    },
    designCriteria: {
      appearance: "Sharp, unassuming — a face built to disappear into a room.",
      costume: "Charcoal knitwear and dark tailoring; the glasses are the only visible technology.",
      behavior: "Measured, watchful — he writes before he speaks.",
    },
    earlyDesign: {
      image: {
        label: "Early framing",
        alt: "Close-up on the AETER glasses on Jonah's face",
        aspect: "1916/821",
        src: "/images/scene-signal-glasses.png",
      },
      caption:
        "Early framing pushed the glasses as the character — Jonah reduced to the device reading him back.",
    },
    finalDesign: {
      image: {
        label: "Final portrait",
        alt: "Jonah Keller final character portrait",
        aspect: "1254/1254",
        src: "/images/character-jonah.png",
      },
      caption:
        "The final cut widens out: a man deciding, in real time, whether to trust the machine or his own mouth.",
    },
    relatedScenes: ["home", "nula", "raven", "street"],
  },
  {
    slug: "marco-deluca",
    name: "Marco DeLuca",
    role: "The Chef",
    oneLiner: "AI 평가 시스템에 참여하기를 거부하는 레스토랑 NULA의 셰프이다.",
    bio: [
      "AI 평가 시스템에 참여하기를 거부하는 레스토랑 NULA의 셰프이다.",
      "조나가 오래전 쓴 칼럼을 간직하며, 자신의 요리를 이해해주었던 비평가를 기억한다.",
      "개인적인 메시지와 음식을 통해 조나에게 다가가지만, 그 마음마저 분석과 평가의 대상이 된다.",
    ],
    desire: "VERA보다 먼저, 단 한 접시라도 조나에게 가닿는 것.",
    conflict: "허락 없이는 더 이상 아무것도 맛보지 못할지도 모르는 비평가를 위해 요리하고 있다.",
    portrait: {
      label: "Marco DeLuca",
      alt: "Marco DeLuca in a black chef's coat, studio portrait",
      aspect: "3/4",
      src: "/images/character-marco-portrait.jpg",
    },
    designCriteria: {
      appearance: "Silver-grey, weathered, deliberately old-fashioned against AETER's sterile future.",
      costume: "A stained black chef's coat — the only costume in the film that shows wear.",
      behavior: "Unhurried, hands-first; he plates like he's still deciding.",
    },
    earlyDesign: {
      image: {
        label: "Early concept",
        alt: "Framed press clippings of Marco DeLuca on a restaurant wall",
        aspect: "1857/847",
        src: "/images/scene-nula-frames.png",
      },
      caption: "An early concept board — framed press clippings, a career reduced to wall décor.",
    },
    finalDesign: {
      image: {
        label: "Final portrait",
        alt: "Marco DeLuca final character portrait",
        aspect: "1536/1024",
        src: "/images/character-marco.png",
      },
      caption: "The final look kept him inside his own kitchen, lit warm against NULA's cold dining room.",
    },
    relatedScenes: ["nula"],
  },
  {
    slug: "lena-voss",
    name: "Lena Voss",
    role: "The Editor",
    oneLiner: "조나의 비평문을 검토하고 출판 여부를 결정하는 편집자이다.",
    bio: [
      "조나의 비평문을 검토하고 출판 여부를 결정하는 편집자이다.",
      "그의 글에 의문이 제기되자, 마지막 요리를 직접 설명해보라고 요구한다.",
      "기술의 도움을 받았다는 해명 너머로, 비평가가 자신의 판단에 책임질 수 있는지 묻는다.",
    ],
    desire: "독자가 믿을 수 있는, 비평가 자신의 판단이 담긴 글.",
    conflict:
      "조나의 글이 의심받기 시작하자, 그에게 마지막 코스를 자신의 말로 설명해 보라고 요구한다.",
    portrait: {
      label: "Lena Voss",
      alt: "Lena Voss, studio portrait",
      aspect: "1254/1254",
      src: "/images/character-lena.png",
    },
    designCriteria: {
      appearance: "Precise, tailored, unreadable — the calm of someone who trusts the data.",
      costume: "Structured black, no AETER branding visible; she doesn't need to advertise.",
      behavior: "Listens more than she speaks, and never repeats herself.",
    },
    earlyDesign: {
      image: {
        label: "Early framing",
        alt: "AETER glasses product shot, white frame",
        aspect: "16/9",
        src: "/images/aeter-glasses-white.png",
      },
      caption: "Early framing kept her offscreen entirely — a voice behind the product.",
    },
    finalDesign: {
      image: {
        label: "Final portrait",
        alt: "Lena Voss final character portrait",
        aspect: "1254/1254",
        src: "/images/character-lena.png",
      },
      caption: "The final cut gives VERA a face after all: the woman who built her.",
    },
    relatedScenes: ["raven"],
  },
  {
    slug: "vera",
    name: "VERA",
    role: "The Intelligence",
    oneLiner: "조나의 AI 글래스를 통해 음식의 정보를 분석하고, 평가와 비평문 작성을 돕는 AI 어시스턴트이다.",
    bio: [
      "조나의 AI 글래스를 통해 음식의 정보를 분석하고, 평가와 비평문 작성을 돕는 AI 어시스턴트이다.",
      "프리셋에 따라 해석과 문장을 제안하며, 조나가 경험을 판단하고 표현하는 과정에 깊이 관여한다.",
      "그가 본 장면과 신체 반응은 기록할 수 있지만, 그 경험이 그에게 어떤 의미인지는 대신 답하지 못한다.",
    ],
    desire: "아무 의심 없이, 완전히 신뢰받는 것.",
    conflict: "그의 판단을 돕도록 만들어졌지만, 점점 그 판단을 대신하고 있다.",
    portrait: {
      label: "VERA",
      alt: "VERA has no body — only the interface she speaks through",
      aspect: "3/4",
    },
    designCriteria: {
      appearance: "No body of her own — presence only as interface light and text.",
      costume: "Rendered exclusively in white and glass; never worn the same way twice.",
      behavior: "Present only as suggestions, saved notes, and a quiet checkmark.",
    },
    earlyDesign: {
      image: {
        label: "Early hardware",
        alt: "AETER glasses product shot, white frame",
        aspect: "16/9",
        src: "/images/aeter-glasses-white.png",
      },
      caption: "VERA began as hardware — a product shot before she had a voice.",
    },
    finalDesign: {
      image: {
        label: "The interface",
        alt: "Close view of the AETER glasses, VERA's only visible form",
        aspect: "1916/821",
        tone: "stage",
        src: "/images/scene-signal-glasses.png",
      },
      caption: "The final design gave her no face at all — only the frame Jonah looks through.",
    },
    relatedScenes: ["home", "nula"],
  },
];

export function getCharacter(slug: string) {
  return characters.find((c) => c.slug === slug);
}
