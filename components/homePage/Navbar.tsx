"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ModeToggle from "../toggle";
import {
  
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from "../ui/button";

export default function Navbar() {


  // Sync dark mode with <html> tag
  

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-700 dark:text-green-400">
          🌱 KrishiAI
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
        <ModeToggle/>

          {/* Sign In Button (placeholder for Clerk) */}
         <SignedOut>
              <SignInButton >
                <Button variant={"ghost"}>
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant={"secondary"}>
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
      </div>
    </nav>
  );
}
