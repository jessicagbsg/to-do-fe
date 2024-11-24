import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { DialogContent } from "../ui/dialog";

export const NoteBody = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [todoInput, setTodoInput] = useState("");

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todoInput.trim() !== "") {
      setTodos((prev) => [...prev, { id: prev.length + 1, title: todoInput, done: false }]);
      setTodoInput("");
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-none md:w-2/3 md:h-4/5">
      <div className="flex flex-col h-full mt-4 gap-3">
        <div className="mb-4">
          <input
            type="text"
            className="w-full border-b border-gray-300 text-2xl sm:text-3xl md:text-4xl font-bold focus:outline-none focus:border-gray-500"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col flex-1 gap-3 overflow-y-auto mt-3">
          {todos.map((todo) => (
            <div className="flex justify-between">
              <div
                key={`todo-${todo.id}`}
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
                <p className="text-sm text-muted-fore line-clamp-1">{todo.title}</p>
              </div>

              <Trash className="self-end h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="w-full border-b border-gray-300 text-lg focus:outline-none focus:border-gray-500"
            placeholder="Add a to-do and press Enter"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            onKeyDown={handleAddTodo}
          />
        </div>

        <Button
          className="self-end mt-4"
          onClick={() => {
            console.log({ title, todos });
            setTitle("");
            setTodos([]);
            setTodoInput("");
          }}
        >
          Save
        </Button>
      </div>
    </DialogContent>
  );
};
