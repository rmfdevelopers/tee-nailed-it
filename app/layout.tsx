import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700', '900']
});
const body = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '600']
});

export const metadata = {
  title: 'Tee Nailed It | Modern Artistry for the Lagos Woman',
  description: 'Premium nail studio specializing in Acrylic, BIAB, and bespoke custom press-ons.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans bg-[var(--primary)] text-white`}>
        {children}
      </body>
    </html>
  );
}