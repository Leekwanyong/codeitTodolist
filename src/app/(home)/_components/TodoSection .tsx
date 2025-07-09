"use client";

import type { TodoResponse } from "@/types/todo.type";
import Image from "next/image";
import { updateTodoStatus } from "@/lib/api/todoApi";
import { useRouter } from "next/navigation";
import CheckInput from "@/compoents/common/Input/CheckInput";
import React, { useEffect, useState } from "react";

interface TodoSectionProps {
    list: TodoResponse[];
    onlyListItem?: boolean;
    titleImg?: string;
    emptyImg?: string;
    emptyAlt?: string;
    getTodos?: () => void;
    onUpdateTodo?: (updates: { name?: string }) => void;
}
// 할일 목록 완료된 항목 컴포넌트트
export default function TodoSection({
    list,
    onlyListItem = false,
    titleImg,
    emptyImg,
    emptyAlt,
    getTodos,
    onUpdateTodo,
}: TodoSectionProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(list[0]?.name ?? "");

    useEffect(() => {
        setEditValue(list[0]?.name ?? "");
    }, [list]);
    // 상세 페이지 항목 하나만 렌더링
    if (onlyListItem) {
        return (
            <>
                {list.map((todo) => {
                    const onSave = async () => {
                        setIsEditing(false);
                        if (editValue !== todo.name) {
                            onUpdateTodo?.({ name: editValue });
                        }
                    };

                    return (
                        <li
                            key={todo.id}
                            className={`${
                                todo.isCompleted && "bg-[#DDD6FE] "
                            } flex items-center justify-center gap-4 py-2 border-[var(--color-slate900)] border-2 rounded-[27px]`}
                        >
                            <CheckInput
                                onClick={(e) => e.stopPropagation()}
                                checked={todo.isCompleted}
                                onChange={async () => {
                                    await updateTodoStatus({
                                        itemId: todo.id,
                                        isCompleted: !todo.isCompleted,
                                    });
                                    if (getTodos) getTodos();
                                }}
                            />
                            {isEditing ? (
                                <input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onBlur={onSave}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") onSave();
                                    }}
                                    autoFocus
                                    className="truncate font-semibold bg-transparent border-b border-slate-400 outline-none"
                                />
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="font-bold underline cursor-pointer"
                                >
                                    {todo.name}
                                </button>
                            )}
                        </li>
                    );
                })}
            </>
        );
    }

    return (
        <div className="mx-4 desktop:mx-0 desktop:flex-1 tems-center mb-4">
            {titleImg && <Image src={titleImg} width={101} height={36} alt={emptyAlt || ""} />}
            {list.length === 0 ? (
                emptyImg ? (
                    <div className="flex flex-col items-center text-center text-slate400 font-bold justify-center py-8">
                        <div className="relative w-full max-w-[240px] aspect-[1/1]">
                            <Image src={emptyImg} alt={emptyAlt || ""} fill className="object-contain" />
                        </div>
                        <p className="mt-4 whitespace-pre-line">
                            {emptyImg === "/path/to/left.svg"
                                ? "할 일이 없어요.\nTODO를 새롭게 추가해주세요!"
                                : "아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!"}
                        </p>
                    </div>
                ) : null
            ) : (
                <ul className="mt-4 flex flex-col gap-2">
                    {list.map((todo) => (
                        <li
                            key={todo.id}
                            onClick={() => router.push(`/todo/${todo.id}`)}
                            className={`${
                                todo.isCompleted && "bg-[#EDE9FE] line-through"
                            } flex items-center gap-4 py-2 border-[var(--color-slate900)] border-2 rounded-[27px] pl-4 cursor-pointer`}
                        >
                            <CheckInput
                                onClick={(e) => e.stopPropagation()}
                                checked={todo.isCompleted}
                                onChange={async () => {
                                    await updateTodoStatus({
                                        itemId: todo.id,
                                        isCompleted: !todo.isCompleted,
                                    });
                                    if (getTodos) getTodos();
                                }}
                            />
                            <p className="truncate font-semibold">{todo.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
