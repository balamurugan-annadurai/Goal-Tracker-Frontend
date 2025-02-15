"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { EditIcon, DeleteIcon } from "lucide-react";
import { useGoalStore } from "@/store/UseGoalStore";
import axiosInstance from "@/services/api.config";

interface Goal {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "not_started" | "in_progress" | "completed";
}

interface GoalItemProps {
  goal: Goal;
  onDelete: (id: string) => void;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
}

const GoalItem: React.FC<GoalItemProps> = ({
  goal,
  onDelete,
  showEditButton = true,
  showDeleteButton = true,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState<Goal>(goal);

  const updateGoal = useGoalStore((state) => state.updateGoal);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Use the axiosInstance to delete the goal from the API
      await axiosInstance.delete(`/goal/delete/${goal.id}`);
      await onDelete(goal.id); // Optional: update your state/store after deleting
    } catch (error) {
      console.error("Failed to delete goal:", error);
    }
    setIsDeleting(false);
  };

  const handleSave = async () => {
    try {
      // Use the axiosInstance to update the goal in the API
      const updatedGoal = await axiosInstance.put(`/goal//edit/${goal.id}`, editedGoal);
      updateGoal(goal.id, updatedGoal.data.goal); // Assuming updateGoal updates the state/store
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update goal:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Check if the field is a date field and format it
    let formattedValue = value;
    if (name === 'dueDate' && value) { 
      const date = new Date(value); // Assuming value is in a valid date format
      formattedValue = new Intl.DateTimeFormat('en-GB').format(date); // 'en-GB' formats it as dd/mm/yyyy
    }
  
    setEditedGoal((prevGoal) => ({
      ...prevGoal,
      [name]: formattedValue,
    }));
  };

  const statusColors = {
    not_started: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {isEditing ? (
        <div className="p-6 space-y-4">
          <input
            type="text"
            name="title"
            value={editedGoal.title}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            name="description"
            value={editedGoal.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <input
            type="date"
            name="dueDate"
            value={editedGoal.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {goal.title}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[goal.status]}`}
            >
              {goal.status.replace("_", " ")}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{goal.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-500">
              {` Due: ${goal.dueDate}`}
            </p>
            <div className="flex space-x-2">
              {showEditButton && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <EditIcon size={18} />
                </button>
              )}
              {showDeleteButton && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={`p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors ${
                    isDeleting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <DeleteIcon size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GoalItem;
