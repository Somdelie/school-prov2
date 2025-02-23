"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CountrySelect from "@/components/front/common/CountrySelect";
import { Input } from "@/components/ui/input";
// import { ProfileUpload } from "@/components/ui/UploadImage";
import { type FormEvent, useState, useTransition } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Building,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { AddSubjectDialog } from "../classes/add-subject-dialog";
import { Badge } from "@/components/ui/badge";
import { Bounce, toast } from "react-toastify";
import { AddSubjectDialog } from "../dialogs/AddSubjectDialog";
import { createTeacher } from "@/actions/school-actions";

interface ClassProps {
  className: string;
  schoolId: string;
  id: string;
  streams: {
    id: string;
    title: string;
  }[];
}

interface SubjectProps {
  title: string;
  id: string;
}

const TeacherForm = ({
  classes,
  subjects,
  schoolId,
}: {
  classes: ClassProps[];
  subjects: SubjectProps[];
  schoolId: string;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isPending, startTransition] = useTransition();
  const [selectedGender, setSelectedGender] = useState<string | undefined>(
    undefined
  );
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined
  );
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectProps[]>([]);

  console.log(schoolId, "school id in teacher form");

  const buttonDisabled = !(
    firstName &&
    lastName &&
    email &&
    phone &&
    address &&
    salary &&
    dateOfBirth &&
    selectedGender &&
    selectedCountry &&
    selectedClass &&
    selectedSubjects.length > 0
  );

  const handleAddSubject = (subject: SubjectProps) => {
    if (!selectedSubjects.find((s) => s.id === subject.id)) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleRemoveSubject = (subjectId: string) => {
    setSelectedSubjects(selectedSubjects.filter((s) => s.id !== subjectId));
  };

  const handleAddTeacher = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      firstName,
      lastName,
      email,
      phone,
      address,
      classId: selectedClass || "",
      schoolId,
      streamId: "",
      salary: Number(salary),
      // imageUrl,
      dateOfBirth,
      gender: selectedGender || "",
      nationality: selectedCountry || "",
      subjects: selectedSubjects.map((s) => ({ id: s.id, title: s.title })), // Ensure subject IDs and titles are sent
    };

    try {
      startTransition(async () => {
        const response = await createTeacher(data);
        if (response?.success) {
          toast.success(response?.message, {
            position: "top-right",
            transition: Bounce,
          });
          // Reset form...
        } else {
          toast.error(response?.message || "Failed to create teacher", {
            position: "top-right",
          });
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };
  // console.log(classes, "classes in teacher form");
  console.log(subjects, "subjects in teacher form");

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Add New Teacher</CardTitle>
        <CardDescription>
          Enter the teacher&apos;s information to create a new profile in the
          system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTeacher} className="flex flex-col gap-6">
          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Profile Upload Section */}
              {/* <ProfileUpload
                setImageUrl={setImageUrl}
                heading="Profile Photo"
              /> */}
              <div className="grid gap-2">
                <div className="relative">
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter first name"
                    className="pl-10"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                <div className="relative">
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter last name"
                    className="pl-10"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="teacher@school.com"
                    className="pl-10"
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="pl-10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>

                <div className="relative">
                  <Input
                    id="salary"
                    type="number"
                    placeholder="Enter amount"
                    className="pl-10"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                  />
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                id="dateOfBirth"
                type="date"
                placeholder="Date of Birth"
                className="w-full"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <Select
                value={selectedGender}
                onValueChange={(value) => setSelectedGender(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender">
                    {selectedGender ? selectedGender : "Select Gender"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedClass}
                onValueChange={(value) => setSelectedClass(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Class">
                    {selectedClass
                      ? classes.find((c) => c.id === selectedClass)?.className
                      : "Select Class"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {classes.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.id}>
                      {classItem.className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <CountrySelect
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Subjects</h3>
                    <p className="text-sm text-muted-foreground">
                      Select the subjects this teacher will teach
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex">
                    {" "}
                    <Select
                      onValueChange={(value) => {
                        const subject = subjects.find((s) => s.id === value);
                        if (subject) handleAddSubject(subject);
                      }}
                    >
                      <SelectTrigger className="w-full rounded-r-none">
                        <SelectValue placeholder="Select subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects &&
                          subjects
                            .filter(
                              (subject) =>
                                !selectedSubjects.find(
                                  (s) => s.id === subject.id
                                )
                            )
                            .map((subject) => (
                              <SelectItem key={subject.id} value={subject.id}>
                                {subject.title}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                    <AddSubjectDialog />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {selectedSubjects.map((subject) => (
                      <Badge
                        key={subject.id}
                        variant="secondary"
                        className="flex items-center justify-between"
                      >
                        {subject.title}
                        <button
                          type="button"
                          onClick={() => handleRemoveSubject(subject.id)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3 text-red-600" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative md:col-span-2">
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter street address"
                  className="pl-10"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={buttonDisabled}
            className="w-full md:w-1/2 justify-center"
          >
            {isPending ? (
              <>
                <Building className="mr-2 h-4 w-4 animate-spin" />
                Adding Teacher...
              </>
            ) : (
              "Add Teacher"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TeacherForm;
