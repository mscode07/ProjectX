"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { RiGroupLine, RiNotification2Line } from "react-icons/ri";
import { TbOctagonPlus } from "react-icons/tb";
import { Button, X_logo } from "..";
import GrokIcon from "../Grok";
import X_Icon from "../X_Icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostDialogComp } from "../Post/PostDialogComp";

export const HomeLeft = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const onPostClick = () => {
    // router.push("/post");
  };
  return (
    <div>
      <div className="h-screen flex flex-col justify-between pt-6">
        <div className="flex flex-col items-end">
          <div className="flex flex-col ">
            <div className="w-8 custom:w-full">
              <Link href={"/home"}>
                <div className="mb-4 ml-4">
                  <X_logo />
                </div>
              </Link>
              <div className="flex items-center text-xl mb-3 ">
                <Link href={"/home"}>
                  <div className="custom:hover:bg-neutral-900/40 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl px-4 py-2">
                    <div className="text-2xl hover:bg-neutral-900/40 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl">
                      <GoHome />
                    </div>
                    <div className="custom:visible invisible">Home</div>
                  </div>
                </Link>
              </div>
              <div className="flex items-center text-xl mb-3">
                <Link href={"/explore"}>
                  <div className="custom:hover:bg-neutral-900/40 flex gap-4  custom:hover:bg-opacity-40 transition duration-200 custom:hover:rounded-2xl px-4 py-2 items-center">
                    <div className="hover:bg-neutral-900/40 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl text-2xl">
                      <IoMdSearch />
                    </div>
                    <div className="custom:visible invisible">Explore</div>
                  </div>
                </Link>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="custom:hover:bg-neutral-900/40 flex gap-4  custom:hover:bg-opacity-40 transition duration-200 custom:hover:rounded-2xl px-4 py-2">
                  <div className="hover:bg-neutral-900/40 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl text-2xl">
                    <RiNotification2Line />
                  </div>
                  <div className="custom:visible invisible">Notifications</div>
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="custom:hover:bg-neutral-900/40 flex gap-4  custom:hover:bg-opacity-40 transition duration-200 custom:hover:rounded-2xl px-4 py-2">
                  <div className="hover:bg-neutral-900/40 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl text-2xl">
                    <MdOutlineMail />
                  </div>
                  <div className="custom:visible invisible">Messages</div>
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="custom:hover:bg-neutral-900/40 flex gap-4  custom:hover:bg-opacity-40 transition duration-200 custom:hover:rounded-2xl px-4 py-2">
                  <div className="hover:bg-neutral-900/40 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl text-2xl">
                    <GrokIcon />
                  </div>
                  <div className="custom:visible invisible">Grok</div>
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="custom:hover:bg-neutral-900 flex gap-4 custom:hover:bg-opacity-40 transition duration-200 custom:hover:rounded-2xl px-4 py-2 items-center">
                  <div className="hover:bg-neutral-900 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl text-2xl">
                    <X_Icon />
                  </div>
                  <div className="custom:visible invisible">Premium</div>
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="custom:hover:bg-neutral-900 flex gap-4 custom:hover:bg-opacity-40 transition duration-200 custom:hover:rounded-2xl px-4 py-2">
                  <div className="hover:bg-neutral-800 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl text-2xl">
                    <FaRegBookmark />
                  </div>
                  <div className="custom:visible invisible">Bookmarks</div>
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="custom:hover:bg-neutral-900/40 flex gap-4 custom:hover:bg-opacity-40 transition duration-200 custom:hover:rounded-2xl px-4 py-2">
                  <div className="hover:bg-neutral-900/40 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl text-2xl">
                    <RiGroupLine />
                  </div>
                  <div className="custom:visible invisible">Communities</div>
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <div className="custom:hover:bg-neutral-900/40 flex gap-4 custom:hover:bg-opacity-40 transition duration-200 custom:hover:rounded-2xl px-4 py-2">
                  <div className="hover:bg-neutral-900/40 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl text-2xl">
                    <AiOutlineThunderbolt />
                  </div>
                  <div className="custom:visible invisible">Communities</div>
                </div>
              </div>
              <div className="flex items-center text-xl mb-3">
                <Link href={`/${session?.user?.username}`}>
                  <div className="custom:hover:bg-neutral-900/40 flex gap-4 custom:hover:bg-opacity-40 transition duration-200 custom:hover:rounded-2xl px-4 py-2">
                    <div className="hover:bg-neutral-900/40 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl text-2xl">
                      <FaRegUser />
                    </div>
                    <div className="custom:visible invisible">Profile</div>
                  </div>
                </Link>
              </div>
              <div className="flex items-center py-0.5 gap-4 text-xl">
                <div className="custom:hover:bg-neutral-900/40 flex gap-4 custom:hover:bg-opacity-40 transition duration-200 custom:hover:rounded-2xl px-4 py-2">
                  <div className="hover:bg-neutral-900/40 flex gap-4 hover:bg-opacity-40 transition duration-200 hover:rounded-2xl text-2xl">
                    <CgMoreO />
                  </div>
                  <div className="custom:visible invisible">More</div>
                </div>
              </div>
              <div className="">
                {/* <Button
                  className="invisible custom:visible rounded-3xl w-full custom:mt-3 px-20 py-6 font-semibold"
                  onClick={onPostClick}
                >
                  Post
                </Button> */}
                <Dialog>
                  <DialogTrigger className="invisible custom:visible rounded-3xl w-full custom:mt-3 px-20 py-3  font-semibold bg-white text-black items-start">
                    Post
                  </DialogTrigger>
                  <DialogContent className="bg-black w-full">
                    <PostDialogComp />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger className="">
                    <TbOctagonPlus
                      className="custom:hidden block text-4xl ml-3 cursor-pointer hover:bg-white hover:rounded-3xl hover:text-black"
                      onClick={onPostClick}
                    />
                  </DialogTrigger>
                  <DialogContent className="bg-black w-full">
                    <PostDialogComp />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="mt-28">
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || "User"}
                  />
                  <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="hidden custom:block">
                  <p className="font-bold">{session?.user?.name}</p>
                  <p className="text-slate-600 font-semibold">
                    @{session?.user?.username}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
