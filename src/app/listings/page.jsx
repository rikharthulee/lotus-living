import listings from "@/data/listings";
import PropertyCard from "@/components/PropertyCard";

export const metadata = {
  title: "Listings • Lotus Living",
  description: "Browse properties across Laos",
};

export default function ListingsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Latest Listings</h1>
        <p className="opacity-80">Beautiful homes and rentals across Laos.</p>
      </header>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((item) => (
          <PropertyCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
