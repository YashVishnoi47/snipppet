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
import { editorConfigs } from "@/config/EditorConfig";
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

  // Function To Fetch User Rooms
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

    if (res.ok) {
      await FetchUserRooms();
      setLoading(false);
    } else {
      alert("Error creating room");
      setLoading(false);
    }
  };

  // UseEffect to run the FetchUserRooms(); funtion when the session is available or there is any changes in debouncedSearch or filter.
  useEffect(() => {
    FetchUserRooms();
  }, [session, debouncedSearch, filter]);

  // Funtion to Join a room with room ID.
  const handleJoinRoom = async () => {
    if (!joinRoomId) {
      alert("Please enter a room ID to join.");
      return;
    }

    router.push(`/${joinRoomId}`);
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
    <div className="w-full h-full justify-center items-center flex flex-col gap-12 bg-[#210426]">
      <div className="w-[80%] flex flex-col min-h-[90vh] mt-10">
        {/* top section */}
        <div className="w-full border-b-2 py-2 justify-between flex items-center  h-[10vh]">
          {/* Search Box */}
          <div className="w-full max-w-[300px]">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          {/* Filter */}
          <div className="flex gap-6 justify-end w-1/2 h-full p-2">
            (
            <Popover>
              <PopoverTrigger className="text-white p-2 cursor-pointer rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out flex justify-center items-center">
                <IoFilter className="text-2xl" />
              </PopoverTrigger>

              <PopoverContent className="w-80 sm:w-96 p-4 rounded-2xl shadow-lg space-y-6">
                {/* Languge Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Language</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(editorConfigs).map((item) => (
                      <label
                        key={item.name}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={filter === item.name}
                          onCheckedChange={() => setFilterTerm(item.name)}
                        />
                        <span className="text-sm">{item.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end gap-4">
                  <Button onClick={() => setFilter("all")}>Clear Filter</Button>
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
                        width={"120px"}
                        text={"Create Room"}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className={`font-semibold text-2xl`}>
                        Create Room
                      </DialogTitle>
                      <DialogDescription asChild>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(createPrivateRoom)}
                            className="space-y-8"
                          >
                            {/* Room Name */}
                            <FormField
                              control={form.control}
                              name="roomName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>RoomName</FormLabel>
                                  <FormControl>
                                    <Input placeholder="RoomName" {...field} />
                                  </FormControl>
                                  <FormDescription></FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Language */}
                            <FormField
                              control={form.control}
                              name="codingLang"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Select Room Language</FormLabel>
                                  <FormControl>
                                    <select
                                      value={field.value}
                                      onChange={(e) =>
                                        field.onChange(e.target.value)
                                      }
                                      id="tech"
                                      name="tech"
                                    >
                                      {Object.values(editorConfigs).map(
                                        (item) => (
                                          <option
                                            key={item.name}
                                            value={item.name}
                                          >
                                            {item.name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </FormControl>
                                  <FormDescription></FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <button
                              className="border-2 px-6 py-2 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer flex justify-center items-center gap-1"
                              type="submit"
                            >
                              {" "}
                              Create
                            </button>
                          </form>
                        </Form>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <Button2 text={"Join Room"} />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col gap-6 p-6 ">
                      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Join a Room
                      </h1>

                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="room-id"
                          className="text-sm font-medium text-gray-700"
                        >
                          Room Key
                        </label>
                        <Input
                          onChange={(e) => {
                            setjoinRoomId(e.target.value);
                          }}
                          id="room-id"
                          placeholder="Enter your Room ID"
                          className="text-sm"
                        />
                        <p className="text-xs text-gray-500">
                          Ask the host for the room key to join.
                        </p>
                      </div>

                      <button
                        onClick={handleJoinRoom}
                        text={"Join Room"}
                        className="w-full border-2 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out"
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
                  <UserRooms key={room._id} room={room} />
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
