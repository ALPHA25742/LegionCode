import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
const SocketContext = React.createContext();
export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("https://legioncode-backend.onrender.com", { query: { id } });
    setSocket(newSocket);
    return () => newSocket.close();//for closing the old socket when the useEffect runs for the second time so that we dont have multiple sockets and get dupilcated messages
  }, [id]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
