import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrent, selectIsAuthenticated } from "./player/playerSlice";
import { getSocket } from "../utils/socketSingleton";

const registeredPlayers: Set<string> = new Set(); // Глобальный набор

export const useSocket = (): { socket: Socket | null; isConnected: boolean } => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentPlayer = useSelector(selectCurrent);
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isAuthenticated && currentPlayer) {
      if (!socketRef.current) {
        socketRef.current = getSocket(); // WebSocket создается один раз
      }

      const socket = socketRef.current;

      if (!socket.connected) {
        socket.connect();
      }

      const handleConnect = () => {
        setIsConnected(true);
        if (!registeredPlayers.has(currentPlayer.id)) {
          socket.emit("register", { playerId: currentPlayer.id, fullName: currentPlayer.fullName });
          console.log("WebSocket подключен:", { playerId: currentPlayer.id });
          registeredPlayers.add(currentPlayer.id); // Отмечаем как зарегистрированного
        }
      };

      const handleDisconnect = () => {
        setIsConnected(false);
        registeredPlayers.delete(currentPlayer.id);
        console.log("WebSocket отключен");

      };

      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      socket.on("connect_error", (error) => {
        console.error("Ошибка подключения:", error);
      });

      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
      };
    }
  }, [isAuthenticated, currentPlayer]);

  return { socket: socketRef.current, isConnected };
};
