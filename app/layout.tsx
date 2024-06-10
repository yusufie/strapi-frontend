import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import TanStackProvider from "@/providers/TanstackProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strapi Next.js Starter",
  description: "Strapi Next.js Starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <ThemeProvider 
              attribute="class" 
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              >
          <TanStackProvider>
            {children}
          </TanStackProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
