import React, { CSSProperties } from 'react'
import './index.css'

type Props = {
    status?: 'isFree' | 'isActive' | 'isPlay' | 'isBlock';
    style?: CSSProperties;
}


type StatusConfig = {
    background: string;
    text: string;
}

const STATUS_CONFIG: Record<string, StatusConfig> = {
    'isFree': {
        background: '#A8D37F',
        text: 'Свободен'
    },
    'isActive': {
        background: '#A8D37F',
        text: 'Активен'
    },
    'isBlock': {
        background: '#EC7777',
        text: 'Заблокирован'
    },
    'isPlay': {
        background: '#87CAE8',
        text: 'В игре'
    }
} as const;

export const Status: React.FC<Props> = ({ status = 'isFree', style }) => {
    const currentStatus = STATUS_CONFIG[status];

    return (
        <div
            style={{ background: currentStatus.background, ...style }}
            className="status"
        >
            {currentStatus.text}
        </div>
    );
};
