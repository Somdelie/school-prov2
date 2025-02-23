"use client";
import { deleteSchool } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

interface School {
  slug: string;
  schoolName: string;
}

const DeleteSchool = ({ school }: { school: School }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteSchool(school.slug);
        toast.success("School deleted successfully");
        setIsOpen(false);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center space-x-4 rounded bg-red-500 text-white p-2">
        <Trash2 size={18} /> Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="my-4">
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-semibold text-teal-400">
              {school.schoolName}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteSchool;
