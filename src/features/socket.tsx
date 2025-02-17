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
  const socketRef = useRef<Socket | null>(null); // Хранение WebSocket

  useEffect(() => {


    if (isAuthenticated && currentPlayer) {

      if (!socketRef.current) {
        socketRef.current = getSocket(); // WebSocket создается один раз
      }

      const socket = socketRef.current;
      // Подключаемся, если это необходимо
      if (!socket.connected) {
        socket.connect();
      }

      const handleConnect = () => {
        setIsConnected(true);
        if (!registeredPlayers.has(currentPlayer.id)) {
          registeredPlayers.add(currentPlayer.id);
          socket.emit("register", { playerId: currentPlayer.id, fullName: currentPlayer.fullName });
        }
      };

      const handleDisconnect = () => {
        setIsConnected(false);
        registeredPlayers.delete(currentPlayer.id);
      };

      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      // Проверяем состояние подключения при монтировании
      if (socket.connected) {
        setIsConnected(true);
        handleConnect();
      }

      // Чистим обработчики при размонтировании
      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
      };
    }
  }, [isAuthenticated, currentPlayer]);

  return { socket: socketRef.current, isConnected };
};

