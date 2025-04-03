"use client";

import { TopHeader } from "@/components/TopHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { IoCalendarOutline } from "react-icons/io5";
import { PiBalloon } from "react-icons/pi";
import { Button } from "../button";
import { TweetComp } from "../TweetComp";
import { NextResponse } from "next/server";
import { LoaderComp } from "@/components/LoaderComp";

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
        console.log(tweetsByUser, "This is from user");
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
                <Button className="bg-black text-white rounded-2xl border px-7 border-white hover:bg-neutral-900 transition duration-200 font-bold text-md">
                  Edit Profile
                </Button>
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
          </div>

          {/* <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              id="default-styled-tab"
              data-tabs-toggle="#default-styled-tab-content"
              data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
              data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg"
                  id="profile-styled-tab"
                  data-tabs-target="#styled-profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Profile
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  id="dashboard-styled-tab"
                  data-tabs-target="#styled-dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  Dashboard
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  id="settings-styled-tab"
                  data-tabs-target="#styled-settings"
                  type="button"
                  role="tab"
                  aria-controls="settings"
                  aria-selected="false"
                >
                  Settings
                </button>
              </li>
              <li role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  id="contacts-styled-tab"
                  data-tabs-target="#styled-contacts"
                  type="button"
                  role="tab"
                  aria-controls="contacts"
                  aria-selected="false"
                >
                  Contacts
                </button>
              </li>
            </ul>
          </div>
          <div id="default-styled-tab-content">
            <div
              className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              id="styled-profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is some placeholder content the{" "}
                <strong className="font-medium text-gray-800 dark:text-white">
                  Profile tab associated content
                </strong>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
              </p>
            </div>
            <div
              className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              id="styled-dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is some placeholder content the{" "}
                <strong className="font-medium text-gray-800 dark:text-white">
                  Dashboard tabs associated content
                </strong>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
              </p>
            </div>
            <div
              className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              id="styled-settings"
              role="tabpanel"
              aria-labelledby="settings-tab"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is some placeholder content the{" "}
                <strong className="font-medium text-gray-800 dark:text-white">
                  Settings tabs associated content
                </strong>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classNamees to control
                the content visibility and styling.
              </p>
            </div>
            <div
              className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              id="styled-contacts"
              role="tabpanel"
              aria-labelledby="contacts-tab"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is some placeholder content the{" "}
                <strong className="font-medium text-gray-800 dark:text-white">
                  Contacts tabs associated content
                </strong>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
              </p>
            </div>
          </div> */}
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
