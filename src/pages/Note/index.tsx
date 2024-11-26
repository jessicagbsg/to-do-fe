import { useEffect, useState } from "react";
import { ArrowLeft, Trash } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, NoteTitle, AddTodoInput } from "@/components";
import { CREATE_TODO, DELETE_TODO, FETCH_NOTE, UPDATE_TODO, NoteQuery } from "@/graphql";
import { cn } from "@/lib/utils";
import { NoteFilters } from "@/components/NoteFilters";

export const Note = () => {
  const navigate = useNavigate();
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
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: FETCH_NOTE, variables: { id: noteId } }],
  });

  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: FETCH_NOTE, variables: { id: noteId } }],
  });

  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.done;
    if (filter === "notCompleted") return !todo.done;
    return true;
  });

  useEffect(() => {
    if (data) setTodos(data.note.todos);
  }, [data]);

  const handleAddTodo = (newTodo: TodoModel) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo({ variables: { id } });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdateTodo = async (id: number, done: boolean) => {
    try {
      await updateTodo({ variables: { id, done } });
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done } : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
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
      <Button
        onClick={() => navigate("/")}
        variant={"ghost"}
        className="self-start flex items-center text-muted-foreground gap"
      >
        <ArrowLeft className="h-4 w-4 " />
        <span>Back</span>
      </Button>

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

        <div className="flex flex-col gap-3 overflow-y-auto mt-3 custom-scrollbar">
          {filteredTodos.map((todo) => (
            <div key={`todo-${todo.id}`} className="flex justify-between pr-2">
              <div
                className={cn(
                  "flex items-center gap-x-2",
                  todo.done && "line-through text-muted-foreground opacity-50"
                )}
              >
                <Checkbox
                  checked={todo.done}
                  onClick={() => handleUpdateTodo(todo.id, !todo.done)}
                />
                <p className="text-sm text-muted-foreground line-clamp-1">{todo.title}</p>
              </div>

              <Trash
                className="self-end h-4 w-4 text-muted-foreground cursor-pointer"
                onClick={() => handleDeleteTodo(Number(todo.id))}
              />
            </div>
          ))}
        </div>

        <AddTodoInput noteId={noteId!} createTodo={createTodo} onAddTodo={handleAddTodo} />
      </div>
    </div>
  );
};
