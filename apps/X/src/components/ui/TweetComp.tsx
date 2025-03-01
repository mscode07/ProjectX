"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { NextResponse } from "next/server";
import { BiRepost } from "react-icons/bi";
import { FaRegBookmark, FaRegComment } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";
import { RiDeleteBinLine, RiShare2Line } from "react-icons/ri";

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
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/post?id=${tweet.id}`);
      console.log("Tweet Deleted", response);
      return NextResponse.json({ status: 200 });
    } catch (error) {
      console.log("Error while Deleting Tweet", error);
    }
  };
  return (
    <div>
      <div>
        <div className="border border-slate-800 border-spacing-x-0.5">
          <div className="flex p-3 gap-2">
            <div className="mt-1 cursor-pointer">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>{tweet.user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="">
              <div className="grid grid-cols-6">
                <div className="flex col-span-5">
                  <p className="font-bold cursor-pointer">{tweet.user.name}</p>
                  {/* <p> @tweet.content</p> */}
                  <span className="px-1 mx-1 items-center text-slate-500">
                    .
                  </span>
                  <p className="text-slate-500">
                    {" "}
                    {new Date(tweet.createdDate).toLocaleString("en-US", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                {/* <p className="text-end">...</p> */}
                <div className="ml-auto cursor-pointer hover:bg-black hover:rounded-2xl">
                  <Popover>
                    <PopoverTrigger className="font-bold text-slate-500">
                      ...
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="">
                        {
                          <div
                            className="flex text-red-700 items-center gap-2 cursor-pointer"
                            onClick={handleDelete}
                          >
                            <RiDeleteBinLine />
                            Delete
                          </div>
                        }
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="list-inside">{tweet.content}</div>
                <div className="cursor-pointer">Image Part</div>
              </div>
              <div className="flex space-x-24 text-slate-600">
                <FaRegComment className="cursor-pointer" />
                <BiRepost className="cursor-pointer" />
                <FiHeart className="cursor-pointer" />
                {/* <span>{tweet.likes} </span> */}
                <IoIosStats className="cursor-pointer" />
                <div className="flex">
                  <FaRegBookmark className="cursor-pointer" />
                  <RiShare2Line className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
