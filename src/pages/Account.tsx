import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const fullname = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (register) {
        await register(fullname, email, password);
        navigate("/login");
      } else {
        setError("Registration function is not available");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800">
          Create Account
        </h1>
        <p className="mt-2 text-center text-sm sm:text-base text-gray-500">
          Join us to start shopping and track your orders
        </p>

        {error && (
          <div className="mt-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex items-center rounded-lg border bg-gray-50 px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
            <FiUser className="mr-2 text-gray-400" />
            <input
              placeholder="Username"
              name="username"
              required
              className="w-full bg-transparent outline-none text-gray-800"
            />
          </div>

          <div className="flex items-center rounded-lg border bg-gray-50 px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
            <FiMail className="mr-2 text-gray-400" />
            <input
              placeholder="Email"
              type="email"
              name="email"
              required
              className="w-full bg-transparent outline-none text-gray-800"
            />
          </div>

          <div className="flex items-center rounded-lg border bg-gray-50 px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
            <FiLock className="mr-2 text-gray-400" />
            <input
              placeholder="Password"
              type="password"
              name="password"
              required
              className="w-full bg-transparent outline-none text-gray-800"
            />
          </div>

          <div className="flex items-center rounded-lg border bg-gray-50 px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
            <FiLock className="mr-2 text-gray-400" />
            <input
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              required
              className="w-full bg-transparent outline-none text-gray-800"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-white transition hover:bg-yellow-500"
          >
            Create Account
          </button>

          <p className="mt-4 text-center text-sm sm:text-base text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-yellow-400 font-medium hover:underline"
            >
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
