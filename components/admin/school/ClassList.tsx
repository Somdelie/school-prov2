"use client";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClassProps } from "@/lib/types";
import { GraduationCap, Search, Users } from "lucide-react";
import { useState } from "react";
import AddClassDialog from "../dialogs/AddClassDialog";

interface ClassListProps {
  school: {
    id: string;
    schoolName: string;
  };
  classes: ClassProps[];
  onSelectClass: (classItem: ClassProps) => void;
  selectedClass: ClassProps | null;
}

const ClassList = ({
  school,
  classes,
  onSelectClass,
  selectedClass,
}: ClassListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClasses = classes.filter((classItem) =>
    classItem.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-52 bg-white dark:bg-gray-900">
      <div className="border-b px-2">
        <div className="flex items-center justify-between border-b py-2 border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Classes
          </h2>
          <AddClassDialog school={school} />
        </div>
        <div className="relative my-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            className="pl-8 bg-transparent border border-gray-400 dark:border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-125px)]">
        {
          //if no classes are found
          filteredClasses.length === 0 && (
            <div className="flex items-center justify-center h-full text-muted-foreground px-2">
              No classes found for this school yet.
            </div>
          )
        }
        <div>
          {filteredClasses.map((classItem) => (
            <div
              key={classItem.id}
              onClick={() => onSelectClass(classItem)}
              className={`group flex items-center justify-between px-2 py-1 border-b cursor-pointer mb-1 hover:bg-slate-200 dark:hover:bg-slate-600 ${
                selectedClass?.id === classItem.id
                  ? "bg-slate-200 dark:bg-slate-600"
                  : ""
              }`}
            >
              <div className="text-sm font-medium flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <div className="capitalize whitespace-nowrap truncate">
                    {classItem.className}
                  </div>
                  <span className="text-xs text-green-700 whitespace-nowrap truncate opacity-50 text-muted-foreground">
                    {classItem.streams.length} Sections
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="text-xs text-muted-foreground">
                    {classItem.streams.length} Students
                  </span>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100">
                {/* <DeleteDialog classId={classItem.id} /> */}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
export default ClassList;
