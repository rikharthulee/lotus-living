import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-10 sm:py-12 gap-5 md:gap-6 flex-grow max-w-screen-lg mx-auto">
      <div className="aspect-square w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72">
        <Logo className="w-full h-full drop-shadow-md" />
      </div>

      <p className="font-body text-base sm:text-lg md:text-xl max-w-prose px-2 sm:px-4">
        Your Home in Laos — Find beautiful properties and rentals with ease.
      </p>

      <a
        href="/listings"
        className="inline-block bg-softgreen text-white text-sm sm:text-base px-5 sm:px-6 py-3 rounded-lg font-body hover:bg-terracotta transition-colors"
      >
        Search Properties
      </a>
    </section>
  );
}
