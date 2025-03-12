import React from 'react'
import zero from '../../assets/zero.svg'
import cross from '../../assets/cross.svg'
import cup from '../../assets/cup.svg'
import { Container } from '../../components/container'
import { Text } from '../../components/text'
import { Row } from '../../components/row'
import { Cell } from '../../components/cell'
import { useGetGamesTableQuery } from '../../app/services/gameApi'
import { formatToClientDate } from '../../utils/format-to-client-date'
import { Game, Player } from '../../app/types'

export const GameHistory = () => {
  const { data } = useGetGamesTableQuery();
  function formatFullName(fullName: string) {
    const nameParts = fullName.split(' ');
    if (nameParts.length < 2) return fullName; // Если ФИО неполное, возвращаем как есть

    const lastName = nameParts[0];
    const firstName = nameParts[1]?.charAt(0) + '.';
    const middleName = nameParts[2] ? nameParts[2].charAt(0) + '.' : '';

    return `${lastName} ${firstName} ${middleName}`.trim();
  }

  return (
    <Container style={{ maxWidth: '1074px' }} className="rating-players">
      <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px'}}>История игр</Text>
      <Container style={{ flexDirection: "column", alignItems: 'flex-start', minWidth: "900px"}}>
        <Row style={{ fontWeight: "600" }}>
          <Cell style={{ width: "540px" }}>Игроки</Cell>
          <Cell style={{ minWidth: '160px' }}>Дата</Cell>
          <Cell style={{ width: '140px' }}>Время игры</Cell>
        </Row>
        {
          data && data !== undefined && data.length > 0
            ? data.map(({
              id,
              player1,
              player2,
              duration,
              winner,
              createTime,
            }) =>
              <Row key={id}>
                <Cell className='game-history' style={{ maxWidth: '540px', width: "-webkit-fill-available", alignItems: 'center', gap: "12px" }}>
                  <Container style={{ maxWidth: '220px', width: '-webkit-fill-available', gap: '8px', justifyContent: 'flex-start' }}>
                    {winner === player1 ?
                      <>
                        <img src={zero} alt="" />
                        {formatFullName(player1)}
                        <img src={cup} alt="" />
                      </> :
                      <>
                        <img className="his-img" src={zero} alt="" />{formatFullName(player1)}
                      </>
                    }
                  </Container>
                  <Text style={{ fontWeight: '700', fontSize: '16px' }}>против</Text>
                  {winner === player2 ?
                    <><img className="his-img" src={cross} alt="" />{formatFullName(player2)}<img src={cup} alt="" /></> :
                    <><img className="his-img" src={cross} alt="" />{formatFullName(player2)}</>}
                </Cell>
                <Cell style={{ minWidth: '160px' }}>{formatToClientDate(createTime)}</Cell>
                <Cell style={{ width: '140px' }}>{duration}</Cell>
              </Row>
            ) : null}
      </Container>
    </Container>
  )
}
