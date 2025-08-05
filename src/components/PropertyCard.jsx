export default function PropertyCard({ item }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm border border-black/5">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
        <p className="text-sm opacity-80">{item.location}</p>

        <div className="flex items-center gap-3 text-sm">
          <span>{item.beds} bd</span>
          <span>•</span>
          <span>{item.baths} ba</span>
          <span>•</span>
          <span>{item.area} m²</span>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-base font-medium">
            ${item.priceUsd.toLocaleString()}
          </span>

          {/* Accent button using your soft green var so it fits the brand even without config */}
          <a
            href={`/listings/${item.id}`}
            className="px-3 py-1.5 rounded-md text-white text-sm"
            style={{ backgroundColor: "var(--color-softgreen)" }}
          >
            View
          </a>
        </div>
      </div>
    </article>
  );
}
