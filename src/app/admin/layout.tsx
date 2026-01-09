import React from 'react';
import type { Metadata } from 'next';
import { Inter, Rubik } from 'next/font/google';

// Import the same fonts as the main layout to prevent hydration mismatch
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});
const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['400', '500', '700', '900'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Admin Dashboard | Hip-Hop Foundation',
  description: 'Admin dashboard for managing the Hip-Hop Foundation website',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${rubik.variable} bg-white dark:bg-gray-900`}>{children}</body>
    </html>
  );
}