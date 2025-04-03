import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
export const PostDialogComp = () => {
  const { data: session } = useSession();
  const [userInput, setUserInput] = useState("");

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setUserInput(e.target.value);
  };
  const handleClick = async () => {
    if (!session?.user?.id) {
      console.error("No user Fount");
      return;
    }
    try {
      const res = await axios.post("/api/post", { content: userInput });
      console.log("This is the Response :=>", res);
      setUserInput(" ");
    } catch (error) {
      console.log("Error while sending Tweet");
    }
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center ">
        <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-lg">
          <div className="mt-4">
            <Avatar>
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || "User"}
              />
              <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </div>
          <textarea
            onChange={handleChange}
            placeholder="What's happening?"
            className="w-full ml-11 h-32 bg-black border-none p-3 rounded-lg text-white focus:outline-none resize-none"
          />
          <hr />
          <div className="flex justify-end mt-4 ">
            <button
              className="bg-white px-6 py-2 rounded-full text-black font-bold"
              onClick={handleClick}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
