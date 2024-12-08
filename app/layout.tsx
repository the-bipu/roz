import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Rozum Unit 7134",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">

      <SessionProvider session={session}>
        <body
          className={`antialiased`}
        >
          {children}
          <Toaster />
        </body>

      </SessionProvider>
    </html>
  );
}
