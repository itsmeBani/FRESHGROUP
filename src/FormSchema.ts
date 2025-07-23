import {z} from "zod";

export const FormSchema = z.object({
    username:  z.email("This is not a valid email.")
        .min(1, { message: "This field has to be filled." }),
    password: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export const ResetPasswordFormSchema = z.object({

    email: z.email("This is not a valid email.")
        .min(1, { message: "This field has to be filled." })

})
export const CreatePasswordFormSchema = z.object({
    password: z.string().min(7, {
        message: "New Password must be at least 7 characters.",
    }),

})


export const SignUpFormSchema = z.object({
    email: z.email("This is not a valid email.")
        .min(1, { message: "This field has to be filled." }),
    password: z.string().min(7, {
        message: "Password must be at least 7 characters.",
    }),
    confirmPassword: z.string().min(2, {
        message: "Confirm Password must be at least 2 characters.",
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});