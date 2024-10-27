import { Cell } from '../../components/cell';
import { Container } from '../../components/container';
import { Row } from '../../components/row';
import { Text } from '../../components/text';
import './index.css'

type DataRow = {
  [key: string]: string | number;
}
export const Rating = () => {
  const data: DataRow[] = [
    { FIO: 'Александров Игнат Анатолиевич', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Шевченко Рафаил Михайлович', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Мазайло Трофим Артёмович', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Логинов Остин Данилович', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Борисов Йошка Васильевич', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Соловьёв Ждан Михайлович', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Негода Михаил Эдуардович', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Гордеев Шамиль Леонидович', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Многогрешный Павел Виталиевич', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Александров Игнат Анатолиевич', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Волков Эрик Алексеевич', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Кузьмин Ростислав Васильевич', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Стрелков Филипп Борисович', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' },
    { FIO: 'Галкин Феликс Платонович', games: "24534", wins: '9824', loss: '1222', percentage_of_wins: '87%' }
  ];
  return (
    <Container className="rating-players">
      <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px' }}>Рейтинг игроков</Text>
      <Container style={{ flexDirection: "column", alignItems: 'flex-start' }}>
        <Row style={{ fontWeight: "600" }}>
          <Cell style={{ width: "440px" }}>ФИО</Cell>
          <Cell>Всего игр</Cell>
          <Cell>Победы</Cell>
          <Cell>Проигрыши</Cell>
          <Cell style={{ width: "138px" }}>Процент побед</Cell>
        </Row>
        {data.map((item, index) => (
          <Row key={index}>
            <Cell style={{ width: "440px" }}>{item.FIO}</Cell>
            <Cell>{item.games}</Cell>
            <Cell style={{ color: "#69B849" }}>{item.wins}</Cell>
            <Cell style={{ color: "#E93E3E" }}>{item.loss}</Cell>
            <Cell style={{ width: "138px" }}>{item.percentage_of_wins}</Cell>
          </Row>
        ))}
      </Container>
    </Container>
  )
}
