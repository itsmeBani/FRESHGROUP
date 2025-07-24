
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Link} from "react-router-dom";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {Loader} from "lucide-react";






export default function ForgotPassword() {
const {HandleResetPassword,resetPasswordForm,loading}=useAuth()


    return (
        <div className="flex justify-center h-[100dvh] flex-col items-center   py-12 px-4 ">
            <div className="mx-auto w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center CircularFont text-3xl  tracking-tight text-gray-900 dark:text-gray-50">
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-center CircularFont text-sm text-gray-600 dark:text-gray-400">
                        Enter the email address associated with your account and we'll send you a link to reset your
                        password.
                    </p>
                </div>

                <Form {...resetPasswordForm}>
                    <form onSubmit={resetPasswordForm.handleSubmit(HandleResetPassword)} className="w-full space-y-4">

                        <div>
                            <FormField
                                control={resetPasswordForm.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={"CircularFont"}>  Email address</FormLabel>
                                        <FormControl>
                                            <Input className="CircularFont" placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-[12px] "/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={loading.resetPassword} type="submit" className="w-full CircularFont">
                            {loading.resetPassword ? <Loader className="animate-spin"/> : "Reset password"}
                        </Button>
                    </form>
                </Form>


                <div className="flex justify-center">
                    <Link
                        to="/login"
                        className="text-sm font-medium text-gray-600 CircularFont hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"

                    >
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    )
}