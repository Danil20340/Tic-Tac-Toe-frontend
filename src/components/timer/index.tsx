import React, { useEffect, useState } from 'react';
import './index.css'

const getPadTime = (time: number) => time.toString().padStart(2, '0');

type TimerProps = {
    time: number;
    onChangeTime: (newTime: number) => void;
};

export const Timer: React.FC<TimerProps> = ({ time, onChangeTime }) => {
    const minutes = getPadTime(Math.floor(time / 60));
    const seconds = getPadTime(time % 60);

    useEffect(() => {
        const intervalId = setInterval(() => {
            onChangeTime(time + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time]);

    return (
        <div className="time">
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
        </div>
    );
};