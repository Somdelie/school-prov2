"use client";
import { updateSchool } from "@/actions/admin-actions";
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
import { Label } from "@/components/ui/label";
import { Loader2, Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

interface School {
  schoolName: string;
  slug: string;
}

const EditSchool = ({ school }: { school: School }) => {
  const [isPending, startTransition] = useTransition();
  //default values
  const { schoolName } = school;
  const [newSchoolName, setNewSchoolName] = useState(schoolName);

  const slug = school.slug;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      schoolName: newSchoolName.trim(),
    };

    startTransition(async () => {
      try {
        const result = await updateSchool(slug, data);

        if (result?.success) {
          toast.success("School updated successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to update school");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center space-x-4 rounded bg-black text-white p-2">
        <Pencil size={16} />
        Edit School
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit School</DialogTitle>
          <DialogDescription>Edit the school details below</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {" "}
            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name*</Label>
              <Input
                id="schoolName"
                type="text"
                value={newSchoolName}
                onChange={(e) => setNewSchoolName(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="mt-4" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin" />
                Updating School...
              </span>
            ) : (
              "Update School"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default EditSchool;
