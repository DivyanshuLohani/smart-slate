"use client";
import { Input } from "@/components/ui/input";
import { Menu, NotebookPenIcon, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { onAuthStateChanged, signInWithGoogle } from "@/lib/firebase/auth";
import { useEffect, useState } from "react";
import { User } from "@firebase/auth";
import UserDropDown from "./UserDropDown";
import Link from "next/link";

function useUserSession(initialUser: User | null) {
  const [user, setUser] = useState(initialUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => setUser(authUser));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (user === undefined) return;
      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        // router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}

interface NavbarProps {
  initialUser: User | null;
}

export default function Navbar({ initialUser }: NavbarProps) {
  const user = useUserSession(initialUser);
  console.log(user);
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
