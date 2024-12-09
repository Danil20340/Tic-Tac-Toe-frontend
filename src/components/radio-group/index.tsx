import { Controller } from "react-hook-form";
import "./index.css";
type RadioOption = {
    value: string;
    label: string;
    icon?: string;
}

interface RadioGroupProps {
    name: string;
    control: any;
    options: RadioOption[];
    rules?: any;
    error?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, control, options, rules, error }) => {
    return (
        <div className="radio-form">
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <>
                        {options.map((option) => (
                            <label key={option.value} className="radio-control">
                                <input
                                    type="radio"
                                    value={option.value}
                                    checked={field.value === option.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                                <span className="radio-input">
                                    {option.icon && <img src={option.icon} alt={option.label} />}
                                </span>
                            </label>
                        ))}
                    </>
                )}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default RadioGroup;
