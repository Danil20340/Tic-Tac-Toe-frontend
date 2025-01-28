import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/player/playerSlice";
import { AvailabilityStatus } from "../../app/types";


export const PlayingProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const current = useSelector(selectCurrent);

  // Проверяем, является ли пользователь админом
  if (current?.availability === AvailabilityStatus.AVAILABLE) {
    return <Navigate to="/" replace />; // Редирект на главную страницу
  }

  return children; // Если проверка пройдена, рендерим дочерний элемент
};
