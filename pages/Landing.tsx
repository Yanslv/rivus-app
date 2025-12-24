import React from 'react';
import { AppView } from '../types';

interface LandingProps {
  onNavigate: (view: AppView) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: 'psychology',
      title: 'Roda da Vida',
      description: 'Avalie 8 áreas essenciais da sua vida e descubra onde focar seus esforços.'
    },
    {
      icon: 'task_alt',
      title: 'Tarefas SMART',
      description: 'Receba tarefas personalizadas criadas por IA para acelerar seu crescimento.'
    },
    {
      icon: 'trending_up',
      title: 'Acompanhe Evolução',
      description: 'Veja seu progresso ao longo do tempo com histórico detalhado de cada ciclo.'
    },
    {
      icon: 'auto_awesome',
      title: 'Insights de IA',
      description: 'Orientações inteligentes baseadas na sua jornada pessoal de desenvolvimento.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center relative overflow-hidden px-6 py-20">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Logo/Brand */}
          <div className="inline-flex items-center justify-center size-20 rounded-3xl bg-primary/10 border-2 border-primary/20 mb-4">
            <span className="material-symbols-outlined text-5xl text-primary">self_improvement</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black tracking-tight text-text-main">
            Transforme sua vida em
            <span className="block text-primary mt-2">movimento constante</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto leading-relaxed">
            RIVUS é sua plataforma de desenvolvimento pessoal. Avalie, planeje e evolua através da 
            <span className="text-primary font-bold"> Roda da Vida </span>
            com o poder da inteligência artificial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={() => onNavigate(AppView.LOGIN)}
              className="px-8 py-4 bg-primary hover:bg-primary-hover text-background rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Começar Jornada
            </button>
            <button
              onClick={() => onNavigate(AppView.SUPPORT)}
              className="px-8 py-4 bg-surface border-2 border-border hover:border-primary/50 text-text-main rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300"
            >
              Saiba Mais
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-surface/50 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-text-main mb-4">
              Tudo que você precisa para
              <span className="block text-primary">evoluir constantemente</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Uma plataforma completa para transformar sua vida em progresso contínuo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-3xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-3xl text-primary">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-black text-text-main mb-2">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-surface border-2 border-primary/20 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
            
            <h2 className="text-4xl md:text-5xl font-black text-text-main mb-6">
              Pronto para começar sua
              <span className="block text-primary">transformação?</span>
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              Junte-se a milhares de pessoas que estão evoluindo através da Roda da Vida
            </p>
            <button
              onClick={() => onNavigate(AppView.LOGIN)}
              className="px-10 py-5 bg-primary hover:bg-primary-hover text-background rounded-2xl font-black text-base uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-surface/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted text-sm">
            © 2024 RIVUS. Desenvolvido com <span className="text-primary">❤</span> para sua evolução contínua.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
