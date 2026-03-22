'use client';

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
    const { user } = useUser();

    return (
        <header className="w-full fixed z-50 top-0 left-0 bg-surface border-b-4 border-on-surface shadow-[4px_4px_0px_0px_rgba(0,30,46,1)]">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border-2 border-on-surface group-hover:-rotate-12 transition-transform shadow-[2px_2px_0px_0px_rgba(0,30,46,1)]">
                        <span className="material-symbols-outlined text-on-primary font-black" data-icon="architecture">architecture</span>
                    </div>
                    <span className="font-headline font-black text-2xl tracking-tighter uppercase text-on-surface">Vector</span>
                </Link>

                <nav className="flex gap-4 items-center">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="bg-secondary hover:bg-[#fdc003] text-on-secondary font-headline font-bold uppercase tracking-wider px-6 py-2 rounded-xl border-4 border-on-surface shadow-[4px_4px_0px_0px_rgba(0,30,46,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex items-center gap-4 bg-secondary-container px-4 py-2 rounded-xl border-2 border-on-surface shadow-[2px_2px_0px_0px_rgba(0,30,46,1)]">
                            <span className="font-headline font-bold text-on-surface-variant hidden md:block">
                                {user?.firstName}
                            </span>
                            <UserButton 
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10 border-2 border-on-surface shadow-[2px_2px_0px_0px_rgba(0,30,46,1)]"
                                    }
                                }}
                            />
                        </div>
                    </SignedIn>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;
