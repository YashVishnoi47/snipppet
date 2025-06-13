"use client";
import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({
  socket: null,
  connectSocket: () => {},
});

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  const connectSocket = () => {
    // const newSocket = io("http://localhost:4000");
    const newSocket = io(
      "https://collabrative-code-editor-restart.onrender.com",
      {
        transports: ["websocket"],
      }
    );

    newSocket.on("connect", () => {
      setSocket(newSocket);
    });
    socketRef.current = newSocket;
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connectSocket }}>
      {children}
    </SocketContext.Provider>
  );
}
