import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { editorConfigs } from "@/config/EditorConfig";
import Terminal from "./Terminal";
import DialogBox from "../dialogBoxes/DialogBox";
import ConformationBox from "../dialogBoxes/ConformationBox";
import JoinDeniedBox from "../dialogBoxes/JoinDeniedBox";
import WaitingBox from "../dialogBoxes/Waiting";
import Noowner from "../dialogBoxes/Noowner";
import OwnerRemovedDialog from "../dialogBoxes/OwnerRemovedDialog";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import { object } from "zod";

const GenericEditor = ({
  socket,
  roomId,
  codingLang,
  themeMap,
  room,
  UserID,

  fileCodes,
  setFileCodes,
  compiledCode,
  fontSize,
  theme,
  setCursorPosition,
  openDialog,
  joinRequest,
  handleResponse,
  setJoinRequest,
  handleJoinReq,
  setJoindenied,
  joindenied,
  noOwnerDialog,
  ownerRemovedDialog,
}) => {
  const [tab, setTab] = useState("html");

  const handleCodeChange = (value, file, viewUpdate) => {
    if (fileCodes[file] === value) return;

    // const updated = { ...fileCodes, [file]: value };
    // setFileCodes(updated);

    setFileCodes((prev) => ({
      ...prev,
      [file]: value,
    }));

    if (socket) {
      socket.emit("code-change", {
        roomId: roomId,
        code: value,
        file,
        lang: codingLang,
      });
    } else {
      return;
    }
  };

  // Cursor Position
  // const handleUpdate = (viewUpdate) => {
  //   const view = viewUpdate.view;
  //   const pos = view.state.selection.main.head;
  //   const lineInfo = view.state.doc.lineAt(pos);
  //   const line = lineInfo.number;
  //   const column = pos - lineInfo.from + 1;

  //   setCursorPosition((prev) => {
  //     if (prev?.line === line && prev?.column === column) return prev;
  //     return { line, column };
  //   });
  // };

  // Handiling the incoming Change
  useEffect(() => {
    if (!socket) return;
    const handleIncomingChange = ({ file, code }) => {
      setFileCodes((prev) => ({
        ...prev,
        [file]: code,
      }));
    };

    socket.on("changes", handleIncomingChange);

    return () => {
      socket.off("changes", handleIncomingChange);
    };
  }, []);

  const renderEditor = () => {
    const [key, config] =
      Object.entries(editorConfigs).find(
        ([, config]) => config.language === codingLang && tab === config.render
      ) || [];

    if (!config) return null;

    return (
      <div key={key} className="w-full h-full">
        <CodeMirror
          value={fileCodes[key]}
          height="100%"
          width="100%"
          extensions={[config.extension]}
          onChange={(value) => {
            handleCodeChange(value, key);
          }}
          theme={themeMap[theme]}
          className="w-full h-full"
          style={{ fontSize: `${fontSize}px` }}
        />
      </div>
    );
  };

  return (
    <div className="flex relative w-full h-full overflow-hidden">
      {/* Code Sidebar */}
      <div className="h-full w-[60px]  border-r border-[#333348] flex flex-col items-center py-4 space-y-4 shadow-md">
        {/* Top Icon */}
        <Image
          src="/codeIcons.svg"
          width={28}
          height={28}
          alt="Code Icon"
          className="opacity-90"
        />

        {/* Divider */}
        <div className="w-8 border-b border-gray-600" />

        {/* Language Icons */}
        {[
          { name: "html", icon: "/lang Icons/HTML icon.svg" },
          { name: "css", icon: "/lang Icons/css icon.svg" },
          { name: "js", icon: "/lang Icons/javascript Icon.svg" },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => setTab(item.name)}
            className={`group cursor-pointer w-10 h-10 flex items-center justify-center rounded-md transition-all duration-200 
        ${
          tab === item.name
            ? "bg-[#7C3AED]/20 border border-[#7C3AED]"
            : "hover:bg-white/10"
        }`}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={24}
              height={24}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </button>
        ))}
      </div>

      <ResizablePanelGroup direction="horizontal">
        {/* Code Editor */}
        <ResizablePanel>
          <div className="w-full h-full flex flex-col">
            <div className="flex w-full h-full flex-col gap-1 overflow-y-auto bg-zinc-900">
              {openDialog === true && <DialogBox />}

              {room.createdBy === UserID && (
                <ConformationBox
                  setJoinRequest={setJoinRequest}
                  handleResponse={handleResponse}
                  joinRequest={joinRequest}
                />
              )}
              {room.createdBy !== UserID && (
                <JoinDeniedBox
                  setJoindenied={setJoindenied}
                  joindenied={joindenied}
                  handleJoinReq={handleJoinReq}
                />
              )}

              {room.createdBy !== UserID && (
                <Noowner noOwnerDialog={noOwnerDialog} />
              )}
              {room.createdBy !== UserID && (
                <OwnerRemovedDialog ownerRemovedDialog={ownerRemovedDialog} />
              )}

              {/* {waiting && room.createdBy !== UserID && <WaitingBox />} */}

              <div className="flex-grow overflow-auto">{renderEditor()}</div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />
        {/* Web dev Output */}
        <ResizablePanel>
          {codingLang === "webDev" && (
            <div className="w-full h-full bg-white">
              {/* Output Preview for WebDev */}
              <iframe
                className="border-2 border-black"
                srcDoc={`<html><head><style>${fileCodes.css}</style></head><body>${fileCodes.html}<script>${fileCodes.js}<\/script></body></html>`}
                sandbox="allow-scripts"
                width="100%"
                height="100%"
              />
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default GenericEditor;

{
  /* Will be usefull in  future */
  /* {terminal === true && (
        <Terminal
          termialfunc={termialfunc}
          room={room}
          compiledCode={compiledCode}
          dragBoundsRef={terminalWrapperRef}
          mode={mode}
          setMode={setMode}
        />
      )} */
}
