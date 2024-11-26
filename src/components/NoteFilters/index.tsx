import { Button } from "..";

type Props = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

export const NoteFilters = ({ filter, setFilter }: Props) => {
  return (
    <div className="flex justify-start gap-x-2">
      <Button variant={filter === "all" ? "default" : "ghost"} onClick={() => setFilter("all")}>
        All
      </Button>
      <Button
        variant={filter === "completed" ? "default" : "ghost"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </Button>
      <Button
        variant={filter === "notCompleted" ? "default" : "ghost"}
        onClick={() => setFilter("notCompleted")}
      >
        Not Completed
      </Button>
    </div>
  );
};
