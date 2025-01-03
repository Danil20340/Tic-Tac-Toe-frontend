import React, { useEffect, useState } from 'react'
import './index.css'
import { Container } from '../../components/container';
import { Text } from '../../components/text';
import { Button } from '../../components/button';
import { Status } from '../../components/status';
import { Row } from '../../components/row';
import { Cell } from '../../components/cell';
import { Switch } from '../../components/switch';
import { useGetAllPlayersQuery } from '../../app/services/playerApi';
import { useSelector } from 'react-redux';
import { selectCurrent, selectSocket } from '../../features/player/playerSlice';
import { useSocket } from '../../features/socket';
import { useNotifications } from '../../components/notification-provider';
import { AvailabilityStatus, Player } from '../../app/types';

type PlayerData = {
  id: string;
  fullName: string;
  availability: AvailabilityStatus;
};
export const ActivePlayers = () => {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false); // Состояние для переключателя
  const { socket, isConnected } = useSocket();
  // Получаем текущего игрока через useSelector
  const currentPlayer = useSelector(selectCurrent);
  const current = currentPlayer?.id;

  const handleSwitchChange = () => {
    setShowAvailableOnly(!showAvailableOnly);
  };

  const handleInvite = (playerId: string) => {
    if (socket && isConnected) {
      console.log(`Приглашение отправлено игроку ${playerId}`);
      socket.emit("invite", { fromPlayerId: current, toPlayerId: playerId });
      console.log(`Игрок ${playerId} приглашен игроком ${current}`);
    } else {
      console.error("Сокет недоступен или не подключен");
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on("online-players", (playersData: { id: string; fullName: string; availability: AvailabilityStatus }[]) => {
        console.log(playersData);

        const formattedPlayers = playersData
          .filter((player) => player.id !== current) // Исключаем текущего пользователя
          .map((player) => ({
            id: player.id,
            fullName: player.fullName,
            availability: player.availability,
          }));

        setPlayers(formattedPlayers);
      });

      // Очистка обработчика при размонтировании компонента
      return () => {
        socket.off("online-players");
      };
    }
  }, [socket, current]);


  // Фильтрация данных
  const filteredData = players.filter(
    (player) => !showAvailableOnly || player.availability === AvailabilityStatus.AVAILABLE
  );
  // console.log(players);
  return (
    <>
      <Container className="active-players">
        <Container style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px' }}>Активные игроки</Text>
          <Container style={{ maxWidth: '200px', alignItems: 'center' }}>
            <Text style={{ marginRight: '8px' }}>Только свободные</Text>
            <Container style={{ maxWidth: '35px' }}>
              <Switch isChecked={showAvailableOnly} onChange={handleSwitchChange} />
            </Container>
          </Container>
        </Container>
        <Container style={{ flexDirection: "column", alignItems: 'flex-start' }}>
          {
            filteredData && filteredData.length > 0
              ? filteredData.map(
                ({
                  id,
                  fullName,
                  availability
                }) =>
                  <Row
                    key={id}
                    style={{ boxShadow: "none", padding: "12px 0px", gap: "16px" }}
                  >
                    <Cell style={{ width: "300px" }}>{fullName}</Cell>{availability === 'AVAILABLE' ? (<Status />
                    ) : (
                      <Status status="isPlay" />
                    )}
                    {availability === 'AVAILABLE' ? (<Button onClick={() => handleInvite(id)}>Позвать играть</Button>) :
                      (
                        <Button disabled={true} backgroundColor="#F7F7F7">Позвать играть</Button>
                      )}
                  </Row>
              )
              : <p>Нет доступных игроков</p>
          }

        </Container>
      </Container>
    </>
  )
}
