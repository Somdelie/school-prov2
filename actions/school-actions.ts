"use server";

import { db } from "@/db/db";
import { generateSlug } from "@/lib/generateSlug";
import { generateStudentNumber } from "@/lib/generateUniqueNumber";
import { Teacher, Student } from "@/lib/types";
import { revalidatePath } from "next/cache";

interface Class {
  className: string;
  schoolId: string;
}

interface UpdateClassProps {
  id: string;
  className: string;
}

interface StreamProps {
  classId: string;
  title: string;
}

//create a new class for logged in school
export async function createClass(data: Class) {
  try {
    const newClass = await db.class.create({
      data: {
        className: data.className,
        school: {
          connect: {
            id: data.schoolId,
          },
        },
      },
    });
    revalidatePath("/classes");
    return newClass;
  } catch (error) {
    console.error("Class creation error:", error);
  }
}

//get all classes by school slug
export async function getClasses(slug: string) {
  try {
    const classes = await db.class.findMany({
      where: {
        school: {
          slug,
        },
      },
      include: {
        streams: true,
      },
    });
    return classes;
  } catch (error) {
    console.error(error);
  }
}

//get all classes by school id
export async function getClassesById(id: string) {
  try {
    const classes = await db.class.findMany({
      where: {
        id,
      },
      include: {
        streams: true,
      },
    });
    return classes;
  } catch (error) {
    console.error(error);
  }
}

//update class by id
export async function updateClass(data: UpdateClassProps) {
  try {
    const updatedClass = await db.class.update({
      where: {
        id: data.id,
      },
      data: {
        className: data.className,
      },
    });
    revalidatePath("/classes");
    return updatedClass;
  } catch (error) {
    console.error("Class update error:", error);
  }
}

//delete class by id
export async function deleteClass(id: string) {
  try {
    await db.class.delete({
      where: {
        id,
      },
    });
    revalidatePath("/classes");
    return true;
  } catch (error) {
    console.error("Class deletion error:", error);
  }
}

//add class stream
export async function creatStream(data: StreamProps) {
  try {
    const slug = await generateSlug(data.title, "stream");

    const newStream = await db.stream.create({
      data: {
        title: data.title,
        slug: slug,
        class: {
          connect: {
            id: data.classId,
          },
        },
      },
    });
    revalidatePath("/classes");
    return newStream;
  } catch (error) {
    console.error("Stream creation error:", error);
  }
}

//delete class stream
export async function deleteStream(id: string) {
  try {
    await db.stream.delete({
      where: {
        id,
      },
    });
    revalidatePath("/classes");
    return true;
  } catch (error) {
    console.error("Stream deletion error:", error);
  }
}

//update class stream
export async function updateStream(data: StreamProps) {
  try {
    const updatedStream = await db.stream.update({
      where: {
        id: data.classId,
      },
      data: {
        title: data.title,
      },
    });
    revalidatePath("/classes");
    return updatedStream;
  } catch (error) {
    console.error("Stream update error:", error);
  }
}

// create new teacher
export async function createTeacher(data: Teacher) {
  try {
    // Convert date string to Date object
    const dateOfBirth = new Date(data.dateOfBirth);

    // First create the teacher
    const teacherData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      dateOfBirth: dateOfBirth,
      nationality: data.nationality,
      address: data.address,
      salary: data.salary,
      school: {
        connect: {
          id: data.schoolId,
        },
      },
    };

    //check if teacher already exists
    const existingTeacher = await db.teacher.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingTeacher) {
      return {
        success: false,
        message: "Teacher already exists",
      };
    }

    const newTeacher = await db.teacher.create({
      data: teacherData,
    });

    // Then create the relationships
    if (newTeacher) {
      // Create teacher-class relationship
      await db.teacherClass.create({
        data: {
          teacherId: newTeacher.id,
          classId: data.classId,
        },
      });

      // Create teacher-subject relationships
      await Promise.all(
        data.subjects.map((subject) =>
          db.teacherSubject.create({
            data: {
              teacherId: newTeacher.id,
              subjectId: subject.id,
            },
          })
        )
      );
    }

    revalidatePath("/staff");

    return {
      success: true,
      message: "Teacher created successfully",
      data: newTeacher,
    };
  } catch (error) {
    console.error("Teacher creation error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create teacher",
    };
  }
}

//create new subject
export async function createSubject(data: { title: string }) {
  try {
    //check if subject already exists
    const existingSubject = await db.subject.findFirst({
      where: {
        title: data.title,
      },
    });
    if (existingSubject) {
      return {
        success: false,
        message: "Subject already exists",
      };
    }

    const newSubject = await db.subject.create({
      data: {
        title: data.title,
      },
    });

    revalidatePath("/staff/new");
    console.log("New Subject:", newSubject);
    return {
      success: true,
      message: "Subject created successfully💐",
      data: newSubject,
    };
  } catch (error) {
    console.error("Subject creation error:", error);
  }
}

//get all teachers by school slug
export async function getTeachers(slug: string) {
  try {
    const teachers = await db.teacher.findMany({
      where: {
        school: {
          slug,
        },
      },
      include: {
        classes: true,
        subjects: true,
      },
    });

    console.log("Teachers:", teachers);
    return teachers;
  } catch (error) {
    console.error(error);
  }
}

//get all subjects
export async function getAllSubjects() {
  try {
    const subjects = await db.subject.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        teachers: true,
      },
    });
    console.log("Subjects:", subjects);
    return subjects;
  } catch (error) {
    console.error(error);
  }
}

// Define Student model class can have many students
// model Student {
//   id              String   @id @default(uuid())
//   firstName       String
//   lastName        String
//   email           String   @unique
//   password        String
//   imageUrl        String?
//   dateOfBirth     String
//   gender          String
//   nationality     String
//   state           String?
//   city            String?
//   address         String?
//   studentNumber   String   @unique
//   parentFirstName String
//   parentLastName  String
//   parentEmail     String
//   parentPhone     String
//   role            String   @default("PARENT")
//   createdAt       DateTime @default(now())
//   updatedAt       DateTime @updatedAt
//   classId         String
//   schoolId        String
//   streamId        String

//   // Relations
//   school School  @relation(fields: [schoolId], references: [id])
//   class  Class   @relation(fields: [classId], references: [id])
//   stream Stream? @relation(fields: [streamId], references: [id])

//   @@map("students")
// }

//create new student
export async function createStudent(data: Student) {
  try {
    const studentData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      classId: data.classId,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
      imageUrl: data.imageUrl,
      gender: data.gender,
      nationality: data.nationality,
      state: data.state,
      city: data.city,
      address: data.address,
      parentFirstName: data.parentFirstName,
      parentLastName: data.parentLastName,
      parentEmail: data.parentEmail,
      parentPhone: data.parentPhone,
      role: data.role,
      schoolId: data.schoolId,
      streamId: data.streamId || "",
    };

    const studentNumber = await generateStudentNumber(data.schoolId);

    // Check for existing student
    const existingStudent = await db.student.findFirst({
      where: {
        OR: [{ studentNumber }, { email: data.email }],
      },
    });

    if (existingStudent) {
      return {
        success: false,
        error: "A student with this email or student number already exists",
      };
    }

    const newStudent = await db.student.create({
      data: {
        studentNumber,
        ...studentData,
      },
    });
    // console.log("New Student:", newStudent);
    revalidatePath("/students");
    return {
      success: true,
      studentNumber,
      student: newStudent,
    };
  } catch (error) {
    console.error("Student creation error:", error);
    return {
      success: false,
      error: "Failed to create student",
    };
  }
}
