
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-border pb-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-text-main">Perfil do Usuário</h1>
          <p className="text-muted text-lg">Gerencie suas informações e visualize seu progresso a longo prazo.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col items-center text-center shadow-xl">
            <div className="relative mb-6">
              <div 
                className="size-32 rounded-full border-4 border-primary/20 bg-cover bg-center shadow-2xl" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjDRJLx-B61IkQ08IrHAHt1sBi43Ebf7eKOREJS_iy7UvB-aVccz8p-9jlg6KCbQYrAO1jigbjY7tZDn--d-XTh-nNbmlRDhh1rDOelvy738v8E0qrhOQQkxscBvCfrwf1L9iXVbqomoftrCt9CZOsGWnomEFeVoObCl9lzwM304e811Juq8Aok2JadFSReHt60bCYY0e3oRXjcAqgaOTw6A0mmkHSpFNj_TyQzb3-m9UaGCDLrjFP1lBBHi0R4e0cFJtdvVggtRQh")'}}></div>
              <button className="absolute bottom-0 right-0 bg-background border border-border p-2 rounded-full text-primary hover:bg-primary hover:text-background transition-all shadow-lg">
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
            </div>
            <h2 className="text-2xl font-black text-text-main">Alex Carvalho</h2>
            <p className="text-muted text-sm font-medium mb-4">Membro desde Out de 2023</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-8">
              <span className="material-symbols-outlined text-sm">verified</span>
              Membro Ativo
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full pt-8 border-t border-border">
              <div className="flex flex-col gap-1 p-4 rounded-xl bg-background border border-border">
                <span className="text-2xl font-black text-text-main">124</span>
                <span className="text-[10px] text-muted font-bold uppercase tracking-wider">Dias</span>
              </div>
              <div className="flex flex-col gap-1 p-4 rounded-xl bg-background border border-border">
                <span className="text-2xl font-black text-text-main">85%</span>
                <span className="text-[10px] text-muted font-bold uppercase tracking-wider">Foco</span>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-4 bg-surface hover:bg-red-500/10 hover:text-red-500 text-muted rounded-xl font-bold border border-border hover:border-red-500/30 transition-all group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">logout</span>
            Sair da Conta
          </button>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-surface border border-border rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black flex items-center gap-3 text-text-main">
                <span className="material-symbols-outlined text-primary">person</span>
                Informações Pessoais
              </h3>
              <button className="text-sm font-bold text-primary hover:underline">Editar</button>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Nome Completo</label>
                <div className="p-4 bg-background border border-border rounded-xl text-text-main font-bold flex items-center gap-3">
                   <span className="material-symbols-outlined text-muted">badge</span>
                   Alex Carvalho dos Santos
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">E-mail</label>
                <div className="p-4 bg-background border border-border rounded-xl text-text-main font-bold flex items-center gap-3 justify-between">
                   <div className="flex items-center gap-3">
                     <span className="material-symbols-outlined text-muted">mail</span>
                     alex.carvalho@email.com
                   </div>
                   <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-black">VERIFICADO</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">Bio / Mantra</label>
                <div className="p-4 bg-background border border-border rounded-xl text-text-main font-medium italic text-sm flex items-start gap-3">
                   <span className="material-symbols-outlined text-muted mt-0.5">format_quote</span>
                   Focado em melhorar minha rotina matinal e alcançar consistência nos exercícios físicos para alta performance mental.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-8 shadow-xl">
            <h3 className="text-lg font-black flex items-center gap-3 mb-8 text-text-main">
              <span className="material-symbols-outlined text-primary">workspace_premium</span>
              Status da Conta
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-2xl">
              <div className="space-y-1">
                <p className="text-lg font-black text-text-main">Plano Premium</p>
                <p className="text-sm text-muted">Próxima renovação em 12 de Outubro, 2025</p>
              </div>
              <button className="px-6 py-2.5 bg-primary text-background font-black rounded-xl hover:scale-105 transition-transform">
                Gerenciar Assinatura
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
