import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { NoteBody } from "../NoteBody";

export const CreateNote = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <PlusCircle className="h-4 w-4" />
          Create a new note
        </Button>
      </DialogTrigger>
      <NoteBody />
    </Dialog>
  );
};
