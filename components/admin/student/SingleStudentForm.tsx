"use client";
import { createStudent } from "@/actions/school-actions";
import CitySelect from "@/components/front/common/CitySelect";
import CountrySelect from "@/components/front/common/CountrySelect";
import StateSelect from "@/components/front/common/StateSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProfileUpload } from "@/components/ui/UploadImage";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

interface SchoolProps {
  school: {
    id: string;
    schoolName: string;
    classes: {
      id: string;
      className: string;
      streams: { id: string; title: string }[];
    }[];
  };
  streams: { id: string; title: string }[];
}

const parentRole = [
  { value: "mother", label: "Mother" },
  { value: "father", label: "Father" },
  { value: "guardian", label: "Guardian" },
  { value: "siblings", label: "Siblings" },
  { value: "others", label: "Others" },
];

const SingleStudentForm = ({ school }: SchoolProps) => {
  const [isPending, startTransition] = useTransition();
  // Student fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | undefined>(
    undefined
  );
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );

  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined
  );

  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined
  );
  const [selectedStream, setSelectedStream] = useState<string | undefined>(
    undefined
  );

  // Parent fields
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [address, setAddress] = useState("");

  //get the streams data for the selected class using class id
  const streamsData = school.classes.find((c) => c.id === selectedClass);

  console.log(school, "school id here");

  const buttonDisabled = !(
    firstName &&
    lastName &&
    email &&
    password &&
    imageUrl &&
    dateOfBirth &&
    selectedGender &&
    selectedCountry &&
    selectedState &&
    selectedCity &&
    selectedClass &&
    selectedStream &&
    parentFirstName &&
    parentLastName &&
    parentEmail &&
    parentPhone &&
    address &&
    selectedRole
  );

  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      imageUrl,
      dateOfBirth,
      gender: selectedGender || "",
      nationality: selectedCountry || "",
      state: selectedState || "",
      city: selectedCity || "",
      classId: selectedClass || "",
      streamId: selectedStream || "",
      schoolId: school.id,
      parentFirstName,
      parentLastName,
      parentEmail,
      parentPhone,
      address,
      role: selectedRole || "",
    };

    try {
      startTransition(async () => {
        const response = await createStudent(data);
        if (response.success) {
          toast.success("Student added successfully");
        } else {
          toast.error(response.error || "An error occurred");
        }
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleAddStudent} className="flex flex-col gap-8">
      {/* Student Information Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Student Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-4">
            <ProfileUpload
              setImageUrl={setImageUrl}
              heading="Upload Student Profile Photo"
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
            <StateSelect
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
            />
          </div>
          <div className="grid gap-4">
            <Input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              id="email"
              type="email"
              placeholder="Student Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              id="dateOfBirth"
              type="date"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />

            <CountrySelect
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
            <CitySelect
              selectedState={selectedState}
              selectedCountry={selectedCountry}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>
        </div>
      </section>

      {/* Parent Information Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Parent Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            id="parentFirstName"
            type="text"
            placeholder="Parent First Name"
            value={parentFirstName}
            onChange={(e) => setParentFirstName(e.target.value)}
          />
          <Input
            id="parentLastName"
            type="text"
            placeholder="Parent Last Name"
            value={parentLastName}
            onChange={(e) => setParentLastName(e.target.value)}
          />
          <Input
            id="parentEmail"
            type="email"
            placeholder="Parent Email"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
          />
          <Input
            id="parentPhone"
            type="tel"
            placeholder="Parent Phone"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
          />
          <Input
            id="address"
            type="text"
            placeholder="Address"
            className="sm:col-span-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Select
            value={selectedRole}
            onValueChange={(value) => setSelectedRole(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role">
                {selectedRole ? selectedRole : "Select Role"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {parentRole.map((role) => (
                <SelectItem
                  key={role.value}
                  value={role.value}
                  onClick={() => setSelectedRole(role.value)}
                >
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* School Information Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          School Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Select
            value={selectedClass}
            onValueChange={(value) => setSelectedClass(value)}
          >
            <SelectTrigger disabled={!school?.classes?.length}>
              <SelectValue placeholder="Select Class">
                {selectedClass
                  ? school?.classes?.find((c) => c.id === selectedClass)
                      ?.className
                  : "Select Class"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {school?.classes?.map((classItem) => (
                <SelectItem key={classItem.id} value={classItem.id}>
                  {classItem.className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedStream}
            onValueChange={(value) => setSelectedStream(value)}
          >
            <SelectTrigger disabled={!streamsData?.streams?.length}>
              <SelectValue placeholder="Select Stream">
                {selectedStream
                  ? streamsData?.streams?.find((s) => s.id === selectedStream)
                      ?.title
                  : "Select Stream"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {streamsData?.streams?.map((stream) => (
                <SelectItem key={stream.id} value={stream.id}>
                  {stream.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit" disabled={buttonDisabled}>
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader size={16} className="animate-spin" />
              Submitting...
            </span>
          ) : (
            "Submit Student"
          )}
        </Button>
      </div>
    </form>
  );
};
export default SingleStudentForm;
