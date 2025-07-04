import { auth, signIn } from "@/app/utils/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import GeneralSubmitButton from "../general/SubmitButtons";
import { redirect } from "next/navigation";


export async function LoginForm() {
  const session = await auth()
  if (session?.user) {
    return redirect("/")
  }
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center" >
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>Login with your Google or Githup account</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <form action={async () => {
                        "use server";
                       await signIn("github", {redirectTo: "/onboarding",})
                    }}>
                            <GeneralSubmitButton 
                            text="Log in with GitHub" 
                            variant="outline" 
                            width="w-full" 
                            icon={                        <svg className="w-[42px] h-[42px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd"/>
                                </svg>}/>
                    </form>

                    <form action={ async() => {
                        "use server"
                        await signIn("google", {redirectTo: "/onboarding",})
                    } }>
                    <GeneralSubmitButton 
                            text="Log in with Google" 
                            variant="outline" 
                            width="w-full" 
                            icon={ <svg className="w-[41px] h-[41px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clipRule="evenodd"/>
                                </svg>}/>
                    </form>
                </CardContent>
            </Card>

        <div className="text-center text-xl text-muted-foreground text-balance">
            By clicking continue you have agree to our terms and services and policy.
        </div>

        </div>
    )
}