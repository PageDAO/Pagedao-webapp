/** @type {import('tailwindcss').Config} */
import * as flowbite from "flowbite-react/tailwind";


export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
    ],
    theme: {
        extend: {
            colors: {
                'dao-primary': '#c5614d',
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
            }
        },
    },
    plugins: [flowbite.plugin()],
    darkMode: 'selector',
}

