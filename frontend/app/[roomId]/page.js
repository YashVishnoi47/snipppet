"use client";
import { SocketContext } from "@/context/SocketContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CodeNavbar from "@/components/CodeNavbar";
import GenericEditor from "@/components/codeEditorComponents/GenericEditor";
import { editorConfigs } from "@/config/EditorConfig";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubDark } from "@uiw/codemirror-theme-github";
import { oneDark } from "@codemirror/theme-one-dark";
import { material } from "@uiw/codemirror-theme-material";
import { sublime } from "@uiw/codemirror-theme-sublime";
import Taskbar from "@/components/codeEditorComponents/Taskbar";

const Room = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId;
  const [lastSavedCode, setLastSavedCode] = useState("");
  const [compiledCode, setCompiledCode] = useState("");
  const [compileing, setCompileing] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const userName = session?.user.userName || "TEST";
  const socket = useContext(SocketContext);
  const [room, setRoom] = useState({});
  const [owner, setOwner] = useState();
  const [theme, setTheme] = useState("dark");
  const [updateTime, setUpdateTime] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const themeMap = {
    dark: oneDark,
    GithubDark: githubDark,
    dracula: dracula,
    material: material,
    sublime: sublime,
  };
  const [fontSize, setFontSize] = useState(14);
  // const [load, setLoad] = useState(false);
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
  }, [socket]);

  // Fetching the room latest Update time by roomId.
  useEffect(() => {
    const getRoomUpdateById = async () => {
      const res = await fetch(`/api/room/getRoomUpdateById?roomId=${roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data) {
        setUpdateTime(data.updatedAt);
      }
    };

    if (roomId) {
      getRoomUpdateById();
    }
  }, [socket, lastSavedCode]);

  // Fetching the Owner of the room
  useEffect(() => {
    if (!room || !room.createdBy) return;
    const getRoomOwner = async () => {
      try {
        const res = await fetch(
          `/api/room/fetchRoomOwnerDetails?ownerID=${room.createdBy}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setOwner(data);
        } else {
          console.log("Owner not found");
        }
      } catch (err) {
        console.error("Error fetching room owner:", err);
      }
    };

    getRoomOwner();
  }, [room.createdBy]);

  // All the socket events of all the Languages are handled here.
  useEffect(() => {
    const ownerID = room.createdBy;

    if (!socket || !ownerID || !owner) return;

    socket.emit("join_document", {
      roomId,
      username: userName,
      userId: session?.user._id,
      ownerId: ownerID,
      owner,
    });

    socket.on("users-in-room", (users) => {
      setActiveUsers(users);
    });

    socket.on("changes", ({ code, file, lang }) => {
      setFileCodes((prev) => ({
        ...prev,
        [file]: code,
      }));
    });

    return () => {
      socket.off("changes");
      socket.off("users-in-room");
    };
  }, [socket, room, owner]);

  // Socket events for join request
  useEffect(() => {
    if (!socket) return;

    socket.on("join_request", ({ user, roomId }) => {
      const confirmJoin = window.confirm(
        `${user.name} wants to join the room.`
      );
      socket.emit("join_request", {
        roomId,
        user: {
          name: user.name,
          userId: user.userId,
          socketId: user.socketId,
        },
        accepted: confirmJoin,
      });
    });

    // socket.on("load_page", ({ load }) => {
    //   if (load) {
    //     setLoad(load);
    //   }
    // });

    socket.on("join_denied", () => {
      alert("Room owner denied your join request.");
      router.push("/");
    });

    socket.on("no_Owner", () => {
      alert("Owner is not in the room you canot join.");
      router.push("/");
    });

    return () => {
      socket.off("join_request");
      socket.off("join_denied");
    };
  }, [socket]);

  // Remove user from the room
  const RemoveUserFromRoom = async (user) => {
    console.log(user);
    socket.emit("remove_user", {
      user,
      roomId,
    });
  };
  useEffect(() => {
    const handleUserRemoved = () => {
      alert("Room owner removed you from the room.");
      router.push("/");
    };

    socket.on("user_removed", handleUserRemoved);

    return () => {
      socket.off("user_removed", handleUserRemoved);
    };
  }, [router, socket]);

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

  if (!roomId || roomId === "undefined" || !session) {
    return <div>No Room Available</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen bg-black">
      <CodeNavbar
        fontSize={fontSize}
        setFontSize={setFontSize}
        RemoveUserFromRoom={RemoveUserFromRoom}
        compileing={compileing}
        CompileCode={CompileCode}
        session={session}
        activeUsers={activeUsers}
        Room={room}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="flex flex-col w-full h-full">
        {session ? (
          <GenericEditor
            setCursorPosition={setCursorPosition}
            themeMap={themeMap}
            fontSizes={fontSize}
            SaveCodeToDatabase={SaveCodeToDatabase}
            socket={socket}
            roomId={roomId}
            codingLang={room.codingLang}
            fileCodes={fileCodes}
            setFileCodes={setFileCodes}
            theme={theme}
          />
        ) : (
          <h1>PLease log in to access this page</h1>
        )}
        {session && (
          <div className="flex justify-center items-center h-10 bg-black text-lg text-white">
            {/* {compiledCode && <p>{compiledCode}</p>} */}
            <Taskbar
              room={room}
              session={session}
              theme={theme}
              activeUsers={activeUsers}
              cursorPosition={cursorPosition}
              updateTime={updateTime}
              SaveCodeToDatabase={SaveCodeToDatabase}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
