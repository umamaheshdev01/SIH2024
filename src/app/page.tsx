import Link from "next/link";
import Image from "next/image";
import { PanelsTopLeft,LibraryBig } from "lucide-react";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
            <LibraryBig className="w-7 h-7 mr-3" />
            
            <span className="font-bold text-xl">Classroom</span>
            <span className="sr-only">shadcn/ui sidebar</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 bg-background"
              asChild
            >
             
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Dive Into the Learning Multiverse!
            </h1>
            <span className="max-w-[750px] text-center text-lg font-light text-foreground">
            Welcome to a classroom that's as smart as you are! Together, we'll explore new ideas, 
            solve real-world problems, and make learning an adventure.
            </span>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">

              <SignedOut>
                
            <Button variant="outline" asChild>
            <SignInButton>
                  Sign Up
                  </SignInButton>
              </Button>
             
              <Button variant="default" asChild>
              <SignUpButton>
                  Login
                  </SignUpButton>
                
              </Button>
              </SignedOut>

              <SignedIn>

              <Button variant="outline" asChild>
                <Link href={'/dashboard'}>Dive In</Link>
              </Button>

              <Button variant="default" asChild>
                <Link href={'/dashboard'}>Classes</Link>
              </Button>
                
              </SignedIn>

              
        
            </div>
          </section>
          <div className="w-full flex justify-center relative">
            <Image
              src="/placeholder.png"
              width={400}
              height={200}
              alt="demo"
              priority
              className="border rounded-xl shadow-sm dark:hidden "
              style={{ border: 'none' }}
            />
            <Image
              src="/placeholder.png"
              width={400}
              height={200}
              alt="demo-dark"
              priority
              className="border border-zinc-600 rounded-xl shadow-sm hidden dark:block dark:shadow-gray-500/5"
              style={{ border: 'none' }}
            />
            
          
          </div>
        </div>
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Ignite Your Genius!
            
          </p>
        </div>
      </footer>
    </div>
  );
}
