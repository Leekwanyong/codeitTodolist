"use client";
import { useCallback, useEffect, useState } from "react";
import type { TodoResponse } from "@/types/todo.type";
import { addTodo, fetchTodos } from "@/lib/api/todoApi";
import TodoInput from "@/compoents/common/TodoInput/TodoInput";
import TodoList from "./TodoList";
import { useAsync } from "@/hooks/useAsync";
import Spinner from "@/compoents/common/Spinner/Spinner";

// 조회 투두 추가 컴포넌트
export default function TodoContainer() {
    const { run: fetchTodo, loading: fetchLoading, error: fetchError } = useAsync(fetchTodos);
    const { run: updateTodo, loading: updateLoading, error: updateError } = useAsync(addTodo);
    const [todos, setTodos] = useState<TodoResponse[]>([]);
    const [value, setValue] = useState<string>("");

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);
    // 조회
    const getTodos = useCallback(async () => {
        try {
            const data = await fetchTodo();
            setTodos(data);
        } catch (e) {
            alert(`할 일을 불러오는 중 네트워크 오류가 발생했습니다! ${e}`);
        }
    }, [fetchTodo]);

    // 요청 후 todos 배열 상태 갱신
    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!value.trim()) {
                alert("할 일을 입력해주세요!");
                return;
            }
            try {
                await updateTodo(value);
                setValue("");
                await getTodos();
            } catch (e) {
                alert(`네트워크 오류가 발생했습니다.${e}`);
            }
        },
        [getTodos, updateTodo, value]
    );

    useEffect(() => {
        getTodos();
    }, [getTodos]);
    return (
        <section>
            {fetchLoading && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
                    role="status"
                    aria-live="polite"
                >
                    <Spinner size={48} />
                </div>
            )}
            {fetchError && <div className="text-red-500">{fetchError}</div>}
            {updateError && <div className="text-red-500">{updateError}</div>}
            <TodoInput value={value} updateLoading={updateLoading} onChange={onChange} onSubmit={onSubmit} />
            <TodoList todos={todos} getTodos={getTodos} />
        </section>
    );
}
