import { PlusCircle, Search } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Input, Button, EditNote } from "@/components";
import { FETCH_NOTES, NotesQuery } from "@/graphql";

export const Home = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<NotesQuery>(FETCH_NOTES);

  if (error) return <p>Error: {error.message}</p>;

  const createNote = () => {
    navigate("/1");
  };

  return (
    <div className="p-8">
      <div className="h-full flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-x-2">
            <h1 className="text-lg font-semibold">Notes</h1>
          </div>
          <Button variant="ghost" onClick={createNote}>
            <PlusCircle className="h-4 w-4" />
            Create a new note
          </Button>
        </div>
        <div className="w-full my-5 md:w-1/4 self-end">
          <Search className="absolute text-muted-foreground h-5 w-5 ml-2 mt-2" />
          <Input type="text" placeholder="Search notes by title" className="pl-10 max-w-sm" />
        </div>

        {loading && (
          <div className="h-full w-full flex items-center justify-center">
            <ClipLoader loading={loading} size={50} />
          </div>
        )}

        {data && (
          <div className="h-full w-full overflow-x-auto pb-6">
            <div className="flex gap-6 w-full flex-wrap">
              {data.notes.map((note, index) => (
                <EditNote key={index} note={note} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
