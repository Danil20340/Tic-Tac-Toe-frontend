import { useRef, useEffect } from "react";

type Props = {
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    style?: React.CSSProperties;
};

export const Input: React.FC<Props> = ({ style, placeholder, value = "", onChange, onKeyDown }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const MAX_LENGTH = 150; // Ограничение на количество символов

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto"; // Сброс высоты
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Подгоняем высоту
        }
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= MAX_LENGTH) {
            onChange?.(event); // Обновляем value, если не превышен лимит символов
        }
    };

    return (
        <textarea
            ref={textAreaRef}
            style={style}
            className="defaultInput"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            rows={1}
            maxLength={MAX_LENGTH} // HTML-ограничение на ввод
        />
    );
};
