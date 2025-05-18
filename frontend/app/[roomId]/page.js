"use client";
import { SocketContext } from "@/context/SocketContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CodeNavbar from "@/components/CodeNavbar";
import GenericEditor from "@/components/codeEditors/GenericEditor";

const Room = () => {
  const { data: session } = useSession();
  const params = useParams();
  const roomId = params.roomId;
  const socket = useContext(SocketContext);
  const [activeUsers, setActiveUsers] = useState([]);
  const userName = session?.user.userName || "TEST";
  const [room, setRoom] = useState([]);
  const [fileCodes, setFileCodes] = useState({
    html: "",
    css: "",
    js: "",
    python: "",
  });

  // Fetching the room data by roomId.
  useEffect(() => {
    const getRoomById = async () => {
      const res = await fetch(`/api/room/getRoomById?roomId=${roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setRoom(data);
    };

    if (roomId) {
      getRoomById();
    }
  }, [roomId]);

  // All the socket events of all the Languages are handled here.
  useEffect(() => {
    if (!socket) {
      console.log("⚠️ Socket not available yet...");
      return;
    }

    socket.emit("join_document", roomId, userName);

    socket.on("users-in-room", (users) => {
      setActiveUsers(users);
    });

    socket.on("changes", ({ code, file, lang }) => {
      if (lang === "webDev") {
        if (file === "html") setHtmlCode(code);
        else if (file === "css") setCssCode(code);
        else if (file === "js") setJsCode(code);
      }
    });

    return () => {
      socket.off("changes");
      socket.off("users-in-room");
    };
  }, [socket, roomId]);

  if (!roomId || roomId === "undefined") {
    return <div>No Room Available</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <CodeNavbar activeUsers={activeUsers} Room={room} />
      <div className="flex flex-col w-full h-full">
        {/* Tabs Bar */}
        {/* <div className="w-full h-10 bg-[#18181B] flex gap-0">
          <div className="border-2  w-20 text-white flex justify-center items-center">
            File
          </div>
        </div> */}
        {session ? (
          <GenericEditor
            session={session}
            socket={socket}
            roomId={roomId}
            codingLang={room.codingLang}
            fileCodes={fileCodes}
            setFileCodes={setFileCodes}
          />
        ) : (
          <h1>PLease log in to access this page</h1>
        )}
      </div>
    </div>
  );
};

export default Room;
