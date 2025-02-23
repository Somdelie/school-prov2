import { getSchoolBySlug } from "@/actions/admin-actions";
import SingleStudentForm from "@/components/admin/student/SingleStudentForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NewStudentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const response = await getSchoolBySlug(slug);
  const school = {
    id: response?.id ? response.id : "",
    schoolName: response?.schoolName || "",
    classes: response?.classes || [],
  };

  const streams = response?.classes.length
    ? response.classes.flatMap((classItem) => classItem.streams)
    : [];

  console.log(streams, "streams from new student page");
  return (
    <div>
      <Card className="w-full border border-t-4 border-sky-500">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">Single Student Admission</CardTitle>
          <CardDescription>
            Fill in the form to add a new student
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SingleStudentForm school={school} streams={streams} />
        </CardContent>
      </Card>
    </div>
  );
};
export default NewStudentPage;
