import { CenterComp, HomeLeft, HomeRight } from "@/components/ui";

export const HomeComp = () => {
  return (
    <div>
      <div></div>
      <div className="grid grid-cols-6 ">
        <div></div>
        <div className="">
          <HomeLeft />
        </div>
        <div className="flex mx-10">
          <div className="border col-span-3">
            <CenterComp />
          </div>
          <div className="ml-10 col-span-2 ">
            <HomeRight />
          </div>
        </div>
      </div>
      {/* <div className="">
        <div className=""></div>
        <div className="">
          <HomeRight />
        </div>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
      </div> */}
      {/* border-slate-800 border border-y-0 h-screen */}
    </div>
  );
};
