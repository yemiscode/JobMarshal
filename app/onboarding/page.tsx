import { OnboardingForm } from "@/components/forms/onboarding/onboadingForm";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { requireUser } from "../utils/requireUser";

async function checkIfUserHasFinishedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      onBoardingCompleted: true,
    }
  })
   if (user?.onBoardingCompleted) {
    return redirect("/");

  }
  return user
}

export default async function OnboardingPage() {
  const session = await requireUser()
  await checkIfUserHasFinishedOnboarding(session.id as string); // Replace "userId" with the actual user ID from session or context
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
      <OnboardingForm/>
    </div>
  );
}