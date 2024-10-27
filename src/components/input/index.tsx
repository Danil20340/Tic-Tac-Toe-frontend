import React, { CSSProperties } from "react";
import './index.css';

type Props = {
    placeholder: string;
    required?: boolean;
    style?: CSSProperties;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export const Input: React.FC<Props> = ({ style, required = false, placeholder, value, onChange, type = "text" }) => {
    return (
        <input
            style={style}
            required={required}
            className="defaultInput"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
        />
    );
};