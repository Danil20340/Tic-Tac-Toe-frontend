import React, { useEffect, useState } from 'react';
import './index.css';

const getPadTime = (time: number) => time.toString().padStart(2, '0');

type TimerProps = {
    createTime: Date | null;  // Теперь передаём время начала игры
};

export const Timer: React.FC<TimerProps> = ({ createTime }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!createTime) return;

        const startTime = new Date(createTime).getTime();
        
        const updateTimer = () => {
            const now = Date.now();
            setTime(Math.floor((now - startTime) / 1000));
        };

        updateTimer(); // Сразу обновляем время

        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, [createTime]);

    const minutes = getPadTime(Math.floor(time / 60));
    const seconds = getPadTime(time % 60);

    return (
        <div className="time">
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
        </div>
    );
};
