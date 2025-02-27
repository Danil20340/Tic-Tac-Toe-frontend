import { useState } from 'react'
import block from '../../assets/block.svg'
import woman from '../../assets/woman.svg'
import man from '../../assets/man.svg'
import { Container } from '../../components/container'
import { Text } from '../../components/text'
import './index.css'
import { Button } from '../../components/button'
import { Row } from '../../components/row'
import { Cell } from '../../components/cell'
import { Status } from '../../components/status'
import { AddPlayerModal } from '../../components/add-player-modal'
import { useChangePlayerStatusMutation, useGetAllPlayersQuery } from '../../app/services/playerApi'
import { formatToClientDate } from '../../utils/format-to-client-date'
import { hasErrorField } from '../../utils/has-error-field'
import { useModal } from '../../components/modal-context'

export const Players = () => {
  const { data, refetch } = useGetAllPlayersQuery();
  const [selectPlayer, setSelectPlayer] = useState('')
  const [modalState, setModalState] = useState<'ADD' | 'EDIT'>('ADD')
  const [changePlayerStatus] = useChangePlayerStatusMutation();
  const [error, setError] = useState('');
  const handleClick = async (id: string) => {
    try {
      await changePlayerStatus({ id }).unwrap();
      await refetch();
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }
  const handleAddPlayer = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }
  };
  const { openModal } = useModal();
  return (
    <>
      <Container style={{ maxWidth: '1416px' }} className="rating-players">
        <Container className='playerHeader' style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px' }}>Список игроков</Text>
          <Button onClick={() => { openModal('playerModal'); setModalState(selectPlayer ? 'EDIT' : 'ADD') }}>{selectPlayer ? 'Редактировать игрока' : 'Добавить игрока'}</Button>
        </Container>
        <Container className='playerBody' style={{ flexDirection: "column", alignItems: 'flex-start' }}>
          <Row>
            <Cell style={{ minWidth: '332px' }}>ФИО</Cell>
            <Cell style={{ minWidth: '80px' }}>Возраст</Cell>
            <Cell style={{ minWidth: '46px' }}>Пол</Cell>
            <Cell style={{ minWidth: '110px' }}>Статус</Cell>
            <Cell style={{ minWidth: '144px' }}>Создан</Cell>
            <Cell style={{ minWidth: '144px' }} >Изменен</Cell>
            <Cell style={{ width: '174px' }}></Cell>
          </Row>
          {
            data && data.length > 0
              ? data.map(({
                id,
                fullName,
                age,
                gender,
                status,
                createdAt,
                updatedAt
              }) => (
                <Row key={id} className={id === selectPlayer ? 'selectPlayer' : 'playerField'} style={{ alignItems: 'center', height: '64px', paddingRight: '8px' }}
                  onClick={() => { selectPlayer === id ? setSelectPlayer('') : setSelectPlayer(id) }}>
                  <Cell style={{ minWidth: '332px' }}>{fullName}</Cell>
                  <Cell style={{ minWidth: '80px' }}>{age}</Cell>
                  {gender === "FEMALE" ? (
                    <Cell style={{ minWidth: '46px' }}>
                      <img src={woman} alt="" />
                    </Cell>
                  ) : (
                    <Cell style={{ width: '46px' }}>
                      <img src={man} alt="" />
                    </Cell>
                  )}
                  {status === "BLOCKED" ? (
                    <Status style={{ minWidth: '100px' }} status="isBlock" />
                  ) : (
                    <Status style={{ minWidth: '100px' }} status="isActive" />
                  )}
                  <Cell style={{ minWidth: '144px' }}>{formatToClientDate(createdAt)}</Cell>
                  <Cell style={{ minWidth: '144px' }}>{formatToClientDate(updatedAt)}</Cell>
                  {status === "BLOCKED" ? (
                    <Button
                      onClick={() => handleClick(id)}
                      style={{ width: '174px' }}
                      backgroundColor="#F7F7F7"
                    >
                      Разблокировать
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleClick(id)}
                      style={{ minWidth: '174px' }}
                      backgroundColor="#F7F7F7"
                    >
                      <img src={block} alt="" /> Заблокировать
                    </Button>
                  )}
                </Row>
              ))
              : null
          }
        </Container>
      </Container >

      <AddPlayerModal selectPlayer={selectPlayer} modalState={modalState} onPlayerAdded={handleAddPlayer} />
    </>
  )
}
