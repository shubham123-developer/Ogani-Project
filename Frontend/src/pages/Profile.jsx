import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  ShoppingBag,
  Heart,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  async function logoutHandler() {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/logout", { credentials: "include" });
      if (!response.ok)
        return toast.error("Could not process your request at the moment!", { position: "bottom-center" })

      navigate("/login");
    } catch (error) {
      toast.error("Could not process your request at the moment!", { position: "bottom-center" })
    }
  }

  async function fetchProfile() {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/profile", { credentials: "include" });
      if (!response.ok) {
        return navigate("/login");
      }

      const data = await response.json();
      setUser(data.message);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }


  useEffect(() => {
    fetchProfile();
  }, [])
  return (
    <div className="min-h-screen bg-[#f5f5f5] py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar */}
        <div className="bg-white rounded-3xl shadow-sm p-6 h-fit">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-[#7fad39]"
            />

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {user.name}
            </h2>

            <p className="text-gray-500 text-sm">
              {user.email}
            </p>
          </div>

          {/* Menu */}
          <div className="mt-8 space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#7fad39] text-white font-medium">
              <User size={18} />
              My Profile
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700">
              <ShoppingBag size={18} />
              My Orders
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700">
              <Heart size={18} />
              Wishlist
            </button>

            <button onClick={logoutHandler} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-red-500">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-800">
                  Profile Information
                </h3>

              </div>

            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3 text-[#7fad39]">
                  <User size={20} />
                  <span className="font-semibold">Full Name</span>
                </div>

                <p className="text-gray-700 text-lg">
                  {user.name}
                </p>
              </div>

              {/* Email */}
              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3 text-[#7fad39]">
                  <Mail size={20} />
                  <span className="font-semibold">Email Address</span>
                </div>

                <p className="text-gray-700 text-lg">
                  {user.email}
                </p>
              </div>

              {/* Phone */}
              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3 text-[#7fad39]">
                  <Phone size={20} />
                  <span className="font-semibold">Phone Number</span>
                </div>

                <p className="text-gray-700 text-lg">
                  {user.phone}
                </p>
              </div>

              {/* Address */}
              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3 text-[#7fad39]">
                  <MapPin size={20} />
                  <span className="font-semibold">Address</span>
                </div>

                <p className="text-gray-700 text-lg">
                  New York, USA
                </p>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Recent Orders
              </h3>

              <button className="text-[#7fad39] font-semibold hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-5">

              {/* Order */}
              {[1, 2, 3].map((order) => (
                <div
                  key={order}
                  className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div>
                    <p className="font-bold text-gray-800">
                      Order #OGN{1000 + order}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      2 Products • March 12, 2025
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <p className="font-bold text-lg text-[#7fad39]">
                      $120.00
                    </p>

                    <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                      Delivered
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;