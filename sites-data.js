/* The list of websites. One block per site, then redeploy.

   slug:     folder name under /sites/  ->  /sites/<slug>/<version>/
   live:     (optional) address of the live site. If set, the NEWEST version links here.
   versions: newest first. The first one is the "latest".
             v     = folder name (v1, v2, ...)
             label = what people see (optional, defaults to v)
             years = e.g. "2024–2025" (optional)
             note  = short line shown under the selector (optional)
*/
window.ARCHIVE_SITES = [
  {
    slug: "web",
    title: "City Metro Website",
    desc: "Archived versions of the City Metro website.",
    tags: ["home", "transit", "web"],
    live: "https://citymetro.xyz",
    versions: [
      { v: "v3", label: "Version 3" }
    ]
  },
  {
    slug: "police",
    title: "Transit Police",
    desc: "Archived versions of the Transit Police website.",
    tags: ["police", "safety", "security"],
    live: "https://police.citymetro.xyz",
    versions: [
      { v: "v1", label: "Version 1" },
      { v: "v2", label: "Version 2" }
    ]
  },
  {
    slug: "museum",
    title: "Transit Museum",
    desc: "Archived versions of the Transit Museum.",
    tags: ["transit-museum", "history", "museum"],
    live: "https://museum.citymetro.xyz",
    versions: [
      { v: "v1", label: "Version 1" }
    ]
  },
  {
    slug: "brickpass",
    title: "myBrickPass",
    desc: "Archived versions of Brickpass.",
    tags: ["brickpass"],
    live: "https://mybrickpass.citymetro.xyz",
    versions: [
      { v: "v3", label: "Version 3" },
      { v: "v2", label: "Version 2" },
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
    slug: "map",
    title: "Maps",
    desc: "Archived versions of the City Metro maps.",
    tags: ["maps"],
    live: "https://map.citymetro.xyz",
    versions: [
       { v: "v1", label: "Version 2" },
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
      { v: "v3", label: "Version 3" },
      { v: "v2", label: "Version 2" },
      { v: "v1", label: "Version 1" }
    ]
  },
  {
    slug: "alerts",
    title: "Transit Alerts",
    desc: "Live service alerts for City Metro Rail and Bus.",
    tags: ["alerts", "live", "rail", "bus"],
    live: "https://alerts.citymetro.xyz",
    versions: [
      { v: "v3", label: "Version 3" },
      { v: "v2", label: "Version 2" }
    ]
  },
  {
    slug: "union-station",
    title: "Union Station",
    desc: "Union Station's past official websites.",
    tags: ["lego city", "station", "rail", "bus"],
    live: "https://unionstation.citymetro.xyz",
    versions: [
      { v: "v1", label: "Version 1" }
    ]
  }
];
