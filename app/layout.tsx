import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "./components/navbar";
import { AppContextProvider } from "./contexts/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App",
  description: "App to create and manage blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppContextProvider>
        <UserProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
          </body>
        </UserProvider>
      </AppContextProvider>
    </html>
  );
}
