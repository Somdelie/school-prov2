import SchoolForm from "@/components/front/school/SchoolForm";
import Link from "next/link";

const CreateScholPage = () => {
  return (
    <div className="container max-w-5xl mx-auto py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">School Registration</h1>
        <div className="flex mt-2 items-center justify-center gap-1">
          <p className="text-muted-foreground">
            Complete the details below to set up your school profile
          </p>
          <Link href="/" className="text-sky-600 underline">
            Cancel
          </Link>
        </div>
      </div>
      <SchoolForm />
    </div>
  );
};
export default CreateScholPage;
