import React from "react";

interface InputProps {
    type?: string;
    accpt?: boolean;
    value?: string;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
    placeholder = "할 일을 입력해주세요",
    type,
    accpt,
    value,
    disabled,
    className,
    onChange,
}: InputProps) {
    return (
        <input
            type={type}
            accept={`${accpt && "image/*"}`}
            disabled={disabled}
            placeholder={placeholder}
            className={`${className} rounded-3xl border-[var(--color-slate900)]`}
            value={value}
            onChange={onChange}
        />
    );
}
