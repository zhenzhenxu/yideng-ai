export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface CounterState {
  count: number;
}

export interface TimeState {
  currentTime: string;
}