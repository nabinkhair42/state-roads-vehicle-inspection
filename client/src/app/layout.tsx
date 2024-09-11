import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/auth-provider";
import StoreProvider from "@/providers/store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auto Inspector - Professional Car Inspection Services",
  description:
    "Auto Inspector offers expert car inspection services with detailed reports, qualified mechanics, and a 30-day vehicle protection guarantee. Ensure a smart car purchase with our comprehensive 250+ point inspection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Toaster richColors position="bottom-right" />
        <StoreProvider>
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
