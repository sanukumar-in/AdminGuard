import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { toast } from 'react-toastify';

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = (data: LoginFormData) => {
        if (data.email === "admin@gmail.com" && data.password === "Admin213") {
            localStorage.setItem("authToken", "uradmin");
            toast.success("Welcome back, Admin!");
            navigate("/app");
        } else {
            toast.error("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">AdminGuard Login</h1>
                <p className="text-sm text-gray-500 text-center mb-6">Sign in to your account</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            {...register('email')}
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-2xs text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            {...register('password')}
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-2xs text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-lg shadow-xs text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};
