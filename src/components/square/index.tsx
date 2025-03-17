import React from 'react'
import './index.css'
import bigCross from '../../assets/bigCross.svg';
import bigZero from '../../assets/bigZero.svg';

type Props = {
    value: 'X' | 'O' | null;
    onClick: () => void;
    nowMove: 'X' | 'O' | undefined;
    isMakingMove: boolean;
    isWinningCell: boolean;
}

export const Square: React.FC<Props> = ({ value, onClick, isMakingMove, isWinningCell, nowMove }) => {
    return (
        <button
            disabled={isMakingMove}
            onClick={onClick}
            className={'square'}
            style={isWinningCell ?
                nowMove === "X" ?
                    { backgroundColor: '#F3BBD0' } :
                    { backgroundColor: '#CFEDE6' } :
                {}}
        >
            {value === 'X' ? <img className="symbol" src={bigCross} alt="" /> : value === 'O' ? <img className="symbol" src={bigZero} alt="" /> : null}
        </button>
    );
}
