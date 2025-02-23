import { db } from "@/db/db";

interface StudentNumberParts {
  schoolId: string;
  year: string;
  sequence: string;
}

export function parseStudentNumber(studentNumber: string): StudentNumberParts {
  return {
    schoolId: studentNumber.slice(0, 6),
    year: studentNumber.slice(6, 8),
    sequence: studentNumber.slice(8, 12),
  };
}

function formatSchoolId(schoolId: string): string {
  // Remove any non-numeric characters
  const numericId = schoolId.replace(/\D/g, "");

  // Determine the first digit based on school type (defaulting to 1 if not valid)
  const firstDigit = /^[1-6]/.test(numericId) ? numericId[0] : "1";

  // Pad the remaining digits with zeros to make it 6 digits long
  const remainingDigits = numericId.slice(1);
  const paddedId = (firstDigit + remainingDigits).padEnd(6, "0");

  // Take only the first 6 digits
  return paddedId.slice(0, 6);
}

export async function generateStudentNumber(
  rawSchoolId: string
): Promise<string> {
  // Format the school ID
  const schoolId = formatSchoolId(rawSchoolId);

  // Get current year's last two digits
  const currentYear = new Date().getFullYear().toString().slice(-2);

  // Get all existing student numbers for this school and year
  const students = await db.student.findMany({
    where: {
      studentNumber: {
        startsWith: `${schoolId}${currentYear}`,
      },
    },
    select: {
      studentNumber: true,
    },
  });

  // Extract existing sequence numbers
  const existingSequences = students
    .map((s) => parseInt(s.studentNumber.slice(-4)))
    .sort((a, b) => b - a);

  // Get the next sequence number
  const nextSequence =
    existingSequences.length > 0
      ? (existingSequences[0] + 1).toString().padStart(4, "0")
      : "0001";

  // Combine all parts
  const studentNumber = `${schoolId}${currentYear}${nextSequence}`;

  return studentNumber;
}

export async function isStudentNumberUnique(
  studentNumber: string
): Promise<boolean> {
  const existing = await db.student.findUnique({
    where: { studentNumber },
  });
  return !existing;
}
