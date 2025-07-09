import { ENDPOINT } from "./endpoint";
import { TodoRequst, TodoResponse } from "@/types/todo.type";

// TENANTID
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

// todos 조회
export async function fetchTodos(): Promise<TodoResponse[]> {
    const res = await fetch(ENDPOINT.GETITEM(TENANT_ID));
    if (!res.ok) throw new Error("조회 실패");
    return res.json();
}

// todos 생성
export async function addTodo(name: string): Promise<TodoResponse> {
    const res = await fetch(ENDPOINT.POSTITEM(TENANT_ID), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("등록 실패");
    return res.json();
}

// todos 업데이트
export async function updateTodoStatus({
    itemId,
    name,
    memo,
    imageUrl,
    isCompleted,
}: TodoRequst): Promise<TodoResponse> {
    const res = await fetch(ENDPOINT.PATCHITEM(TENANT_ID, itemId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, memo, imageUrl, isCompleted }),
    });
    if (!res.ok) throw new Error("수정 실패");
    return res.json();
}

// todosDetail 조회
export async function fetchDetailTodos(itemId: number): Promise<TodoResponse> {
    const res = await fetch(ENDPOINT.GETDETAILITEM(TENANT_ID, itemId));
    if (!res.ok) throw new Error("상세 조회 실패");
    return res.json();
}

// todo 삭제
export async function removeTodoStatus(itemId: number): Promise<{ message: string }> {
    const res = await fetch(ENDPOINT.DELETEITEM(TENANT_ID, itemId), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("삭제 실패");
    return res.json();
}

// 이미지 업로드
export async function imageUpload(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(ENDPOINT.POSTIMAGEUPLOAD(TENANT_ID), {
        method: "POST",
        body: formData,
    });
    if (!res.ok) throw new Error("삭제 실패");
    return res.json();
}
