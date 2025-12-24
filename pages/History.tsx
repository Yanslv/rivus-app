
import React from 'react';
import { UserState } from '../types';

interface HistoryProps {
  userState: UserState;
}

const History: React.FC<HistoryProps> = ({ userState }) => {
  const history = userState.history;
  
  const totalWeeks = history.length;
  const avgScoreGlobal = totalWeeks > 0 
    ? (history.reduce((acc, curr) => acc + curr.avgScore, 0) / totalWeeks).toFixed(1)
    : "0.0";

  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-text-main">Histórico Real</h1>
          <p className="text-muted text-lg">Seu progresso salvo localmente através dos ciclos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-8 rounded-2xl border border-border relative overflow-hidden shadow-lg">
          <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-2">Ciclos Concluídos</p>
          <p className="text-4xl font-black tracking-tight text-text-main">{totalWeeks}</p>
        </div>
        <div className="bg-surface p-8 rounded-2xl border border-border relative overflow-hidden shadow-lg">
          <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-2">Média de Vida</p>
          <p className="text-4xl font-black tracking-tight text-primary">{avgScoreGlobal}</p>
        </div>
        <div className="bg-surface p-8 rounded-2xl border border-border relative overflow-hidden shadow-lg">
          <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-2">Consistência</p>
          <p className="text-4xl font-black tracking-tight text-text-main">100%</p>
          <p className="text-[10px] text-primary mt-2 font-bold">Baseado em tarefas SMART</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          {history.length > 0 ? (
            <table className="w-full">
              <thead className="bg-background/50 border-b border-border">
                <tr>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-muted uppercase tracking-widest">Data</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-muted uppercase tracking-widest">Score Médio</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black text-muted uppercase tracking-widest">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {history.map((item, i) => (
                  <tr key={i} className="hover:bg-surface-light transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-background border border-border flex items-center justify-center text-primary transition-colors">
                          <span className="material-symbols-outlined">history_edu</span>
                        </div>
                        <div>
                          <p className="text-sm font-black text-text-main">
                            {new Date(item.date).toLocaleDateString('pt-BR')}
                          </p>
                          <p className="text-[10px] text-muted">Ciclo #{history.length - i}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-lg font-black text-primary">{item.avgScore.toFixed(2)}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-muted group-hover:text-text-main transition-colors">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-20 text-center space-y-4">
               <span className="material-symbols-outlined text-5xl text-muted/30">database_off</span>
               <p className="text-muted font-bold italic">Nenhum histórico disponível ainda. Conclua seu primeiro ciclo!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
