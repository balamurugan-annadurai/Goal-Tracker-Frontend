"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import PendingIcon from "@mui/icons-material/Pending";
import { useGoalStore } from "@/store/UseGoalStore";
import Cookies from "js-cookie";
import axiosInstance from "@/services/api.config";
import { useUserStore } from "@/store/UseUserStore";

const Panel = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const goals = useGoalStore((state) => state.goals);
console.log(goals,"tii");

  const setUser = useUserStore((state) => state.setProfile);
  const user = useUserStore((state) => state.profile);
  const pathname = usePathname();
  const setGoals = useGoalStore((state) => state.setGoals);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const isActive = (path: string) => {
    if (
      path === "/dashboard/mygoals/completed" ||
      path === "/dashboard/mygoals/notcompleted" ||
      path === "/dashboard/mygoals/all" ||
      path === "/dashboard/mygoals/notstarted"
    ) {
      return pathname.startsWith(path);
    }
    return pathname === path;
  };

  useEffect(() => {
    if (
      pathname.startsWith("/dashboard/mygoals/completed") ||
      pathname.startsWith("/dashboard/mygoals/notcompleted") ||
      pathname.startsWith("/dashboard/mygoals/all") ||
      pathname.startsWith("/dashboard/mygoals/notstarted")
    ) {
      setIsDropdownOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/user/profile");
        setUser(response.data.user);
        setGoals(response.data.user.goals);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [setGoals, setUser]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-[#1F2937] text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-2xl flex font-semibold cursor-pointer text-[#10B981]">
            Goal Tracker
          </span>
          <button onClick={toggleSidebar} className="lg:hidden">
            <CloseIcon />
          </button>
        </div>
        <nav className="mt-8 px-4">
          <Link
            href="/dashboard"
            onClick={() => setIsSidebarOpen(false)} // Close the sidebar
            className={`mb-4 flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive("/dashboard") ? "text-[#0FB880]" : ""
            }`}
          >
            <DashboardIcon className="mr-3" fontSize="small" />
            Dashboard
          </Link>
          <div className="mb-4">
            <button
              onClick={toggleDropdown}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive("/dashboard/mygoals/completed") ||
                isActive("/dashboard/mygoals/pending") ||
                isActive("/dashboard/mygoals/all") ||
                isActive("/dashboard/mygoals/notstarted")
                  ? "text-[#10B981]"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <TimelineIcon className="mr-3" fontSize="small" />
                <span>My Goals</span>
              </div>
              <ExpandMoreIcon
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fontSize="small"
              />
            </button>
            {isDropdownOpen && (
              <div className="mt-2 space-y-2 pl-11">
                <Link
                  href="/dashboard/mygoals/completed"
                  onClick={() => setIsSidebarOpen(false)} // Close the sidebar
                  className={`block rounded-md py-2 pl-3 text-sm transition-colors ${
                    isActive("/dashboard/mygoals/completed")
                      ? "text-[#0FB880]"
                      : ""
                  }`}
                >
                  <CheckCircleIcon className="mr-2" fontSize="small" />
                  Completed
                </Link>
                <Link
                  href="/dashboard/mygoals/pending"
                  onClick={() => setIsSidebarOpen(false)} // Close the sidebar
                  className={`block rounded-md py-2 pl-3 text-sm transition-colors ${
                    isActive("/dashboard/mygoals/pending")
                      ? "text-[#0FB880]"
                      : ""
                  }`}
                >
                  <PendingIcon className="mr-2" fontSize="small" />
                  Pending
                </Link>
                <Link
                  href="/dashboard/mygoals/notstarted"
                  onClick={() => setIsSidebarOpen(false)} // Close the sidebar
                  className={`block rounded-md py-2 pl-3 text-sm transition-colors ${
                    isActive("/dashboard/mygoals/notstarted")
                      ? "text-[#0FB880]"
                      : ""
                  }`}
                >
                  <CancelIcon className="mr-2" fontSize="small" />
                  Not started
                </Link>
                <Link
                  href="/dashboard/mygoals/all"
                  onClick={() => setIsSidebarOpen(false)} // Close the sidebar
                  className={`block rounded-md py-2 pl-3 text-sm transition-colors ${
                    isActive("/dashboard/mygoals/all") ? "text-[#0FB880]" : ""
                  }`}
                >
                  <OfflinePinIcon className="mr-2" fontSize="small" />
                  All
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/dashboard/creategoal"
            onClick={() => setIsSidebarOpen(false)} // Close the sidebar
            className={`mb-4 flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive("/dashboard/creategoal") ? "text-[#0FB880]" : ""
            }`}
          >
            <AddCircleIcon className="mr-3" fontSize="small" />
            Create Goal
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <header className="flex h-16 items-center justify-between bg-[#2D3748] px-4 shadow-md">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 text-gray-500 lg:hidden"
            >
              <MenuIcon />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            {true && (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <AccountCircleIcon className="mr-1 text-[#F7FAFC]" />
                  <span className="text-sm font-medium text-[#F7FAFC]">
                    {`${user?.firstName} ${user?.lastName}`}
                  </span>
                </button>
                {isProfileDropdownOpen && (
                  <>
                    <div
                      className="fixed top-0 left-0 w-full h-full"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          onClick={() => {
                            Cookies.remove("goalTrackerJwtToken");
                            router.push("/");
                            setIsProfileDropdownOpen(false);
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          role="menuitem"
                        >
                          <LogoutIcon className="mr-2" fontSize="small" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 h-[100%] bg-[#F7FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Panel;
