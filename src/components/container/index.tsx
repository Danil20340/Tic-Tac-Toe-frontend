import React, { CSSProperties } from 'react'
import './index.css'

type Props = {
    children: React.ReactNode;
    style?: CSSProperties;
    className?: string;
    ref?: React.Ref<HTMLDivElement>;
}

export const Container: React.FC<Props> = ({ children, style, className }) => {
    return (
        <div style={style} className={`case ${className || ''}`} >{children}</div>
    )
}