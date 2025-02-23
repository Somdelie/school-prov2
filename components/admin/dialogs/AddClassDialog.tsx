"use client";
import { createClass } from "@/actions/school-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader, PlusCircle } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import { Bounce, toast } from "react-toastify";

interface AddClassDialogProps {
  school: {
    id: string;
    schoolName: string;
  };
}

const AddClassDialog = ({ school }: AddClassDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [className, setClassName] = useState("");

  console.log("School data:", school);

  const buttonDisabled = className === "" || isPending;

  const handleAddClass = (e: FormEvent) => {
    e.preventDefault();
    console.log("Add class form submitted", className);
    startTransition(async () => {
      try {
        const data = {
          className,
          schoolId: school.id,
        };
        const success = await createClass(data);
        if (success) {
          toast.success("Class added successfully!", {
            position: "top-right",
            transition: Bounce,
          });
          setDialogOpen(false);
          setClassName("");
        }
      } catch (error) {
        toast.error("Failed to add class. Please try again.", {
          position: "top-right",
        });
        console.error("Error submitting class data:", error);
      }
    });
  };

  return (
    <Dialog onOpenChange={(isOpen) => setDialogOpen(isOpen)} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          className="bg-black dark:bg-white text-gray-300 dark:text-black"
        >
          <PlusCircle className="" size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new class to your school.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddClass} className="flex flex-col gap-4">
          <Input
            id="className"
            type="text"
            placeholder="First Name"
            className="w-full"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={buttonDisabled}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin" size={16} /> Saving Class...
                </span>
              ) : (
                "Save Class"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddClassDialog;
