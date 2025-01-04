import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    console.log("This is the User session >>>>>>>>>>>>>>>>>", session?.user);

    redirect("/signin");
  } else {
    redirect("/home");
  }
};

export default Page;
