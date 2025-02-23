"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  MessagesSquare,
  Settings,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../front/Logo";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  isChild?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Trigger */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b p-4">
            <SheetTitle asChild>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          <div className="border-b p-4">
            <Logo />
          </div>
          <SidebarContent pathname={pathname} />
        </div>
      </div>
    </>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  const slug = pathname.split("/")[2];

  const navigationItems: NavGroup[] = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: `/schools/${slug}`,
          icon: LayoutDashboard,
        },
        {
          title: "Analytics",
          href: `/schools/${slug}/analytics`,
          icon: BarChart3,
        },
        {
          title: "Calendar",
          href: `/schools/${slug}/calendar`,
          icon: Calendar,
        },
        {
          title: "Messages",
          href: `/schools/${slug}/messages`,
          icon: MessagesSquare,
        },
      ],
    },
    {
      title: "Academic",
      items: [
        {
          title: "Students",
          href: `/schools/${slug}/students`,
          icon: GraduationCap,
        },
        {
          title: "Classes",
          href: `/schools/${slug}/classes`,
          icon: LibraryBig,
        },
        {
          title: "Courses",
          href: `/schools/${slug}/courses`,
          icon: BookOpen,
        },
      ],
    },
    {
      title: "Administration",
      items: [
        {
          title: "Staff",
          href: `/schools/${slug}/staff`,
          icon: Users,
        },
        {
          title: "School Profile",
          href: `/schools/${slug}/profile`,
          icon: Building2,
        },
        {
          title: "Settings",
          href: `/schools/${slug}/settings`,
          icon: Settings,
        },
      ],
    },
    {
      title: "Schools",
      items: [
        {
          title: "Schools",
          href: "/dashboard/schools",
          icon: Building2,
        },
      ],
    },
    {
      title: "Users",
      items: [
        {
          title: "Users",
          href: "/dashboard/users",
          icon: Users,
        },
      ],
    },
    {
      title: "Messages",
      items: [
        {
          title: "Messages",
          href: "/dashboard/messages",
          icon: MessagesSquare,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {navigationItems.map((group, i) => (
            <div key={group.title} className="grid gap-1">
              <h4 className="mb-1 px-2 py-1.5 text-sm font-semibold tracking-tight">
                {group.title}
              </h4>
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
              {i < navigationItems.length - 1 && (
                <div className="my-2 border-t" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t py-2 w-full">
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Built by{" "}
          <Link
            href="https://cautiousndlovu.co.za/"
            className="underline hover:text-foreground"
          >
            Somdelie Dev
          </Link>
        </p>
      </div>
    </>
  );
}

function NavItem({ item, isActive }: { item: NavItem; isActive?: boolean }) {
  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      } ${item.isChild ? "pl-10" : ""}`}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.title}</span>
    </Link>
  );
}

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
