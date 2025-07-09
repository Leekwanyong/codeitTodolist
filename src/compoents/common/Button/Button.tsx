import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    color: "primary" | "success" | "danger";
    size?: "sm" | "md" | "lg";
    shape?: "circle";
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit";
    mode: "primary" | "detail";
    ariaLabel?: string;
    disabled?: boolean;
}
// 버튼 사이즈
const buttonSizeMap = {
    sm: "w-[56px] h-[56px]",
    md: "w-[64px] h-[64px]",
    lg: "w-[168px] h-[56px]",
};
// 버튼 모서리 둥근
const shapeClassMap = {
    circle: "rounded-full",
    default: "rounded-3xl",
};
// 버튼 색상상
const buttonColorMap = {
    primary: {
        primary: "bg-primary600",
        success: "bg-lime300",
        danger: "bg-rose500",
    },
    detail: {
        primary: "bg-slate200",
        success: "bg-lime300",
        danger: "bg-rose500",
    },
};

export default function Button({
    className = "",
    size = "sm",
    shape = "circle",
    type = "button",
    disabled = false,
    mode = "detail",
    ariaLabel,
    children,
    color,
    onClick,
}: ButtonProps) {
    const baseClass = "border-2 border-b-6 border-r-6 border-black font-bold";
    const sizeClass = buttonSizeMap[size];
    const shapeClass = shapeClassMap[shape] || shapeClassMap.default;
    const bgColorClass = disabled ? "bg-slate-100 cursor-not-allowed" : `${buttonColorMap[mode][color]} cursor-pointer`;

    return (
        <button
            type={type}
            aria-label={ariaLabel}
            className={`${baseClass} ${sizeClass} ${shapeClass} ${bgColorClass} ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            <span className="flex items-center gap-2 justify-center w-full h-full overflow-hidden shrink-0">
                {children}
            </span>
        </button>
    );
}
