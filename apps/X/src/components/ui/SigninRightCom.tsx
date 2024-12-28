import { Button } from "./button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

export const SigninRightCom = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div>
          <div className="text-6xl font-bold my-8">Happening now</div>
          <div className="text-3xl font-bold">Join Today.</div>

          <Button className="mt-10 px-20 ">
            {" "}
            <FcGoogle /> Sign UP with Google{" "}
          </Button>
          <br />
          <Button className="mt-10 px-20">
            {" "}
            <FaGithub /> Sign UP with Google{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};
