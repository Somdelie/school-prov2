"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Download,
  Search,
} from "lucide-react";
import { TeacherProps } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Teacher {
  teachers: TeacherProps[];
}

const TeachersList = ({ teachers }: Teacher) => {
  const [searchQuery, setSearchQuery] = useState("");
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //show filtered teachers after 3 characters
  const filtered = searchQuery.length > 2 ? filteredTeachers : teachers;

  console.log(filtered, "filtered teachers");

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {teachers.length} teacher
          {teachers.length !== 1 ? "s" : ""}
        </p>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-muted-foreground" />
          </span>
          <Input
            type="search for teachers"
            placeholder="Search teachers"
            className="pl-10 w-full md:w-96"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download /> Export
          </Button>
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          //if no teachers are found
          filtered.length === 0 && (
            <Card className="flex items-center justify-center h-full text-muted-foreground px-2 w-full col-span-3">
              <CardHeader>
                <CardTitle>No teachers found</CardTitle>
                <CardDescription>
                  Get started by adding your first teacher to the school
                </CardDescription>
              </CardHeader>
            </Card>
          )
        }
        {filtered.map((teacher) => (
          <Card
            key={teacher.email}
            className="group hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="relative pb-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">
                    {getInitials(teacher.firstName, teacher.lastName)}
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      {teacher.firstName} {teacher.lastName}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {teacher.subjects.length} subject(s)
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(teacher.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
                <div className="pt-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1">
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeachersList;
