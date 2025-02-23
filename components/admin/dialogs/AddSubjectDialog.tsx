"use client";
import { createSubject } from "@/actions/school-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { Bounce, toast } from "react-toastify";

export function AddSubjectDialog() {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("subject", subject);
    e.stopPropagation(); // Add this line to prevent form submission bubbling
    startTransition(async () => {
      const data = { title };
      try {
        const response = await createSubject(data);
        if (response?.success) {
          toast.success(response?.message, {
            position: "top-right",
            transition: Bounce,
          });
          setTitle("");
          setOpen(false);
        } else {
          toast.error(response?.message, {
            position: "top-right",
          });
        }
      } catch (error) {
        toast.error("Failed to add subject. Please try again.", {
          position: "top-right",
        });
        console.error("Error submitting subject data:", error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 w-10 px-2 rounded-l-none bg-black text-white"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogDescription>
            Add a new subject that can be assigned to teachers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject Name</Label>
              <Input
                id="subject"
                placeholder="Enter subject name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending || !title.trim()}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" /> Adding
                  Subject...
                </span>
              ) : (
                "Add Subject"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
