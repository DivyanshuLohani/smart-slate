import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="bg-background/10 shadow sticky top-0 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="rounded-full"
          />
          <Input
            type="search"
            placeholder="Search..."
            className="hidden md:inline-flex w-64"
          />
        </div>
        <nav className="hidden md:block">
          <Button variant="ghost">Sign In</Button>
          <Button>Create Account</Button>
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
