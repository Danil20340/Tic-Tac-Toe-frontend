import React, { CSSProperties } from 'react'
import './index.css'
type Props = {
    style?: CSSProperties;
    children: React.ReactNode;
    className?: string;
}

export const Text: React.FC<Props> = ({ style, children,className }) => {
    return (
        <div style={{
            lineHeight: "24px",
            letterSpacing: '0.24px',
            textAlign: 'center',
            color: '#373745',
            ...style
        }}
        className={`text ${className || ""}`}>{children}</div>
    )
}
