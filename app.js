// =========================================
// EstateIQ UX Prototype (No backend/APIs)
// Enhancements: onboarding, map pins, guided flow, report preview
// =========================================

// ---------- Demo Data ----------
const DATA = [
  {
    id: "SJ1",
    title: "Willow Glen Craftsman",
    meta: "3 bd • 2 ba • 1,640 sqft • Schools: A-",
    price: 879000,
    signal: "Undervalued",
    risk: "Low",
    growth: "Medium",
    capRate: "3.8%",
    neighborhood: { Safety: 74, Schools: 88, Commute: 78, Amenities: 82, Stability: 76 },
    pin: { x: 28, y: 38 }
  },
  {
    id: "SJ2",
    title: "Downtown Modern Condo",
    meta: "2 bd • 2 ba • 1,120 sqft • Schools: B",
    price: 735000,
    signal: "High Growth",
    risk: "Medium",
    growth: "High",
    capRate: "4.2%",
    neighborhood: { Safety: 66, Schools: 74, Commute: 90, Amenities: 88, Stability: 68 },
    pin: { x: 62, y: 44 }
  },
  {
    id: "SJ3",
    title: "Berryessa Duplex",
    meta: "4 bd • 3 ba • 2 units • Schools: B+",
    price: 925000,
    signal: "High ROI",
    risk: "Medium",
    growth: "Medium",
    capRate: "5.5%",
    neighborhood: { Safety: 70, Schools: 78, Commute: 75, Amenities: 72, Stability: 71 },
    pin: { x: 76, y: 70 }
  },
  {
    id: "SJ4",
    title: "Cambrian Park Ranch",
    meta: "3 bd • 2 ba • 1,510 sqft • Schools: A",
    price: 842000,
    signal: "Low Risk",
    risk: "Low",
    growth: "Low",
    capRate: "3.4%",
    neighborhood: { Safety: 82, Schools: 92, Commute: 72, Amenities: 76, Stability: 84 },
    pin: { x: 36, y: 72 }
  }
];

// ---------- State ----------
const state = {
  role: "buyer",              // buyer | investor | agent
  storyboard: false,
  guided: true,
  activeScreen: "home",

  activeFilter: null,
  query: "",
  selectedId: null,
  saved: [],

  // onboarding preferences
  budget: 850000,
  mustHaves: new Set(), // strings
  wizStep: 1
};

// ---------- DOM Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function money(n){
  return n.toLocaleString(undefined, { style:"currency", currency:"USD", maximumFractionDigits:0 });
}

function dotClassForRisk(r){
  if(r === "Low") return "good";
  if(r === "Medium") return "warn";
  return "bad";
}

function toast(msg){
  const host = $("#toastHost");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  host.appendChild(el);
  setTimeout(()=>{ el.style.opacity="0"; el.style.transition="opacity .25s ease"; }, 1800);
  setTimeout(()=>{ el.remove(); }, 2200);
}

// ---------- Storyboard Content ----------
const STORY = {
  home: {
    title: "Welcome — set context fast",
    text: "Day in the life: The user arrives with uncertainty. This screen clarifies what EstateIQ does and pushes them into the journey.",
    tags: ["Reduce uncertainty", "Start journey", "Role-based value"]
  },
  onboarding: {
    title: "Onboarding — personalize quickly",
    text: "Day in the life: Users don’t want to sift through 100 listings. A short wizard captures budget + must-haves to rank results.",
    tags: ["Personalization", "Fewer choices", "Faster shortlist"]
  },
  search: {
    title: "Search — shortlist quickly",
    text: "Day in the life: Explore options with filters, map pins, and AI summaries. Click to select, then continue to Details.",
    tags: ["Discovery", "Map + list", "Explainability"]
  },
  details: {
    title: "Details — decision hub",
    text: "Day in the life: The user wants a complete story for one property: fair price, neighborhood fit, and the next best action.",
    tags: ["Valuation", "Neighborhood", "Action guidance"]
  },
  trends: {
    title: "Trends — timing support",
    text: "Day in the life: Users ask: ‘Should I buy now?’ This screen shows direction + confidence and keeps it simple.",
    tags: ["Forecast", "Confidence cues", "Timing"]
  },
  risk: {
    title: "Risk & ROI — go/no-go",
    text: "Day in the life: Compare downside vs upside. Investors focus on ROI; buyers focus on stability; agents focus on narrative.",
    tags: ["Risk", "ROI", "Decision support"]
  },
  saved: {
    title: "Saved & Compare — reduce cognitive load",
    text: "Day in the life: Users compare finalists with a partner/client. Saved lists prevent losing track and reduce stress.",
    tags: ["Compare", "Shortlist", "Share"]
  },
  report: {
    title: "Report — share-ready output",
    text: "Day in the life: After deciding, users want a clear summary to share. This one-pager is role-specific (buyer/investor/agent).",
    tags: ["One-pager", "Share", "Explainable narrative"]
  },
  dashboard: {
    title: "Dashboard — workflow continuity",
    text: "Day in the life: Users return later. The dashboard turns insights into follow-ups: tours, due diligence, or client briefs.",
    tags: ["Workflow", "Follow-up", "Continuity"]
  }
};

// ---------- Modal ----------
function openModal({ title, subtitle, kpis, why, next }){
  $("#modalTitle").textContent = title;
  $("#modalSubtitle").textContent = subtitle;

  const kpiHost = $("#modalKpis");
  kpiHost.innerHTML = "";
  kpis.forEach(k => {
    const box = document.createElement("div");
    box.className = "kpiBox";
    box.innerHTML = `<div class="kpiBox__val">${k.val}</div><div class="kpiBox__lbl">${k.lbl}</div>`;
    kpiHost.appendChild(box);
  });

  $("#modalWhy").textContent = why;
  $("#modalNext").textContent = next;

  $("#modalBackdrop").classList.add("show");
  $("#modalBackdrop").setAttribute("aria-hidden", "false");
}
function closeModal(){
  $("#modalBackdrop").classList.remove("show");
  $("#modalBackdrop").setAttribute("aria-hidden", "true");
}

// ---------- Navigation ----------
const FLOW = ["home","onboarding","search","details","trends","risk","saved","report","dashboard"];

function setActiveNav(screen){
  $$(".navItem").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.screen === screen);
  });
}

function setScreen(screen){
  state.activeScreen = screen;

  // show screen
  $$(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screen).classList.add("active");

  setActiveNav(screen);

  const titleMap = {
    home: "Welcome",
    onboarding: "Onboarding",
    search: "Search",
    details: "Details",
    trends: "Market Trends",
    risk: "Risk & ROI",
    saved: "Saved & Compare",
    report: "Report Preview",
    dashboard: "Dashboard"
  };
  $("#topTitle").textContent = titleMap[screen] || "EstateIQ";

  // update UI helpers
  updateProgress();
  renderStoryboard();
  renderGuided();

  // screen rendering
  if(screen === "onboarding") renderWizard();
  if(screen === "search") { renderResults(); renderMapPins(); }
  if(screen === "details") renderDetails();
  if(screen === "trends") renderTrends();
  if(screen === "risk") renderRisk();
  if(screen === "saved") renderSaved();
  if(screen === "report") renderReport();
  if(screen === "dashboard") renderDashboard();

  document.getElementById(screen).scrollTop = 0;
}

function updateProgress(){
  const idx = FLOW.indexOf(state.activeScreen);
  const pct = Math.round((idx / (FLOW.length - 1)) * 100);
  $("#progressPct").textContent = `${pct}%`;
  $("#progressFill").style.width = `${pct}%`;

  const hints = {
    home: "Welcome → Onboarding",
    onboarding: "Finish → Search",
    search: "Select → Details",
    details: "Trends → Risk",
    trends: "Risk → Save",
    risk: "Saved → Report",
    saved: "Compare → Report",
    report: "Dashboard finish",
    dashboard: "Done"
  };
  $("#progressHint").textContent = hints[state.activeScreen] || "";
}

// ---------- Role ----------
function setRole(role){
  state.role = role;
  $$(".segBtn").forEach(b => b.classList.toggle("active", b.dataset.role === role));

  const meta = {
    buyer: "Buyer mode: focus on fair price + neighborhood fit + next steps.",
    investor: "Investor mode: focus on ROI, cap rate, and risk factors.",
    agent: "Agent mode: focus on shareable narratives and client-ready insights."
  };
  $("#roleMeta").textContent = meta[role] || "";

  const lead = {
    buyer: "Buyer journey: quickly understand fair price, neighborhood fit, and next steps without spreadsheet work.",
    investor: "Investor journey: evaluate cashflow signals, risk factors, and compare ROI opportunities fast.",
    agent: "Agent journey: generate client-ready insights, trend narratives, and shareable briefs."
  };
  $("#homeLead").textContent = lead[role] || "";

  // update onboarding summary
  $("#prefRole").textContent = roleLabel();

  renderGuided();
  renderReport();
  renderDashboard();
  renderTrends();
  renderRisk();
}

// ---------- Storyboard ----------
function renderStoryboard(){
  const box = $("#storyBox");
  if(!state.storyboard){
    box.classList.remove("on");
    return;
  }
  const s = STORY[state.activeScreen];
  if(!s){
    box.classList.remove("on");
    return;
  }
  $("#storyTitle").textContent = s.title;
  $("#storyText").textContent = s.text;

  const tags = $("#storyTags");
  tags.innerHTML = "";
  s.tags.forEach((t, i) => {
    const span = document.createElement("span");
    span.className = "storyTag" + (i % 2 ? " alt" : "");
    span.textContent = t;
    tags.appendChild(span);
  });

  box.classList.add("on");
}

// ---------- Guided Flow ----------
function suggestedNext(){
  // prefer onboarding if not completed
  const onboardingDone = (state.wizStep === 3); // step 3 shows summary/finish
  if(!onboardingDone && state.activeScreen !== "onboarding") return { screen: "onboarding", text: "Complete onboarding to personalize recommendations." };

  if(state.activeScreen === "home") return { screen: "onboarding", text: "Start onboarding (budget + must-haves)." };
  if(state.activeScreen === "onboarding") return { screen: "search", text: "Finish onboarding and jump into Search." };
  if(state.activeScreen === "search"){
    return state.selectedId
      ? { screen: "details", text: "You selected a property. Continue to Details." }
      : { screen: "search", text: "Select a property from list or map pins." };
  }
  if(state.activeScreen === "details") return { screen: "trends", text: "Review timing cues in Market Trends." };
  if(state.activeScreen === "trends") return { screen: "risk", text: "Check risk and ROI signals." };
  if(state.activeScreen === "risk") return { screen: "saved", text: "Save finalists and compare." };
  if(state.activeScreen === "saved") return { screen: "report", text: "Generate a share-ready one-page report." };
  if(state.activeScreen === "report") return { screen: "dashboard", text: "Finish in Dashboard (next steps)." };
  return { screen: "dashboard", text: "You’re at the end — review next steps." };
}

function renderGuided(){
  const bar = $("#guideBar");
  if(!bar) return;

  bar.style.display = state.guided ? "flex" : "none";
  if(!state.guided) return;

  const next = suggestedNext();
  $("#guideText").textContent = next.text;

  // suggested nav highlight
  $$(".navItem").forEach(btn => btn.classList.remove("suggested"));
  const targetBtn = $(`.navItem[data-screen="${next.screen}"]`);
  if(targetBtn) targetBtn.classList.add("suggested");

  // go button
  $("#guideGoBtn").onclick = () => setScreen(next.screen);
}

// ---------- Onboarding Wizard ----------
function roleLabel(){
  return state.role.charAt(0).toUpperCase() + state.role.slice(1);
}

function renderWizard(){
  // step circles
  $$(".wizStep").forEach(s => s.classList.toggle("active", Number(s.dataset.step) === state.wizStep));
  // panels
  $("#wizPanel1").classList.toggle("active", state.wizStep === 1);
  $("#wizPanel2").classList.toggle("active", state.wizStep === 2);
  $("#wizPanel3").classList.toggle("active", state.wizStep === 3);

  // budget active
  $$(".chipBig[data-budget]").forEach(btn => {
    btn.classList.toggle("active", Number(btn.dataset.budget) === state.budget);
  });

  // must-haves active
  $$(".chipBig[data-must]").forEach(btn => {
    btn.classList.toggle("active", state.mustHaves.has(btn.dataset.must));
  });

  // summary
  $("#prefBudget").textContent = money(state.budget);
  $("#prefMust").textContent = state.mustHaves.size ? Array.from(state.mustHaves).join(", ") : "None selected";
  $("#prefRole").textContent = roleLabel();
}

// ---------- Ranking / Personalization ----------
function scoreProperty(p){
  let score = 0;

  // budget fit (closer is better)
  const diff = Math.abs(p.price - state.budget);
  score += Math.max(0, 250000 - diff) / 10000; // max ~25 points

  // must-haves (neighborhood cues or signal cues)
  for(const m of state.mustHaves){
    if(m === "Great Schools") score += (p.neighborhood.Schools / 10);
    if(m === "Commute") score += (p.neighborhood.Commute / 10);
    if(m === "Safety") score += (p.neighborhood.Safety / 10);
    if(m === "High ROI") score += (parseFloat(p.capRate) * 2.2);
  }

  // role bias
  if(state.role === "buyer"){
    score += (p.neighborhood.Schools + p.neighborhood.Safety) / 25;
    if(p.risk === "Low") score += 4;
  }
  if(state.role === "investor"){
    score += parseFloat(p.capRate) * 3.2;
    if(p.signal === "High ROI") score += 4;
  }
  if(state.role === "agent"){
    score += (p.signal === "High Growth" ? 4 : 2);
    score += (p.neighborhood.Amenities / 20);
  }

  // existing filter alignment
  if(state.activeFilter){
    if(state.activeFilter === "Great Schools" && p.meta.includes("Schools: A")) score += 3;
    if(p.signal === state.activeFilter) score += 3;
  }

  return score;
}

function filteredData(){
  let list = DATA.slice();

  // filter
  if(state.activeFilter){
    if(state.activeFilter === "Great Schools"){
      list = list.filter(p => p.meta.includes("Schools: A"));
    } else {
      list = list.filter(p => p.signal === state.activeFilter);
    }
  }

  // query
  const q = state.query.trim().toLowerCase();
  if(q){
    list = list.filter(p =>
      (p.title + " " + p.meta + " " + p.signal + " " + p.risk + " " + p.growth).toLowerCase().includes(q)
    );
  }

  // personalized ranking
  list.sort((a,b) => scoreProperty(b) - scoreProperty(a));

  return list;
}

// ---------- Search & Map ----------
function renderResults(){
  const host = $("#resultsList");
  if(!host) return;

  const list = filteredData();
  host.innerHTML = "";

  if(list.length === 0){
    host.innerHTML = `<div class="muted">No results match. Try clearing filters or searching a different phrase.</div>`;
    $("#searchSummary").textContent = "No results to summarize.";
    return;
  }

  list.forEach((p, idx) => {
    const el = document.createElement("div");
    el.className = "item" + (p.id === state.selectedId ? " selected" : "");
    el.innerHTML = `
      <div class="thumb" aria-hidden="true"></div>
      <div>
        <div class="itemTitle">${idx === 0 ? "⭐ " : ""}${p.title}</div>
        <div class="itemMeta muted">${p.meta}<br/>
          Signal: <b>${p.signal}</b> • Risk: <b>${p.risk}</b> • Growth: <b>${p.growth}</b>
        </div>
      </div>
      <div class="itemRight">
        <div class="price">${money(p.price)}</div>
        <div class="badgeRow"><span class="dot ${dotClassForRisk(p.risk)}"></span> <span>Cap: ${p.capRate}</span></div>
      </div>
    `;
    el.addEventListener("click", () => selectProperty(p.id, "list"));
    host.appendChild(el);
  });

  $("#searchSummary").innerHTML = buildSearchSummary(list);
}

function renderMapPins(){
  const host = $("#mapPins");
  if(!host) return;

  host.innerHTML = "";
  const list = filteredData(); // show pins only for currently visible results

  list.forEach(p => {
    const pin = document.createElement("button");
    pin.className = `pin ${dotClassForRisk(p.risk)} ${p.id === state.selectedId ? "selected" : ""}`;
    pin.style.left = `${p.pin.x}%`;
    pin.style.top = `${p.pin.y}%`;
    pin.title = p.title;
    pin.setAttribute("aria-label", `Map pin: ${p.title}`);
    pin.addEventListener("click", (e) => {
      e.preventDefault();
      selectProperty(p.id, "map");
    });
    host.appendChild(pin);
  });
}

function buildSearchSummary(list){
  const lowRisk = list.filter(p => p.risk === "Low").length;
  const undervalued = list.filter(p => p.signal === "Undervalued").length;
  const highGrowth = list.filter(p => p.growth === "High").length;

  const focus =
    state.role === "investor" ? "cap rate + cashflow risk" :
    state.role === "agent" ? "client-ready narrative" :
    "fair price + neighborhood fit";

  const prefs = `Budget: <b>${money(state.budget)}</b> • Must-haves: <b>${state.mustHaves.size ? Array.from(state.mustHaves).join(", ") : "none"}</b>`;

  return `
    <div class="muted">
      <b>AI Snapshot:</b> ${list.length} matches (ranked for your profile).<br/>
      • ${undervalued} undervalued • ${lowRisk} low risk • ${highGrowth} high growth<br/>
      <b>Profile:</b> ${prefs}<br/>
      <b>Role focus:</b> ${focus}. Select a property to continue.
    </div>
  `;
}

function selectProperty(id, source){
  state.selectedId = id;
  toast(`Selected (${source}): ${getSelected().title}`);
  syncSelectionEverywhere();
  renderResults();
  renderMapPins();
  renderGuided();
}

// ---------- Selection Sync ----------
function getSelected(){
  return DATA.find(x => x.id === state.selectedId) || null;
}

function syncSelectionEverywhere(){
  const p = getSelected();
  const has = !!p;

  // enable buttons
  if($("#toDetailsBtn")) $("#toDetailsBtn").disabled = !has;
  if($("#saveBtn")) $("#saveBtn").disabled = !has;
  if($("#shareBtn")) $("#shareBtn").disabled = !has;
  if($("#toTrendsBtn")) $("#toTrendsBtn").disabled = !has;
  if($("#toRiskBtn")) $("#toRiskBtn").disabled = !has;

  // mini KPIs
  if($("#mkSignal")){
    $("#mkSignal").textContent = has ? p.signal : "—";
    $("#mkRisk").textContent = has ? p.risk : "—";
    $("#mkGrowth").textContent = has ? p.growth : "—";
  }

  // update screens
  renderDetails();
  renderTrends();
  renderRisk();
  renderSaved();
  renderReport();
  renderDashboard();
}

// ---------- Details ----------
function renderDetails(){
  const p = getSelected();
  if(!$("#detailTitle")) return;

  if(!p){
    $("#detailTitle").textContent = "Select a property from Search";
    $("#detailMeta").textContent = "—";
    $("#detailPrice").textContent = "$—";
    $("#detailFairRange").textContent = "$—";
    $("#detailSignal").textContent = "—";
    $("#detailNext").textContent = "—";
    $("#nhBars").innerHTML = `<div class="muted tiny">No property selected.</div>`;
    return;
  }

  const fairLow = Math.round(p.price * 0.96);
  const fairHigh = Math.round(p.price * 1.04);

  $("#detailTitle").textContent = p.title;
  $("#detailMeta").textContent = p.meta;
  $("#detailPrice").textContent = money(p.price);
  $("#detailFairRange").textContent = `${money(fairLow)} – ${money(fairHigh)}`;
  $("#detailSignal").textContent = p.signal;
  $("#detailNext").textContent = roleNextStep(p);

  const host = $("#nhBars");
  host.innerHTML = "";
  Object.entries(p.neighborhood).forEach(([label, val]) => {
    const row = document.createElement("div");
    row.className = "bar";
    row.innerHTML = `
      <div class="barLabel">${label}</div>
      <div class="barTrack"><div class="barFill" style="width:${val}%"></div></div>
      <div class="barVal">${val}</div>
    `;
    host.appendChild(row);
  });
}

function roleNextStep(p){
  if(state.role === "buyer"){
    return p.signal === "Undervalued" ? "Tour soon & prep offer" : "Compare 1–2 alternatives";
  }
  if(state.role === "investor"){
    return parseFloat(p.capRate) >= 5.0 ? "Validate rent comps" : "Stress-test expenses";
  }
  return "Generate client brief";
}

// ---------- Trends ----------
function renderTrends(){
  const p = getSelected();
  if(!$("#trendExplain")) return;

  const line =
    state.role === "buyer"
      ? "Buyer lens: timing + fair price confidence."
      : state.role === "investor"
        ? "Investor lens: demand strength + ROI stability."
        : "Agent lens: narrative you can share with clients.";
  $("#trendRoleLine").textContent = line;

  if(!p){
    $("#trendExplain").textContent = "Select a property to see a role-based trend explanation.";
    return;
  }

  const explain =
    state.role === "buyer"
      ? "Prices trend modestly upward (demo), so delaying could increase cost. Use fair range to avoid overpaying."
      : state.role === "investor"
        ? "Moderate appreciation (demo) plus tight inventory can support rent stability; validate vacancy and expenses."
        : "Use this snapshot to set client expectations: direction + confidence + key drivers (inventory/rates/demand).";
  $("#trendExplain").textContent = `For ${p.title}: ${explain}`;
}

// ---------- Risk ----------
function renderRisk(){
  const p = getSelected();
  if(!$("#riskExplain")) return;

  if(!p){
    $("#riskLevel").textContent = "—";
    $("#roiHint").textContent = "—";
    $("#riskAction").textContent = "—";
    $("#riskExplain").textContent = "Select a property to populate risk assessment.";
    return;
  }

  $("#riskLevel").textContent = p.risk;
  $("#roiHint").textContent = p.capRate;

  $("#riskAction").textContent =
    state.role === "buyer" ? (p.risk === "Low" ? "Proceed" : "Investigate") :
    state.role === "investor" ? (parseFloat(p.capRate) >= 5 ? "Deep dive" : "Compare") :
    "Prepare talking points";

  $("#riskExplain").innerHTML = `
    <b>${p.title}</b><br/>
    • Risk: <b>${p.risk}</b> (demo stability + market volatility cues)<br/>
    • ROI hint: <b>${p.capRate}</b> (demo cap rate proxy)<br/><br/>
    <b>AI note:</b> ${riskNoteByRole(p)}
  `;
}

function riskNoteByRole(p){
  if(state.role === "buyer"){
    return p.risk === "Low"
      ? "Signals suggest stable neighborhood conditions; focus on inspection/disclosures and offer strategy."
      : "Some uncertainty exists; verify HOA/maintenance costs and neighborhood concerns before committing.";
  }
  if(state.role === "investor"){
    return parseFloat(p.capRate) >= 5
      ? "Higher ROI signal — validate rent comps, vacancy assumptions, and maintenance reserves."
      : "Moderate ROI — compare with a similar property and stress-test expenses.";
  }
  return "Translate risk and ROI into a client-friendly recommendation with next steps.";
}

// ---------- Saved & Compare ----------
function renderSaved(){
  const host = $("#savedList");
  if(!host) return;

  host.innerHTML = "";

  if(state.saved.length === 0){
    host.innerHTML = `<div class="muted">No saved properties yet. Go to Details and click Save.</div>`;
    $("#compareBtn").disabled = true;
    $("#compareBox").textContent = "Save at least 2 properties to compare.";
    return;
  }

  state.saved.forEach(id => {
    const p = DATA.find(x => x.id === id);
    if(!p) return;

    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `
      <div class="thumb" aria-hidden="true"></div>
      <div>
        <div class="itemTitle">${p.title}</div>
        <div class="itemMeta muted">${p.meta}<br/>Signal: <b>${p.signal}</b> • Risk: <b>${p.risk}</b></div>
      </div>
      <div class="itemRight">
        <div class="price">${money(p.price)}</div>
        <div class="badgeRow"><span class="dot ${dotClassForRisk(p.risk)}"></span> <span>Cap: ${p.capRate}</span></div>
      </div>
    `;
    el.addEventListener("click", () => {
      state.selectedId = p.id;
      toast(`Selected from Saved: ${p.title}`);
      syncSelectionEverywhere();
      setScreen("details");
    });
    host.appendChild(el);
  });

  $("#compareBtn").disabled = state.saved.length < 2;
}

function compareTop2(){
  if(state.saved.length < 2) return;

  const [aId, bId] = state.saved.slice(0, 2);
  const a = DATA.find(x => x.id === aId);
  const b = DATA.find(x => x.id === bId);
  if(!a || !b) return;

  $("#compareBox").innerHTML = `
    <div class="muted">
      <b>Comparison (top 2 saved)</b><br/><br/>
      <b>${a.title}</b> vs <b>${b.title}</b><br/>
      • Price: ${money(a.price)} vs ${money(b.price)}<br/>
      • Signal: ${a.signal} vs ${b.signal}<br/>
      • Risk: ${a.risk} vs ${b.risk}<br/>
      • Growth: ${a.growth} vs ${b.growth}<br/>
      • Cap: ${a.capRate} vs ${b.capRate}<br/><br/>
      <b>AI recommendation:</b> ${pickWinner(a, b)}
    </div>
  `;

  toast("Compared top 2 saved properties.");
}

function pickWinner(a, b){
  if(state.role === "investor"){
    const ac = parseFloat(a.capRate), bc = parseFloat(b.capRate);
    if(ac > bc && a.risk !== "High") return `${a.title} — stronger cap rate with manageable risk.`;
    if(bc > ac && b.risk !== "High") return `${b.title} — stronger cap rate with manageable risk.`;
    return "Choose the higher cap rate, but validate risk drivers first.";
  }
  if(state.role === "buyer"){
    if(a.risk === "Low" && a.meta.includes("Schools: A")) return `${a.title} — safer + stronger school signal.`;
    if(b.risk === "Low" && b.meta.includes("Schools: A")) return `${b.title} — safer + stronger school signal.`;
    return "Pick the option with better neighborhood fit and fair price confidence.";
  }
  return "Recommend the option that best matches the client’s stated goal (value vs risk vs timing).";
}

// ---------- Report Preview ----------
function renderReport(){
  if(!$("#repTitle")) return;

  const p = getSelected();
  $("#repRole").textContent =
    state.role === "buyer" ? "Buyer Brief" :
    state.role === "investor" ? "Investor Brief" :
    "Agent Brief";

  if(!p){
    $("#repTitle").textContent = "Select a property";
    $("#repMeta").textContent = "—";
    $("#repPrice").textContent = "$—";
    $("#repRange").textContent = "$—";
    $("#repSignal").textContent = "—";
    $("#repRisk").textContent = "—";
    $("#repNarrative").textContent = "Select a property to generate a narrative.";
    $("#repActions").innerHTML = "";
    return;
  }

  const fairLow = Math.round(p.price * 0.96);
  const fairHigh = Math.round(p.price * 1.04);

  $("#repTitle").textContent = p.title;
  $("#repMeta").textContent = p.meta;
  $("#repPrice").textContent = money(p.price);
  $("#repRange").textContent = `${money(fairLow)} – ${money(fairHigh)}`;
  $("#repSignal").textContent = p.signal;
  $("#repRisk").textContent = p.risk;

  $("#repNarrative").textContent = reportNarrative(p);

  const actions = reportActions(p);
  const ul = $("#repActions");
  ul.innerHTML = "";
  actions.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    ul.appendChild(li);
  });
}

function reportNarrative(p){
  if(state.role === "buyer"){
    return `This home is flagged as “${p.signal}” with ${p.risk.toLowerCase()} risk signals (demo). The AI fair range helps avoid overpaying, while neighborhood cues (schools/safety/commute) support fit-based decisions.`;
  }
  if(state.role === "investor"){
    return `This investment opportunity shows ${p.capRate} cap rate (demo proxy), “${p.signal}” signal, and ${p.risk.toLowerCase()} risk. The summary supports a quick screen before deeper due diligence (rent comps, reserves, vacancy).`;
  }
  return `Client-ready summary: the property has a “${p.signal}” cue, a ${p.risk.toLowerCase()} risk profile (demo), and a clear recommended next step. Use this brief to explain pricing confidence and timing expectations.`;
}

function reportActions(p){
  if(state.role === "buyer"){
    return [
      "Schedule a tour for top 1–2 finalists",
      "Review disclosures and inspection priorities",
      "Use AI fair range to guide offer strategy",
      "Compare saved options with household decision-makers"
    ];
  }
  if(state.role === "investor"){
    return [
      "Validate rent comps and vacancy assumptions",
      "Stress-test expenses (insurance/HOA/maintenance)",
      "Confirm neighborhood stability cues",
      "Compare cap rate and risk across saved options"
    ];
  }
  return [
    "Turn narrative into a client message",
    "Align on client goals (value vs timing vs risk)",
    "Use forecast cues to set expectations",
    "Generate a one-page brief for showing"
  ];
}

// ---------- Dashboard ----------
function renderDashboard(){
  if(!$("#dashToday")) return;

  const savedCount = state.saved.length;
  const selected = getSelected();

  $("#dashSaved").textContent =
    savedCount ? `Saved: ${savedCount} properties. Top item: ${DATA.find(x => x.id === state.saved[0])?.title || "—"}`
               : "No saved properties yet.";

  if(state.role === "buyer"){
    $("#dashSub").textContent = "Buyer dashboard: next steps and shortlist management.";
    $("#dashToday").innerHTML = `
      <b>Next steps:</b><br/>
      • Tour 1–2 finalists<br/>
      • Review AI fair range and prep offer strategy<br/>
      • Compare saved properties with a partner
    `;
    $("#dashInsights").innerHTML = `
      • Saved properties: <b>${savedCount}</b><br/>
      • Budget: <b>${money(state.budget)}</b><br/>
      • Selected: <b>${selected ? selected.title : "—"}</b>
    `;
  } else if(state.role === "investor"){
    $("#dashSub").textContent = "Investor dashboard: watchlist and due diligence workflow.";
    $("#dashToday").innerHTML = `
      <b>Due diligence:</b><br/>
      • Validate rent comps for saved properties<br/>
      • Stress-test expenses (insurance/HOA/maintenance)<br/>
      • Compare cap rate + risk side-by-side
    `;
    $("#dashInsights").innerHTML = `
      • Watchlist items: <b>${savedCount}</b><br/>
      • Focus KPI: <b>cap rate + cashflow risk</b><br/>
      • Selected cap: <b>${selected ? selected.capRate : "—"}</b>
    `;
  } else {
    $("#dashSub").textContent = "Agent dashboard: client-ready insights and follow-ups.";
    $("#dashToday").innerHTML = `
      <b>Client actions:</b><br/>
      • Create a 1-page insight brief (valuation + trends + neighborhood)<br/>
      • Answer pricing confidence questions<br/>
      • Schedule tours based on shortlist priority
    `;
    $("#dashInsights").innerHTML = `
      • Reports: <b>valuation + trends narrative</b><br/>
      • Saved shortlist: <b>${savedCount}</b><br/>
      • Selected: <b>${selected ? selected.title : "—"}</b>
    `;
  }
}

// ---------- AI Insight Button ----------
function openInsightForCurrent(){
  const p = getSelected();

  if(!p){
    openModal({
      title: "AI Insight Preview",
      subtitle: "What EstateIQ explains (demo)",
      kpis: [
        { val: "Profile ranking", lbl: "Budget + must-haves + role" },
        { val: "Fair range", lbl: "Valuation guidance" },
        { val: "Risk / ROI", lbl: "Go/no-go signals" }
      ],
      why: "Users want confidence without manual analysis. EstateIQ converts complex signals into clear decision cues.",
      next: "Complete onboarding → select a property → open AI Insight in Details/Trends/Risk."
    });
    return;
  }

  if(state.activeScreen === "trends"){
    openModal({
      title: "Forecast Explanation (Demo)",
      subtitle: p.title,
      kpis: [
        { val: "+3.2%", lbl: "12-mo price trend (demo)" },
        { val: "Medium", lbl: "Confidence cue" },
        { val: "Tight", lbl: "Inventory condition" }
      ],
      why: "This view answers: “Is now a good time?” with direction + confidence and only the most relevant drivers.",
      next: "Use fair range to avoid overpaying → confirm neighborhood fit → save finalists."
    });
    return;
  }

  if(state.activeScreen === "risk"){
    openModal({
      title: "Full AI Risk Assessment (Demo)",
      subtitle: p.title,
      kpis: [
        { val: p.risk, lbl: "Overall risk" },
        { val: p.capRate, lbl: "ROI hint (cap rate demo)" },
        { val: p.growth, lbl: "Opportunity signal" }
      ],
      why: "Risk summaries reduce uncertainty and speed decisions, especially for investors comparing options.",
      next: "Validate assumptions → compare with saved alternatives → export brief."
    });
    return;
  }

  // Default: valuation style
  const fairLow = Math.round(p.price * 0.96);
  const fairHigh = Math.round(p.price * 1.04);

  openModal({
    title: "AI Valuation (Demo)",
    subtitle: p.title,
    kpis: [
      { val: `${money(fairLow)} – ${money(fairHigh)}`, lbl: "Fair price range" },
      { val: p.signal, lbl: "Pricing signal" },
      { val: p.risk, lbl: "Risk level" }
    ],
    why: "Users need a clear frame for negotiation and confidence: “Am I overpaying?”",
    next: "Review trends → check risk → save & compare → export report."
  });
}

// ---------- Events ----------
function bindEvents(){
  // sidebar nav
  $$(".navItem").forEach(btn => btn.addEventListener("click", () => setScreen(btn.dataset.screen)));
  $$("[data-screen]").forEach(btn => {
    if(btn.classList.contains("navItem")) return;
    btn.addEventListener("click", () => setScreen(btn.dataset.screen));
  });

  // next button
  $("#nextBtn").addEventListener("click", () => {
    const idx = FLOW.indexOf(state.activeScreen);
    const next = FLOW[Math.min(idx + 1, FLOW.length - 1)];
    setScreen(next);
  });

  // role selector
  $$(".segBtn").forEach(btn => btn.addEventListener("click", () => setRole(btn.dataset.role)));

  // storyboard toggle
  $("#storyToggle").addEventListener("click", () => {
    state.storyboard = !state.storyboard;
    const sw = $("#storyToggle");
    sw.classList.toggle("on", state.storyboard);
    sw.setAttribute("aria-pressed", String(state.storyboard));
    renderStoryboard();
    toast(state.storyboard ? "Storyboard Mode ON" : "Storyboard Mode OFF");
  });

  // guided toggle
  $("#guideToggle").addEventListener("click", () => {
    state.guided = !state.guided;
    const sw = $("#guideToggle");
    sw.classList.toggle("on", state.guided);
    sw.setAttribute("aria-pressed", String(state.guided));
    renderGuided();
    toast(state.guided ? "Guided Flow ON" : "Guided Flow OFF");
  });

  // search input
  $("#searchInput").addEventListener("input", (e) => {
    state.query = e.target.value || "";
    renderResults();
    renderMapPins();
    renderGuided();
  });

  // filters
  $$(".chip[data-filter]").forEach(chip => {
    chip.addEventListener("click", () => {
      const v = chip.dataset.filter;
      state.activeFilter = (state.activeFilter === v) ? null : v;

      $$(".chip[data-filter]").forEach(c => c.classList.toggle("active", c.dataset.filter === state.activeFilter));
      renderResults();
      renderMapPins();
      renderGuided();
    });
  });

  $("#clearFilters").addEventListener("click", () => {
    state.activeFilter = null;
    state.query = "";
    $("#searchInput").value = "";
    $$(".chip[data-filter]").forEach(c => c.classList.remove("active"));
    renderResults();
    renderMapPins();
    toast("Cleared filters.");
  });

  // to details
  $("#toDetailsBtn").addEventListener("click", () => {
    if(!state.selectedId) return;
    setScreen("details");
  });

  // save / share
  $("#saveBtn").addEventListener("click", () => {
    const p = getSelected();
    if(!p) return;
    if(!state.saved.includes(p.id)){
      state.saved.push(p.id);
      toast(`Saved: ${p.title}`);
      renderSaved();
      renderDashboard();
      renderGuided();
    } else {
      toast("Already saved.");
    }
  });

  $("#shareBtn").addEventListener("click", () => {
    const p = getSelected();
    if(!p) return;
    toast("Generated report (demo). Open Report Preview.");
    setScreen("report");
  });

  $("#compareBtn").addEventListener("click", compareTop2);

  // modal open buttons
  $("#openInsightBtn").addEventListener("click", openInsightForCurrent);
  $("#trendInsightBtn").addEventListener("click", () => { setScreen("trends"); openInsightForCurrent(); });
  $("#riskInsightBtn").addEventListener("click", () => { setScreen("risk"); openInsightForCurrent(); });
  $("#openDashInsight").addEventListener("click", openInsightForCurrent);

  // export
  $("#exportBtn").addEventListener("click", () => toast("Exported (demo). Imagine a PDF download."));

  // guide go
  $("#guideGoBtn").addEventListener("click", () => {
    const next = suggestedNext();
    setScreen(next.screen);
  });

  // reset
  $("#resetBtn").addEventListener("click", () => {
    state.role = "buyer";
    state.storyboard = false;
    state.guided = true;
    state.activeScreen = "home";
    state.activeFilter = null;
    state.query = "";
    state.selectedId = null;
    state.saved = [];
    state.budget = 850000;
    state.mustHaves = new Set();
    state.wizStep = 1;

    // UI reset
    $("#searchInput").value = "";
    $$(".chip[data-filter]").forEach(c => c.classList.remove("active"));
    $("#storyToggle").classList.remove("on");
    $("#storyToggle").setAttribute("aria-pressed", "false");
    $("#guideToggle").classList.add("on");
    $("#guideToggle").setAttribute("aria-pressed", "true");

    setRole("buyer");
    setScreen("home");
    renderWizard();
    syncSelectionEverywhere();
    renderResults();
    renderMapPins();
    renderSaved();
    renderReport();
    renderDashboard();
    toast("Prototype reset.");
  });

  // modal close
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", (e) => { if(e.target.id === "modalBackdrop") closeModal(); });
  document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeModal(); });

  // Wizard buttons and selections
  $$(".chipBig[data-budget]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.budget = Number(btn.dataset.budget);
      toast(`Budget set: ${money(state.budget)}`);
      renderWizard();
      // affects ranking
      renderResults();
      renderMapPins();
    });
  });

  $$(".chipBig[data-must]").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = btn.dataset.must;
      if(state.mustHaves.has(k)) state.mustHaves.delete(k);
      else state.mustHaves.add(k);

      toast(`Must-haves: ${state.mustHaves.size ? Array.from(state.mustHaves).join(", ") : "none"}`);
      renderWizard();
      renderResults();
      renderMapPins();
    });
  });

  $("#wizNext1").addEventListener("click", () => { state.wizStep = 2; renderWizard(); });
  $("#wizBack2").addEventListener("click", () => { state.wizStep = 1; renderWizard(); });
  $("#wizNext2").addEventListener("click", () => { state.wizStep = 3; renderWizard(); });
  $("#wizBack3").addEventListener("click", () => { state.wizStep = 2; renderWizard(); });

  $("#wizFinish").addEventListener("click", () => {
    toast("Preferences saved (demo). Recommendations updated.");
    setScreen("search");
    renderResults();
    renderMapPins();
    renderGuided();
  });
}

// ---------- Boot ----------
function init(){
  bindEvents();
  setRole(state.role);
  renderWizard();
  setScreen("home");
  renderResults();
  renderMapPins();
  syncSelectionEverywhere();
  renderSaved();
  renderReport();
  renderDashboard();
}

window.addEventListener("DOMContentLoaded", init);
