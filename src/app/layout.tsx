import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Store from '@/store';
import { DarkModeToggle } from '@/components/dark-mode-toggle';
import { ThemeProvider } from '@/components/theme-provider';
import Link from 'next/link';
import { Text } from '@/components/text';
import HamburgerMenu from '@/components/hambuger-menu';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Pokedex APP',
  description: 'A Pokedex APP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>
            <header className="sticky top-0 z-10 bg-black text-white dark:bg-white dark:text-black">
              <nav className="-px-2 container mx-auto py-3">
                <div className="flex items-center justify-between">
                  <Link href="/" className="text-2xl font-bold">
                    <Text as="h3">Pokedex App</Text>
                  </Link>
                  <div className="flex gap-2">
                    <div className="hidden space-x-4 sm:flex">
                      <Link href="/" className="flex items-center">
                        <Text>Home</Text>
                      </Link>
                      <Link href="/pokedex" className="flex items-center">
                        <Text>Pokedex</Text>
                      </Link>
                    </div>
                    <div className="block sm:hidden">
                      <div>
                        <HamburgerMenu />
                      </div>
                    </div>
                    <DarkModeToggle />
                  </div>
                </div>
              </nav>
            </header>

            <Store>{children}</Store>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
