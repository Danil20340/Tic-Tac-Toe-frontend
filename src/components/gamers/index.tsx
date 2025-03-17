import React, { useEffect, useState } from 'react';
import zero from '../../assets/zero.svg';
import cross from '../../assets/cross.svg';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
import { Text } from '../text';
import './index.css';
import { Player } from '../../app/types';

type Props = {
  player1: Player;
  player2: Player;
};

export const Gamers: React.FC<Props> = ({ player1, player2 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Следим за изменением размера экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      id="players"
      className={isMobile && !isOpen ? 'collapsed' : 'expanded'}
      onClick={() => isMobile && setIsOpen(!isOpen)} // Только на мобилках
    >
      <div className="gamersHeader">
        <Text className='gamersText' style={{ fontWeight: 700, fontSize: '24px', lineHeight: '36px' }}>Игроки</Text>
        {isMobile && <img src={isOpen ? arrowUp : arrowDown} alt="toggle" className="toggleIcon" />}
      </div>
      <div className={`playersList ${isOpen ? 'open' : 'closed'}`}>
        {[{ player: player1, icon: cross }, { player: player2, icon: zero }].map(({ player, icon }, index) => (
          <div className="container" key={index}>
            <div className="zero_cross">
              <img className='gamerIcon' style={{ width: '24px' }} src={icon} alt="" />
              <Text className='gamerName' style={{ width: '-webkit-fill-available', textAlign: 'left' }}>{player.fullName}</Text>
            </div>
            <span className="micro-text">{player.winRate + '% побед'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
