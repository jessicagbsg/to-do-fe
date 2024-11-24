import { cn } from "@/lib/utils";

export const Note = ({ id, title, todos }: Props) => {
  return (
    <div
      key={`note-${id}`}
      onClick={() => console.log("clicked")}
      className={`flex flex-col items-start min-w-44 w-full max-w-full sm:max-w-56
        h-44 gap-y-2 p-4 cursor-pointer bg-secondary/10 rounded-lg shadow-md`}
    >
      <h4 className="text-base font-semibold text-primary line-clamp-1">{title}</h4>

      <div className="flex flex-col gap-y-1 w-full">
        {todos.map((todo, index) => (
          <div
            key={`todo-${index}`}
            className={cn(
              "flex items-center gap-x-2",
              todo.done && "line-through text-muted-foreground opacity-50"
            )}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={(e) => console.log(e.target.checked)}
            />
            <p className="text-sm text-primary line-clamp-1">{todo.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

type Props = {
  id: number;
  title: string;
  todos: { text: string; done: boolean }[];
};
