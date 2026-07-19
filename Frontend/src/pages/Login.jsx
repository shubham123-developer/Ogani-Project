import React from "react";
import { Mail, Lock, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {

    const navigate = useNavigate();

    async function loginHandler(credentials){
        try {
          const response = await fetch(import.meta.env.VITE_BACKEND_HOST+"/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {"content-type": "application/json"},
            credentials: "include"
          });

          if(!response.ok){
            const data = await response.json();
            toast.error(data.message, {position:"top-center", autoClose: 5000});
            return;
          }

          toast.success("Logged In!", {position: "top-center", autoClose: 2000});
          navigate("/");

        } catch (error) {
            toast.error("Something went wrong!", {position: "top-center", autoClose: 2000});
            console.log(error);
        }
    }

    function handleFormSubmit(e){
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const crendentials = {email, password};
        loginHandler(crendentials);
    }
    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                {/* Logo */}
                <Link to="/">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-extrabold tracking-tight">
                            <span className="text-[#7fad39]">O</span>GANI
                        </h1>

                        <p className="text-gray-500 mt-3">
                            Welcome back! Please login to your account.
                        </p>
                    </div>
                </Link>

                {/* Form */}
                <form onSubmit={handleFormSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 focus-within:border-[#7fad39] transition">
                            <Mail size={18} className="text-gray-400" />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-4 outline-none bg-transparent"
                                name="email"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 focus-within:border-[#7fad39] transition">
                            <Lock size={18} className="text-gray-400" />

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-3 py-4 outline-none bg-transparent"
                                name="password"
                            />


                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between text-sm">


                        <button
                            type="button"
                            className="text-[#7fad39] font-medium hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#7fad39] hover:bg-[#6c992d] transition text-white py-4 rounded-xl font-semibold text-lg"
                    >
                        Login
                    </button>
                </form>



                {/* Signup */}
                <p className="text-center text-gray-500 mt-8">
                    Don’t have an account?{" "}
                    <Link to={"/signup"}>
                        <span className="text-[#7fad39] font-semibold cursor-pointer hover:underline">
                            Sign Up
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;