"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

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
    return (
      <div className="flex justify-center items-center h-screen ">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className=" w-24 h-24 fill-current text-black dark:text-white"
        >
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      </div>
    );
  }

  return <>{children}</>;
}