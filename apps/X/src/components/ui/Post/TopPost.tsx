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
interface TweetInput {
  content: string;
  userId: number;
}

export const TopPost = () => {
  const [postInput, setPostInput] = useState("");
  const { data: session } = useSession();

  const handelChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInput(e.target.value);
  };
  const handelClick = async () => {
    console.log(postInput);
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
        <div className="flex">
          <div>
            <UserAvatar />
          </div>
          <div>
            <Input
              className="ffocus:outline-none focus-visible:ring-0 border-none"
              placeholder="What is hanppening?!"
              onChange={handelChanges}
              value={postInput}
              name="Post"
            />
          </div>
        </div>
        <div className="flex items-center ml-12">
          <div className="flex gap-4 text-blue-500 text-lg cursor-pointer">
            <div>
              <TbPhotoSquareRounded />
            </div>
            <div>
              <MdOutlineGifBox />
            </div>
            <div>
              <X_Icon />
            </div>
            <div>
              <HiMiniListBullet />
            </div>
            <div>
              <GrEmoji />
            </div>
            <div>
              <RiCalendarScheduleLine />
            </div>
            <div>
              <IoLocationOutline />
            </div>
            <div>
              <BsTypeBold />
            </div>
            <div>
              <AiOutlineItalic />
            </div>
          </div>
          <Button
            onClick={handelClick}
            className="ml-28 rounded-2xl font-semibold"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};
