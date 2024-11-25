import React, { CSSProperties } from "react";
import './index.css';

type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    style?: CSSProperties;
    color?: "white" | "black";
    backgroundColor?: "#60C2AA" | "#F7F7F7";
    type?: "button" | "submit";
    onClick?: () => void;
}

export const Button: React.FC<Props> = ({ backgroundColor = "#60C2AA", disabled = false, children, color = "white", style, onClick, type = "button" }) => {

    return (
        <button
            style={{ backgroundColor: backgroundColor, color: backgroundColor === "#60C2AA" ? color : "black", ...style }}
            className="defaultButton"
            disabled={disabled}
            type={type}
            onClick={onClick}
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