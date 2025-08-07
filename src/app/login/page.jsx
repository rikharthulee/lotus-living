"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
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
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}
      <button className="w-full bg-black text-white py-2" onClick={handleLogin}>
        Log In
      </button>
      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <a href="/signup" className="underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
