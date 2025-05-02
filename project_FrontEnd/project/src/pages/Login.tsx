// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Mail, Lock, Loader, AlertCircle, Brain } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";

// // Zod schema for form validation
// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// export const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       await login(data.email, data.password);
//       navigate("/upload");
//     } catch (error) {
//       setError("Invalid credentials! Use: test@example.com / password123");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-700">
//       <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
//         <div className="text-center">
//           <Brain className="mx-auto h-12 w-12 text-blue-600" />
          
//           <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
//             Medical Image Captioning System
//           </h1>
//           {/* ✅ Increased font size & made it bold */}
//           <p className="mt-1 text-lg font-semibold text-gray-700">
//             Sign in to access your medical dashboard
//           </p> 
//         </div>

//         {error && (
//           <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
//             <AlertCircle className="h-5 w-5" />
//             <p>{error}</p>
//           </div>
//         )}

//         <form className="mt-4 space-y-5" onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <div className="relative mt-1">
//               <Mail className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 {...register("email")}
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
//               />
//             </div>
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <div className="relative mt-1">
//               <Lock className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 {...register("password")}
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
//               />
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
//           >
//             {isLoading ? (
//               <Loader className="h-5 w-5 animate-spin" />
//             ) : (
//               "Sign in"
//             )}
//           </button>
//         </form>

//         {/* Social Login */}
//         <div className="mt-5">
//           <p className="text-center text-sm text-gray-600">Or continue with</p>
//           <div className="mt-3 flex gap-4">
//             <button
//               className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
//               onClick={() => alert("Google login coming soon!")}
//             >
//               <FcGoogle className="h-5 w-5" /> Google
//             </button>
//             <button
//               className="flex-1 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition flex items-center justify-center gap-2"
//               onClick={() => alert("Facebook login coming soon!")}
//             >
//               <FaFacebook className="h-5 w-5" /> Facebook
//             </button>
//           </div>
//         </div>

//         {/* Sign Up Link */}
//         <div className="mt-5 text-center">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{" "}
//             <a
//               href="#"
//               className="text-purple-600 hover:text-purple-500"
//               onClick={() => alert("Sign up feature coming soon!")}
//             >
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Loader, AlertCircle, Brain } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(data.email, data.password);
      navigate("/upload");
    } catch (error) {
      setError("Invalid credentials! Use: test@example.com / password123");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="text-center">
          <Brain className="mx-auto h-12 w-12 text-blue-600" />

          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            Medical Image Captioning System
          </h1>
          {/* ✅ Increased font size & made it bold */}
          <p className="mt-1 text-lg font-semibold text-gray-700">
            Sign in to access your medical dashboard
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        <form className="mt-4 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-5">
          <p className="text-center text-sm text-gray-600">Or continue with</p>
          <div className="mt-3 flex gap-4">
            <button
              className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
              onClick={() => alert("Google login coming soon!")}
            >
              <FcGoogle className="h-5 w-5" /> Google
            </button>
            <button
              className="flex-1 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition flex items-center justify-center gap-2"
              onClick={() => alert("Facebook login coming soon!")}
            >
              <FaFacebook className="h-5 w-5" /> Facebook
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="mt-5 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-purple-600 hover:text-purple-500"
              onClick={() => alert("Sign up feature coming soon!")}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;





