"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();
      if (error) setError("Could not load listing");
      else setListing(data);
    };
    fetchListing();
  }, [id]);

  if (error) return <p className="px-4 sm:px-6 py-6">{error}</p>;
  if (!listing) return <p className="px-4 sm:px-6 py-6">Loading…</p>;

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Link href="/listings" className="text-sm underline">
        ← Back to listings
      </Link>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg overflow-hidden border border-beige/60">
          <div className="aspect-video w-full bg-beige">
            <img
              src={listing.image_url}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-heading leading-tight">
            {listing.title}
          </h1>

          <p className="text-darkgreen/80">{listing.location}</p>

          {listing.description && (
            <p className="text-base sm:text-lg">{listing.description}</p>
          )}

          <p className="text-xl sm:text-2xl font-bold text-green-700">
            {listing.currency || "$"}
            {listing.price}
            {listing.rent_sale ? ` • ${listing.rent_sale}` : ""}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            {listing.bedrooms != null && (
              <span className="inline-flex items-center rounded bg-beige px-3 py-1 text-sm">
                🛏 {listing.bedrooms} bed
              </span>
            )}
            {listing.bathrooms != null && (
              <span className="inline-flex items-center rounded bg-beige px-3 py-1 text-sm">
                🛁 {listing.bathrooms} bath
              </span>
            )}
            {listing.property_type && (
              <span className="inline-flex items-center rounded bg-beige px-3 py-1 text-sm">
                🏠 {listing.property_type}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
