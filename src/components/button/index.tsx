import React from "react";
import './index.css';

type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    color?: "white" | "black";
    backgroundColor?: "#60C2AA" | "#F7F7F7";
}

export const Button: React.FC<Props> = ({ backgroundColor = "#60C2AA", disabled = false, children, color = "white" }) => {

    return (
        <button
            style={{ backgroundColor: backgroundColor, color: color }}
            className="defaultButton"
            disabled={disabled}
            onMouseOver={(e) => {
                if (!disabled) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = backgroundColor === "#60C2AA" ? "#3BA189" : "#DCDCDF";
                }
            }}
            onMouseOut={(e) => {
                if (!disabled) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = backgroundColor;
                }
            }}
        >
            {children}
        </button>
    );
}