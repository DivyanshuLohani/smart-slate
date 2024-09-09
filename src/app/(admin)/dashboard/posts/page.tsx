"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MoveHorizontalIcon } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { BlogPost } from "@/lib/types";
import { getRecentBlogs } from "@/lib/firebase/firestore";

export default function Page() {
  const { user } = useAuthContext();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  useEffect(() => {
    getRecentBlogs(user?.uid || "sdfdsf").then(setBlogs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user) return null;
  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Latest Posts</CardTitle>
          <CardDescription>
            View and manage your latest blog posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <div className="font-medium">{e.title}</div>
                  </TableCell>

                  <TableCell>
                    {Intl.DateTimeFormat("en-US").format(e.created_at)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {e.published_at === null ? "Draft" : "Published"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontalIcon className="w-4 h-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        {e.published_at === null ? (
                          <DropdownMenuItem>Publish</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>Unpublish</DropdownMenuItem>
                        )}
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
