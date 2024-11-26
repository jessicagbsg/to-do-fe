import { useEffect, useState } from "react";
import { ArrowLeft, Trash } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, NoteTitle } from "@/components";
import { FETCH_NOTE, NoteQuery } from "@/graphql";
import { cn } from "@/lib/utils";

export const Note = () => {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();
  const { loading, error, data } = useQuery<NoteQuery>(FETCH_NOTE, {
    variables: { id: noteId },
    skip: !noteId,
  });

  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.done;
    if (filter === "notCompleted") return !todo.done;
    return true;
  });

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todoInput.trim() !== "") {
      setTodos((prev) => [...prev, { id: prev.length + 1, title: todoInput, done: false }]);
      setTodoInput("");
    }
  };

  useEffect(() => {
    if (data) setTodos(data.note.todos);
  }, [data]);

  if (loading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <ClipLoader loading={loading} size={50} />
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col h-full w-full max-w-screen-lg mx-auto p-8 pb-16">
      <Button
        onClick={() => navigate("/")}
        variant={"ghost"}
        className="self-start flex items-center text-muted-foreground gap"
      >
        <ArrowLeft className="h-4 w-4 " />
        <span>Back</span>
      </Button>

      <div
        className={cn([
          "grid h-full mt-4 gap-3 min-h-0",
          !!todos.length ? "grid-rows-[auto_auto_1fr_auto]" : "grid-rows-[auto_1fr_auto]",
        ])}
      >
        <div className="mb-4">
          {data && <NoteTitle noteId={noteId!} initialTitle={data.note.title} />}
        </div>

        {!!todos.length && (
          <div className="flex justify-start gap-x-2">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "ghost"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
            <Button
              variant={filter === "notCompleted" ? "default" : "ghost"}
              onClick={() => setFilter("notCompleted")}
            >
              Not Completed
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-3 overflow-y-auto mt-3 custom-scrollbar">
          {filteredTodos.map((todo) => (
            <div key={`todo-${todo.id}`} className="flex justify-between pr-2">
              <div
                className={cn(
                  "flex items-center gap-x-2",
                  todo.done && "line-through text-muted-foreground opacity-50"
                )}
              >
                <Checkbox
                  checked={todo.done}
                  onClick={() => {
                    setTodos((prev) =>
                      prev.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t))
                    );
                  }}
                />
                <p className="text-sm text-muted-foreground line-clamp-1">{todo.title}</p>
              </div>

              <Trash
                className="self-end h-4 w-4 text-muted-foreground cursor-pointer"
                onClick={() => setTodos((prev) => prev.filter((t) => t.id !== todo.id))}
              />
            </div>
          ))}
        </div>

        <input
          type="text"
          className="mt-4 w-full border-b border-gray-300 text-lg focus:outline-none focus:border-gray-500"
          placeholder="Add a to-do and press Enter"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          onKeyDown={handleAddTodo}
        />
      </div>
    </div>
  );
};
