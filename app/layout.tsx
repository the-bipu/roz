'use client';

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/userContext";

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
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
