import * as React from "react";
import {createContext, type PropsWithChildren, useContext, useEffect, useState} from "react";
import {supabase} from "@/utils/supabase.ts";

import {useForm, type UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {CreatePasswordFormSchema, FormSchema, ResetPasswordFormSchema, SignUpFormSchema} from "@/FormSchema";
import type { USER } from "@/Types";


type LoadingState = {
    login: boolean,
    signUp: boolean,
    resetPassword: boolean,
    newPassword: boolean
}


export interface AuthContextProp {
    user: USER | null | undefined
    loading: LoadingState

    setUser: React.Dispatch<React.SetStateAction<USER | null | undefined>>
    Logout: () => Promise<void>

    SignInWithEmail: (data: z.infer<typeof FormSchema>) => Promise<void>
    form: UseFormReturn<{ username: string; password: string }>


    resetPasswordForm: UseFormReturn<{ email: string }>
    HandleResetPassword: (data: z.infer<typeof ResetPasswordFormSchema>) => Promise<void>

    CreatePasswordForm: UseFormReturn<{ password: string }>
    HandleConfirmNewPassword: (data: z.infer<typeof CreatePasswordFormSchema>) => Promise<void>

    SignUpForm: UseFormReturn<{ email: string; password: string; confirmPassword: string }>
    HandleSignUp: (data: z.infer<typeof SignUpFormSchema>) => Promise<void>

}


const AuthContext = createContext<AuthContextProp | undefined>(undefined)


export function AuthContextProvider({children}: PropsWithChildren) {
    const [user, setUser] = useState<USER | null | undefined>(undefined)
    const [loading, setLoading] = useState<LoadingState>({
        login: false,
        signUp: false,
        resetPassword: false,
        newPassword: false
    });

    async function getUserRoleAndPermissions(id: string) :Promise<USER | null> {
        const {data, error} = await supabase
            .from('user')
            .select(`
      user_id,
      created_at,
      role_id,
      email,
      role:role_id (
        role_name,
        role_permission (
          permission:permission_id (
            permission_name,
             Description
          )
        )
      )
    `)
            .eq('user_id', id)
            .single()

        if (error) {
            console.error('Error:')
        }


        const permissions = data?.role?.role_permission?.map(
            (rp: any) => rp.permission.permission_name
        ) || [];
       if (!data) return null

        return {
            role: data?.role?.role_name,
            user: {
                created_at: data.created_at,
                email: data.email,
                role_id: data.role_id,
                user_id: data.user_id
            },
            permissions: permissions

        }


    }

    useEffect(() => {

        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'INITIAL_SESSION') {
                    if (!session) setUser(null)
                } else if (event === 'SIGNED_IN') {
                    if (session) {
                        getUserRoleAndPermissions(session.user.id)
                            .then(res =>   setUser(res))
                    }

                }else {
                    setUser(null)
                }

            })
        return () => {
            subscription.unsubscribe()
        }
    }, [])
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })
    const SignUpForm = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
    })
    const resetPasswordForm = useForm<z.infer<typeof ResetPasswordFormSchema>>({
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    })


    async function SignInWithEmail(data: z.infer<typeof FormSchema>) {
        setLoading((prev) => ({...prev, login: true}));

        try {
            const {data: AuthData, error} = await supabase.auth.signInWithPassword({
                email: data?.username,
                password: data?.password,
            })
            if (AuthData.user) {
               const user=await getUserRoleAndPermissions(AuthData?.user?.id)
                if (user?.role){
                    toast.success("Welcome Back")
                } else {
                    toast.error("Permission Denied")
                }
                form.reset()
            }
            if (error) {
                toast.error(error.message)
            }


        } catch (e) {
            toast.error("Something Went Wrong")
        } finally {
            setLoading((prev) => ({...prev, login: false}));
        }
    }



    async function HandleSignUp(formData: z.infer<typeof SignUpFormSchema>) {
        setLoading((prev) => ({...prev, signUp: true}));
        try {
            const {data, error} = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            })
            if (error) toast.error(error.message)

            if (data.user) {

                const {error} = await supabase
                    .from('user')
                    .insert({
                        email: formData.email,
                        user_id: data?.user?.id
                    })
                if (error) {
                    toast.error(error.message)
                }
                if (!error) {
                    SignUpForm.reset()
                    toast.success("User created. Waiting for approval.");
                }
            }


        } catch (e) {
            toast.error("Something Went Wrong")
        } finally {
            setLoading((prev) => ({...prev, signUp: false}));
        }
    }

    const Logout = async () => {
        const {error} = await supabase.auth.signOut({ scope: 'local' })
        console.log(error)
        if (!error) {

            toast.success("Logout Successfully")
        }
        if (error)  toast.error(error?.message)
    }

    async function HandleResetPassword(data: z.infer<typeof ResetPasswordFormSchema>) {
        setLoading((prev) => ({...prev, resetPassword: true}));
        try {
            const {error} = await supabase.auth
                .resetPasswordForEmail(data?.email,
                    // https://freshgroup.vercel.app/
                    {redirectTo: "http://localhost:3000/forgot-password/new-password"}
                )

            if (error) toast.warning(error.message)

            if (!error) {
                resetPasswordForm.reset()
                toast.success("Recovery link is sent to " + data?.email)
            }
        } catch (e) {
            toast.error("Something Went Wrong")
        } finally {
            setLoading((prev) => ({...prev, resetPassword: false}));
        }
    }

    const CreatePasswordForm = useForm<z.infer<typeof CreatePasswordFormSchema>>({
        resolver: zodResolver(CreatePasswordFormSchema),
        defaultValues: {
            password: "",
        },
    })

    async function HandleConfirmNewPassword(data: z.infer<typeof CreatePasswordFormSchema>) {
        setLoading((prev) => ({...prev, newPassword: true}));

        try {
            const {error} = await supabase.auth.updateUser({
                password: data?.password
            })

            console.log(error)
            if (error) {
                toast.error(error.message)
            }else {
                    toast.success("Password Updated")
            }
        } catch (e) {
            toast.error("Something Went Wrong")
        } finally {
            setLoading((prev) => ({...prev, newPassword: false}));
        }
    }


    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            Logout,
            form,
            SignInWithEmail,
            loading,
            resetPasswordForm,
            HandleResetPassword,
            CreatePasswordForm,
            HandleConfirmNewPassword,
            SignUpForm, HandleSignUp
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must used inside the AuthContextProvider")
    }

    return context
}