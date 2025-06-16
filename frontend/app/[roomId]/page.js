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
import DialogBox from "@/components/dialogBoxes/DialogBox";

const Room = () => {
  const { data: session } = useSession();
  const [lastSavedCode, setLastSavedCode] = useState("");
  const [compiledCode, setCompiledCode] = useState("");
  const [compileing, setCompileing] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [updateTime, setUpdateTime] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [theme, setTheme] = useState("dark");
  const [terminal, setTerminal] = useState(false);
  const [fileCodes, setFileCodes] = useState({
    html: "",
    css: "",
    js: "",
    python: "",
  });
  const [fontSize, setFontSize] = useState(14);
  const [room, setRoom] = useState({});
  const [owner, setOwner] = useState();
  const [live, setLive] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const themeMap = {
    dark: oneDark,
    GithubDark: githubDark,
    dracula: dracula,
    material: material,
    sublime: sublime,
  };
  const router = useRouter();
  const params = useParams();
  const { socket, connectSocket } = useContext(SocketContext);
  const userName = session?.user.userName || "TEST";
  const roomId = params.roomId;

  // Trigger socket connection when live mode is enabled
  useEffect(() => {
    if (live === "public") {
      connectSocket();
    } else {
      return;
    }
  }, [live]);

  useEffect(() => {
    if (socket && live === "public") {
      setOpenDialog(false);
      console.log("Dialog is now disabled");
    }
  }, [socket, live]);

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

  // Function For Compiling Code.
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
      const result = data.result;

      if (result.stderr) {
        setCompiledCode(result.stderr);
        setTerminal(true);
      } else {
        setCompiledCode(result.stdout || result.compile_output || "No output");
        setTerminal(true);
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
      setLive(data.isPublic);
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
  }, []);

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
  }, [lastSavedCode]);

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
    if (!socket) return;
    socket.emit("remove_user", {
      user,
      roomId,
    });
  };
  useEffect(() => {
    if (!socket) return;
    const handleUserRemoved = () => {
      alert("Room owner removed you from the room.");
      router.push("/");
    };

    socket.on("user_removed", handleUserRemoved);

    return () => {
      socket.off("user_removed", handleUserRemoved);
    };
  }, [router, socket]);

  // Save Shortcut for Windows and Mac
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

  // User removed by the owner.
  useEffect(() => {
    if (!socket) return;

    const handleForceExit = ({ reason }) => {
      alert(reason || "You were removed from the room.");
      router.push("/");
    };

    socket.on("force_exit", handleForceExit);

    return () => {
      socket.off("force_exit", handleForceExit);
    };
  }, [socket]);

  // Terminal State.
  const termialfunc = () => {
    if (terminal === true) {
      setTerminal(false);
    } else {
      setTerminal(true);
    }
    console.log(terminal);
  };

  // Function to switch Private and public status of room.
  const handleRoomStatus = async () => {
    if (live === "private") {
      const isLive = "public";
      try {
        const res = await fetch(
          `/api/room/updateRoomStatus?roomId=${roomId}&live=${isLive}`,
          {
            method: "POST",
          }
        );

        if (res) {
          setLive("public");
          setOpenDialog(true);
          console.log("Dilaog is now enabled");
          toast.success("Your Room is Public now.");
        }
      } catch (error) {
        console.log("Internal Error", error);
      }
    } else {
      const isLive = "private";
      try {
        const res = await fetch(
          `/api/room/updateRoomStatus?roomId=${roomId}&live=${isLive}`,
          {
            method: "POST",
          }
        );

        if (res) {
          setLive("private");
          socket.emit("clear_room", roomId);
          setActiveUsers([]);
          toast.success("Your Room is Private now.");
        }
      } catch (error) {
        console.log("Internal Error", error);
      }
    }
  };

  // Removing all the user from the room when the room is set to private.
  useEffect(() => {
    if (!socket) return;

    const handleForceExit = ({ reason }) => {
      alert(reason || "You were removed from the room.");
      router.push("/");
    };

    socket.on("clear_room", handleForceExit);

    return () => {
      socket.off("clear_room", handleForceExit);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleForceExit = ({ reason }) => {
      handleRoomStatus();
      router.push("/");
      toast.error(reason || "Room is now private");
    };

    socket.on("force_exit", handleForceExit);

    return () => {
      socket.off("force_exit", handleForceExit);
    };
  }, [socket]);

  if (!roomId || roomId === "undefined" || !session) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-black text-white text-2xl font-extrabold">
        No Room Available
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-black">
      <CodeNavbar
        live={live}
        compileing={compileing}
        setFontSize={setFontSize}
        fontSize={fontSize}
        RemoveUserFromRoom={RemoveUserFromRoom}
        CompileCode={CompileCode}
        session={session}
        room={room}
        activeUsers={activeUsers}
      />
      <div className="flex flex-col w-full h-full">
        {session ? (
          <GenericEditor
            themeMap={themeMap}
            theme={theme}
            SaveCodeToDatabase={SaveCodeToDatabase}
            socket={socket}
            roomId={roomId}
            activeUsers={activeUsers}
            room={room}
            codingLang={room.codingLang}
            termialfunc={termialfunc}
            fileCodes={fileCodes}
            setFileCodes={setFileCodes}
            compiledCode={compiledCode}
            fontSize={fontSize}
            setCursorPosition={setCursorPosition}
            terminal={terminal}
            openDialog={openDialog}
          />
        ) : (
          <h1 className="w-full h-full text-white flex justify-center items-center font-extrabold bg-black">
            PLease log in to access this page
          </h1>
        )}
        {session && (
          <div className="flex justify-center items-center h-10 bg-black text-lg text-white">
            <Taskbar
              room={room}
              session={session}
              SaveCodeToDatabase={SaveCodeToDatabase}
              hasUnsavedChanges={hasUnsavedChanges}
              termialfunc={termialfunc}
              theme={theme}
              setTheme={setTheme}
              activeUsers={activeUsers}
              cursorPosition={cursorPosition}
              terminal={terminal}
              updateTime={updateTime}
              live={live}
              handleRoomStatus={handleRoomStatus}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
