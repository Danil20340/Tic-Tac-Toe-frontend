import './index.css';
import logo from '../../assets/logo.svg';
import { NavLink, useNavigate } from "react-router-dom";
import NavButton from '../nav-button';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrent } from '../../features/player/playerSlice';
import { AvailabilityStatus } from '../../app/types';

export const NavBar = () => {
  const currentUser = useSelector(selectCurrent);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth')
  }
  return (
    <header>
      <img src={logo} alt="" />
      <div id="nav-bar">
        {/* Если игрок не в игре то скрываем кнопку "Игровое поле" */}
        {currentUser?.availability === AvailabilityStatus.IN_GAME && <NavButton to={"playing"}>Игровое поле</NavButton>}

        <NavButton to={"rating"}>Рейтинг</NavButton>
        <NavButton to={""}>Активные игроки</NavButton>
        <NavButton to={"history"}>История игр</NavButton>

        {/* Если игрок не админ то скрываем кнопку "Список игроков" */}
        {currentUser?.isAdmin && <NavButton to={"players"}>Список игроков</NavButton>}
      </div>
      <NavLink onClick={handleLogout} id="signout" to={"/auth"}>
        <svg width="19" height="19" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.79 13.29C8.18 13.68 8.81 13.68 9.2 13.29L12.79 9.7C13.18 9.31 13.18 8.68 12.79 8.29L9.2 4.7C8.81 4.31 8.18 4.31 7.79 4.7C7.4 5.09 7.4 5.72 7.79 6.11L9.67 8H1C0.45 8 0 8.45 0 9C0 9.55 0.45 10 1 10H9.67L7.79 11.88C7.4 12.27 7.41 12.91 7.79 13.29ZM16 0H2C0.89 0 0 0.9 0 2V5C0 5.55 0.45 6 1 6C1.55 6 2 5.55 2 5V3C2 2.45 2.45 2 3 2H15C15.55 2 16 2.45 16 3V15C16 15.55 15.55 16 15 16H3C2.45 16 2 15.55 2 15V13C2 12.45 1.55 12 1 12C0.45 12 0 12.45 0 13V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z" fill="currentColor" />
        </svg>
      </NavLink>
    </header>
  )
};