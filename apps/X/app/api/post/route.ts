import { PrismaClient } from "@prisma/client";
import { authOptions } from "app/lib/auth";
import { getServerSession } from "next-auth";
//? https://github.com/code100x/cms/blob/main/src/app/api/admin/content/route.ts
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ userId: session.user.id });
}

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    console.log("Reaching in Post");
    console.log(session, "This is the user");
    console.log(session?.user.id, "This is the userID");
    console.log(session?.user, "This is the userID");

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized - User not authenticated" },
        { status: 401 }
      );
    } else {
      console.log("reaching");
    }

    const body = await req.json();
    console.log("Request Body:", body);

    if (!body || !body.content) {
      return NextResponse.json(
        { error: "content is requried" },
        { status: 400 }
      );
    }
    const userId = parseInt(session.user.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
    const { content } = body;
    const tweet = await prisma.tweet.create({
      data: { content, userID: userId },
    });
    console.log("This is the response", tweet);
    return NextResponse.json(tweet, { status: 201 });
  } catch (error) {
    console.log("Getting error in Creating", error);
  }
};
