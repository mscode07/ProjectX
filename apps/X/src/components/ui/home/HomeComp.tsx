import { CenterComp, HomeLeft, HomeRight } from "@/components/ui";

export const HomeComp = () => {
  return (
    <div className="flex h-screen overflow-y-auto">
      <div className="custom:w-96 w-10 custom:ml-24 ml-24 h-screen sticky top-0 flex-shrink-0 mr-7 custom:mr-10">
        <HomeLeft />
      </div>
      <div className="flex flex-grow">
        <div className="border border-y-0 custom:w-5/12 w-">
          <CenterComp />
        </div>
        <div className="h-screen sticky top-0 flex-shrink-0">
          <HomeRight />
        </div>
      </div>
    </div>
  );
};
