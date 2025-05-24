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
      email: user.email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      aboutUser: user.aboutUser,
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
    <div className="w-full h-full">
      {/* Profile Section */}
      <div className="w-full flex flex-col items-center justify-center gap-4 border border-gray-200 rounded-xl p-6 shadow-sm">
        <img
          src="/avatar-placeholder.png"
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
          Change Photo
        </button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[80%] h-full flex flex-col justify-start items-center gap-6
        p-6"
        >
          {/* Username */}
          <div className="w-full flex flex-col gap-2 border border-gray-200 rounded-xl p-6 shadow-sm">
            <label className="text-xl font-semibold">
              Username{" "}
              <span className="text-sm text-gray-700">
                (You cannot change the Username)
              </span>
            </label>
            <input
              type="text"
              disabled
              value={user.userName}
              className="w-[40%] p-2 cursor-not-allowed border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
            />
          </div>

          {/* First and Last Name */}
          <div className="w-full flex gap-6 border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="w-1/2 flex flex-col gap-2">
              {/* <label className="text-xl font-semibold">First Name</label>
              <input
                type="text"
                onChange={handleChange}
                value={form.FirstName}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}

              <FormField
                control={form.control}
                name="FirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        className="w-full p-2 border outline-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormDescription>
                      {/* This is your public display name. */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <FormField
                control={form.control}
                name="LastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        {...field}
                        className="w-full p-2 border outline-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormDescription>
                      {/* This is your public display name. */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Email */}
          <div className="w-full flex flex-col gap-2 border border-gray-200 rounded-xl p-6 shadow-sm">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="w-full p-2 border outline-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormDescription>
                    {/* This is your public display name. */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* About User */}
          <div className="w-full flex flex-col gap-2 border border-gray-200 rounded-xl p-6 shadow-sm">
            <FormField
              control={form.control}
              name="aboutUser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About User</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="About User"
                      {...field}
                      className="w-full p-2 border outline-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormDescription>
                    {/* This is your public display name. */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default UserSettingsComponent;
