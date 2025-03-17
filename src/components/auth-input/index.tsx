import React, { CSSProperties } from 'react'
import { Control, useController, RegisterOptions } from 'react-hook-form';
import '../input/index.css'

type Props = {
    name: string;
    placeholder?: string;
    type?: string;
    control: Control<any>;
    rules?: RegisterOptions; // <-- Передаем правила валидации
    styleAuth?: CSSProperties;
    style?: CSSProperties;
    errorMessage?: string;
    onFieldChange?: () => void;
    required?: string;
}

export const AuthInput: React.FC<Props> = ({
    name,
    placeholder,
    type,
    control,
    rules, 
    styleAuth,
    style,
    errorMessage,
    onFieldChange,
}) => {
    const {
        field,
        fieldState: { invalid },
        formState: { errors }
    } = useController({
        name,
        control,
        defaultValue: '',
        rules: {
            ...rules, // <-- Используем переданные правила валидации
            validate: (value) => {
                if (type !== 'number') return true;
                const num = Number(value);
                if (isNaN(num)) return 'Значение должно быть числом';
                if (!Number.isInteger(num)) return 'Число должно быть целым';
                if (num <= 0) return 'Число должно быть больше нуля';
                return true;
            }
        }
    });

    return (
        <div style={styleAuth}>
            <input
                className={`defaultInput ${invalid ? 'inputError' : ''}`}
                id={name}
                style={style}
                type={type}
                placeholder={placeholder}
                value={field.value}
                name={field.name}
                onBlur={field.onBlur}
                onChange={(e) => {
                    field.onChange(e);
                    onFieldChange?.();
                }}
            />
            {(errors[name]?.message || errorMessage) && (
                <div className="errorMessage">
                    {errors[name]?.message as string || errorMessage}
                </div>
            )}
        </div>
    );
};
