/** @type {import('tailwindcss').Config} */
module.exports = {
  // Look for class names within the `src` directory. This ensures Tailwind
  // generates utilities such as our custom font families defined below.
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
