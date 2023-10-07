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
    // const newSocket = io("http://localhost:5000/", { query: { id } });
    setSocket(newSocket);
    return () => newSocket.close();
    //specifies a cleanup function that will be called when the component unmounts or when the id dependency changes so that we dont have multiple sockets and get dupilcated messages
  }, [id]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
