"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { X_loaderComp } from "./X_loaderComp";

const publicPaths = ["/signin", "/login", "/error"];

export function RouteGard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const handleRouting = async () => {
      try {
        if (status === "loading") return;

        if (!session && !publicPaths.includes(pathname)) {
          console.log("No session, redirecting to signin");
          await router.replace("/signin");
          return;
        }

        if (session && publicPaths.includes(pathname)) {
          console.log("Session exists, redirecting to home");
          await router.replace("/home");
        }
      } catch (error) {
        console.error("RouteGuard error:", error);
      }
    };

    handleRouting();
  }, [session, status, router, pathname]);

  if (status == "loading") {
    return <X_loaderComp />;
  }

  return <>{children}</>;
}
