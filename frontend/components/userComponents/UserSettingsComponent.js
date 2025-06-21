"use client";
import React, { useEffect, useState } from "react";
import { userUpdateSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const UserSettingsComponent = ({ user }) => {
  const form = useForm({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      email: "",
      FirstName: "",
      LastName: "",
      aboutUser: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email || "",
        FirstName: user.FirstName || "",
        LastName: user.LastName || "",
        aboutUser: user.aboutUser || "",
      });
    }
  }, [user, form]);

  // Function for Updating user Profile.
  async function onSubmit(values) {
    try {
      const res = await fetch("/api/user/updateUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Profile Updated", {
          description: data.message,
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      toast.error("Error updating user profile");
    }
  }

  return (
    <div className="w-full h-full px-4 py-6 space-y-8 select-none">
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center gap-4 border border-[#222] rounded-2xl bg-[#000] p-6">
        <img
          src="/avatar-placeholder.png"
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#7C3AED]"
        />
        <button className="px-5 py-2 text-sm font-medium text-white bg-[#7C3AED] rounded-full hover:bg-[#5B21B6] transition duration-200">
          Change Photo
        </button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-3xl mx-auto space-y-6"
        >
          {/* Username */}
          <div className="flex flex-col gap-2 border border-[#222] rounded-2xl p-6 bg-[#000]">
            <label className="text-lg font-medium text-white">
              Username
              <span className="block text-xs text-gray-400 font-normal mt-1">
                (This cannot be changed)
              </span>
            </label>
            <input
              type="text"
              disabled
              value={user?.userName}
              className="w-full md:w-1/2 p-2 bg-[#111] border border-[#333] text-[#999] rounded-md cursor-not-allowed focus:outline-none"
            />
          </div>

          {/* First and Last Name */}
          <div className="flex flex-col md:flex-row gap-6 border border-[#222] rounded-2xl p-6 bg-[#000]">
            <div className="w-full md:w-1/2">
              <FormField
                control={form.control}
                name="FirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        {...field}
                        className="w-full p-3 bg-[#111] text-white border border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full md:w-1/2">
              <FormField
                control={form.control}
                name="LastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        {...field}
                        className="w-full p-3 bg-[#111] text-white border border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 border border-[#222] rounded-2xl p-6 bg-[#000]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="w-full p-3 bg-[#111] text-white border border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* About User */}
          <div className="flex flex-col gap-2 border border-[#222] rounded-2xl p-6 bg-[#000]">
            <FormField
              control={form.control}
              name="aboutUser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">About You</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write a short bio..."
                      {...field}
                      className="w-full p-3 bg-[#111] text-white border border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#7C3AED] text-white font-medium rounded-full hover:bg-[#7C3AED]/20 hover:border-[#7C3AED] border border-black transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserSettingsComponent;
