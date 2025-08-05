export default function Home() {
  return (
    <section className="bg-beige min-h-screen flex flex-col items-center justify-center text-center p-6">
      {/* Logo */}
      <img
        src="/lotus-logo.svg"
        alt="Lotus Living Logo"
        className="w-32 h-32 mb-6"
      />

      {/* Heading */}
      <h1 className="text-terracotta font-heading text-5xl mb-4">
        Lotus Living
      </h1>

      {/* Tagline */}
      <p className="text-darkgreen font-body text-lg max-w-xl mb-8">
        Your Home in Laos — Find beautiful properties and rentals with ease.
      </p>

      {/* Call-to-Action */}
      <a
        href="/listings"
        className="bg-softgreen text-white px-6 py-3 rounded-lg font-body hover:bg-terracotta transition-colors"
      >
        Search Properties
      </a>
    </section>
  );
}
