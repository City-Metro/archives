<!DOCTYPE html>
<html>
<head>
<title>City Metro | Validator</title>
</head>

<body>
  <script src="https://archives.citymetro.xyz/banner.js" data-name="BrickPass" data-version="v1.5" data-years="2025" data-live="https://mybrickpass.citymetro.xyz"></script>
<h1>BrickPass Validator</h1>
<div id="reader" style="width:300px;"></div>
<h2 id="status">Waiting for scan…</h2>

<script>
const firebaseConfig = {
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const scanner = new Html5Qrcode("reader");

scanner.start(
  { facingMode: "environment" },
  { fps: 10, qrbox: 250 },
  async ticketId => {
    const ref = db.collection("tickets").doc(ticketId);
    const snap = await ref.get();

    if (!snap.exists) {
      status.textContent = "❌ INVALID TICKET";
      status.style.color = "red";
      return;
    }

    const t = snap.data();

    if (t.activePass) {
      status.textContent = "✅ ALREADY ACTIVE (" + t.activePass + ")";
      status.style.color = "green";
      return;
    }

    let pass = null;
    if (t.singles > 0) pass = "single";
    else if (t.dayPasses > 0) pass = "day";
    else if (t.weekPasses > 0) pass = "week";

    if (!pass) {
      status.textContent = "❌ NO PASSES LEFT";
      status.style.color = "red";
      return;
    }

    await ref.update({
      activePass: pass,
      activatedAt: Date.now(),
      singles: pass === "single" ? t.singles - 1 : t.singles,
      dayPasses: pass === "day" ? t.dayPasses - 1 : t.dayPasses,
      weekPasses: pass === "week" ? t.weekPasses - 1 : t.weekPasses
    });

    status.textContent = "✅ ACTIVATED: " + pass.toUpperCase();
    status.style.color = "green";
  }
);
</script>
</body>
</html>
