import React, { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";
import Nav from "../components/Nav";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(quantity + 1);

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [searchParams] = useSearchParams()
  const [product, setProduct] = useState({});
  // req.query.id,,,, searchParams.id

  async function fetchProductDetail() {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/product?id=" + searchParams.get("id"));
      if (!response.ok)
        return toast.error("Could not fetch your product!", { position: "bottom-center" });

      response = await response.json();
      setProduct(response.product);
    } catch (error) {
      toast.error("Could not fetch your product!", { position: "bottom-center" });
    }
  }

  useEffect(() => {
    fetchProductDetail();
  }, []);


  async function addToCart() {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/cart", {
        method: "POST",
        body: JSON.stringify({ productId: searchParams.get("id"), quantity }),
        headers: {"content-type": "application/json"},
        credentials: "include"
      });

      if (!response.ok)
        return toast.error("Could not add the item to your cart at the moment!", { position: "bottom-center" });

      toast.success("Item added to your cart!", { position: "bottom-center" });
    } catch (error) {
      toast.error("Could not add the item to your cart at the moment!", { position: "bottom-center" });
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-10 px-4">

      <div className="max-w-7xl mx-auto">


        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-sm p-8">

          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden border bg-[#fafafa]">
              <img
                src={product.images ? import.meta.env.VITE_BACKEND_HOST + "/images/" + product.images[0] : ""}
                alt="product"
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4 mt-5">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-24 h-24 rounded-2xl overflow-hidden border cursor-pointer hover:border-[#7fad39] transition"
                >
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <span className="w-fit bg-green-100 text-[#7fad39] px-4 py-2 rounded-full text-sm font-semibold mb-5">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            {/* <div className="flex items-center gap-3 mt-5">
                    <div className="flex items-center text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={20}
                            fill="currentColor"
                            strokeWidth={0}
                        />
                        ))}
                    </div>

                    <span className="text-gray-500">(120 Reviews)</span>
                    </div> */}

            {/* Price */}
            <div className="mt-6 flex items-center gap-4">
              <h2 className="text-4xl font-bold text-[#7fad39]">
                ${product.price}
              </h2>

              <span className="text-2xl text-gray-400 line-through">
                ${product.price + 50}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-5 mt-8">

              <div className="flex items-center border rounded-2xl overflow-hidden">
                <button
                  onClick={decreaseQty}
                  className="px-5 py-4 hover:bg-gray-100 transition"
                >
                  <Minus size={18} />
                </button>

                <span className="px-6 font-semibold text-lg">
                  {quantity}
                </span>

                <button
                  onClick={increaseQty}
                  className="px-5 py-4 hover:bg-gray-100 transition"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to Cart */}
              <button onClick={addToCart} className="flex items-center gap-3 bg-[#7fad39] hover:bg-[#6f9d32] transition text-white px-8 py-4 rounded-2xl font-semibold text-lg">
                <ShoppingCart size={20} />
                Add To Cart
              </button>

              {/* Wishlist */}
              <button className="w-14 h-14 rounded-2xl border flex items-center justify-center hover:bg-gray-100 transition">
                <Heart size={22} />
              </button>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">

              <div className="border rounded-2xl p-5 flex flex-col items-center text-center">
                <Truck size={28} className="text-[#7fad39] mb-3" />

                <h4 className="font-semibold text-gray-800">
                  Free Delivery
                </h4>

                <p className="text-gray-500 text-sm mt-1">
                  On orders over $99
                </p>
              </div>

              <div className="border rounded-2xl p-5 flex flex-col items-center text-center">
                <ShieldCheck
                  size={28}
                  className="text-[#7fad39] mb-3"
                />

                <h4 className="font-semibold text-gray-800">
                  Secure Payment
                </h4>

                <p className="text-gray-500 text-sm mt-1">
                  100% protected
                </p>
              </div>

              <div className="border rounded-2xl p-5 flex flex-col items-center text-center">
                <RotateCcw
                  size={28}
                  className="text-[#7fad39] mb-3"
                />

                <h4 className="font-semibold text-gray-800">
                  Easy Returns
                </h4>

                <p className="text-gray-500 text-sm mt-1">
                  7 day return policy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        {/* <div className="bg-white rounded-3xl shadow-sm p-8 mt-10">
          <div className="flex gap-8 border-b pb-4 mb-6">
            <button className="text-[#7fad39] font-semibold border-b-2 border-[#7fad39] pb-2">
              Description
            </button>

            <button className="text-gray-500 hover:text-[#7fad39] transition">
              Reviews
            </button>

            <button className="text-gray-500 hover:text-[#7fad39] transition">
              Shipping
            </button>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            Organic vegetables are grown naturally without harmful chemicals or
            pesticides. They are packed with vitamins, minerals, and essential
            nutrients that help maintain a healthy lifestyle.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetails;