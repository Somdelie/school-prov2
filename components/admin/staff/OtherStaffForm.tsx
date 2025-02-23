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
import { ProfileUpload } from "@/components/ui/UploadImage";
import { type FormEvent, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Building,
  Briefcase,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OtherStaffForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );
  const [selectedGender, setSelectedGender] = useState<string | undefined>(
    undefined
  );
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddStaff = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      firstName,
      lastName,
      email,
      phone,
      address,
      salary,
      imageUrl,
      dateOfBirth,
      nationality: selectedCountry,
      role: selectedRole,
      gender: selectedGender,
    };

    console.log(data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Add New Staff Member</CardTitle>
        <CardDescription>
          Enter the staff member&apos;s information to create a new profile in
          the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddStaff} className="flex flex-col gap-6">
          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Profile Upload Section */}
              <ProfileUpload
                setImageUrl={setImageUrl}
                heading="Profile Photo"
              />
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
                    placeholder="staff@school.com"
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
                value={selectedRole}
                onValueChange={(value) => setSelectedRole(value)}
              >
                <SelectTrigger className="relative pl-10">
                  <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <SelectValue placeholder="Select Role">
                    {selectedRole ? selectedRole : "Select Role"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrator</SelectItem>
                  <SelectItem value="LIBRARIAN">Librarian</SelectItem>
                  <SelectItem value="ACCOUNTANT">Accountant</SelectItem>
                  <SelectItem value="COUNSELOR">Counselor</SelectItem>
                  <SelectItem value="NURSE">Nurse</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                  <SelectItem value="SECURITY">Security</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>

              <CountrySelect
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
              <div className="relative">
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
            disabled={isSubmitting}
            className="w-full md:w-1/2 justify-center"
          >
            {isSubmitting ? (
              <>
                <Building className="mr-2 h-4 w-4 animate-spin" />
                Adding Staff Member...
              </>
            ) : (
              "Add Staff Member"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OtherStaffForm;
