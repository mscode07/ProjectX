"use client";

import { AiOutlineThunderbolt } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { RiGroupLine, RiNotification2Line } from "react-icons/ri";
import { Button, UserAvatar, X_logo } from "../ui";
import GrokIcon from "../ui/Grok";
import X_Icon from "../ui/X_Icon";
export const HomeLeft = () => {
  return (
    <div>
      <div className="h-screen pt-4">
        <div className="flex flex-col items-end">
          <div className="flex flex-col">
            <div>
              <div className="mb-6 ">
                <X_logo />
              </div>
              <div className="flex items-center gap-4 text-xl mb-6">
                <GoHome />
                Home
              </div>
              <div className="flex items-center gap-4 text-xl mb-6">
                <IoMdSearch />
                Explore
              </div>
              <div className="flex items-center gap-4 text-xl mb-6">
                <RiNotification2Line />
                Notifications
              </div>
              <div className="flex items-center gap-4 text-xl mb-6">
                <MdOutlineMail />
                Messages
              </div>
              <div className="flex items-center gap-4 text-xl mb-6">
                <GrokIcon />
                Grok
              </div>
              <div className="flex items-center gap-4 text-xl mb-6">
                <X_Icon />
                Premium
              </div>
              <div className="flex items-center gap-4 text-xl mb-6">
                <FaRegBookmark />
                Bookmarks
              </div>
              <div className="flex items-center gap-4 text-xl mb-6">
                <RiGroupLine />
                Communities
              </div>
              <div className="flex items-center gap-4 text-xl mb-6">
                <AiOutlineThunderbolt />
                Verified Orgs
              </div>
              <div className="flex items-center gap-4 text-xl mb-6">
                <FaRegUser />
                Profile
              </div>
              <div className="flex items-center gap-4 text-xl mb-6">
                <CgMoreO />
                More
              </div>
              <Button className="rounded-3xl w-full mt-6 px-10 ">Post</Button>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <UserAvatar />
        </div>
      </div>
    </div>
  );
};
