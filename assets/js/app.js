/* =========================================================
   MarkdAthlete — site scripts (no build step needed)
   ========================================================= */
(function () {
  const C = window.MA_CONFIG, A = window.MA_ATHLETES, S = window.MA_SPONSORS, T = window.MA_SPOT_TYPES;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = n => "$" + Number(n).toLocaleString("en-US");
  const initials = n => n.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
  const athlete = id => A.find(a => a.id === id);
  const sponsor = id => S.find(s => s.id === id);
  const page = document.body.dataset.page;

  /* ---------- icons ---------- */
  const I = {
    msg: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    share: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v14"/></svg>',
    pin: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    arrow: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    out: '<svg class="icon" style="width:16px;height:16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M7 17L17 7M8 7h9v9"/></svg>',
    badge: '<svg class="icon" style="width:18px;height:18px" viewBox="0 0 24 24" fill="none" stroke="#ff5a0a" stroke-width="2.4"><circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0b0b0b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };
  const speed = n => '<div class="speed" aria-hidden="true">' + "<i></i>".repeat(n) + "</div>";

  /* ---------- dates ---------- */
  const parse = d => new Date(d + "T12:00:00");
  const daysLeft = d => Math.max(0, Math.ceil((parse(d) - new Date()) / 864e5));
  const fmtDate = d => parse(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const mon = d => parse(d).toLocaleDateString("en-US", { month: "short" });
  const day = d => parse(d).getDate();

  /* ---------- campaign helpers ---------- */
  const activeCampaign = a => a.races.filter(r => r.campaign && daysLeft(r.date) >= 0 && parse(r.date) >= new Date(new Date().toDateString()))
    .sort((x, y) => parse(x.date) - parse(y.date))[0];
  const openSpots = r => r.spots.filter(s => !s.sponsoredBy);
  const fromPrice = r => { const o = openSpots(r); return o.length ? Math.min(...o.map(s => s.price)) : 0; };

  /* ---------- art ---------- */
  function hash(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }
  function coverArt(a) {
    if (a.cover) return `<img src="${esc(a.cover)}" alt="${esc(a.name)} racing">`;
    const h = hash(a.id), y = 30 + (h % 40), rot = -28 - (h % 8);
    const lines = [0, 1, 2, 3].map(i => `<rect x="${520 + i * 40 - (h % 90)}" y="${y + i * 26}" width="${300 - i * 60}" height="12" rx="6" fill="#ff5a0a" opacity="${(0.9 - i * 0.2).toFixed(2)}" transform="skewX(-30)"/>`).join("");
    return `<svg class="cover-art" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="g${h}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1c1c1c"/><stop offset=".6" stop-color="#0b0b0b"/><stop offset="1" stop-color="#2a1205"/></linearGradient></defs>
      <rect width="1000" height="400" fill="url(#g${h})"/>
      <g transform="rotate(${rot} 500 200)" opacity=".07" fill="#fff">${[0,1,2,3,4,5].map(i=>`<rect x="-200" y="${i*90}" width="1600" height="34"/>`).join("")}</g>
      <text x="960" y="370" text-anchor="end" font-family="Barlow Condensed, Impact, sans-serif" font-weight="800" font-style="italic" font-size="300" fill="#fff" opacity=".06">${esc(initials(a.name))}</text>
      ${lines}
      <text x="40" y="70" font-family="Barlow Condensed, Impact, sans-serif" font-weight="800" font-style="italic" font-size="40" fill="#ff5a0a" letter-spacing="2">${esc(a.disciplines[0].sport.toUpperCase())}</text>
    </svg>`;
  }
  const avatar = (a, cls = "") => `<div class="avatar ${cls}">${a.photo ? `<img src="${esc(a.photo)}" alt="${esc(a.name)}">` : esc(initials(a.name))}</div>`;

  /* ---------- shell ---------- */
  function header() {
    const links = [["athletes.html", "Athletes", "athletes"], ["campaigns.html", "Campaigns", "campaigns"], ["sponsors.html", "Sponsor Wall", "sponsors"], ["how-it-works.html", "How it works", "how"], ["about.html", "Mission", "about"]];
    return `<div class="announce">${esc(C.launchNote)} <a href="get-sponsored.html">Claim your page →</a></div>
    <header class="site-header"><div class="wrap nav">
      <a class="nav-logo" href="index.html" aria-label="MarkdAthlete home"><img src="assets/img/logo-light.png" alt="MarkdAthlete"></a>
      <nav class="nav-links">${links.map(l => `<a href="${l[0]}" class="${page === l[2] ? "active" : ""}">${l[1]}</a>`).join("")}</nav>
      <div class="nav-cta"><a class="btn btn-outline on-dark btn-sm" href="sponsors.html#become">Sponsor</a><a class="btn btn-orange btn-sm" href="get-sponsored.html">Get sponsored</a></div>
      <button class="nav-toggle" aria-label="Open menu">${I.menu}</button>
    </div></header>`;
  }
  function footer() {
    return `<div class="tagline-strip" aria-hidden="true"><div class="marquee">${("<span>Get Seen</span><span>Get Sponsored</span><span>Get Markd</span>").repeat(6)}</div></div>
    <footer class="site-footer"><div class="wrap">
      <div class="foot-grid">
        <div><img src="assets/img/logo-light.png" alt="MarkdAthlete"><p style="max-width:320px">Connecting athletes with sponsors, brands and opportunities. ${esc(C.tagline)}</p></div>
        <div><h5>Athletes</h5><a href="get-sponsored.html">Get sponsored</a><a href="athletes.html">Browse athletes</a><a href="how-it-works.html#athletes">How it works</a></div>
        <div><h5>Sponsors</h5><a href="campaigns.html">Open campaigns</a><a href="sponsors.html">Sponsor wall</a><a href="how-it-works.html#sponsors">How sponsoring works</a></div>
        <div><h5>MarkdAthlete</h5><a href="about.html">Our mission</a><a href="mailto:${esc(C.contactEmail)}">${esc(C.contactEmail)}</a><a href="https://instagram.com/${esc(C.instagram)}" target="_blank" rel="noopener">@${esc(C.instagram)}</a></div>
      </div>
      <div class="foot-bottom"><span>© ${new Date().getFullYear()} MarkdAthlete. Your Passion. Your Brand. Your Legacy.</span><span>markdathlete.com</span></div>
    </div></footer><div class="toast" role="status"></div>`;
  }
  const hEl = $("#site-header"), fEl = $("#site-footer");
  if (hEl) hEl.outerHTML = header();
  if (fEl) fEl.outerHTML = footer();
  document.addEventListener("click", e => {
    if (e.target.closest(".nav-toggle")) $(".site-header").classList.toggle("open");
  });

  function toast(msg) { const t = $(".toast"); if (!t) return; t.textContent = msg; t.classList.add("on"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("on"), 2600); }
  async function share(title, url = location.href) {
    try { if (navigator.share) { await navigator.share({ title, url }); return; } await navigator.clipboard.writeText(url); toast("Link copied"); }
    catch (_) { /* cancelled */ }
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-share]"); if (!b) return;
    e.preventDefault(); share(b.dataset.share || document.title, b.dataset.url ? new URL(b.dataset.url, location.href).href : location.href);
  });

  /* ---------- form submit (endpoint or mailto fallback) ---------- */
  async function submitForm(subject, data) {
    if (C.formEndpoint) {
      const r = await fetch(C.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ _subject: subject, ...data }) });
      if (!r.ok) throw new Error("Request failed");
      return "sent";
    }
    const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
    location.href = `mailto:${C.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return "mail";
  }

  /* ---------- cards ---------- */
  function athleteCard(a) {
    const r = activeCampaign(a);
    return `<a class="a-card reveal" href="athlete.html?id=${a.id}">
      <div class="cover">${coverArt(a)}</div>
      ${avatar(a)}
      <div class="a-card-body">
        <div style="display:flex;gap:8px;flex-wrap:wrap">${a.founding ? `<span class="pill">${I.badge}Founding Athlete</span>` : ""}${r ? '<span class="pill pill-orange">Taking sponsors</span>' : ""}</div>
        <h3>${esc(a.name)}</h3>
        <p class="sub">${esc(a.headline)}</p>
        <p class="sub" style="display:flex;gap:6px;align-items:center">${I.pin}${esc(a.location)}</p>
        <div class="race-line">${r ? `<div><span class="sub">Next race · ${daysLeft(r.date)} days</span><b>${esc(r.name)}</b></div><span class="pill pill-soft">from ${money(fromPrice(r))}</span>` : `<div><span class="sub">No open campaign</span><b>View profile</b></div>${I.arrow}`}</div>
      </div></a>`;
  }
  function sponsorCard(s) {
    const logo = s.logo ? `<img src="${esc(s.logo)}" alt="${esc(s.name)} logo">` :
      `<span class="s-glow" style="background:${esc(s.color || "#ff5a0a")}"></span><div class="s-mono">${esc(s.name.split(" ").slice(0, 2).join(" "))}<em>${esc(s.name.split(" ").slice(2).join(" ") || s.city)}</em></div>`;
    const backs = s.sponsored.map(x => { const a = athlete(x.athlete); return a ? `<div class="backed">${avatar(a)}<span>Sponsored <b>${esc(a.name)}</b> at ${esc(x.race)}</span></div>` : ""; }).join("");
    const btns = [
      `<a class="btn btn-orange btn-sm" href="mailto:${esc(C.contactEmail)}?subject=${encodeURIComponent("Message for " + s.name)}">${I.msg}Message</a>`,
      s.website ? `<a class="btn btn-outline on-dark btn-sm" href="${esc(s.website)}" target="_blank" rel="noopener">Website</a>` : "",
      s.instagram ? `<a class="btn btn-outline on-dark btn-sm" href="https://instagram.com/${esc(s.instagram)}" target="_blank" rel="noopener">Instagram</a>` : ""
    ].join("");
    return `<article class="s-card reveal"><div class="s-logo">${logo}</div><div class="s-body"><h4>${esc(s.name)}</h4><p class="meta">${esc(s.city)} · Since ${esc(s.since)}</p>${backs}<div class="s-actions">${btns}</div></div></article>`;
  }
  const inviteCard = () => `<div class="s-card invite reveal"><p class="display">Your<br>logo<br><span class="hl">here.</span></p><a class="btn btn-orange" href="campaigns.html">Sponsor an athlete</a><button class="btn btn-outline on-dark" data-share="Sponsor an athlete on MarkdAthlete" data-url="sponsors.html">${I.share}Invite a sponsor</button></div>`;

  function campaignCard(a, r) {
    const o = openSpots(r);
    return `<a class="a-card reveal" href="athlete.html?id=${a.id}#campaign" style="background:var(--ink);color:#fff;border-color:#222">
      <div class="a-card-body" style="padding:24px">
        <div class="camp-who">${avatar(a)}<span>${esc(a.name)}</span></div>
        <h3 style="font-size:40px;margin-top:10px">Sponsor me at <span class="hl">${esc(r.name)}</span></h3>
        <p class="sub" style="color:#cfcbc4">${esc(r.division)} · ${fmtDate(r.date)} · ${esc(r.city)}<br>Goal: <b style="color:#fff">${esc(r.goal)}</b></p>
        <div class="race-line" style="border-color:#2a2a2a"><div><span class="sub" style="color:#a3a09a">${daysLeft(r.date)} days left · ${o.length} spots open</span><b>from ${money(fromPrice(r))}</b></div><span class="btn btn-orange btn-sm">Sponsor</span></div>
      </div></a>`;
  }

  /* ---------- reveal on scroll ---------- */
  function reveal() {
    const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08 }) : null;
    $$(".reveal:not(.in)").forEach(el => io ? io.observe(el) : el.classList.add("in"));
  }

  /* ---------- pages ---------- */
  const pages = {
    home() {
      const feat = A.map(a => [a, activeCampaign(a)]).filter(x => x[1]).sort((x, y) => parse(x[1].date) - parse(y[1].date)).slice(0, 3);
      $("#home-campaigns").innerHTML = feat.map(([a, r]) => campaignCard(a, r)).join("");
      $("#home-athletes").innerHTML = A.slice(0, 3).map(athleteCard).join("");
      $("#home-wall").innerHTML = inviteCard() + S.slice(0, 5).map(sponsorCard).join("");
      const spots = A.reduce((n, a) => n + a.races.reduce((m, r) => m + openSpots(r).length, 0), 0);
      $("#stat-athletes").textContent = A.length; $("#stat-sponsors").textContent = S.length; $("#stat-spots").textContent = spots;
    },
    athletes() {
      const sports = ["All", ...new Set(A.flatMap(a => a.disciplines.map(d => d.sport)))];
      let cur = "All", q = "";
      $("#filters").innerHTML = sports.map(s => `<button class="filter ${s === cur ? "on" : ""}" data-sport="${esc(s)}">${esc(s)}</button>`).join("") + '<input class="search" type="search" placeholder="Search name or city" aria-label="Search athletes">';
      const draw = () => {
        const list = A.filter(a => (cur === "All" || a.disciplines.some(d => d.sport === cur)) && (!q || (a.name + " " + a.location + " " + a.headline).toLowerCase().includes(q)));
        $("#athlete-grid").innerHTML = list.length ? list.map(athleteCard).join("") : '<p class="empty">No athletes match yet.</p>';
        reveal();
      };
      $("#filters").addEventListener("click", e => { const b = e.target.closest(".filter"); if (!b) return; cur = b.dataset.sport; $$(".filter").forEach(f => f.classList.toggle("on", f === b)); draw(); });
      $("#filters").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); draw(); });
      draw();
    },
    campaigns() {
      const list = A.map(a => [a, activeCampaign(a)]).filter(x => x[1]).sort((x, y) => parse(x[1].date) - parse(y[1].date));
      $("#campaign-grid").innerHTML = list.length ? list.map(([a, r]) => campaignCard(a, r)).join("") : '<p class="empty">No open campaigns right now.</p>';
    },
    sponsors() {
      $("#wall").innerHTML = inviteCard() + S.map(sponsorCard).join("");
    },
    athlete() {
      const id = new URLSearchParams(location.search).get("id");
      const a = athlete(id) || A[0];
      document.title = `${a.name} — MarkdAthlete`;
      const r = activeCampaign(a);
      const upcoming = a.races.filter(x => parse(x.date) >= new Date(new Date().toDateString())).sort((x, y) => parse(x.date) - parse(y.date));
      const backers = S.filter(s => s.sponsored.some(x => x.athlete === a.id));
      $("#profile").innerHTML = `
      <section class="wrap profile-top">
        <div class="profile-cover"><div class="cover">${coverArt(a)}</div>${avatar(a)}</div>
        <div class="profile-head">
          <h1 class="display">${esc(a.name)}</h1>
          <div class="profile-actions"><a class="btn btn-outline" href="mailto:${esc(C.contactEmail)}?subject=${encodeURIComponent("Message for " + a.name)}">${I.msg}Message</a><button class="btn btn-outline" data-share="${esc(a.name)} on MarkdAthlete">${I.share}Share</button></div>
        </div>
        <p class="profile-headline">${esc(a.headline)}</p>
        <p class="profile-loc">${I.pin}${esc(a.location)}</p>
        <div class="profile-meta">${a.founding ? `<span class="pill">${I.badge}Founding Athlete</span>` : ""}<span>Member since ${esc(a.memberSince)}</span></div>
        <div class="chips">${a.disciplines.map(d => `<span class="chip"><b>${esc(d.sport)}</b>${esc(d.events)}</span>`).join("")}</div>
        <div class="socials">${a.instagram ? `<a class="social" href="https://instagram.com/${esc(a.instagram)}" target="_blank" rel="noopener"><small>Instagram</small><b>@${esc(a.instagram)}</b></a>` : ""}${a.strava ? `<a class="social" href="${esc(a.strava)}" target="_blank" rel="noopener"><small>Strava</small><b>Follow my training</b></a>` : ""}</div>
        <p class="bio">${esc(a.bio)}</p>
        ${(a.stats || []).length ? `<div class="stat-row">${a.stats.map(s => `<div class="stat"><b>${esc(s.v)}</b><span>${esc(s.l)}</span></div>`).join("")}</div>` : ""}
        ${r ? `<div class="taking">${speed(2)}<div><p class="eyebrow">Now taking sponsors</p><p class="display h-md">${esc(r.name)}</p></div><a class="btn btn-orange" href="#campaign">Sponsor me</a></div>` : ""}
        <h2 class="display h-sm" style="margin:44px 0 16px">Upcoming races</h2>
        <div class="races">${upcoming.length ? upcoming.map(x => `<div class="race-row"><div class="race-date"><span>${mon(x.date)}</span><b>${day(x.date)}</b></div><div><h4>${esc(x.name)}</h4><p>${esc(x.division)} · ${esc(x.city)} · Goal: ${esc(x.goal)}</p></div>${x.campaign && openSpots(x).length ? `<a class="btn btn-orange btn-sm" href="#campaign">${openSpots(x).length} spots open</a>` : '<span class="pill pill-soft">On the calendar</span>'}</div>`).join("") : '<p class="empty">No races posted yet.</p>'}</div>
      </section>
      ${r ? campaignHTML(a, r) : ""}
      <section class="dark section" style="margin-top:80px">
        <div class="wrap"><div class="section-head"><h2 class="display h-lg">${esc(a.name.split(" ")[0])}'s sponsors.</h2><a class="link-u" href="sponsors.html">Full sponsor wall</a></div>
        <div class="wall">${inviteCard()}${backers.map(sponsorCard).join("")}</div></div>
      </section>`;
      if (r) wireCampaign(a, r);
    },
    apply() {
      $("#spot-picker").innerHTML = Object.entries(T).map(([k, t]) => `<label><input type="checkbox" name="spots" value="${esc(t.label)}">${esc(t.label)}</label>`).join("");
      const f = $("#apply-form");
      f.addEventListener("submit", async e => {
        e.preventDefault();
        const fd = new FormData(f), data = {};
        for (const [k, v] of fd.entries()) data[k] = data[k] ? data[k] + ", " + v : v;
        try {
          const how = await submitForm("New athlete application — " + (data.name || ""), data);
          f.hidden = true; $("#apply-success").classList.add("on");
          if (how === "mail") $("#apply-success p").textContent = "Your email app opened with your application. Hit send and we'll be in touch within 48 hours.";
        } catch (_) { toast("Something went wrong — email us at " + C.contactEmail); }
      });
    }
  };

  /* ---------- campaign block ---------- */
  function campaignHTML(a, r) {
    const o = openSpots(r);
    const sw = ["#0b0b0b", "#ffffff", "#ff5a0a", "#dc2626", "#16a34a", "#1f6feb", "#db2777", "#facc15"];
    return `<section class="wrap" id="campaign" style="margin-top:60px;scroll-margin-top:100px">
      <div class="campaign">
        <div class="camp-main">
          <div class="camp-top"><a class="camp-who" href="#">${avatar(a)}<span>${esc(a.name)}</span></a><button class="btn btn-outline on-dark btn-sm" data-share="Sponsor ${esc(a.name)} at ${esc(r.name)}">${I.share}Share</button></div>
          <h2 class="display">Sponsor me at <span class="hl-box"><span>${esc(r.name)}</span></span></h2>
          <p class="camp-sub"><b>${esc(r.division)}</b>. Race day is ${fmtDate(r.date)} in ${esc(r.city)}. My goal: <b>${esc(r.goal)}</b>.</p>
          <div class="camp-stats"><div><b>${daysLeft(r.date)}</b><span>${daysLeft(r.date) === 1 ? "day" : "days"} left</span></div><div><b>${o.length}</b><span>spots open</span></div><div><b>${money(fromPrice(r))}</b><span>to be first</span></div></div>
          <p class="camp-note">Your sponsorship is held until race-day proof is posted. No proof, full refund.</p>
          <div class="spots">${r.spots.map((s, i) => {
            const t = T[s.type] || { label: s.type, kind: "cost" }, sp = s.sponsoredBy && sponsor(s.sponsoredBy);
            return `<div class="spot ${s.sponsoredBy ? "taken" : ""}" data-i="${i}">
              <small>${t.kind === "cost" ? "Race cost" : "Brand spot"}</small><h4>${esc(t.label)}</h4><div class="price">${money(s.price)}</div>
              ${s.sponsoredBy ? `<div class="taken-by">Covered by <b>${esc(sp ? sp.name : "a sponsor")}</b></div>` :
              `<button class="btn btn-white" data-act="full">Cover this</button><div class="alt"><button data-act="chip">Or chip in from $10</button><button data-act="offer" style="font-size:14px">Make an offer</button></div>`}
            </div>`;
          }).join("")}</div>
        </div>
        <aside class="panel" id="sponsor-panel">
          <form id="sponsor-form" novalidate>
            <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px"><h3 class="display h-sm">Sponsor</h3><a class="link-u" href="how-it-works.html#sponsors" style="font-size:14px">How it works</a></div>
            <div class="step"><i>1</i><b>Pick a spot</b></div>
            <div class="picked" id="picked">Pick a race cost or brand spot to cover.</div>
            <div class="step"><i>2</i><b>What goes on it</b></div>
            <p class="help" style="margin-top:-6px;margin-bottom:14px">Your logo or your text — one of them goes on the spot and on the sponsor wall.</p>
            <span class="label">Your logo or image</span>
            <label class="btn btn-outline" style="cursor:pointer">Upload your logo<input type="file" id="logo-file" accept="image/*" class="visually-hidden"></label>
            <p class="help">A PNG with a clear background looks best.</p>
            <div class="upload-preview" id="logo-preview"><img alt="Logo preview"></div>
            <div class="or">or</div>
            <div class="field"><label for="spot-text">Text on the spot</label><input class="input" id="spot-text" name="text" maxlength="40" placeholder="Your name, a message, or your business">
              <div class="swatches">${sw.map((c, i) => `<button type="button" class="swatch ${i === 2 ? "on" : ""}" style="background:${c}" data-color="${c}" aria-label="Text color ${c}"></button>`).join("")}</div>
              <div class="preview-tag" id="text-preview"></div></div>
            <div class="field"><label for="s-web">Website <small>(optional)</small></label><input class="input" id="s-web" name="website" placeholder="yourbusiness.com"></div>
            <label class="check"><input type="checkbox" required name="rights" value="yes"><span>The name and logo I'm providing are mine, or I have permission to use them. I'm responsible for them, not MarkdAthlete or ${esc(a.name)}.</span></label>
            <div class="step"><i>3</i><b>Your details</b></div>
            <div class="field"><label for="s-name">Your name or business</label><input class="input" id="s-name" name="name" required autocomplete="name"></div>
            <div class="field"><label for="s-email">Email for your receipt</label><input class="input" id="s-email" name="email" type="email" required autocomplete="email"></div>
            <div class="field"><label for="s-ig">Instagram <small>(optional, for the sponsor wall)</small></label><input class="input" id="s-ig" name="instagram" placeholder="@yourbusiness"></div>
            <div class="field"><label for="s-note">Note to ${esc(a.name.split(" ")[0])} <small>(optional)</small></label><textarea class="input" id="s-note" name="note"></textarea></div>
            <details class="terms"><summary>Sponsor terms</summary><ul>
              <li>You're sponsoring ${esc(a.name)} directly. MarkdAthlete connects you and holds funds until race day.</li>
              <li>The athlete posts race-day proof (photos of your logo/text or the covered cost). No proof, full refund.</li>
              <li>After the race you'll both leave a short rating and review.</li>
              <li>Your name, logo and link appear on the MarkdAthlete sponsor wall.</li></ul></details>
            <label class="check plain" style="margin-bottom:18px"><input type="checkbox" required name="terms" value="agreed"><span>I agree to the sponsor terms. I'm sponsoring ${esc(a.name)}.</span></label>
            <button class="btn btn-orange btn-block" id="s-submit" type="submit" disabled>Pick a spot</button>
            <p class="help" style="text-align:center">You'll get a secure payment link by email to confirm.</p>
          </form>
          <div class="success" id="s-success"><div class="tick">${I.check}</div><h3 class="display h-sm">You're Markd.</h3><p class="help" style="font-size:16px">Thanks for backing ${esc(a.name)}. We'll email your secure payment link and add you to the sponsor wall once it's confirmed.</p><a class="btn btn-dark" href="sponsors.html" style="margin-top:12px">See the sponsor wall</a></div>
        </aside>
      </div></section>`;
  }

  function wireCampaign(a, r) {
    let sel = null, mode = "full", color = "#ff5a0a", logoName = "";
    const picked = $("#picked"), btn = $("#s-submit"), form = $("#sponsor-form");
    function render() {
      $$(".spot").forEach(el => el.classList.toggle("selected", sel !== null && +el.dataset.i === sel));
      if (sel === null) { picked.className = "picked"; picked.textContent = "Pick a race cost or brand spot to cover."; btn.disabled = true; btn.textContent = "Pick a spot"; return; }
      const s = r.spots[sel], t = T[s.type] || { label: s.type };
      picked.className = "picked has";
      const lbl = { full: "Cover it all", chip: "Chip in", offer: "Make an offer" }[mode];
      picked.innerHTML = `<div style="display:flex;justify-content:space-between;gap:10px"><b>${esc(t.label)}</b><span>${lbl}</span></div>` +
        (mode === "full" ? `<div class="display" style="font-size:40px;margin-top:6px">${money(s.price)}</div>` :
          `<div class="amt-row"><span style="font-weight:800;font-size:22px">$</span><input class="input" id="amt" type="number" inputmode="numeric" min="${mode === "chip" ? 10 : 1}" max="${s.price}" value="${mode === "chip" ? 25 : Math.round(s.price * .8)}" aria-label="Amount"></div><p class="help">${mode === "chip" ? `Minimum $10. Full spot is ${money(s.price)}.` : `${esc(a.name.split(" ")[0])} can accept or counter your offer.`}</p>`);
      btn.disabled = false;
      const amt = () => mode === "full" ? s.price : Math.max(0, +($("#amt") || {}).value || 0);
      btn.textContent = `${mode === "offer" ? "Send offer" : "Sponsor"} · ${money(amt())}`;
      const ai = $("#amt"); if (ai) ai.addEventListener("input", () => { btn.textContent = `${mode === "offer" ? "Send offer" : "Sponsor"} · ${money(amt())}`; });
    }
    $(".spots").addEventListener("click", e => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      sel = +b.closest(".spot").dataset.i; mode = b.dataset.act; render();
      if (window.innerWidth < 1060) $("#sponsor-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    const tp = $("#text-preview"), txt = $("#spot-text");
    const drawText = () => { tp.classList.toggle("on", !!txt.value.trim()); tp.textContent = txt.value; tp.style.color = color; tp.style.background = color === "#0b0b0b" ? "#f4f2ee" : "#0b0b0b"; };
    txt.addEventListener("input", drawText);
    $(".swatches").addEventListener("click", e => { const b = e.target.closest(".swatch"); if (!b) return; color = b.dataset.color; $$(".swatch").forEach(x => x.classList.toggle("on", x === b)); drawText(); });
    $("#logo-file").addEventListener("change", e => {
      const f = e.target.files[0]; if (!f) return; logoName = f.name;
      const rd = new FileReader(); rd.onload = () => { $("#logo-preview img").src = rd.result; $("#logo-preview").classList.add("on"); }; rd.readAsDataURL(f);
    });
    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (sel === null) return toast("Pick a spot first");
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (!txt.value.trim() && !logoName) return toast("Add your logo or some text for the spot");
      const s = r.spots[sel], amount = mode === "full" ? s.price : +($("#amt").value || 0);
      if (mode === "chip" && amount < 10) return toast("Minimum chip-in is $10");
      const fd = new FormData(form);
      const data = {
        athlete: a.name, race: `${r.name} (${fmtDate(r.date)})`, spot: (T[s.type] || {}).label || s.type, type: mode, amount: money(amount),
        spot_text: fd.get("text") || "", text_color: color, logo_file: logoName ? logoName + " (attach to reply)" : "",
        sponsor_name: fd.get("name"), email: fd.get("email"), website: fd.get("website") || "", instagram: fd.get("instagram") || "", note: fd.get("note") || ""
      };
      try {
        const how = await submitForm(`Sponsorship ${mode === "offer" ? "offer" : "request"}: ${a.name} — ${data.spot}`, data);
        form.hidden = true; $("#s-success").classList.add("on");
        if (how === "mail") $("#s-success p").textContent = "Your email app opened with your sponsorship details. Hit send (attach your logo if you have one) and we'll reply with a secure payment link.";
      } catch (_) { toast("Something went wrong — email us at " + C.contactEmail); }
    });
    if (location.hash === "#campaign") setTimeout(() => $("#campaign").scrollIntoView(), 50);
  }

  (pages[page] || (() => {}))();
  reveal();
})();
