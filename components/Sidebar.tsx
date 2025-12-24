
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col gap-2 p-6 pb-4">{children}</div>
);

const SidebarContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-1 flex-col gap-6 overflow-hidden px-3 py-2">{children}</div>
);

const SidebarGroup: React.FC<{ label?: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    {label && (
      <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted/60">
        {label}
      </h3>
    )}
    <ul className="flex flex-col gap-1">{children}</ul>
  </div>
);

const SidebarMenuItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="list-none">{children}</li>
);

interface MenuButtonProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const SidebarMenuButton = ({ icon, label, isActive, onClick }: MenuButtonProps) => (
  <button
    onClick={onClick}
    className={`
      flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300
      ${isActive 
        ? 'bg-primary/10 text-primary shadow-[inset_0_0_20px_rgba(19,236,128,0.05)] border border-primary/20' 
        : 'text-muted hover:bg-surface-light hover:text-text-main hover:translate-x-1'
      }
    `}
  >
    <span className={`material-symbols-outlined text-[20px] ${isActive ? 'fill-1' : ''}`}>
      {icon}
    </span>
    <span className="tracking-tight">{label}</span>
  </button>
);

const SidebarFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-auto border-t border-border/50 p-4">{children}</div>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, toggleSidebar }) => {
  const mainNav = [
    { view: AppView.DAILY, label: 'Meu Fluxo', icon: 'auto_awesome' },
    { view: AppView.WEEKLY, label: 'Avaliação de Vida', icon: 'donut_large' },
    { view: AppView.HISTORY, label: 'Histórico Real', icon: 'database' },
  ];

  const secondaryNav = [
    { view: AppView.PROFILE, label: 'Meu Perfil', icon: 'person' },
    { view: AppView.SUPPORT, label: 'Apoiar Projeto', icon: 'volunteer_activism' },
  ];

  const handleNavigate = (view: AppView) => {
    onNavigate(view);
    // Fecha o sidebar no mobile após navegar
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Backdrop para Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm transition-opacity md:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-[280px] border-r border-border/40 bg-surface/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarHeader>
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary shadow-[0_0_20px_rgba(19,236,128,0.3)]">
                <svg className="size-6 text-background" fill="currentColor" viewBox="0 0 48 48">
                  <path d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" />
                </svg>
              </div>
              <h1 className="text-xl font-black tracking-tighter text-text-main">RIVUS</h1>
            </div>
            {/* Fechar no Mobile */}
            <button onClick={toggleSidebar} className="md:hidden p-2 text-muted hover:text-text-main">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup label="Plano Semanal">
            {mainNav.map((item) => (
              <SidebarMenuItem key={item.view}>
                <SidebarMenuButton
                  icon={item.icon}
                  label={item.label}
                  isActive={currentView === item.view}
                  onClick={() => handleNavigate(item.view)}
                />
              </SidebarMenuItem>
            ))}
          </SidebarGroup>

          <SidebarGroup label="Configurações">
            {secondaryNav.map((item) => (
              <SidebarMenuItem key={item.view}>
                <SidebarMenuButton
                  icon={item.icon}
                  label={item.label}
                  isActive={currentView === item.view}
                  onClick={() => handleNavigate(item.view)}
                />
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex flex-col gap-4 rounded-2xl bg-surface-light/50 p-4 border border-border/40 shadow-sm transition-all hover:bg-surface-light">
            <div className="flex items-center gap-3">
              <div 
                className="size-10 shrink-0 rounded-xl bg-cover bg-center shadow-md ring-2 ring-primary/20" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjDRJLx-B61IkQ08IrHAHt1sBi43Ebf7eKOREJS_iy7UvB-aVccz8p-9jlg6KCbQYrAO1jigbjY7tZDn--d-XTh-nNbmlRDhh1rDOelvy738v8E0qrhOQQkxscBvCfrwf1L9iXVbqomoftrCt9CZOsGWnomEFeVoObCl9lzwM304e811Juq8Aok2JadFSReHt60bCYY0e3oRXjcAqgaOTw6A0mmkHSpFNj_TyQzb3-m9UaGCDLrjFP1lBBHi0R4e0cFJtdvVggtRQh")'}}
              />
              <div className="flex flex-col overflow-hidden">
                <p className="truncate text-xs font-black text-text-main">Alex Carvalho</p>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-primary fill-1">verified</span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-primary">Membro Pro</span>
                </div>
              </div>
            </div>
            <div className="h-1 w-full rounded-full bg-border/40">
              <div className="h-full w-4/5 rounded-full bg-primary" />
            </div>
            <p className="text-[9px] font-bold text-muted text-center italic">80% da meta semanal concluída</p>
          </div>
        </SidebarFooter>
      </aside>
    </>
  );
};

export default Sidebar;
