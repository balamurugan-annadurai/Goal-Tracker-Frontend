"use client";

import type React from "react";
import { useState } from "react";
import { useGoalStore, type Goal } from "@/store/UseGoalStore";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Calendar, Clock, Edit, Trash2 } from "lucide-react"; // Import Lucide icons
import axiosInstance from "@/services/api.config"; // Import Axios instance

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(goal);
  const [isDeleting, setIsDeleting] = useState(false);
  const updateGoal = useGoalStore((state) => state.updateGoal);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);

  const goals = useGoalStore((state) => state.goals);

  console.log(goals);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Use the axiosInstance to update the goal in the API
      const updatedGoal = await axiosInstance.put(`/goal/edit/${goal.id}`, editedGoal);
      updateGoal(goal.id, updatedGoal.data.goal); // Assuming updateGoal updates the state/store
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update goal:", error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Use the axiosInstance to delete the goal from the API
      await axiosInstance.delete(`/goal/delete/${goal.id}`);
      deleteGoal(goal.id); // Update the store after deleting
    } catch (error) {
      console.error("Failed to delete goal:", error);
    }
    setIsDeleting(false);
  };

  const handleStatusChange = async () => {
    const newStatus =
      goal.status === "not_started"
        ? "in_progress"
        : goal.status === "in_progress"
        ? "completed"
        : "not_started"; // Cycle through status states

    const updatedGoal = { ...goal, status: newStatus };

    try {
      // Make the API call to update the status
      const response = await axiosInstance.put(`/goal/edit/${goal.id}`, updatedGoal);
      updateGoal(goal.id, response.data.goal); // Update the goal in the store
    } catch (error) {
      console.error("Failed to update goal status:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Check if the field is a date field and format it
    let formattedValue = value;
    if (name === "dueDate" && value) {
      const date = new Date(value); // Assuming value is in a valid date format
      formattedValue = new Intl.DateTimeFormat("en-GB").format(date); // 'en-GB' formats it as dd/mm/yyyy
    }

    setEditedGoal((prevGoal) => ({
      ...prevGoal,
      [name]: formattedValue,
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "not_started":
        return "bg-yellow-200 text-yellow-800";
      case "in_progress":
        return "bg-blue-200 text-blue-800";
      case "completed":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <Input
              name="title"
              value={editedGoal.title}
              onChange={handleChange}
              className="w-full font-bold text-xl border border-black p-2"
              placeholder="Goal Title"
            />
            <textarea
              name="description"
              value={editedGoal.description}
              onChange={handleChange}
              className="w-full  border border-black p-2"
              placeholder="Goal Description"
            />
            <Input
              type="date"
              name="dueDate"
              value={editedGoal.dueDate}
              onChange={handleChange}
              className="w-full "
            />
          </div>
        ) : (
          <>
            <h3 className="font-bold text-xl mb-2">{goal.title}</h3>
            <p className="text-gray-600 mb-4">{goal.description}</p>
          </>
        )}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">{goal.dueDate}</span>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              goal.status
            )}`}
          >
            {goal.status.replace("_", " ")}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        {isEditing ? (
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button onClick={handleStatusChange}>
                <Clock className="h-4 w-4 mr-1" />
                Change Status
              </Button>
              <Button onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
            <Button onClick={handleDelete} disabled={isDeleting}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalCard;
