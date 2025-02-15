"use client";

import Link from "next/link";
import { useGoalStore } from "@/store/UseGoalStore";
import { Button } from "@/components/button";
import { Plus } from "lucide-react"; // Import Lucide's Plus icon
import GoalCard from "@/layouts/components/GoalCard";

const allGoals = () => {
  const goals = useGoalStore((state) => state.goals);
  const uncompletedGoals = goals.filter((goal) => goal.status !== "completed");
  console.log({ uncompletedGoals });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Recent Goals</h1>
        
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {uncompletedGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      {uncompletedGoals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            You don't have any active goals. Start by creating one!
          </p>
        </div>
      )}
    </div>
  );
};

export default allGoals;
