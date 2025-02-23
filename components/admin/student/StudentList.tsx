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
  School,
  Calendar,
  Download,
  Search,
  Hash,
  MessageCircle,
  Eye,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentNumber: string;
  imageUrl: string;
  nationality: string;
  parentPhone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  class: {
    className: string;
  };
  stream: {
    title: string;
  };
}

interface StudentListProps {
  students: Student[];
  schoolSlug: string;
}

const StudentList = ({ students, schoolSlug }: StudentListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("");

  // Extract unique grades from students
  const grades = [
    ...new Set(students.map((student) => student.class.className)),
  ].map((grade) => ({
    value: grade,
    label: grade,
  }));

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = selectedGrade
      ? student.class.className === selectedGrade
      : true;

    return matchesSearch && matchesGrade;
  });

  // Show filtered students after 3 characters
  const filtered =
    searchQuery.length > 2
      ? filteredStudents
      : selectedGrade
      ? filteredStudents
      : students;

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filtered?.length} student
          {filtered?.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {selectedGrade
                  ? grades.find((grade) => grade.value === selectedGrade)?.label
                  : "Filter by Grade..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search grade..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No grade found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="all"
                      onSelect={() => {
                        setSelectedGrade("");
                        setOpen(false);
                      }}
                    >
                      All Grades
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedGrade === "" ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                    {grades.map((grade) => (
                      <CommandItem
                        key={grade.value}
                        value={grade.value}
                        onSelect={(currentValue) => {
                          setSelectedGrade(
                            currentValue === selectedGrade ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        {grade.label}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedGrade === grade.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </span>
            <Input
              type="search"
              placeholder="Search students"
              className="pl-10 w-full md:w-96"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <Card className="flex items-center justify-center h-full text-muted-foreground px-2 w-full col-span-3">
            <CardHeader>
              <CardTitle>No students found</CardTitle>
              <CardDescription>
                {searchQuery || selectedGrade
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by adding your first student to the school"}
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {filtered.map((student) => (
          <Card
            key={student.id}
            className="group hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="relative pb-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                    <Image
                      src={student.imageUrl}
                      alt={`${student.firstName} ${student.lastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      {student.firstName} {student.lastName}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <School className="w-4 h-4 mr-1" />
                      {student.class.className} - {student.stream.title}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Hash className="w-4 h-4" />
                  <span>{student.studentNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{student.parentPhone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(student.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
                <hr className="w-full" />
                <div className="pt-1 flex space-x-2">
                  <Link
                    href={`/schools/${schoolSlug}/students/${student.id}`}
                    className="flex-1"
                  >
                    <Button variant="outline" size="icon" className="">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-green-800 text-white font-semibold hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4" />
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

export default StudentList;
