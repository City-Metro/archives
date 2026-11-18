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
    title: "myBrickPass",
    desc: "Archived versions of Brickpass.",
    tags: ["brickpass"],
     live: "https://mybrickpass.citymetro.xyz",
    versions: [
       { v: "v3", label: "Version 3" },
      { v: "v2", label: "Version 2" },
      { v: "v1.5", label: "Version 1.5" },
      { v: "v1", label: "Version 1" }
    ]
  },
  {
    slug: "live-arrivals",
    title: "Live Arrivals",
    desc: "Archived versions of Live Arrivals.",
    tags: ["live", "arrivals"],
    versions: [
      { v: "v2", label: "Version 2" },
      { v: "v1", label: "Version 1" }
    ]
  },
  {
    slug: "maps",
    title: "Maps",
    desc: "Archived versions of the City Metro maps.",
    tags: ["maps"],
     live: "https://map.citymetro.xyz",
    versions: [
      { v: "v1", label: "Version 1" }
    ]
  },
  {
    slug: "trip-planner",
    title: "Trip Planner",
    desc: "Plan a trip across City Metro Rail and Bus.",
    tags: ["trip", "planner", "rail", "bus"],
    live: "https://trip-planner.citymetro.xyz",
    versions: [
      { v: "v2", label: "Version 2" },
      { v: "v1", label: "Version 1" }
    ]
  }
];
