"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AiOutlineItalic } from "react-icons/ai";
import { BsTypeBold } from "react-icons/bs";
import { GrEmoji } from "react-icons/gr";
import { HiMiniListBullet } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { Button } from "../button";
import { Input } from "../input";
import { UserAvatar } from "../usrAvatar";
import X_Icon from "../X_Icon";

export const TopPost = () => {
  const [postInput, setPostInput] = useState("");
  const { data: session } = useSession();

  const handelChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostInput(e.target.value);
  };
  const handelClick = async () => {
    if (!session?.user?.email) {
      console.error("No User session found");
      return;
    }
    try {
      const res = await axios.post("/api/post", { content: postInput });
      console.log("Post saved successfully:", res.data);
      setPostInput("");
    } catch (error) {
      console.log("Errro while Posting", error);
    }
  };
  return (
    <div>
      <div className="p-3 border border-x-0">
        <div className="flex ">
          <div>
            <UserAvatar />
          </div>
          <div>
            {/* <Input
              className="focus:outline-none focus-visible:ring-0 border-none"
              placeholder="What is hanppening?!"
              onChange={handelChanges}
              value={postInput}
              name="Post"
            /> */}
            <textarea
              placeholder="What's happening?"
              className="focus:outline-none focus-visible:ring-0 w-96  ml-3 mt-3 bg-transparent border-none p-3 rounded-lg text-white resize-none overflow-auto "
              value={postInput}
              onChange={handelChanges}
              name="Post"
            />
          </div>
        </div>
        <hr />
        <div className="flex items-center ml-12 mt-2">
          <div className="flex gap-4 text-blue-500 text-lg cursor-pointer">
            <div className="relative group hover:bg-neutral-900 rounded-xl ">
              <div>
                <TbPhotoSquareRounded />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2  text-sm bg-gray-800 text-white px-2 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                Media
              </span>
            </div>
            <div className="relative group hover:bg-neutral-900 rounded-xl">
              <div>
                <MdOutlineGifBox />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2  text-sm bg-gray-800 text-white px-2 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                GIF
              </span>
            </div>
            <div className="relative group hover:bg-neutral-900 rounded-xl">
              <div>
                <X_Icon />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2  text-sm bg-gray-800 text-white px-2 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                GROK
              </span>
            </div>
            <div className="relative group hover:bg-neutral-900 rounded-xl">
              <div>
                <HiMiniListBullet />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2  text-sm bg-gray-800 text-white px-2 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                Poll
              </span>
            </div>
            <div className="relative group hover:bg-neutral-900 rounded-xl">
              <div>
                <GrEmoji />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2  text-sm bg-gray-800 text-white px-2 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                Emoji
              </span>
            </div>
            <div className="relative group hover:bg-neutral-900 rounded-xl">
              <div>
                <RiCalendarScheduleLine />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2  text-sm bg-gray-800 text-white px-2 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                Schedule
              </span>
            </div>
            <div className="relative group hover:bg-neutral-900 rounded-xl">
              <div>
                <IoLocationOutline />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2  text-sm bg-gray-800 text-white px-2 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                Location
              </span>
            </div>
            <div className="relative group hover:bg-neutral-900 rounded-xl">
              <div>
                <BsTypeBold />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2  text-sm bg-gray-800 text-white px-2 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                Bold
              </span>
            </div>
            <div className="relative group hover:bg-neutral-900 rounded-xl">
              <div>
                <AiOutlineItalic />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2  text-sm bg-gray-800 text-white px-2 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                Italic
              </span>
            </div>
          </div>
          <div className="ml-auto">
            <Button onClick={handelClick} className="rounded-2xl font-semibold">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
