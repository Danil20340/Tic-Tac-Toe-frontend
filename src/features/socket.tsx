import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrent, selectIsAuthenticated, selectToken } from "./player/playerSlice";
import { getSocket } from "../utils/socketSingleton";
import { useNavigate } from "react-router-dom";

const registeredPlayers: Set<string> = new Set(); // Глобальный набор
export const useSocket = (): { socket: Socket | null; isConnected: boolean } => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
          socket.emit("register", { playerId: currentPlayer.id, token: token });
        }
      };

      const handleDisconnect = () => {
        setIsConnected(false);
        registeredPlayers.delete(currentPlayer.id);
      };
      const handleTokenError = () => {
        dispatch(logout());
        navigate('/auth')
      };
      socket.on("connect", handleConnect);
      socket.on("tokenError", handleTokenError);
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

