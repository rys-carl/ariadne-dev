// shared/fonts.ts — the typography spec allows Inter, Poppins or Geist.
// To switch the whole app, change `appFont` below. Nothing else needs editing:
// app/layout.tsx applies appFont.variable, and globals.css maps
// --font-app to Tailwind's font-sans.
//
// next/font self-hosts these at build time; no requests go to Google at runtime.
import { Geist, Inter, Poppins } from "next/font/google";

export const inter = Inter({
	subsets: ["latin"],
	variable: "--font-app",
	display: "swap",
});

// Not used app-wide by default, so not preloaded. Still available for the
// font comparison on /components/typography.
export const poppins = Poppins({
	subsets: ["latin"],
	// Poppins isn't a variable font, so list the weights the spec uses.
	weight: ["400", "500", "600", "700", "800", "900"],
	variable: "--font-app",
	display: "swap",
	preload: false,
});

export const geist = Geist({
	subsets: ["latin"],
	variable: "--font-app",
	display: "swap",
	preload: false,
});

export const appFont = inter;
