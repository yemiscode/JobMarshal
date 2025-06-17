import { CreateJobSeeker } from "@/app/utils/action";
import { jobSeekerSchema } from "@/app/utils/zodSchemas";
import { UploadDropzone } from "@/components/general/uploadThingReexported";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import pdfImage from "@/public/pdf.png";

export function JobSeekerForm() {

  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: "",
      about: "",
      resume: "",
    },
  })
 
        const [pending, setPending] = useState(false)
  
    async function onSubmit(data: z.infer<typeof jobSeekerSchema>) {
      setPending(true)
       try {
        await CreateJobSeeker(data);
       }catch (error) {
        if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
         console.log("something went wrong", error); 
        }
       }finally {
        setPending(false)
       }
      }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
              <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                        <Input {...field} placeholder="Enter Your Full Name"/>
                  </FormControl>
                  <FormMessage/>
              </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="about"
          render={({field}) => (
              <FormItem>
                  <FormLabel>Short Bio</FormLabel>
                  <FormControl>
                      <Textarea {...field} placeholder="Tell us about your self..." />
                  </FormControl>
              </FormItem>
          )}
            />
            <FormField
              control={form.control}
              name="resume"
              render={({field}) => (
                  <FormItem>
                      <FormLabel>Resume (PDF) </FormLabel>
                      <FormControl>
                        <div>
                          {field.value ? (
                            <div className="relative w-fit">
                              <Image
                                src={pdfImage}
                                alt="pdf resume image"
                                width={100}
                                height={100}
                                className="rounded-lg"/>
                                <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2" onClick={() => 
                                  field.onChange("")}>
                                  <XIcon className="size-4"/>
                                </Button>
                             </div>
                          ) : (
                            <UploadDropzone
                              endpoint="resumeUploader"
                              onClientUploadComplete={(res) => {
                                field.onChange(res[0]?.ufsUrl);
                              }}
                              onUploadError={(error: Error) => {
                                console.error("Upload failed:", error);
                              }}
                            />
                          )}
                        </div>
            
                      </FormControl>
                  </FormItem>
              ) }
              />
              <Button type="submit" disabled={pending} className="w-full" >
                {pending ? "Submitting..." : "Continue"}</Button>
      </form>
    </Form>
  );
}