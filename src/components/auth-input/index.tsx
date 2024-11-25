import React, { CSSProperties } from 'react'
import { Control, useController } from 'react-hook-form';
import '../input/index.css'

type Props = {
    name: string;
    placeholder?: string;
    type?: string;
    control: Control<any>
    required?: string;
    styleAuth?: CSSProperties;
    style?: CSSProperties;
    errorMessage?: string;
    onFieldChange?: () => void;
}

export const AuthInput: React.FC<Props> = (
    {
        name,
        placeholder,
        type,
        control,
        required = '',
        styleAuth,
        style,
        errorMessage,
        onFieldChange
    }
) => {
    const {
        field,
        fieldState: { invalid },
        formState: { errors }
    } = useController({
        name,
        control,
        rules: {
            required
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
                    field.onChange(e); // Вызываем react-hook-form обработчик
                    onFieldChange?.(); // Сбрасываем ошибку, если передан onFieldChange
                }}
            />
            {(errors[name]?.message || errorMessage) && (
                <div className="errorMessage">
                    {errors[name]?.message as string || errorMessage}
                </div>
            )}
        </div>

    )
}