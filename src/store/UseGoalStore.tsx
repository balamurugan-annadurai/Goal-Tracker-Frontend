import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Goal {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  createdDate: string;
  status: "not_started" | "in_progress" | "completed";
}

interface GoalStore {
  goals: Goal[];
  addGoal: (goal: Goal) => void; // Accept full Goal object
  setGoals: (goals: Goal[]) => void; // New method to set goals
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  toggleGoalStatus: (id: string) => void;
  deleteGoal: (id: string) => void;
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (goal) =>
        set((state) => ({
          goals: [
            ...state.goals,
            {
              ...goal,
              id: goal.id, // Ensure id is taken from API response
              createdDate: goal.createdDate, // Ensure createdDate is from API response
            },
          ],
        })),
        setGoals: (goals) => set({ goals }), // Set goals to store

      updateGoal: (id, updates) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          ),
        })),
      toggleGoalStatus: (id) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id
              ? {
                  ...goal,
                  status:
                    goal.status === "not_started"
                      ? "in_progress"
                      : goal.status === "in_progress"
                      ? "completed"
                      : "not_started",
                }
              : goal
          ),
        })),
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        })),
    }),
    {
      name: "goal-storage", // Key for persisting state
    }
  )
);
