import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Note } from "../Note";

export const EditNote = ({ note }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          key={`note-${note.id}`}
          onClick={() => console.log("clicked")}
          className={`flex flex-col min-w-44 w-full max-w-full sm:max-w-56 h-44 
         gap-y-2 p-4 cursor-pointer bg-secondary/10 rounded-lg shadow-md`}
        >
          <h4 className="text-base font-semibold text-primary line-clamp-1">{note.title}</h4>
          <div className="flex flex-col mt-2 h-full justify-between">
            <div className="flex flex-col gap-y-1 w-full">
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
                    className="peer shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-90 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <p className="text-sm text-muted-fore line-clamp-1">{todo.text}</p>
                </div>
              ))}
            </div>

            <Trash className="self-end h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </DialogTrigger>
      <Note isEditing />
    </Dialog>
  );
};

type Props = {
  note: NoteModel;
};
