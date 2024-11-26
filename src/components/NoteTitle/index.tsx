import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useMutation } from "@apollo/client";
import { FETCH_NOTE, UPDATE_NOTE } from "@/graphql";

interface NoteTitleProps {
  noteId: string;
  initialTitle: string;
}

export const NoteTitle = ({ noteId, initialTitle }: NoteTitleProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [updateNoteTitle] = useMutation(UPDATE_NOTE, {
    refetchQueries: [{ query: FETCH_NOTE, variables: { id: noteId } }],
  });

  const debouncedUpdateNoteTitle = useCallback(
    debounce((newTitle) => {
      updateNoteTitle({ variables: { id: noteId, title: newTitle } });
    }, 300),
    [noteId, updateNoteTitle]
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setTitle(newTitle);
      debouncedUpdateNoteTitle(newTitle);
    },
    [debouncedUpdateNoteTitle]
  );

  useEffect(() => {
    return () => {
      debouncedUpdateNoteTitle.cancel();
    };
  }, [debouncedUpdateNoteTitle]);

  return (
    <input
      type="text"
      className="w-full border-b border-gray-300 text-2xl sm:text-3xl md:text-4xl font-bold focus:outline-none focus:border-gray-500"
      placeholder="Title"
      value={title}
      onChange={handleTitleChange}
    />
  );
};
