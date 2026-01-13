import type { Metadata } from "next";
import { Inter, Rubik } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider';

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
  title: "Hip-Hop Movement Foundation",
  description: "Hip-Hop Foundation, Building Bridges Through Music and Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${rubik.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
