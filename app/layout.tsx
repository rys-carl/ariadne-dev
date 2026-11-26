import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@/shared/ui/ToastContainer";
import { appFont } from "@/shared/fonts";
import { themeInitScript } from "@/shared/lib/theme";

export const metadata: Metadata = {
  title: "Ariadne — Your guide through every quest.",
  description:
    "Turn lengthy game guides into clear, actionable instructions. Stay focused on your game and keep track of your progress.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={appFont.variable} suppressHydrationWarning>
      <head>
        {/* Applies the saved theme before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
