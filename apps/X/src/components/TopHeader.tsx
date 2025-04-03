"use client";
import { IoArrowBack } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const TopHeader = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="mt-3 flex items-center gap-5 cursor-pointer">
        <div className=" rounded-full p-2 hover:bg-neutral-800 transition duration-300 m-2 ">
          <IoArrowBack className="text-xl" onClick={handleBackClick} />
        </div>
        <div>
          <p className="font-bold text-xl">{session?.user?.name}</p>
          <p className="text-gray-500">33.5K posts</p>
        </div>
      </div>
    </div>
  );
};
