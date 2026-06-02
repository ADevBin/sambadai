import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // ← prevents font blocking render
  preload: true,   // ← preloads font file
});

export const metadata: Metadata = {
  title: "Sambad.AI",
  description: "Your intelligent conversation hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <TRPCReactProvider>
          <NuqsAdapter>
            <Toaster />
            {children}
          </NuqsAdapter>
        </TRPCReactProvider>
      </body>
    </html>
  );
}