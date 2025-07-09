"use client";

import type { TodoResponse } from "@/types/todo.type";
import React, { useCallback, useState } from "react";
import { fetchDetailTodos, imageUpload, removeTodoStatus, updateTodoStatus } from "@/lib/api/todoApi";
import TodoDetailActions from "./TodoDetailActions";
import TodoSection from "@/app/(home)/_components/TodoSection ";
import { useAsync } from "@/hooks/useAsync";
import Spinner from "@/compoents/common/Spinner/Spinner";
import { useRouter } from "next/navigation";

interface TodoDetailClientProps {
    initialTodo: TodoResponse;
}

const IMAGE_MAX_SIZE = 5 * 1024 * 1024;

export default function TodoDetailClient({ initialTodo }: TodoDetailClientProps) {
    const router = useRouter();
    const { run: fetchTodo, loading: fetchLoading, error: fetchError } = useAsync(fetchDetailTodos);
    const { run: removeTodo, loading: removeLoading, error: removeError } = useAsync(removeTodoStatus);
    const { run: updateTodo, loading: updateLoading, error: updateError } = useAsync(updateTodoStatus);
    const { run: uploadImage, loading: uploadLoading, error: uploadError } = useAsync(imageUpload);

    const [todo, setTodo] = useState<TodoResponse>(initialTodo);
    const [memo, setMemo] = useState(initialTodo.memo ?? "");
    const [uploadImgUrl, setUploadImgUrl] = useState<string | null>(null);

    const onChangeMemo = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMemo(e.target.value);
    }, []);

    // TodoDetail 조회
    const getTodo = useCallback(async () => {
        const data = await fetchTodo(todo?.id);
        setTodo(data);
    }, [fetchTodo, todo?.id]);

    // 삭제
    const onDelete = useCallback(async () => {
        try {
            await removeTodo(todo?.id);
            router.push("/");
        } catch (e) {
            alert(`할 일을 불러오는 중 오류 발생: ${e}`);
        }
    }, [removeTodo, todo?.id, router]);

    // 이미지 업로드
    const onImageUpload = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const { files } = e.target;
            if (!files || files.length === 0) return;
            const uploadFile = files[0];

            const fileNameRegex = /^[a-zA-Z0-9_.-]+\.[a-zA-Z]+$/;
            if (!fileNameRegex.test(uploadFile.name)) {
                alert("영문자, 숫자, _, -, .만 사용할 수 있습니다.");
                return;
            }

            if (uploadFile.size > IMAGE_MAX_SIZE) {
                alert("이미지 크기가 너무 큽니다.");
                return;
            }

            try {
                const result = await uploadImage(uploadFile);
                setUploadImgUrl(result?.url);
                await updateTodo({ itemId: todo?.id, imageUrl: result?.url });
                setTodo({ ...todo, imageUrl: result?.url });
            } catch (e) {
                alert(`이미지 업로드 실패: ${e}`);
            }
        },
        [todo, updateTodo, uploadImage]
    );

    // 메모수정시 홈으로 투두 내용 수정시 페이지 유지 분기 처리
    const onUpdateTodo = useCallback(
        async ({ name, memo }: { name?: string; memo?: string }) => {
            try {
                const shouldUpdateName = name && name !== todo.name;
                const shouldUpdateMemo = memo && memo !== todo.memo;

                if (!shouldUpdateName && !shouldUpdateMemo) {
                    alert("변경된 내용이 없습니다.");
                    return;
                }

                if (shouldUpdateName) {
                    await updateTodo({ itemId: todo.id, name });
                    await getTodo();
                }

                if (shouldUpdateMemo) {
                    await updateTodo({ itemId: todo.id, memo });
                    router.push("/");
                }
            } catch (e) {
                alert(`수정 중 오류 발생: ${e}`);
            }
        },
        [todo, updateTodo, getTodo, router]
    );

    return (
        <article className="px-4 tablet:px-4 laptop:px-0 desktop:px-0 mt-6">
            <ul>
                <TodoSection list={[todo]} onlyListItem getTodos={getTodo} onUpdateTodo={onUpdateTodo} />
            </ul>

            {fetchLoading ||
                (updateLoading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                        <Spinner size={48} />
                    </div>
                ))}
            {fetchError && <p className="text-red-500">{fetchError}</p>}
            {removeError && <p className="text-red-500">{removeError}</p>}
            {updateError && <p className="text-red-500">{updateError}</p>}
            {uploadError && <p className="text-red-500">{uploadError}</p>}

            <TodoDetailActions
                value={memo}
                memo={todo.memo}
                uploadImgUrl={uploadImgUrl}
                todoImgUrl={todo.imageUrl}
                actions={{
                    onChangeMemo,
                    onDelete,
                    onImageUpload,
                    onUpdateTodo: () => onUpdateTodo({ memo }),
                }}
                loading={{ removeLoading, updateLoading, uploadLoading }}
            />
        </article>
    );
}
