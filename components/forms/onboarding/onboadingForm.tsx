"use client";

import Image from "next/image";
import Logo from "@/public/logo.png";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { UserTypeSelection } from "./userTypeForm";
import { CompanyForm } from "./companyForm";
import { JobSeekerForm } from "./JobSeekerForm";

type UserSelectionType =
    | null
    | "jobSeeker"
    | "company";

export function OnboardingForm() {
    const [step, setStep] = useState(1)
    const [userType, setUserType] = useState<UserSelectionType>(null)

function handleUserSelectionType(type: UserSelectionType) {
    setUserType(type);
    setStep(2);
}
function renderStep() {
    switch(step) {
        case 1:
            return <UserTypeSelection onSelect={handleUserSelectionType}/>
        case 2:
            return userType === "company" ? (<CompanyForm />) :
                (<JobSeekerForm />);
        default: 
        return null;
    }

}

  return (
    <>
    <div className="flex items-center gap-4 mb-10">
        <Image
          src={Logo}
          alt="logo"
          className="size-12"
          />
          <h1 className="text-4xl font-bold">Job<span className="text-primary">Marshal</span></h1>
    </div>
    <Card className="max-w-lg w-full">
        <CardContent className="p-6">{renderStep()}</CardContent>
    </Card>
    </>
  );
}