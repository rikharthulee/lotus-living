"use client";

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg] = useState("");

  const handleSignup = async () => {
    console.warn("Signup not implemented yet.");
  };

  return (
    <section className="max-w-md mx-auto px-4 sm:px-6 py-10 sm:py-14 font-body">
      <h1 className="text-2xl sm:text-3xl font-heading mb-6 text-center">
        Create Account
      </h1>

      <div className="space-y-4">
        <input
          className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-softgreen"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-softgreen"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}
        <button
          onClick={handleSignup}
          className="w-full bg-softgreen text-white py-3 rounded hover:bg-terracotta transition-colors font-heading"
        >
          Sign Up
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="underline text-softgreen">
            Log in
          </a>
        </p>
      </div>
    </section>
  );
}
