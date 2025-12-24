
import React, { useState } from 'react';

const Support: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const pixKey = "000.000.000-00";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-12 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="flex flex-col items-center text-center space-y-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div 
            className="relative size-32 rounded-full border-4 border-surface shadow-2xl bg-cover bg-center" 
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBdJaiMf1w1FiX-PJMbsR897a3gKWQIJN1F93tIIn7FKxWswHutOUej5KedHpsYFkJo4AZ9GqBOhkcPwAAnGynZ7my1XHXyXv9vIgcCjktS9uPc676tok9e0M-FcKcAS8nrU4WwKbCrWZq95ifAXJ70jR8pHrSAW_5wPRKa6QPF_6PFyWOsgXYLwg6N0BmoWLBUQbIitIDhcvTBfOZp6gujCfezDoKg3yVeu9LQGhcATFyT3H6kyXV9f5mv5fkTv9X2Yal2qbiCQdF")'}}
          ></div>
          <div className="absolute bottom-0 right-0 bg-primary text-background p-1.5 rounded-full border-4 border-surface flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px] font-black">verified</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-text-main">Apoie a Continuidade do RIVUS</h1>
          <p className="text-primary font-bold text-sm tracking-widest uppercase">Projeto 100% Independente</p>
        </div>
        
        <p className="text-muted text-lg leading-relaxed italic max-w-xl">
          "Olá, sou o fundador do RIVUS. Construí esta plataforma para ajudar no seu progresso pessoal, não para vender seus dados. Se esta ferramenta tem valor para você, considere apoiar."
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col justify-between gap-6 relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-7xl text-text-main">person_outline</span>
          </div>
          <div>
            <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-1">Seu Status Atual</p>
            <h3 className="text-2xl font-black text-text-main">Usuário Comum</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
            <span>Acesso básico às ferramentas</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-surface to-emerald-950/20 border border-primary/20 rounded-2xl p-8 flex flex-col justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-primary">
            <span className="material-symbols-outlined text-7xl">favorite</span>
          </div>
          <div>
            <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">Objetivo</p>
            <h3 className="text-2xl font-black text-text-main">Torne-se Apoiador</h3>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-text-main">
            <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
            <span>Ajude a manter o servidor online</span>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: 'linear-gradient(0deg, var(--surface) 0%, rgba(16, 34, 25, 0.2) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAe3H9X1yOsJ2Nwr0GPJ0q8jYiYo9KIyyasek0KD1tdN5sKbih74CX_HcIjehZHN6WlkuKKwPXjD1RMaEOliuhWzN3Mc5IMIDtVKkaxv-rBfrFth9hwtOYsBHY8LP1NKSLxKCrNVSQltR8lB67YD-QavAwbB0ezk6dwXg6oce2wiBP4SWBpJ-0yuyNkxO32jnSS9BOyyO9igNucD8ttpW0hNKFxOW-TTzasD7-K3tjA6mFMXyUmi0TpRU5JM0V5qfKzACKsl3lzhc3V")'}}>
          <h3 className="absolute bottom-6 left-8 text-2xl font-black text-text-main">Sobre o Sustento do Projeto</h3>
        </div>
        <div className="p-8 md:p-12 flex flex-col gap-8">
          <div className="space-y-4 text-muted leading-relaxed text-base">
            <p>Manter uma aplicação web segura, rápida e <span className="text-text-main font-bold">sem anúncios</span> possui custos fixos mensais de servidor, banco de dados e domínios.</p>
            <p>O RIVUS é desenvolvido com foco no seu progresso pessoal de longo prazo. Não vendemos seus dados para terceiros. Sua contribuição garante que essa filosofia continue viável.</p>
          </div>

          <div className="bg-background border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-6">
            <div className="space-y-1">
              <h4 className="text-xl font-black text-text-main">Contribua via PIX</h4>
              <p className="text-sm text-muted">Qualquer valor ajuda a manter o foco no progresso.</p>
            </div>

            <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                 <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted text-[20px]">qr_code_2</span>
                 <input 
                  type="text" 
                  value={pixKey} 
                  readOnly 
                  className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-4 text-sm font-mono text-text-main focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                 />
              </div>
              <button 
                onClick={handleCopy}
                className="bg-primary hover:bg-primary-hover text-background px-8 py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">{copied ? 'check' : 'content_copy'}</span>
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <p className="text-[10px] text-muted leading-relaxed">
              Ao contribuir, envie o comprovante para <span className="text-text-main font-bold">suporte@rivus.app</span> para receber seu badge de Apoiador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
