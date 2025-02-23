"use server";
import { User } from "@/components/front/auth/ProfileForm";
import { db } from "@/db/db";
import { generateSlug } from "@/lib/generateSlug";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export interface School {
  schoolName: string;
}

export async function createProfile(data: User) {
  try {
    //get logged in user from clerk
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not found");
    }

    const userData = {
      firstName: data.firstName,
      lastName: data.lastName, // Assuming lastName is also data.name
      email: data.primaryEmailAddress.emailAddress,
      phone: data.phone,
      userId: userId,
    };

    const existingProfile = await db.admin.findFirst({
      where: {
        email: data.primaryEmailAddress.emailAddress,
      },
    });

    if (existingProfile) {
      throw new Error("Profile already exists");
    }

    const newProfile = await db.admin.create({
      data: userData,
    });

    console.log("New Profile:", newProfile);
    revalidatePath("/profile/create");
    return { success: true, data: newProfile };
  } catch (error) {
    console.error(error);
  }
}

//get profile for logged in user by id
export async function getProfile() {
  try {
    const { userId } = await auth();

    if (!userId) return null;

    const profile = await db.admin.findFirst({
      where: {
        userId: userId,
      },
      include: {
        schools: {
          include: {
            school: true, // Include the actual school data
          },
        },
      },
    });

    // Transform the data to match your Profile interface
    const transformedProfile = profile
      ? {
          ...profile,
          schools: profile.schools.map((schoolAdmin) => schoolAdmin.school),
        }
      : null;

    console.log("Profile:", transformedProfile);
    return transformedProfile;
  } catch (error) {
    console.error(error);
  }
}

//create school for logged in user
export async function createSchool(formData: FormData | School) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    // Handle both FormData and direct object submission
    const schoolData: School =
      formData instanceof FormData
        ? { schoolName: formData.get("schoolName") as string }
        : formData;

    // Validate the school data
    if (!schoolData || !schoolData.schoolName) {
      return { success: false, error: "School name is required" };
    }

    // Get the admin record
    const admin = await db.admin.findFirst({
      where: { userId },
    });

    if (!admin) {
      return { success: false, error: "Admin profile not found" };
    }

    const slug = await generateSlug(schoolData.schoolName, "school");

    // Create the school and relationship in a transaction
    const newSchool = await db.$transaction(async (tx) => {
      // Create the school
      const school = await tx.school.create({
        data: {
          schoolName: schoolData.schoolName,
          slug: slug,
          admins: {
            create: {
              adminId: admin.id,
            },
          },
        },
        include: {
          admins: true,
        },
      });

      revalidatePath("/schools");
      return school;
    });

    return { success: true, data: newSchool };
  } catch (error) {
    console.error("School creation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create school",
    };
  }
}

//get school by slug
export async function getSchoolBySlug(slug: string) {
  try {
    const school = await db.school.findFirst({
      where: {
        slug,
      },
      include: {
        classes: {
          include: {
            streams: true,
          },
        },
        teachers: true,
        admins: {
          include: {
            admin: true,
          },
        },
      },
    });

    return school;
  } catch (error) {
    console.error(error);
  }
}

//get all schools for logged in user
export async function getAdminSchools() {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not found");
    }

    const schools = await db.school.findMany({
      where: {
        admins: {
          some: {
            admin: {
              userId,
            },
          },
        },
      },
    });

    console.log("Admin Schools:", schools);
    return schools;
  } catch (error) {
    console.error(error);
  }
}

//update school by slug and only the owner can update the school
export async function updateSchool(slug: string, data: School) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    // Validate the school data
    if (!data || !data.schoolName) {
      return { success: false, error: "School name is required" };
    }

    // Get the school
    const school = await db.school.findFirst({
      where: {
        slug,
        admins: {
          some: {
            admin: {
              userId,
            },
          },
        },
      },
    });

    if (!school) {
      return { success: false, error: "School not found" };
    }

    // Update the school
    const updatedSchool = await db.school.update({
      where: {
        id: school.id,
      },
      data: {
        schoolName: data.schoolName,
      },
    });

    revalidatePath("/schools");
    return { success: true, data: updatedSchool };
  } catch (error) {
    console.error("School update error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update school",
    };
  }
}

//delete school by slug and only the owner can delete the school
export async function deleteSchool(slug: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    // Get the school
    const school = await db.school.findFirst({
      where: {
        slug,
        admins: {
          some: {
            admin: {
              userId,
            },
          },
        },
      },
    });

    if (!school) {
      return { success: false, error: "School not found" };
    }

    // Delete related SchoolAdmin records first
    await db.schoolAdmin.deleteMany({
      where: {
        schoolId: school.id,
      },
    });

    // Now delete the school
    await db.school.delete({
      where: {
        id: school.id,
      },
    });

    revalidatePath("/schools");
    return { success: true };
  } catch (error) {
    console.error("School deletion error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete school",
    };
  }
}
