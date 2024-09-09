"use client";
import { useAuthContext } from "@/context/AuthContext";
import BlogWrittingPage from "./writeBlog";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  if (!user) router.push("/");
  return <BlogWrittingPage />;
}
