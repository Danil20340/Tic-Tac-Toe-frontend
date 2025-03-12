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
      <Text style={{ fontWeight: 700, lineHeight: '36px' }}>Рейтинг игроков</Text>
      <Container className='table-wrapper' style={{ flexDirection: "column", alignItems: 'flex-start', minWidth: "980px" }}>
        <Row style={{ fontWeight: "600" }}>
          <Cell style={{ minWidth: "320px" }}>ФИО</Cell>
          <Cell>Всего игр</Cell>
          <Cell style={{ minWidth: "80px" }}>Победы</Cell>
          <Cell>Проигрыши</Cell>
          <Cell style={{ minWidth: "80px" }}>Ничьи</Cell>
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
                <Cell style={{ minWidth: "320px" }}>{playerName}</Cell>
                <Cell>{totalGames}</Cell>
                <Cell style={{ color: "#69B849", minWidth: "80px" }}>{wins}</Cell>
                <Cell style={{ color: "#E93E3E" }}>{losses}</Cell>
                <Cell style={{ color: "#87cae8", minWidth: "80px" }}>{draw}</Cell>
                <Cell style={{ width: "138px" }}>{winPercentage}</Cell>
              </Row>
            ))
            : null}
      </Container>
    </Container >
  )
}
