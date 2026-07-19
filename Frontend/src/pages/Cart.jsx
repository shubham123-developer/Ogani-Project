import React, { useEffect, useState } from "react";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRazorpay } from "react-razorpay";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);


  async function fetchCart() {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/cart", { credentials: "include" });

      if (!response.ok)
        return toast.error("Could not fetch your cart!", { position: "bottom-center" });

      response = await response.json();
      console.log(response);
      setCartItems(response.cart);
    } catch (error) {
      toast.error("Could not fetch your cart!", { position: "bottom-center" });
    }
  }

  useEffect(() => {
    fetchCart();
  }, [])

  // const increaseQty = (id) => {
  //   setCartItems((items) =>
  //     items.map((item) =>
  //       item.id === id
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     )
  //   );
  // };

  // const decreaseQty = (id) => {
  //   setCartItems((items) =>
  //     items.map((item) =>
  //       item.id === id && item.quantity > 1
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );
  // };

  // const removeItem = (id) => {
  //   setCartItems((items) =>
  //     items.filter((item) => item.id !== id)
  //   );
  // };

  // const subtotal = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  // const shipping = 10;
  // const total = subtotal + shipping;


  const subtotal = cartItems.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
  const shipping = 20;
  const total = subtotal + shipping;



  async function addToCart(action, product) {
    try {

      // if(action=="increment"){
      //   alert(product.quantity+1)
      // }else{
      //   alert(product.quantity-1);
      // }
      // alert(product.productId);

      // return;

      let quantity = null;
      if (action == "increment")
        quantity = 1
      else if (action == "decrement")
        quantity = -1
      else if (action == "delete")
        quantity = -product.quantity

      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/cart", {
        method: "POST",
        body: JSON.stringify({ productId: product.productId, quantity }),
        headers: { "content-type": "application/json" },
        credentials: "include"
      });

      if (!response.ok)
        return toast.error("Could not perform the action at the moment!", { position: "bottom-center" });

      response = await response.json();
      const updatedCart = response.message;

      setCartItems(updatedCart);
    } catch (error) {
      console.log(error)
      toast.error("Could not perform the action at the moment!", { position: "bottom-center" });
    }
  }


  const { Razorpay } = useRazorpay();

  async function handleCheckout() {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/createorder", { credentials: "include" });
      if (!response.ok)
        return toast.error("Something went wrong!", { position: "bottom-center" });

      response = await response.json();
      const order = response.order;

      const options = {
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        key: "rzp_test_Sv4YSWvyrfYTtb",
        name: "OGANI",
        handler: async (payment_info) => {
          try {
            let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/verifypayment",
              {
                credentials: "include",
                method: "POST",
                body: JSON.stringify({ orderId: payment_info.razorpay_order_id, paymentId: payment_info.razorpay_payment_id, signature: payment_info.razorpay_signature }),
                headers: { "content-type": "application/json" }
              }
            );

            if (!response.ok)
              return toast("Payment failed!", { position: "bottom-center" });

            toast("Payment ho gya!", { position: "bottom-center" });
          } catch (error) {
            toast("Payment Failed!! Kat gya to gya!", { position: "bottom-center" });
          }
        },
        prefill: {
          name: "Tashif Iqbal",
          email: "john@example.com",
          contact: "+918210853664",

        },
        theme: {
          color: "#7fad39"
        }
      }

      const razorpay = new Razorpay(options);
      razorpay.open(options);
    } catch (error) {
      toast.error("Something went wrong!", { position: "bottom-center" });
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-10 px-4">
      <div className="max-w-7xl mx-auto">


        {cartItems.length === 0 ? (
          /* EMPTY CART */
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
            <div className="w-24 h-24 bg-[#7fad39]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag
                size={42}
                className="text-[#7fad39]"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mb-8">
              Looks like you haven’t added anything yet.
            </p>

            <button className="bg-[#7fad39] hover:bg-[#6f9d32] transition text-white px-8 py-4 rounded-2xl font-semibold">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6"
                >

                  {/* IMAGE */}
                  <div className="w-full md:w-40 h-40 rounded-2xl overflow-hidden">
                    <img
                      src={import.meta.env.VITE_BACKEND_HOST + "/images/" + item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 flex flex-col justify-between">

                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {item.title}
                        </h3>

                        <p className="text-[#7fad39] text-xl font-bold mt-2">
                          ${item.price}.00
                        </p>
                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() => addToCart("delete", item)}
                        className="w-11 h-11 rounded-xl border hover:bg-red-50 hover:border-red-200 transition flex items-center justify-center text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center justify-between mt-6">

                      <div className="flex items-center border rounded-2xl overflow-hidden">
                        <button
                          onClick={() => addToCart("decrement", item)}
                          className="px-5 py-4 hover:bg-gray-100 transition"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="px-6 font-semibold text-lg">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => addToCart("increment", item)}
                          className="px-5 py-4 hover:bg-gray-100 transition"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* TOTAL */}
                      <h4 className="text-2xl font-bold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div>
              <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-10">

                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  Cart Summary
                </h2>

                {/* Coupon */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Promo Code
                  </label>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-[#7fad39]"
                    />

                    <button className="bg-[#7fad39] hover:bg-[#6f9d32] transition text-white px-5 rounded-2xl font-semibold">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-5 border-t border-b py-6">

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-lg">
                      Subtotal
                    </span>

                    <span className="font-bold text-gray-800 text-lg">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-lg">
                      Shipping
                    </span>

                    <span className="font-bold text-gray-800 text-lg">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">
                      Total
                    </span>

                    <span className="text-3xl font-extrabold text-[#7fad39]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout */}
                <button onClick={handleCheckout} className="w-full mt-8 bg-[#7fad39] hover:bg-[#6f9d32] transition text-white py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3">
                  Proceed To Checkout
                  <ArrowRight size={20} />
                </button>

                {/* Continue Shopping */}
                <button className="w-full mt-4 border border-gray-300 hover:bg-gray-100 transition py-5 rounded-2xl font-semibold text-gray-700">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;