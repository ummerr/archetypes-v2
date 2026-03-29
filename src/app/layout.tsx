import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "KWML — Archetype Explorer",
  description:
    "Explore the King, Warrior, Magician, and Lover archetypes of the mature masculine psyche.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
