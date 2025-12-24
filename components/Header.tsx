
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  toggleSidebar: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  hideMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentView, toggleSidebar, theme, toggleTheme, hideMenu }) => {
  const getTitle = () => {
    switch (currentView) {
      case AppView.ONBOARDING: return 'Primeiros Passos';
      case AppView.DAILY: return 'Fluxo do Dia';
      case AppView.WEEKLY: return 'Avaliação Semanal';
      case AppView.HISTORY: return 'Histórico';
      case AppView.PROFILE: return 'Meu Perfil';
      case AppView.SUPPORT: return 'Apoie o RIVUS';
      default: return 'RIVUS';
    }
  };

  return (
    <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-surface/50 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4">
        {!hideMenu && (
          <button onClick={toggleSidebar} className="p-2 -ml-2 text-muted hover:text-text-main transition-colors">
            <span className="material-symbols-outlined">menu_open</span>
          </button>
        )}
        <h2 className="text-lg font-bold tracking-tight text-text-main">{getTitle()}</h2>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {!hideMenu && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-light text-primary text-xs font-bold border border-border shadow-sm">
            <span className="material-symbols-outlined text-[18px] fill-1">local_fire_department</span>
            <span>NOVO CICLO</span>
          </div>
        )}
        
        <button 
          onClick={toggleTheme}
          className="p-2 text-muted hover:text-text-main transition-all duration-300 rounded-lg hover:bg-surface-light"
          title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        >
          <span className="material-symbols-outlined">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {!hideMenu && (
          <button className="text-muted hover:text-text-main transition-colors relative p-2 rounded-lg hover:bg-surface-light">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-surface"></span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
