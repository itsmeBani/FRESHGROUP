
import GOOGLEICON from "../../assets/GOOGLE-ICON.svg"
import {Button} from "@/components/ui/button.tsx"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx"
import {Input} from "@/components/ui/input.tsx"


import {useAuth} from "@/contexts/AuthContext.tsx";
import {Link} from "react-router-dom";
import {Loader} from "lucide-react";



export default function Signup() {
    const {SignUpForm,HandleSignUp,loading}=useAuth()


    return (
        <section className="flex overflow-hidden grid grid-cols-1  justify-center place-items-center  h-[100dvh]">
            <div className="lg:w-2xl w-full     p-5 lg:p-10   flex h-full  justify-center place-items-center">
                <Form {...SignUpForm}>
                    <form onSubmit={SignUpForm.handleSubmit(HandleSignUp)} className="lg:w-2/3 space-y-4">


                        <div className="flex flex-col items-center lg:gap-2 text-center">
                            <h1 className="text-2xl font-bold CircularFont font-bolder">Create a new account</h1>
                            <p className="text-muted-foreground CircularFont text-sm text-balance">
                                Enter your details below to sign up and get started
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <div className="grid ">

                                <FormField
                                    control={SignUpForm.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={"CircularFont"}>Email</FormLabel>
                                            <FormControl>
                                                <Input className="CircularFont" placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[12px] "/>
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className="grid ">

                                <FormField
                                    control={SignUpForm.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={"CircularFont"}>Password</FormLabel>
                                            <FormControl>
                                                <Input className="CircularFont" placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[12px] "/>
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className="grid ">

                                <FormField
                                    control={SignUpForm.control}
                                    name="confirmPassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={"CircularFont"}>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input className="CircularFont" placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[12px] "/>
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <Button disabled={loading.signUp} type="submit" className="w-full my-2">

                                {loading.signUp ? <Loader className="animate-spin"/> : "Create"}
                            </Button>
                            <div
                                className="after:border-border CircularFont relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                 <span className="bg-background text-muted-foreground relative z-10 px-2">
                                 Or continue with
                                  </span>
                            </div>
                            <Button variant="outline" className="w-full CircularFont">
                                <img className="w-[20px] h-[20px]" src={GOOGLEICON}/>
                                Continue with Google
                            </Button>
                        </div>
                        <div className="text-center CircularFont text-sm">
                           Already have an account?{" "}
                            <Link to={"/login"} className="underline CircularFont underline-offset-4">
                                Login
                            </Link>
                        </div>

                    </form>
                </Form>
            </div>

        </section>
    )
}
