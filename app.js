/* ═══════════════════════════════════════════════════════════════
   EstateIQ Patch 1 — app.js
   Combined: EstateIQ web prototype + EstateIQ_app-main (Flutter)
   All IDs match index.html exactly.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── DATA ──────────────────────────────────────────────────────── */
const PROPERTIES = [
  {
    id: 'SJ1', name: 'Willow Glen Craftsman',
    address: '1442 Shasta Ave, San Jose, CA 95125',
    beds: 3, baths: 2, sqft: 1820,
    price: 879000, priceLabel: '$879K',
    fairLow: 840000, fairHigh: 910000,
    signal: 'Undervalued', risk: 'Low', riskScore: 28,
    capRate: 3.8, appreciation: '+12%', roi: '6.1%', conf: 'High',
    pin: { x: '38%', y: '45%' }, pinColor: 'good', score: 88,
    description: 'Charming 1940s craftsman in Willow Glen with updated kitchen, original hardwood floors, and a large backyard. Walking distance to Lincoln Ave shops.',
    scores: { transit: 7, schools: 8, walkability: 9, growth: 8 },
    nextStep: 'Schedule a tour — 3 competing offers expected this week.',
    monthlyRent: 4100,
    highlights: ['Below market by ~9%', 'High walk score', 'Top school district', 'Recent kitchen remodel'],
  },
  {
    id: 'SJ2', name: 'Downtown Modern Condo',
    address: '200 S Market St #1204, San Jose, CA 95113',
    beds: 2, baths: 2, sqft: 1190,
    price: 735000, priceLabel: '$735K',
    fairLow: 700000, fairHigh: 780000,
    signal: 'High Growth', risk: 'Medium', riskScore: 54,
    capRate: 4.2, appreciation: '+18%', roi: '7.2%', conf: 'Medium',
    pin: { x: '52%', y: '54%' }, pinColor: 'warn', score: 82,
    description: 'Sleek 12th-floor condo with panoramic city views, in-unit laundry, and resort amenities. Steps from SAP Center and the Google Downtown West campus.',
    scores: { transit: 10, schools: 6, walkability: 10, growth: 9 },
    nextStep: 'Request an investment analysis report to compare with comparable rentals.',
    monthlyRent: 3800,
    highlights: ['Google campus proximity', 'Excellent transit', 'High rental demand', '18% YoY appreciation'],
  },
  {
    id: 'SJ3', name: 'Berryessa Duplex',
    address: '2817 Alum Rock Ave, San Jose, CA 95127',
    beds: 4, baths: 3, sqft: 2340,
    price: 925000, priceLabel: '$925K',
    fairLow: 890000, fairHigh: 960000,
    signal: 'Best ROI', risk: 'Medium', riskScore: 48,
    capRate: 5.5, appreciation: '+9%', roi: '8.8%', conf: 'High',
    pin: { x: '68%', y: '40%' }, pinColor: 'warn', score: 79,
    description: 'Well-maintained duplex with two 2-bed units. Both currently rented, generating immediate cash flow. BART proximity drives strong rental demand.',
    scores: { transit: 8, schools: 6, walkability: 7, growth: 7 },
    nextStep: 'Run cap rate analysis — current rents may be below market.',
    monthlyRent: 5800,
    highlights: ['Dual rental income', 'BART proximity', '5.5% cap rate', 'Below replacement cost'],
  },
  {
    id: 'SJ4', name: 'Cambrian Park Ranch',
    address: '1905 Villagewood Dr, San Jose, CA 95124',
    beds: 3, baths: 2, sqft: 1650,
    price: 842000, priceLabel: '$842K',
    fairLow: 820000, fairHigh: 870000,
    signal: 'Low Risk', risk: 'Low', riskScore: 22,
    capRate: 3.4, appreciation: '+7%', roi: '5.4%', conf: 'High',
    pin: { x: '32%', y: '62%' }, pinColor: 'good', score: 91,
    description: 'Stable single-family home in established Cambrian Park. Low vacancy, top-rated schools, and freeway access make this a reliable long-term hold.',
    scores: { transit: 6, schools: 9, walkability: 7, growth: 6 },
    nextStep: 'Low-risk portfolio anchor — strong candidate for a 1031 exchange.',
    monthlyRent: 3500,
    highlights: ['Lowest risk score', 'Top school district', 'Stable rental history', 'Freeway access'],
  },
  {
    id: 'SJ5', name: 'Alum Rock Emerging',
    address: '3305 Penitencia Creek Rd, San Jose, CA 95148',
    beds: 3, baths: 2, sqft: 1480,
    price: 695000, priceLabel: '$695K',
    fairLow: 660000, fairHigh: 730000,
    signal: 'Emerging', risk: 'Medium', riskScore: 61,
    capRate: 4.8, appreciation: '+22%', roi: '9.1%', conf: 'Medium',
    pin: { x: '74%', y: '55%' }, pinColor: 'warn', score: 74,
    description: 'Early-stage opportunity in rapidly gentrifying Alum Rock corridor. New transit infrastructure and city investment have driven 22% appreciation in 12 months.',
    scores: { transit: 7, schools: 5, walkability: 6, growth: 10 },
    nextStep: 'Act before next BART extension announcement — prices expected to spike.',
    monthlyRent: 3200,
    highlights: ['Fastest growing corridor', '+22% appreciation', 'Lowest entry price', 'New transit infra'],
  },
  {
    id: 'SJ6', name: 'Rose Garden Victorian',
    address: '1102 Naglee Ave, San Jose, CA 95126',
    beds: 4, baths: 3, sqft: 2560,
    price: 1150000, priceLabel: '$1.15M',
    fairLow: 1100000, fairHigh: 1200000,
    signal: 'Best ROI', risk: 'Low', riskScore: 31,
    capRate: 5.1, appreciation: '+14%', roi: '8.2%', conf: 'High',
    pin: { x: '44%', y: '36%' }, pinColor: 'good', score: 85,
    description: 'Stunning Victorian in San Jose\'s coveted Rose Garden. Fully renovated with period details preserved. Premium rental income from historic district appeal.',
    scores: { transit: 8, schools: 8, walkability: 9, growth: 8 },
    nextStep: 'Premium market — evaluate against comparable Victorian rentals in Naglee Park.',
    monthlyRent: 6200,
    highlights: ['Historic district premium', '5.1% cap rate', 'Fully renovated', 'Premium renter pool'],
  },
];

const ROLE_META = {
  buyer:    'Personalised affordability, school ratings, neighbourhood safety & commute times.',
  investor: 'Cap rates, cash-on-cash return, appreciation forecasts & ROI projections.',
  agent:    'Comparable market data, lead scoring, listing analytics & market timing.',
};

const GUIDE_STEPS = {
  home:       'Set your role in the sidebar, then use Get Started to personalise your search.',
  onboarding: 'Set your budget and priorities so EstateIQ can rank properties for you.',
  search:     'Use signal chips to filter by opportunity type. Tap ⚙ for advanced price & bedroom filters.',
  details:    'Explore metrics and neighbourhood scores. Add to Watchlist for ongoing alerts.',
  trends:     'Track price appreciation, confidence, and inventory trends in your target area.',
  risk:       'Compare risk profiles and use the ROI Calculator to model investment scenarios.',
  watchlist:  'Your saved properties trigger alerts for price changes and market shifts.',
  report:     'A comprehensive property summary tailored to your role. Export or share it.',
  dashboard:  'Portfolio overview, market KPIs, and personalised insights at a glance.',
  profile:    'Manage your account settings and upgrade your plan for advanced analytics.',
};

const STORY_CONTENT = {
  search: {
    title: '📖 Market Story: Why Silicon Valley, Why Now',
    text: 'Tech giants are expanding in San Jose, creating 50K+ new jobs over 5 years. Every 100 new tech jobs historically drives 90 new units of housing demand. Supply: critically short.',
    tags: [{ text: '🏗️ Supply constrained' }, { text: '💼 Job growth', alt: true }, { text: '📈 Rising rents', alt: true }],
  },
  trends: {
    title: '📖 The Cycle: Where Are We?',
    text: 'San Jose is in expansion phase — prices rising, vacancy falling, construction still lagging demand. Early-cycle investors who act now capture appreciation before peak.',
    tags: [{ text: '🔄 Expansion phase' }, { text: '⚡ Low vacancy', alt: true }, { text: '🏗️ Construction lag', alt: true }],
  },
  risk: {
    title: '📖 Risk Story: Not All Risk Is Equal',
    text: 'Low-risk assets compound wealth slowly but reliably. Emerging plays can 3× your money — or crater. Smart investors build a barbell: 60% low-risk, 40% emerging.',
    tags: [{ text: '⚖️ Barbell strategy' }, { text: '🛡️ Capital protection', alt: true }, { text: '🚀 Growth exposure', alt: true }],
  },
};

/* ── STATE ──────────────────────────────────────────────────────── */
const S = {
  auth: { isLoggedIn: false, user: { name: 'Jane Doe', email: 'demo@estateiq.com', plan: 'Free' } },
  role: 'buyer',
  storyboard: false,
  guided: true,
  activeScreen: 'home',
  activeFilter: 'All',
  query: '',
  priceMin: 200000, priceMax: 2000000,
  minBeds: 0, riskFilter: 'All',
  selectedId: null,
  watchlist: [],
  alerts: [],
  unreadAlerts: 0,
  budget: 850000,
  mustHaves: new Set(),
  wizStep: 1,
};

/* ── HELPERS ────────────────────────────────────────────────────── */
function fmt(n) {
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return '$' + Math.round(n / 1e3) + 'K';
  return '$' + n;
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function initials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }
function setEl(id, text) { const e = document.getElementById(id); if (e) e.textContent = text; }
function $id(id) { return document.getElementById(id); }
function alertIcon(type) { return type === 'priceChange' ? '💰' : type === 'newMatch' ? '🏠' : '📊'; }

/* ── TOAST ──────────────────────────────────────────────────────── */
function toast(msg, dur = 2700) {
  const host = $id('toastHost');
  if (!host) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  host.appendChild(el);
  setTimeout(() => {
    el.style.cssText += 'opacity:0;transform:translateX(20px);transition:.3s';
    setTimeout(() => el.remove(), 320);
  }, dur);
}

/* ── LOGIN ──────────────────────────────────────────────────────── */
function tryLogin() {
  const email = ($id('loginEmail')?.value || '').trim();
  const pass  = $id('loginPassword')?.value || '';
  const err   = $id('loginError');
  if (err) err.style.display = 'none';
  if (email === 'demo@estateiq.com' && pass === 'demo1234') {
    doLogin();
  } else {
    if (err) { err.style.display = 'block'; err.textContent = 'Invalid credentials. Try demo@estateiq.com / demo1234'; }
  }
}

function doLogin(role) {
  if (role) S.role = role;
  S.auth.isLoggedIn = true;
  $id('loginScreen').style.display = 'none';
  $id('appShell').style.display    = '';
  renderSidebar();
  setScreen('home');
  toast('Welcome back, ' + S.auth.user.name.split(' ')[0] + '! 👋');
}

function doLogout() {
  S.auth.isLoggedIn = false;
  $id('appShell').style.display   = 'none';
  $id('loginScreen').style.display = '';
  if ($id('loginEmail'))    $id('loginEmail').value    = '';
  if ($id('loginPassword')) $id('loginPassword').value = '';
  if ($id('loginError'))    $id('loginError').style.display = 'none';
  toast('Logged out successfully.');
}

/* ── SIDEBAR ────────────────────────────────────────────────────── */
function renderSidebar() {
  setEl('sidebarName', S.auth.user.name);
  setEl('sidebarAvatar', initials(S.auth.user.name));
  setEl('sidebarPlan', S.auth.user.plan + ' Plan');

  document.querySelectorAll('.segBtn[data-role]').forEach(b =>
    b.classList.toggle('active', b.dataset.role === S.role));
  setEl('roleMeta', ROLE_META[S.role]);

  const st = $id('storyToggle');
  if (st) { st.classList.toggle('on', S.storyboard); st.setAttribute('aria-pressed', S.storyboard); }
  const gt = $id('guideToggle');
  if (gt) { gt.classList.toggle('on', S.guided); gt.setAttribute('aria-pressed', S.guided); }

  document.querySelectorAll('.navItem[data-screen]').forEach(n =>
    n.classList.toggle('active', n.dataset.screen === S.activeScreen));

  updateNotifBadge();
  updateProgress();
}

/* ── SCREEN NAVIGATION ──────────────────────────────────────────── */
function setScreen(name) {
  S.activeScreen = name;

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $id('screen-' + name);
  if (el) el.classList.add('active');

  document.querySelectorAll('.navItem[data-screen]').forEach(n =>
    n.classList.toggle('active', n.dataset.screen === name));
  document.querySelectorAll('.bnItem[data-screen]').forEach(n =>
    n.classList.toggle('active', n.dataset.screen === name));

  const titles = {
    home:       { t: 'EstateIQ',         s: 'AI-powered property intelligence' },
    onboarding: { t: 'Get Started',      s: 'Personalise your search profile' },
    search:     { t: 'Property Search',  s: 'Browse & filter opportunities' },
    details:    { t: 'Property Details', s: S.selectedId ? PROPERTIES.find(p => p.id === S.selectedId)?.name || '' : 'Select a property' },
    trends:     { t: 'Market Trends',    s: 'Price appreciation & inventory analysis' },
    risk:       { t: 'Risk & ROI',       s: 'Compare risk profiles & calculate returns' },
    watchlist:  { t: 'Watchlist',        s: 'Saved properties & intelligent alerts' },
    report:     { t: 'AI Report',        s: 'Comprehensive investment analysis' },
    dashboard:  { t: 'Dashboard',        s: 'Portfolio overview & market KPIs' },
    profile:    { t: 'My Profile',       s: 'Account settings & subscription' },
  };
  const t = titles[name] || titles.home;
  setEl('topTitle', t.t);
  setEl('topSub', t.s);

  renderGuideBar(name);
  renderStoryBox(name);
  updateProgress();

  const renderers = {
    home: renderHome, onboarding: renderOnboarding,
    search: renderSearch, details: renderDetails,
    trends: renderTrends, risk: renderRisk,
    watchlist: renderWatchlist, report: renderReport,
    dashboard: renderDashboard, profile: renderProfile,
  };
  if (renderers[name]) renderers[name]();
}

/* ── GUIDE BAR ──────────────────────────────────────────────────── */
function renderGuideBar(name) {
  const bar = $id('guideBar');
  if (!bar) return;
  bar.style.display = S.guided ? '' : 'none';
  setEl('guideText', GUIDE_STEPS[name] || '');
}

/* ── STORY BOX ──────────────────────────────────────────────────── */
function renderStoryBox(name) {
  const box = $id('storyBox');
  if (!box) return;
  if (!S.storyboard || !STORY_CONTENT[name]) { box.classList.remove('on'); return; }
  const c = STORY_CONTENT[name];
  setEl('storyTitle', c.title);
  setEl('storyText', c.text);
  const tags = $id('storyTags');
  if (tags) tags.innerHTML = c.tags.map(t => `<span class="storyTag${t.alt ? ' alt' : ''}">${t.text}</span>`).join('');
  box.classList.add('on');
}

/* ── FILTER LOGIC ───────────────────────────────────────────────── */
function filterProps() {
  const q = S.query.toLowerCase();
  return PROPERTIES.filter(p => {
    const mQ = !q || p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q) || p.signal.toLowerCase().includes(q);
    const mF = S.activeFilter === 'All' || p.signal === S.activeFilter || (S.activeFilter === 'Low Risk' && p.risk === 'Low');
    const mP = p.price >= S.priceMin && p.price <= S.priceMax;
    const mB = p.beds >= S.minBeds;
    const mR = S.riskFilter === 'All' || p.risk === S.riskFilter;
    return mQ && mF && mP && mB && mR;
  });
}

function isAdvFilterActive() {
  return S.priceMin > 200000 || S.priceMax < 2000000 || S.minBeds > 0 || S.riskFilter !== 'All';
}

/* ── HOME ───────────────────────────────────────────────────────── */
function renderHome() {
  const lead = $id('homeLead');
  if (lead) {
    const lines = {
      buyer:    'We help you understand fair prices, find neighbourhoods that fit your lifestyle, and know exactly what to do next — without spreadsheets.',
      investor: 'We surface the best cap rates, appreciation trends, and ROI projections — so you invest with confidence, not guesswork.',
      agent:    'We give you live market data, comparable sales, and lead scoring so you can advise clients with precision.',
    };
    lead.textContent = lines[S.role] || lines.buyer;
  }
}

/* ── ONBOARDING ─────────────────────────────────────────────────── */
function renderOnboarding() {
  setWizStep(S.wizStep, false);
  const bi = $id('budgetInput');
  if (bi) bi.value = S.budget;
  setEl('budgetValue', fmt(S.budget));

  // Restore must-haves selection
  document.querySelectorAll('.prefTile[data-must]').forEach(t =>
    t.classList.toggle('selected', S.mustHaves.has(t.dataset.must)));

  updateWizSummary();
}

function setWizStep(n, rerender = true) {
  S.wizStep = clamp(n, 1, 3);
  ['ws1','ws2','ws3'].forEach((id, i) => {
    const el = $id(id);
    if (el) el.classList.toggle('active', S.wizStep === i + 1);
  });
  ['wizPanel1','wizPanel2','wizPanel3'].forEach((id, i) => {
    const el = $id(id);
    if (el) el.classList.toggle('active', S.wizStep === i + 1);
  });
  if (rerender && S.wizStep === 3) updateWizSummary();
}

function updateWizSummary() {
  const role = S.role.charAt(0).toUpperCase() + S.role.slice(1);
  const must = S.mustHaves.size > 0 ? [...S.mustHaves].join(', ') : 'None selected';
  setEl('prefRole', role);
  setEl('prefBudget', fmt(S.budget));
  setEl('prefMust', must);
}

/* ── SEARCH ─────────────────────────────────────────────────────── */
function renderSearch() {
  const filtered = filterProps();

  // chip active states
  document.querySelectorAll('.signalChips .chip[data-filter]').forEach(c =>
    c.classList.toggle('active', c.dataset.filter === S.activeFilter));

  // tune button
  const tb = $id('advFilterBtn');
  if (tb) tb.classList.toggle('active', isAdvFilterActive());

  // filter summary bar
  const sb = $id('filterSummaryBar');
  if (sb) {
    if (isAdvFilterActive()) {
      sb.style.display = '';
      sb.textContent = `Filters: ${fmt(S.priceMin)}–${fmt(S.priceMax)} · ${S.minBeds}+ beds · Risk: ${S.riskFilter}`;
    } else { sb.style.display = 'none'; }
  }

  // map pins
  renderMapPins(filtered);

  // summary
  setEl('searchSummary', filtered.length > 0
    ? filtered.length + ' properties found in San Jose · Sorted by AI score'
    : 'No properties match your current filters.');

  // results list
  const list = $id('resultsList');
  if (list) {
    if (filtered.length === 0) {
      list.innerHTML = '<p style="color:var(--muted);padding:20px 0">No results. Try adjusting your filters.</p>';
    } else {
      list.innerHTML = filtered.map((p, i) =>
        `<div class="propCard${S.selectedId === p.id ? ' selected' : ''}" data-propcard="${p.id}">
          <div class="propCard__left">
            <div class="propCard__rank">#${i+1} AI Pick · Score ${p.score}</div>
            <div class="propCard__title">${p.name}</div>
            <div class="propCard__meta">${p.beds}bd · ${p.baths}ba · ${p.sqft.toLocaleString()} sqft</div>
            <div class="propCard__price">${p.priceLabel} <span style="font-size:13px;color:var(--muted)">Cap ${p.capRate}%</span></div>
          </div>
          <div class="propCard__right">
            <span class="badge badge--${p.risk === 'Low' ? 'good' : 'warn'}">${p.signal}</span>
            <span class="badge badge--${p.risk === 'Low' ? 'good' : p.risk === 'High' ? 'bad' : 'warn'}">${p.risk} Risk</span>
          </div>
        </div>`
      ).join('');
      list.querySelectorAll('[data-propcard]').forEach(c =>
        c.addEventListener('click', () => selectProperty(c.dataset.propcard, true)));
    }
  }

  // right panel preview
  updateSearchPreview();
}

function renderMapPins(props) {
  const el = $id('mapPins');
  if (!el) return;
  el.innerHTML = props.map(p =>
    `<div class="pin ${p.pinColor}${S.selectedId === p.id ? ' selected' : ''}"
          style="left:${p.pin.x};top:${p.pin.y}"
          data-pin="${p.id}"
          title="${p.name} · ${p.priceLabel}"></div>`
  ).join('');
  el.querySelectorAll('[data-pin]').forEach(pin =>
    pin.addEventListener('click', () => selectProperty(pin.dataset.pin)));
}

function selectProperty(id, navigate) {
  S.selectedId = id;
  if (navigate) { setScreen('details'); return; }
  // just update preview
  updateSearchPreview();
  // re-render pins to show selected
  renderMapPins(filterProps());
  // highlight card
  document.querySelectorAll('#resultsList .propCard').forEach(c =>
    c.classList.toggle('selected', c.dataset.propcard === id));
}

function updateSearchPreview() {
  const p = S.selectedId ? PROPERTIES.find(x => x.id === S.selectedId) : null;
  setEl('mkSignal',  p ? p.signal     : '—');
  setEl('mkRisk',    p ? p.risk       : '—');
  setEl('mkGrowth',  p ? p.appreciation : '—');
  setEl('mkCap',     p ? p.capRate + '%' : '—');
  const det = $id('searchDetail');
  if (det && p) {
    det.innerHTML = `<strong>${p.name}</strong><br>${p.address}<br><br>${p.description}`;
  } else if (det) {
    det.textContent = 'Click any property or map pin to preview it here.';
  }
}

/* ── DETAILS ────────────────────────────────────────────────────── */
function renderDetails() {
  const p = S.selectedId ? PROPERTIES.find(x => x.id === S.selectedId) : null;

  if (!p) {
    setEl('detailTitle', 'Select a property from Search');
    setEl('detailMeta',  '—');
    setEl('detailPrice',     '$—'); setEl('detailFairRange', '$—');
    setEl('detailSignal',    '—'); setEl('detailCapRate', '—');
    setEl('detailNext',  '—');
    setEl('detailExplain', 'Select a property to see personalised insights.');
    const nhEl = $id('nhBars');
    if (nhEl) nhEl.innerHTML = '';
    const wb = $id('watchlistBtn');
    if (wb) { wb.disabled = true; wb.innerHTML = '<span>⭐</span><span>Watchlist</span>'; }
    const sb = $id('shareBtn');
    if (sb) sb.disabled = true;
    return;
  }

  setEl('detailTitle', p.name);
  setEl('detailMeta',  p.address);
  setEl('detailPrice',     p.priceLabel);
  setEl('detailFairRange', fmt(p.fairLow) + '–' + fmt(p.fairHigh));
  setEl('detailSignal',    p.signal);
  setEl('detailCapRate',   p.capRate + '%');
  setEl('detailNext',      p.nextStep);

  // Neighbourhood bars
  const nhEl = $id('nhBars');
  if (nhEl) {
    nhEl.innerHTML = Object.entries(p.scores).map(([k, v]) =>
      `<div class="nhBar">
        <span class="nhBar__label">${k.charAt(0).toUpperCase() + k.slice(1)}</span>
        <div class="nhBar__track"><div class="nhBar__fill" style="width:${v * 10}%"></div></div>
        <span class="nhBar__val">${v}/10</span>
      </div>`
    ).join('');
  }

  // Watchlist button
  const wb = $id('watchlistBtn');
  const inWL = S.watchlist.includes(p.id);
  if (wb) {
    wb.disabled = false;
    wb.className = 'btn' + (inWL ? ' btn--save' : '');
    wb.innerHTML = inWL ? '<span>🔔</span><span>Watching</span>' : '<span>⭐</span><span>Watchlist</span>';
  }
  const sb = $id('shareBtn');
  if (sb) sb.disabled = false;

  // Explain panel (role-based)
  const explains = {
    buyer:    `<p><strong>Is this a fair price?</strong> AI fair range is ${fmt(p.fairLow)}–${fmt(p.fairHigh)}. At ${p.priceLabel}, this is ${p.price < p.fairLow ? 'below' : p.price > p.fairHigh ? 'above' : 'within'} the expected range.</p><p><strong>What signal does this have?</strong> <em>${p.signal}</em> — ${p.signal === 'Undervalued' ? 'priced below comparable sales, potential for quick equity gains.' : p.signal === 'Low Risk' ? 'stable area with consistent value, ideal for a primary residence.' : 'trending upward in this market segment.'}</p>`,
    investor: `<p><strong>Cap Rate: ${p.capRate}%</strong> — ${p.capRate >= 5 ? 'excellent for San Jose.' : 'moderate; strong for a prime market.'} Annual NOI projection: ${fmt(Math.round((p.monthlyRent - 1000) * 12))}.</p><p><strong>Appreciation: ${p.appreciation}</strong> YoY. Combined with rental yield, total return = ~${p.roi}.</p>`,
    agent:    `<p><strong>Listing at ${p.priceLabel}</strong> vs fair range ${fmt(p.fairLow)}–${fmt(p.fairHigh)}. Price position: <em>${p.signal}</em>.</p><p><strong>Market signal:</strong> ${p.appreciation} appreciation suggests ${parseFloat(p.appreciation) > 10 ? 'high buyer interest — list now.' : 'steady demand with good long-term outlook.'}</p>`,
  };
  setEl('detailExplain', '');
  const detExp = $id('detailExplain');
  if (detExp) detExp.innerHTML = explains[S.role] || explains.buyer;
}

/* ── TRENDS ─────────────────────────────────────────────────────── */
function renderTrends() {
  const p = S.selectedId ? PROPERTIES.find(x => x.id === S.selectedId) : null;

  // Role line
  const trl = $id('trendRoleLine');
  if (trl) {
    const lines = {
      buyer:    '🏠 Buyer View: Track price direction to time your offer. Upward trend = negotiate sooner.',
      investor: '📈 Investor View: Appreciation trend directly impacts your exit cap rate and 10-year IRR.',
      agent:    '🤝 Agent View: Market timing signal — use this to advise clients on urgency.',
    };
    trl.textContent = lines[S.role];
  }

  setEl('trendPct',  p ? p.appreciation : '+13.7%');
  setEl('trendConf', p ? p.conf : 'High');
  setEl('trendInv',  'Tight');

  // SVG chart
  const chartEl = $id('trendChart');
  if (chartEl) {
    const months = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'];
    const base = p ? Math.round(p.price / 1000 * 0.88) : 820;
    const rate = p ? (parseFloat(p.appreciation) / 100 / 12) : 0.012;
    const vals  = months.map((_, i) => Math.round(base * Math.pow(1 + rate, i)));
    const W = 500, H = 160, pad = 30;
    const mn = Math.min(...vals) - 5, mx = Math.max(...vals) + 10;
    const xS = (W - pad * 2) / (vals.length - 1);
    const yS = v => H - pad - ((v - mn) / (mx - mn)) * (H - pad * 2);
    const pts = vals.map((v, i) => `${pad + i * xS},${yS(v)}`).join(' ');
    const area = `M ${pad},${H - pad} ` + vals.map((v, i) => `L ${pad + i * xS},${yS(v)}`).join(' ') + ` L ${pad + (vals.length - 1) * xS},${H - pad} Z`;

    chartEl.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${area}" fill="url(#cg)"/>
      <polyline points="${pts}" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linejoin="round"/>
      ${vals.map((v, i) =>
        `<circle cx="${pad + i * xS}" cy="${yS(v)}" r="3.5" fill="#6366f1" stroke="white" stroke-width="1.5"/>
         <text x="${pad + i * xS}" y="${H - 4}" text-anchor="middle" fill="rgba(196,202,217,0.55)" font-size="9" font-family="Open Sans,sans-serif">${months[i]}</text>
         <text x="${pad + i * xS}" y="${yS(v) - 8}" text-anchor="middle" fill="rgba(196,202,217,0.7)" font-size="8" font-family="Open Sans,sans-serif">$${v}K</text>`
      ).join('')}
    </svg>`;
  }

  // Explain
  const trendExp = $id('trendExplain');
  if (trendExp && p) {
    const expls = {
      buyer:    `<p><strong>${p.name}</strong> has appreciated <strong class="good">${p.appreciation}</strong> over the last 12 months. For buyers, this signals that waiting could cost more — each month of delay adds ~${fmt(Math.round(p.price * parseFloat(p.appreciation) / 100 / 12))} to the effective price.</p>`,
      investor: `<p>With <strong class="good">${p.appreciation}</strong> annual appreciation and a <strong>${p.capRate}%</strong> cap rate, total projected annual return is <strong class="good">${p.roi}</strong>. At this pace, a 20% down payment doubles in ~${Math.ceil(72 / parseFloat(p.roi))} years (Rule of 72).</p>`,
      agent:    `<p>Comparable sales in this zip have risen <strong>${p.appreciation}</strong> YoY. With confidence level <strong>${p.conf}</strong>, advise buyers to act within 2–3 weeks. Sellers should expect multiple offers at current conditions.</p>`,
    };
    trendExp.innerHTML = expls[S.role] || expls.buyer;
  } else if (trendExp) {
    trendExp.textContent = 'Select a property to see a role-based trend explanation.';
  }
}

/* ── RISK ───────────────────────────────────────────────────────── */
function renderRisk() {
  const p = S.selectedId ? PROPERTIES.find(x => x.id === S.selectedId) : null;

  setEl('riskLevel', p ? p.risk        : '—');
  setEl('roiHint',   p ? p.roi         : '—');
  setEl('riskAction',p ? (p.risk === 'Low' ? 'Buy ✓' : p.risk === 'Medium' ? 'Evaluate' : 'Caution') : '—');

  const riskExp = $id('riskExplain');
  if (riskExp && p) {
    riskExp.innerHTML = `<p>Risk score <strong class="${p.risk === 'Low' ? 'good' : p.risk === 'High' ? 'bad' : 'warn'}">${p.riskScore}/100</strong> — ${p.risk === 'Low' ? 'Low exposure to price drops. Stable rental demand, strong schools, and consistent buyer interest.' : p.risk === 'Medium' ? 'Some volatility possible due to market timing or local factors. Strong fundamentals offset this.' : 'High exposure to adverse price movement. Only suitable for experienced investors with long horizons.'}
    </p><p>Highlights: ${p.highlights.map(h => `<em>${h}</em>`).join(' · ')}</p>`;
  } else if (riskExp) {
    riskExp.textContent = 'Select a property to see a risk assessment.';
  }

  const riskBreak = $id('riskBreakdown');
  if (riskBreak) {
    const sorted = [...PROPERTIES].sort((a, b) => a.riskScore - b.riskScore);
    riskBreak.innerHTML = sorted.map(q =>
      `<div class="nhBar" style="margin-bottom:10px">
        <span class="nhBar__label" style="width:110px;font-size:12px">${q.name.split(' ').slice(0,2).join(' ')}</span>
        <div class="nhBar__track"><div class="nhBar__fill" style="width:${q.riskScore}%;background:${q.risk === 'Low' ? 'var(--good)' : q.risk === 'High' ? 'var(--bad)' : 'var(--warn)'}"></div></div>
        <span class="nhBar__val" style="color:${q.risk === 'Low' ? 'var(--good)' : q.risk === 'High' ? 'var(--bad)' : 'var(--warn)'}">${q.riskScore}</span>
      </div>`
    ).join('');
  }

  updateROICalc();
}

function updateROICalc() {
  const p = S.selectedId ? PROPERTIES.find(x => x.id === S.selectedId) : null;
  const rent = parseFloat($id('roiRent')?.value || (p ? p.monthlyRent : 3500));
  const exp  = parseFloat($id('roiExpenses')?.value || 8000) / 12; // annual → monthly
  const price = p ? p.price : 879000;

  const noi      = (rent - exp) * 12;
  const capRate  = price > 0 ? ((noi / price) * 100).toFixed(2) : 0;
  const gYield   = price > 0 ? ((rent * 12 / price) * 100).toFixed(1) : 0;

  const r = $id('roiResult');
  if (r) r.innerHTML = `💡 <strong>Annual NOI:</strong> ${fmt(Math.round(noi))} &nbsp;|&nbsp; <strong>Cap Rate:</strong> ${capRate}% &nbsp;|&nbsp; <strong>Gross Yield:</strong> ${gYield}%<br><span style="font-size:12px;color:var(--muted)">Based on ${fmt(Math.round(rent))}/mo rent, ${fmt(Math.round(exp*12))}/yr expenses, ${fmt(price)} purchase price${p ? '' : ' (default)'}.</span>`;
}

/* ── WATCHLIST ──────────────────────────────────────────────────── */
function renderWatchlist() {
  const props = PROPERTIES.filter(p => S.watchlist.includes(p.id));
  const list  = $id('watchlistList');
  const cbox  = $id('compareBox');
  const cbtn  = $id('compareBtn');
  const ainl  = $id('alertsInlineList');

  if (cbtn) cbtn.disabled = props.length < 2;

  if (list) {
    if (props.length === 0) {
      list.innerHTML = `<div style="text-align:center;padding:32px 0">
        <div style="font-size:48px;margin-bottom:16px">🔔</div>
        <div style="font-family:var(--font-display);font-size:20px;font-weight:700;margin-bottom:10px">Watchlist is Empty</div>
        <div style="color:var(--muted);font-size:14px;margin-bottom:20px">Add properties from Search or Details to get price alerts.</div>
        <button class="btn btn--primary" data-screen="search">Browse Properties →</button>
      </div>`;
      list.querySelector('[data-screen]')?.addEventListener('click', e => setScreen(e.currentTarget.dataset.screen));
    } else {
      list.innerHTML = props.map(p => {
        const pAlerts = S.alerts.filter(a => a.propertyId === p.id);
        return `<div class="cardSub" style="margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px;flex-wrap:wrap">
            <div>
              <div style="font-family:var(--font-display);font-size:16px;font-weight:700">${p.name}</div>
              <div style="font-size:13px;color:var(--muted);margin-top:3px">${p.priceLabel} · ${p.signal} · ${p.risk} Risk</div>
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn" data-gotodetail="${p.id}">Details</button>
              <button class="btn" style="color:var(--bad);border-color:rgba(239,68,68,0.4)" data-removewl="${p.id}">Remove</button>
            </div>
          </div>
          ${pAlerts.length > 0
            ? `<div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Recent Alerts</div>
               <div class="alertsInline">
                 ${pAlerts.slice(0, 3).map(a =>
                   `<div class="alertItem${a.isRead ? '' : ' unread'}" data-alertid="${a.id}">
                     <div class="alertIcon">${alertIcon(a.type)}</div>
                     <div class="alertContent">
                       <div class="alertTitle">${a.type === 'priceChange' ? 'Price Change' : a.type === 'newMatch' ? 'New Match' : 'Market Shift'}</div>
                       <div class="alertMsg">${a.message}</div>
                     </div>
                   </div>`
                 ).join('')}
               </div>`
            : '<div style="font-size:13px;color:var(--muted);padding:8px 0">Watching — no alerts yet.</div>'
          }
        </div>`;
      }).join('');
      list.querySelectorAll('[data-removewl]').forEach(b => b.addEventListener('click', () => removeWatchlist(b.dataset.removewl)));
      list.querySelectorAll('[data-gotodetail]').forEach(b => b.addEventListener('click', () => { S.selectedId = b.dataset.gotodetail; setScreen('details'); }));
      list.querySelectorAll('[data-alertid]').forEach(b => b.addEventListener('click', () => markAlertRead(b.dataset.alertid)));
    }
  }

  // Compare box
  if (cbox) {
    if (props.length >= 2) {
      const [a, b] = props;
      cbox.innerHTML = `
        <div style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:12px">Top 2 Comparison</div>
        <div class="nhBars">
          ${['price','capRate','riskScore','score'].map(k => {
            const aV = a[k], bV = b[k];
            const label = { price: 'Price', capRate: 'Cap Rate', riskScore: 'Risk', score: 'AI Score' }[k];
            const fmt2 = v => k === 'price' ? fmt(v) : k === 'capRate' ? v + '%' : v.toString();
            return `<div class="nhBar">
              <span class="nhBar__label" style="width:70px;font-size:12px">${label}</span>
              <span style="font-size:12px;font-weight:700;color:var(--accent2);flex:1">${a.name.split(' ')[0]}: ${fmt2(aV)}</span>
              <span style="font-size:12px;font-weight:700;color:var(--warn)">${b.name.split(' ')[0]}: ${fmt2(bV)}</span>
            </div>`;
          }).join('')}
        </div>`;
    } else {
      cbox.textContent = 'Save at least 2 properties to compare them side-by-side.';
    }
  }

  // Alerts inline (side panel)
  if (ainl) {
    const recent = S.alerts.slice(0, 5);
    ainl.innerHTML = recent.length === 0
      ? '<div style="color:var(--muted);font-size:13px">No alerts yet.</div>'
      : recent.map(a =>
          `<div class="alertItem${a.isRead ? '' : ' unread'}" data-alertid="${a.id}">
            <div class="alertIcon">${alertIcon(a.type)}</div>
            <div class="alertContent">
              <div class="alertTitle">${a.propertyTitle}</div>
              <div class="alertMsg">${a.message}</div>
            </div>
          </div>`
        ).join('');
    ainl.querySelectorAll('[data-alertid]').forEach(b => b.addEventListener('click', () => markAlertRead(b.dataset.alertid)));
  }
}

function toggleWatchlist(id) {
  S.watchlist.includes(id) ? removeWatchlist(id) : addWatchlist(id);
}

function addWatchlist(id) {
  if (S.watchlist.includes(id)) return;
  S.watchlist.push(id);
  const p = PROPERTIES.find(x => x.id === id);
  if (p) {
    const types = ['priceChange', 'newMatch', 'marketShift'];
    const type  = types[S.alerts.length % 3];
    const msgs  = {
      priceChange: `${p.name} price reduced. Now ${p.priceLabel} — down $18K from list.`,
      newMatch:    `New comparable listing within 0.5 miles of ${p.name}.`,
      marketShift: `${p.name}'s neighbourhood saw ${p.appreciation} appreciation this quarter.`,
    };
    S.alerts.unshift({ id: 'a' + Date.now(), propertyId: id, propertyTitle: p.name, message: msgs[type], type, isRead: false });
    S.unreadAlerts++;
    toast('🔔 ' + p.name + ' added to Watchlist');
  }
  updateNotifBadge();
  updateProgress();
  if (S.activeScreen === 'details')   renderDetails();
  if (S.activeScreen === 'watchlist') renderWatchlist();
}

function removeWatchlist(id) {
  S.watchlist = S.watchlist.filter(x => x !== id);
  S.alerts    = S.alerts.filter(a => a.propertyId !== id);
  recomputeUnread();
  updateNotifBadge();
  const p = PROPERTIES.find(x => x.id === id);
  if (p) toast('Removed ' + p.name + ' from Watchlist');
  if (S.activeScreen === 'details')   renderDetails();
  if (S.activeScreen === 'watchlist') renderWatchlist();
  updateProgress();
}

function recomputeUnread() {
  S.unreadAlerts = S.alerts.filter(a => !a.isRead).length;
}

function markAlertRead(id) {
  const a = S.alerts.find(x => x.id === id);
  if (a && !a.isRead) { a.isRead = true; recomputeUnread(); updateNotifBadge(); }
  renderAlertSheet();
  if (S.activeScreen === 'watchlist') renderWatchlist();
}

function markAllRead() {
  S.alerts.forEach(a => a.isRead = true);
  S.unreadAlerts = 0;
  updateNotifBadge();
  renderAlertSheet();
  if (S.activeScreen === 'watchlist') renderWatchlist();
  toast('All alerts marked as read');
}

/* ── NOTIFICATION BADGE ─────────────────────────────────────────── */
function updateNotifBadge() {
  const nb = $id('notifBadge');
  if (nb) {
    nb.style.display = S.unreadAlerts > 0 ? 'flex' : 'none';
    if (S.unreadAlerts > 0) nb.textContent = S.unreadAlerts > 9 ? '9+' : S.unreadAlerts;
  }
  const wb = $id('navWatchBadge');
  if (wb) {
    wb.style.display = S.watchlist.length > 0 ? 'flex' : 'none';
    if (S.watchlist.length > 0) wb.textContent = S.watchlist.length;
  }
}

/* ── ALERTS SHEET ───────────────────────────────────────────────── */
function openAlertSheet() {
  $id('alertsBackdrop')?.classList.add('show');
  renderAlertSheet();
}
function closeAlertSheet() { $id('alertsBackdrop')?.classList.remove('show'); }

function renderAlertSheet() {
  const el = $id('alertsList');
  if (!el) return;
  if (S.alerts.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:24px;color:var(--muted)">No alerts yet. Add properties to get alerts!</div>';
    return;
  }
  el.innerHTML = S.alerts.map(a =>
    `<div class="alertItem${a.isRead ? '' : ' unread'}" data-alertid="${a.id}">
      <div class="alertIcon">${alertIcon(a.type)}</div>
      <div class="alertContent">
        <div class="alertTitle">${a.propertyTitle}</div>
        <div class="alertMsg">${a.message}</div>
      </div>
    </div>`
  ).join('');
  el.querySelectorAll('[data-alertid]').forEach(b => b.addEventListener('click', () => markAlertRead(b.dataset.alertid)));
}

/* ── FILTER PANEL ───────────────────────────────────────────────── */
function openFilterPanel() {
  $id('filterBackdrop')?.classList.add('show');
  const pmin = $id('priceMinSlider'); if (pmin) pmin.value = S.priceMin;
  const pmax = $id('priceMaxSlider'); if (pmax) pmax.value = S.priceMax;
  setEl('fpMin', fmt(S.priceMin));
  setEl('fpMax', fmt(S.priceMax));
  document.querySelectorAll('#bedsChips .filterChip[data-beds]').forEach(c =>
    c.classList.toggle('active', parseInt(c.dataset.beds) === S.minBeds));
  document.querySelectorAll('#riskChips .filterChip[data-risk]').forEach(c =>
    c.classList.toggle('active', c.dataset.risk === S.riskFilter));
}
function closeFilterPanel() { $id('filterBackdrop')?.classList.remove('show'); }

function applyFilter() {
  const pmin = $id('priceMinSlider'), pmax = $id('priceMaxSlider');
  if (pmin) S.priceMin = parseInt(pmin.value);
  if (pmax) S.priceMax = parseInt(pmax.value);
  closeFilterPanel();
  renderSearch();
}
function resetFilter() {
  S.priceMin = 200000; S.priceMax = 2000000; S.minBeds = 0; S.riskFilter = 'All';
  const pmin = $id('priceMinSlider'), pmax = $id('priceMaxSlider');
  if (pmin) pmin.value = 200000; if (pmax) pmax.value = 2000000;
  setEl('fpMin', fmt(200000)); setEl('fpMax', fmt(2000000));
  document.querySelectorAll('#bedsChips .filterChip[data-beds]').forEach(c => c.classList.toggle('active', c.dataset.beds === '0'));
  document.querySelectorAll('#riskChips .filterChip[data-risk]').forEach(c => c.classList.toggle('active', c.dataset.risk === 'All'));
  closeFilterPanel();
  renderSearch();
}

/* ── REPORT ─────────────────────────────────────────────────────── */
function renderReport() {
  const p = S.selectedId ? PROPERTIES.find(x => x.id === S.selectedId) : PROPERTIES[0];
  if (!p) return;

  setEl('repTitle',  p.name);
  setEl('repMeta',   p.address + ' · ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  setEl('repRole',   S.role.charAt(0).toUpperCase() + S.role.slice(1) + ' Brief');
  setEl('repPrice',  p.priceLabel);
  setEl('repRange',  fmt(p.fairLow) + '–' + fmt(p.fairHigh));
  setEl('repSignal', p.signal);
  setEl('repRisk',   p.risk);

  const narratives = {
    buyer:    `${p.name} sits ${p.price < p.fairLow ? 'below' : 'within'} the AI fair range of ${fmt(p.fairLow)}–${fmt(p.fairHigh)}. With a ${p.risk.toLowerCase()} risk profile and ${p.appreciation} annual appreciation, this is a ${p.score >= 85 ? 'strong' : 'solid'} opportunity for buyers prioritising ${S.mustHaves.size > 0 ? [...S.mustHaves].slice(0,2).join(' and ') : 'value and stability'}.`,
    investor: `With a ${p.capRate}% cap rate and ${p.appreciation} YoY appreciation, ${p.name} projects a ${p.roi} total annual return. Risk score of ${p.riskScore}/100 places this in the ${p.risk.toLowerCase()}-risk tier — suitable for ${p.risk === 'Low' ? 'conservative income portfolios' : 'balanced growth strategies'}.`,
    agent:    `${p.name} is priced at ${p.priceLabel} vs fair range ${fmt(p.fairLow)}–${fmt(p.fairHigh)}. Signal: ${p.signal}. At ${p.appreciation} YoY appreciation, this property has strong narrative for motivated buyers. Days on market average 14 in this zip.`,
  };

  setEl('repNarrative', '');
  const narEl = $id('repNarrative');
  if (narEl) narEl.textContent = narratives[S.role] || narratives.buyer;

  const recsByRole = {
    buyer:    [`Offer at ${fmt(Math.round(p.price * 0.97 / 1000) * 1000)} to allow negotiation room`, 'Schedule home inspection within 7 days of accepted offer', `School district rated ${p.scores.schools}/10 — confirm with local board`, `Walk score ${p.scores.walkability}/10 — verify daily commute time`],
    investor: [`Cap rate ${p.capRate}% outperforms area average of 3.2%`, `NOI projection: ${fmt(Math.round((p.monthlyRent - 1000) * 12))}/yr after standard expenses`, `10-year appreciation model at ${p.appreciation}/yr yields ${fmt(Math.round(p.price * Math.pow(1 + parseFloat(p.appreciation) / 100, 10)))}`, '20% down conventional loan optimises leverage at current rates'],
    agent:    ['14 avg days on market — below 28-day benchmark', `Priced ${p.price < (p.fairLow + p.fairHigh) / 2 ? 'below' : 'at'} median comparable closed sales`, '12 active saved searches in this zip code', `Suggested list price post-improvements: ${fmt(Math.round(p.price * 1.06 / 1000) * 1000)}`],
  };

  const repAct = $id('repActions');
  if (repAct) repAct.innerHTML = (recsByRole[S.role] || recsByRole.buyer).map(r => `<li>${r}</li>`).join('');
}

/* ── DASHBOARD ──────────────────────────────────────────────────── */
function renderDashboard() {
  setEl('dashSub', `Your ${S.role.charAt(0).toUpperCase() + S.role.slice(1)} hub — ${new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`);

  const avgCap   = (PROPERTIES.reduce((s, p) => s + p.capRate, 0) / PROPERTIES.length).toFixed(1);
  const avgScore = Math.round(PROPERTIES.reduce((s, p) => s + p.score, 0) / PROPERTIES.length);
  const lowRisk  = PROPERTIES.filter(p => p.risk === 'Low').length;

  const stats = $id('dashStats');
  if (stats) {
    const items = [
      { val: PROPERTIES.length, lbl: 'Properties Tracked' },
      { val: avgScore,          lbl: 'Avg AI Score' },
      { val: avgCap + '%',      lbl: 'Avg Cap Rate' },
      { val: S.watchlist.length,lbl: 'Watchlisted' },
      { val: lowRisk,           lbl: 'Low Risk' },
      { val: S.unreadAlerts,    lbl: 'Unread Alerts' },
    ];
    stats.innerHTML = items.map(i =>
      `<div class="dashStat"><div class="dashStat__val">${i.val}</div><div class="dashStat__lbl">${i.lbl}</div></div>`
    ).join('');
  }

  const todayByRole = {
    buyer:    `<p>📝 Complete your onboarding to get personalised picks.</p><p>🔍 Browse the <strong>Search</strong> screen — ${filterProps().length} properties match your current filters.</p>`,
    investor: `<p>📊 Berryessa Duplex leads with <strong>5.5% cap rate</strong>.</p><p>📈 Alum Rock Emerging shows highest growth at <strong>+22%</strong> YoY.</p>`,
    agent:    `<p>🎯 12 active buyer searches in San Jose 95125.</p><p>⏱️ Avg days on market: <strong>14</strong> — fastest pace in 3 years.</p>`,
  };
  setEl('dashToday', '');
  const todayEl = $id('dashToday');
  if (todayEl) todayEl.innerHTML = todayByRole[S.role] || todayByRole.buyer;

  const insightsByRole = {
    buyer:    [['🏠','Best Value','Willow Glen Craftsman — 9% below market'], ['📍','Top Schools','Cambrian Park — rated 9/10'], ['⚡','Act Now','3 competing offers expected this week']],
    investor: [['📈','Best Cap','Berryessa Duplex at 5.5%'], ['💰','Best ROI','Alum Rock Emerging at 9.1%'], ['🛡️','Safest Hold','Cambrian Park — risk score 22/100']],
    agent:    [['🎯','Hot Leads','12 searches active in target zip'], ['📊','Market Trend','+14% avg YoY across portfolio'], ['⏱️','DOM','14 days avg — price urgently']],
  };
  const insEl = $id('dashInsights');
  if (insEl) {
    insEl.innerHTML = (insightsByRole[S.role] || insightsByRole.buyer).map(([icon, title, val]) =>
      `<div style="margin-bottom:10px"><span style="font-size:18px">${icon}</span> <strong>${title}:</strong> <span style="color:var(--muted)">${val}</span></div>`
    ).join('');
  }

  // Watchlist summary panel
  const dwl = $id('dashWatchlist');
  if (dwl) {
    if (S.watchlist.length === 0) {
      dwl.textContent = 'No saved properties yet. Add some from the Search screen!';
    } else {
      const wlProps = PROPERTIES.filter(p => S.watchlist.includes(p.id));
      dwl.innerHTML = wlProps.map(p =>
        `<div style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between">
          <span style="font-weight:700;font-size:13px">${p.name}</span>
          <span style="color:var(--accent2);font-size:13px">${p.priceLabel}</span>
        </div>`
      ).join('') + `<div style="margin-top:12px"><button class="btn btn--primary" data-screen="watchlist" style="width:100%">View Watchlist →</button></div>`;
      dwl.querySelector('[data-screen]')?.addEventListener('click', e => setScreen(e.currentTarget.dataset.screen));
    }
  }
}

/* ── PROFILE ────────────────────────────────────────────────────── */
function renderProfile() {
  const u = S.auth.user;
  setEl('profileAvatarBig', initials(u.name));
  setEl('profileName',  u.name);
  setEl('profileEmail', u.email);
  setEl('profileRole',  S.role.charAt(0).toUpperCase() + S.role.slice(1));
  setEl('profileBudget', fmt(S.budget));
  setEl('profileMust', S.mustHaves.size > 0 ? [...S.mustHaves].join(', ') : 'None selected');
  setEl('profileWatchCount', S.watchlist.length + ' properties');
  setEl('profileAlertCount', S.unreadAlerts.toString());

  // Update badge text
  const badge = document.querySelector('#screen-profile .profileBadge');
  if (badge) badge.textContent = u.plan + ' Plan';
}

/* ── AI INSIGHT MODAL ───────────────────────────────────────────── */
function openModal(propId) {
  const p = propId ? PROPERTIES.find(x => x.id === propId) : null;
  const modal = $id('modalBackdrop');
  if (!modal) return;

  setEl('modalTitle',    p ? 'AI Insight: ' + p.name : 'AI Market Insight');
  setEl('modalSubtitle', p ? p.priceLabel + ' · ' + p.signal + ' · ' + p.risk + ' Risk' : 'Powered by EstateIQ Intelligence');

  const body = $id('modalBody');
  if (!body) { modal.classList.add('show'); return; }

  if (p) {
    body.innerHTML = `
      <p style="font-size:14px;color:var(--muted);line-height:1.75;margin-bottom:14px">${p.description}</p>
      <div class="modal__sectionTitle">Key Metrics</div>
      <div class="kpiGrid" style="margin-bottom:16px">
        <div class="kpiBox"><div class="kpiBox__val">${p.capRate}%</div><div class="kpiBox__lbl">Cap Rate</div></div>
        <div class="kpiBox"><div class="kpiBox__val good">${p.appreciation}</div><div class="kpiBox__lbl">Appreciation</div></div>
        <div class="kpiBox"><div class="kpiBox__val ${p.risk === 'Low' ? 'good' : 'warn'}">${p.riskScore}</div><div class="kpiBox__lbl">Risk Score</div></div>
      </div>
      <div class="modal__sectionTitle">AI Recommendation (${S.role.charAt(0).toUpperCase() + S.role.slice(1)})</div>
      <p style="font-size:14px;color:var(--muted);line-height:1.75">${p.nextStep} ${p.risk === 'Low' ? 'Strong hold candidate for conservative portfolios.' : 'Run detailed cash flow analysis before committing.'}</p>
    `;
  } else {
    body.innerHTML = `
      <p style="font-size:14px;color:var(--muted);line-height:1.75">San Jose residential market shows strong fundamentals. Tech job growth continues to outpace housing supply. Average appreciation across tracked properties: <strong>13.7% YTD</strong>.</p>
      <div class="modal__sectionTitle">Top Opportunity This Month</div>
      <p style="font-size:14px;color:var(--muted);line-height:1.75">Berryessa Duplex leads with <strong>5.5% cap rate</strong>. Alum Rock corridor shows highest growth at <strong>+22%</strong> appreciation.</p>
    `;
  }

  modal.classList.add('show');
}
function closeModal() { $id('modalBackdrop')?.classList.remove('show'); }

/* ── PROGRESS TRACKER ───────────────────────────────────────────── */
const PROGRESS_CHECKS = [
  { label: 'Set Role',        ok: () => true },
  { label: 'Set Budget',      ok: () => S.budget !== 850000 || S.mustHaves.size > 0 },
  { label: 'Browse Market',   ok: () => S.selectedId !== null },
  { label: 'Add Watchlist',   ok: () => S.watchlist.length > 0 },
  { label: 'View Report',     ok: () => S.activeScreen === 'report' },
];

function updateProgress() {
  const done = PROGRESS_CHECKS.filter(c => c.ok()).length;
  const pct  = Math.round((done / PROGRESS_CHECKS.length) * 100);
  const fill = $id('progressFill');
  if (fill) { fill.style.width = pct + '%'; fill.closest('.progressBar')?.setAttribute('aria-valuenow', pct); }
  setEl('progressPct',  pct + '%');
  const next = PROGRESS_CHECKS.find(c => !c.ok());
  setEl('progressHint', next ? 'Next: ' + next.label : '🎉 All steps complete!');
}

/* ── EVENT BINDING ──────────────────────────────────────────────── */
function bindAll() {
  // Login
  $id('loginBtn')?.addEventListener('click', tryLogin);
  document.querySelectorAll('[data-login-role]').forEach(b =>
    b.addEventListener('click', () => doLogin(b.dataset.loginRole)));

  // Enter key in login fields
  ['loginEmail','loginPassword'].forEach(id =>
    $id(id)?.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); }));

  // Logout (sidebar + profile)
  $id('logoutBtn')?.addEventListener('click', doLogout);
  $id('profileLogoutBtn')?.addEventListener('click', doLogout);

  // Role segmented buttons
  document.querySelectorAll('.segBtn[data-role]').forEach(b =>
    b.addEventListener('click', () => {
      S.role = b.dataset.role;
      renderSidebar();
      const r = { home: renderHome, report: renderReport, dashboard: renderDashboard, details: renderDetails, trends: renderTrends, risk: renderRisk };
      if (r[S.activeScreen]) r[S.activeScreen]();
      toast('Role: ' + S.role.charAt(0).toUpperCase() + S.role.slice(1));
    }));

  // Story toggle
  $id('storyToggle')?.addEventListener('click', () => {
    S.storyboard = !S.storyboard;
    renderSidebar(); renderStoryBox(S.activeScreen);
  });

  // Guide toggle
  $id('guideToggle')?.addEventListener('click', () => {
    S.guided = !S.guided;
    renderSidebar(); renderGuideBar(S.activeScreen);
  });

  // All data-screen navigation
  document.querySelectorAll('[data-screen]').forEach(el => {
    el.addEventListener('click', () => setScreen(el.dataset.screen));
  });

  // Guide "Take Me There" button
  $id('guideGoBtn')?.addEventListener('click', () => {
    const next = PROGRESS_CHECKS.find(c => !c.ok());
    const map  = { 'Set Budget': 'onboarding', 'Browse Market': 'search', 'Add Watchlist': 'watchlist', 'View Report': 'report' };
    if (next && map[next.label]) setScreen(map[next.label]);
  });

  // AI Insight (topbar)
  $id('openInsightBtn')?.addEventListener('click', () => openModal(S.selectedId));
  $id('modalClose')?.addEventListener('click', closeModal);
  $id('modalBackdrop')?.addEventListener('click', e => { if (e.target === $id('modalBackdrop')) closeModal(); });

  // Other insight buttons
  ['detInsightBtn','trendInsightBtn','riskInsightBtn','openDashInsight'].forEach(id =>
    $id(id)?.addEventListener('click', () => openModal(S.selectedId)));

  // Alerts sheet
  $id('alertsBtn')?.addEventListener('click', openAlertSheet);
  $id('markAllReadBtn')?.addEventListener('click', markAllRead);
  $id('alertsBackdrop')?.addEventListener('click', e => { if (e.target === $id('alertsBackdrop')) closeAlertSheet(); });

  // Watchlist top button (navigate)
  $id('watchlistTopBtn')?.addEventListener('click', () => setScreen('watchlist'));

  // Advanced filter
  $id('advFilterBtn')?.addEventListener('click', openFilterPanel);
  $id('filterCloseBtn')?.addEventListener('click', closeFilterPanel);
  $id('filterApplyBtn')?.addEventListener('click', applyFilter);
  $id('filterResetBtn')?.addEventListener('click', resetFilter);
  $id('filterBackdrop')?.addEventListener('click', e => { if (e.target === $id('filterBackdrop')) closeFilterPanel(); });

  $id('priceMinSlider')?.addEventListener('input', function() { S.priceMin = parseInt(this.value); setEl('fpMin', fmt(S.priceMin)); });
  $id('priceMaxSlider')?.addEventListener('input', function() { S.priceMax = parseInt(this.value); setEl('fpMax', fmt(S.priceMax)); });

  document.querySelectorAll('#bedsChips .filterChip[data-beds]').forEach(c =>
    c.addEventListener('click', () => { S.minBeds = parseInt(c.dataset.beds); document.querySelectorAll('#bedsChips .filterChip').forEach(x => x.classList.toggle('active', x === c)); }));
  document.querySelectorAll('#riskChips .filterChip[data-risk]').forEach(c =>
    c.addEventListener('click', () => { S.riskFilter = c.dataset.risk; document.querySelectorAll('#riskChips .filterChip').forEach(x => x.classList.toggle('active', x === c)); }));

  // Search input + clear
  $id('searchInput')?.addEventListener('input', function() { S.query = this.value; renderSearch(); });
  $id('clearSearchBtn')?.addEventListener('click', () => { S.query = ''; const si = $id('searchInput'); if (si) si.value = ''; renderSearch(); });

  // Signal chips (in search screen, static HTML)
  document.querySelectorAll('.signalChips .chip[data-filter]').forEach(c =>
    c.addEventListener('click', () => { S.activeFilter = c.dataset.filter; renderSearch(); }));

  // Watchlist button (details screen)
  $id('watchlistBtn')?.addEventListener('click', () => { if (S.selectedId) toggleWatchlist(S.selectedId); });
  $id('shareBtn')?.addEventListener('click', () => toast('Link copied to clipboard 🔗'));

  // Wizard
  $id('wizNext1')?.addEventListener('click', () => setWizStep(2));
  $id('wizNext2')?.addEventListener('click', () => setWizStep(3));
  $id('wizBack2')?.addEventListener('click', () => setWizStep(1));
  $id('wizBack3')?.addEventListener('click', () => setWizStep(2));
  $id('wizFinish')?.addEventListener('click', () => { setScreen('search'); toast('Profile saved! 🎯 Showing personalised results.'); });

  $id('budgetInput')?.addEventListener('input', function() {
    S.budget = parseInt(this.value);
    setEl('budgetValue', fmt(S.budget));
    if (S.wizStep === 3) updateWizSummary();
  });

  document.querySelectorAll('.prefTile[data-must]').forEach(t =>
    t.addEventListener('click', () => {
      const id = t.dataset.must;
      if (S.mustHaves.has(id)) { S.mustHaves.delete(id); t.classList.remove('selected'); }
      else { S.mustHaves.add(id); t.classList.add('selected'); }
      updateWizSummary();
    }));

  // ROI calculator
  ['roiRent','roiExpenses'].forEach(id => $id(id)?.addEventListener('input', updateROICalc));

  // Export / share report
  $id('exportBtn')?.addEventListener('click', () => toast('Exporting PDF report… 📄'));

  // Upgrade
  $id('upgradeBtn')?.addEventListener('click', () => {
    S.auth.user.plan = 'Pro';
    renderSidebar(); renderProfile();
    toast('🎉 Upgraded to Pro Plan!');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeAlertSheet(); closeFilterPanel(); }
  });
}

/* ── INIT ───────────────────────────────────────────────────────── */
function init() {
  bindAll();
  $id('appShell').style.display   = 'none';
  $id('loginScreen').style.display = '';
  // Pre-fill demo creds hint already in HTML
}

document.addEventListener('DOMContentLoaded', init);
