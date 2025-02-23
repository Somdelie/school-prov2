import { getStudentsBySchoolSlug } from "@/actions/student-action";
import StudentList from "@/components/admin/student/StudentList";
import { Button } from "@/components/ui/button";
import { School, UserPlus, Users } from "lucide-react";
import Link from "next/link";

const StudentsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const response = await getStudentsBySchoolSlug(slug);
  const students = (response || []).map((student) => ({
    ...student,
    imageUrl: student.imageUrl || "/default-image.png",
    class: {
      className: student.class.className,
    },
    stream: student.stream ? { title: student.stream.title } : { title: "N/A" },
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Students</h1>
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <School className="h-4 w-4" /> Manage and view all students
          </p>
        </div>

        <Link href={`/schools/${slug}/students/new`}>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Add Student
          </Button>
        </Link>
      </div>
      <StudentList students={students} schoolSlug={slug} />
    </div>
  );
};

export default StudentsPage;
