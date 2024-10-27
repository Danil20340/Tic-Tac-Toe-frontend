import React, { CSSProperties } from 'react'
import './index.css'
type Props = {
    children: React.ReactNode;
    style?: CSSProperties;
    key?: number;
}

export const Row: React.FC<Props> = ({ style, children }) => {
    return (
        <div style={style} className="row-dat">{children}</div>
    )
}
