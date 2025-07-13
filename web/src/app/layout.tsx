import type { Metadata } from 'next';
import { Poppins, Rubik } from 'next/font/google';
import './globals.css';

// Configure Poppins font from Google Fonts
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap', // Ensures text is visible while font loads
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins', // CSS variable name
});

// Configure Rubik font from Google Fonts
const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik', // CSS variable name
});

export const metadata: Metadata = {
  title: 'Blott Web Assessment | Finance Digest',
  description: 'A web assessment to build a finance news digest application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply the font variables to the root <html> element
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${rubik.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
