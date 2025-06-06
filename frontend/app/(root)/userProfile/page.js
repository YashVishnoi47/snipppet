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
import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";

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
        // alert("Room with this ID does not exists");
        toast.error("Room not found", {
          description: "Room with this ID does not exists.",
        });
      }
      router.push(`/${joinRoomId}`);
    } else {
      toast.error("Room not found", {
        description: "Room with this ID does not exists.",
      });
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
    <div className="w-full h-full justify-center items-center flex flex-col gap-12  bg-[#000]">
      <Navbar />
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
              <PopoverTrigger
                className="
      text-[#E0E0E0]
      p-2
      cursor-pointer
      rounded-full
      hover:bg-[#333348]
      hover:text-white
      transition-all
      duration-300
      ease-in-out
      flex
      justify-center
      items-center
    "
              >
                <IoFilter className="text-2xl" />
              </PopoverTrigger>

              <PopoverContent
                className="
      w-80
      sm:w-96
      p-5
      rounded-2xl
      shadow-xl
      bg-[#1C1C27]
      border
      border-[#333348]
      text-[#E0E0E0]
      space-y-6
    "
              >
                {/* Language Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#E0E0E0]">
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
                          className="
                data-[state=checked]:bg-[#7C3AED]
                data-[state=checked]:border-[#7C3AED]
                transition-all
              "
                        />
                        <span className="text-sm capitalize text-[#E0E0E0]">
                          {item.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end">
                  <Button
                    onClick={() => setFilter("all")}
                    className="
          rounded-full
          px-4
          py-2
          bg-[#7C3AED]
          text-white
          hover:bg-[#5B21B6]
          transition-all
          duration-300
          ease-in-out
        "
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
            <div className="w-1/2 flex flex-col gap-1 sm:gap-2">
              <h1 className="text-4xl sm:text-3xl font-semibold capitalize tracking-tight text-[#E0E0E0]">
                {`${session?.user.userName}'s Rooms`}
              </h1>
              <p className="text-sm text-[#A3A3A3]">
                Total Rooms: {rooms.length}
              </p>
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
                        className="bg-[#2F2F38] text-[#E0E0E0] hover:bg-[#333348] hover:text-white transition-all duration-300 ease-in-out"
                      />
                    </div>
                  </DialogTrigger>

                  <DialogContent className="bg-[#1C1C27] text-[#E0E0E0] border border-[#333348] rounded-2xl max-w-md w-full shadow-lg">
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
                              <FormLabel className="text-sm text-[#E0E0E0]">
                                Room Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your room name"
                                  className=" w-full px-4 py-2 bg-[#2A2A3B] border border-[#3C3C4D] text-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all duration-200 ease-in-out"
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
                              <FormLabel className="text-sm text-[#E0E0E0]">
                                Select Language
                              </FormLabel>
                              <FormControl>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="w-full bg-[#2F2F38] border border-[#444459] text-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED] hover:border-[#7C3AED] transition-all duration-200 ease-in-out">
                                    <SelectValue placeholder="Choose a language" />
                                  </SelectTrigger>

                                  <SelectContent className="bg-[#2F2F38] text-[#E0E0E0] border border-[#444459]">
                                    {Object.values(editorConfigs).map(
                                      (item) => (
                                        <SelectItem
                                          key={item.name}
                                          value={item.name}
                                          className=" px-4 py-2 rounded-lg hover:bg-[#333348] focus:text-white focus:bg-[#7C3AED] data-[state=checked]:bg-[#7C3AED] data-[state=checked]:text-white transition-colors duration-150 ease-in-out"
                                        >
                                          {item.name}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Submit Button */}
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className=" px-6 py-2 rounded-full bg-[#7C3AED] text-white hover:bg-[#5B21B6] transition-all duration-300 ease-in-out font-medium shadow-md cursor-pointer"
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
                      <Button2
                        text="Join Room"
                        className=" bg-[#2F2F38] text-[#E0E0E0] hover:bg-[#333348] hover:text-white transition-all duration-300 ease-in-out"
                      />
                    </div>
                  </PopoverTrigger>

                  <PopoverContent className="w-[320px] p-6 bg-[#1C1C27] border border-[#333348] rounded-2xl shadow-lg text-[#E0E0E0]">
                    <div className="flex flex-col gap-6">
                      {/* Heading */}
                      <h1 className="text-2xl font-semibold tracking-tight">
                        Join a Room
                      </h1>

                      {/* Room ID Field */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="room-id"
                          className="text-sm font-medium text-[#E0E0E0]"
                        >
                          Room Key
                        </label>
                        <Input
                          id="room-id"
                          placeholder="Enter your Room ID"
                          onChange={(e) => setjoinRoomId(e.target.value)}
                          className=" w-full px-4 py-2 bg-[#2A2A3B] border border-[#3C3C4D] text-sm text-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all duration-200 ease-in-out"
                        />
                        <p className="text-xs text-[#6E6E7E]">
                          Ask the host for the room key to join.
                        </p>
                      </div>

                      {/* Join Button */}
                      <button
                        onClick={handleJoinRoom}
                        className="w-full px-4 py-2 rounded-full bg-[#7C3AED] text-white hover:bg-[#5B21B6] transition-all duration-300 ease-in-out font-medium shadow-md"
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
