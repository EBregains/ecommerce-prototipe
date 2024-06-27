import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | ODIN 3D ",
    default: "ODIN | Soluciones 3D"
  },
  description: "Compre e Imprima sus modelos 3D con la mejor calidad y al mejor precio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col justify-between`}>
        <NavBar />
        <main className="flex flex-1 flex-col bg-blue-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
