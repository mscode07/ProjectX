import { TopHead, TopPost, TweetComp } from "../ui";

export const CenterComp = () => {
  return (
    <div>
      <div className="border border-slate-800 border-x-0">
        <TopHead />
      </div>
      <div>
        <TopPost />
      </div>
      <div className="">
        <TweetComp />
      </div>
    </div>
  );
};
