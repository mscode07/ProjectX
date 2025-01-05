"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./index";
import { X_logo } from "./X_logo";
import Link from "next/link";

export const UserCredentials = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const handelFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handelCredentialSignin = async () => {
    console.log("Reaching here");
    try {
      console.log("Reaching here");

      await signIn("credentials", {
        username: formData.username,
        email: formData.email,
        name: formData.name,
        password: formData.password,
        redirect: true,
        callbackUrl: "/home",
      });
    } catch (error) {
      console.log(error, "Error with Credentials");
    }
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
            value={formData.username}
            onChange={handelFormChange}
            name="username"
          />
          <Input
            type="text"
            placeholder="Name"
            className="m-4 focus:border-blue-500"
            value={formData.name}
            onChange={handelFormChange}
            name="name"
          />
          <Input
            type="text"
            placeholder="Email"
            className="m-4 focus:border-blue-500"
            value={formData.email}
            onChange={handelFormChange}
            name="email"
          />
          <Input
            type="password"
            placeholder="Password"
            className="m-4 focus:border-blue-500"
            value={formData.password}
            onChange={handelFormChange}
            name="password"
          />
        </div>
        <Button
          className="w-full ml-4 rounded-2xl font-bold text-twitterBlue"
          onClick={handelCredentialSignin}
        >
          Create Account
        </Button>

        <div className="mb-16 mt-2 ml-6">
          <p className="text-xs text-slate-600 mt-0.5 w-64">
            Already have Account ?{" "}
            <span className="text-twitterBlue hover:underline cursor-pointer">
              <Link href={"/login"}>Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
