/* City Metro Archives: "archived website" notice for old pages.
   Paste the <script> tag from the guide right after <body>.
   Options (all optional): data-name, data-version, data-years, data-live
   Styles are set from JavaScript, so it works on pages with a strict CSP. */
(function () {
  var s = document.currentScript;
  if (!s) return;

  var name = s.getAttribute("data-name") || document.title || "This website";
  var detail = [s.getAttribute("data-version"), s.getAttribute("data-years")].filter(Boolean).join(", ");
  var liveUrl = s.getAttribute("data-live");
  var ARCHIVE = "https://archives.citymetro.xyz";
  var MUSEUM = "https://museum.citymetro.xyz";
  var BLUE = "#134590", BLUE_HOVER = "#0e3573";
  var FONT = '"Helvetica Neue",Helvetica,Arial,sans-serif';

  function css(el, o) { for (var k in o) el.style[k] = o[k]; return el; }
  function el(tag, o, text) {
    var e = document.createElement(tag);
    if (o) css(e, o);
    if (text) e.textContent = text;
    return e;
  }
  function button(label, href, primary) {
    var a = el("a", {
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      boxSizing: "border-box", minHeight: "40px", padding: "8px 20px",
      borderRadius: "999px", font: "700 14px/1.2 " + FONT, textDecoration: "none",
      whiteSpace: "nowrap", cursor: "pointer",
      background: primary ? "#fff" : "transparent",
      color: primary ? BLUE : "#fff",
      border: "2px solid " + (primary ? "#fff" : "rgba(255,255,255,.7)")
    }, label);
    a.href = href;
    a.addEventListener("mouseenter", function () {
      a.style.background = primary ? "#e8effa" : "rgba(255,255,255,.16)";
    });
    a.addEventListener("mouseleave", function () {
      a.style.background = primary ? "#fff" : "transparent";
    });
    return a;
  }
  function icon() {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.style.width = "26px"; svg.style.height = "26px"; svg.style.fill = "#fff";
    var p = document.createElementNS(ns, "path");
    p.setAttribute("d", "M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z");
    svg.appendChild(p);
    return svg;
  }

  var iconBox = el("span", {
    display: "flex", alignItems: "center", justifyContent: "center", flex: "none",
    width: "48px", height: "48px", borderRadius: "14px", background: "rgba(255,255,255,.16)"
  });
  iconBox.appendChild(icon());

  /* Message */
  var title = el("div", { font: "700 17px/1.3 " + FONT, margin: "0 0 2px" }, "This is an archived website");
  var msg = el("div", { font: "400 14px/1.45 " + FONT, opacity: ".95" },
    "You are viewing an archived copy of " + name + (detail ? " (" + detail + ")" : "") +
    ". It is no longer updated and may be out of date.");
  var credit = el("div", { font: "400 13px/1.45 " + FONT, opacity: ".85", marginTop: "2px" }, "Preserved by the ");
  var museumLink = el("a", { color: "#fff", textDecoration: "underline", font: "inherit" }, "City Metro Transit Museum");
  museumLink.href = MUSEUM;
  credit.appendChild(museumLink);

  var text = el("div", { flex: "1 1 280px", minWidth: "0" });
  text.appendChild(title); text.appendChild(msg); text.appendChild(credit);

  /* Buttons */
  var actions = el("div", { display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" });
  if (liveUrl) actions.appendChild(button("Go to the live site", liveUrl, true));
  actions.appendChild(button("Browse the archives", ARCHIVE, !liveUrl));

  var inner = el("div", {
    display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 18px",
    boxSizing: "border-box", maxWidth: "1100px", margin: "0 auto", padding: "14px 24px"
  });
  inner.appendChild(iconBox); inner.appendChild(text); inner.appendChild(actions);

  var bar = el("div", {
    position: "relative", zIndex: "2147483000", boxSizing: "border-box", width: "100%",
    background: BLUE, color: "#fff", textAlign: "left", fontFamily: FONT,
    borderBottom: "3px solid " + BLUE_HOVER, textShadow: "none"
  });
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Archived website notice");
  bar.appendChild(inner);

  function add() { document.body.insertBefore(bar, document.body.firstChild); }
  if (document.body) add(); else document.addEventListener("DOMContentLoaded", add);
})();
