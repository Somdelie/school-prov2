export type ClassProps = {
  className: string;
  schoolId: string;
  id: string;
  streams: {
    id: string;
    title: string;
  }[];
  // students: {
  //   id: string;
  //   firstName: string;
  //   lastName: string;
  // }[];
  // teachers: {
  //   id: string;
  //   firstName: string;
  //   lastName: string;
  // }[];
};

//teacher type
export interface Teacher {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  salary: number;
  schoolId: string;
  classId: string;
  subjects: {
    id: string;
    title: string;
  }[];
}

//teacher props
export interface TeacherProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  salary: number;
  schoolId: string;
  subjects: {
    id: string;
    title: string;
  }[];
}

//subject type
export type Subject = {
  title: string;
  id: string;
};

// Base teacher properties
interface BaseTeacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  nationality: string;
  address: string;
  salary: number;
  schoolId: string;
}

// Shape of teacher data from the database
export interface TeacherFromDB extends BaseTeacher {
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
  classes: {
    id: string;
    teacherId: string;
    classId: string;
  }[];
  subjects: {
    id: string;
    teacherId: string;
    subjectId: string;
  }[];
}

// Shape of teacher data for props/frontend
export interface TeacherProps extends BaseTeacher {
  dateOfBirth: string;
  subjects: {
    id: string;
    title: string;
  }[];
}

export const transformTeacherForProps = (
  teacher: TeacherFromDB
): TeacherProps => {
  return {
    id: teacher.id,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    email: teacher.email,
    phone: teacher.phone,
    gender: teacher.gender,
    dateOfBirth: teacher.dateOfBirth.toISOString().split("T")[0], // Convert to YYYY-MM-DD
    nationality: teacher.nationality,
    address: teacher.address,
    salary: teacher.salary,
    schoolId: teacher.schoolId,
    subjects: teacher.subjects.map((s) => ({
      id: s.subjectId,
      title: s.subjectId, // You'll need to map this to actual subject titles
    })),
  };
};

//student type
export type Student = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl?: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  state?: string;
  city?: string;
  address?: string;
  schoolId: string;
  classId: string;
  streamId?: string;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  role: string;
};
