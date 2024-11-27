import { useEffect, useState, useMemo } from "react";
import { Trash } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useMutation, useQuery } from "@apollo/client";
import { Checkbox } from "@/components";
import {
  DELETE_TODO,
  FETCH_TODOS_BY_NOTE,
  TodosQuery,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_TITLE,
} from "@/graphql";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";

type Props = {
  noteId?: string;
  filter: FilterType;
};

export const Todos = ({ filter, noteId }: Props) => {
  const { loading, error, data } = useQuery<TodosQuery>(FETCH_TODOS_BY_NOTE, {
    variables: { noteId },
    skip: !noteId,
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: FETCH_TODOS_BY_NOTE, variables: { noteId } }],
  });
  const [updateTodoStatus] = useMutation(UPDATE_TODO_STATUS, {
    refetchQueries: [{ query: FETCH_TODOS_BY_NOTE, variables: { noteId } }],
  });
  const [updateTodoTitle] = useMutation(UPDATE_TODO_TITLE, {
    refetchQueries: [{ query: FETCH_TODOS_BY_NOTE, variables: { noteId } }],
  });

  const [todos, setTodos] = useState<TodoModel[]>([]);
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.done;
    if (filter === "notCompleted") return !todo.done;
    return true;
  });
  const debouncedUpdateTodoTitle = useMemo(
    () =>
      debounce(async (id: number, title: string) => {
        try {
          await updateTodoTitle({ variables: { id, title } });
        } catch (error) {
          console.error("Error updating todo title:", error);
        }
      }, 500),
    [updateTodoTitle]
  );

  const handleTitleChange = (id: number, title: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
    debouncedUpdateTodoTitle(id, title);
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo({ variables: { id } });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdateTodoStatus = async (id: number, done: boolean) => {
    try {
      await updateTodoStatus({ variables: { id, done } });
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done } : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    if (data) setTodos(data.todos);
  }, [data]);

  useEffect(() => {
    return () => debouncedUpdateTodoTitle.cancel();
  }, [debouncedUpdateTodoTitle]);

  if (loading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <ClipLoader loading={loading} size={50} />
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-3 overflow-y-auto mt-3 custom-scrollbar">
      {filteredTodos.map((todo) => (
        <div key={`todo-${todo.id}`} className="flex justify-between pr-2">
          <div
            className={cn(
              "flex items-center gap-x-2 w-full pr-4",
              todo.done && "line-through text-muted-foreground opacity-50"
            )}
          >
            <Checkbox
              checked={todo.done}
              onClick={() => handleUpdateTodoStatus(todo.id, !todo.done)}
            />

            <input
              type="text"
              className="w-full px-1 text-sm md:text-md  line-clamp-1 focus:outline-none border-b border-transparent focus:border-gray-300"
              value={todo.title}
              onChange={(e) => handleTitleChange(todo.id, e.target.value)}
            />
          </div>

          <Trash
            className="self-end h-4 w-4 text-muted-foreground cursor-pointer"
            onClick={() => handleDeleteTodo(Number(todo.id))}
          />
        </div>
      ))}
    </div>
  );
};
