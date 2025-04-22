"use client";
import axios from "axios";
import { Button } from "../button";
import { useState } from "react";

interface ProfileFormData {
  username: string;
  bio: string;
  location: string;
  biolink: string;
  dob: string;
}

export const EditProfileComp = () => {
  const [formInput, setFormInput] = useState<ProfileFormData>({
    username: "",
    bio: "",
    location: "",
    biolink: "",
    dob: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submiting", formInput);
    try {
      const response = await axios.post("/api/user", formInput);
    } catch (error) {
      console.error("Error updating Profile", error);
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">Edit profile</p>
            <Button type="submit" className="rounded-2xl px-5 py-1">
              Save
            </Button>
          </div>
          <div>
            <div className="flex flex-col border mt-3">
              <label className="text-sm text-slate-500 pl-2 pt-1">Name</label>
              <input
                name="username"
                value={formInput.username}
                className="border-none focus:outline-none bg-transparent pl-2 pb-1 pt-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col border mt-6">
              <label className="text-sm text-slate-500 pl-2 pt-1">Bio</label>
              <input
                name="Bio"
                value={formInput.bio}
                className="border-none focus:outline-none bg-transparent pl-2 h-16 pb-1 pt-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col border mt-6">
              <label className="text-sm text-slate-500 pl-2 pt-1">
                Location
              </label>
              <input
                name="Location"
                value={formInput.location}
                className="border-none focus:outline-none bg-transparent pl-2 pb-1 pt-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col border mt-6">
              <label className="text-sm text-slate-500 pl-2 pt-1">
                Website
              </label>
              <input
                name="Website"
                value={formInput.biolink}
                className="border-none focus:outline-none bg-transparent pl-2 pb-1 pt-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col border mt-6">
              <label className="text-sm text-slate-500 pl-2 pt-1 pb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="DOB"
                value={formInput.dob}
                className="border-none focus:outline-none text-slate-700 bg-transparent pl-2"
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
