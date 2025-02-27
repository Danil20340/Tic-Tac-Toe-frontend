import { useEffect, useMemo, useState } from 'react'
import './index.css'
import { Container } from '../../components/container';
import { Text } from '../../components/text';
import { Button } from '../../components/button';
import { Status } from '../../components/status';
import { Row } from '../../components/row';
import { Cell } from '../../components/cell';
import { Switch } from '../../components/switch';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/player/playerSlice';
import { useSocket } from '../../features/socket';
import { AvailabilityStatus, Player } from '../../app/types';
import { getSocket } from '../../utils/socketSingleton';
import { useNotifications } from '../../components/notification-provider';
import { removeThirdWord } from '../../utils/remove-third-word';

type PlayerData = {
  id: string;
  fullName: string;
  availability: AvailabilityStatus;
};
export const ActivePlayers = () => {
  const { addNotification } = useNotifications();
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const { socket, isConnected } = useSocket();
  const currentPlayer = useSelector(selectCurrent);
  const [blockedButtons, setBlockedButtons] = useState<Set<string>>(new Set()); // Состояние для блокировки кнопок
  const current = currentPlayer?.id;

  const handleSwitchChange = () => setShowAvailableOnly(!showAvailableOnly);

  const formatPlayers = (playersData: PlayerData[]): PlayerData[] =>
    playersData.filter((player) => player.id !== current);

  const handleInvite = (playerId: string) => {
    if (!socket || !isConnected) return;
    socket.emit("invite", { fromPlayerId: current, toPlayerId: playerId });

    // Блокируем кнопку на 10 секунд
    setBlockedButtons((prev) => new Set(prev).add(playerId));
    setTimeout(() => {
      setBlockedButtons((prev) => {
        const updated = new Set(prev);
        updated.delete(playerId);
        return updated;
      });
    }, 10000);
  };

  useEffect(() => {
    if (!socket || !socket.connected) return;

    const handlePlayers = (playersData: PlayerData[]) => {
      setPlayers(formatPlayers(playersData));
    };

    socket.emit("getOnlinePlayers", { fromPlayerId: current });
    socket.on("players", handlePlayers);
    socket.on("online-players", handlePlayers);

    return () => {
      socket.off("players", handlePlayers);
      socket.off("online-players", handlePlayers);
    };
  }, [socket, isConnected, current]);

  const filteredData = useMemo(() => {
    return players.filter(
      (player) => !showAvailableOnly || player.availability === AvailabilityStatus.AVAILABLE
    );
  }, [players, showAvailableOnly]);

  return (
    <>
      <Container className="active-players">
        <Container style={{ justifyContent: "space-between" }}>
          <Text style={{ fontWeight: 700, lineHeight: "36px" }}>
            Активные игроки
          </Text>
          <Container style={{ maxWidth: "200px", alignItems: "center" }}>
            <Text style={{ marginRight: "8px", fontSize: "16px" }}>Только свободные</Text>
            <Container style={{ maxWidth: "35px" }}>
              <Switch isChecked={showAvailableOnly} onChange={handleSwitchChange} />
            </Container>
          </Container>
        </Container>
        <Container style={{ flexDirection: "column", alignItems: "flex-start" }}>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map(({ id, fullName, availability }) => (
              <Row
                key={id}
                style={{ boxShadow: "none", padding: "12px 0px", gap: "16px", alignItems: "center" }}
              >
                <Cell style={{ width: "300px" }}>{fullName}</Cell>
                {availability === "AVAILABLE" ? <Status /> : <Status status="isPlay" />}
                {availability === "AVAILABLE" ? (
                  <Button
                    onClick={() => {
                      handleInvite(id);
                      addNotification(
                        `Игрок ${removeThirdWord(fullName)} успешно приглашен`,
                        "success"
                      );
                    }}
                    disabled={blockedButtons.has(id)}
                  >
                    {blockedButtons.has(id) ? "Приглашен" : "Позвать играть"}
                  </Button>
                ) : (
                  <Button disabled backgroundColor="#F7F7F7">
                    Позвать играть
                  </Button>
                )}
              </Row>
            ))
          ) : (
            <p>Нет доступных игроков</p>
          )}
        </Container>
      </Container>
    </>
  );
};