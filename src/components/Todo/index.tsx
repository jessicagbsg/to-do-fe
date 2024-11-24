import { cn } from "@/lib/utils";
import { Checkbox } from "@radix-ui/react-checkbox";

export const Todo = ({ todo }: Props) => {
  return (
    <div
      key={`todo-${todo.id}`}
      className={cn(
        "flex items-center gap-x-2",
        todo.done && "line-through text-muted-foreground opacity-50"
      )}
    >
      <Checkbox checked={todo.done} />
      <p className="text-sm text-muted-fore line-clamp-1">{todo.title}</p>
    </div>
  );
};

type Props = {
  todo: {
    id: number;
    title: string;
    done: boolean;
  };
};
