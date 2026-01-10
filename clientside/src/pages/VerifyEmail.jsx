import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const VerifyEmail = () => {
  const { backendUrl } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying"); 

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      toast.error("Invalid verification link");
      return;
    }

    const verifyEmail = async () => {
      try {
        await axios.get(
          `${backendUrl}/api/auth/verify-email?token=${token}`
        );

        setStatus("success");
        toast.success("Email verified successfully");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setStatus("error");
        toast.error(
          error.response?.data?.message || "Verification failed"
        );
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="border rounded-xl p-8 shadow-lg max-w-md w-full text-center">
        {status === "verifying" && (
          <>
            <h2 className="text-xl font-semibold mb-2">
              Verifying your email...
            </h2>
            <p className="text-zinc-500">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Email Verified 🎉
            </h2>
            <p className="text-zinc-500">
              Your email has been verified. Redirecting to login...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Verification Failed
            </h2>
            <p className="text-zinc-500 mb-4">
              The verification link is invalid or expired.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
