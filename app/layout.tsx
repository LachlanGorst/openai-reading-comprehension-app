import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reading Comprehension Test",
  description: "AI-powered reading comprehension testing for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
