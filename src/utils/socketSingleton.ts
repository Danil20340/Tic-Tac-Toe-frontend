import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      transports: ["websocket"],
      autoConnect: false,
    });
  }
  return socket;
};
export const disconnectSocket = () => {
  console.log(socket)
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
