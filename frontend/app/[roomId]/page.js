"use client";
import { SocketContext } from "@/context/SocketContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
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
  const [lastSavedCode, setLastSavedCode] = useState("");
  const [compiledCode, setCompiledCode] = useState("");
  const [compileing, setCompileing] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [terminal, setTerminal] = useState(false);
  const [fileCodes, setFileCodes] = useState({
    html: "",
    css: "",
    js: "",
    python: "",
  });

  const [fontSize, setFontSize] = useState(14);
  const [room, setRoom] = useState({});
  const [theme, setTheme] = useState("dark");
  const [owner, setOwner] = useState();
  const [live, setLive] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [joinRequest, setJoinRequest] = useState(null);
  const [joindenied, setJoindenied] = useState(false);
  const [noOwnerDialog, setNoOwnerDialog] = useState(false);
  const [ownerRemovedDialog, setownerRemovedDialog] = useState(false);

  const { socket, connectSocket } = useContext(SocketContext);
  const userName = session?.user.userName || "TEST";
  const UserID = session?.user._id;
  const roomId = params.roomId;

  const themeMap = {
    dark: oneDark,
    GithubDark: githubDark,
    dracula: dracula,
    material: material,
    sublime: sublime,
  };

  // Setting Theme
  useEffect(() => {
    if (!room) return;
    if (room?.roomSettings?.theme) {
      setTheme(room.roomSettings.theme);
    }
  }, [room]);

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
    }
  }, [socket, live]);

  // Function to save the code in the Database
  const SaveCodeToDatabase = async () => {
    // const editorKey = Object.entries(editorConfigs).find(
    //   ([key, config]) => config.language === room.codingLang
    // )?.[0];

    const editorKey2 = Object.entries(editorConfigs).filter(
      ([key, config]) => config.language === room.codingLang
    );

    if (!editorKey2) {
      console.error("Keys not found.");
      return;
    }

    // const codeToSave = fileCodes[editorKey];
    const htmlcodeToSave = fileCodes[editorKey2?.[0]?.[0]];
    const csscodeToSave = fileCodes[editorKey2?.[1]?.[0]];
    const jscodeToSave = fileCodes[editorKey2?.[2]?.[0]];
    const res = await fetch("api/room/saveCodeToDatabase", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        roomId: roomId,
        // roomCode: codeToSave,
        htmlCode: htmlcodeToSave,
        cssCode: csscodeToSave,
        jsCode: jscodeToSave,
      }),
    });

    const data = await res.json();
    if (data.error) {
      console.error("Error saving code to database.", data.error);
    } else {
      setLastSavedCode(htmlcodeToSave);
      toast.success(data.message);
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
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     if (hasUnsavedChanges()) {
  //       e.preventDefault();
  //       e.returnValue = "";
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [fileCodes, lastSavedCode, room.codingLang]);

  // Function For Compiling Code.
  // const CompileCode = async () => {
  //   setCompileing(true);
  //   try {
  //     const editorKey = Object.entries(editorConfigs).find(
  //       ([key, config]) => config.language === room.codingLang
  //     )?.[0];

  //     if (!editorKey) {
  //       console.error("No editor-key found for this coding language.");
  //       return;
  //     }
  //     const code = fileCodes[editorKey];
  //     const config = editorConfigs[editorKey];
  //     const languageId = config.language_id;

  //     const res = await fetch("/api/compile", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         source_code: code,
  //         language_id: languageId,
  //       }),
  //     });

  //     const data = await res.json();
  //     const result = data.result;

  //     if (result.stderr) {
  //       setCompiledCode(result.stderr);
  //       setTerminal(true);
  //     } else {
  //       setCompiledCode(result.stdout || result.compile_output || "No output");
  //       setTerminal(true);
  //     }

  //     setCompileing(false);
  //   } catch (error) {
  //     console.log("Error Compiling Code from Code Editor", error);
  //     setCompileing(false);
  //   }
  // };

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
      if (data?.htmlCode || data?.cssCode || data?.jsCode) {
        const editorKey = Object.entries(editorConfigs).filter(
          ([key, config]) => config.language === data.codingLang
        );

        if (editorKey) {
          setFileCodes((prev) => ({
            ...prev,
            [editorKey?.[0]?.[0]]: data.htmlCode,
            [editorKey?.[1]?.[0]]: data.cssCode,
            [editorKey?.[2]?.[0]]: data.jsCode,
          }));
        }
      }
    };

    if (roomId) {
      getRoomById();
    }
  }, []);

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
          console.log(data.error || data.message);
        }
      } catch (err) {
        console.error("Error fetching room owner:", err);
      }
    };

    getRoomOwner();
  }, [room.createdBy]);

  // Function for Emiting join Request
  const handleResponse = (accepted) => {
    if (!joinRequest) return;

    socket.emit("join_request", {
      roomId: joinRequest.roomId,
      user: {
        name: joinRequest.user.name,
        userId: joinRequest.user.userId,
        socketId: joinRequest.user.socketId,
      },
      accepted,
    });

    // if (accepted) {
    //   setWaiting(true);
    // }
    setJoinRequest(null);
  };

  // function for handling join Denies.
  const handleJoinReq = () => {
    router.push("/");
  };

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
      setJoinRequest({ user, roomId });
      // setWaiting(true);
    });

    socket.on("join_denied", () => {
      setJoindenied(true);
      // setWaiting(false);
    });

    socket.on("no_Owner", () => {
      alert("Owner is not in the room you cannot join.");
      setNoOwnerDialog(true);
      router.push("/");
    });

    return () => {
      socket.off("join_request");
      socket.off("join_denied");
      socket.off("no_Owner");
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
      setownerRemovedDialog(true);
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
      setownerRemovedDialog(true);
    };

    socket.on("force_exit", handleForceExit);

    return () => {
      socket.off("force_exit", handleForceExit);
    };
  }, [socket]);

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
      // router.push("/");
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
    <div className="flex flex-col relative w-full h-screen bg-black">
      <div className="flex flex-col w-full h-full">
        {session ? (
          <GenericEditor
            joinRequest={joinRequest}
            setJoindenied={setJoindenied}
            joindenied={joindenied}
            setJoinRequest={setJoinRequest}
            handleResponse={handleResponse}
            themeMap={themeMap}
            theme={theme}
            SaveCodeToDatabase={SaveCodeToDatabase}
            socket={socket}
            roomId={roomId}
            activeUsers={activeUsers}
            room={room}
            codingLang={room.codingLang}
            // termialfunc={termialfunc}
            // terminal={terminal}
            fileCodes={fileCodes}
            setFileCodes={setFileCodes}
            compiledCode={compiledCode}
            fontSize={fontSize}
            setCursorPosition={setCursorPosition}
            openDialog={openDialog}
            handleJoinReq={handleJoinReq}
            UserID={UserID}
            noOwnerDialog={noOwnerDialog}
            ownerRemovedDialog={ownerRemovedDialog}
          />
        ) : (
          <h1 className="w-full h-full text-white flex justify-center items-center font-extrabold bg-black">
            PLease log in to access this page
          </h1>
        )}
        {session && (
          <>
            <div className="flex justify-center items-center h-10 bg-black text-lg text-white">
              <Taskbar
                room={room}
                session={session}
                SaveCodeToDatabase={SaveCodeToDatabase}
                hasUnsavedChanges={hasUnsavedChanges}
                // termialfunc={termialfunc}
                setFontSize={setFontSize}
                fontSize={fontSize}
                theme={theme}
                setTheme={setTheme}
                activeUsers={activeUsers}
                cursorPosition={cursorPosition}
                terminal={terminal}
                live={live}
                handleRoomStatus={handleRoomStatus}
                RemoveUserFromRoom={RemoveUserFromRoom}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Room;

{
  // Terminal State.
  // const termialfunc = () => {
  //   if (terminal === true) {
  //     setTerminal(false);
  //   } else {
  //     setTerminal(true);
  //   }
  // };
}
