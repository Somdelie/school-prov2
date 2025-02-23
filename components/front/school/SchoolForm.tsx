"use client";
import { createSchool } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

const SchoolForm = () => {
  const [isPending, startTransition] = useTransition();
  const [schoolName, setSchoolName] = useState("");
  const [error, setError] = useState("");

  const buttonDisabled = !schoolName.trim();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const data = {
      schoolName: schoolName.trim(),
    };

    startTransition(async () => {
      try {
        const result = await createSchool(data);

        if (result?.success) {
          toast.success("School added successfully");
          setSchoolName(""); // Reset form
          router.push("/schools");
        } else {
          const errorMessage =
            result?.error?.toString() || "Failed to add school";
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide the fundamental details about your school
          </CardDescription>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="schoolName">School Name*</Label>
            <Input
              id="schoolName"
              type="text"
              placeholder="Enter school name"
              className="w-full"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              disabled={isPending}
              aria-invalid={!!error}
              aria-describedby={error ? "schoolName-error" : undefined}
            />
            {error && (
              <p id="schoolName-error" className="text-sm text-red-500 mt-1">
                {error}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            size="lg"
            disabled={isPending || buttonDisabled}
            className="min-w-[150px]"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                <span>Adding School...</span>
              </span>
            ) : (
              "Add School"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SchoolForm;
