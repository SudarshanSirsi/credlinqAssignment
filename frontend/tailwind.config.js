/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // screens: {
            //
            // },
            colors: {
                primary: '#6B21A8',
                secondary: '#A855F7',
            },
        },
    },
    plugins: [],
}
