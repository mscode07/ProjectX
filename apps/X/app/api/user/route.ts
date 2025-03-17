import { PrismaClient } from "@prisma/client";
import { authOptions } from "app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  console.log("Hitting the user get rout");

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userID = session.user.id;

  try {
    console.log("Hitting the user get rout 22");
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
    console.log("This is the response", user);
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.log("Error while fetching from DB", error);
    return NextResponse.json({
      status: 400,
      message: "Error while fetching from DB",
    });
  }
};
