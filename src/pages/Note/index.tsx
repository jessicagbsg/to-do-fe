import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { NoteTitle, AddTodoInput, Todos, BackButton, NoteFilters } from "@/components";
import { CREATE_TODO, FETCH_NOTE, FETCH_TODOS_BY_NOTE, NoteQuery } from "@/graphql";
import { cn } from "@/lib/utils";

export const Note = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const { loading, error, data } = useQuery<NoteQuery>(FETCH_NOTE, {
    variables: { id: noteId },
    skip: !noteId,
  });

  const [createTodo] = useMutation(CREATE_TODO, {
    update(cache, { data: { createTodo } }) {
      cache.modify({
        fields: {
          note(existingNote = {}) {
            return {
              ...existingNote,
              todos: [...(existingNote.todos || []), createTodo.todo],
            };
          },
        },
      });
    },
    refetchQueries: [{ query: FETCH_TODOS_BY_NOTE, variables: { noteId } }],
  });

  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    if (data) setTodos(data.note.todos);
  }, [data]);

  const handleAddTodo = (newTodo: TodoModel) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  if (loading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <ClipLoader loading={loading} size={50} />
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col h-full w-full max-w-screen-lg mx-auto p-8 pb-16">
      <BackButton />
      <div
        className={cn([
          "grid h-full mt-4 gap-3 min-h-0",
          !!todos.length ? "grid-rows-[auto_auto_1fr_auto]" : "grid-rows-[auto_1fr_auto]",
        ])}
      >
        <div className="mb-4">
          {data && <NoteTitle noteId={noteId!} initialTitle={data.note.title} />}
        </div>

        {!!todos.length && <NoteFilters filter={filter} setFilter={setFilter} />}

        <Todos filter={filter} noteId={noteId} />

        <AddTodoInput noteId={noteId!} createTodo={createTodo} onAddTodo={handleAddTodo} />
      </div>
    </div>
  );
};
