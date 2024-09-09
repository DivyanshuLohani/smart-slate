import Link from "next/link";
import { Book, FileTextIcon, Settings, TagIcon, UsersIcon } from "lucide-react";
import UserDropDown from "@/components/UserDropDown";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr] overflow-hidden">
      <div className="flex flex-col border-r bg-muted/40">
        <div className="flex h-[60px] items-center px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <Book className="h-6 w-6" />
          </Link>
        </div>
        <nav className="flex-1 px-4 text-sm font-medium">
          <div className="grid gap-1">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:bg-muted"
              prefetch={false}
            >
              <FileTextIcon className="h-4 w-4" />
              Posts
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
              prefetch={false}
            >
              <TagIcon className="h-4 w-4" />
              Categories
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
              prefetch={false}
            >
              <UsersIcon className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
              prefetch={false}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </nav>
      </div>
      <div className="flex flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6 shadow-sm">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <UserDropDown />
        </header>
        <main className="flex-1 p-6">
          {children}
          {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Total Posts</CardTitle>
                <CardDescription>All published blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">1,234</div>
              </CardContent>
            </Card>
            <Card className="bg-accent text-accent-foreground">
              <CardHeader>
                <CardTitle>New Posts</CardTitle>
                <CardDescription>Posts published this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">67</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>All comments on blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">3,456</div>
              </CardContent>
            </Card>
            <Card className="bg-muted text-muted-foreground">
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>
                  Users who have logged in this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">789</div>
              </CardContent>
            </Card>
          </div> */}
        </main>
      </div>
    </div>
  );
}
