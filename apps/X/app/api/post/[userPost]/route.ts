import prisma from "@repo/db/client";
import { authOptions } from "app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log("Getting the UserID ", session?.user?.id);
    const userId = Number(session?.user?.id);

    console.log(typeof userId, "This is the type of UserID");
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userPost = await prisma.tweet.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      where: { userID: userId },
    });
    console.log(userPost, "This is the the users Tweet");
    return NextResponse.json({ data: userPost }, { status: 200 });
  } catch (error) {
    console.log("Getting Erroe while fetching user's Posts", error);
    return NextResponse.json(
      { error: "Getting error for userTweets" },
      { status: 200 }
    );
  }
}
