import React, { CSSProperties } from 'react'
import './index.css'
type Props = {
    children: React.ReactNode;
    style?: CSSProperties;
    key?: number | string;
    className?: string;
    onClick?: () => void;
}

export const Row: React.FC<Props> = ({ style, children, className, onClick }) => {
    return (
        <div onClick={onClick} style={style} className={`row-dat ${className || ''}`}>{children}</div>
    )
}
