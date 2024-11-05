import React from 'react'
import { Square } from '../square';

type Props = {
    squares: Array<JSX.Element | null>;
    click: (index: number) => void;
}

export const Board: React.FC<Props> = ({ squares, click }) => {
    return (
        <div className="board">
            {
                squares.map((square, i) => (
                    <Square key={i} value={square} onClick={() => click(i)} />
                ))
            }
        </div>
    )
}
