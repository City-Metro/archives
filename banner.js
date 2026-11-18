/* City Metro Archives: "archived website" banner for old pages.
   Uses the same colours as the City Metro announcement bar. Styles are set from JS,
   so it works even on pages with a strict Content-Security-Policy. */
(function () {
  var s = document.currentScript;
  if (!s) return;
  var name = s.getAttribute("data-name") || document.title || "This website";
  var years = s.getAttribute("data-years");
  var version = s.getAttribute("data-version");
  var liveUrl = s.getAttribute("data-live");
  var detail = [version, years].filter(Boolean).join(", ");
  var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var bg = dark ? "#1b2f4d" : "#cfe0f3", fg = dark ? "#f2f4f8" : "#0b1220";

  function style(el, css) { for (var k in css) el.style[k] = css[k]; }
  function link(text, href) {
    var a = document.createElement("a");
    a.href = href; a.textContent = text;
    style(a, { color: "inherit", textDecoration: "underline", font: "inherit" });
    return a;
  }

  var bar = document.createElement("div");
  bar.setAttribute("role", "note");
  style(bar, {
    boxSizing: "border-box", width: "100%", padding: "10px 24px", textAlign: "center",
    background: bg, color: fg, fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: "16px", lineHeight: "1.5", fontWeight: "700", position: "relative", zIndex: "2147483000"
  });
  bar.appendChild(document.createTextNode(
    "Archived website: " + name + " is no longer updated" + (detail ? " (" + detail + ")" : "") + ". "));
  if (liveUrl) {
    bar.appendChild(link("Go to the live site", liveUrl));
    bar.appendChild(document.createTextNode(" · "));
  }
  bar.appendChild(link("Visit City Metro Archives", "https://archives.citymetro.xyz"));
  bar.appendChild(document.createTextNode(" · Preserved by the "));
  bar.appendChild(link("City Metro Transit Museum", "https://museum.citymetro.xyz"));

  function add() { document.body.insertBefore(bar, document.body.firstChild); }
  if (document.body) add(); else document.addEventListener("DOMContentLoaded", add);
})();
