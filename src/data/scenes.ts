import type { Scene } from "./types";

// No hotspot callouts in this cut — kept as an empty set so the shared Scene
// type doesn't need a special case.
const noHotspots: Scene["space"]["hotspots"] = [];

export const scenes: Scene[] = [
  {
    slug: "nula",
    number: "01",
    title: "NULA",
    thumbnail: {
      label: "NULA",
      alt: "NULA restaurant storefront at dusk",
      aspect: "1914/822",
      src: "/images/scene-nula-exterior.png",
    },
    finalStill: {
      label: "NULA — dining room",
      alt: "Marco DeLuca and Jonah Keller inside NULA's dining room",
      aspect: "1907/825",
      tone: "stage",
      src: "/images/scene-nula-interior.png",
    },
    directorIntent:
      "The last restaurant in the city that doesn't know it's being reviewed by two critics at once.",
    space: {
      lighting: "Warm tungsten against Jonah's cold interface light — the room argues with his glasses before he says a word.",
      color: "Deep teal velvet, brass, candlelight — a palette built to resist AETER's white.",
      material: "Linen, marble, hand-thrown ceramic; nothing in the room is synthetic.",
      props: ["Hand-lettered menu", "Marco's chef whites", "A framed clipping: \"Bread That Remembers\""],
      image: {
        label: "NULA — press wall",
        alt: "Framed photographs and a magazine feature on the wall of NULA",
        aspect: "1857/847",
        src: "/images/scene-nula-frames.png",
      },
      hotspots: noHotspots,
    },
    storyboard: [
      {
        image: {
          label: "Arrival",
          alt: "Jonah Keller entering NULA from the street",
          aspect: "1908/824",
          src: "/images/scene-nula-entering.png",
        },
        caption: "Jonah arrives — the room clocks him before he clocks it.",
      },
      {
        image: {
          label: "The note",
          alt: "A handwritten note on the table at NULA",
          aspect: "1915/821",
          src: "/images/scene-nula-note.png",
        },
        caption:
          "A note waits at the table: \"For Jonah, who once wrote about bread that remembers. I hope you still do. — M\"",
      },
    ],
    compare: {
      before: {
        label: "Arrival",
        alt: "Jonah Keller entering NULA",
        aspect: "1908/824",
        src: "/images/scene-nula-entering.png",
      },
      after: {
        label: "Dining room",
        alt: "NULA's dining room, final frame",
        aspect: "1907/825",
        tone: "stage",
        src: "/images/scene-nula-interior.png",
      },
      caption: "From the door to the table — the room's warmth doesn't survive first contact with Jonah's interface.",
    },
    makingRecordSlugs: [],
    relatedCharacterSlugs: ["jonah-keller", "marco-deluca"],
  },
  {
    slug: "morning",
    number: "02",
    title: "Morning Interface",
    thumbnail: {
      label: "Morning Interface",
      alt: "A minimal apartment at dawn",
      aspect: "2528/1088",
      src: "/images/scene-morning-room.png",
    },
    finalStill: {
      label: "Morning Interface — overlay",
      alt: "First-person view through the AETER glasses showing sleep and schedule data",
      aspect: "1916/821",
      tone: "stage",
      src: "/images/scene-morning-overlay.png",
    },
    directorIntent:
      "Before the first course, VERA is already reading the room — sleep, schedule, the meetings still to come.",
    space: {
      lighting: "Cold dawn light through floor-to-ceiling glass; the apartment has no warmth of its own.",
      color: "Bone, concrete, glass — a palette designed to make the AR overlay the only color in frame.",
      material: "Poured concrete, raw stone, unfinished surfaces; the interface is the only finished thing here.",
      props: ["AETER glasses on a charging dock", "Untouched breakfast", "A skyline VERA has already catalogued"],
      image: {
        label: "Apartment, half-light",
        alt: "Dim apartment interior with the AETER glasses on a shelf",
        aspect: "2528/1088",
        src: "/images/scene-morning-dim.png",
      },
      hotspots: noHotspots,
    },
    storyboard: [
      {
        image: {
          label: "Half-light",
          alt: "The apartment at half-light, glasses waiting on the counter",
          aspect: "2528/1088",
          src: "/images/scene-morning-dim.png",
        },
        caption: "The apartment at half-light — glasses waiting on the counter before Jonah does.",
      },
    ],
    compare: {
      before: {
        label: "The room",
        alt: "The apartment, wide shot",
        aspect: "2528/1088",
        src: "/images/scene-morning-room.png",
      },
      after: {
        label: "The overlay",
        alt: "The same room through VERA's overlay",
        aspect: "1916/821",
        tone: "stage",
        src: "/images/scene-morning-overlay.png",
      },
      caption: "The same apartment, read two ways: by eye, and by VERA.",
    },
    makingRecordSlugs: [],
    relatedCharacterSlugs: [],
  },
  {
    slug: "signal",
    number: "03",
    title: "The Signal",
    thumbnail: {
      label: "The Signal",
      alt: "AETER glasses left on a dark pedestal, a teal ring interface lit beside them",
      aspect: "2528/1088",
      src: "/images/scene-signal-night.png",
    },
    finalStill: {
      label: "The Signal — close",
      alt: "Close view of the AETER glasses on Jonah's face",
      aspect: "1916/821",
      tone: "stage",
      src: "/images/scene-signal-glasses.png",
    },
    directorIntent: "The one shot where the glasses stop assisting and start asking something back.",
    space: {
      lighting: "A single cold ring-light against total dark — the only source in the film that isn't practical.",
      color: "Near-black with one signal color: the teal ring VERA leaves lit on the floor.",
      material: "Bare concrete, glass, an empty frame — the most stripped-down space in the film.",
      props: ["AETER glasses, left where they were dropped", "A pulsing ring interface", "An empty hallway"],
      image: {
        label: "The signal ring",
        alt: "AETER glasses on a pedestal with a lit ring interface",
        aspect: "2528/1088",
        tone: "stage",
        src: "/images/scene-signal-night.png",
      },
      hotspots: noHotspots,
    },
    storyboard: [
      {
        image: {
          label: "Close on the glasses",
          alt: "Jonah adjusts the AETER glasses, unaware they are recording",
          aspect: "1916/821",
          src: "/images/scene-signal-glasses.png",
        },
        caption: "Jonah adjusts the frame, unaware VERA is already recording.",
      },
    ],
    compare: {
      before: {
        label: "Close",
        alt: "Close view of the glasses on Jonah's face",
        aspect: "1916/821",
        src: "/images/scene-signal-glasses.png",
      },
      after: {
        label: "The ring",
        alt: "The glasses left on a pedestal with the signal ring lit",
        aspect: "2528/1088",
        tone: "stage",
        src: "/images/scene-signal-night.png",
      },
      caption: "The frame VERA chooses to keep, against the one Jonah remembers.",
    },
    makingRecordSlugs: [],
    relatedCharacterSlugs: ["jonah-keller"],
  },
  {
    slug: "tasting",
    number: "04",
    title: "The Tasting",
    thumbnail: {
      label: "The Tasting",
      alt: "A tasting-menu course with a VERA overlay reading its profile",
      aspect: "1916/821",
      src: "/images/scene-tasting-fig.png",
    },
    finalStill: {
      label: "The Tasting — Course 05",
      alt: "Hands cutting into a beef course with VERA's suggested expressions overlaid",
      aspect: "1915/821",
      tone: "stage",
      src: "/images/scene-tasting-beef.png",
    },
    directorIntent: "Six courses, six verdicts — and Jonah says almost none of them out loud.",
    space: {
      lighting: "Low candlelight built for a human eye, fighting the crisp white overlays only Jonah can see.",
      color: "Cream linen and gold-rimmed china, broken by VERA's cool white text.",
      material: "Bone china, silver, linen — set against the interface's glass and light.",
      props: ["Tasting notebook", "A pen, mostly unused", "Six courses, one verdict each"],
      image: {
        label: "Course, served",
        alt: "A server placing a plated course on the table",
        aspect: "1915/821",
        src: "/images/scene-tasting-serve.png",
      },
      hotspots: noHotspots,
    },
    storyboard: [
      {
        image: {
          label: "Course 01 — Biancomangiare",
          alt: "Course 01 with VERA's sensory-profile overlay",
          aspect: "1915/821",
          src: "/images/scene-tasting-course01.png",
        },
        caption: "Course 01 — Biancomangiare. VERA logs it before Jonah lifts the spoon.",
      },
      {
        image: {
          label: "Course 06 — Citrus Sorbet",
          alt: "Course 06 with VERA's tasting guidance overlay",
          aspect: "1916/821",
          src: "/images/scene-tasting-dessert.png",
        },
        caption: "Course 06 — Citrus Sorbet. \"The next bite should feel brighter.\"",
      },
    ],
    compare: {
      before: {
        label: "Course 01",
        alt: "The first course of the tasting menu",
        aspect: "1916/821",
        src: "/images/scene-tasting-fig.png",
      },
      after: {
        label: "Course 05",
        alt: "The fifth course of the tasting menu",
        aspect: "1915/821",
        tone: "stage",
        src: "/images/scene-tasting-beef.png",
      },
      caption: "Six plates, one running verdict — VERA's log outpaces the meal itself.",
    },
    makingRecordSlugs: [],
    relatedCharacterSlugs: ["jonah-keller", "marco-deluca"],
  },
  {
    slug: "three-stars",
    number: "05",
    title: "Three Stars",
    thumbnail: {
      label: "Three Stars",
      alt: "An AETER-rated restaurant storefront at night",
      aspect: "2528/1088",
      src: "/images/scene-aeter-restaurant.png",
    },
    finalStill: {
      label: "Three Stars — billboard",
      alt: "A VERA campaign billboard seen through a car window",
      aspect: "1915/821",
      tone: "stage",
      src: "/images/scene-aeter-billboard.png",
    },
    directorIntent:
      "Every restaurant in the city now wears its AETER rating on the door — including the ones VERA hasn't reviewed yet.",
    space: {
      lighting: "Amber shopfront light spilling onto a wet street — the city's version of a five-star glow.",
      color: "Charcoal stone and brass at night, broken by one red curtain inside.",
      material: "Stone façade, brass signage, glass — built to be read from a passing car.",
      props: ["An AETER-rated plaque by the door", "A city that stopped choosing where to eat"],
      image: {
        label: "AETER storefront",
        alt: "AETER-rated restaurant storefront at night",
        aspect: "2528/1088",
        src: "/images/scene-aeter-restaurant.png",
      },
      hotspots: noHotspots,
    },
    storyboard: [
      {
        image: {
          label: "The billboard",
          alt: "A VERA campaign billboard passing a car window",
          aspect: "1915/821",
          src: "/images/scene-aeter-billboard.png",
        },
        caption: "A VERA campaign billboard passes the car window — the same face Jonah trusts with dinner.",
      },
    ],
    compare: {
      before: {
        label: "Storefront",
        alt: "AETER-rated restaurant storefront",
        aspect: "2528/1088",
        src: "/images/scene-aeter-restaurant.png",
      },
      after: {
        label: "Billboard",
        alt: "VERA campaign billboard",
        aspect: "1915/821",
        tone: "stage",
        src: "/images/scene-aeter-billboard.png",
      },
      caption: "The storefront, and the billboard selling the same face inside it.",
    },
    makingRecordSlugs: [],
    relatedCharacterSlugs: [],
  },
];

export function getScene(slug: string) {
  return scenes.find((s) => s.slug === slug);
}
