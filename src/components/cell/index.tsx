import React, { CSSProperties } from 'react'
import './index.css'

type Props = {
    children?: React.ReactNode;
    style?: CSSProperties;
    className?: string;
}

export const Cell: React.FC<Props> = ({ style, children, className }) => {
    return (
        <div style={style} className={`cell-common ${className || ""}`}>{children}</div>
    )
}
