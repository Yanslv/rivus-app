
import React, { useState, useEffect } from 'react';
import { UserState, SMARTTask, AppView } from '../types';
import { simplifyTasks } from '../services/aiService';

interface DailyViewProps {
  userState: UserState;
  updateState: (updates: Partial<UserState>) => void;
  onNavigate: (view: AppView) => void;
}

const DAYS = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
const SUCCESS_MESSAGES = [
  "Excelente progresso! ✨",
  "Consistência é poder. 🚀",
  "Mais um passo para a plenitude. 🧘",
  "Foco inabalável! 💪",
  "Você está dominando o dia. 🔥"
];

const DailyView: React.FC<DailyViewProps> = ({ userState, updateState, onNavigate }) => {
  const [schedulingTaskId, setSchedulingTaskId] = useState<string | null>(null);
  const [tempDay, setTempDay] = useState(DAYS[0]);
  const [tempTime, setTempTime] = useState("08:00");
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [achievementToast, setAchievementToast] = useState<{show: boolean, text: string}>({ show: false, text: "" });

  const toggleTask = (id: string) => {
    const task = userState.dailyTasks.find(t => t.id === id);
    const becomingCompleted = task ? !task.completed : false;

    if (becomingCompleted) {
      const randomMsg = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
      setAchievementToast({ show: true, text: randomMsg });
    }

    const newTasks = userState.dailyTasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    updateState({ dailyTasks: newTasks });
  };

  useEffect(() => {
    if (achievementToast.show) {
      const timer = setTimeout(() => setAchievementToast({ ...achievementToast, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [achievementToast.show]);

  const handleSchedule = (id: string) => {
    const newTasks = userState.dailyTasks.map(t => 
      t.id === id ? { ...t, scheduledDay: tempDay, scheduledTime: tempTime } : t
    );
    updateState({ dailyTasks: newTasks });
    setSchedulingTaskId(null);
  };

  const handleSimplify = async () => {
    setIsSimplifying(true);
    try {
      const easyTasks = await simplifyTasks(userState.dailyTasks);
      updateState({ 
        dailyTasks: easyTasks,
        aiInsight: "Reduzi a dificuldade para o nível 'micro-hábito'. Foque apenas em começar."
      });
      setShowQuitModal(false);
    } catch (e) {
      alert("Erro ao simplificar tarefas.");
    } finally {
      setIsSimplifying(false);
    }
  };

  const handleFinalQuit = () => {
    updateState({ dailyTasks: [], aiInsight: "Você desistiu do ciclo anterior. Recomece quando estiver pronto." });
    setShowQuitModal(false);
  };

  const allTasksCompleted = userState.dailyTasks.length > 0 && userState.dailyTasks.every(t => t.completed);
  const completedCount = userState.dailyTasks.filter(t => t.completed).length;
  const dateStr = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="flex flex-col gap-10 pt-4 animate-in fade-in duration-700 relative">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-muted text-sm font-bold uppercase tracking-widest">Seu Plano de Evolução</p>
            <h1 className="text-4xl font-black text-text-main capitalize">{dateStr}</h1>
          </div>
          <div className="flex gap-3">
             {!allTasksCompleted && userState.dailyTasks.length > 0 && (
               <button 
                 onClick={() => setShowQuitModal(true)}
                 className="text-[10px] font-black uppercase text-muted hover:text-red-500 transition-colors border border-border px-3 py-1.5 rounded-lg"
               >
                 Desistir do Ciclo
               </button>
             )}
             {allTasksCompleted && (
               <div className="bg-primary/20 text-primary px-4 py-2 rounded-xl border border-primary/30 animate-bounce">
                 <p className="text-xs font-black uppercase">Ciclo Concluído! ✨</p>
               </div>
             )}
          </div>
        </div>
        
        <div className="flex items-start gap-3 bg-surface border border-border p-5 rounded-2xl shadow-sm">
           <span className="material-symbols-outlined text-primary">auto_awesome</span>
           <p className="text-text-main text-sm italic font-medium">"{userState.aiInsight}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userState.dailyTasks.length > 0 ? userState.dailyTasks.map((task) => (
          <div key={task.id} className={`group relative bg-surface border rounded-3xl p-6 transition-all duration-500 flex flex-col gap-5 ${task.completed ? 'opacity-50 grayscale border-primary/40 scale-[0.98]' : 'border-border shadow-md hover:shadow-xl hover:-translate-y-1'}`}>
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded transition-colors ${task.completed ? 'bg-primary/5 text-primary/60' : 'bg-primary/10 text-primary'}`}>
                {task.category}
              </span>
              {task.scheduledDay && (
                <button 
                  onClick={() => toggleTask(task.id)} 
                  className={`size-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${task.completed ? 'bg-primary border-primary text-background rotate-[360deg] scale-110 shadow-[0_0_15px_rgba(19,236,128,0.4)]' : 'border-border text-transparent hover:border-primary/50'}`}
                >
                  <span className="material-symbols-outlined font-black">{task.completed ? 'check' : ''}</span>
                </button>
              )}
            </div>
            <div className="space-y-2">
              <h3 className={`text-xl font-black leading-tight transition-all duration-500 ${task.completed ? 'line-through text-muted' : ''}`}>{task.title}</h3>
              <p className="text-xs text-muted leading-relaxed line-clamp-2">{task.description}</p>
            </div>
            <div className="mt-auto">
              {!task.scheduledDay ? (
                <button 
                  onClick={() => setSchedulingTaskId(task.id)}
                  className="w-full py-3 bg-text-main text-background rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Agendar para esta semana
                </button>
              ) : (
                <div className="flex items-center gap-3 text-muted">
                  <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-lg border border-border">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    <span className="text-[10px] font-bold uppercase">{task.scheduledDay.split('-')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-lg border border-border">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span className="text-[10px] font-bold">{task.scheduledTime}</span>
                  </div>
                </div>
              )}
            </div>
            {schedulingTaskId === task.id && (
              <div className="absolute inset-0 bg-surface rounded-3xl p-6 z-10 flex flex-col gap-4 border-2 border-primary shadow-2xl">
                <h4 className="font-black text-xs uppercase tracking-widest text-primary">Quando você vai agir?</h4>
                <div className="space-y-3">
                  <select 
                    value={tempDay} onChange={e => setTempDay(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl text-xs font-bold p-3 text-text-main focus:ring-primary focus:border-primary"
                  >
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <input 
                    type="time" value={tempTime} onChange={e => setTempTime(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl text-xs font-bold p-3 text-text-main focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => setSchedulingTaskId(null)} className="flex-1 py-3 text-[10px] font-black uppercase text-muted">Cancelar</button>
                  <button onClick={() => handleSchedule(task.id)} className="flex-1 py-3 bg-primary text-background rounded-xl text-[10px] font-black uppercase">Confirmar</button>
                </div>
              </div>
            )}
          </div>
        )) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl bg-surface/30">
             <span className="material-symbols-outlined text-6xl text-muted/20 mb-4">analytics</span>
             <p className="text-muted font-bold">Inicie uma nova avaliação para gerar suas metas.</p>
             <button onClick={() => onNavigate(AppView.WEEKLY)} className="mt-4 px-6 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl font-black text-xs uppercase">Começar Agora</button>
          </div>
        )}
      </div>

      {/* Floating Achievement Toast */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 pointer-events-none ${achievementToast.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90'}`}>
        <div className="bg-text-main text-background px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-primary/20 backdrop-blur-md">
          <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[20px] fill-1">stars</span>
          </div>
          <p className="text-sm font-black tracking-tight">{achievementToast.text}</p>
        </div>
      </div>

      {allTasksCompleted && (
        <div className="mt-8 bg-gradient-to-r from-primary to-emerald-600 p-1 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="bg-background rounded-[22px] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-black text-text-main tracking-tight">Evolução Liberada!</h2>
              <p className="text-muted font-medium">Você concluiu todas as metas SMART desta semana. Agora é hora de reavaliar sua Roda da Vida e subir de nível.</p>
            </div>
            <button 
              onClick={() => onNavigate(AppView.WEEKLY)}
              className="px-10 py-5 bg-primary text-background rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Iniciar Nova Avaliação
            </button>
          </div>
        </div>
      )}

      {showQuitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-surface border border-border rounded-[40px] max-w-xl w-full p-10 shadow-2xl flex flex-col items-center text-center gap-8 border-t-4 border-t-red-500/50">
            <div className="size-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <span className="material-symbols-outlined text-4xl">warning</span>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-text-main">Espere um pouco...</h2>
              <p className="text-muted text-lg leading-relaxed">
                Você já concluiu <span className="text-primary font-black">{completedCount} de {userState.dailyTasks.length}</span> tarefas. 
                Desistir agora vai resetar sua jornada.
              </p>
            </div>
            <div className="flex flex-col w-full gap-3">
              <button onClick={() => setShowQuitModal(false)} className="w-full py-5 bg-primary text-background rounded-2xl font-black text-sm uppercase tracking-widest">Continuar Firme</button>
              <button onClick={handleSimplify} disabled={isSimplifying} className="w-full py-4 bg-surface-light text-text-main border border-border rounded-2xl font-bold text-sm flex items-center justify-center gap-3">
                {isSimplifying ? <span className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span> : <span className="material-symbols-outlined text-[18px]">bolt</span>}
                Simplificar com IA
              </button>
              {/* Fix: Added missing onClick prop for handleFinalQuit */}
              <button onClick={handleFinalQuit} className="w-full py-4 text-[10px] font-black text-muted uppercase tracking-widest hover:text-red-500 transition-colors">Confirmar Desistência</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyView;
