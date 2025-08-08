"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setListings(data || []);
      setLoading(false);
    };
    fetchListings();
  }, []);

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-heading mb-4 sm:mb-6">
        Latest listings
      </h1>

      {loading ? (
        <p>Loading…</p>
      ) : listings.length === 0 ? (
        <p>No listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {listings.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-beige/60 flex flex-col"
            >
              <Link href={`/listings/${p.id}`} className="block">
                <div className="aspect-[4/3] w-full bg-beige overflow-hidden">
                  {/* swap to next/image if you want optimization */}
                  <img
                    src={p.image_url}
                    alt={p.title || "Property image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </Link>

              <div className="p-4 flex flex-col gap-2 flex-1">
                <h2 className="text-lg font-semibold leading-snug">
                  {p.title || "Untitled property"}
                </h2>

                <p className="text-sm text-darkgreen/80">
                  {p.location || "Location TBC"}
                </p>

                {p.description && (
                  <p className="text-sm text-darkgreen/80 line-clamp-3">
                    {p.description}
                  </p>
                )}

                <div className="mt-auto pt-2 flex items-center justify-between">
                  <p className="text-base sm:text-lg font-bold text-green-700">
                    {p.currency || "$"}
                    {p.price}
                    {p.rent_sale ? ` • ${p.rent_sale}` : ""}
                  </p>

                  <Link
                    href={`/listings/${p.id}`}
                    className="inline-block bg-softgreen text-white text-sm px-4 py-2 rounded hover:bg-terracotta transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
