"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoaderComp, TopHead, TopPost, TweetComp, X_logo } from "..";

interface Tweet {
  id: number;
  content: string;
  userID: number;
  likes: number;
  createdDate: string;
  user: { name: string };
}
export const CenterComp = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchTweets = async () => {
    try {
      setLoading(true);
      const response = await axios.get("api/post");
      const tweetData = response.data.data;
      if (Array.isArray(tweetData) && response.data.data.length > 0) {
        setTweets(tweetData);
      } else {
        setError("No tweets found");
      }
    } catch (error) {
      console.log("Getting error while fetching =>", error);
    } finally {
      setLoading(false);
    }
    const response = await axios.get("api/post");
    console.log("This is from the Centercomp", response);
  };

  useEffect(() => {
    fetchTweets();

    // const intervalPolling = setInterval(() => {
    //   fetchTweets();
    // }, 5000);
    // return () => clearInterval(intervalPolling);
  }, []);
  return (
    <div className="">
      <div className="">
        <TopHead />
      </div>
      <div>
        <TopPost />
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <LoaderComp />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <div className="">
            {tweets.map((tweet) => (
              <TweetComp key={tweet.id} tweet={tweet} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
//border border-slate-800 border-x-0
//custom:w-11/12 w-max-96
