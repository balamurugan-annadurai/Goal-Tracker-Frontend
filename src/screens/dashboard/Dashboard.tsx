"use client";

import { useState, useEffect } from "react";
import { ProgressBar } from "./components/progressbar";
import { ToggleButton } from "./components/togglebutton";
import { IUserData } from "./types";
import { useGoalStore } from "@/store/UseGoalStore";
import { useUserStore } from "@/store/UseUserStore";

export default function ProfilePage() {
  const goals = useGoalStore((state) => state.goals);
  const user = useUserStore((state) => state.profile);

  const [userData, setUserData] = useState<IUserData | null>(null);

  useEffect(() => {
    if (user && goals.length > 0) {
      const { totalGoals, completedGoals, notCompletedGoals } = goals.reduce(
        (acc, goal) => {
          acc.totalGoals += 1;
          if (goal.status === "completed") {
            acc.completedGoals += 1;
          } else if (goal.status === "not_started") {
            acc.notCompletedGoals += 1;
          } else if (goal.status === "in_progress") {
            // Optionally add "in_progress" goals if needed
          }
          return acc;
        },
        { totalGoals: 0, completedGoals: 0, notCompletedGoals: 0 }
      );

      setUserData({
        username: `${user.firstName} ${user.lastName}`,
        totalGoals,
        completedGoals,
        notCompletedGoals,
        notificationsEnabled: true,
      });
    }
  }, [user, goals]); // Re-run the effect when user or goals change

  // Show loading state if data is not available

  const completionRate = userData?.totalGoals
  ? ((userData.completedGoals || 0) / userData.totalGoals) * 100
  : 0;

  const handleNotificationToggle = (checked: boolean) => {
    setUserData((prevData) => ({
      ...prevData,
      notificationsEnabled: checked,
    }));
    // In a real application, you'd update this preference in the backend
  };

  return (
    <div className="max-w-4xl cursor-pointer mx-auto bg-white rounded-[5px] overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-[#10B981] to-[#059669] p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-medium text-white">
          Welcome {userData?.username}
        </h1>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Goals" value={userData?.totalGoals || 0} />
          <StatCard title="Completed Goals" value={userData?.completedGoals || 0} />
          <StatCard
            title="Not Completed Goals"
            value={userData?.notCompletedGoals || 0}
          />
        </div>

        <div className="space-y-6">
          <ProgressBar title="Goals Completion" value={completionRate} />
        </div>

        <div className="flex items-center space-x-4">
          <ToggleButton
            id="notifications"
            checked={userData?.notificationsEnabled}
            onCheckedChange={handleNotificationToggle}
          />
          <label
            htmlFor="notifications"
            className="text-lg text-gray-700 cursor-pointer"
          >
            Notifications{" "}
            {userData?.notificationsEnabled ? "Enabled" : "Disabled"}
          </label>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg p-6 text-center transform transition-transform hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-[#10B881]">{value}</p>
    </div>
  );
}
