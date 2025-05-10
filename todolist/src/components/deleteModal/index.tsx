import { UseMutationResult } from "@tanstack/react-query";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DeleteModalProps {
  open: boolean;
  title: string;
  description: string;
  onOpenChange: () => void;
  deleteFunction?: () => void;
}

export default function DeleteModal({
  open,
  title,
  description,
  onOpenChange,
  deleteFunction,
}: DeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"destructive"} onClick={deleteFunction}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
