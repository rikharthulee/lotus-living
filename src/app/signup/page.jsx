"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/dashboard"); // or maybe confirm email page?
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
      <input
        className="w-full border px-4 py-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border px-4 py-2"
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}
      <button
        className="w-full bg-black text-white py-2"
        onClick={handleSignup}
      >
        Sign Up
      </button>
      <p className="text-sm text-center">
        Already have an account?{" "}
        <a href="/login" className="underline">
          Log in
        </a>
      </p>
    </div>
  );
}
