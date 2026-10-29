import type { Sequence } from "./types";
import { stills as s } from "./stills";

export const sequences: Sequence[] = [
  {
    slug: "sq-01",
    number: "01",
    title: "THE GOLDEN BOY",
    description:
      "비에 젖은 도시의 밤과 음식 몽타주 위로, 음식이 아니라 의도를 맛본다던 조나의 목소리와 5년 전 인터뷰가 겹친다. 고층 아파트의 아침, 조나가 VERA Glass를 쓰자 수면 기록과 일정, 마르코의 새 인터뷰가 시야에 열린다.",
    cover: s.homeGlassesOn,
    stills: [s.aeterRestaurant, s.homeWaking, s.homeGlassesOn, s.morningOverlay, s.homeMarcoCall],
    spaceSlugs: ["street", "home"],
    relatedCharacterSlugs: ["jonah-keller", "marco-deluca"],
  },
  {
    slug: "sq-02",
    number: "02",
    title: "THE RIVAL",
    description:
      "비 오는 밤, 자율주행차 뒷좌석의 조나는 VERA Glass로 마르코의 인터뷰를 보며 NULA의 예약률을 확인한다. 창밖으로 ‘STOP DECIDING. START LIVING.’을 내건 AETER 광고가 지나가고, 차는 그를 AETER 인증 마크가 없는 식당 앞에 내려준다.",
    cover: s.inTransit,
    stills: [s.inTransit, s.aeterBillboard],
    spaceSlugs: ["street"],
    relatedCharacterSlugs: ["jonah-keller", "marco-deluca"],
  },
  {
    slug: "sq-03",
    number: "03",
    title: "SEVEN COURSES",
    description:
      "AETER 평가를 거부한 레스토랑 NULA. 마르코는 조나의 오래된 칼럼 〈기억하는 빵〉을 간직한 채 그를 맞는다. 일곱 코스 동안 조나는 직접 쓴 감각 메모 대신 VERA가 제안한 문장을 저장하고, 마르코의 손글씨 카드와 마지막 무화과마저 그렇게 남긴다.",
    cover: s.tastingFig,
    stills: [
      s.nulaExterior,
      s.nulaEntering,
      s.nulaNote,
      s.nulaFrames,
      s.nulaInterior,
      s.nulaMarcoClose,
      s.nulaHandshake,
      s.nulaCornerTable,
      s.tastingCourse01,
      s.nulaSignal,
      s.tastingFish,
      s.tastingSaved,
      s.nulaRecording,
      s.tastingOverhead,
      s.signalGlasses,
      s.nulaDiningHall,
      s.tastingBeef,
      s.tastingSweets,
      s.tastingDessert,
      s.nulaMarcoTurn,
      s.nulaMessage,
      s.tastingFig,
      s.nulaJonahClose,
    ],
    spaceSlugs: ["nula"],
    relatedCharacterSlugs: ["jonah-keller", "marco-deluca"],
  },
  {
    slug: "sq-04",
    number: "04",
    title: "THE DRAFT",
    description:
      "자정의 서재, 조나는 COMPANION MODE로 비평문 초안을 생성한다. “무화과 먹고 내가 뭐라고 했지?” 저장된 문장은 VERA의 제안이었고, 그가 직접 남긴 말은 없다. 조나는 그 순간의 영상을 재생하지 않은 채 원고를 보낸다.",
    cover: s.homeDesk,
    stills: [s.homeWriting, s.homeDesk, s.homeCompanion, s.homeText, s.homeFig, s.homeDraft],
    spaceSlugs: ["home"],
    relatedCharacterSlugs: ["jonah-keller"],
  },
  {
    slug: "sq-05",
    number: "05",
    title: "THE FALLOUT",
    description:
      "RAVEN 편집부, 레나의 사무실. 마르코의 게시물에는 식사 내내 관자놀이를 누르는 조나의 영상이 올라와 있고, 그가 말한 마지막 코스의 맛은 지난달 다른 식당 리뷰와 같은 문장이다. 레나는 리뷰를 내리고, 마르코에게 직접 연락하라고 말한다.",
    cover: s.ravenStandoff,
    stills: [
      s.ravenArrival,
      s.ravenStandoff,
      s.ravenOffice,
      s.ravenPosts,
      s.ravenDesk,
      s.ravenLenaClose,
      s.ravenPhrase,
      s.ravenQuestion,
    ],
    spaceSlugs: ["raven"],
    relatedCharacterSlugs: ["lena-voss", "jonah-keller"],
  },
  {
    slug: "sq-06",
    number: "06",
    title: "THE GARDEN OF PHRASES",
    description:
      "해 질 녘 집으로 걷는 길, VERA는 조나의 문장과 겹치는 9,412개의 리뷰를 찾아내고, 그 문체 프리셋의 바탕에 그의 초기 리뷰가 있었다고 말한다. 식료품점에서 무화과 한 알을 산 조나는 안경을 벗어 주머니에 넣고, 돌턱에 앉아 천천히 맛본다.",
    cover: s.streetMatches,
    stills: [
      s.streetEmpty,
      s.streetJonahDusk,
      s.streetMyReviews,
      s.streetMatches,
      s.streetMatchesEye,
      s.streetStyle,
      s.streetLens,
      s.streetSidewalk,
      s.streetMarketWalk,
      s.streetMarket,
      s.streetFigs,
      s.streetFigsReflection,
      s.streetMarketInside,
      s.streetFigBag,
      s.streetFigBite,
    ],
    spaceSlugs: ["street"],
    relatedCharacterSlugs: ["jonah-keller"],
  },
  {
    slug: "sq-07",
    number: "07",
    title: "THE MORNING AFTER",
    description:
      "회색 아침, 원고를 고치던 조나의 손이 전날 적은 노트 앞에서 멈추고, 그사이 토스트가 검게 탄다. 탄 빵을 버린 그는 마르코에게 음성 메시지를 남긴다. “그 무화과가 무슨 맛이었는지 기억이 안 나요. 미안해요.”",
    cover: s.homeBurntToast,
    stills: [
      s.homeFigCounter,
      s.homeCoffee,
      s.homeToasterWindow,
      s.homeQuietTable,
      s.homeToaster,
      s.homeBurntToast,
      s.homeToast,
      s.homeToastBin,
      s.homeKitchen,
    ],
    spaceSlugs: ["home"],
    relatedCharacterSlugs: ["jonah-keller"],
  },
  {
    slug: "sq-08",
    number: "08",
    title: "ON THE WAY",
    description:
      "조나는 충전대의 글래스 대신 지갑을 챙겨 집을 나선다. 그가 베이커리에 들르는 동안, 거리와 카페의 사람들은 여전히 안경을 두드려 문장을 고르고 탭 키를 누른다. 유리창에는 ‘AETER. MAKE EVERY CHOICE EFFORTLESS.’가 비친다.",
    cover: s.streetRainWalk,
    stills: [
      s.homeGlassesOff,
      s.homeGlassesDown,
      s.streetRainWalk,
      s.streetBakeryFront,
      s.streetBakery,
      s.streetJonahClose,
      s.streetPasserby,
      s.streetCafeReflection,
      s.streetCafe,
      s.streetCafeGlasses,
      s.streetCafeWriting,
      s.streetCafeInside,
      s.streetAeterBillboard,
      s.streetBillboardWide,
    ],
    spaceSlugs: ["home", "street"],
    relatedCharacterSlugs: ["jonah-keller"],
  },
];

export function getSequence(slug: string) {
  return sequences.find((q) => q.slug === slug);
}

/** Sequences with at least one still shot in the given space. */
export function sequencesInSpace(spaceSlug: string) {
  return sequences.filter((q) => q.spaceSlugs.includes(spaceSlug));
}
