import type { ImageRef, Scene } from "./types";

const still = (src: string, label: string, alt: string, aspect = "1916/821"): ImageRef => ({
  label,
  alt,
  aspect,
  src,
});

export const scenes: Scene[] = [
  {
    slug: "home",
    number: "01",
    title: "JONAH'S HOME",
    titleKo: "조나의 집",
    description:
      "큰 창과 회색 석재, 정돈된 가구는 조나의 통제된 일상을 드러낸다. 아침에는 VERA로 일정과 신체 상태를 확인하고,\n밤에는 비평문을 작성하는 공간이다. 조나는 이곳에서 기록된 정보와 자신이 느낀 경험 사이의 간극을 마주한다.",
    floorPlan: {
      label: "Jonah's Home — plan",
      alt: "Exploded axonometric plan of Jonah's apartment: living room, kitchen island and bedroom",
      aspect: "1672/941",
      tone: "stage",
      src: "/images/space-home-plan.png",
    },
    render: {
      label: "Jonah's Home — living room",
      alt: "Jonah's living room in grey stone, with floor-to-ceiling windows over the skyline",
      aspect: "1920/1084",
      src: "/images/space-home-render.jpg",
    },
    thumbnail: {
      label: "Jonah's Home",
      alt: "Exploded axonometric plan of Jonah's apartment",
      aspect: "1672/941",
      tone: "stage",
      src: "/images/space-home-plan.png",
    },
    stills: [
      still("/images/scene-morning-overlay.png", "Morning overlay", "First-person view through the AETER glasses showing sleep and schedule data"),
      still("/images/scene-home-desk.jpg", "Review session", "Jonah at his desk at night, reading VERA's review screen"),
      still("/images/scene-home-companion.jpg", "Companion mode", "VERA's companion mode replaying the final fig course"),
      still("/images/scene-home-toast.jpg", "Burnt toast", "Jonah holding up a piece of burnt toast in his kitchen", "2560/1429"),
      still("/images/scene-home-draft.jpg", "Review draft", "VERA's review draft, rated two stars and submitted"),
      still("/images/scene-home-fig.jpg", "The fig", "The final fig course, recalled on screen"),
      still("/images/scene-home-text.jpg", "The draft text", "Close on the review text, one phrase highlighted"),
    ],
    relatedCharacterSlugs: ["jonah-keller"],
  },
  {
    slug: "nula",
    number: "02",
    title: "NULA",
    titleKo: "레스토랑",
    description:
      "아치형 창, 짙은 청록색 벽과 따뜻한 목재는 음식에 집중하는 분위기를 만든다.\n이곳에서 마르코가 음식에 담은 기억과 조나의 AI가 제안하는 평가가 마주한다.",
    floorPlan: {
      label: "NULA — plan",
      alt: "Exploded axonometric plan of NULA: columned dining hall with round tables and an open kitchen",
      aspect: "1672/941",
      tone: "stage",
      src: "/images/space-nula-plan.png",
    },
    render: {
      label: "NULA — dining hall",
      alt: "NULA's dining hall: arched windows, teal columns and round tables",
      aspect: "2560/1446",
      src: "/images/space-nula-render.jpg",
    },
    thumbnail: {
      label: "NULA",
      alt: "Exploded axonometric plan of NULA",
      aspect: "1672/941",
      tone: "stage",
      src: "/images/space-nula-plan.png",
    },
    stills: [
      still("/images/scene-nula-exterior.png", "Storefront", "NULA restaurant storefront", "1914/822"),
      still("/images/scene-nula-note.png", "Visitor reviews", "A server at NULA, with visitor reviews and the menu overlaid", "1915/821"),
      still("/images/scene-nula-interior.png", "Marco and Jonah", "Marco DeLuca crossing the dining room toward Jonah", "1907/825"),
      still("/images/scene-tasting-beef.png", "Course 05 — Beef", "Hands cutting into a beef course with VERA's suggested expressions overlaid", "1915/821"),
      still("/images/scene-nula-entering.png", "Arrival", "Jonah Keller entering NULA's dining room", "1908/824"),
      still("/images/scene-nula-frames.png", "The press wall", "Framed photographs and Jonah's old column on the wall of NULA", "1857/847"),
      still("/images/place-dining-hall.png", "The dining hall", "Marco carrying a dish across NULA's columned dining hall", "1939/811"),
      still("/images/place-corner-table.png", "The corner table", "Jonah alone at a round table, seen from the kitchen pass", "1915/821"),
      still("/images/place-nula-kitchen.png", "NULA kitchen", "Marco in NULA's kitchen during service", "2048/1152"),
      still("/images/scene-signal-glasses.png", "The glasses", "Jonah touching the AETER glasses at the table"),
      still("/images/scene-tasting-course01.png", "Course 01", "Course 01 with VERA's sensory-profile overlay", "1915/821"),
      still("/images/scene-tasting-saved.jpg", "Saved", "A fish course with VERA's suggested frame saved", "1918/820"),
      still("/images/scene-tasting-fish.jpg", "Fish course", "A fish course served on a white plate"),
      still("/images/scene-tasting-overhead.png", "Overhead", "A course seen from above, notebook beside the plate"),
      still("/images/scene-tasting-sweets.png", "Sweets", "Dessert plates on the linen tablecloth"),
      still("/images/scene-tasting-dessert.png", "Course 06 — Citrus Sorbet", "Course 06 with VERA's tasting guidance overlay"),
      still("/images/scene-tasting-fig.png", "Final course — Black Fig", "The final black fig course with VERA's suggested note"),
    ],
    relatedCharacterSlugs: ["marco-deluca", "jonah-keller"],
  },
  {
    slug: "raven",
    number: "03",
    title: "RAVEN",
    titleKo: "편집부",
    description:
      "RAVEN은 조나가 비평문을 기고하는 매거진의 편집부이다. 식당에서의 경험이 독자에게 전달할 글로\n다듬어지는 이곳에서, 조나는 자신의 이름으로 발표한 판단을 스스로 설명해야 하는 상황에 놓인다.",
    floorPlan: {
      label: "RAVEN — plan",
      alt: "Exploded axonometric plan of the RAVEN editorial office: open desks and glass-walled rooms",
      aspect: "1672/941",
      tone: "stage",
      src: "/images/space-raven-plan.png",
    },
    render: {
      label: "RAVEN — editorial office",
      alt: "The RAVEN editorial office behind glass partitions",
      aspect: "1920/1084",
      src: "/images/space-raven-render.jpg",
    },
    thumbnail: {
      label: "RAVEN",
      alt: "Exploded axonometric plan of the RAVEN editorial office",
      aspect: "1672/941",
      tone: "stage",
      src: "/images/space-raven-plan.png",
    },
    stills: [
      still("/images/scene-raven-office.jpg", "Glass room", "Lena Voss confronting Jonah inside a glass-walled room", "2560/1429"),
      still("/images/scene-raven-desk.jpg", "Lena's desk", "Lena Voss speaking to Jonah across her desk", "2560/1096"),
      still("/images/scene-raven-question.jpg", "The question", "Jonah, glasses on, caught off guard by Lena's question", "1919/820"),
      still("/images/scene-raven-arrival.jpg", "Editorial floor", "Lena crossing the editorial floor toward Jonah"),
    ],
    relatedCharacterSlugs: ["lena-voss", "jonah-keller"],
  },
  {
    slug: "street",
    number: "04",
    title: "DOWNTOWN",
    titleKo: "도심 거리",
    description:
      "세 공간을 잇는 배경인 미국 도시의 거리. AETER 평점을 내건 레스토랑과\nVERA 광고가 일상의 풍경처럼 늘어서 있고, 조나는 이동하는 차 안에서도 VERA를 통해 도시를 읽는다.",
    floorPlan: {
      label: "Downtown — plan",
      alt: "Axonometric model of a downtown block: storefronts, offices and the street outside",
      aspect: "1672/941",
      tone: "stage",
      src: "/images/space-street-plan.png",
    },
    thumbnail: {
      label: "Downtown",
      alt: "Axonometric model of a downtown block",
      aspect: "1672/941",
      tone: "stage",
      src: "/images/space-street-plan.png",
    },
    stills: [
      still("/images/scene-street-sidewalk.jpg", "Sidewalk at dusk", "A downtown sidewalk at dusk, shopfronts lit along the street", "2528/1088"),
      still("/images/scene-aeter-restaurant.png", "AETER-rated restaurant", "An AETER-rated restaurant storefront at night", "2528/1088"),
      still("/images/scene-aeter-billboard.png", "VERA billboard", "A VERA campaign billboard seen through a car window", "1915/821"),
      still("/images/hero-critic.png", "In transit", "Jonah in the back of a self-driving car, a VERA billboard outside", "1678/937"),
    ],
    relatedCharacterSlugs: ["jonah-keller"],
  },
];

export function getScene(slug: string) {
  return scenes.find((s) => s.slug === slug);
}

/** Everything viewable for a space, in order: plan, rendered view, stills. */
export function sceneGallery(scene: Scene): ImageRef[] {
  const raw = [scene.floorPlan, scene.render, ...scene.stills].filter(
    (image): image is ImageRef => Boolean(image)
  );
  const seen = new Set<string>();
  return raw.filter((image) => {
    const key = image.src ?? image.label;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
