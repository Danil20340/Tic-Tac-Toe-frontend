import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrent, selectIsAuthenticated } from "./player/playerSlice";
import { getSocket } from "../utils/socketSingleton";

const registeredPlayers: Set<string> = new Set(); // Глобальный набор

export const useSocket = (): { socket: Socket | null; isConnected: boolean } => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentPlayer = useSelector(selectCurrent);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    if (isAuthenticated && currentPlayer) {
      if (!socket.connected) {
        socket.connect();
      }

      const handleConnect = () => {
        setIsConnected(true);
        socket.emit("register", { playerId: currentPlayer.id, fullName: currentPlayer.fullName });
        console.log("WebSocket подключен:", { playerId: currentPlayer.id });
      };

      const handleDisconnect = () => {
        setIsConnected(false);
        console.log("WebSocket отключен");
      };

      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      // Проверяем состояние подключения при монтировании
      if (socket.connected) {
        setIsConnected(true);
      }

      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
      };
    }
  }, [isAuthenticated, currentPlayer]);

  return { socket: getSocket(), isConnected };
};

