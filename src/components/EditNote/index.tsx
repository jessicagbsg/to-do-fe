import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";

type Props = {
  note: NoteModel;
};

export const EditNote = ({ note }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      key={`note-${note.id}`}
      onClick={() => navigate(`/${note.id}`)}
      className={`flex flex-col min-w-44 w-full max-w-full sm:max-w-56 h-44 
         gap-y-2 p-4 cursor-pointer bg-secondary/10 rounded-lg shadow-md`}
    >
      <h4 className="text-base font-semibold text-primary line-clamp-1 py-2">{note.title}</h4>
      <div className="flex flex-col mt-2 h-full justify-between">
        <div className="flex flex-col gap-y-1 w-full h-20 overflow-y-clip opacity-65">
          {note.todos.map((todo, index) => (
            <div
              key={`todo-${index}`}
              className={cn(
                "flex items-center gap-x-2",
                todo.done && "line-through text-muted-foreground opacity-50"
              )}
            >
              <Checkbox checked={todo.done} className="cursor-pointer" />
              <p className="text-sm text-muted-fore line-clamp-1">{todo.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
