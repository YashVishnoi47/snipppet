"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import SearchBar from "@/components/utilityComponents/SearchBar";
import Button2 from "@/components/utilityComponents/Button2";
import UserRooms from "@/components/UserRooms";
import Loader from "@/components/utilityComponents/Loader";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { roommFormSchema } from "@/lib/validator";
import { Input } from "@/components/ui/input";
import { IoFilter } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { editorConfigs } from "@/config/EditorConfig";
import { toast } from "sonner";

const UserProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [joinRoomId, setjoinRoomId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [filterTerm, setFilterTerm] = useState("all");

  // Debounced Search Logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setFilter(filterTerm);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm, filterTerm]);

  // Form for Creating Rooms.
  const form = useForm({
    resolver: zodResolver(roommFormSchema),
    defaultValues: {
      roomName: "",
      codingLang: "",
      idPublic: false,
    },
  });

  // Function To Fetch User Rooms.
  const FetchUserRooms = async () => {
    try {
      setFetching(true);
      const res = await fetch(
        `/api/room/fetchRoom?roomName=${debouncedSearch}&lang=${filter}`
      );
      const data = await res.json();
      if (data) {
        console.log("Room Fetched");
      }

      if (data) {
        setFetching(false);
      }
      setRooms(data.rooms || []);
    } catch (error) {
      console.error("Fetch User Error", error);
      setRooms([]);
      setFetching(false);
    }
  };

  // Creating private coding Rooms.
  const createPrivateRoom = async (values) => {
    setLoading(true);

    const res = await fetch("/api/room/createRoom", {
      method: "POST",
      body: JSON.stringify({
        roomName: values.roomName,
        codingLang: values.codingLang,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      await FetchUserRooms();
      setLoading(false);
      toast.success("Room Created", {
        description: data.message,
      });
    } else {
      setLoading(false);
      toast.error("Error Creating Room", {
        description: data.error,
      });
    }
  };

  // UseEffect to run the FetchUserRooms(); funtion when the session is available or there is any changes in debouncedSearch or filter.
  useEffect(() => {
    if (!session?.user._id || document.visibilityState !== "visible") return;
    FetchUserRooms();
  }, [session?.user._id, debouncedSearch, filter]);

  // Funtion to Join a room with room ID.
  const handleJoinRoom = async () => {
    if (typeof joinRoomId === "string" && /^[a-f\d]{24}$/i.test(joinRoomId)) {
      const res = await fetch(`/api/room/getRoomById?roomId=${joinRoomId}`);
      const data = await res.json();
      if (!data) {
        alert("Room with this ID does not exists");
      }
      router.push(`/${joinRoomId}`);
    } else {
      alert("Room with this ID does not exists");
    }
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="p-8 rounded-2xl shadow-lg bg-white text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Access Restricted
          </h1>
          <p className="text-gray-600 mb-6">
            Please log in to access this page.
          </p>
          <Link
            href="/sign-in"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full justify-center items-center flex flex-col gap-12  bg-[#090920]">
      <div className="w-[80%] flex flex-col min-h-[90vh] mt-10">
        {/* top section */}
        <div className="w-full border-b-2 py-2 justify-between flex items-center  h-[10vh]">
          {/* Search Box */}
          <div className="w-full max-w-[300px]">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          {/* Filter */}
          <div className="flex gap-6 justify-end w-1/2 h-full p-2">
            <Popover>
              <PopoverTrigger className="text-white p-2 cursor-pointer rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out flex justify-center items-center">
                <IoFilter className="text-2xl" />
              </PopoverTrigger>

              <PopoverContent className="w-80 sm:w-96 p-5 rounded-2xl shadow-xl bg-[#1C1C27] border border-[#2A2A3B] text-[#EDEDED] space-y-6">
                {/* Language Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">
                    Filter by Language
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.values(editorConfigs).map((item) => (
                      <label
                        key={item.name}
                        className="flex items-center gap-2 cursor-pointer transition-all hover:opacity-90"
                      >
                        <Checkbox
                          checked={filter === item.name}
                          onCheckedChange={() => setFilterTerm(item.name)}
                          className="data-[state=checked]:bg-[#00F0B5] data-[state=checked]:border-[#00F0B5] transition-all"
                        />
                        <span className="text-sm capitalize">{item.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end">
                  <Button
                    onClick={() => setFilter("all")}
                    className="rounded-full px-4 py-2 bg-[#00F0B5] text-black hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                  >
                    Clear Filter
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col items-start h-[90vh] border-red-700">
          {/* Header Text */}
          <div className="w-full py-2 mt-2 flex justify-between items-start gap-2">
            <div className="w-1/2 flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-[#EDEDED]">
                {" "}
                <span className="capitalize ">{session?.user.userName}</span>s
                Rooms
              </h1>
              <p className="text-[#EDEDED]">Total Rooms - {rooms.length}</p>
            </div>
            <div className="w-1/2 flex justify-end items-center">
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div>
                      <Button2
                        loading={loading}
                        width="120px"
                        text="Create Room"
                      />
                    </div>
                  </DialogTrigger>

                  <DialogContent className="bg-[#1C1C27] text-[#EDEDED] border border-[#2A2A3B] rounded-2xl max-w-md w-full shadow-lg">
                    <DialogHeader className="mb-4">
                      <DialogTitle className="text-2xl font-semibold">
                        Create Room
                      </DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(createPrivateRoom)}
                        className="space-y-6"
                      >
                        {/* Room Name Field */}
                        <FormField
                          control={form.control}
                          name="roomName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm">
                                Room Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your room name"
                                  className="w-full px-4 py-2 bg-[#2A2A3B] border border-[#3C3C4D] text-[#EDEDED] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0B5] transition-all duration-200 ease-in-out"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Language Selector */}
                        <FormField
                          control={form.control}
                          name="codingLang"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm">
                                Select Language
                              </FormLabel>
                              <FormControl>
                                <select
                                  id="tech"
                                  name="tech"
                                  value={field.value}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  className="w-full px-4 py-2 bg-[#2A2A3B] border border-[#3C3C4D] text-[#EDEDED] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0B5] hover:border-[#00F0B5] transition-all duration-200 ease-in-out"
                                >
                                  <option value="" disabled>
                                    Choose a language
                                  </option>
                                  {Object.values(editorConfigs).map((item) => (
                                    <option key={item.name} value={item.name}>
                                      {/* <Image
                                        src={item.icon}
                                        width={10}
                                        height={10}
                                        alt={item.name}
                                      /> */}
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Submit Button */}
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-6 py-2 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out font-medium shadow-md cursor-pointer"
                          >
                            Create
                          </button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <Button2 text="Join Room" />
                    </div>
                  </PopoverTrigger>

                  <PopoverContent className="w-[320px] p-6 bg-[#1C1C27] border border-[#2A2A3B] rounded-2xl shadow-lg text-[#EDEDED]">
                    <div className="flex flex-col gap-6">
                      {/* Heading */}
                      <h1 className="text-2xl font-semibold tracking-tight">
                        Join a Room
                      </h1>

                      {/* Room ID Field */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="room-id"
                          className="text-sm font-medium text-[#EDEDED]"
                        >
                          Room Key
                        </label>
                        <Input
                          id="room-id"
                          placeholder="Enter your Room ID"
                          onChange={(e) => setjoinRoomId(e.target.value)}
                          className="w-full px-4 py-2 bg-[#2A2A3B] border border-[#3C3C4D] text-sm text-[#EDEDED] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0B5] transition-all duration-200 ease-in-out"
                        />
                        <p className="text-xs text-gray-400">
                          Ask the host for the room key to join.
                        </p>
                      </div>

                      {/* Join Button */}
                      <button
                        onClick={handleJoinRoom}
                        className="w-full px-4 py-2 rounded-full bg-[#00F0B5] text-black hover:bg-white hover:text-black transition-all duration-300 ease-in-out font-medium shadow-md"
                      >
                        Join Room
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* User Rooms */}
          <div className="rooms mt-6 flex flex-col gap-4 w-full h-full items-center  flex-wrap">
            {rooms.length > 0 ? (
              <div className="flex flex-wrap w-full  justify-center sm:justify-start items-center gap-8">
                {rooms.map((room) => (
                  <UserRooms
                    FetchUserRooms={FetchUserRooms}
                    key={room._id}
                    room={room}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-1/2 flex justify-center items-center">
                {fetching ? (
                  <Loader />
                ) : (
                  <h1 className="text-2xl font-semibold text-gray-500">
                    No Rooms Found
                  </h1>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
