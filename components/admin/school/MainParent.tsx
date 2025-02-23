"use client";
import { ClassProps } from "@/lib/types";
import { useState } from "react";
import ClassList from "./ClassList";
import MainContent from "./MainContent";

interface School {
  id: string;
  schoolName: string;
}

const MainParent = ({
  classes,
  school,
}: {
  classes: ClassProps[];
  school: School;
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassProps | null>(null);

  //default selected class is the first class in the list of classes passed in as props
  if (!selectedClass && classes.length > 0) {
    setSelectedClass(classes[0]);
  }

  return (
    <div className="flex min-h-max rounded w-full border-2 border-gray-300 dark:border-gray-700">
      {/* class list */}
      <ClassList
        school={school}
        classes={classes}
        onSelectClass={setSelectedClass}
        selectedClass={selectedClass}
      />
      {/* selected class content */}
      <MainContent classItem={selectedClass} />
    </div>
  );
};
export default MainParent;
