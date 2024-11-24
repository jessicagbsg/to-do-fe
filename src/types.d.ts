type TodoModel = {
  id: number;
  title: string;
  done: boolean;
};

type NoteModel = {
  id: number;
  title: string;
  todos: Todo[];
};

type FilterType = "all" | "completed" | "notCompleted";
