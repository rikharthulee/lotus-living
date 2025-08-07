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

      if (!error && data) {
        setListings(data);
      }

      setLoading(false);
    };

    fetchListings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

      {loading && <p>Loading listings...</p>}
      {!loading && listings.length === 0 && <p>No listings yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((p) => (
          <div
            key={p.id}
            className="border rounded overflow-hidden shadow-sm p-4 bg-white"
          >
            <img
              src={p.image_url}
              alt={p.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-700 mb-2">{p.description}</p>
            <p className="text-lg font-bold text-green-700">${p.price}</p>

            <Link
              href={`/listings/${p.id}`}
              className="inline-block mt-3 bg-black text-white px-4 py-2 rounded"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
