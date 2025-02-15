"use client"
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import axiosInstance from '@/services/api.config';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showConformMsg,setShowConformMsg] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    const userDetails = {
      email: data.email.trim(),
  }

  setIsLoading(true);
  axiosInstance.post("/user/forgotpassword", userDetails).then(res => {
      setIsLoading(false);
      if (res.data.message == "User not found") {
          toast.error("User not registered"); // Notification
      }
      else if (res.data.message == "User found") {
          toast.success("Verification email sent");
          setShowConformMsg(true)
         
      }
  }).catch(err => {
      setIsLoading(false);
      toast.error("Please try again later"); // Notification
  })
  };
  if (isLoading) return <div>Loading...</div>
  if (showConformMsg) return (
    <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh" }}>
            <div className="p-6 bg-white rounded-lg shadow-md text-center max-w-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Password Reset Link Sent</h2>
                <p className="text-gray-500">
                    A password reset link has been sent to your email. Please check your inbox to reset your password.
                </p>
            </div>
        </div>
    </>

)
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[500px] flex justify-center items-center flex-col p-[30px]">
        <h2 className="mt-5  text-center text-[28px] font-semibold tracking-tight text-gray-900">
          Forgot your password?
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
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
                error={errors.email?.message as string}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-[#10B981] focus:outline-none   "
              />
            </div>

            <Button
              className="flex mt-7 w-full p-[8px] justify-center rounded-md   text-[16px] font-semibold  text-white shadow-xs transition-colors duration-300  focus-visible:outline-2 focus-visible:outline-offset-2  hover:bg-[#059669] bg-[#10B981]"
              type="submit"
            >
              Request reset link
            </Button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
