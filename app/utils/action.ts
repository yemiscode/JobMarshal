"use server"

import { prisma } from "@/lib/db"
import { requireUser } from "./requireUser"
import { z } from "zod"
import { redirect } from "next/navigation"
import { companySchema, jobSeekerSchema } from "./zodSchemas"
import arcjet, { detectBot, shield } from "./arcjet"
import { request } from "@arcjet/next"

const aj = arcjet.withRule(
  shield({
    mode: "LIVE",
  })
)
.withRule(
  detectBot({
    mode: "LIVE",
    allow: []
  })
)

export async function createCompany(data: z.infer<typeof companySchema>) {
    const session = await requireUser();
    const req = await request();
  
    const decision = await aj.protect(req)
    if (decision.isDenied()) {
      throw new Error("FORBIDDEN");
    }
    // Server-side validation
    const validatedData = companySchema.parse(data);
    console.log(validatedData);

     //  Check if company already exists
  const existing = await prisma.company.findUnique({
    where: { userId: session.id },
  });

  if (existing) {
    throw new Error("This user already has a company.");
  }
  
    await prisma.user.update({
      where: {
        id: session.id,
      },
      data: {
        onBoardingCompleted: true,
        UserType: "COMPANY",
        Company: {
          create: {
            ...validatedData,
          },
        },
      },
    });
  
    return redirect("/");
  }
  
  export async function CreateJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
    const user = await requireUser();
    const validateData = jobSeekerSchema.parse(data);
    await prisma.user.update({    
      where: {
        id: user.id as string},
        data: {
          onBoardingCompleted: true,
          UserType: "JOB_SEEKER",
          JobSeeker: {
            create: {
              ...validateData,
            },
          },
        }
    })
    return redirect("/");
  }