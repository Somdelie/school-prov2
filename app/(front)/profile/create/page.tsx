import { getProfile } from "@/actions/admin-actions";
import ProfileForm from "@/components/front/auth/ProfileForm";
import ProfileInfo, { Profile } from "@/components/front/auth/ProfileInfo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

interface ProfileFromDB {
  schools: {
    slug: string;
    id: string;
    schoolName: string;
  }[];
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userId: string;
}

const CreateProfilePage = async () => {
  const user = await currentUser();
  // Explicitly handle the Promise return type
  const profileData = (await getProfile()) as ProfileFromDB | null;

  // Transform the profile data to match the Profile interface
  const profile: Profile | null =
    profileData && user
      ? {
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          email: user.emailAddresses[0]?.emailAddress ?? "",
          phone: profileData.phone || "",
          schools: profileData.schools.map((school) => ({
            id: school.id,
            slug: school.slug,
            schoolName: school.schoolName,
          })),
        }
      : null;

  const transformedUser = user
    ? {
        id: user.id,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        phone: "",
        primaryEmailAddress: {
          emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
        },
      }
    : null;

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Unauthorized Access</CardTitle>
          <CardDescription>Please Login to Continue!</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/sign-in">
            <Button>Login Here</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {profile ? "Profile Management" : "Create Profile"}
        </CardTitle>
        <CardDescription>
          {profile
            ? "Update your profile information"
            : "Create your profile to get started"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {profile ? (
          <ProfileInfo profile={profile} />
        ) : (
          transformedUser && <ProfileForm user={transformedUser} />
        )}
      </CardContent>
    </Card>
  );
};

export default CreateProfilePage;
