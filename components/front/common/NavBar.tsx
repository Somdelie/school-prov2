"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";
import Logo from "../Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Bell,
  Book,
  ChevronDown,
  Code,
  DollarSign,
  Fingerprint,
  Menu,
  PieChart,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Profile {
  // Define the properties of the user object here
  firstName: string;
  lastName: string;
  email: string;
}

const features = [
  {
    icon: Book,
    title: "Student Management",
    description: "Manage student profiles, academic records, and attendance.",
    href: "use client",
  },
  {
    icon: DollarSign,
    title: "Fee Management",
    description: "Track and manage student fees, payments, and dues.",
    href: "use client",
  },
  {
    icon: PieChart,
    title: "Performance Analytics",
    description: "Analyze student performance and academic trends.",
    href: "use client",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Send important updates to students, teachers, and parents.",
    href: "use client",
  },
  {
    icon: Fingerprint,
    title: "Attendance Tracking",
    description: "Monitor daily attendance of students and staff.",
    href: "use client",
  },
  {
    icon: Code,
    title: "Teacher Management",
    description: "Manage teacher profiles, schedules, and subjects.",
    href: "use client",
  },
  {
    icon: Book,
    title: "Library Management",
    description: "Track books, issue/return status, and overdue alerts.",
    href: "use client",
  },
  {
    icon: PieChart,
    title: "Exam Management",
    description: "Organize exams, schedules, and track student results.",
    href: "use client",
  },
];

const NavBar = ({ profile }: { profile?: Profile | null }) => {
  const [open, setOpen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-[90%] mx-auto flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Logo />

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-4">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b">
                        <h4 className="text-lg font-medium">Features</h4>
                        <Link
                          href="/features"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          View all
                        </Link>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {features.map((feature, index) => (
                          <Link
                            key={index}
                            href={`/feature/${feature.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="block group"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-muted rounded-md group-hover:bg-muted/80">
                                <feature.icon className="h-6 w-6 text-blue-500" />
                              </div>
                              <div>
                                <h5 className="font-medium mb-1 group-hover:text-blue-500">
                                  {feature.title}
                                </h5>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium mb-1">Get started</h4>
                            <p className="text-sm text-muted-foreground">
                              Their food sources have decreased, and their
                              numbers
                            </p>
                          </div>
                          <Button variant="secondary">
                            <Link href="/contact-us">Get started</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {!profile && (
                  <NavigationMenuItem>
                    <Link href="/profile/create" legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        Get Started
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-4">
            {/* <ModeToggle /> */}
            <div className=" hidden gap-3 md:flex items-center">
              <Link
                href={profile ? "/schools" : "/profile/create"}
                className="bg-black hover:gap-2 transition duration-150 shadow text-white px-4 py-1 gap-1 rounded-md flex items-center"
              >
                Dashboard
                <FaPlay />
              </Link>
              {/* <Button className="bg-pink-600 hover:opacity-90 py-0 rounded hover:bg-pink-600">
              </Button> */}
              <SignedIn>
                <div className="rounded-full border-2 border-pink-600 border-dotted flex items-center justify-center h-10 w-10">
                  <UserButton />
                </div>
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="rounded-full px-4 py-1 shadow bg-sky-600 text-white font-semibold"
                >
                  Login
                </Link>
              </SignedOut>
            </div>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col py-4">
                <Link
                  href="/"
                  className="px-4 py-2 text-lg font-medium hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <button
                  className="flex items-center justify-between px-4 py-2 text-lg font-medium hover:bg-accent text-left"
                  onClick={() => setShowFeatures(!showFeatures)}
                >
                  Features
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform",
                      showFeatures && "rotate-180"
                    )}
                  />
                </button>
                {showFeatures && (
                  <div className="px-4 py-2 space-y-4">
                    {features.map((feature, index) => (
                      <Link
                        key={index}
                        href={`/feature/${feature.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="flex items-start gap-4 py-2"
                        onClick={() => setOpen(false)}
                      >
                        <div className="p-2 bg-muted rounded-md">
                          <feature.icon className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <h5 className="font-medium mb-1">{feature.title}</h5>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                <Link
                  href="/learn"
                  className="px-4 py-2 text-lg font-medium hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Learn
                </Link>
                <Link
                  href="/academy"
                  className="px-4 py-2 text-lg font-medium hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Academy
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Button>
                  <Button className="w-full" onClick={() => setOpen(false)}>
                    Book Demo
                  </Button>
                </div>
              </div>
              <Link href="/dashboard">Admin</Link>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};
export default NavBar;
