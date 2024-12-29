import { useGetPlayerRatingsQuery } from '../../app/services/gameApi';
import { Cell } from '../../components/cell';
import { Container } from '../../components/container';
import { Row } from '../../components/row';
import { Text } from '../../components/text';
import './index.css'

export const Rating = () => {
  const { data } = useGetPlayerRatingsQuery();
  return (
    <Container className="rating-players">
      <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px' }}>Рейтинг игроков</Text>
      <Container style={{ flexDirection: "column", alignItems: 'flex-start' }}>
        <Row style={{ fontWeight: "600" }}>
          <Cell style={{ width: "440px" }}>ФИО</Cell>
          <Cell>Всего игр</Cell>
          <Cell>Победы</Cell>
          <Cell>Проигрыши</Cell>
          <Cell>Ничьи</Cell>
          <Cell style={{ width: "138px" }}>Процент побед</Cell>
        </Row>
        {
          data && data.length > 0
            ? data.map(({
              id,
              playerName,
              totalGames,
              wins,
              losses,
              draw,
              winPercentage
            }) => (
              <Row key={id}>
                <Cell style={{ width: "440px" }}>{playerName}</Cell>
                <Cell>{totalGames}</Cell>
                <Cell style={{ color: "#69B849" }}>{wins}</Cell>
                <Cell style={{ color: "#E93E3E" }}>{losses}</Cell>
                <Cell style={{ color: "#87cae8" }}>{draw}</Cell>
                <Cell style={{ width: "138px" }}>{winPercentage}</Cell>
              </Row>
            ))
            : null}
      </Container>
    </Container>
  )
}
