import { fetchDetailTodos } from "@/lib/api/todoApi";
import TodoDetailClient from "./_components/TodoDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const todo = await fetchDetailTodos(Number(id));
    return {
        title: `${todo.name} | Codeit TodoList!`,
        description: todo.memo || "할 일 상세 정보",
    };
}

export default async function TodoDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const todo = await fetchDetailTodos(Number(id));
    return <TodoDetailClient initialTodo={todo} />;
}
