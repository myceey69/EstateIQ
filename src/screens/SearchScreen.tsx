import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { PROPERTIES, fmt, Property } from '@/data/properties';
import { CITY_LOCATIONS, CityLocation, RADIUS_OPTIONS, US_STATES, distanceMiles } from '@/data/locations';
import { fetchRentCastListings, hasRentCastKey } from '@/services/rentcast';
import { Search, SlidersHorizontal, X, Cloud, RefreshCw, MapPin } from 'lucide-react';

const SIGNALS = ['All', 'Low Risk', 'High Growth', 'Best ROI', 'Undervalued', 'Emerging'];

function PropertyCard({ p, index, isSelected, onClick }: { p: Property; index: number; isSelected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center p-4 rounded-xl border-2 cursor-pointer transition-all gap-3
        ${isSelected ? 'bg-secondary/10 border-secondary shadow-md' : 'bg-muted/20 border-border/50 hover:bg-muted/30 hover:border-secondary hover:translate-x-0.5'}`}
    >
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-bold text-warning mb-1">#{index + 1} AI Pick · Score {p.score}</div>
        <div className="font-display text-base font-bold truncate">{p.name}</div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {p.beds || '—'}bd · {p.baths || '—'}ba · {p.sqft ? p.sqft.toLocaleString() : '—'} sqft
        </div>
        <div className="font-display text-lg font-bold text-secondary mt-1">
          {p.priceLabel} <span className="text-xs text-muted-foreground font-normal">Cap {p.capRate}%</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${p.risk === 'Low' ? 'badge-good' : 'badge-warn'}`}>{p.signal}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${p.risk === 'Low' ? 'badge-good' : p.risk === 'High' ? 'badge-bad' : 'badge-warn'}`}>{p.risk} Risk</span>
      </div>
    </div>
  );
}

export default function SearchScreen() {
  const {
    query, setQuery, activeFilter, setFilter, selectedId, setSelectedId, setScreen,
    priceMin, priceMax, minBeds, riskFilter, selectedState, selectedCity, radiusMiles,
    liveProperties, listingsLoading, listingsError,
    setPriceMin, setPriceMax, setMinBeds, setRiskFilter, setGeoFilter, resetFilters,
    setLiveProperties, setListingsLoading, setListingsError,
  } = useAppStore();
  const [showFilters, setShowFilters] = React.useState(false);
  const [cityQuery, setCityQuery] = React.useState(selectedCity?.name ?? '');

  const allProperties = liveProperties.length ? liveProperties : PROPERTIES;

  const loadListings = React.useCallback(async (city = selectedCity?.name || 'San Jose', state = selectedState || 'CA') => {
    setListingsLoading(true);
    setListingsError(null);
    try {
      const listings = await fetchRentCastListings(city, state, 20);
      setLiveProperties(listings);
    } catch (error) {
      setListingsError(error instanceof Error ? error.message : 'Could not load RentCast listings.');
    } finally {
      setListingsLoading(false);
    }
  }, [selectedCity?.name, selectedState, setListingsError, setListingsLoading, setLiveProperties]);

  React.useEffect(() => {
    if (hasRentCastKey && !liveProperties.length) void loadListings();
  }, [liveProperties.length, loadListings]);

  const cityOptions = React.useMemo(() => {
    if (!selectedState) return [];
    const q = cityQuery.trim().toLowerCase();
    return CITY_LOCATIONS
      .filter(city => city.stateCode === selectedState && (!q || city.name.toLowerCase().includes(q)))
      .slice(0, 8);
  }, [cityQuery, selectedState]);

  const filtered = allProperties.filter(p => {
    const q = query.toLowerCase();
    const mQ = !q || p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q) || p.signal.toLowerCase().includes(q);
    const mF = activeFilter === 'All' || p.signal === activeFilter || (activeFilter === 'Low Risk' && p.risk === 'Low');
    const mP = p.price >= priceMin && p.price <= priceMax;
    const mB = p.beds >= minBeds;
    const mR = riskFilter === 'All' || p.risk === riskFilter;
    const mGeo = !selectedCity || distanceMiles(selectedCity, p) <= radiusMiles;
    return mQ && mF && mP && mB && mR && mGeo;
  }).sort((a, b) => b.score - a.score);

  const selected = selectedId ? allProperties.find(p => p.id === selectedId) : null;
  const isAdvActive = priceMin > 200000 || priceMax < 2000000 || minBeds > 0 || riskFilter !== 'All' || !!selectedCity;

  const applyCity = async (city: CityLocation) => {
    setCityQuery(city.name);
    setGeoFilter(city.stateCode, city, radiusMiles);
    if (hasRentCastKey) await loadListings(city.name, city.stateCode);
  };

  return (
    <div className="p-6 overflow-y-auto h-full lg:pb-6 pb-20">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-display text-lg font-bold">Find Your Perfect Property</h3>
            <button onClick={() => void loadListings()} className="px-3 py-2 rounded-lg border-2 border-border text-xs font-bold text-muted-foreground hover:text-secondary hover:border-secondary flex items-center gap-2">
              <RefreshCw size={14} className={listingsLoading ? 'animate-spin' : ''} /> {hasRentCastKey ? 'Live' : 'Demo'}
            </button>
          </div>

          <div className="relative mb-3">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, area, or type…" className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-border bg-muted/30 text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm" />
          </div>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="flex gap-2 flex-wrap flex-1">
              {SIGNALS.map(s => (
                <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all whitespace-nowrap ${activeFilter === s ? 'bg-gradient-to-r from-primary to-secondary border-secondary text-primary-foreground shadow-md' : 'border-border bg-muted/20 text-muted-foreground hover:text-foreground'}`}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all flex-shrink-0 ${isAdvActive ? 'border-secondary text-secondary bg-secondary/10' : 'border-border text-muted-foreground hover:border-secondary hover:text-secondary'}`}>
              <SlidersHorizontal size={18} />
            </button>
          </div>

          {showFilters && (
            <div className="mb-4 p-4 rounded-xl bg-muted/20 border-2 border-border/50 space-y-4 animate-fade-up">
              <div className="grid md:grid-cols-[0.85fr_1fr] gap-3">
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase mb-2">State</div>
                  <select value={selectedState} onChange={e => { setGeoFilter(e.target.value, null, radiusMiles); setCityQuery(''); }} className="w-full px-3 py-2.5 rounded-xl border-2 border-border bg-background text-sm focus:border-secondary outline-none">
                    <option value="">Select state</option>
                    {Object.entries(US_STATES).map(([code, name]) => <option key={code} value={code}>{name} ({code})</option>)}
                  </select>
                </div>
                <div className="relative">
                  <div className="text-xs font-bold text-muted-foreground uppercase mb-2">City</div>
                  <input disabled={!selectedState} value={cityQuery} onChange={e => { setCityQuery(e.target.value); setGeoFilter(selectedState, null, radiusMiles); }} placeholder={selectedState ? 'Search city' : 'Select state first'} className="w-full px-3 py-2.5 rounded-xl border-2 border-border bg-background text-sm focus:border-secondary outline-none disabled:opacity-50" />
                  {selectedState && cityQuery && !selectedCity && cityOptions.length > 0 && (
                    <div className="absolute z-20 mt-1 w-full rounded-xl border-2 border-border bg-card shadow-xl overflow-hidden">
                      {cityOptions.map(city => (
                        <button key={`${city.name}-${city.stateCode}`} onClick={() => void applyCity(city)} className="w-full px-3 py-2 text-left text-sm hover:bg-muted/30">
                          {city.name}, {city.stateCode}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase mb-2">
                  <span>Distance Radius</span>
                  <span className="text-secondary">{selectedCity ? `${radiusMiles} miles` : 'Choose city'}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {RADIUS_OPTIONS.map(radius => (
                    <button key={radius} disabled={!selectedCity} onClick={() => setGeoFilter(selectedState, selectedCity, radius)} className={`px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all disabled:opacity-40 ${radiusMiles === radius ? 'bg-secondary/20 border-secondary text-secondary' : 'border-border text-muted-foreground'}`}>
                      {radius} mi
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase mb-2">Price Range</div>
                <div className="flex justify-between text-sm font-bold mb-2"><span className="text-secondary">{fmt(priceMin)}</span><span className="text-muted-foreground">—</span><span className="text-secondary">{fmt(priceMax)}</span></div>
                <input type="range" min={200000} max={2000000} step={50000} value={priceMin} onChange={e => setPriceMin(Number(e.target.value))} className="w-full mb-1" />
                <input type="range" min={200000} max={2000000} step={50000} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} className="w-full" />
              </div>

              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase mb-2">Min Bedrooms</div>
                <div className="flex gap-2 flex-wrap">
                  {[0, 1, 2, 3, 4].map(b => (
                    <button key={b} onClick={() => setMinBeds(b)} className={`px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all ${minBeds === b ? 'bg-secondary/20 border-secondary text-secondary' : 'border-border text-muted-foreground'}`}>
                      {b === 0 ? 'Any' : `${b}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase mb-2">Risk Level</div>
                <div className="flex gap-2">
                  {['All', 'Low', 'Medium'].map(r => (
                    <button key={r} onClick={() => setRiskFilter(r)} className={`px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all ${riskFilter === r ? 'bg-secondary/20 border-secondary text-secondary' : 'border-border text-muted-foreground'}`}>
                      {r === 'All' ? 'All' : `${r} Risk`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => { resetFilters(); setCityQuery(''); }} className="px-4 py-2 rounded-lg border-2 border-border font-bold text-sm hover:bg-muted/20 transition-all">Reset</button>
                <button onClick={() => setShowFilters(false)} className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-sm shadow-md transition-all">Apply</button>
              </div>
            </div>
          )}

          <div className="relative h-56 rounded-2xl border-2 border-border/50 bg-muted/20 overflow-hidden mb-4" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            {selectedCity && <div className="absolute left-1/2 top-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-secondary bg-secondary/10" />}
            {filtered.map(p => (
              <div key={p.id} onClick={() => setSelectedId(p.id)} className={`absolute w-4 h-4 rounded-full border-[3px] border-foreground cursor-pointer transition-all hover:scale-[1.35] shadow-lg ${selectedId === p.id ? 'ring-4 ring-secondary/50 scale-[1.2]' : ''} ${p.pinColor === 'good' ? 'bg-success' : p.pinColor === 'warn' ? 'bg-warning' : 'bg-destructive'}`} style={{ left: p.pin.x, top: p.pin.y, transform: 'translate(-50%, -50%)' }} title={`${p.name} · ${p.priceLabel}`} />
            ))}
            <div className="absolute left-3 bottom-3 flex gap-3 items-center bg-background/70 backdrop-blur px-3 py-1.5 rounded-full text-[11px] font-bold border border-border">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-success border-2 border-foreground" /> Low</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-warning border-2 border-foreground" /> Med</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground py-2 border-y border-border/30 mb-3 flex items-center gap-2 flex-wrap">
            <Cloud size={14} className={liveProperties.length ? 'text-success' : 'text-muted-foreground'} />
            <span>{filtered.length > 0 ? `${filtered.length} properties found` : 'No properties match your current filters.'}</span>
            {selectedCity && <span className="text-secondary flex items-center gap-1"><MapPin size={13} /> {selectedCity.name} · {radiusMiles} mi</span>}
            {listingsLoading && <span className="text-secondary">Loading RentCast...</span>}
            {listingsError && <span className="text-destructive">{listingsError}</span>}
          </div>

          <div className="space-y-3">
            {filtered.map((p, i) => <PropertyCard key={p.id} p={p} index={i} isSelected={selectedId === p.id} onClick={() => { setSelectedId(p.id); setScreen('details'); }} />)}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-lg mb-2">🔍</p>
              <p>No results. Try adjusting your filters.</p>
            </div>
          )}
        </motion.div>

        <div className="glass-panel rounded-3xl p-6 shadow-2xl lg:sticky lg:top-6">
          <h3 className="font-display text-lg font-bold mb-4">Selected Property</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: 'Signal', val: selected?.signal || '—' },
              { label: 'Risk', val: selected?.risk || '—' },
              { label: 'Growth', val: selected?.appreciation || '—' },
              { label: 'Cap Rate', val: selected ? `${selected.capRate}%` : '—' },
            ].map(k => (
              <div key={k.label} className="bg-muted/20 border-2 border-border/50 rounded-xl p-3 text-center">
                <div className="text-[10px] text-muted-foreground font-bold uppercase mb-1">{k.label}</div>
                <div className="font-display text-base font-bold">{k.val}</div>
              </div>
            ))}
          </div>
          <div className="h-px bg-border/50 mb-4" />
          {selected ? (
            <div className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{selected.name}</strong><br />
              {selected.address}<br /><br />
              {selected.description}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Click any property or map pin to preview it here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
