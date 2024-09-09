"use client";
import { Input } from "@/components/ui/input";
import { Menu, NotebookPenIcon, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { signInWithGoogle } from "@/lib/firebase/auth";
import UserDropDown from "../UserDropDown";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const { user } = useAuthContext();
  return (
    <header className="bg-background/10 shadow sticky top-0 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
          </Link>
          <Input
            type="search"
            placeholder="Search..."
            className="hidden md:inline-flex w-64"
          />
        </div>
        <nav className="hidden md:block">
          {!user ? (
            <Button onClick={signInWithGoogle}>Sign In</Button>
          ) : (
            <div className="flex gap-3">
              <Link href="/write">
                <Button className="flex gap-2">
                  <NotebookPenIcon /> Write
                </Button>
              </Link>
              <UserDropDown user={user} />
            </div>
          )}
        </nav>
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
