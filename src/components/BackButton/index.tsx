import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/")}
      variant={"ghost"}
      className="self-start flex items-center text-muted-foreground gap"
    >
      <ArrowLeft className="h-4 w-4 " />
      <span>Back</span>
    </Button>
  );
};
