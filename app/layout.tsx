import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://oxarc-industrial-supply.sites.openai.com'),
  title: 'OXARC | Industrial Gases, Welding & Safety Supply',
  description: 'Shop industrial gases, welding equipment, tools and safety supplies from OXARC—your single-source supplier in the Inland and Pacific Northwest.',
  openGraph: {
    title: 'OXARC Industrial Supply',
    description: 'Gases. Welding. Safety. Delivered.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OXARC Industrial Supply',
    description: 'Gases. Welding. Safety. Delivered.',
    images: ['/og.png'],
  },
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
