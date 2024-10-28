import React from 'react'
import zero from '../../assets/zero.svg'
import cross from '../../assets/cross.svg'
import cup from '../../assets/cup.svg'
import { Container } from '../../components/container'
import { Text } from '../../components/text'
import { Row } from '../../components/row'
import { Cell } from '../../components/cell'

export const GameHistory = () => {
  const historyList = [
    { win: "win", player1: 'Терещенко У. Р.', player2: 'Многогрешный П. В.', date: "12 февраля 2022", time: "43 мин 13 сек" },
    { win: "lose", player1: 'Горбачёв А. Д.', player2: 'Многогрешный П. В.', date: "12 февраля 2022", time: "43 мин 13 сек" },
    { win: "win", player1: 'Константинов В. Н.', player2: 'Сасько Ц. А.', date: "12 февраля 2022", time: "43 мин 13 сек" },
    { win: "lose", player1: 'Никифорова Б. А.', player2: 'Горбачёв А. Д.', date: "12 февраля 2022", time: "43 мин 13 сек" },
    { win: "lose", player1: 'Кулишенко К. И.', player2: 'Вишняков Ч. М.', date: "12 февраля 2022", time: "43 мин 13 сек" },
    { win: "lose", player1: 'Гриневска Д. Б.', player2: 'Кудрявцев Э. В.', date: "12 февраля 2022", time: "43 мин 13 сек" },
    { win: "win", player1: 'Нестеров Х. А.', player2: 'Исаева О. А.', date: "12 февраля 2022", time: "43 мин 13 сек" },
    { win: "lose", player1: 'Исаева О. А.', player2: 'Кулишенко К. И.', date: "12 февраля 2022", time: "43 мин 13 сек" },
    { win: "lose", player1: 'Коновалова В. В.', player2: 'Терещенко У. Р.', date: "12 февраля 2022", time: "43 мин 13 сек" },
    { win: "win", player1: 'Казаков Х. Е.', player2: 'Овчаренко Б. М.', date: "12 февраля 2022", time: "43 мин 13 сек" },
    { win: "lose", player1: 'Сасько Ц. А.', player2: 'Никифорова Б. А.', date: "12 февраля 2022", time: "43 мин 13 сек" }
  ]

  return (
    <Container style={{ maxWidth: '1074px' }} className="rating-players">
      <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px' }}>История игр</Text>
      <Container style={{ flexDirection: "column", alignItems: 'flex-start' }}>
        <Row style={{ fontWeight: "600" }}>
          <Cell style={{ width: "540px" }}>Игроки</Cell>
          <Cell style={{ width: '160px' }}>Дата</Cell>
          <Cell style={{ width: '140px' }}>Время игры</Cell>
        </Row>
        {historyList.map(item =>
          <Row>
            <Cell style={{maxWidth: '540px', width: "-webkit-fill-available", alignItems: 'center', gap: "12px" }}>
              <Container style={{maxWidth: '220px', width: '-webkit-fill-available', gap: '8px', justifyContent: 'flex-start' }}>
                {item.win === "win" ?
                  <>
                    <img src={zero} alt="" />
                    {item.player1}
                    <img src={cup} alt="" />
                  </> :
                  <>
                    <img className="his-img" src={zero} alt="" />{item.player1}
                  </>
                }
              </Container>
              <Text style={{ fontWeight: '700' }}>против</Text>
              {item.win === "win" ?
                <><img className="his-img" src={cross} alt="" />{item.player2}</> :
                <><img className="his-img" src={cross} alt="" />{item.player2}<img src={cup} alt="" /></>}
            </Cell>
            <Cell style={{ width: '160px' }}>{item.date}</Cell>
            <Cell style={{ width: '140px' }}>{item.time}</Cell>
          </Row>
        )}
      </Container>
    </Container>
  )
}
