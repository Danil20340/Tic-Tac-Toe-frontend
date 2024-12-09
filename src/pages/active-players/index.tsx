import React, { useState } from 'react'
import './index.css'
import { Container } from '../../components/container';
import { Text } from '../../components/text';
import { Button } from '../../components/button';
import { Status } from '../../components/status';
import { Row } from '../../components/row';
import { Cell } from '../../components/cell';
import { Switch } from '../../components/switch';
import { useGetAllPlayersQuery } from '../../app/services/playerApi';
import { InviteGameModal } from '../../components/invite-game-modal';
import { useModal } from '../../components/modal-context';
export const ActivePlayers = () => {
  const [showAvailableOnly, setShowAvailableOnly] = useState(false); // Состояние для переключателя
  const { data, refetch } = useGetAllPlayersQuery();
  const { openModal } = useModal();
  const handleSwitchChange = () => {
    setShowAvailableOnly(!showAvailableOnly);
    refetch();

  };
  const filteredData = data?.filter(player =>
    !showAvailableOnly || player.availability === "AVAILABLE"
  );
  return (
    <>
      <Container className="active-players">
        <Container style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px' }}>Активные игроки</Text>
          <Button onClick={() => openModal('inviteModal')}>Открыть модалку</Button>
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
                  availability,
                  status
                }) =>
                  status === 'ACTIVE' &&
                  <Row key={id} style={{ boxShadow: "none", padding: "12px 0px", gap: '16px' }}>
                    <Cell style={{ width: "300px" }}>{fullName}</Cell>
                    {availability === "AVAILABLE" ? <Status /> : <Status status='isPlay' />}
                    {availability === "AVAILABLE" ? <Button >Позвать играть</Button> :
                      <Button disabled={true} backgroundColor="#F7F7F7" >Позвать играть</Button>}
                  </Row>
              )
              : null
          }
        </Container>
      </Container>
      <InviteGameModal />
    </>
  )
}
