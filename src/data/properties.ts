export interface Property {
  id: string;
  name: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  price: number;
  priceLabel: string;
  fairLow: number;
  fairHigh: number;
  signal: string;
  risk: 'Low' | 'Medium' | 'High';
  riskScore: number;
  capRate: number;
  appreciation: string;
  roi: string;
  conf: string;
  pin: { x: string; y: string };
  pinColor: 'good' | 'warn' | 'bad';
  score: number;
  description: string;
  scores: { transit: number; schools: number; walkability: number; growth: number };
  nextStep: string;
  monthlyRent: number;
  highlights: string[];
}

export const PROPERTIES: Property[] = [
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

export const ROLE_META: Record<string, string> = {
  buyer: 'Personalised affordability, school ratings, neighbourhood safety & commute times.',
  investor: 'Cap rates, cash-on-cash return, appreciation forecasts & ROI projections.',
  agent: 'Comparable market data, lead scoring, listing analytics & market timing.',
};

export const GUIDE_STEPS: Record<string, string> = {
  home: 'Set your role in the sidebar, then use Get Started to personalise your search.',
  onboarding: 'Set your budget and priorities so EstateIQ can rank properties for you.',
  search: 'Use signal chips to filter by opportunity type. Tap ⚙ for advanced filters.',
  details: 'Explore metrics and neighbourhood scores. Add to Watchlist for ongoing alerts.',
  trends: 'Track price appreciation, confidence, and inventory trends in your target area.',
  risk: 'Compare risk profiles and use the ROI Calculator to model investment scenarios.',
  watchlist: 'Your saved properties trigger alerts for price changes and market shifts.',
  report: 'A comprehensive property summary tailored to your role. Export or share it.',
  dashboard: 'Portfolio overview, market KPIs, and personalised insights at a glance.',
  architecture: 'See how API gateway, services, data layer, and external APIs work together.',
  profile: 'Manage your account settings and upgrade your plan for advanced analytics.',
};

export function fmt(n: number): string {
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return '$' + Math.round(n / 1e3) + 'K';
  return '$' + n;
}
