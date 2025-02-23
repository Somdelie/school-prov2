"use server";

import { db } from "@/db/db";

// Get all students
export async function getStudents() {
  try {
    const response = await db.student.findMany({
      include: {
        school: true,
        class: true,
        stream: true,
      },
    });
    console.log(response, "response from getStudents");
    return response;
  } catch (error) {
    console.log(error);
  }
}

// Get a students by school slug
export async function getStudentsBySchoolSlug(slug: string) {
  try {
    const response = await db.student.findMany({
      where: {
        school: {
          slug,
        },
      },
      include: {
        school: true,
        class: true,
        stream: true,
      },
    });
    console.log(response, "response from getStudentsBySchoolSlug");
    return response;
  } catch (error) {
    console.log(error);
  }
}
