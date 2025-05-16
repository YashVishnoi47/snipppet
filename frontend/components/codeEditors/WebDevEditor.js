"use client";
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";

const WebDevEditor = ({
  socket,
  roomId,
  htmlCode,
  cssCode,
  jsCode,
  setHtmlCode,
  setCssCode,
  setJsCode,
  setSrcDoc,
  srcDoc,
}) => {
  //   Debounce Function to update the srcDoc after a delay.
  useEffect(() => {
    const timeout = setTimeout(() => {
      const combined = `
            <html>
              <head>
                <style>${cssCode}</style>
              </head>
              <body>
                ${htmlCode}
                <script>${jsCode}<\/script>
              </body>
            </html>
          `;
      setSrcDoc(combined);
    }, 300);
    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  // This function is called when the code in the editor changes.
  const handleHTMLCodeChange = (value, viewUpdate) => {
    setHtmlCode(value);
    socket.emit("code-change", {
      roomId: roomId,
      code: value,
      file: "html",
      lang: "webDev",
    });
  };

  const handleCSSCodeChange = (value, viewUpdate) => {
    setCssCode(value);
    socket.emit("code-change", {
      roomId: roomId,
      code: value,
      file: "css",
      lang: "webDev",
    });
  };

  const handleJSCodeChange = (value, viewUpdate) => {
    setJsCode(value);
    socket.emit("code-change", {
      roomId: roomId,
      code: value,
      file: "js",
      lang: "webDev",
    });
  };

  const [ActiveTab, setActiveTab] = useState("html");

  return (
    <div className="flex justify-between w-full h-full">
      {/*Live Code*/}
      <div className="flex flex-col justify-end w-1/2 h-full  bg-[#1E1E1E]">
        {/* Tab Swtich */}
        <div className="w-full flex gap- justify-start items-start bg-[#282c39]">
          {/* HTML */}
          <button
            type="button"
            className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
              ActiveTab === "html"
                ? "border-red-500 text-red-600 bg-gray-700"
                : "border-transparent bg-[#3C3C3C] text-[#D4D4D4] hover:text-red-600 hover:border-red-500"
            }`}
            onClick={() => setActiveTab("html")}
          >
            <FaHtml5 />
            HTML
          </button>

          {/* CSS */}
          <button
            type="button"
            className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
              ActiveTab === "css"
                ? "border-blue-500  text-blue-600 bg-gray-700"
                : "border-transparent bg-[#3C3C3C] text-[#D4D4D4] hover:text-blue-600 hover:border-blue-500"
            }`}
            onClick={() => setActiveTab("css")}
          >
            <FaCss3Alt />
            CSS
          </button>

          {/* JS */}
          <button
            type="button"
            className={`px-4 py-2 cursor-pointer flex items-center gap-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
              ActiveTab === "js"
                ? "border-yellow-500 text-yellow-600 bg-gray-700"
                : "border-transparent bg-[#3C3C3C] text-[#D4D4D4] hover:text-yellow-600 hover:border-yellow-500"
            }`}
            onClick={() => setActiveTab("js")}
          >
            <IoLogoJavascript />
            JS
          </button>
        </div>

        {/* HTML */}
        {ActiveTab === "html" && (
          <CodeMirror
            value={htmlCode}
            height="100%"
            width="100%"
            extensions={[html()]}
            onChange={handleHTMLCodeChange}
            theme="dark"
            className="w-full h-[95%]"
          />
        )}

        {/* CSS */}
        {ActiveTab === "css" && (
          <CodeMirror
            value={cssCode}
            height="100%"
            width="100%"
            extensions={[css()]}
            onChange={handleCSSCodeChange}
            theme="dark"
            className="w-full h-[95%]"
          />
        )}

        {/* JavaScript */}
        {ActiveTab === "js" && (
          <CodeMirror
            value={jsCode}
            height="100%"
            width="100%"
            extensions={[javascript()]}
            onChange={handleJSCodeChange}
            theme="dark"
            className="w-full h-[95%]"
          />
        )}
      </div>

      <div className="w-1/2 h-full flex justify-end bg-[#1E1E1E]">
        <iframe
          srcDoc={srcDoc}
          title="Output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          className=" border-1 border-black  bg-[#fff]"
        />
      </div>
    </div>
  );
};

export default WebDevEditor;
