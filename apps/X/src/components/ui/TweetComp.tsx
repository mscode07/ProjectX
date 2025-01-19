import { FaRegComment } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import { UserAvatar } from "./usrAvatar";
import { FiHeart } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { RiShare2Line } from "react-icons/ri";
<RiShare2Line />;
export const TweetComp = () => {
  return (
    <div className="border border-slate-800 border-spacing-x-0.5">
      <div className="flex p-3 gap-2">
        <div className="mt-1">
          <UserAvatar />
        </div>
        <div className="">
          <div className="grid grid-cols-6">
            <div className="flex col-span-5">
              <p>username</p>
              <p> @name</p>
              <p> . time</p>
            </div>
            <p className="text-end">...</p>
          </div>
          <div className="flex flex-col">
            <div className="list-inside">
              #day100 so finally I completed 100 day of code. Amazing journey
              amazing learning and amazing people I have got in this journey and
              here are some glimpse from the journey. Thank you everyone and
              specially @kirat_tw #100xdevs #buildinpublic #space
              #LearningJourney #WeekendPlans
            </div>
            <div className="">Image Part</div>
          </div>
          {/* <div className="grid grid-cols-5 space-x-8">
            <div className="flex col-span-1">
              <FaRegComment />
            </div>
            <div className="flex col-span-1">
              <BiRepost />
            </div>
            <div className="flex col-span-1">
              <FiHeart />
            </div>
            <div className="flex col-span-1">
              <IoIosStats />
            </div>
            <div className="flex">
              <FaRegBookmark />
              <RiShare2Line />
            </div>
          </div> */}

          <div className="flex space-x-24">
            <FaRegComment />
            <BiRepost />
            <FiHeart />
            <IoIosStats />
            {/* <div className="">
            </div>
            <div className="">
            </div>
            <div className="">
            </div>
            <div className="">
            </div> */}
            <div className="flex">
              <FaRegBookmark />
              <RiShare2Line />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
