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
import {motion} from "motion/react"

import {useAuth} from "@/contexts/AuthContext.tsx";
import {Link} from "react-router-dom";
import {Loader} from "lucide-react";


export default function Signup() {
    const {SignUpForm, HandleSignUp, loading} = useAuth()

    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 200) - 100;
    return (
        <section className="bg-[#191919] overflow-hidden relative grid grid-cols-1  justify-center place-items-center  h-[100dvh]">
            <div className="lg:w-2xl w-full     p-5 lg:p-10   flex h-full  justify-center place-items-center">
                <Form {...SignUpForm}>
                    <form onSubmit={SignUpForm.handleSubmit(HandleSignUp)} className="dark:text-black lg:w-[450px] rounded-md space-y-4 z-1111 bg-white p-5 lg:p-10">


                        <div className="flex flex-col items-center lg:gap-2 text-center">
                            <h1 className="lg:text-2xl text-[18px] font-bold CircularFont font-bolder">Create a new account</h1>
                            <p className="text-muted-foreground CircularFont text-xs lg:text-sm text-balance">
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
                                                <Input className="CircularFont  dark:border-gray-300" placeholder="johndoe@gmail.com" {...field} />
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
                                                <Input className="CircularFont  dark:border-gray-300" placeholder="********" {...field} />
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
                                                <Input className="CircularFont dark:border-gray-300" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[12px] "/>
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <Button disabled={loading.signUp} type="submit" className="w-full dark:bg-background dark:text-white my-2">

                                {loading.signUp ? <Loader className="animate-spin"/> : "Create"}
                            </Button>
                            <div
                                className="after:border-border CircularFont relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                 <span className="text-muted-foreground relative z-10 px-2">
                                 Or continue with
                                  </span>
                            </div>
                            <Button variant="outline" className="w-full hover:text-black CircularFont">
                                <img className="w-[20px] h-[20px]" src={GOOGLEICON}/>
                                Google
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
            <motion.div
                className="orb-red w-[400px] h-[400px] absolute top-0 -right-40"
                initial={{ x: randomX, y: randomY, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: Math.random() * 0.5,
                }}
            />
            <motion.div
                className="orb-blue w-[350px] h-[350px] absolute top-0 lg:top-20 lg:left-20"
                initial={{ x: randomX, y: randomY, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: Math.random() * 0.6,
                }}
            />
            <motion.div
                className="orb-yellow w-[200px] h-[200px] absolute bottom-0 left-0"
                initial={{ x: randomX, y: randomY, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: Math.random() * 0.9,
                }}
            />

        </section>
    )
}
