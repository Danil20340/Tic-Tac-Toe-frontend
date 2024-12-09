import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/player/playerSlice";


export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const current = useSelector(selectCurrent);

  // Проверяем, является ли пользователь админом
  if (current?.isAdmin === false) {
    return <Navigate to="/" replace />; // Редирект на главную страницу
  }

  return children; // Если проверка пройдена, рендерим дочерний элемент
};
