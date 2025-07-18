"use client";

import ClientProvider from "@/context";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <ClientProvider>
      {!isAuthPage && <Header />}
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 mt-16">{children}</main>
        <Footer />
      </div>
    </ClientProvider>
  );
}
