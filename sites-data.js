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
    slug: "brickpass",
    title: "Brickpass",
    desc: "Archived versions of the Brickpass website.",
    tags: ["brickpass"],
    versions: [
      { v: "v1.5", label: "Version 1.5" },
      { v: "v1", label: "Version 1" },
      { v: "v2", label: "Version 2" }
    ]
  },
  {
    slug: "live-arrivals",
    title: "Live Arrivals",
    desc: "Archived versions of the Live Arrivals website.",
    tags: ["live", "arrivals"],
    versions: [
      { v: "v2", label: "Version 2" },
      { v: "v1", label: "Version 1" }
    ]
  },
  {
    slug: "maps",
    title: "Maps",
    desc: "Archived versions of the City Metro maps website.",
    tags: ["maps"],
    versions: [
      { v: "v1", label: "Version 1" }
    ]
  },
  {
    slug: "trip-planner",
    title: "Trip Planner",
    desc: "Plan a trip across City Metro Rail and Bus.",
    tags: ["trip", "planner", "rail", "bus"],
    live: "https://citymetro.xyz/trip",
    versions: [
      { v: "v2", label: "Version 2", years: "2025–2026" },
      { v: "v1", label: "Version 1", years: "2024–2025", note: "The original launch." }
    ]
  }
];
