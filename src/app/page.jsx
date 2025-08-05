export default function Home() {
  return (
    <section className="bg-beige min-h-screen flex flex-col items-center justify-center text-center p-6">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="Lotus Living Logo"
        className="w-100 h-100 mb-0"
      />

      {/* Heading */}
      <h1 className="text-terracotta font-heading text-5xl mb-4"></h1>

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
