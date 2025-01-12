"use client";

import { HomeComp } from "@/components/ui";
import { HomeIcon } from "lucide-react";
import { signOut } from "next-auth/react";
const homepage = () => {
  return (
    <div>
      <HomeComp />
    </div>
  );
};
export default homepage;
