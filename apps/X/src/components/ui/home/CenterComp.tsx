"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { TopHead, TopPost, TweetComp } from "..";

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
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>", tweetData);

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
        <div>Loading</div>
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
