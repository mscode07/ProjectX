import { signIn } from "next-auth/react";
import { Button } from "./button";
import { Input } from "./index";
import { X_logo } from "./X_logo";

export const UserCredentials = () => {
  const handleCredentialsSignIn = () => {
    signIn("credentials");
  };
  return (
    <div>
      <div className="">
        <X_logo />
      </div>

      <div className="mt-5 w-72">
        <div className="m-4 text-xl ">Create your Account</div>
        <div className="flex-col justify-center items-center">
          <Input
            type="text"
            placeholder="Username"
            className="m-4 focus:border-blue-500"
          />
          <Input
            type="text"
            placeholder="Name"
            className="m-4 focus:border-blue-500"
          />
          <Input
            type="text"
            placeholder="Email"
            className="m-4 focus:border-blue-500"
          />
          <Input
            type="passowrd"
            placeholder="Password"
            className="m-4 focus:border-blue-500"
          />
        </div>
        <Button
          className="w-full ml-4 rounded-2xl font-bold text-twitterBlue"
          onClick={handleCredentialsSignIn}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};
