import React from 'react'
import './index.css'

type Props = {
    value: JSX.Element | null;
    onClick: () => void;
}

export const Square: React.FC<Props> = ({ value, onClick }) => {
    return <div onClick={onClick} className="square">{value}</div>;
}
