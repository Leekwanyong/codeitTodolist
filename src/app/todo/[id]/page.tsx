import { fetchDetailTodos } from "@/lib/api/todoApi";
import TodoDetailClient from "./_components/TodoDetailClient";

export async function generateMetadata({ params }: { params: { id: string } }) {
    const todo = await fetchDetailTodos(Number(params.id));
    return {
        title: `${todo.name} | Codeit TodoList!`,
        description: todo.memo || "할 일 상세 정보",
    };
}

export default async function TodoDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const todo = await fetchDetailTodos(Number(id));
    return <TodoDetailClient initialTodo={todo} />;
}
