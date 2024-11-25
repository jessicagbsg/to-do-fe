import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { DialogContent } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

type Props = {
  isEditing?: boolean;
};

export const Note = ({ isEditing = false }: Props) => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todoInput.trim() !== "") {
      setTodos((prev) => [...prev, { id: prev.length + 1, title: todoInput, done: false }]);
      setTodoInput("");
    }
  };

  const handleSave = () => {
    if (title.trim() === "") return;
    if (isEditing) {
      // Save
    } else {
      // Create
    }
    setTitle("");
    setTodos([]);
    setTodoInput("");
    setFilter("all");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.done;
    if (filter === "notCompleted") return !todo.done;
    return true;
  });

  return (
    <DialogContent
      aria-describedby={undefined}
      className="sm:max-w-[425px] md:max-w-none md:w-2/3 md:h-4/5 flex flex-col min-h-0"
    >
      <DialogTitle className="text-sm text-secondary-foreground">Note</DialogTitle>
      <div
        className={cn([
          "grid h-full mt-4 gap-3 min-h-0",
          isEditing ? "grid-rows-[auto_auto_1fr_auto_auto]" : "grid-rows-[auto_1fr_auto_auto]",
        ])}
      >
        <div className="mb-4">
          <input
            type="text"
            className={`w-full border-b border-gray-300 text-2xl sm:text-3xl 
              md:text-4xl font-bold focus:outline-none focus:border-gray-500`}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {isEditing && (
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

              {isEditing && (
                <Trash
                  className="self-end h-4 w-4 text-muted-foreground cursor-pointer"
                  onClick={() => setTodos((prev) => prev.filter((t) => t.id !== todo.id))}
                />
              )}
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

        <Button className="justify-self-end w-fit mt-4" onClick={handleSave}>
          Save
        </Button>
      </div>
    </DialogContent>
  );
};
