import type { Metadata } from "next";
import { IBM_Plex_Serif, Mona_Sans} from "next/font/google";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";

const ibmPlexSerif = IBM_Plex_Serif({
    variable: "--font-ibm-plex-serif",
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap'
});

const monaSans = Mona_Sans({
    variable: '--font-mona-sans',
    subsets: ['latin'],
    display: 'swap'
})

export const metadata: Metadata = {
  title: "Bookified",
  description: "Transform your books into interactive AI conversations. Upload PDFs, and chat with your books using voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Work+Sans:ital,wght@0,400;0,700;0,900;1,400&family=Caveat:wght@400..700&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
          </head>
          <body
            className={`${ibmPlexSerif.variable} ${monaSans.variable} relative font-sans antialiased`}
            suppressHydrationWarning
          >
            <header className="fixed top-0 left-0 right-0 z-[100] h-[74px] border-b border-border/40 bg-background/80 backdrop-blur-md flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                 <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center border-2 border-black rotate-3">
                   <span className="material-symbols-outlined text-on-primary" data-icon="polyline">polyline</span>
                 </div>
                 <span className="font-headline font-black text-2xl tracking-tighter uppercase">VECTOR</span>
              </div>

              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-6 py-2.5 bg-secondary-container text-on-secondary-container font-headline font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#785900] active:translate-y-1 active:shadow-none transition-all">
                      SIGN IN
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </header>
            
            <main className="pt-[74px]">
              {children}
            </main>
            <Toaster />
          </body>
        </html>
    </ClerkProvider>
  );
}
