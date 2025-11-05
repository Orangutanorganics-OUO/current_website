export const BATCH = {
  batchId: "OUO-GHEE-2025-09-25-001",
  product: "Badri Cow Ghee",
  altitudeM: 2300,
  origin: {
    village: "Bhangeli",
    valley: "Gangotri Valley",
    district: "Uttarkashi, Uttarakhand",
  },
  maker: {
    name: "Nirmala Devi",
    role: "Ghee maker (Bilona – Indigenous method)",
  },
  herd: {
    breed: "Badri Cow",
    yieldMinL: 1.5,
    yieldMaxL: 4.0,
    note: "Yield varies with season, diet, biological condition and mood.",
  },
  dates: {
    milkCollected: "2025-09-23",
    cultureInoculated: "2025-09-23",
    fermented: "2025-09-24",
    churned: "2025-09-24",
    clarified: "2025-09-24",
    filtered: "2025-09-24",
  },
  specs: {
    fermentationAcidity: "~1% lactic acid (target)",
    method:
      "Boil → Culture inoculation → Fermentation → Churning → Makhan → Ghee boiling → Filtration → Ghee residue (GR)",
    grRatio: "≈ 1:10 (GR : Ghee) by weight (illustrative)",
  },
};

export const STEPS = [
  {
    id: "s1",
    code: "BOIL",
    title: "Boiling",
    date: "2025-09-23",
    by: "Nirmala Devi",
    details: "Fresh Badri cow milk gently boiled to prep for culture inoculation.",
    checks: ["Visual clarity", "Sanitised kettle"],
  },
  {
    id: "s2",
    code: "CULT",
    title: "Culture Inoculation",
    date: "2025-09-23",
    by: "Nirmala Devi",
    details: "Cooled milk inoculated with indigenous starter culture.",
    checks: ["Hygienic ladle", "Starter viability"],
  },
  {
    id: "s3",
    code: "FERM",
    title: "Fermentation (~1% LA)",
    date: "2025-09-24",
    by: "Nirmala Devi",
    details: "Set overnight till pleasantly sour; target ~1% lactic acid.",
    checks: ["Clean aroma", "Proper set"],
  },
  {
    id: "s4",
    code: "CHRN",
    title: "Churning (Bilona)",
    date: "2025-09-24",
    by: "Nirmala Devi",
    details: "Hand/bilona churning separates makkhan and desi buttermilk.",
    checks: ["Butter separation", "Buttermilk clarity"],
  },
  {
    id: "s5",
    code: "GBLN",
    title: "Makhan → Ghee Boiling",
    date: "2025-09-24",
    by: "Nirmala Devi",
    details: "Makkhan clarified on gentle heat till moisture cooks off and nutty aroma develops.",
    checks: ["Golden hue", "No burnt notes"],
  },
  {
    id: "s6",
    code: "FLTR",
    title: "Filtration",
    date: "2025-09-24",
    by: "Nirmala Devi",
    details: "Hot ghee filtered; GR retained separately.",
    checks: ["Clean filter", "No particulates"],
  },
  {
    id: "s7",
    code: "GR",
    title: "Ghee Residue (GR)",
    date: "2025-09-24",
    by: "Nirmala Devi",
    details: "SNF‑rich residue (≈1/10th of ghee) reserved; key for flavour & colour.",
    checks: ["Aroma intensity", "Even browning"],
  },
];

export const VALUE_CHAIN = [
  { node: "Mountain Farmer (Milk & Labour)", share: 55, note: "Raw milk, bilona labour, village utilities" },
  { node: "Processing & Clarification", share: 15, note: "Fuel/energy, culture prep, filtration" },
  { node: "Packaging", share: 10, note: "Food-safe glass, caps, labels" },
  { node: "Logistics", share: 12, note: "First-mile, line-haul, last-mile" },
  { node: "OUO Ops & QA", share: 8, note: "Testing, traceability, admin" },
];