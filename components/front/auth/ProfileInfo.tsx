import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schools: {
    id: string;
    slug: string;
    schoolName: string;
  }[];
}

const ProfileInfo = ({ profile }: { profile: Profile }) => {
  return (
    <div className="w-full border-t py-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {profile?.firstName} {profile?.lastName}
        </h2>
        <Button>
          <Link href="/schools/new">Add New School</Link>
        </Button>
      </div>
      <h3 className="text-lg font-semibold mt-2">Email Address</h3>
      <p className="text-sm text-gray-500">{profile?.email}</p>
      <h3 className="text-lg font-semibold mt-2">Phone Number</h3>
      <p className="text-sm text-gray-500">{profile?.phone}</p>

      {profile?.schools.length === 0 ? (
        <p className="text-sm text-gray-500">No schools added</p>
      ) : (
        <>
          <h3 className="text-lg font-semibold mt-2">Schools</h3>
          <ul className="list-disc list-inside text-sm text-gray-500">
            {profile?.schools.map((school) => (
              <Link key={school.id} href={`/schools/${school.slug}`}>
                <li className="cursor-pointer">{school.schoolName}</li>
              </Link>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
export default ProfileInfo;
