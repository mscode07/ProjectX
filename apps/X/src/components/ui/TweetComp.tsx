"use client";
import { BiRepost } from "react-icons/bi";
import { FaRegBookmark, FaRegComment } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";
import { RiShare2Line } from "react-icons/ri";
import { UserAvatar } from "./usrAvatar";

interface TweetProps {
  tweet: {
    id: number;
    content: string;
    userID: number;
    likes: number;
    createdDate: string;
    user: { name: string };
  };
}

export const TweetComp = ({ tweet }: TweetProps) => {
  return (
    <div>
      <div>
        <div className="border border-slate-800 border-spacing-x-0.5">
          <div className="flex p-3 gap-2">
            <div className="mt-1">
              <UserAvatar />
            </div>
            <div className="">
              <div className="grid grid-cols-6">
                <div className="flex col-span-5">
                  <p>{tweet.user.name}</p>
                  {/* <p> @tweet.content</p> */}
                  <p> · {new Date(tweet.createdDate).toLocaleDateString()}</p>
                </div>
                <p className="text-end">...</p>
              </div>
              <div className="flex flex-col">
                <div className="list-inside">{tweet.content}</div>
                <div className="">Image Part</div>
              </div>
              <div className="flex space-x-24 text-slate-600">
                <FaRegComment />
                <BiRepost />
                <FiHeart />
                {/* <span>{tweet.likes} </span> */}
                <IoIosStats />
                <div className="flex">
                  <FaRegBookmark />
                  <RiShare2Line />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
