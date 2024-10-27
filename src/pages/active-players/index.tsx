import React from 'react'
import './index.css'
import { Container } from '../../components/container';
import { Text } from '../../components/text';
import { Button } from '../../components/button';
import { Status } from '../../components/status';
import { Row } from '../../components/row';
import { Cell } from '../../components/cell';
import { Switch } from '../../components/switch';
export const ActivePlayers = () => {

  const playerActive = [
    { FIO: 'Александров Игнат Анатолиевич', status: "Свободен" },
    { FIO: 'Василенко Эрик Платонович', status: "В игре" },
    { FIO: 'Быков Юрий Виталиевич', status: "В игре" },
    { FIO: 'Галкин Феликс Платонович', status: "В игре" },
    { FIO: 'Комаров Цефас Александрович', status: "В игре" },
    { FIO: 'Шевченко Рафаил Михайлович', status: "В игре" },
    { FIO: 'Гордеев Шамиль Леонидович', status: "Свободен" },
    { FIO: 'Бобров Фёдор Викторович', status: "Свободен" },
    { FIO: 'Суворов Феликс Григорьевич', status: "В игре" },
    { FIO: 'Марков Йошка Фёдорович', status: "Свободен" }

  ]
  const elements = playerActive.map(item =>
    <Row style={{ boxShadow: "none", padding: "12px 0px" }}>
      <Cell style={{ width: "360px" }}>{item.FIO}</Cell>
      {item.status === "Свободен" ? <Status isFree={true} /> : <Status />}
      {item.status === "Свободен" ? <Button >Позвать играть</Button> :
        <Button disabled={true} backgroundColor="#F7F7F7" >Позвать играть</Button>}
    </Row>
  );
  return (

    <Container className="active-players">
      <Container style={{ justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px' }}>Активные игроки</Text>
        <Container style={{ width: '', alignItems: 'center' }}>
          <Text style={{ marginRight: '8px' }}>Только свободные</Text>
          <Container style={{ width: '' }}>
            <Switch />
          </Container>
        </Container>
      </Container>
      <Container style={{ flexDirection: "column", alignItems: 'flex-start' }}>
        {elements}
      </Container>
    </Container>

  )
}
