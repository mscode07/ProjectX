"use client";
import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { UserAvatar } from "../usrAvatar";

export const TopPost = () => {
  const [postInput, setPostInput] = useState("");

  const handelChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInput(e.target.value);
  };
  const handelClick = () => {
    console.log(postInput);
  };
  return (
    <div>
      <div className="p-3 border border-x-0">
        <div className="flex">
          <div>
            <UserAvatar />
          </div>
          <div>
            <Input
              className="ffocus:outline-none focus-visible:ring-0 border-none"
              placeholder="What is hanppening?!"
              onChange={handelChanges}
              value={postInput}
              name="Post"
            />
          </div>
        </div>
        <Button onClick={handelClick}>Post</Button>
      </div>
    </div>
  );
};
