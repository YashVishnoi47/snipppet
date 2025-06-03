"use client";
import React, { useState } from "react";
import { userUpdateSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const UserSettingsComponent = ({ user }) => {
  const form = useForm({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      email: user?.email,
      FirstName: user?.FirstName,
      LastName: user?.LastName,
      aboutUser: user?.aboutUser,
    },
  });

  async function onSubmit(values) {
    console.log("Form submitted with values:", values);
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
        alert("Profile updated successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="w-full h-full px-4 py-6 space-y-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center gap-4 border border-[#2A2A3B] rounded-2xl bg-[#1C1C27] p-6 shadow-md">
        <img
          src="/avatar-placeholder.png"
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#00F0B5]"
        />
        <button className="px-5 py-2 text-sm font-medium text-white bg-[#00F0B5] rounded-full hover:bg-[#00d1a3] transition duration-200">
          Change Photo
        </button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-3xl mx-auto space-y-6"
        >
          {/* Username */}
          <div className="flex flex-col gap-2 border border-[#2A2A3B] rounded-2xl p-6 bg-[#1C1C27] shadow-sm">
            <label className="text-lg font-medium text-[#EDEDED]">
              Username
              <span className="block text-xs text-gray-400 font-normal mt-1">
                (This cannot be changed)
              </span>
            </label>
            <input
              type="text"
              disabled
              value={user?.userName}
              className="w-full md:w-1/2 p-2 bg-[#2A2A3B] border border-[#3A3A4A] text-[#AFAFC1] rounded-md cursor-not-allowed focus:outline-none"
            />
          </div>

          {/* First and Last Name */}
          <div className="flex flex-col md:flex-row gap-6 border border-[#2A2A3B] rounded-2xl p-6 bg-[#1C1C27] shadow-sm">
            <div className="w-full md:w-1/2">
              <FormField
                control={form.control}
                name="FirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#EDEDED]">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        {...field}
                        className="w-full p-3 bg-[#2A2A3B] text-[#EDEDED] border border-[#3A3A4A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00F0B5]"
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
                    <FormLabel className="text-[#EDEDED]">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        {...field}
                        className="w-full p-3 bg-[#2A2A3B] text-[#EDEDED] border border-[#3A3A4A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00F0B5]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 border border-[#2A2A3B] rounded-2xl p-6 bg-[#1C1C27] shadow-sm">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#EDEDED]">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="w-full p-3 bg-[#2A2A3B] text-[#EDEDED] border border-[#3A3A4A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00F0B5]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* About User */}
          <div className="flex flex-col gap-2 border border-[#2A2A3B] rounded-2xl p-6 bg-[#1C1C27] shadow-sm">
            <FormField
              control={form.control}
              name="aboutUser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#EDEDED]">About You</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write a short bio..."
                      {...field}
                      className="w-full p-3 bg-[#2A2A3B] text-[#EDEDED] border border-[#3A3A4A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00F0B5]"
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
              className="px-6 py-2 bg-[#00F0B5] text-black font-semibold rounded-full hover:bg-[#00d1a3] transition-all duration-200"
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
