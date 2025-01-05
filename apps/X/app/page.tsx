import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("No session,redirecting to SIGNIN");
    redirect("/signin");
  }
  if (session.user && session.user.id) {
    redirect("/home");
  }
  return <div>Loading......</div>;
};

export default Page;
