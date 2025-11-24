import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import authService from "../../Api.js/auth.js";
import { Buttons, Input } from "../index.js";

function Signup() {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (data) => {
    try {
      setError("");
      setMessage("");

      const { name, email, password } = data;

      const response = await authService.create(name, email, password);

      console.log("Signup response :: ", response);

      if (response?.error) {
        setError(response.error);
      } else {
        setMessage(response.message || "Verification Link Sent On Your Mail Box");
        
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 shadow border border-black/10">
        <h2 className="text-center text-2xl font-bold">Create an Account</h2>

        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}
        {message && (
          <p className="text-green-600 mt-6 text-center">{message}</p>
        )}

        <form
          onSubmit={handleSubmit(handleSignup)}
          className="mt-8 space-y-5"
        >
          {/* Full Name */}
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", {
              required: "Full name is required",
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Email */}
          <Input
            label="Email"
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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <Buttons
            type="submit"
            className="flex items-center justify-center hover:bg-blue-500"
            ButtonsText="Signup"
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;
