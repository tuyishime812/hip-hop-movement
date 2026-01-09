import React from 'react';
import type { Metadata } from 'next';

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
      <body className="bg-white dark:bg-gray-900">{children}</body>
    </html>
  );
}