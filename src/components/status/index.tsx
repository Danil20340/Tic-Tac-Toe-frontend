import React, { CSSProperties } from 'react'
import './index.css'

type Props = {
    isFree?: boolean;
}

export const Status: React.FC<Props> = ({ isFree }) => {

    return (
        <div style={isFree === true ? { background: '#A8D37F' } : { background: '#87CAE8' }}
            className='status'>{isFree === true ? "Свободен" : "В игре"}</div>
    )
}
