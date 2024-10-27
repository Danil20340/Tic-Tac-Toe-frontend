import React, { CSSProperties } from 'react'

type Props = {
    children: React.ReactNode;
    style?: CSSProperties;
    className?: string;
}

export const Container: React.FC<Props> = ({ children, style, className }) => {
    const customStyle = {
        display: 'flex',
        justifyContent: 'center',
        width: '-webkit-fill-available',
        ...style
    }
    return (
        <div className={className} style={customStyle}>{children}</div>
    )
}