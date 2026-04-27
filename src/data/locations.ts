export interface CityLocation {
  name: string;
  stateCode: string;
  latitude: number;
  longitude: number;
}

export const US_STATES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota',
  OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island',
  SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas',
  UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
  WI: 'Wisconsin', WY: 'Wyoming',
};

export const CITY_LOCATIONS: CityLocation[] = [
  { name: 'Birmingham', stateCode: 'AL', latitude: 33.5186, longitude: -86.8104 },
  { name: 'Anchorage', stateCode: 'AK', latitude: 61.2176, longitude: -149.8997 },
  { name: 'Phoenix', stateCode: 'AZ', latitude: 33.4484, longitude: -112.0740 },
  { name: 'Tucson', stateCode: 'AZ', latitude: 32.2226, longitude: -110.9747 },
  { name: 'Little Rock', stateCode: 'AR', latitude: 34.7465, longitude: -92.2896 },
  { name: 'Los Angeles', stateCode: 'CA', latitude: 34.0522, longitude: -118.2437 },
  { name: 'San Diego', stateCode: 'CA', latitude: 32.7157, longitude: -117.1611 },
  { name: 'San Francisco', stateCode: 'CA', latitude: 37.7749, longitude: -122.4194 },
  { name: 'San Jose', stateCode: 'CA', latitude: 37.3382, longitude: -121.8863 },
  { name: 'Sacramento', stateCode: 'CA', latitude: 38.5816, longitude: -121.4944 },
  { name: 'Denver', stateCode: 'CO', latitude: 39.7392, longitude: -104.9903 },
  { name: 'Colorado Springs', stateCode: 'CO', latitude: 38.8339, longitude: -104.8214 },
  { name: 'Hartford', stateCode: 'CT', latitude: 41.7658, longitude: -72.6734 },
  { name: 'Wilmington', stateCode: 'DE', latitude: 39.7391, longitude: -75.5398 },
  { name: 'Miami', stateCode: 'FL', latitude: 25.7617, longitude: -80.1918 },
  { name: 'Orlando', stateCode: 'FL', latitude: 28.5383, longitude: -81.3792 },
  { name: 'Tampa', stateCode: 'FL', latitude: 27.9506, longitude: -82.4572 },
  { name: 'Atlanta', stateCode: 'GA', latitude: 33.7490, longitude: -84.3880 },
  { name: 'Honolulu', stateCode: 'HI', latitude: 21.3099, longitude: -157.8581 },
  { name: 'Boise', stateCode: 'ID', latitude: 43.6150, longitude: -116.2023 },
  { name: 'Chicago', stateCode: 'IL', latitude: 41.8781, longitude: -87.6298 },
  { name: 'Indianapolis', stateCode: 'IN', latitude: 39.7684, longitude: -86.1581 },
  { name: 'Des Moines', stateCode: 'IA', latitude: 41.5868, longitude: -93.6250 },
  { name: 'Wichita', stateCode: 'KS', latitude: 37.6872, longitude: -97.3301 },
  { name: 'Louisville', stateCode: 'KY', latitude: 38.2527, longitude: -85.7585 },
  { name: 'New Orleans', stateCode: 'LA', latitude: 29.9511, longitude: -90.0715 },
  { name: 'Portland', stateCode: 'ME', latitude: 43.6591, longitude: -70.2568 },
  { name: 'Baltimore', stateCode: 'MD', latitude: 39.2904, longitude: -76.6122 },
  { name: 'Boston', stateCode: 'MA', latitude: 42.3601, longitude: -71.0589 },
  { name: 'Detroit', stateCode: 'MI', latitude: 42.3314, longitude: -83.0458 },
  { name: 'Minneapolis', stateCode: 'MN', latitude: 44.9778, longitude: -93.2650 },
  { name: 'Jackson', stateCode: 'MS', latitude: 32.2988, longitude: -90.1848 },
  { name: 'Kansas City', stateCode: 'MO', latitude: 39.0997, longitude: -94.5786 },
  { name: 'St. Louis', stateCode: 'MO', latitude: 38.6270, longitude: -90.1994 },
  { name: 'Billings', stateCode: 'MT', latitude: 45.7833, longitude: -108.5007 },
  { name: 'Omaha', stateCode: 'NE', latitude: 41.2565, longitude: -95.9345 },
  { name: 'Las Vegas', stateCode: 'NV', latitude: 36.1699, longitude: -115.1398 },
  { name: 'Manchester', stateCode: 'NH', latitude: 42.9956, longitude: -71.4548 },
  { name: 'Newark', stateCode: 'NJ', latitude: 40.7357, longitude: -74.1724 },
  { name: 'Albuquerque', stateCode: 'NM', latitude: 35.0844, longitude: -106.6504 },
  { name: 'New York', stateCode: 'NY', latitude: 40.7128, longitude: -74.0060 },
  { name: 'Buffalo', stateCode: 'NY', latitude: 42.8864, longitude: -78.8784 },
  { name: 'Charlotte', stateCode: 'NC', latitude: 35.2271, longitude: -80.8431 },
  { name: 'Raleigh', stateCode: 'NC', latitude: 35.7796, longitude: -78.6382 },
  { name: 'Fargo', stateCode: 'ND', latitude: 46.8772, longitude: -96.7898 },
  { name: 'Columbus', stateCode: 'OH', latitude: 39.9612, longitude: -82.9988 },
  { name: 'Cleveland', stateCode: 'OH', latitude: 41.4993, longitude: -81.6944 },
  { name: 'Oklahoma City', stateCode: 'OK', latitude: 35.4676, longitude: -97.5164 },
  { name: 'Portland', stateCode: 'OR', latitude: 45.5152, longitude: -122.6784 },
  { name: 'Philadelphia', stateCode: 'PA', latitude: 39.9526, longitude: -75.1652 },
  { name: 'Pittsburgh', stateCode: 'PA', latitude: 40.4406, longitude: -79.9959 },
  { name: 'Providence', stateCode: 'RI', latitude: 41.8240, longitude: -71.4128 },
  { name: 'Charleston', stateCode: 'SC', latitude: 32.7765, longitude: -79.9311 },
  { name: 'Sioux Falls', stateCode: 'SD', latitude: 43.5446, longitude: -96.7311 },
  { name: 'Nashville', stateCode: 'TN', latitude: 36.1627, longitude: -86.7816 },
  { name: 'Memphis', stateCode: 'TN', latitude: 35.1495, longitude: -90.0490 },
  { name: 'Houston', stateCode: 'TX', latitude: 29.7604, longitude: -95.3698 },
  { name: 'Austin', stateCode: 'TX', latitude: 30.2672, longitude: -97.7431 },
  { name: 'Dallas', stateCode: 'TX', latitude: 32.7767, longitude: -96.7970 },
  { name: 'San Antonio', stateCode: 'TX', latitude: 29.4241, longitude: -98.4936 },
  { name: 'Salt Lake City', stateCode: 'UT', latitude: 40.7608, longitude: -111.8910 },
  { name: 'Burlington', stateCode: 'VT', latitude: 44.4759, longitude: -73.2121 },
  { name: 'Virginia Beach', stateCode: 'VA', latitude: 36.8529, longitude: -75.9780 },
  { name: 'Richmond', stateCode: 'VA', latitude: 37.5407, longitude: -77.4360 },
  { name: 'Seattle', stateCode: 'WA', latitude: 47.6062, longitude: -122.3321 },
  { name: 'Spokane', stateCode: 'WA', latitude: 47.6588, longitude: -117.4260 },
  { name: 'Charleston', stateCode: 'WV', latitude: 38.3498, longitude: -81.6326 },
  { name: 'Milwaukee', stateCode: 'WI', latitude: 43.0389, longitude: -87.9065 },
  { name: 'Cheyenne', stateCode: 'WY', latitude: 41.1400, longitude: -104.8202 },
];

export const RADIUS_OPTIONS = [5, 10, 25, 50, 100];

export function distanceMiles(a: CityLocation, b: { latitude?: number; longitude?: number }) {
  if (b.latitude == null || b.longitude == null) return Number.POSITIVE_INFINITY;
  const radiusMiles = 3958.7613;
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return radiusMiles * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}
