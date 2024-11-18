export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: "daily" | "weekly" | "monthly";
  goal: number;
  userId: string;
  createdAt: Date;
  completedDates: Date[];
}

export interface User {
  id: string;
  email: string;
}
