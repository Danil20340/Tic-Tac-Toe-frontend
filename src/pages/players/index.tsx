import React, { useState } from 'react'
import block from '../../assets/block.svg'
import woman from '../../assets/woman.svg'
import man from '../../assets/man.svg'
import close from '../../assets/close.svg'
import { Container } from '../../components/container'
import { Text } from '../../components/text'
import { Button } from '../../components/button'
import { Row } from '../../components/row'
import { Cell } from '../../components/cell'
import { Status } from '../../components/status'
import { AddPlayerModal } from '../../components/add-player-modal'
import { ModalTemplate } from '../../components/modal-template'

export const Players = () => {
  const [AddPlayerActive, setAddPlayerActive] = useState(false)

  const playerList = [
    { FIO: 'Александров Игнат Анатолиевич', age: "24", gender: "woman", state: "blocked", generated: "12 октября 2021", changed: "22 октября 2021", blocked_changed: "unlock" },
    { FIO: 'Мартынов Остап Фёдорович', age: "12", gender: "woman", state: "active", generated: "12 октября 2021", changed: "22 октября 2021", blocked_changed: "block" },
    { FIO: 'Комаров Цефас Александрович', age: "83", gender: "man", state: "active", generated: "12 октября 2021", changed: "22 октября 2021", blocked_changed: "block" },
    { FIO: 'Кулаков Станислав Петрович', age: "43", gender: "man", state: "blocked", generated: "12 октября 2021", changed: "22 октября 2021", blocked_changed: "unlock" },
    { FIO: 'Борисов Йошка Васильевич', age: "32", gender: "woman", state: "active", generated: "12 октября 2021", changed: "22 октября 2021", blocked_changed: "block" },
    { FIO: 'Негода Михаил Эдуардович', age: "33", gender: "man", state: "active", generated: "12 октября 2021", changed: "22 октября 2021", blocked_changed: "block" },
    { FIO: 'Жданов Зураб Алексеевич', age: "24", gender: "man", state: "active", generated: "12 октября 2021", changed: "22 октября 2021", blocked_changed: "block" },
    { FIO: 'Бобров Фёдор Викторович', age: "19", gender: "man", state: "blocked", generated: "12 октября 2021", changed: "22 октября 2021", blocked_changed: "unlock" },
    { FIO: 'Александров Игнат Анатолиевич', age: "21", gender: "woman", state: "active", generated: "12 октября 2021", changed: "22 октября 2021", blocked_changed: "block" },
    { FIO: 'Многогрешный Павел Виталиевич', age: "24", gender: "man", state: "blocked", generated: "12 октября 2021", changed: "22 октября 2021", blocked_changed: "unlock" }
  ]

  return (
    <>
      <Container style={{ maxWidth: '1416px' }} className="rating-players">
        <Container style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px' }}>Список игроков</Text>
          <Button onClick={() => setAddPlayerActive(true)}>Добавить игрока</Button>
        </Container>
        <Container style={{ flexDirection: "column", alignItems: 'flex-start' }}>
          <Row>
            <Cell style={{ width: '380px' }}>ФИО</Cell>
            <Cell>Возраст</Cell>
            <Cell style={{ width: '46px' }}>Пол</Cell>
            <Cell style={{ width: '155px' }}>Статус</Cell>
            <Cell style={{ width: '144px' }}>Создан</Cell>
            <Cell style={{ width: '144px' }} >Изменен</Cell>
            <Cell style={{ width: '174px' }}></Cell>
          </Row>
          {playerList.map(item =>
            <Row style={{ alignItems: 'center', height: '64px' }}>
              <Cell style={{ width: "380px" }}>{item.FIO}</Cell>
              <Cell>{item.age}</Cell>
              {item.gender === "woman" ? <Cell style={{ width: '46px' }}><img src={woman} alt="" />
              </Cell> : <Cell style={{ width: '46px' }}><img src={man} alt="" /></Cell>}
              {item.state === "blocked" ? <Status style={{ width: '144px' }} status='isBlock' /> :
                <Status style={{ width: '144px' }} status='isActive' />}
              <Cell style={{ width: '144px' }}>{item.generated}</Cell>
              <Cell style={{ width: '144px' }}>{item.changed}</Cell>
              {item.blocked_changed === "unlock" ? <Button style={{ width: '174px' }} backgroundColor="#F7F7F7" >Разблокировать</Button> :
                <Button style={{ width: '174px' }} backgroundColor="#F7F7F7"><img src={block} alt="" /> Заблокировать</Button>}
            </Row>
          )}
        </Container>
      </Container>

      <ModalTemplate active={AddPlayerActive}>
        <div style={{ display: 'flex', justifyContent: 'end' }} onClick={() => setAddPlayerActive(false)}><img src={close} alt="" /></div>
        <AddPlayerModal />
      </ModalTemplate>
    </>
  )
}
