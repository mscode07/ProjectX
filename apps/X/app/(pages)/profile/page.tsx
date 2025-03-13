"use client";

import { CenterComp, HomeLeft } from "@/components/ui";
import { UserInfo } from "@/components/ui/Profile/UserInfo";

const page = () => {
  return (
    <div className="flex h-screen overflow-y-auto">
      <div className="custom:w-96 w-10 custom:ml-24 ml-16 h-screen sticky top-0 flex-shrink-0 mr-7 custom:mr-10">
        <HomeLeft />
      </div>
      <div className="flex flex-grow">
        <div className="border border-y-0 custom:w-5/12 w-">
          <div>
            <UserInfo />
          </div>
        </div>
        {/* <div className="invisible h-screen sticky top-0">
        <HomeRight />
      </div> */}
      </div>
    </div>
  );
};
export default page;
