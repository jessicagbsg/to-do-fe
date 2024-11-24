import { Search } from "lucide-react";
import { Note } from "@/components/Note";
import { Input } from "@/components/ui/input";
import { CreateNote } from "../../components/CreateNote";

export const Home = () => {
  const notes = [
    {
      id: 1,
      title: "Note 1",
      todos: [
        { id: 1, text: "Todo 1", done: true },
        { id: 2, text: "Todo 2", done: false },
      ],
    },
    {
      id: 2,
      title: "Note 2",
      todos: [
        { id: 3, text: "Todo 1", done: false },
        { id: 4, text: "Todo 2", done: true },
      ],
    },
  ];

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-x-2">
            <h1 className="text-lg font-semibold">Notes</h1>
          </div>
          <CreateNote />
        </div>
        <div className="w-full my-5 md:w-1/4 self-end">
          <Search className="absolute text-muted-foreground h-5 w-5 ml-2 mt-2" />
          <Input type="text" placeholder="Search notes by title" className="pl-10 max-w-sm" />
        </div>

        <div className="h-full w-full overflow-x-auto pb-6">
          <div className="flex gap-6 w-full flex-wrap">
            {notes.map((note, index) => (
              <Note key={index} id={note.id} title={note.title} todos={note.todos} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
