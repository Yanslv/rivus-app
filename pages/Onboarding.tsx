
import React, { useState } from 'react';
import WheelOfLife from '../components/WheelOfLife';
import { UserState, LifeArea } from '../types';
import { generateAIGuidance } from '../services/aiService';

interface OnboardingProps {
  userState: UserState;
  updateState: (updates: Partial<UserState>) => void;
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ userState, updateState, onComplete }) => {
  const [areas, setAreas] = useState<LifeArea[]>(userState.currentWheel);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleScoreChange = (score: number) => {
    const newAreas = [...areas];
    newAreas[step].score = score;
    setAreas(newAreas);
  };

  const nextStep = async () => {
    if (step < areas.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const guidance = await generateAIGuidance(areas);
        updateState({
          hasCompletedOnboarding: true,
          currentWheel: areas,
          dailyTasks: guidance.tasks,
          aiInsight: guidance.insight,
          history: [{
            date: new Date().toISOString(),
            avgScore: areas.reduce((a, b) => a + b.score, 0) / areas.length,
            wheel: areas
          }]
        });
        onComplete();
      } catch (error) {
        console.error(error);
        alert("Erro ao conectar com a IA. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
  };

  const currentArea = areas[step];

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-6 text-center animate-pulse">
        <div className="size-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-2xl font-black">A IA está analisando sua vida...</h2>
        <p className="text-muted">Gerando suas primeiras tarefas SMART personalizadas.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-10">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-primary font-black uppercase tracking-widest text-xs">Passo {step + 1} de {areas.length}</p>
          <h1 className="text-4xl font-black tracking-tight">Como está sua área de <span style={{color: currentArea.color}}>{currentArea.name}</span>?</h1>
          <p className="text-muted text-lg">{currentArea.description}</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
             <span className="text-6xl font-black text-text-main">{currentArea.score}</span>
             <span className="text-muted font-bold">/ 10</span>
          </div>
          <input 
            type="range" min="0" max="10" step="0.5" 
            value={currentArea.score} 
            onChange={(e) => handleScoreChange(parseFloat(e.target.value))}
            className="w-full h-3 bg-surface-light rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] font-black text-muted uppercase tracking-tighter">
            <span>Inexistente</span>
            <span>Plenitude</span>
          </div>
        </div>

        <button 
          onClick={nextStep}
          className="w-full py-5 bg-primary text-background font-black rounded-2xl hover:scale-[1.02] transition-transform shadow-xl flex items-center justify-center gap-3"
        >
          {step === areas.length - 1 ? 'Gerar Meu Plano' : 'Próxima Área'}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      <div className="bg-surface border border-border rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 size-40 bg-primary/5 rounded-full blur-3xl"></div>
        <WheelOfLife areas={areas} />
        <div className="mt-8 flex justify-center gap-2">
          {areas.map((_, i) => (
            <div key={i} className={`size-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-primary' : 'bg-border'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
