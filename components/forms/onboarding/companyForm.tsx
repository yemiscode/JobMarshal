"use client"
// import { OurFileRouter } from "@/app/api/uploadthing/core"
import { countryList } from "@/app/utils/countriesList"
import { companySchema } from "@/app/utils/zodSchemas"
import { UploadDropzone } from "@/components/general/uploadThingReexported"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import "uploadthing/tw/v4";
import "@uploadthing/react/styles.css";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { XIcon } from "lucide-react"
import { createCompany } from "@/app/utils/action"


export function CompanyForm() {
    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
        defaultValues: {
          about: "",
          location: "",
          logo: "",
          name: "",
          website: "",
          xAccount: "",
        },
      })

      const [pending, setPending] = useState(false)

  async function onSubmit(data: z.infer<typeof companySchema>) {
    setPending(true)
     try {
      await createCompany(data);
     }catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
       console.log("something went wrong", error); 
      }
     }finally {
      setPending(false)
     }
    }

   return (
        <div className="flex flex-col gap-6">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter Your Company Name"/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Worldwide</SelectLabel>
                      <SelectItem value="worldwide">
                        <span>🌍</span>
                        <span className="pl-2">Worldwide / Remote</span>
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>
                      {countryList.map((country) => (
                        <SelectItem value={country.name} key={country.code}>
                          <span>{country.flagEmoji}</span>
                          <span className="pl-2">{country.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="website"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="htpps://yourcomapany.com"/>
                                </FormControl>
                            </FormItem>
                        )}
                        /> 
                    <FormField
                        control={form.control}
                        name="xAccount"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>X (Twitter) Account</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="@yourcompanya"/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="about"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>About</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Tell us about your company..." />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="logo"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Company Logo</FormLabel>
                                <FormControl>
                                  <div>
                                    {field.value ? (
                                      <div className="relative w-fit">
                                        <Image
                                          src={field.value}
                                          alt="Company Logo"
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
                                        endpoint="imageUploader"
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

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Submitting..." : "Continue"}
        </Button>

                </form>
            </Form>
        </div>
   ) 
}