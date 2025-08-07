import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata = { title: 'NoteHub' };

type RootLayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode; // додаємо modal для паралельного маршруту
};

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal} {/* Рендеримо модалку */}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}