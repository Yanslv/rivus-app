import { createClient } from '@supabase/supabase-js';
import { UserState, LifeArea, SMARTTask } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uewswowmvsrxgjaeibvn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_aAqVE3dENNeLRvE9Df0R9w_mNT2dYDt';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
interface UserProfile {
  id: string;
  user_id: string;
  has_completed_onboarding: boolean;
  ai_insight: string;
  theme: string;
  created_at: string;
  updated_at: string;
}

interface LifeAreaDB {
  id: string;
  user_id: string;
  area_id: string;
  name: string;
  score: number;
  icon: string;
  description: string;
  color: string;
  is_current: boolean;
}

interface SMARTTaskDB {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  why_smart: string;
  scheduled_day?: string;
  scheduled_time?: string;
}

interface WheelHistoryDB {
  id: string;
  user_id: string;
  date: string;
  avg_score: number;
  wheel_data: LifeArea[];
}

// Autenticação anônima (cria um usuário temporário)
export async function ensureAuthenticated(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    return user.id;
  }

  // Cria sessão anônima
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.error('Error creating anonymous session:', error);
    return null;
  }
  
  return data.user?.id || null;
}

// Carregar estado do usuário
export async function loadUserState(): Promise<UserState | null> {
  try {
    const userId = await ensureAuthenticated();
    if (!userId) return null;

    // Carregar perfil
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error loading profile:', profileError);
    }

    // Carregar áreas atuais
    const { data: areas, error: areasError } = await supabase
      .from('life_areas')
      .select('*')
      .eq('user_id', userId)
      .eq('is_current', true)
      .order('area_id');

    if (areasError) {
      console.error('Error loading areas:', areasError);
    }

    // Carregar tarefas
    const { data: tasks, error: tasksError } = await supabase
      .from('smart_tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (tasksError) {
      console.error('Error loading tasks:', tasksError);
    }

    // Carregar histórico
    const { data: history, error: historyError } = await supabase
      .from('wheel_history')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(50);

    if (historyError) {
      console.error('Error loading history:', historyError);
    }

    // Se não há dados salvos, retorna null para usar valores padrão
    if (!profile && (!areas || areas.length === 0)) {
      return null;
    }

    // Converter para UserState
    const userState: UserState = {
      hasCompletedOnboarding: profile?.has_completed_onboarding || false,
      currentWheel: (areas && areas.length > 0) ? areas.map(a => ({
        id: a.area_id,
        name: a.name,
        score: a.score,
        icon: a.icon,
        description: a.description,
        color: a.color
      })) : [],
      dailyTasks: (tasks || []).map(t => ({
        id: t.id,
        title: t.title,
        description: t.description || '',
        category: t.category || '',
        completed: t.completed,
        whySmart: t.why_smart || '',
        scheduledDay: t.scheduled_day,
        scheduledTime: t.scheduled_time
      })),
      aiInsight: profile?.ai_insight || '',
      history: (history || []).map(h => ({
        date: h.date,
        avgScore: Number(h.avg_score),
        wheel: h.wheel_data as LifeArea[]
      }))
    };

    return userState;
  } catch (error) {
    console.error('Error loading user state:', error);
    return null;
  }
}

// Salvar estado do usuário
export async function saveUserState(userState: UserState): Promise<boolean> {
  try {
    const userId = await ensureAuthenticated();
    if (!userId) return false;

    // Salvar/atualizar perfil
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        has_completed_onboarding: userState.hasCompletedOnboarding,
        ai_insight: userState.aiInsight,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (profileError) {
      console.error('Error saving profile:', profileError);
    }

    // Marcar áreas antigas como não atuais
    await supabase
      .from('life_areas')
      .update({ is_current: false })
      .eq('user_id', userId)
      .eq('is_current', true);

    // Salvar novas áreas atuais
    if (userState.currentWheel.length > 0) {
      const areasToInsert = userState.currentWheel.map(area => ({
        user_id: userId,
        area_id: area.id,
        name: area.name,
        score: area.score,
        icon: area.icon,
        description: area.description,
        color: area.color,
        is_current: true
      }));

      const { error: areasError } = await supabase
        .from('life_areas')
        .upsert(areasToInsert, {
          onConflict: 'user_id,area_id,is_current'
        });

      if (areasError) {
        console.error('Error saving areas:', areasError);
      }
    }

    // Deletar tarefas antigas e inserir novas
    await supabase
      .from('smart_tasks')
      .delete()
      .eq('user_id', userId);

    if (userState.dailyTasks.length > 0) {
      const tasksToInsert = userState.dailyTasks.map(task => ({
        user_id: userId,
        title: task.title,
        description: task.description,
        category: task.category,
        completed: task.completed,
        why_smart: task.whySmart,
        scheduled_day: task.scheduledDay,
        scheduled_time: task.scheduledTime
      }));

      const { error: tasksError } = await supabase
        .from('smart_tasks')
        .insert(tasksToInsert);

      if (tasksError) {
        console.error('Error saving tasks:', tasksError);
      }
    }

    return true;
  } catch (error) {
    console.error('Error saving user state:', error);
    return false;
  }
}

// Adicionar entrada ao histórico
export async function addHistoryEntry(
  date: string,
  avgScore: number,
  wheel: LifeArea[]
): Promise<boolean> {
  try {
    const userId = await ensureAuthenticated();
    if (!userId) return false;

    const { error } = await supabase
      .from('wheel_history')
      .insert({
        user_id: userId,
        date,
        avg_score: avgScore,
        wheel_data: wheel
      });

    if (error) {
      console.error('Error saving history:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error adding history entry:', error);
    return false;
  }
}

// Salvar tema
export async function saveTheme(theme: 'light' | 'dark'): Promise<boolean> {
  try {
    const userId = await ensureAuthenticated();
    if (!userId) return false;

    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        theme,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Error saving theme:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving theme:', error);
    return false;
  }
}

// Carregar tema
export async function loadTheme(): Promise<'light' | 'dark'> {
  try {
    const userId = await ensureAuthenticated();
    if (!userId) return 'dark';

    const { data, error } = await supabase
      .from('user_profiles')
      .select('theme')
      .eq('user_id', userId)
      .single();

    if (error || !data) return 'dark';
    return (data.theme as 'light' | 'dark') || 'dark';
  } catch (error) {
    console.error('Error loading theme:', error);
    return 'dark';
  }
}
