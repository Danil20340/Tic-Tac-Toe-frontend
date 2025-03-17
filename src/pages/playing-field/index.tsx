import React, { useEffect, useState } from 'react';
import { Gamers } from '../../components/gamers';
import { Container } from '../../components/container';
import { Timer } from '../../components/timer';
import './index.css';
import { useSocket } from '../../features/socket';
import { Chat } from '../../components/chat';
import { Step } from '../../components/step';
import { Board } from '../../components/board';
import { useGetCurrentGameQuery } from '../../app/services/gameApi';
import { selectCurrent } from '../../features/player/playerSlice';
import { useSelector } from 'react-redux';
import { Game, Player } from '../../app/types';
import { useModal } from '../../components/modal-context';
import { EndGameModal } from '../../components/end-game-modal';
import { useNotifications } from '../../components/notification-provider';

export const PlayingField = () => {
  //Добавляем уведомление
  const { addNotification } = useNotifications();
  // Получение данных из стора
  const current = useSelector(selectCurrent);
  const { data, isLoading } = useGetCurrentGameQuery(
    { id: current?.id ?? '' },  // Всегда передаем объект
    { skip: !current }          // Пропускаем запрос, если current нет
  );
  //Манипулирование модальным окном 
  const { openModal } = useModal();
  // Подключение к сокету
  const [gameData, setGameData] = useState<Game>();
  const { socket, isConnected } = useSocket();

  // 📡 Подписка на обновления от сервера через WebSocket
  useEffect(() => {
    if (!socket || !isConnected || !gameData?.id) return;

    // Слушаем "moveMade" от сервера
    socket.on("moveMade", (gameData) => {
      setGameData(gameData);
      if (gameData.status === "FINISHED" || gameData.status === "DRAW") {
        openModal("endGameModal", gameData);
      }
    });
    socket.on("alertAboutMove", () => {
      if (data?.playerSymbol === gameData?.nowMove) addNotification('До конца хода осталась минута!', 'warning');
    });
    socket.emit('initChat', { gameId: gameData?.id });

    return () => {
      socket.off("moveMade");
      socket.off("alertAboutMove");
    };
  }, [socket, isConnected, gameData]);

  useEffect(() => {
    if (data) {
      setGameData(data);
    }
  }, [data]);

  const handleClick = (index: number) => {
    if (!socket || !isConnected) return;
    if (!data?.id) return console.error("Ошибка: ID игры отсутствует");
    if (gameData?.board[index] !== null) return console.warn("Некорректный ход: ячейка занята");

    const newBoard = [...gameData?.board];
    newBoard[index] = gameData?.nowMove === 'X' ? 'X' : 'O';

    //Отправляем ход на сервер через сокет
    socket.emit("playerMove", { board: newBoard, id: data.id });
  };

  if (isLoading || !data || !gameData) {
    return <p>Загрузка...</p>;
  }
  // Вычисляем текущего игрока по ходу
  const nowMovePlayer: Player = gameData?.nowMove === 'X' ? data.player1 : data.player2;
  return (
    <>
      <EndGameModal />
      <>
        {/* Десктопная версия */}
        <Container className='common desktop-field'>
          <Gamers player1={data.player1} player2={data.player2} />
          <Container style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '40px', backgroundColor: '#f6f6f6', maxWidth: '663px' }}>
            <Timer createTime={(gameData?.status === 'FINISHED' || gameData?.status === 'DRAW') ? null : data.createTime} />
            <Board isMakingMove={data.playerSymbol !== gameData?.nowMove || (gameData?.status === 'FINISHED' || gameData?.status === 'DRAW')} nowMove={gameData?.nowMove} board={gameData?.board ?? []} click={handleClick} winningPattern={gameData?.winningPattern ?? []} />
            <Step nowMove={gameData?.nowMove} player={nowMovePlayer} />
          </Container>
          <Chat playerName={data.player2.fullName} currentGameID={gameData.id} socket={socket} isConnected={isConnected} />
        </Container>
      </>
      <>
        {/* Мобильная версия */}
        <Container className='common mobile-field'>
          <Gamers player1={data.player1} player2={data.player2} />
          <Container style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '40px', backgroundColor: '#f6f6f6', maxWidth: '663px' }}>
            <Timer createTime={(gameData?.status === 'FINISHED' || gameData?.status === 'DRAW') ? null : data.createTime} />
            <Step nowMove={gameData?.nowMove} player={nowMovePlayer} />
            <Board isMakingMove={data.playerSymbol !== gameData?.nowMove || (gameData?.status === 'FINISHED' || gameData?.status === 'DRAW')} nowMove={gameData?.nowMove} board={gameData?.board ?? []} click={handleClick} winningPattern={gameData?.winningPattern ?? []} />
          </Container>
          <Chat playerName={data.player2.fullName} currentGameID={gameData.id} socket={socket} isConnected={isConnected} />
        </Container>
      </>
    </>

  );
};