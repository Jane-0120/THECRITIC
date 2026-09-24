// Shared content types for the site. All image fields are `ImageRef` —
// there are no real production stills yet, so every image renders through
// the <Placeholder> component. Swap in real assets by giving a `src`.

export type ImageRef = {
  /** Short Korean label shown inside the placeholder frame, e.g. "장면 07 · 옥상" */
  label: string;
  alt: string;
  /** width/height aspect ratio, e.g. "16/9", "3/4", "1/1" */
  aspect?: string;
  /** Once a real asset exists, drop it in /public and set this path */
  src?: string;
  tone?: "paper" | "stage";
};

export type ExternalLink = {
  label: string;
  url: string | null;
};

// ---------- Film ----------
export type FilmInfo = {
  title: string;
  englishTitle: string;
  tagline: string;
  runtimeMinutes: number | null;
  year: string | null;
  poster: ImageRef;
  videoSrc: string | null;
  captionsSrc: string | null;
};

// ---------- World / About ----------
export type WorldRule = {
  key: string;
  title: string;
  summary: string;
  detail: string;
};

export type WorldInfo = {
  logline: string;
  synopsisShort: string;
  synopsisLong: string;
  intent: string;
  questions: string[];
  rules: WorldRule[];
};

// ---------- Characters ----------
export type CharacterDesign = {
  image: ImageRef;
  caption: string;
};

export type Character = {
  slug: string;
  name: string;
  role: string;
  oneLiner: string;
  desire: string;
  conflict: string;
  portrait: ImageRef;
  designCriteria: {
    appearance: string;
    costume: string;
    behavior: string;
  };
  earlyDesign: CharacterDesign;
  finalDesign: CharacterDesign;
  relatedScenes: string[];
};

// ---------- Scenes & Spaces ----------
export type Hotspot = {
  id: string;
  x: number; // percent, 0-100
  y: number; // percent, 0-100
  label: string;
  description: string;
};

export type StoryboardPanel = {
  image: ImageRef;
  caption: string;
};

export type Scene = {
  slug: string;
  number: string;
  title: string;
  thumbnail: ImageRef;
  finalStill: ImageRef;
  directorIntent: string;
  space: {
    lighting: string;
    color: string;
    material: string;
    props: string[];
    image: ImageRef;
    hotspots: Hotspot[];
  };
  storyboard: StoryboardPanel[];
  compare: {
    before: ImageRef;
    after: ImageRef;
    caption: string;
  };
  makingRecordSlugs: string[];
  relatedCharacterSlugs: string[];
};

// ---------- AETER ----------
export type AeterApplication = {
  title: string;
  description: string;
  image: ImageRef;
  sceneSlug?: string;
};

export type AeterInfo = {
  philosophy: string;
  visualIdentity: {
    title: string;
    description: string;
  }[];
  relationToFilm: string;
  applications: AeterApplication[];
  cta: ExternalLink;
  logomark: ImageRef;
};

// ---------- Making with AI ----------
export type MakingStageKey =
  | "planning"
  | "exploration"
  | "finalize"
  | "generation"
  | "post"
  | "final";

export type MakingStage = {
  key: MakingStageKey;
  label: string;
  description: string;
};

export type MakingVersion = {
  image: ImageRef;
  label: string;
  note: string;
};

export type MakingRecord = {
  slug: string;
  stage: MakingStageKey;
  title: string;
  goal: string;
  tools: string[];
  inputs: string[];
  issues: string[];
  revisions: string[];
  rationale: string;
  humanInvolvement: string;
  prompt: string | null;
  versions: MakingVersion[];
  sceneSlug?: string;
};

// ---------- Archive / Higgsfield ----------
export type ArchiveMaterialType = "image" | "video" | "3d" | "audio" | "document";
export type ArchiveStage =
  | "concept"
  | "design"
  | "storyboard"
  | "generation"
  | "post";

export type ArchiveItem = {
  slug: string;
  title: string;
  thumbnail: ImageRef;
  materialType: ArchiveMaterialType;
  stage: ArchiveStage;
  sceneSlug?: string;
  date: string;
  version: string;
  isHiggsfield: boolean;
  higgsfieldUrl: string | null;
  description: string;
};

// ---------- Credits ----------
export type CreditEntry = {
  name: string;
  role: string;
  tools: string[];
  link: ExternalLink | null;
};
