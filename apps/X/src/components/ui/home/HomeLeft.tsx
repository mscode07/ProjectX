"use client";

import { AiOutlineThunderbolt } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { RiGroupLine, RiNotification2Line } from "react-icons/ri";
import { Button, UserAvatar, X_logo } from "..";
import GrokIcon from "../Grok";
import X_Icon from "../X_Icon";
export const HomeLeft = () => {
  return (
    <div>
      <div className="h-screen flex flex-col justify-between pt-6">
        <div className="flex flex-col items-end">
          <div className="flex flex-col align-baseline">
            <div>
              <div className="mb-4 ml-4">
                <X_logo />
              </div>
              <div className="flex items-center text-xl mb-3 ">
                <div className="hover:bg-neutral-900 flex gap-4  hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2">
                  <div className="text-2xl ">
                    <GoHome />
                  </div>
                  Home
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="hover:bg-neutral-900 flex gap-4  hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2 items-center">
                  <div className="text-2xl">
                    <IoMdSearch />
                  </div>
                  Explore
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="hover:bg-neutral-900 flex gap-4  hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2">
                  <div className="text-2xl">
                    <RiNotification2Line />
                  </div>
                  Notifications
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="hover:bg-neutral-900 flex gap-4  hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2">
                  <div className="text-2xl">
                    <MdOutlineMail />
                  </div>
                  Messages
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="hover:bg-neutral-900 flex gap-4  hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2">
                  <div className="text-2xl">
                    <GrokIcon />
                  </div>
                  Grok
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="hover:bg-neutral-900 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2 items-center">
                  <div className="text-3xl">
                    <X_Icon />
                  </div>
                  Premium
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="hover:bg-neutral-900 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2">
                  <div className="text-2xl">
                    <FaRegBookmark />
                  </div>
                  Bookmarks
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="hover:bg-neutral-900 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2">
                  <div className="text-2xl">
                    <RiGroupLine />
                  </div>
                  Communities
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="hover:bg-neutral-900 flex gap-4  hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2">
                  <div className="text-2xl">
                    <AiOutlineThunderbolt />
                  </div>
                  Verified Orgs
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="hover:bg-neutral-900 flex gap-4  hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2">
                  <div className="text-2xl">
                    <FaRegUser />
                  </div>
                  Profile
                </div>
              </div>
              <div className="flex items-center py-0.5 gap-4 text-xl mb-3">
                <div className="hover:bg-neutral-900 flex gap-4  hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2">
                  <div className="text-2xl">
                    <CgMoreO />
                  </div>
                  More
                </div>
              </div>
              <Button className="rounded-3xl w-full mt-6 px-20 py-6 font-semibold ">
                Post
              </Button>
            </div>
            <div className="mt-28">
              <div>
                <UserAvatar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
