import { getSchoolBySlug } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  GraduationCap,
  Plus,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";

const SchoolAdmin = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = await params;

  const school = await getSchoolBySlug(slug);

  // Calculate capacity (assuming each class can hold 40 students)

  const totalStudents = school?.Student.length || 0;
  const totalTeachers = school?.teachers.length || 0;

  const totalCapacity = (school?.classes?.length ?? 0) * 40;
  const capacityUtilization =
    totalCapacity > 0 ? (totalStudents / totalCapacity) * 100 : 0;

  const recentsStudents = [...(school?.Student || [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome to your school management dashboard
          </p>
        </div>
        <Button asChild>
          <Link href="/schools/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New School
          </Link>
        </Button>
      </div>

      {/* Key Statistics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Students
                </p>
                <p className="text-2xl font-bold">{school?.Student.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">
                {(school?.Student?.length ?? 0) * 0.08}
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Students
                </p>
                <p className="text-2xl font-bold">
                  {totalStudents.toLocaleString()}
                </p>
              </div>
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">
                {(totalStudents * 0.08).toLocaleString()}
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Capacity Utilization
                </p>
                <p className="text-2xl font-bold">
                  {Math.round(capacityUtilization)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <Progress value={capacityUtilization} className="mt-4" />
          </CardContent>
        </Card>
      </div>

      <div className="grid w-full">
        {/* Recent Students */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Students</CardTitle>
            <CardDescription>
              Latest students added to the school
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentsStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background">
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Student Number • {student.studentNumber}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/students/${student.id}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
            {/* <div className="space-y-6">
              {recentSchools.map((school) => (
                <div key={school.id} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {school.schoolName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {school.Student.length} students •{" "}
                      {school.teachers.length} staff
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/schools/${school.slug}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div> */}
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Class Size
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(totalStudents / (totalTeachers || 1))} students
            </div>
            <p className="text-xs text-muted-foreground">per teacher</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Capacity
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalCapacity - totalStudents).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              student spots remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Top Performing
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              highest enrollment rate
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default SchoolAdmin;
