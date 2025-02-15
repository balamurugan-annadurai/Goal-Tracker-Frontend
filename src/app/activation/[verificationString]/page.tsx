"use client"
import axiosInstance from '@/services/api.config';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Page = ({ params }: { params: Promise<{ verificationString: string }> }) => {
  const [verificationString, setVerificationString] = useState<string | null>(null);
  const [status, setStatus] = useState<boolean | null>(null); // Updated to handle loading state
  const router = useRouter();

  // Fetch the verification string when params are ready
  useEffect(() => {
    const fetchVerificationString = async () => {
      const result = await params;
      setVerificationString(result.verificationString);
    };
    
    fetchVerificationString();
  }, [params]);

  // Trigger the API request only when verificationString is available
  useEffect(() => {
    if (verificationString) {
      axiosInstance.get("/user/activateaccount", {
        headers: {
          Authorization: `Bearer ${verificationString}`,
        },
      })
        .then(res => {
          if (res.data.message === "activated" || res.data.message === "Already activated") {
            setStatus(true);
            router.push("/login");
          }
        })
        .catch(err => {
          console.error('Error during account activation:', err);
          setStatus(false); // Set status to false on error
        });
    }
  }, [verificationString, router]); // Dependency array to ensure the effect runs only when verificationString is set

  // Loading state while waiting for activation
  if (status === null) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  // Optionally handle success or error states here
  return (
    <div className="status-container">
      {status ? <p>Account activated successfully! Redirecting...</p> : <p>Error activating account.</p>}
    </div>
  );
};

export default Page;
