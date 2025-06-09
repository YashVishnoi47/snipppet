import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { editorConfigs } from "@/config/EditorConfig";

const GenericEditor = ({
  socket,
  roomId,
  codingLang,
  fileCodes,
  setFileCodes,
  fontSizes,
  theme,
  themeMap,
  setCursorPosition
}) => {
  const handleCodeChange = (value, file, viewUpdate) => {
    const updated = { ...fileCodes, [file]: value };
    setFileCodes(updated);

    socket.emit("code-change", {
      roomId: roomId,
      code: value,
      file,
      lang: codingLang,
    });
  };


  // Cursor Position
  const handleUpdate = (viewUpdate) => {
    const view = viewUpdate.view;
    const pos = view.state.selection.main.head;
    const lineInfo = view.state.doc.lineAt(pos);
    const line = lineInfo.number;
    const column = pos - lineInfo.from + 1;

    setCursorPosition((prev) => {
      if (prev.line !== line || prev.column !== column) {
        return { line, column };
      }
      return prev;
    });
  };
  // Handiling the incoming Change
  useEffect(() => {
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
    return Object.entries(editorConfigs)
      .filter(([key, config]) => config.language === codingLang)
      .map(([key, config]) => (
        <div key={key} className=" w-full h-full">
          <CodeMirror
            value={fileCodes[key]}
            height="100%"
            width="100%"
            extensions={[config.extension]}
            onChange={(value) => {
              handleCodeChange(value, key);
            }}
            onUpdate={handleUpdate}
            theme={themeMap[theme]}
            className={`w-full h-[100%] text-[${fontSizes}]`}
            style={{ fontSize: `${fontSizes}px` }}
          />
        </div>
      ));
  };

  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full flex flex-col">
        <div className="flex w-full h-full overflow-auto bg-zinc-900 ">
          {renderEditor()}
        </div>
      </div>
      {codingLang === "webDev" && (
        <div className="w-1/2 bg-white">
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
    </div>
  );
};

export default GenericEditor;
