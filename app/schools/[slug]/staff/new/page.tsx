import { getSchoolBySlug } from "@/actions/admin-actions";
import { getAllSubjects, getClasses } from "@/actions/school-actions";
import TeacherForm from "@/components/admin/staff/TeacherForm";
// import OtherStaffForm from "@/components/dashboard/staff/OtherStaffForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, UserPlus } from "lucide-react";

const AddNewStaffPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  let classes = await getClasses(slug);
  classes = classes?.map((classItem) => ({
    ...classItem,
  }));
  const subjects = await getAllSubjects();
  const school = await getSchoolBySlug(slug);

  // console.log(classes, "classes data");
  // console.log(school?.id, "school data");
  const schoolId = school?.id || "";

  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <UserPlus className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Add New Staff</h1>
        </div>
        <p className="text-muted-foreground">
          Add new teaching or non-teaching staff members to your school.
        </p>
      </div>

      <Tabs defaultValue="teacher" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-14 bg-transparent">
          <TabsTrigger
            value="teacher"
            className="data-[state=active]:bg-primary rounded-r-none data-[state=active]:text-primary-foreground bg-white"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Teacher</span>
              </div>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="other-staff"
            className="data-[state=active]:bg-primary rounded-l-none data-[state=active]:text-primary-foreground bg-white"
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Other Staff</span>
              </div>
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="teacher" className="m-0">
            {classes && subjects && (
              <TeacherForm
                classes={classes}
                subjects={subjects}
                schoolId={schoolId}
              />
            )}
          </TabsContent>

          <TabsContent value="other-staff" className="m-0">
            {/* <OtherStaffForm /> */}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AddNewStaffPage;
