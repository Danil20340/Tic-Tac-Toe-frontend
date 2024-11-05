import React, { CSSProperties, useRef, useEffect } from "react";
import './index.css';

type Props = {
    placeholder?: string;
    required?: boolean;
    style?: CSSProperties;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
}

export const Input: React.FC<Props> = ({ style, required = false, placeholder, value, onChange, type = "text" }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (type === 'textArea' && textAreaRef.current) {
            if (textAreaRef.current) {
                textAreaRef.current.style.height = 'auto';
                textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
            }
        }
    }, [value, type]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (type === "number" && event.target instanceof HTMLInputElement) {
            const valueAsNumber = parseFloat(event.target.value);
            if (isNaN(valueAsNumber) || valueAsNumber < 0 || valueAsNumber > 100) {
                event.target.value = '';
            }
        }
        if (onChange) {
            onChange(event);
        }
    };

    if (type === 'textArea') {
        return (
            <textarea
                ref={textAreaRef}
                style={style}
                className="defaultInput"
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                rows={1}
            />
        );
    }

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