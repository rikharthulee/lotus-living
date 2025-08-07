"use client";

import Link from "next/link";
import { WhiteLogo } from "./Logo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NavBar() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="bg-softgreen text-white p-4 flex items-center justify-between font-heading">
      <Link href="/">
        <WhiteLogo className="h-8 w-auto" />
      </Link>
      <ul className="font-body flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        {session ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/");
                }}
              >
                Log Out
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">Log-in / Sign-Up</Link>
          </li>
        )}
        <li>
          <Link href="/listings">Listings</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

