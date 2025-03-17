import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("http://158.160.140.68:80", {
      transports: ["websocket"],
      autoConnect: false,
    });
  }
  return socket;
};
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
