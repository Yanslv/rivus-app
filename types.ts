
export enum AppView {
  ONBOARDING = 'onboarding',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  HISTORY = 'history',
  PROFILE = 'profile',
  SUPPORT = 'support'
}

export interface LifeArea {
  id: string;
  name: string;
  score: number;
  icon: string;
  description: string;
  color: string;
}

export interface SMARTTask {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  whySmart: string;
  scheduledDay?: string; // Ex: 'Segunda-feira'
  scheduledTime?: string; // Ex: '08:30'
}

export interface UserState {
  hasCompletedOnboarding: boolean;
  currentWheel: LifeArea[];
  dailyTasks: SMARTTask[];
  aiInsight: string;
  history: {
    date: string;
    avgScore: number;
    wheel: LifeArea[];
  }[];
}
