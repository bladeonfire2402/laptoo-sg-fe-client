/* eslint-disable @next/next/no-sync-scripts */
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AppProviders } from "@/container/app-container";
import StyledComponentsRegistry from "@/lib/registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LaptopSG",
  description: "Buy and sell products online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
        <body className={inter.className}>
          <Providers>
            <AppProviders>
              {children}
            </AppProviders>
          </Providers>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
