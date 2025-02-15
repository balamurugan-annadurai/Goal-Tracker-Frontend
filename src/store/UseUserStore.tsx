import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the types for goals based on your model
export interface Goal {
  createdDate: string; // Date string in ISO format
  description: string;
  dueDate: string; // Format: MM/DD/YY
  id: string;
  status: "pending" | "in-progress" | "completed" | "not_started";
  title: string;
}

// Define the types for user profile
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: "user"; // Only "user" for now based on your schema
  activationStatus: boolean;
  verificationString: string | null;
  expiryTime: number | undefined;
  goals: Goal[];
}

interface UserStore {
  profile: UserProfile | null; // The profile could be null initially
  setProfile: (profile: UserProfile) => void; // Function to set the user profile
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: null, // Start with no profile
      setProfile: (profile) => set({ profile }), // Set the user profile
    }),
    {
      name: "user-profile", // Key for persisting state
    }
  )
);
