import React from 'react'
import { Square } from '../square';

type Props = {
    board: Array<'X' | 'O' | null>;
    click: (index: number) => void;
    nowMove: 'X' | 'O' | undefined;
    isMakingMove: boolean;
    winningPattern: number[];
}

export const Board: React.FC<Props> = ({ board, click, isMakingMove, winningPattern, nowMove }) => {
    return (
        <div className="board">
            {
                board.map((square, i) => (
                    <Square nowMove={nowMove}  isMakingMove={isMakingMove} key={i} value={square} isWinningCell={winningPattern.includes(i)} onClick={() => click(i)} />
                ))
            }
        </div>
    )
}
