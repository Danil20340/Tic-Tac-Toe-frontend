import React, { CSSProperties, forwardRef } from "react";
import "./index.css";

type Props = {
    children: React.ReactNode;
    style?: CSSProperties;
    className?: string;
};

// Используем forwardRef
export const Container = forwardRef<HTMLDivElement, Props>(({ children, style, className }, ref) => {
    return (
        <div ref={ref} style={style} className={`case ${className || ""}`}>
            {children}
        </div>
    );
});
