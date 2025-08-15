import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub — your place to create, store, and manage notes efficiently.',
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub — your place to create, store, and manage notes efficiently.',
    url: 'https://your-site.com',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://your-site.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub preview image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
