import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  try {
    const session = await getServerSession(authOptions);
    console.log("Full session object:", JSON.stringify(session, null, 2));

    if (!session?.user?.id) {
      console.log("No valid session, redirecting to signin");
      redirect("/signin");
    }

    console.log("Valid session detected, user:", session.user);
    redirect("/home");
  } catch (error) {
    console.error("Error in root page:", error);
    redirect("/signin");
  }
};

export default Page;
