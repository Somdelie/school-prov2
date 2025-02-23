import { getAdminSchools } from "@/actions/admin-actions";
import DeleteSchool from "@/components/admin/dialogs/DeleteSchool";
import EditSchool from "@/components/admin/dialogs/EditSchool";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const SchooPage = async () => {
  const adminSchools = await getAdminSchools();

  console.log("Admin Schools:", adminSchools);

  return (
    <div className="max-w-[90%] mx-auto py-8">
      <div>
        <CardHeader className="">
          <div className="flex justify-between items-center">
            <div className="">
              <CardTitle>Manage Your Schools</CardTitle>
              <CardDescription>
                Chose a school to manage or create a new one
              </CardDescription>
            </div>
            <Button>
              <Link href="/schools/new">Create New School</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {adminSchools &&
            adminSchools.map((school) => (
              <Card key={school.id} className="mb-4">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="">
                      <CardTitle>{school.schoolName}</CardTitle>
                      <CardDescription>{school.id}</CardDescription>
                    </div>
                    <Button>
                      <Link href={`/schools/${school.slug}`}>School Admin</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <EditSchool school={school} />
                    <DeleteSchool school={school} />
                  </div>
                </CardContent>
              </Card>
            ))}
        </CardContent>
      </div>
    </div>
  );
};
export default SchooPage;
