"use client";

import Link from "next/link";
import { WhiteLogo } from "./Logo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NavBar() {
  const [session, setSession] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, s) => {
        setSession(s);
      }
    );
    return () => authListener?.subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setOpen(false);
    router.push("/");
  };

  return (
    <header className="bg-softgreen text-white sticky top-0 z-50">
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <WhiteLogo className="h-8 w-auto max-w-[140px]" />
          <span className="sr-only">Lotus Living</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 font-heading">
          <li>
            <Link href="/listings" className="hover:underline">
              Listings
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="underline">
                  Log out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" className="hover:underline">
                Members
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-white/70"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-softgreen/95 backdrop-blur">
          <ul className="px-4 pb-4 space-y-3">
            <li>
              <Link
                onClick={() => setOpen(false)}
                href="/listings"
                className="block py-2"
              >
                Listings
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setOpen(false)}
                href="/contact"
                className="block py-2"
              >
                Contact
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/dashboard"
                    className="block py-2"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 underline"
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  href="/login"
                  className="block py-2"
                >
                  Log-in / Sign-Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
