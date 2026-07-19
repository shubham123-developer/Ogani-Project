import React from "react";
import {
  Menu,
  ShoppingCart,
  Heart,
  Search,
  ChevronDown,
} from "lucide-react";
import Nav from "../components/Nav";

const products = [
  {
    id: 1,
    name: "Fresh Vegetables",
    price: "$24.00",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Organic Fruits",
    price: "$18.00",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Healthy Juice",
    price: "$12.00",
    image:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1200&auto=format&fit=crop",
  },
];

const categories = [
  "Fresh Fruits",
  "Vegetables",
  "Organic Food",
  "Dairy Products",
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div>
          <p className="uppercase tracking-[4px] text-[#7fad39] font-bold mb-4">
            Fresh & Organic
          </p>

          <h2 className="text-6xl font-extrabold leading-tight text-gray-800 mb-6">
            Healthy Food <br />
            Organic Market
          </h2>

          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Discover fresh vegetables, fruits, and organic products delivered
            directly to your home.
          </p>

          <button className="bg-[#7fad39] hover:bg-[#6e9e33] transition text-white px-8 py-4 rounded-xl font-semibold">
            SHOP NOW
          </button>
        </div>

        {/* RIGHT */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1400&auto=format&fit=crop"
            alt="hero"
            className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-3xl shadow-sm p-5 flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-[#7fad39]"
            />
          </div>

          <button className="bg-[#7fad39] hover:bg-[#6e9e33] transition text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-semibold">
            <Search size={18} />
            Search
          </button>
        </div>
      </section>

      

        {/* NEWSLETTER */}
        
    </div>
  );
};

export default Home;