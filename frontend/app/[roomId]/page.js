"use client";
import { SocketContext } from "@/context/SocketContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CodeNavbar from "@/components/CodeNavbar";
import GenericEditor from "@/components/codeEditors/GenericEditor";
import { editorConfigs } from "@/config/EditorConfig";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Room = () => {
  const { data: session } = useSession();
  const params = useParams();
  const roomId = params.roomId;
  const socket = useContext(SocketContext);
  const [activeUsers, setActiveUsers] = useState([]);
  const userName = session?.user.userName || "TEST";
  const [room, setRoom] = useState([]);
  const [compileing, setCompileing] = useState(false);
  const [compiledCode, setCompiledCode] = useState("");
  const [lastSavedCode, setLastSavedCode] = useState("");
  const [fileCodes, setFileCodes] = useState({
    html: "",
    css: "",
    js: "",
    python: "",
  });

  // Function to save the code in the Database
  const SaveCodeToDatabase = async () => {
    const editorKey = Object.entries(editorConfigs).find(
      ([key, config]) => config.language === room.codingLang
    )?.[0];

    if (!editorKey) {
      console.error("No editor found for this coding language.");
      return;
    }

    const codeToSave = fileCodes[editorKey];
    const res = await fetch("api/room/saveCodeToDatabase", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        roomId: roomId,
        roomCode: codeToSave,
      }),
    });
    const data = await res.json();
    if (data.error) {
      console.error("Error saving code", data.error);
    } else {
      console.log("Code saved Successfully", data.message);
      setLastSavedCode(codeToSave);
      toast.success("Code saved!");
    }
  };

  // Function returning usSaved changes
  const hasUnsavedChanges = () => {
    const editorKey = Object.entries(editorConfigs).find(
      ([key, config]) => config.language === room.codingLang
    )?.[0];
    if (!editorKey) return false;
    return fileCodes[editorKey] !== lastSavedCode;
  };

  // Stoping the user to leave the room if the changes are not saved
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [fileCodes, lastSavedCode, room.codingLang]);

  // Function For Compiling Code
  const CompileCode = async () => {
    setCompileing(true);
    try {
      const editorKey = Object.entries(editorConfigs).find(
        ([key, config]) => config.language === room.codingLang
      )?.[0];

      if (!editorKey) {
        console.error("No editor-key found for this coding language.");
        return;
      }
      const code = fileCodes[editorKey];
      console.log(code);
      const config = editorConfigs[editorKey];
      const languageId = config.language_id;

      const res = await fetch("/api/compile", {
        method: "POST",
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
        }),
      });

      const data = await res.json();
      console.log(data);
      const result = data.result;

      if (result.stderr) {
        setCompiledCode(result.stderr);
      } else {
        setCompiledCode(result.stdout || result.compile_output || "No output");
      }

      setCompileing(false);
    } catch (error) {
      console.log("Error Compiling Code from Code Editor", error);
      setCompileing(false);
    }
  };

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
      if (data?.roomCode) {
        const editorKey = Object.entries(editorConfigs).find(
          ([key, config]) => config.language === data.codingLang
        )?.[0];

        if (editorKey) {
          setFileCodes((prev) => ({
            ...prev,
            [editorKey]: data.roomCode,
          }));
        }
      }
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

  // Save Shortcut for Windows or Mac
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isSaveShortcut =
        (isMac && e.metaKey && e.key === "s") ||
        (!isMac && e.ctrlKey && e.key === "s");

      if (isSaveShortcut) {
        e.preventDefault();
        SaveCodeToDatabase();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fileCodes, room.codingLang]);

  if (!roomId || roomId === "undefined") {
    return <div>No Room Available</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <CodeNavbar
        hasUnsavedChanges={hasUnsavedChanges}
        compileing={compileing}
        CompileCode={CompileCode}
        session={session}
        SaveCodeToDatabase={SaveCodeToDatabase}
        activeUsers={activeUsers}
        Room={room}
      />
      <div className="flex flex-col w-full h-full">
        {session ? (
          <GenericEditor
            SaveCodeToDatabase={SaveCodeToDatabase}
            socket={socket}
            roomId={roomId}
            codingLang={room.codingLang}
            fileCodes={fileCodes}
            setFileCodes={setFileCodes}
          />
        ) : (
          <h1>PLease log in to access this page</h1>
        )}

        <Button className="border-2 flex justify-center items-center border-black h-20 bg-black text-lg text-white">
          {compiledCode && <p>{compiledCode}</p>}
        </Button>
      </div>
    </div>
  );
};

export default Room;
