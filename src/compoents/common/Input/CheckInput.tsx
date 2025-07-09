import Image from "next/image";
import { ChangeEvent, MouseEvent } from "react";

interface CheckInputProps {
    label?: string;
    onClick?: (e: MouseEvent<HTMLLabelElement | HTMLSpanElement>) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
}

export default function CheckInput({ label, onClick, onChange, checked }: CheckInputProps) {
    return (
        <label className="inline-flex items-center cursor-pointer" onClick={onClick}>
            <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
            <span className="w-8 h-8 flex items-center justify-center">
                <Image
                    src={checked ? "/assets/icons/ActiveCheckbox.svg" : "/assets/icons/Checkbox.svg"}
                    width={32}
                    height={32}
                    alt={checked ? "체크됨" : "체크안됨"}
                />
            </span>
            {label}
        </label>
    );
}
