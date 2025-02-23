"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { SignedIn, UserButton } from "@clerk/nextjs";
// import SidebarMobileMenu from "./SidebarMobileMenu";

interface School {
  schoolName: string;
}

const SidebarHeader = ({ school }: { school: School }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="flex h-16 items-center gap-4 border-b px-4">
      {/* <SidebarMobileMenu /> */}
      <div className="flex-1">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm py-0 h-8 rounded-full"
        />
      </div>
      {/* <ModeToggle /> */}
      <h1 className="text-sm font-semibold text-muted-foreground">
        {school?.schoolName}
      </h1>
      <div className="rounded-full border-2 border-pink-600 border-dotted flex items-center justify-center h-10 w-10">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
export default SidebarHeader;
