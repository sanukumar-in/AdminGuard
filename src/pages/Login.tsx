import {z} from "zod";

const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
    return(
        <div>
            Login Page
        </div>
    )
}