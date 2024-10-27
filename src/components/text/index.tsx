import React, { CSSProperties } from 'react'

type Props = {
    style?: CSSProperties;
    children: React.ReactNode;
}

export const Text: React.FC<Props> = ({ style, children }) => {
    return (
        <div style={{
            lineHeight: "24px",
            letterSpacing: '0.24px',
            textAlign: 'center',
            color: '#373745',
            ...style
        }}
            className='text'>{children}</div>
    )
}
