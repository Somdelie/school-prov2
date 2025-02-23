import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassProps } from "@/lib/types";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import { AddStreamDialog } from "../dialogs/AddStreamDialog";

const MainContent = ({ classItem }: { classItem: ClassProps | null }) => {
  if (!classItem) {
    return (
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center text-muted-foreground p-4">
        <GraduationCap className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-medium mb-2">No Class Selected</h3>
        <p className="text-center">
          Select a class from the sidebar to view its sections and details
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full border-l-2 border-gray-300 dark:border-gray-700">
      <div className="w-full flex flex-col">
        <div className="p-2 border-b flex justify-between items-center dark:bg-gray-900 bg-white border-white shadow-sm dark:border-gray-700 w-full">
          <div className="flex w-full items-center">
            <div className="flex gap-1 items-center w-full">
              <div className="w-full">
                <h1 className="text-xl font-semibold flex items-center gap-2 justify-between capitalize">
                  {classItem?.className}
                </h1>
                {/* <p className="text-sm text-muted-foreground lowercase">
                  class teacher:{" "}
                  {classItem.teachers
                    .map((teacher) => teacher.firstName)
                    .join(", ")}
                </p> */}
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <AddStreamDialog classId={classItem.id} />
          </div>
        </div>

        <div className="p-4 flex-1 overflow-auto w-full">
          <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-4">
            {classItem.streams.length === 0 ? (
              <div className="col-span-full min-h-[300px] flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-lg md:text-xl font-semibold text-muted-foreground">
                  No sections found
                </h2>
                <div className="relative w-full max-w-[300px] aspect-square">
                  <Image
                    fill
                    className="object-contain"
                    src="/images/not-found.png"
                    alt="No sections found"
                    sizes="(max-width: 300px) 100vw, 300px"
                    priority
                  />
                </div>
              </div>
            ) : (
              classItem.streams.map((stream) => (
                <Card
                  key={stream.id}
                  className="group hover:shadow-lg transition-all duration-200 ease-in-out"
                >
                  <CardHeader className="space-y-4">
                    <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xl font-semibold capitalize">
                        {stream.title}
                      </span>
                      <span className="text-sm font-normal text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                        30 students
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">
                            Class Teacher
                          </span>
                          <p className="font-medium truncate">{stream.title}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">
                            Attendance
                          </span>
                          <p className="font-medium text-green-600">{100}%</p>
                        </div>
                      </div>
                      <div className="relative pt-2">
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${30}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainContent;
