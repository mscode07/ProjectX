import { TopHead, TopPost, TweetComp } from "..";

export const CenterComp = () => {
  return (
    <div className="">
      <div className="">
        <TopHead />
      </div>
      <div>
        <TopPost />
      </div>
      <div className="">
        <TweetComp />
        <TweetComp />
        <TweetComp />
        <TweetComp />
        <TweetComp />
      </div>
    </div>
  );
};
//border border-slate-800 border-x-0
//custom:w-11/12 w-max-96
