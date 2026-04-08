import React from 'react';
import { useAppStore } from '@/store/appStore';
import LoginScreen from '@/components/LoginScreen';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import HomeScreen from '@/screens/HomeScreen';
import OnboardingScreen from '@/screens/OnboardingScreen';
import SearchScreen from '@/screens/SearchScreen';
import DetailsScreen from '@/screens/DetailsScreen';
import TrendsScreen from '@/screens/TrendsScreen';
import RiskScreen from '@/screens/RiskScreen';
import WatchlistScreen from '@/screens/WatchlistScreen';
import ReportScreen from '@/screens/ReportScreen';
import DashboardScreen from '@/screens/DashboardScreen';
import ArchitectureScreen from '@/screens/ArchitectureScreen';
import ProfileScreen from '@/screens/ProfileScreen';

const SCREENS: Record<string, React.ComponentType> = {
  home: HomeScreen,
  onboarding: OnboardingScreen,
  search: SearchScreen,
  details: DetailsScreen,
  trends: TrendsScreen,
  risk: RiskScreen,
  watchlist: WatchlistScreen,
  report: ReportScreen,
  dashboard: DashboardScreen,
  architecture: ArchitectureScreen,
  profile: ProfileScreen,
};

const EstateIQ: React.FC = () => {
  const { isLoggedIn, activeScreen } = useAppStore();

  if (!isLoggedIn) return <LoginScreen />;

  const Screen = SCREENS[activeScreen] || HomeScreen;

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-hidden">
          <Screen />
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default EstateIQ;
