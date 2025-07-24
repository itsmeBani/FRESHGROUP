import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {useEffect} from "react";
import {supabase} from "@/utils/supabase.ts";
import {Loader} from "lucide-react";
import {toast} from "sonner";


export default function CreateNewPassword() {
    const {CreatePasswordForm, HandleConfirmNewPassword,loading} = useAuth()
    const navigate = useNavigate()
    const location = useLocation();
    useEffect(() => {
        const hashParams = new URLSearchParams(location.hash.slice(1));
        const errorCode = hashParams.get('error_code');
        if (errorCode === 'otp_expired') {

            toast.error("The password reset link has expired")

        }
        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            (event) => {
                if (event === 'USER_UPDATED') {
                    navigate("/login", {replace: true})
                } else if (event === "SIGNED_IN"){
                    navigate("/", {replace: true})
                }
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [])




    return (
        <div className="flex justify-center h-[100dvh] flex-col items-center   py-12 px-4 ">
            <div className="mx-auto w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center CircularFont text-3xl tracking-tight text-gray-900 dark:text-gray-50">
                        Create a New Password
                    </h2>
                    <p className="mt-2 text-center CircularFont text-sm text-gray-600 dark:text-gray-400">
                        Please enter your new password below to update your account credentials.
                    </p>
                </div>


                <Form {...CreatePasswordForm}>
                    <form onSubmit={CreatePasswordForm.handleSubmit(HandleConfirmNewPassword)}
                          className="w-full space-y-4">

                        <div>
                            <FormField
                                control={CreatePasswordForm.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={"CircularFont"}> New Password</FormLabel>
                                        <FormControl>
                                            <Input className="CircularFont" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-[12px] "/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={loading.newPassword} type="submit" className="w-full CircularFont">
                            {loading.newPassword ? <Loader className="animate-spin"/> : "Update Password"}
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