import { create } from 'zustand';
import { Property } from '@/data/properties';
import { CityLocation } from '@/data/locations';

export type Role = 'buyer' | 'investor' | 'agent';

export interface Alert {
  id: string;
  propertyId: string;
  propertyTitle: string;
  type: 'priceChange' | 'newMatch' | 'marketShift';
  message: string;
  isRead: boolean;
}

interface AppState {
  isLoggedIn: boolean;
  user: { name: string; email: string; plan: string };
  role: Role;
  storyboard: boolean;
  guided: boolean;
  activeScreen: string;
  activeFilter: string;
  query: string;
  priceMin: number;
  priceMax: number;
  minBeds: number;
  riskFilter: string;
  selectedState: string;
  selectedCity: CityLocation | null;
  radiusMiles: number;
  liveProperties: Property[];
  listingsLoading: boolean;
  listingsError: string | null;
  selectedId: string | null;
  watchlist: string[];
  alerts: Alert[];
  budget: number;
  mustHaves: string[];
  wizStep: number;

  // Actions
  login: (role?: Role) => void;
  logout: () => void;
  setRole: (role: Role) => void;
  setScreen: (screen: string) => void;
  setFilter: (filter: string) => void;
  setQuery: (query: string) => void;
  setSelectedId: (id: string | null) => void;
  toggleWatchlist: (id: string, propertyName: string) => void;
  markAlertRead: (id: string) => void;
  markAllAlertsRead: () => void;
  setBudget: (budget: number) => void;
  toggleMustHave: (item: string) => void;
  setWizStep: (step: number) => void;
  setStoryboard: (on: boolean) => void;
  setGuided: (on: boolean) => void;
  setPriceMin: (v: number) => void;
  setPriceMax: (v: number) => void;
  setMinBeds: (v: number) => void;
  setRiskFilter: (v: string) => void;
  setGeoFilter: (state: string, city: CityLocation | null, radius: number) => void;
  setLiveProperties: (properties: Property[]) => void;
  setListingsLoading: (loading: boolean) => void;
  setListingsError: (message: string | null) => void;
  resetFilters: () => void;
  upgradePlan: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isLoggedIn: false,
  user: { name: 'Jane Doe', email: 'demo@estateiq.com', plan: 'Free' },
  role: 'buyer',
  storyboard: false,
  guided: true,
  activeScreen: 'home',
  activeFilter: 'All',
  query: '',
  priceMin: 200000,
  priceMax: 2000000,
  minBeds: 0,
  riskFilter: 'All',
  selectedState: '',
  selectedCity: null,
  radiusMiles: 25,
  liveProperties: [],
  listingsLoading: false,
  listingsError: null,
  selectedId: null,
  watchlist: [],
  alerts: [],
  budget: 850000,
  mustHaves: [],
  wizStep: 1,

  login: (role) => set({
    isLoggedIn: true,
    role: role || 'buyer',
    activeScreen: 'home',
  }),

  logout: () => set({
    isLoggedIn: false,
    watchlist: [],
    alerts: [],
    selectedId: null,
    activeScreen: 'home',
  }),

  setRole: (role) => set({ role }),
  setScreen: (screen) => set({ activeScreen: screen }),
  setFilter: (filter) => set({ activeFilter: filter }),
  setQuery: (query) => set({ query }),
  setSelectedId: (id) => set({ selectedId: id }),

  toggleWatchlist: (id, propertyName) => {
    const { watchlist, alerts } = get();
    if (watchlist.includes(id)) {
      set({
        watchlist: watchlist.filter(x => x !== id),
        alerts: alerts.filter(a => a.propertyId !== id),
      });
    } else {
      const types: Alert['type'][] = ['priceChange', 'newMatch', 'marketShift'];
      const type = types[alerts.length % 3];
      const msgs = {
        priceChange: `${propertyName} price reduced — check updated pricing.`,
        newMatch: `New comparable listing near ${propertyName}.`,
        marketShift: `${propertyName}'s area saw significant appreciation.`,
      };
      set({
        watchlist: [...watchlist, id],
        alerts: [
          { id: 'a' + Date.now(), propertyId: id, propertyTitle: propertyName, type, message: msgs[type], isRead: false },
          ...alerts,
        ],
      });
    }
  },

  markAlertRead: (id) => set(s => ({
    alerts: s.alerts.map(a => a.id === id ? { ...a, isRead: true } : a),
  })),

  markAllAlertsRead: () => set(s => ({
    alerts: s.alerts.map(a => ({ ...a, isRead: true })),
  })),

  setBudget: (budget) => set({ budget }),
  toggleMustHave: (item) => set(s => ({
    mustHaves: s.mustHaves.includes(item)
      ? s.mustHaves.filter(x => x !== item)
      : [...s.mustHaves, item],
  })),
  setWizStep: (step) => set({ wizStep: Math.max(1, Math.min(3, step)) }),
  setStoryboard: (on) => set({ storyboard: on }),
  setGuided: (on) => set({ guided: on }),
  setPriceMin: (v) => set({ priceMin: v }),
  setPriceMax: (v) => set({ priceMax: v }),
  setMinBeds: (v) => set({ minBeds: v }),
  setRiskFilter: (v) => set({ riskFilter: v }),
  setGeoFilter: (selectedState, selectedCity, radiusMiles) => set({ selectedState, selectedCity, radiusMiles }),
  setLiveProperties: (liveProperties) => set({ liveProperties }),
  setListingsLoading: (listingsLoading) => set({ listingsLoading }),
  setListingsError: (listingsError) => set({ listingsError }),
  resetFilters: () => set({
    priceMin: 200000,
    priceMax: 2000000,
    minBeds: 0,
    riskFilter: 'All',
    selectedState: '',
    selectedCity: null,
    radiusMiles: 25,
  }),
  upgradePlan: () => set(s => ({ user: { ...s.user, plan: 'Pro' } })),
}));
