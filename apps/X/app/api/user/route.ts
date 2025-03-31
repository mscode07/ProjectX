import { PrismaClient } from "@prisma/client";
import { authOptions } from "app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userID = session.user.id;

  try {
    const user = await prisma.user.findMany({
      include: {
        tweets: {
          where: {
            IsDelete: false,
          },
        },
      },
      where: { id: Number(userID) },
    });
    //console.log("This is the User from User Route", user);
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.log("Error while fetching from DB", error);
    return NextResponse.json({
      status: 400,
      message: "Error while fetching from DB",
    });
  }
};
