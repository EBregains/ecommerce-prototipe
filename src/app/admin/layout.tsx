import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Icons } from "@/lib/Icons";
import { routes } from "@/lib/routes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: {
    template: "%s | ODIN 3D ",
    default: "ODIN | Admin Dashboard"
  },
  description: "Compre e Imprima sus modelos 3D con la mejor calidad y al mejor precio.",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email !== process.env.ADMIN_EMAIL) {
    return redirect("/auth/login");
  }

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col justify-between`}>
        <MaxWidthWrapper className="h-14 md:h-16 inset-x-0 text-base md:text-lg top-0 w-full bg-white transition-all">
          <div className="flex h-full items-center justify-between">
            <Link href={routes.home} className="flex hover:scale-105 transition-transform items-center z-40 font-semibold">
              <Icons.logo className="h-12 w-32 mr-2" />
            </Link>
          </div>
        </MaxWidthWrapper>
        <main className="flex flex-1 bg-sky-50">
          <AdminNav />
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}