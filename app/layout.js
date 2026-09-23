import { Public_Sans, Sora } from 'next/font/google';
import Providers from './providers';
import './globals.css';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const publicSans = Public_Sans({
  variable: '--font-public-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  title: 'Ridepad',
  description: 'Rent cars from people across Lagos.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NG" className={`${sora.variable} ${publicSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
