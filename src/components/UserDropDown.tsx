"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Layout, LogOut, NotebookPen, Settings, User2 } from "lucide-react";
import { signOut } from "@/lib/firebase/auth";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function UserDropDown() {
  const { user } = useAuthContext();
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
          <AvatarFallback>
            <User2 />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        <DropdownMenuItem>
          <Link
            href={`/users/${user.uid}`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <User2 size={20} /> {user.displayName}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/dashboard`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Layout size={20} /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/write`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <NotebookPen size={20} /> Create a Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/settings`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Settings size={20} /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={signOut}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogOut size={20} color="red" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
