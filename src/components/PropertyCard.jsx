export default function PropertyCard({ item }) {
  const name = item.name || item.title;
  const image = item.image_url || item.image;
  const price = item.price ?? item.priceUsd;
  const description = item.description || item.location;

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm border border-black/5">
      {image && (
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-4 space-y-2">
        {name && (
          <h3 className="text-lg font-semibold leading-snug">{name}</h3>
        )}
        {description && <p className="text-sm opacity-80">{description}</p>}

        <div className="pt-2 flex items-center justify-between">
          {price !== undefined && (
            <span className="text-base font-medium">
              ${Number(price).toLocaleString()}
            </span>
          )}
          {item.id && (
            <a
              href={`/listings/${item.id}`}
              className="px-3 py-1.5 rounded-md text-white text-sm"
              style={{ backgroundColor: "var(--color-softgreen)" }}
            >
              View
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

