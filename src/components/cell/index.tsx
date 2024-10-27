import React, { CSSProperties } from 'react'
import './index.css'

type Props = {
    children: React.ReactNode;
    style?: CSSProperties;
}

export const Cell: React.FC<Props> = ({ style, children }) => {
    return (
        <div style={style} className="cell-common">{children}</div>
    )
}
