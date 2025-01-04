"use client";
import { signIn } from "next-auth/react";
import { X_logo } from "./X_logo";
import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export const LoginComp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handelFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignIn = async () => {
    await signIn("google");
  };
  const handleGithubSignIn = async () => {
    await signIn("github");
  };

  const handelCredentialLogin = async () => {
    console.log("Reaching here");
    try {
      console.log("Login Components Reaching here");

      const result = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
      });
    } catch (error) {
      console.log(error, "Error with Credentials");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="">
        <X_logo />
      </div>
      <div className="w-72">
        <div className="text-xl my-4 ">Sign in to 𝕏 </div>
        <div className="">
          <div className="">
            <div className="flex flex-col justify-start items-start">
              <Button
                className="w-full rounded-2xl"
                onClick={handleGoogleSignIn}
              >
                {" "}
                <FcGoogle /> Sign UP with Google{" "}
              </Button>
              <Button
                className="mt-2 w-full rounded-2xl font-bold"
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

            <div className="flex flex-col justify-start items-start gap-4 mb-4">
              <Input
                type="text"
                placeholder="Username"
                className=" focus:border-blue-500"
                value={formData.username}
                onChange={handelFormChange}
                name="username"
              />

              <Input
                type="password"
                placeholder="Password"
                className=" focus:border-blue-500"
                value={formData.password}
                onChange={handelFormChange}
                name="password"
              />
            </div>
          </div>
        </div>

        <Button
          className="w-full rounded-2xl font-bold text-twitterBlue"
          onClick={handelCredentialLogin}
        >
          Login
        </Button>
        <div className="mb-16 mt-2">
          <p className="text-xs text-slate-600 mt-0.5 w-64">
            Don't have Account ?{" "}
            <span className="text-twitterBlue hover:underline cursor-pointer">
              <Link href={"/signin"}>Sign Up</Link>
            </span>
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-600 mt-0.5 w-64">
            By signing up, you agree to the{" "}
            <span className="text-twitterBlue">Terms of Service</span> and
            <span className="text-twitterBlue"> Privacy Policy</span>, including
            <span className="text-twitterBlue"> Cookie Use.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
