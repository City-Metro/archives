/* City Metro Archives: shared header, footer and search.
   Edit NAV, FOOTER and the constants below to change every page at once. */
(function () {
  var LOGO = "https://alerts.citymetro.xyz/logo.png";
  var CONTACT = "museum@citymetro.xyz";
  var NAV = [
    { label: "Home", href: "/" },
    { label: "Browse", href: "/#browse" },
    { label: "About", href: "/#about" },
    { label: "Museum", href: "https://museum.citymetro.xyz" }
  ];
  var FOOTER = [
    { title: "Archives", links: [["Browse websites", "/#browse"], ["About", "/#about"]] },
    { title: "Museum", links: [["City Metro Transit Museum", "https://museum.citymetro.xyz"], ["Email us", "mailto:" + CONTACT]] },
    { title: "City Metro", links: [["City Metro", "https://citymetro.xyz"], ["Transit Police", "https://police.citymetro.xyz"]] }
  ];
  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------- Header + mobile hamburger ---------- */
  var h = document.getElementById("site-header");
  if (h) {
    h.innerHTML =
      '<header class="site-header"><div class="container header-inner">' +
      '<a class="logo" href="/" aria-label="City Metro Archives home"><img src="' + LOGO + '" alt="City Metro"></a>' +
      '<button type="button" class="menu-btn" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span><span></span><span></span></button>' +
      '<nav class="nav" id="nav" aria-label="Main"><ul class="nav-list">' +
      NAV.map(function (n) {
        return '<li><a class="nav-link' + (n.href === location.pathname ? " active" : "") + '" href="' + n.href + '">' + n.label + "</a></li>";
      }).join("") +
      '</ul><div class="nav-cta-wrap"><a class="btn nav-cta" href="mailto:' + CONTACT + '">Contact</a></div></nav>' +
      "</div></header>";
    var btn = h.querySelector(".menu-btn"), nav = h.querySelector("#nav");
    function setMenu(open) {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    }
    btn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) setMenu(false); });
  }

  /* ---------- Footer ---------- */
  var f = document.getElementById("site-footer");
  if (f) {
    f.innerHTML =
      '<footer class="site-footer"><div class="container"><div class="footer-cols">' +
      FOOTER.map(function (c) {
        return "<div><h4>" + c.title + "</h4><ul>" +
          c.links.map(function (l) { return '<li><a href="' + l[1] + '">' + l[0] + "</a></li>"; }).join("") +
          "</ul></div>";
      }).join("") +
      '</div><div class="legal"><span>© ' + new Date().getFullYear() +
      ' City Metro Transit Museum. Managed at <a href="https://museum.citymetro.xyz">museum.citymetro.xyz</a>.</span>' +
      '<span><a href="mailto:' + CONTACT + '">' + CONTACT + "</a></span></div></div></footer>";
  }

  /* ---------- Search (only on the page with the search box) ---------- */
  var form = document.getElementById("searchForm");
  var data = window.ARCHIVE_SITES;
  if (!form || !data) return;

  var input = document.getElementById("q");
  var out = document.getElementById("results");
  var count = document.getElementById("count");
  var filters = document.getElementById("filters");
  var stats = document.getElementById("stats");
  var filter = "all";

  /* Stats row */
  if (stats) {
    var nSites = data.length, nVers = 0, nLive = 0;
    data.forEach(function (s) { nVers += (s.versions || []).length; if (s.live) nLive++; });
    stats.innerHTML =
      '<div class="stat"><b>' + nSites + "</b><span>Websites</span></div>" +
      '<div class="stat"><b>' + nVers + "</b><span>Versions kept</span></div>" +
      '<div class="stat"><b>' + nLive + "</b><span>Live now</span></div>" +
      '<div class="stat"><b>' + (nVers - nLive) + "</b><span>Archived copies</span></div>";
  }

  /* Address and label of every version of a site (first = latest) */
  function versionsOf(s) {
    return (s.versions || []).map(function (v, i) {
      var live = i === 0 && !!s.live;
      return {
        label: v.label || v.v, years: v.years || "", note: v.note || "", live: live,
        url: live ? s.live : "/sites/" + s.slug + "/" + v.v + "/"
      };
    });
  }
  function hay(s) {
    var vs = (s.versions || []).map(function (v) { return [v.v, v.label, v.years, v.note].join(" "); }).join(" ");
    return [s.title, s.desc, s.slug, s.live || "", (s.tags || []).join(" "), vs].join(" ").toLowerCase();
  }
  function score(s, ws) {
    var t = s.title.toLowerCase(), hs = hay(s), total = 0;
    for (var i = 0; i < ws.length; i++) {
      if (hs.indexOf(ws[i]) === -1) return 0;      // every word must match
      total += t.indexOf(ws[i]) !== -1 ? 3 : 1;    // title matches rank higher
    }
    return total;
  }
  function mark(text, ws) {
    var safe = esc(text);
    ws.forEach(function (w) {
      var re = new RegExp("(" + esc(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      safe = safe.replace(re, "<mark>$1</mark>");
    });
    return safe;
  }

  function cardHtml(s, ws) {
    var vs = versionsOf(s);
    if (!vs.length) return "";
    var first = vs[0];
    var opts = vs.map(function (v, i) {
      var text = v.label + (v.years ? " (" + v.years + ")" : "") + (v.live ? " · live site" : "") + (i === 0 ? " · latest" : "");
      return '<option value="' + i + '">' + esc(text) + "</option>";
    }).join("");
    var picker = vs.length > 1
      ? '<select class="ver-select" aria-label="Choose a version of ' + esc(s.title) + '">' + opts + "</select>" : "";
    return '<article class="line-card arch-card" data-slug="' + esc(s.slug) + '">' +
      '<span class="line-icon">' + ICON + "</span>" +
      '<div class="arch-meta"><span class="status ' + (first.live ? "online" : "") + '">' + (first.live ? "Online" : "Archived") + "</span>" +
      '<span class="arch-years">' + esc(first.years) + "</span></div>" +
      "<h3>" + mark(s.title, ws) + "</h3>" +
      "<p>" + mark(s.desc || "", ws) + "</p>" +
      '<div class="ver-row">' + picker +
      '<a class="btn open-btn" href="' + esc(first.url) + '">' + (first.live ? "Open live site" : "Open archived copy") + "</a></div>" +
      '<p class="ver-note">' + esc(first.note) + "</p></article>";
  }

  function render() {
    var q = input.value.trim(), ws = q.toLowerCase().split(/\s+/).filter(Boolean);
    var list = data.filter(function (s) {
      return filter === "all" || (filter === "online" ? !!s.live : !s.live);
    });
    if (ws.length) {
      list = list.map(function (s) { return { s: s, n: score(s, ws) }; })
        .filter(function (x) { return x.n > 0; })
        .sort(function (a, b) { return b.n - a.n; })
        .map(function (x) { return x.s; });
    } else {
      list = list.slice().sort(function (a, b) { return a.title.localeCompare(b.title); });
    }
    count.textContent = list.length + (list.length === 1 ? " website" : " websites") + (q ? ' for "' + q + '"' : "");
    if (!list.length) {
      out.innerHTML = '<div class="empty">No websites found. Try fewer words, or email <a href="mailto:' + CONTACT + '">' + CONTACT + "</a> to request one.</div>";
      return;
    }
    out.innerHTML = list.map(function (s) { return cardHtml(s, ws); }).join("");
  }

  /* Version selector: update the button, tag, years and note */
  out.addEventListener("change", function (e) {
    var sel = e.target.closest(".ver-select"); if (!sel) return;
    var card = sel.closest(".arch-card");
    var site = data.filter(function (s) { return s.slug === card.getAttribute("data-slug"); })[0];
    var v = versionsOf(site)[Number(sel.value)];
    var btn = card.querySelector(".open-btn");
    btn.href = v.url;
    btn.textContent = v.live ? "Open live site" : "Open archived copy";
    var st = card.querySelector(".status");
    st.className = "status" + (v.live ? " online" : "");
    st.textContent = v.live ? "Online" : "Archived";
    card.querySelector(".arch-years").textContent = v.years;
    card.querySelector(".ver-note").textContent = v.note;
  });

  function syncUrl() {
    var q = input.value.trim();
    history.replaceState(null, "", q ? "?q=" + encodeURIComponent(q) : location.pathname);
  }
  input.addEventListener("input", function () { render(); syncUrl(); });
  form.addEventListener("submit", function (e) {
    e.preventDefault(); render(); syncUrl();
    var r = document.getElementById("browse"); if (r) r.scrollIntoView({ behavior: "smooth" });
  });
  filters.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    filter = b.getAttribute("data-f");
    [].forEach.call(filters.children, function (c) { c.setAttribute("aria-pressed", String(c === b)); });
    render();
  });

  var start = new URLSearchParams(location.search).get("q");
  if (start) input.value = start;
  render();
})();
