"use client";

import { HomeLeft, TopHeader } from "@/components/ui";
import { UserInfo } from "@/components/ui/Profile/UserInfo";

const page = () => {
  return (
    <div className="flex h-screen overflow-y-auto">
      <div className="custom:w-96 w-10 custom:ml-24 ml-16 h-screen sticky top-0 flex-shrink-0 mr-7 custom:mr-10">
        <HomeLeft />
      </div>
      <div className="flex flex-grow">
        <div className="border border-y-0 custom:w-6/12 w-10/12">
          <div className="relative">
            <div className="sticky top-0 z-10 bg-black/70 backdrop-blur-2xl ">
              <TopHeader />
            </div>
            <UserInfo />
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
