"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGoalStore } from "@/store/UseGoalStore";
import { useForm, Controller } from "react-hook-form"; // Import React Hook Form
import EditIcon from "@mui/icons-material/Edit"; // Pencil icon
import EventIcon from "@mui/icons-material/Event"; // Calendar icon
import AssignmentIcon from "@mui/icons-material/Assignment"; // Clipboard icon
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import axiosInstance from "@/services/api.config";

const CreateGoal: React.FC = () => {
  const router = useRouter();
  const addGoal = useGoalStore((state) => state.addGoal);

  // Initialize React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  const onSubmit = async (data: any) => {
    // Ensure the dueDate is valid before formatting it
    const dueDate = new Date(data.dueDate);
    if (isNaN(dueDate.getTime())) {
      console.error("Invalid date:", data.dueDate);
      return;
    }

    // Format date to dd/mm/yy (e.g., 09/02/25)
    const formattedDate = `${("0" + dueDate.getDate()).slice(-2)}/${(
      "0" +
      (dueDate.getMonth() + 1)
    ).slice(-2)}/${dueDate.getFullYear().toString().slice(-2)}`;

    try {
      // Make API call to create the goal on the backend
      const response = await axiosInstance.post("/goal/addgoal", {
        title: data.title,
        description: data.description,
        dueDate: formattedDate,
        status: "not_started", // Default status
      });

      if (response.status === 201) {
        router.push("/dashboard/mygoals/all")
        // On success, update the frontend store and redirect
        console.log({response},'tii');
        const newGoal = response.data.goal
        addGoal({
          id: newGoal.id, // Use ID from API
          title: newGoal.title,
          description: newGoal.description,
          dueDate: newGoal.dueDate, // Already formatted
          createdDate: newGoal.createdDate, // Ensure this is set by backend
          status: newGoal.status,
        });

        // router.push("mygoals/all");
      } else {
        console.error("Failed to create goal:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  return (
    <div className="h-[100%]  flex items-center justify-center ">
      <div className="max-w-md w-full space-y-8 bg-white px-5 py-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#10B96C]">
            Create New Goal
          </h2>
          <p className="mt-2 text-center font-semibold text-sm text-[#1F2937]">
            Set your sights high and make it happen!
          </p>
        </div>
        {/* Use React Hook Form's handleSubmit method */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Title input */}
            <div>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }} // Simple validation rule
                render={({ field }) => (
                  <Input
                    {...field}
                    id="title"
                    name="title"
                    type="text"
                    className="appearance-none focus:border-[#0FB880] focus:outline-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:z-10 sm:text-sm"
                    placeholder="Goal Title"
                    startIcon={<EditIcon className="h-5 w-5 text-gray-400" />} // MUI EditIcon
                    error={errors.title?.message}
                  />
                )}
              />
            </div>

            {/* Description input */}
            <div>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }} // Validation rule
                render={({ field }) => (
                  <Input
                    {...field}
                    id="description"
                    name="description"
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none  focus:border-[#0FB880] focus:z-10 sm:text-sm"
                    placeholder="Goal Description"
                    startIcon={
                      <AssignmentIcon className="h-5 w-5 text-gray-400" />
                    } // MUI AssignmentIcon
                    error={errors.description?.message}
                  />
                )}
              />
            </div>

            {/* Due date input */}
            <div>
              <Controller
                name="dueDate"
                control={control}
                rules={{ required: "Due date is required" }} // Validation rule
                render={({ field }) => (
                  <Input
                    {...field}
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none  focus:border-[#0FB880] focus:z-10 sm:text-sm"
                    startIcon={<EventIcon className="h-5 w-5 text-gray-400" />} // MUI EventIcon
                    error={errors.dueDate?.message}
                  />
                )}
              />
            </div>
          </div>

          {/* Submit button */}
          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-[#059669] bg-[#10B981] focus:outline-none   transition duration-150 ease-in-out"
            >
              Create Goal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGoal;
