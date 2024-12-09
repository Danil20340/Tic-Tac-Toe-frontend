import React from 'react';
import './index.css'

type Props = {
    isChecked: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Switch: React.FC<Props> = ({ isChecked, onChange }) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={isChecked} onChange={onChange} />
            <span className="slider" />
        </label>
    );
};
