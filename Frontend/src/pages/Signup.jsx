import React from "react";
import { Mail, Lock, Eye, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Signup = () => {
    const navigate=useNavigate();
    
    // Prevent the default behaviour of the form submit event
    // onSubmit handler lagao form tag pe
    // check kro ki har input box ka unique naam diya gya hai ya nahi. agar n hi diya to do
    // ab agar hm e.target.[fieldname].value likhenge to us input box ka value hame mil jayega



    // cors error: npm install cors kro backend me


    // beatiful popups ke liye: npm install react-toastify
    // main.jsx me dekho kya change kiya hai wo kro
    

    async function signup(data){
        try {
            let response = await fetch(import.meta.env.VITE_BACKEND_HOST+"/signup", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"content-type": "application/json"}
            });

            if(!response.ok){
                response = await response.json();
                toast.error(response.message, {
                    position: "top-center",
                    autoClose: 10000
                });
                return;
            }

            toast.success("Signed up!!", {autoClose: 2000, position: "top-center"});
            navigate("/login");


        } catch (error) {
            console.log(error);
        }
    }

    function handleFormSubmit(e){
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const password = e.target.password.value

        const data = {name, email, phone, password};

        signup(data);
        
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                {/* Logo */}
                <Link to="/" contentEditable={false}>
                    <div className="text-center mb-8" contentEditable={false}>
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

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Name
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 focus-within:border-[#7fad39] transition">
                            <User size={18} className="text-gray-400" />

                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-3 py-4 outline-none bg-transparent"
                                name="name"
                            />
                        </div>
                    </div>


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
                                name="email"
                                className="w-full px-3 py-4 outline-none bg-transparent"
                            />
                        </div>
                    </div>


                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 focus-within:border-[#7fad39] transition">
                            <Phone size={18} className="text-gray-400" />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your phone"
                                className="w-full px-3 py-4 outline-none bg-transparent"
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
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-3 py-4 outline-none bg-transparent"
                            />


                        </div>
                    </div>


                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#7fad39] hover:bg-[#6c992d] transition text-white py-4 rounded-xl font-semibold text-lg"
                    >
                        Signup
                    </button>
                </form>



                {/* Signup */}
                <p className="text-center text-gray-500 mt-8">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-[#7fad39] font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>
            </div>
        </div>
    );
};

export default Signup;