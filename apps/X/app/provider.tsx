"use client";
import { SessionProvider } from "next-auth/react";

export const Provieder = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
