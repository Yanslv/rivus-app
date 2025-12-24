
import React, { useState } from 'react';
import WheelOfLife from '../components/WheelOfLife';
import { UserState, LifeArea, AppView } from '../types';
import { generateAIGuidance, generateEvolutionInsight } from '../services/aiService';
import { addHistoryEntry } from '../services/supabaseService';

interface WeeklyReviewProps {
  userState: UserState;
  updateState: (updates: Partial<UserState>) => void;
  onNavigate: (view: AppView) => void;
}

const WeeklyReview: React.FC<WeeklyReviewProps> = ({ userState, updateState, onNavigate }) => {
  const [areas, setAreas] = useState<LifeArea[]>(userState.currentWheel);
  const [loading, setLoading] = useState(false);

  const canReevaluate = userState.dailyTasks.length === 0 || userState.dailyTasks.every(t => t.completed);

  const handleScoreChange = (id: string, newScore: number) => {
    setAreas(prev => prev.map(area => area.id === id ? { ...area, score: newScore } : area));
  };

  const saveNewWheel = async () => {
    setLoading(true);
    try {
      const evolutionInsight = await generateEvolutionInsight(userState.currentWheel, areas);
      const guidance = await generateAIGuidance(areas);
      
      const newHistoryEntry = {
        date: new Date().toISOString(),
        avgScore: areas.reduce((a, b) => a + b.score, 0) / areas.length,
        wheel: JSON.parse(JSON.stringify(areas)) // Clone profundo para o histórico
      };

      // Salvar histórico no Supabase
      await addHistoryEntry(
        newHistoryEntry.date,
        newHistoryEntry.avgScore,
        newHistoryEntry.wheel
      );

      updateState({
        currentWheel: areas,
        dailyTasks: guidance.tasks,
        aiInsight: evolutionInsight, // IA comenta a evolução agora
        history: [newHistoryEntry, ...userState.history]
      });
      
      onNavigate(AppView.DAILY);
    } catch (e) {
      console.error('Error saving wheel:', e);
      alert("Erro ao calibrar evolução.");
    } finally {
      setLoading(false);
    }
  };

  const avgScore = (areas.reduce((acc, curr) => acc + curr.score, 0) / areas.length).toFixed(1);

  if (!canReevaluate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="size-24 rounded-full bg-surface-light flex items-center justify-center border-4 border-border text-muted">
          <span className="material-symbols-outlined text-5xl">lock</span>
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-3xl font-black text-text-main">Acesso Bloqueado</h2>
          <p className="text-muted text-lg">Você ainda possui tarefas SMART pendentes. A disciplina precede a evolução.</p>
        </div>
        <button onClick={() => onNavigate(AppView.DAILY)} className="px-8 py-3 bg-primary text-background rounded-xl font-black uppercase text-xs">Voltar às Tarefas</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="lg:col-span-12 space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-text-main">Reavalie sua Jornada</h1>
        <p className="text-muted text-lg max-w-2xl">Parabéns pelo ciclo concluído! Como você se sente hoje em cada pilar da sua vida?</p>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
        <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-border bg-surface-light flex justify-between items-center">
            <h3 className="font-bold text-text-main uppercase tracking-wider text-xs">Calibração de Scores</h3>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Média: {avgScore}</span>
          </div>
          <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
            {areas.map(area => (
              <div key={area.id} className="p-6 hover:bg-surface-light transition-colors group">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl flex items-center justify-center border border-border bg-background" style={{ color: area.color }}>
                      <span className="material-symbols-outlined">{area.icon}</span>
                    </div>
                    <p className="text-sm font-bold text-text-main">{area.name}</p>
                  </div>
                  <span className="text-xl font-black text-text-main">{area.score.toFixed(1)}</span>
                </div>
                <input type="range" min="0" max="10" step="0.1" value={area.score} onChange={(e) => handleScoreChange(area.id, parseFloat(e.target.value))} className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-primary" />
              </div>
            ))}
          </div>
        </div>
        <button onClick={saveNewWheel} disabled={loading} className="w-full py-6 bg-primary hover:bg-primary-hover text-background rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl disabled:opacity-50">
          {loading ? 'CALCULANDO EVOLUÇÃO...' : 'SALVAR E GERAR NOVAS METAS'}
        </button>
      </div>

      <div className="lg:col-span-5 order-1 lg:order-2">
        <div className="sticky top-24 bg-surface border border-border rounded-3xl p-8 shadow-2xl flex flex-col items-center">
          <WheelOfLife areas={areas} />
          <div className="mt-8 p-5 bg-background border border-border rounded-2xl w-full flex items-start gap-4">
             <span className="material-symbols-outlined text-primary text-[24px]">psychology</span>
             <p className="text-[11px] text-muted leading-relaxed font-medium">Sua honestidade aqui guiará a inteligência artificial para criar o plano perfeito para sua próxima semana.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReview;
