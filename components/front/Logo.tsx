import { GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center space-x-2">
      <div className="bg-pink-500 rounded-full p-1">
        <span className="text-white font-bold text-xl">
          <GraduationCap />
        </span>
      </div>
      <span className="font-bold text-xl">
        School<span className="text-pink-600">Pro</span>
      </span>
    </Link>
  );
};

export default Logo;
