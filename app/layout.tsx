import { Playfair_Display, Outfit } from 'next/font/google';
import "./globals.css";

const heading = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700', '900']
});

const body = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '500', '700']
});

export const metadata = {
  title: 'Tee Nailed It | Luxury Nail Artistry Lagos',
  description: 'Lagos premier destination for BIAB, GelX, and bespoke press-on artistry.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}