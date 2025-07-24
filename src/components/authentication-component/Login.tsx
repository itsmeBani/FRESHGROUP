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
import {Label} from "../ui/label.tsx"

import {useAuth} from "@/contexts/AuthContext.tsx";
import {Link} from "react-router-dom";
import {Loader} from "lucide-react";
import {RenderClusterUi} from "@/components/charts/LandingPageUiCluster.tsx";


export default function Login() {
    const {form, SignInWithEmail, loading} = useAuth()


    return (
        <section className="flex overflow-hidden flex-row place-items-center justify-center h-[100dvh]">
            <div className="w-full md:w-full  lg:w-1/2 justify-start p-5 lg:p-10 flex ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(SignInWithEmail)} className="w-full  space-y-4">


                        <div className="flex flex-col items-center gap-2 text-center">

                            <h1 className="text-2xl font-bold CircularFont font-bolder">Login to your account</h1>
                            <p className="text-muted-foreground CircularFont text-sm text-balance">
                                Enter your email below to login to your account
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid ">

                                <FormField
                                    control={form.control}
                                    name="username"
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
                            <div className="grid py-2 ">
                                <div className="flex justify-between pb-2">
                                    <Label className={"CircularFont"} htmlFor="password">Password</Label>
                                    <div className="flex items-center">

                                        <Link
                                            to="/forgot-password"
                                            className="ml-auto text-sm CircularFont underline-offset-2 hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>

                                </div>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="shadcn" className="CircularFont" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[12px] "/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button disabled={loading.login} type="submit" className="w-full my-2">
                                {loading.login ? <Loader className="animate-spin"/> : " Login"}
                            </Button>
                            <div
                                className="after:border-border CircularFont relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                 <span className="bg-background text-muted-foreground relative z-10 px-2">
                                 Or continue with
                                  </span>
                            </div>
                            <Button variant="outline" className="w-full CircularFont">
                                <img className="w-[20px] h-[20px]" src={GOOGLEICON}/>
                                Login with Google
                            </Button>
                        </div>
                        <div className="text-center CircularFont text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to={"/sign-in"} className="underline CircularFont underline-offset-4">
                                Sign up
                            </Link>
                        </div>

                    </form>
                </Form>
            </div>

            {/*<div className="bg-image hidden    md:block flex h-full bg-blue-200 w-full">*/}



            {/*    /!*<RenderClusterUi/>*!/*/}
            {/*    <div className="flex flex-1 bg-pink-200 w-full h-full">*/}

            {/*    </div>*/}
            {/*</div>*/}
          <div className="bg-image hidden transform   md:flex  flex flex-col w-full h-full">
              <div className="flex p-5 pt-10 flex-col     w-full justify-center place-items-center">
                  <h1 className="md:text-3xl lg:text-6xl text-white text-center Kerif uppercase ">Welcome to FreshGroup</h1>
                  <p className="md:text-xs lg:text-lg text-center  text-white">We use unsupervised machine learning to cluster
                      first-year students based on shared traits like academic performance, background, and interests.
                      These insights help schools personalize support and improve student outcomes from the
                      beginning.</p>
              </div>
              <RenderClusterUi/>
          </div>
        </section>
    )
}

