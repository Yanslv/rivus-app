
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DailyView from './pages/DailyView';
import WeeklyReview from './pages/WeeklyReview';
import History from './pages/History';
import Profile from './pages/Profile';
import Support from './pages/Support';
import Onboarding from './pages/Onboarding';
import { AppView, UserState, LifeArea } from './types';

const INITIAL_AREAS: LifeArea[] = [
  { id: '1', name: 'Carreira', score: 5, icon: 'work', description: 'Trabalho e propósito profissional', color: '#3b82f6' },
  { id: '2', name: 'Saúde', score: 5, icon: 'fitness_center', description: 'Corpo e energia vital', color: '#10b981' },
  { id: '3', name: 'Finanças', score: 5, icon: 'savings', description: 'Gestão e liberdade financeira', color: '#f59e0b' },
  { id: '4', name: 'Relações', score: 5, icon: 'favorite', description: 'Social e família', color: '#ef4444' },
  { id: '5', name: 'Espiritual', score: 5, icon: 'self_improvement', description: 'Equilíbrio e conexão', color: '#8b5cf6' },
  { id: '6', name: 'Lazer', score: 5, icon: 'sports_esports', description: 'Destaque e alegria', color: '#ec4899' },
  { id: '7', name: 'Mente', score: 5, icon: 'psychology', description: 'Aprendizado contínuo', color: '#06b6d4' },
  { id: '8', name: 'Ambiente', score: 5, icon: 'home', description: 'Seu espaço físico', color: '#78350f' },
];

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('rivus-user-state');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading user state:', e);
    }
    return {
      hasCompletedOnboarding: false,
      currentWheel: INITIAL_AREAS,
      dailyTasks: [],
      aiInsight: "Sua jornada começa aqui. Avalie suas áreas para receber orientações.",
      history: []
    };
  });

  const [currentView, setCurrentView] = useState<AppView>(
    userState.hasCompletedOnboarding ? AppView.DAILY : AppView.ONBOARDING
  );
  
  // Sidebar fechado por padrão no mobile, aberto no desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  });
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return (localStorage.getItem('rivus-theme') as 'light' | 'dark') || 'dark';
      }
    } catch (e) {
      console.error('Error loading theme:', e);
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('rivus-user-state', JSON.stringify(userState));
      }
    } catch (e) {
      console.error('Error saving user state:', e);
    }
  }, [userState]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const root = window.document.documentElement;
        theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
        if (window.localStorage) {
          localStorage.setItem('rivus-theme', theme);
        }
      }
    } catch (e) {
      console.error('Error setting theme:', e);
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const updateState = (updates: Partial<UserState>) => {
    setUserState(prev => ({ ...prev, ...updates }));
  };

  const renderView = () => {
    if (!userState.hasCompletedOnboarding || currentView === AppView.ONBOARDING) {
      return <Onboarding userState={userState} updateState={updateState} onComplete={() => setCurrentView(AppView.DAILY)} />;
    }

    switch (currentView) {
      case AppView.DAILY: return <DailyView userState={userState} updateState={updateState} onNavigate={setCurrentView} />;
      case AppView.WEEKLY: return <WeeklyReview userState={userState} updateState={updateState} onNavigate={setCurrentView} />;
      case AppView.HISTORY: return <History userState={userState} />;
      case AppView.PROFILE: return <Profile userState={userState} />;
      case AppView.SUPPORT: return <Support />;
      default: return <DailyView userState={userState} updateState={updateState} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-text-main font-display">
      {userState.hasCompletedOnboarding && (
        <Sidebar 
          currentView={currentView} 
          onNavigate={setCurrentView} 
          isOpen={isSidebarOpen} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          currentView={currentView} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          theme={theme}
          toggleTheme={toggleTheme}
          hideMenu={!userState.hasCompletedOnboarding}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-900/5 dark:bg-emerald-900/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          
          <div className={`max-w-6xl mx-auto px-6 py-8 md:px-10 ${!userState.hasCompletedOnboarding ? 'flex items-center justify-center min-h-full' : ''}`}>
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
