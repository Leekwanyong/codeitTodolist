import { TodoResponse } from "@/types/todo.type";
import TodoSection from "./TodoSection ";

interface TodoListProps {
    todos: TodoResponse[];
    getTodos: () => void;
}

// 전체 투두 목록을 미완료/완료로 분리하여 각각 보여주는 리스트 컴포넌트
export default function TodoList({ todos, getTodos }: TodoListProps) {
    // 할일 완료한 할일 배열로 분리하여 관리
    const todo: TodoResponse[] = [];
    const done: TodoResponse[] = [];

    // 할일 완료한 상태로 따로 관리
    todos.forEach((item) => {
        if (item.isCompleted) {
            done.push(item);
        } else {
            todo.push(item);
        }
    });
    return (
        <article className="mt-6">
            <div className="desktop:flex items-start gap-4 ">
                <TodoSection
                    list={todo}
                    titleImg="/assets/todo/todo.svg"
                    emptyImg="/assets/empty/Type=TodoSize=Large.svg"
                    emptyAlt="할일 목록이 없어요!"
                    onlyListItem={false}
                    getTodos={getTodos}
                />
                <TodoSection
                    list={done}
                    titleImg="/assets/todo/done.svg"
                    emptyImg="/assets/empty/Type=doneSize=Large.svg"
                    emptyAlt="완료된 항목이 없어요!"
                    onlyListItem={false}
                    getTodos={getTodos}
                />
            </div>
        </article>
    );
}
