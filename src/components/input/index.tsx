import React, { CSSProperties } from "react";
import './index.css';

type Props = {
    placeholder?: string;
    required?: boolean;
    style?: CSSProperties;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export const Input: React.FC<Props> = ({ style, required = false, placeholder, value, onChange, type = "text" }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "number") {
            const valueAsNumber = parseFloat(event.target.value);
            if (isNaN(valueAsNumber) || valueAsNumber < 0 || valueAsNumber > 100) {
                event.target.value = '';
            }
        }
        if (onChange) {
            onChange(event);
        }
    };
    return (
        <input
            style={style}
            required={required}
            className="defaultInput"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            type={type}
            min={type === "number" ? "0" : undefined}
            max={type === "number" ? "100" : undefined}
        />
    );
};