"use client";
import { signIn } from "next-auth/react";
import React from "react";

export default function Page() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl: "/about",
    });
    if (response?.ok) {
      console.log("SignIn response:", response);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h2>
        <form className="space-y-5" onSubmit={handleSubmit} method="POST">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="you@example.com"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
