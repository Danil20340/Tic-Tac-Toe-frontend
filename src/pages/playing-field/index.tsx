import React, { useState } from 'react';
import { Gamers } from '../../components/gamers';
import { Container } from '../../components/container';
import { Timer } from '../../components/timer';
import './index.css'
import { Chat } from '../../components/chat';
import { Step } from '../../components/step';
import { Board } from '../../components/board';
import { CalculateWinner } from '../../components/calculate-winner';
import bigCross from '../../assets/bigCross.svg'
import bigZero from '../../assets/bigZero.svg'

export const PlayingField = () => {
  const [timeWork, setTimeWork] = useState(0);
  const [board, setBoard] = useState(Array(9).fill(null));
  const boardCopy = [...board];
  const [XIsNext, setXIsNext] = useState(true);
  const winner = CalculateWinner(board);
  const handleClick = (index: number): void => {
    if (winner || boardCopy[index]) return
    boardCopy[index] = XIsNext ? <img src={bigCross} alt="" /> : <img src={bigZero} alt="" />
    setBoard(boardCopy)
    setXIsNext(!XIsNext)
  }
  return (
    <Container className='common'>
      <Gamers />
      <Container style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '40px' }}>
        <Timer time={timeWork} onChangeTime={setTimeWork} />
        <Board squares={board} click={handleClick} />
        <Step />
      </Container>
      <Chat />
    </Container>
  );
};