"use client";
import { TopHeader } from "@/components/TopHeader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { IoCalendarOutline } from "react-icons/io5";
import { PiBalloon } from "react-icons/pi";

export const UserInfo = () => {
  const { data: session } = useSession();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("api/user");
        console.log("User data", response.data);
      } catch (error) {
        console.log("Getting user data failed", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <div>
        <div>
          <TopHeader />
        </div>
        <div>
          <div
            className="relative w-full h-64 bg-cover bg-center object-cover"
            style={{
              backgroundImage: `url('https://github.com/mscode07.png')`,
            }}
          >
            <div>
              <img
                className="absolute rounded-full w-40 h-40 border-4 border-black bottom-0 top-48 left-3
                "
                src="https://github.com/mscode07.png"
                alt="Extra large avatar"
              />
            </div>
          </div>
          <div className="mt-24 ml-3">
            <p className="text-2xl font-bold">{session?.user?.name}</p>
            <p className="text-gray-500">@{session?.user?.username}</p>
          </div>
        </div>
        <div className="ml-3 mt-2 w-full">
          <p className="mb-3"></p>
          <div>
            <div className="flex gap-2">
              <p className="flex items-center text-gray-500 gap-1">
                <GrLocation className="text-xl" />
                location
              </p>
              <a
                className="text-blue-500 flex items-center gap-1"
                href="https://buymeacoffee.com/mscode07"
              >
                <AiOutlineLink className="text-gray-500 text-xl" />{" "}
                buymeacoffee.com/mscode07
              </a>
              <p className="flex items-center text-gray-500 gap-1">
                <PiBalloon className="text-xl font-bold" /> {}
              </p>
            </div>
            <p className="flex items-center text-gray-500 gap-2">
              <IoCalendarOutline className="text-lg" /> Joined December 2017
            </p>
            <div className="flex gap-2 mt-2">
              <div className="flex">
                <p className="font-bold">2,147</p>
                <span className="text-gray-500 ml-1 ">Following</span>
              </div>
              <div className="flex">
                <p className="font-bold">3,605</p>
                <span className="text-gray-500 ml-1">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
