"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { FaBed, FaBath, FaMap } from "react-icons/fa";

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

      if (error) setError("Listing not found.");
      else setListing(data);
    };

    if (id) fetchListing();
  }, [id]);

  if (error) return <p className="mt-12 text-center text-red-600">{error}</p>;
  if (!listing) return <p className="mt-12 text-center">Loading...</p>;

  return (
    <section className="max-w-xl mx-auto mt-12 space-y-6">
      <img
        src={listing.image_url}
        alt={listing.title}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <p className="text-xl font-semibold">
        <span className="flex items-center gap-2">
          <FaMap />
          {listing.location} - {listing.property_type} for {listing.rent_sale}
        </span>
      </p>
      <p className="text-xl font-semibold"></p>
      <p>{listing.description}</p>
      <p className="text-xl font-semibold text-green-600">${listing.price}</p>
      <span className="flex items-center gap-2 text-xl">
        <FaBed /> {listing.bedrooms}
      </span>
      <span className="flex items-center gap-2 text-xl">
        <FaBath /> {listing.bathrooms}
      </span>
    </section>
  );
}
