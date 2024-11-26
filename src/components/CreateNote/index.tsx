import { PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger, Button, Note } from "@/components";

export const CreateNote = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <PlusCircle className="h-4 w-4" />
          Create a new note
        </Button>
      </DialogTrigger>
      <Note />
    </Dialog>
  );
};
