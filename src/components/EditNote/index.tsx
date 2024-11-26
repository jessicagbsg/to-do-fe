import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

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
              <input
                type="checkbox"
                checked={todo.done}
                onClick={() => console.log("clicked")}
                onChange={() => console.log("changed")}
                className={`peer shrink-0 rounded-sm border border-primary 
                  shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                  disabled:cursor-not-allowed disabled:opacity-90 data-[state=checked]:bg-primary 
                  data-[state=checked]:text-primary-foreground`}
              />
              <p className="text-sm text-muted-fore line-clamp-1">{todo.title}</p>
            </div>
          ))}
        </div>

        <Trash className="self-end h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};
