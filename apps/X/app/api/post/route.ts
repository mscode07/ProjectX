import { PrismaClient } from "@prisma/client";
import { authOptions } from "app/lib/auth";
import { getServerSession } from "next-auth";
//? https://github.com/code100x/cms/blob/main/src/app/api/admin/content/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AiOutlineConsoleSql } from "react-icons/ai";

const prisma = new PrismaClient();

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

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    // console.log("Reaching in Post");
    // console.log(session, "This is the user");
    // console.log(session?.user.id, "This is the userID");
    // console.log(session?.user, "This is the userID");

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
interface RouteContext {
  params: {
    id: string;
  };
}
// export const DELETE = async (
//   req: NextRequest,
//   params: { param: { id: string } }
// ) => {
//   console.log(params.param.id);

//   try {
//     console.log("Hitting the Delete");
//     const tweetId = Number(params.param.id);
//     const deleteTweet = await prisma.tweet.delete({
//       where: {
//         id: tweetId,
//       },
//     });
//     console.log("Deleting the Tweet", deleteTweet);
//     return NextResponse.json({ mess: "Done with Delete", status: 200 });
//   } catch (error) {
//     console.log("Getting this error while deleting", error);
//     return NextResponse.json(
//       { error: "Failed to delete tweet" },
//       { status: 500 }
//     );
//   }
// };

export async function DELETE(req: NextRequest) {
  try {
    console.log("Hitting the delete");
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Todi ID is required" },
        { status: 400 }
      );
    }
    const deleteTweet = await prisma.tweet.delete({
      where: { id: Number(id) },
    });
    if (!deleteTweet) {
      return NextResponse.json({ message: "Tweet not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Done with delete" }, { status: 200 });
  } catch (error) {
    console.log("Getting error in Delete", error);
    return NextResponse.json(
      { message: "An unexpected error" },
      { status: 500 }
    );
  }
}
