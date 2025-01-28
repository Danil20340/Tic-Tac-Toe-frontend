import React, { useEffect, useRef } from 'react';
import { NavBar } from '../nav-bar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectCurrent, selectIsAuthenticated } from '../../features/player/playerSlice';
import { useLazyGetCurrentPlayerQuery, useLazyGetPlayerByIdQuery } from '../../app/services/playerApi';
import { useModal } from '../modal-context';
import { useSocket } from '../../features/socket';
import { InviteGameModal } from '../invite-game-modal';
import { useNotifications } from '../notification-provider';
import { removeThirdWord } from '../../utils/remove-third-word';
import { AvailabilityStatus } from '../../app/types';

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const current = useSelector(selectCurrent);
  const navigate = useNavigate();
  const [triggerGetCurrentPlayer] = useLazyGetCurrentPlayerQuery();
  const dispatch = useDispatch();
  const { openModal, isModalOpen, closeModal } = useModal();
  const { socket, isConnected } = useSocket();
  const { addNotification } = useNotifications();
  const [fetchPlayer] = useLazyGetPlayerByIdQuery();

  // Проверка авторизации и получение текущего пользователя
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
      navigate("/auth");
    } else if (!current) {
      triggerGetCurrentPlayer();
    }
    //Если статус игрока "в игре", то переносим его на игровое поле
    if (current?.availability === AvailabilityStatus.IN_GAME) {
      navigate("/playing");
    }

    console.log('Current Player:', current);
    console.log('Availability:', current?.availability);

  }, [isAuthenticated, current, navigate, triggerGetCurrentPlayer, dispatch]);


  // Прослушивание события "invite"
  useEffect(() => {
    if (socket && isConnected) {
      //Функция обработки события принятия игры
      const handleInvite = ({ fromPlayerId }: { fromPlayerId: string }) => {
        console.log("Приглашение получено от игрока:", fromPlayerId);
        openModal("inviteModal", { fromPlayerId });
      };
      //Функция обработки события отклонения игры
      const handleRejected = async ({ fromPlayerId, message }: { fromPlayerId: string; message: { text: string; type: 'success' | 'error' | 'info' | 'warning' } }) => {
        if (isModalOpen('inviteModal') && message.type === 'error') {
          closeModal('inviteModal');
          addNotification(message.text, message.type);
        } else
          try {
            const { fullName } = await fetchPlayer({ id: fromPlayerId }).unwrap();
            const filteredMessage = message.text.replace("fullName", removeThirdWord(fullName));
            console.log(fromPlayerId, fullName);
            addNotification(filteredMessage, message.type);
          } catch (error) {
            console.error('Ошибка загрузки игрока:', error);
          }
      };
      //Функция обработки события начала игры
      const handleStartGame = () => {
        triggerGetCurrentPlayer();
      };
      socket.on("rejected", handleRejected);
      socket.on("invite", handleInvite);
      socket.on("gameStart", handleStartGame);

      return () => {
        socket.off("invite", handleInvite);
        socket.off("rejected", handleRejected);
      };
    }
  }, [socket, isConnected, openModal]);

  return (
    <>
      <InviteGameModal />
      <NavBar />
      <Outlet />
    </>
  );
};
