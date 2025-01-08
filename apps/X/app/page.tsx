import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session, "This is the session log");

  if (!session?.user?.id) {
    console.log("No valid session, redirecting to signin");
    redirect("/signin");
  }
  console.log("Valid session detected, redirecting to /home");
  redirect("/home");
};

export default Page;
