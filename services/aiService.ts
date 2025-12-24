
import { GoogleGenAI, Type } from "@google/genai";
import { LifeArea, SMARTTask } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function generateAIGuidance(wheel: LifeArea[]): Promise<{ insight: string, tasks: SMARTTask[] }> {
  if (!ai) {
    return { 
      insight: "Configure sua API key do Gemini para receber insights personalizados.", 
      tasks: [] 
    };
  }

  const wheelData = wheel.map(a => `${a.name}: ${a.score}/10`).join(", ");
  
  const prompt = `Analise a seguinte Roda da Vida: ${wheelData}.
  1. Forneça um insight curto (max 200 caracteres) motivacional.
  2. Gere 3 tarefas diárias SMART (Específico, Mensurável, Atingível, Relevante, Temporal).
  As tarefas devem focar em melhorar as áreas com menores notas.
  Retorne APENAS JSON.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          insight: { type: Type.STRING },
          tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                category: { type: Type.STRING },
                whySmart: { type: Type.STRING }
              },
              required: ["title", "description", "category", "whySmart"]
            }
          }
        },
        required: ["insight", "tasks"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text || "{}");
    return {
      insight: result.insight || "Continue focado no seu progresso.",
      tasks: (result.tasks || []).map((t: any, i: number) => ({
        ...t,
        id: `ai-task-${Date.now()}-${i}`,
        completed: false
      }))
    };
  } catch (e) {
    return { insight: "Erro ao gerar insight.", tasks: [] };
  }
}

export async function generateEvolutionInsight(oldWheel: LifeArea[], newWheel: LifeArea[]): Promise<string> {
  if (!ai) {
    return "Configure sua API key do Gemini para receber insights sobre sua evolução.";
  }

  const oldData = oldWheel.map(a => `${a.name}: ${a.score}`).join(", ");
  const newData = newWheel.map(a => `${a.name}: ${a.score}`).join(", ");
  
  const prompt = `Compare a Roda da Vida antiga [${oldData}] com a nova [${newData}].
  O usuário acabou de completar um ciclo de tarefas SMART.
  Dê um insight profundo sobre a evolução dele, o que as mudanças nos scores refletem sobre suas ações recentes e como ele deve se portar no próximo ciclo.
  Seja elegante, direto e inspirador. Max 300 caracteres.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });

  return response.text || "Sua evolução é visível. Mantenha a constância.";
}

export async function simplifyTasks(currentTasks: SMARTTask[]): Promise<SMARTTask[]> {
  if (!ai) {
    return currentTasks;
  }

  const taskTitles = currentTasks.map(t => t.title).join(", ");
  const prompt = `Transforme estas tarefas em MICRO-AÇÕES de 2 minutos: [${taskTitles}]. Retorne JSON array.`;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            whySmart: { type: Type.STRING }
          }
        }
      }
    }
  });
  const result = JSON.parse(response.text || "[]");
  return result.map((t: any, i: number) => ({ ...t, id: currentTasks[i]?.id, completed: false }));
}
