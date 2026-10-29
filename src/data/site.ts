export type NavChapter = {
  href: string;
  label: string;
  index: string;
};

export const chapters: NavChapter[] = [
  { href: "/#characters", label: "Characters", index: "01" },
  { href: "/#sequences", label: "Sequences", index: "02" },
  { href: "/#scenes", label: "Scenes & Spaces", index: "03" },
  { href: "/#aeter", label: "AETER", index: "04" },
  { href: "/#process", label: "Process", index: "05" },
];

export const higgsfieldProjectUrl = "https://higgsfield.ai/s/v7Fok3Y1xgM";

export const site = {
  name: "THE CRITIC",
  shortName: "THE CRITIC",
  description:
    "A preproduction archive for THE CRITIC — a film about a critic, a chef, and the AI that reads the critic's palate for him.",
  director: "JANE KIM",
};
