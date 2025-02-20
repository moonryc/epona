import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io';

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Function to connect the socket
  const connect = () => {
    if (socket) return; // Avoid multiple connections

    const newSocket = io(url, {
      transports: ["websocket"],
      reconnectionAttempts: 3, // Optional: limit reconnection attempts
      reconnectionDelay: 1000, // Wait 1s before retrying
    });

    newSocket.on("connect", () => console.log("Socket.io connected"));
    newSocket.on("message", (data) => setMessage(data));
    newSocket.on("disconnect", () => console.log("Socket.io disconnected"));

    setSocket(newSocket);
  };

  // Function to disconnect the socket
  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  // Reconnect function to force a fresh connection
  const reconnect = () => {
    disconnect();
    setTimeout(() => connect(), 500); // Slight delay to ensure cleanup
  };

  useEffect(() => {
    connect(); // Connect on mount

    return () => {
      disconnect(); // Cleanup on unmount
    };
  }, [url]);

  return { socket, message, reconnect };
};
