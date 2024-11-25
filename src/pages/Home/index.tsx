import { Loader, Search } from "lucide-react";
import { useQuery } from "@apollo/client";
import { EditNote } from "@/components/EditNote";
import { Input } from "@/components/ui/input";
import { FETCH_NOTES } from "@/graphql/queries/fetchAllNotes";
import { CreateNote } from "../../components/CreateNote";

type NoteQuery = {
  notes: NoteModel[];
};

export const Home = () => {
  const { loading, error, data } = useQuery<NoteQuery>(FETCH_NOTES);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-8">
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

        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="h-full w-full overflow-x-auto pb-6">
            <div className="flex gap-6 w-full flex-wrap">
              {data?.notes && data.notes.map((note, index) => <EditNote key={index} note={note} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
