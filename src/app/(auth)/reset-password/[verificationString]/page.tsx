"use client"
import { EyeIcon, EyeWithLineIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import axiosInstance from '@/services/api.config';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ResetPassword = ({ params }: { params: Promise<{ verificationString: string }> }) => {
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [verificationString, setVerificationString] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [linkExpired, setLinkExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchVerificationString = async () => {
      const result = await params;
      setVerificationString(result.verificationString);
    };

    fetchVerificationString();
  }, [params]);

  useEffect(() => {
    if (verificationString) {
      setIsLoading(true);
      axiosInstance
        .post('/user/verifystring', { verificationString })
        .then((res) => {
          setIsLoading(false);
          if (res?.data?.message === 'matched') {
            setVerified(true);
          } else {
            setVerified(false);
            setLinkExpired(true);
          }

          if (res?.data?.message === 'link expired') {
            setLinkExpired(true);
            toast.error('Password reset link expired');
          }
        })
        .catch(() => {
          setIsLoading(false);
          toast.error('Error verifying reset link');
        });
    }
  }, [verificationString]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (data.newPassword === data.confirmPassword) {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post('/user/changepassword', { verificationString, newPassword: data.newPassword });
        setIsLoading(false);
        if (response.data.message === 'Password changed') {
          toast.success('Password reset successfully');
          router.push('/signin');
        }
      } catch (error) {
        setIsLoading(false);
        toast.error('Failed to reset password');
      }
    } else {
      toast.error('Passwords do not match');
    }
  };

  if (isLoading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        Loading...
      </div>
    );

  if (linkExpired)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="p-6 bg-white rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Password Reset Link Expired</h2>
          <p className="text-gray-500">Your password reset link has expired. Please try again.</p>
        </div>
      </div>
    );

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[500px] flex justify-center items-center flex-col p-[30px]">
        <h2 className="mt-5 text-center text-[28px] font-semibold tracking-tight text-gray-900">Reset Your Password</h2>
        <div className="w-full mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <label htmlFor="" className="block text-[17px] font-medium text-gray-900">
                New password
              </label>
              <Input
                type={showNewPassword ? 'text' : 'password'}
                {...register('newPassword', {
                  required: 'Required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                })}
                endIcon={
                  showNewPassword ? (
                    <EyeIcon onClick={() => setNewShowPassword(!showNewPassword)} className="text-gray-400 w-[25px] h-[25px]" />
                  ) : (
                    <EyeWithLineIcon onClick={() => setNewShowPassword(!showNewPassword)} className="text-gray-400 w-[25px] h-[25px]" />
                  )
                }
                error={errors.newPassword?.message as string}
                className="w-full mb-2 mt-3 px-4 py-2  border border-gray-300 rounded-md focus:border-[#10B981] focus:outline-none"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="" className="block text-[17px] font-medium text-gray-900">
                Confirm password
              </label>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Required',
                })}
                endIcon={
                  showConfirmPassword ? (
                    <EyeIcon onClick={() => setConfirmPassword(!showConfirmPassword)} className="text-gray-400 w-[25px] h-[25px]" />
                  ) : (
                    <EyeWithLineIcon onClick={() => setConfirmPassword(!showConfirmPassword)} className="text-gray-400 w-[25px] h-[25px]" />
                  )
                }
                error={errors.confirmPassword?.message as string}
                className="w-full mb-2 mt-3 px-4 py-2  border border-gray-300 rounded-md focus:border-[#10B981] focus:outline-none"
              />
            </div>

            <Button
              className="flex mt-7 w-full p-[8px] justify-center rounded-md text-[16px] font-semibold text-white shadow-xs transition-colors duration-300 hover:bg-[#059669] bg-[#10B981] focus-visible:outline-2 focus-visible:outline-offset-2"
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
