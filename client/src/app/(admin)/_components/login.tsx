import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-card rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center">Admin Login</h2>
        <form>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
