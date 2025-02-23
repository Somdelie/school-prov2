"use client";

import { FormEvent, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Plus } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import { creatStream } from "@/actions/school-actions";

interface AddStreamDialogProps {
  classId: string;
}

export function AddStreamDialog({ classId }: AddStreamDialogProps) {
  const [isOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  const buttonDisabled = title === "" || isPending;

  const AddStream = (e: FormEvent) => {
    e.preventDefault();
    console.log("Add Stream form submitted", title);
    startTransition(async () => {
      const data = { title, classId, slug: "", attendance: "0" };
      try {
        const success = await creatStream(data);
        if (success) {
          toast.success("Stream added successfully!", {
            position: "top-right",
            transition: Bounce,
          });
          setDialogOpen(false);
          setTitle("");
        }
      } catch (error) {
        toast.error("Failed to add stream. Please try again.", {
          position: "top-right",
        });
        console.error("Error submitting stream data:", error);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Stream
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Stream</DialogTitle>
        </DialogHeader>
        <form onSubmit={AddStream} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Stream Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter stream title"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={buttonDisabled}>
              {isPending ? (
                <>
                  <Loader className="w-6 h-6 mr-2 animate-spin" /> Saving
                  Stream...
                </>
              ) : (
                "Save Stream"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
