"use client"
import { EyeIcon, EyeWithLineIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const ResetPassword = () => {
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[500px] flex justify-center items-center flex-col p-[30px]">
        <h2 className="mt-5  text-center text-[28px] font-semibold tracking-tight text-gray-900">
          Reset your password
        </h2>
        <div className="w-full mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <label
                htmlFor=""
                className="block text-[17px] font-medium text-gray-900"
              >
                New password
              </label>
              <Input
                type={showNewPassword ? 'text' : 'password'}
                {...register('newPassword', {
                  required: 'Required',
                })}
                endIcon={
                  showNewPassword ? (
                    <EyeIcon
                      onClick={() => setNewShowPassword(!showNewPassword)}
                      className="text-gray-400 w-[25px] h-[25px]"
                    />
                  ) : (
                    <EyeWithLineIcon
                      onClick={() => setNewShowPassword(!showNewPassword)}
                      className="text-gray-400 w-[25px] h-[25px]"
                    />
                  )
                }
                error={errors.newPassword?.message as string}
                className="w-full mb-2 mt-3 px-4 py-2  border border-gray-300 rounded-md focus:border-[#10B981] focus:outline-none "
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor=""
                className="block text-[17px] font-medium text-gray-900"
              >
                Confirm password
              </label>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Required',
                })}
                endIcon={
                  showConfirmPassword ? (
                    <EyeIcon
                      onClick={() => setConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 w-[25px] h-[25px]"
                    />
                  ) : (
                    <EyeWithLineIcon
                      onClick={() => setConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 w-[25px] h-[25px]"
                    />
                  )
                }
                error={errors.confirmPassword?.message as string}
                className="w-full mb-2 mt-3 px-4 py-2  border border-gray-300 rounded-md focus:border-[#10B981] focus:outline-none "
              />
            </div>

            <Button
              className="flex mt-7 w-full p-[8px] justify-center rounded-md   text-[16px] font-semibold  text-white shadow-xs transition-colors duration-300 hover:bg-[#059669] bg-[#10B981] focus-visible:outline-2 focus-visible:outline-offset-2  "
              type="submit"
            >
              Reset password
            </Button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
