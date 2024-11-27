import { PlusCircle, Search, Trash } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useMemo } from "react";
import debounce from "lodash/debounce";
import { Input, Button, EditNote } from "@/components";
import { CREATE_NOTE, DELETE_NOTE, FETCH_NOTES, NotesQuery } from "@/graphql";

export const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debouncedHandleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 300),
    []
  );

  const { loading, error, data } = useQuery<NotesQuery>(FETCH_NOTES, {
    variables: { title: debouncedSearch },
    fetchPolicy: "network-only",
  });

  const [createNote] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: FETCH_NOTES }],
    onCompleted: (data) => {
      const newNoteId = data.createNote.note.id;
      navigate(`/${newNoteId}`);
    },
    onError: (err) => console.error("Error creating note:", err),
  });

  const [deleteNote] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: FETCH_NOTES }],
  });

  const handleCreateNote = async () => {
    try {
      await createNote({ variables: { title: "New Note" } });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote({ variables: { id } });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedHandleSearch(value);
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-8">
      <div className="h-full flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-x-2">
            <h1 className="text-lg font-semibold">Notes</h1>
          </div>
          <Button variant="ghost" onClick={handleCreateNote}>
            <PlusCircle className="h-4 w-4" />
            Create a new note
          </Button>
        </div>
        <div className="w-full my-5 md:w-1/4 self-end">
          <div className="relative">
            <Search className="absolute text-muted-foreground h-5 w-5 ml-2 mt-2" />
            <Input
              type="text"
              placeholder="Search notes by title"
              className="pl-10 max-w-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
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
                <div key={index} className="relative">
                  <EditNote note={note} />
                  <Trash
                    className="absolute bottom-3 p-1 right-3 h-6 w-6 text-red-500 cursor-pointer"
                    onClick={() => handleDeleteNote(note.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
