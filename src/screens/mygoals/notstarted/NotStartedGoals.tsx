"use client";

import type React from "react";
import { useGoalStore } from "@/store/UseGoalStore";
import { motion, AnimatePresence } from "framer-motion";
import GoalItem from "../completed/components/GoalItem";

const NotStartedGoals: React.FC = () => {
  const goals = useGoalStore((state) => state.goals);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);

  const notStartedGoals = goals.filter((goal) => goal.status === "not_started");

  const handleDelete = async (id: string) => {
    deleteGoal(id);
  };
  console.log(goals);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Not started Goals</h1>
      <AnimatePresence>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notStartedGoals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GoalItem
                goal={goal}
                onDelete={handleDelete}
                showEditButton={false}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
      {notStartedGoals.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No  goals yet. Keep working towards your objectives!
        </p>
      )}
    </div>
  );
};

export default NotStartedGoals;
