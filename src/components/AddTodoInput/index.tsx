import { useState } from "react";

interface AddTodoInputProps {
  noteId: string;
  onAddTodo: (todo: TodoModel) => void;
  createTodo: any;
}

export const AddTodoInput: React.FC<AddTodoInputProps> = ({ noteId, onAddTodo, createTodo }) => {
  const [todoInput, setTodoInput] = useState("");

  const handleAddTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todoInput.trim() !== "") {
      try {
        const { data } = await createTodo({
          variables: {
            title: todoInput,
            noteId: Number(noteId),
            done: false,
          },
        });

        if (data?.createTodo?.todo) {
          onAddTodo(data.createTodo.todo);
        }

        setTodoInput("");
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  };

  return (
    <input
      type="text"
      className="mt-4 w-full border-b border-gray-300 text-lg focus:outline-none focus:border-gray-500"
      placeholder="Add a to-do and press Enter"
      value={todoInput}
      onChange={(e) => setTodoInput(e.target.value)}
      onKeyDown={handleAddTodo}
    />
  );
};
