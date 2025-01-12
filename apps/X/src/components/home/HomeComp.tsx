import { HomeRight, Button, CenterComp, HomeLeft } from "@/components/ui";

export const HomeComp = () => {
  return (
    <div>
      <div className="grid grid-cols-9">
        <div className="col-span-1"></div>
        <div className="col-span-2">
          <HomeRight />
        </div>
        <div className="col-span-3">
          <CenterComp />
        </div>
        {/* <div className="col-span-1"></div> */}
        <div className="col-span-2">
          <HomeLeft />
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
};
