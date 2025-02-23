"use client";

import { createProfile } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "react-toastify";

export interface User {
  // Define the properties of the user object here
  firstName: string;
  lastName: string;
  phone: string;
  primaryEmailAddress: {
    emailAddress: string;
  };
}

const ProfileForm = ({ user }: { user: User }) => {
  const [isPending, startTransition] = useTransition();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const email = user?.primaryEmailAddress?.emailAddress;

  const buttonDisabled = !firstName || !lastName || !phone;

  const data = {
    firstName,
    lastName,
    phone,
    primaryEmailAddress: {
      emailAddress: email,
    },
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await createProfile(data);
      console.log(result);
      if (result?.success) {
        toast.success("School added successfully");
      } else {
        toast.error("An error occurred");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Full Name*</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your full name"
            className="w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name*</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            className="w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number*</Label>
          <Input
            id="phone"
            type="text"
            placeholder="Enter your phone number"
            className="w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={buttonDisabled}>
          {isPending ? (
            <span className="flex items-center space-x-2">
              <Loader2 className="animate-spin" />
              Adding School...
            </span>
          ) : (
            "Add School"
          )}
        </Button>
      </div>
    </form>
  );
};
export default ProfileForm;
