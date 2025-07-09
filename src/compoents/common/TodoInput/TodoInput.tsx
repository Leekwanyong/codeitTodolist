import Image from "next/image";
import Button from "../Button/Button";
import Input from "../Input/Input";
import React from "react";

interface TodoInputProps {
    value: string;
    updateLoading: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// todo 입력 UI 컴포넌트
export default function TodoInput({ value, updateLoading, onSubmit, onChange }: TodoInputProps) {
    const isDisabled = value.trim().length === 0 || updateLoading;
    const plusIcon = value.trim().length === 0 ? "/assets/icons/Frame2610256.svg" : "/assets/icons/Plus.svg";
    return (
        <article className="mt-6 flex justify-center">
            <form onSubmit={onSubmit} className="mx-4 flex items-center w-full max-w-full desktop:mx-0">
                <Input
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 font-bold border-2 border-b-6 border-r-6 text-[var(--color-slate500)] shadow bg-[var(--color-slate100)]"
                />
                <Button
                    type="submit"
                    color="primary"
                    mode="primary"
                    disabled={isDisabled}
                    size="sm"
                    shape="circle"
                    aria-label="할 일 추가"
                    className="ml-2 p-0  desktop:hidden flex items-center justify-center"
                >
                    <Image src={plusIcon} alt="추가하기 버튼" width={16} height={16} />
                </Button>
                <Button
                    type="submit"
                    color="primary"
                    mode="primary"
                    disabled={isDisabled}
                    size="lg"
                    shape="circle"
                    aria-label="할 일 추가"
                    className={`ml-2 items-center justify-center gap-2 ${
                        value.trim().length === 0 ? "" : "text-white"
                    } font-bold hidden desktop:flex`}
                >
                    <Image src={plusIcon} alt="추가하기 버튼" width={16} height={16} />
                    추가하기
                </Button>
            </form>
        </article>
    );
}
