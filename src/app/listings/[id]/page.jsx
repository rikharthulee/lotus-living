import { supabase } from "@/lib/supabase";

export default async function ListingPage({ params }) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto mt-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Listing not found</h1>
      </div>
    );
  }

  return (
    <section className="max-w-xl mx-auto mt-12 space-y-6">
      <img
        src={data.image_url}
        alt={data.title}
        className="w-full h-64 object-cover rounded"
      />

      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-gray-700">{data.description}</p>
      <p className="text-green-700 text-xl font-semibold">${data.price}</p>
    </section>
  );
}
