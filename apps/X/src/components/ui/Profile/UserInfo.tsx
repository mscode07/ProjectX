"use client";

import { LoaderComp } from "@/components/LoaderComp";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { IoCalendarOutline } from "react-icons/io5";
import { PiBalloon } from "react-icons/pi";
import { TweetComp } from "../TweetComp";
import { EditProfileComp } from "./EditProfileComp";
interface UserDataProps {
  DOB: string;
  location: string;
  createdDate: string;
  bio: string;
  username: string;
  biolink: string;
}
interface Tweet {
  id: number;
  content: string;
  userID: number;
  likes: number;
  createdDate: string;
  user: { name: string };
}
export const UserInfo = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserDataProps[] | null>(null);
  const [userTweet, setUserTweet] = useState<Tweet[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("api/user");
        const u_Data = response.data.data;
        if (Array.isArray(u_Data) && response.data.data.length > 0) {
          setUserData(u_Data);
          // console.log(u_Data, "Here it is");
        } else {
          setError("No user data found");
        }
      } catch (error) {
        console.log("Getting user data failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();

    const fetchUserTweet = async () => {
      try {
        const response = await axios.get(`api/post/$[userID]`);
        const tweetsByUser = response.data.data;
        // console.log(tweetsByUser, "This is from user");
        setUserTweet(tweetsByUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserTweet();
  }, []);

  return (
    <div>
      <div>
        <div className=""></div>
        <div>
          <div>
            <div
              className="w-full h-64 bg-cover bg-center object-cover relative"
              style={{
                backgroundImage: `url('https://github.com/mscode07.png')`,
              }}
            >
              <div className="">
                <div className=" w-full">
                  <Avatar className="absolute -bottom-20 left-4">
                    <AvatarImage
                      src="https://github.com/mscode07.png"
                      className="rounded-full h-36 w-36 border-black border-4 "
                    />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            <div className="text-right pr-4 mt-4">
              <div>
                {/* <Button className="bg-black text-white rounded-2xl border px-7 border-white hover:bg-neutral-900 transition duration-200 font-bold text-md">
                  Edit Profile
                </Button> */}
                <Dialog>
                  <DialogTrigger className="bg-black text-white rounded-2xl border px-7 border-white hover:bg-neutral-900 transition duration-200 font-bold text-md">
                    Edit Profile
                  </DialogTrigger>
                  <DialogContent className="bg-black w-full">
                    <EditProfileComp />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="mt-10 ml-3">
            <p className="text-2xl font-bold">{session?.user?.name}</p>
            <p className="text-gray-500">@{session?.user?.username}</p>
          </div>
        </div>
        <div className="ml-3 mt-2 w-full">
          <p className="mb-3"></p>
          <div>
            <div className="flex gap-4">
              <p className="flex items-center text-gray-500 gap-1">
                <GrLocation className="text-xl" />
                {userData?.[0]?.location ? userData?.[0]?.location : "N/A"}
              </p>
              <a
                className="text-blue-500 flex items-center gap-1"
                href="https://buymeacoffee.com/mscode07"
              >
                <AiOutlineLink className="text-gray-500 text-xl hover:underline" />{" "}
                {userData?.[0]?.biolink ? userData?.[0]?.biolink : "N/A"}
              </a>
              <p className="flex items-center text-gray-500 gap-1">
                <PiBalloon className="text-xl font-bold" />
                {userData?.[0]?.DOB
                  ? new Date(userData[0].DOB).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>
            </div>
            <p className="flex items-center text-gray-500 gap-2">
              <IoCalendarOutline className="text-lg" />{" "}
              {userData?.[0]?.createdDate
                ? new Date(userData[0].createdDate).toLocaleDateString("en-GB")
                : "N/A"}
            </p>
            <div className="flex gap-2 mt-4">
              <div className="flex hover:underline">
                <p className="font-bold">2,147</p>
                <span className="text-gray-500 ml-1 ">Following</span>
              </div>
              <div className="flex hover:underline">
                <p className="font-bold">3,605</p>
                <span className="text-gray-500 ml-1">Followers</span>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      <br />
      <hr />
      <div>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <LoaderComp />
          </div>
        ) : (
          <div>
            {userTweet.map((tweet) => (
              <TweetComp key={tweet.id} tweet={tweet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
