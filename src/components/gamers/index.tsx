import React from 'react';
import zero from '../../assets/zero.svg';
import cross from '../../assets/cross.svg';
import { Text } from '../text';
import './index.css';
import { Player } from '../../app/types';

type Props = {
  player1: Player;
  player2: Player;
};

export const Gamers: React.FC<Props> = ({ player1, player2 }) => {
  return (
    <div id="players">
      <Text style={{ fontWeight: 700, fontSize: '24px', lineHeight: '36px' }}>Игроки</Text>
      {[{ player: player1, icon: cross }, { player: player2, icon: zero }].map(({ player, icon }, index) => (
        <div className="container" key={index}>
          <div className="zero_cross">
            <img style={{ width: '24px' }} src={icon} alt="" />
            <Text style={{ width: '-webkit-fill-available', textAlign: 'left' }}>{player.fullName}</Text>
          </div>
          <span className="micro-text">{player.winRate + '%'}</span>
        </div>
      ))}
    </div>
  );
};
