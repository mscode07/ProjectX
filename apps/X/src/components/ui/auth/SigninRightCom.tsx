"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { UserCredentials, LoginComp } from "../index";
import { Button } from "../button";

export const SigninRightCom = () => {
  const handleGoogleSignIn = async () => {
    await signIn("google");
  };
  const handleGithubSignIn = async () => {
    await signIn("github");
  };

  const handleCredentialsSignIn = () => {
    signIn("credentials");
  };

  return (
    <div>
      <div className="custom:flex custom:justify-center custom:items-center custom:h-screen">
        <div>
          <div className="text-6xl font-bold my-8">Happening now</div>
          <div className="text-3xl font-bold">Join Today.</div>
          <div className="flex flex-col max-w-64">
            <Button
              className="mt-10 px-36 rounded-2xl"
              onClick={handleGoogleSignIn}
            >
              {" "}
              <FcGoogle /> Sign UP with Google{" "}
            </Button>
            <Button
              className="mt-2 px-36 rounded-2xl font-bold"
              onClick={handleGithubSignIn}
            >
              {" "}
              <FaGithub /> Sign UP with Github{" "}
            </Button>
          </div>
          <div className="flex items-center justify-center max-w-64 ml-4">
            <hr className="w-72 h-0.5 my-4 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
            <p className="px-2 text-slate-500">or</p>
            <hr className="w-72 h-0.5 my-4 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
          </div>
          <Dialog>
            <DialogTrigger className="bg-twitterBlue hover:bg-blue-500 py-1 px-24 mt-0 rounded-2xl text-white">
              Create Account
            </DialogTrigger>
            <DialogContent className="bg-black min-w-96 max-w-96">
              <DialogHeader>
                <DialogTitle className="w-4/5 flex items-center justify-center ">
                  <UserCredentials />
                </DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <p className="text-xs text-slate-600 mt-0.5 w-64">
            By signing up, you agree to the{" "}
            <span className="text-twitterBlue">Terms of Service</span> and
            <span className="text-twitterBlue"> Privacy Policy</span>, including
            <span className="text-twitterBlue"> Cookie Use.</span>
          </p>
          <div className="mt-12 font-semibold">Already have an account?</div>

          <Dialog>
            <DialogTrigger className=" border border-slate-500 py-1 px-32 mt-1 rounded-2xl text-twitterBlue font-semibold hover:bg-slate-900 ">
              Sign In
            </DialogTrigger>
            <DialogContent className="bg-black min-w-96 max-w-96">
              <DialogHeader>
                <DialogTitle className="flex flex-col justify-center items-center">
                  <LoginComp />
                </DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
