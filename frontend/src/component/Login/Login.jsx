import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import token123 from '../../key/key.js';
import authService from '../../Api.js/auth.js';
import { Buttons, Input } from '../index';
import { login as AuthLogin } from '../../store/authSlice.js';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const token = localStorage.getItem(token123);

  
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  // ▶ Show email verification message
  const verificationStatus = new URLSearchParams(location.search).get("verified");

  const handleLogin = async (data) => {
    setError("");

    try {
      const { email, password } = data;
      const response = await authService.login(email, password);

      if (response) {

        
        localStorage.setItem("userData", JSON.stringify({
          id: response.userid,
          name: response.name
        }));
        localStorage.setItem(token123, response.token);

        
        dispatch(
          AuthLogin({
            userData: {
              id: response.userid,
              name: response.name,
            },
            token: response.token,
          })
        );

        navigate('/');
      }

    } catch (error) {
      console.log("Login error:", error);
      setError(error.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Verification messages */}
        {verificationStatus === "success" && (
          <p className="text-green-600 mt-4 text-center">
            Email verified successfully! Please login.
          </p>
        )}

        {verificationStatus === "already" && (
          <p className="text-blue-600 mt-4 text-center">
            Your email is already verified.
          </p>
        )}

        {verificationStatus === "error" && (
          <p className="text-red-600 mt-4 text-center">
            Invalid or expired verification link.
          </p>
        )}

        {/* Login error */}
        {error && (
          <p className="text-red-600 mt-6 text-center">{error}</p>
        )}

        <form
          className="mt-8"
          onSubmit={handleSubmit(handleLogin, (err) => console.error("Validation error:", err))}
        >
          <div className="space-y-5">
            
            {/* Email Field */}
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />

            {/* Password Field */}
            <Input
              label="Password:"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {/* Submit Button */}
            <Buttons
              type="submit"
              className="flex items-center justify-center hover:bg-blue-400"
              ButtonsText="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
