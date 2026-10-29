import type { ImageRef, Scene } from "./types";
import { stills as s } from "./stills";

export const scenes: Scene[] = [
  {
    slug: "home",
    number: "01",
    title: "JONAH'S HOME",
    titleKo: "조나의 집",
    description:
      "큰 창과 회색 석재, 정돈된 가구는 조나의 통제된 일상을 드러낸다. 아침에는 VERA로 일정과 신체 상태를 확인하고,\n밤에는 비평문을 작성하는 공간이다. 조나는 이곳에서 기록된 정보와 자신이 느낀 경험 사이의 간극을 마주한다.",
    detail:
      "큰 창과 회색 석재, 정돈된 가구는 조나의 통제된 일상을 드러낸다. VERA는 IoT로 연결된 조명과 창의 투명도, 실내 온도를 그의 일정과 신체 상태에 맞춰 조절한다. 침실 조명은 기상 시간을 알리고, 주방은 식단을 제안하며, 작업대에는 일정과 비평문 초안이 제공된다. 작은 결정들이 자동화될수록 조나의 일상은 시스템이 정한 순서를 따르게 된다. 영화의 마지막 아침, 조나는 같은 주방에서 직접 커피를 내리고 토스트를 구우며 자신의 글을 쓴다.",
    material: "회색 석재, 무광 래커 마감의 벽면 수납장, 스마트 유리",
    light: "일정에 따라 자동 조절되는 조명 / 간접조명과 인터페이스의 빛",
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
      s.homeGlassesOn,
      s.morningOverlay,
      s.homeDesk,
      s.homeQuietTable,
      s.homeWaking,
      s.homeMarcoCall,
      s.homeWriting,
      s.homeCompanion,
      s.homeFig,
      s.homeText,
      s.homeDraft,
      s.homeFigCounter,
      s.homeCoffee,
      s.homeToaster,
      s.homeToasterWindow,
      s.homeBurntToast,
      s.homeToastBin,
      s.homeKitchen,
      s.homeGlassesOff,
      s.homeGlassesDown,
      s.homeToast,
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
    detail:
      "아치형 창과 짙은 청록색 벽, 따뜻한 색감의 목재는 음식에 집중할 수 있는 환경을 만든다. 넉넉한 간격으로 배치한 원형 테이블과 개방형 주방에서는 식사 중에도 조리 과정을 볼 수 있다. 이곳에서 마르코가 음식에 담은 기억과 조나의 AI가 제안하는 평가가 마주한다.",
    material: "청록 도장벽, 월넛, 대리석, 린넨, 황동",
    light: "펜던트와 캔들의 저조도, 테이블 위 스포트",
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
      s.nulaExterior,
      s.nulaInterior,
      s.tastingBeef,
      s.nulaHandshake,
      s.nulaEntering,
      s.nulaNote,
      s.nulaFrames,
      s.nulaDiningHall,
      s.nulaCornerTable,
      s.nulaKitchen,
      s.nulaSignal,
      s.signalGlasses,
      s.tastingCourse01,
      s.tastingOverhead,
      s.nulaRecording,
      s.tastingFish,
      s.tastingSaved,
      s.tastingSweets,
      s.tastingDessert,
      s.nulaJonahClose,
      s.tastingFig,
      s.nulaMarcoClose,
      s.nulaMarcoTurn,
      s.nulaMessage,
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
    detail:
      "RAVEN은 조나의 비평문을 출판용으로 다듬는 편집부다. 이곳에서 레나는 조나에게 평가의 근거를 묻는다. 회의 중에는 투명한 유리 파티션이 불투명한 흰색 벽으로 바뀌며 안팎의 시야를 차단한다. 개방된 사무실이 독립된 공간으로 전환되면서 대화에 집중하게 하고, 자신의 판단을 설명해야 하는 조나의 부담을 높인다.",
    material: "유리 파티션, 다크 월넛, 블랙 스틸",
    light: "천창의 균질한 주광 + 서가의 라인 조명",
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
      s.ravenOffice,
      s.ravenStandoff,
      s.ravenPosts,
      s.ravenQuestion,
      s.ravenArrival,
      s.ravenDesk,
      s.ravenPhrase,
      s.ravenLenaClose,
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
    detail:
      "석회석 외벽과 유리 쇼윈도 사이에 배치된 AETER 평점과 VERA 광고는 시스템의 평가가 일상의 선택에 영향을 미치는 환경을 보여준다. 자율주행차로 이동하는 조나는 주변을 파악할 때도 VERA가 정리한 정보에 의존한다. 해 질 녘의 과일 가게와 비 내리는 아침의 베이커리, 카페에서도 사람들은 저마다의 글래스로 도시를 읽는다. 기술에 판단을 맡기는 습관은 비평 활동을 넘어 일상으로 이어진다.",
    material: "석회석 파사드, 유리 쇼윈도, 디지털 사이니지",
    light: "해 질 무렵의 푸른 자연광 / 쇼윈도와 디지털 빛 / 비 내린 아침의 흐린 빛",
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
      s.streetMatches,
      s.streetFigs,
      s.streetCafeInside,
      s.aeterBillboard,
      s.aeterRestaurant,
      s.inTransit,
      s.streetSidewalk,
      s.streetEmpty,
      s.streetMyReviews,
      s.streetStyle,
      s.streetMatchesEye,
      s.streetLens,
      s.streetJonahDusk,
      s.streetMarketWalk,
      s.streetMarket,
      s.streetFigsReflection,
      s.streetMarketInside,
      s.streetFigBag,
      s.streetFigBite,
      s.streetRainWalk,
      s.streetBakery,
      s.streetBakeryFront,
      s.streetJonahClose,
      s.streetCafe,
      s.streetCafeGlasses,
      s.streetCafeWriting,
      s.streetCafeReflection,
      s.streetPasserby,
      s.streetAeterBillboard,
      s.streetBillboardWide,
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
