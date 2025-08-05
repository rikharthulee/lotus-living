import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-10 space-y-4 flex-grow">
      <div className="aspect-[1/1] w-32 h-32 sm:w-48 sm:h-48 lg:w-[300px] lg:h-[300px]">
        <Logo className="w-full h-full drop-shadow-md" />
      </div>

      <p className="text-darkgreen font-body text-base sm:text-lg max-w-md sm:max-w-xl">
        Your Home in Laos — Find beautiful properties and rentals with ease.
      </p>

      <a
        href="/listings"
        className="bg-softgreen text-white text-sm sm:text-base px-6 py-3 rounded-lg font-body hover:bg-terracotta transition-colors"
      >
        Search Properties
      </a>
    </section>
  );
}
