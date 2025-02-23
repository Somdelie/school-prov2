import { getTeachers } from "@/actions/school-actions";
import TeachersList from "@/components/admin/school/TeachersList";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { transformTeacherForProps } from "@/lib/types";
import {
  Users,
  UserCog,
  UserPlus,
  UsersRound,
  Building2,
  Plus,
} from "lucide-react";
import Link from "next/link";

const StaffPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const teachersFromDB = await getTeachers(slug);
  const teachers = teachersFromDB?.map(transformTeacherForProps);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Staff Management
          </h2>
          <p className="text-muted-foreground">
            Manage your school&apos;s staff members, roles, and permissions.
          </p>
        </div>
      </div>

      <Tabs defaultValue="teachers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="teachers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Teachers
          </TabsTrigger>
          <TabsTrigger value="admins" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            Admins
          </TabsTrigger>
          <TabsTrigger value="other" className="flex items-center gap-2">
            <UsersRound className="h-4 w-4" />
            Other
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teachers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Teaching Staff
              </CardTitle>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <Link href={`/schools/${slug}/staff/new`}>Add Teacher</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {teachers && teachers.length > 0 ? (
                <>
                  <TeachersList teachers={teachers} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No teachers found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get started by adding your first teacher
                  </p>
                  <Button>
                    <Link href={`/schools/${slug}/staff/new`}>
                      Add First Teacher
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins">
          <Card>
            <CardHeader>
              <CardTitle>Administrative Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <UserCog className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">
                  Admin Management Coming Soon
                </h3>
                <p className="text-sm text-muted-foreground">
                  This feature is currently under development
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other">
          <Card>
            <CardHeader>
              <CardTitle>Support Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <UsersRound className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">
                  Support Staff Management Coming Soon
                </h3>
                <p className="text-sm text-muted-foreground">
                  This feature is currently under development
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffPage;
