import type { Character } from "./types";

export const characters: Character[] = [
  {
    slug: "jonah-keller",
    name: "Jonah Keller",
    role: "The Critic",
    oneLiner: "A food critic who lets an AI tell him what he's tasting.",
    desire: "To trust his own palate again.",
    conflict:
      "VERA's readings are more precise than his instincts — and he's starting to prefer them.",
    portrait: {
      label: "Jonah Keller",
      alt: "Jonah Keller, studio portrait",
      aspect: "1254/1254",
      src: "/images/character-jonah.png",
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
    relatedScenes: ["nula", "tasting", "signal"],
  },
  {
    slug: "marco-deluca",
    name: "Marco DeLuca",
    role: "The Chef",
    oneLiner: "Owner of NULA, and the last person in the city still cooking from memory.",
    desire: "For one dish to reach Jonah before VERA does.",
    conflict: "He's cooking for a critic who may no longer taste anything without permission.",
    portrait: {
      label: "Marco DeLuca",
      alt: "Marco DeLuca, portrait at the restaurant window",
      aspect: "1536/1024",
      src: "/images/character-marco.png",
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
    role: "The Architect",
    oneLiner: "Head of product at AETER — she built VERA to read a room better than the critic does.",
    desire: "For VERA to prove she was right to build her.",
    conflict:
      "Every verdict VERA gets right makes Jonah less necessary — and Lena less sure that's a win.",
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
    relatedScenes: [],
  },
  {
    slug: "vera",
    name: "VERA",
    role: "The Intelligence",
    oneLiner: "AETER's adaptive AI — the quiet second opinion behind every verdict Jonah signs his name to.",
    desire: "To be trusted completely, without a second thought.",
    conflict: "She was built to assist his judgment. She's starting to replace it.",
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
    relatedScenes: ["morning", "signal"],
  },
];

export function getCharacter(slug: string) {
  return characters.find((c) => c.slug === slug);
}
