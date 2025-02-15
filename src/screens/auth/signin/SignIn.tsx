"use client";
import { EyeIcon, EyeWithLineIcon } from "@/assets/icons";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Cookies from "js-cookie"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosInstance from "@/services/api.config";
import toast from "react-hot-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    const userDetails = {
      email: data.email.trim(),
      password: data.password.trim()
  }
  setIsLoading(true);
  axiosInstance.post("/user/login", userDetails)
      .then(res => {
          setIsLoading(false);
          if (res.data.message === "Password matched") {
             
            Cookies.set("goalTrackerJwtToken", res.data.token, { expires: 1 })
            toast.success("Login successful");
            router.push("/signin")
          } else if (res?.data?.message === "User not found") {
              toast.error("User not registered");
          } else if (res?.data?.message === "User not activated") {
              toast.error("Account not activated");
          } else {
              toast.error("Incorrect password");
          }
      })
      .catch(() => {
          setIsLoading(false);
          toast.error("Login failed. Please try again later.");
      });
  };
  const router = useRouter();
  if(isLoading) return <div>Loading...</div>
  return (
    <div className="w-full h-[100%] flex justify-center items-center">
      <div className="w-[500px] flex justify-center items-center flex-col p-[30px]">
        <h2 className="mt-5  text-center text-[28px] font-semibold tracking-tight text-gray-900">
          Sign in to continue
        </h2>
        <div className="w-full mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <label
                htmlFor=""
                className="block text-[17px] font-medium text-gray-900"
              >
                Email address
              </label>
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message as string}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-[#10B981] focus:outline-none "
              />
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor=""
                  className="block text-[17px] font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                endIcon={
                  showPassword ? (
                    <EyeIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 w-[25px] h-[25px]"
                    />
                  ) : (
                    <EyeWithLineIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 w-[25px] h-[25px]"
                    />
                  )
                }
                error={errors.password?.message as string}
                className="w-full px-4 py-2  border border-gray-300 rounded-md focus:border-[#10B981] focus:outline-none "
              />
            </div>
            <Button
              className="flex mt-7 w-full p-[8px] justify-center rounded-md  text-[16px] font-semibold  text-white shadow-xs transition-colors duration-300 hover:bg-[#059669] focus-visible:outline-2 focus-visible:outline-offset-2  bg-[#10B981]"
              type="submit"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-5  text-center text-sm/6 text-gray-500">
            {`Don't have an account?`}
            <Button
              onClick={() => {
                router.push("/signup");
              }}
              className="font-semibold ml-[4px] text-[#10B981] hover:text-[#059669]"
            >
              Sign up
            </Button>
          </p>
          <p className="mt-5  text-center text-sm/6 text-gray-500">
            <Button
              onClick={() => {
                router.push("/forgot-password");
              }}
              className="font-semibold ml-[4px] text-[#10B981] hover:text-[#059669]"
            >
              Forgot Password
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
