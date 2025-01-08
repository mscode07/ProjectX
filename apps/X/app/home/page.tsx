"use client";

import { HomeRight, Button, CenterComp, HomeLeft } from "@/components/ui";
import { signOut } from "next-auth/react";
const homepage = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <div>
      <HomeRight />
      <CenterComp />
      <HomeLeft />
    </div>
  );
};
export default homepage;
