import PropertyCard from "@/components/PropertyCard";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Listings • Lotus Living",
  description: "Browse properties across Laos",
};

export default async function ListingsPage() {
  const { data: listings, error } = await supabase
    .from("properties")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Latest Listings</h1>
        <p className="opacity-80">Beautiful homes and rentals across Laos.</p>
      </header>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings && listings.length ? (
          listings.map((item) => (
            <PropertyCard key={item.id} item={item} />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </section>
  );
}
