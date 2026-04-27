import { Property, fmt } from '@/data/properties';

const RENTCAST_API_KEY = import.meta.env.VITE_RENTCAST_API_KEY || '';
export const hasRentCastKey = Boolean(RENTCAST_API_KEY);

type RentCastListing = Record<string, unknown>;

function asNumber(value: unknown, fallback = 0) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value) || fallback;
  return fallback;
}

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function compact(values: unknown[]) {
  return values
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .map(value => value.trim())
    .filter((value, index, all) => all.indexOf(value) === index)
    .join(', ');
}

function listingToProperty(row: RentCastListing, index: number): Property {
  const id = asString(row.id, `rentcast-${index}`);
  const address = compact([
    row.formattedAddress,
    row.addressLine1,
    row.city,
    row.state,
    row.zipCode,
  ]);
  const beds = asNumber(row.bedrooms);
  const baths = asNumber(row.bathrooms);
  const sqft = asNumber(row.squareFootage ?? row.livingArea);
  const price = asNumber(row.price ?? row.listPrice);
  const latitude = asNumber(row.latitude, NaN);
  const longitude = asNumber(row.longitude, NaN);
  const capRate = price > 0 ? Math.min(7.5, Math.max(2, ((Math.max(2200, beds * 1150 + baths * 450) * 12) / price) * 100)) : 0;
  const pricePerSqft = sqft > 0 && price > 0 ? price / sqft : 9999;
  const growth = pricePerSqft < 650 || price < 650000;
  const risk = price > 1300000 || !beds ? 'Medium' : 'Low';

  return {
    id,
    name: address.split(',')[0] || `${asString(row.propertyType, 'Property')} in ${asString(row.city, 'Market')}`,
    address,
    beds,
    baths,
    sqft,
    price,
    priceLabel: fmt(price),
    fairLow: Math.round(price * 0.95),
    fairHigh: Math.round(price * 1.05),
    signal: growth ? 'High Growth' : 'Live Listing',
    risk,
    riskScore: risk === 'Low' ? 28 + (index % 12) : 48 + (index % 18),
    capRate: Number(capRate.toFixed(1)),
    appreciation: growth ? '+15%' : '+7%',
    roi: growth ? '8.4%' : '6.0%',
    conf: 'Medium',
    pin: { x: `${20 + (index * 13) % 65}%`, y: `${25 + (index * 17) % 55}%` },
    pinColor: risk === 'Low' ? 'good' : 'warn',
    score: growth ? 88 - (index % 8) : 76 - (index % 8),
    description: `${asString(row.status, 'Active')} listing imported from RentCast. EstateIQ adds provisional risk, growth, and cap-rate estimates for screening.`,
    scores: { transit: 7, schools: 7, walkability: 7, growth: growth ? 9 : 6 },
    nextStep: 'Compare RentCast listing facts with local comps and rental assumptions.',
    monthlyRent: Math.max(2200, beds * 1150 + baths * 450),
    highlights: ['Live RentCast listing', asString(row.mlsName, 'MLS data'), `${Math.round(capRate * 10) / 10}% estimated cap rate`],
    latitude: Number.isFinite(latitude) ? latitude : undefined,
    longitude: Number.isFinite(longitude) ? longitude : undefined,
    source: 'RentCast',
  };
}

export async function fetchRentCastListings(city = 'San Jose', state = 'CA', limit = 20): Promise<Property[]> {
  if (!RENTCAST_API_KEY) return [];

  const params = new URLSearchParams({ city, state, limit: String(limit) });
  const proxyUrl = `/api/rentcast/v1/listings/sale?${params}`;
  const directUrl = `https://api.rentcast.io/v1/listings/sale?${params}`;

  const request = (url: string) =>
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': RENTCAST_API_KEY,
      },
    });

  let response = await request(proxyUrl);
  if (!response.ok && response.status === 404) response = await request(directUrl);
  if (!response.ok) throw new Error(`RentCast request failed (${response.status})`);

  const data = await response.json();
  const rows = Array.isArray(data) ? data : data?.listings ?? data?.data ?? [];
  return rows.map(listingToProperty);
}
