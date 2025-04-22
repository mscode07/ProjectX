import { PrismaClient } from "@prisma/client";
import { authOptions } from "app/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

interface EditUserInfoProp {
  username: string;
  bio: string;
  location: string;
  biolink: string;
  dob: string;
}

export const POST = async (req: NextRequest, user: EditUserInfoProp) => {
  console.log("Hitting here");
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    console.log("Request Body:", body);
    const userID = session?.user?.id;

    const updatedUser = await prisma.user.update({
      data: {
        username: user.username,
        bio: user.bio,
        location: user.location,
        bioLink: user.biolink,
        DOB: user.dob,
      },
      where: { id: userID },
    });

    console.log(updatedUser, "<<<<<<<<<<<<<<<<<<<<<<<");
    return NextResponse.json(
      { message: "Profile updated successfully", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Getting error while Updating User Profile" },
      { status: 500 }
    );
  }
};
