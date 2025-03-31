import { PrismaClient } from "@prisma/client";
import { authOptions } from "app/lib/auth";
import { getServerSession } from "next-auth";
//? https://github.com/code100x/cms/blob/main/src/app/api/admin/content/route.ts
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

//? GET Tweet
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await prisma.tweet.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      where: { IsDelete: false },
    });
    return NextResponse.json({ data: posts }, { status: 200 });
  } catch (error) {
    console.log("Error while fetching from DB", error);
  }
  return NextResponse.json({ userId: session.user.id });
}

//? POST Tweet
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized - User not authenticated" },
        { status: 401 }
      );
    }
    const sessionUserId = parseInt(session.user.id);
    const user = await prisma.user.findFirst({ where: { id: sessionUserId } });

    const body = await req.json();
    console.log("Request Body:", body);

    console.log("Checking body content...");
    if (!body || !body.content) {
      return NextResponse.json(
        { error: "content is required" },
        { status: 400 }
      );
    }
    console.log("Parsing the content...");
    const userId = parseInt(session.user.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
    const { content } = body;
    console.log("Creating tweet with userId:", userId, "and content:", content);
    const tweet = await prisma.tweet.create({
      data: { content, userID: userId },
    });
    console.log("This is the response", tweet);
    return NextResponse.json(tweet, { status: 200 });
  } catch (error) {
    console.log("Getting error in Creating", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

//? DELETE Tweet
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized - User not authenticated" },
        { status: 401 }
      );
    }
    const userDel = session?.user?.id;
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Todi ID is required" },
        { status: 400 }
      );
    }
    const tweet = await prisma.tweet.findUnique({
      where: { id: Number(id) },
    });
    if (!tweet) {
      return NextResponse.json({ message: "Tweet not found" }, { status: 404 });
    }
    if (tweet.userID !== Number(userDel)) {
      return NextResponse.json({ message: "Unauthorized" });
    }
    const tweetId = Number(id);
    const deleteTweet = await prisma.tweet.update({
      where: { id: tweetId },
      data: {
        IsDelete: true,
      },
    });
    console.log("This is the response", deleteTweet);

    return NextResponse.json({ message: "Done with delete" }, { status: 200 });
  } catch (error) {
    console.log("Getting error in Delete", error);
    return NextResponse.json(
      { message: "An unexpected error" },
      { status: 500 }
    );
  }
}
