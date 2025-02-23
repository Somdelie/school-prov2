"use client";

interface SchoolProps {
  school: {
    id: string;
    schoolName: string;
  };
}

const AddTeacherDialog = ({ school }: SchoolProps) => {
  const schoolId = school.id;

  console.log("School ID:", schoolId);

  return <div>AddTeacherDialog</div>;
};
export default AddTeacherDialog;
