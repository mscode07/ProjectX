import { CenterComp, HomeLeft, HomeRight } from "@/components/ui";

export const HomeComp = () => {
  return (
    <div className="relative">
      <div className="flex h-full">
        <div className="custom:w-96 w-10 custom:ml-24 ml-10"></div>
        <div className="flex">
          <div className="custom:px-10 px-2 mr-10 custom:m-0 custom:left-10 left-0">
            <HomeLeft />
          </div>
          <div className="border border-y-0 custom:w-5/12 w-8/12 h-full overflow-y-hidden">
            <CenterComp />
          </div>
          <div className="">
            <HomeRight />
          </div>
        </div>
      </div>
      {/* border-slate-800 border border-y-0 h-screen */}
    </div>
  );
};
