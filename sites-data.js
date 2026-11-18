/* The list of websites. One block per site, then redeploy.

   slug:     folder name under /sites/  ->  /sites/<slug>/<version>/
   live:     (optional) address of the live site. If set, the NEWEST version links here.
   versions: newest first. The first one is the "latest".
             v     = folder name (v1, v2, ...)
             label = what people see (optional, defaults to v)
             years = e.g. "2024–2025" (optional)
             note  = short line shown under the selector (optional)           */
window.ARCHIVE_SITES = [
  {
    slug: "trip-planner",
    title: "Trip Planner",
    desc: "Plan a trip across City Metro Rail and Bus.",
    tags: ["trip", "planner", "rail", "bus"],
    live: "https://citymetro.xyz/trip",
    versions: [
      { v: "v3", label: "Version 3", years: "2026–present", note: "Current live version." },
      { v: "v2", label: "Version 2", years: "2025–2026" },
      { v: "v1", label: "Version 1", years: "2024–2025", note: "The original launch." }
    ]
  },
  {
    slug: "police",
    title: "City Metro Transit Police",
    desc: "Report a concern, locations, divisions, careers and the FLX Police mini site.",
    tags: ["police", "safety", "cmtp"],
    live: "https://police.citymetro.xyz",
    versions: [
      { v: "v1", label: "Version 1", years: "2026–present" }
    ]
  },
  {
    slug: "old-example",
    title: "Example Retired Site",
    desc: "Replace this example with one of your retired websites. No live link, so every version opens its archived copy.",
    tags: ["example", "retired"],
    versions: [
      { v: "v1", label: "Version 1", years: "2023–2025" }
    ]
  }
];
