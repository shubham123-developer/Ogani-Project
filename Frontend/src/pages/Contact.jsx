import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";

import { toast } from "react-toastify";
const Contact = () => {
  const [isSendingMail, setIsSendingMail] = useState(false);

  async function sendContactMsg(data) {
    try {

      setIsSendingMail(true);

      const response = await fetch(import.meta.env.VITE_BACKEND_HOST+"/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" }
      });


      if (!response.ok) {
        return toast.error("Could not process your request at the moment!", { position: "bottom-center", autoClose: 5000 });
      }

      toast.success("Email Sent!", { position: "bottom-center", autoClose: 2000 })

    } catch (error) {
      toast.error("Something went wrong!", { position: "bottom-center", autoClose: 5000 });
    } finally {
      setIsSendingMail(false);
    }
  }


  async function submitHandler(e) {
    try {
      e.preventDefault();

      if (isSendingMail) return;

      const data = {
        fullname: e.target.fullname.value,
        subject: e.target.subject.value,
        email: e.target.email.value,
        message: e.target.message.value
      };
      await sendContactMsg(data);

    } catch (error) {
      toast.error("Something went wrong!!!");
      console.log(error);
    }finally{
      const form = e.target;
      form.fullname.value = "";
      form.email.value = "";
      form.message.value = "";
      form.subject.value = "";

    }


  }


  return (
    <div className="min-h-screen bg-[#f5f5f5]">

      {/* HERO */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="uppercase tracking-[4px] text-[#7fad39] font-bold mb-4">
            Contact Us
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
            Get In Touch
          </h1>

          <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
            We'd love to hear from you. Reach out for any questions,
            feedback, or support regarding our organic products.
          </p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card */}
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition">
            <div className="w-16 h-16 bg-[#7fad39]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <MapPin size={28} className="text-[#7fad39]" />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Address
            </h3>

            <p className="text-gray-500 leading-relaxed">
              123 Organic Street,
              <br />
              New York, USA
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition">
            <div className="w-16 h-16 bg-[#7fad39]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Phone size={28} className="text-[#7fad39]" />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Phone
            </h3>

            <p className="text-gray-500 leading-relaxed">
              +1 234 567 890
              <br />
              +1 987 654 321
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition">
            <div className="w-16 h-16 bg-[#7fad39]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Mail size={28} className="text-[#7fad39]" />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Email
            </h3>

            <p className="text-gray-500 leading-relaxed">
              support@ogani.com
              <br />
              info@ogani.com
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition">
            <div className="w-16 h-16 bg-[#7fad39]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Clock size={28} className="text-[#7fad39]" />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Working Hours
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Mon - Fri: 9AM - 6PM
              <br />
              Sat - Sun: Closed
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="bg-white rounded-3xl p-10 shadow-sm">
            <p className="uppercase tracking-[4px] text-[#7fad39] font-bold mb-3">
              Send Message
            </p>

            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              We'd Love To Hear From You
            </h2>

            <p className="text-gray-500 leading-relaxed mb-8">
              Fill out the form and our team will get back to you
              within 24 hours.
            </p>

            <form onSubmit={submitHandler} className="space-y-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  name="fullname"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#7fad39] transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#7fad39] transition"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  name="subject"
                  type="text"
                  placeholder="Enter subject"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#7fad39] transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  rows="5"
                  name="message"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#7fad39] transition resize-none"
                ></textarea>
              </div>

              {/* Button */}
              <button

                type="submit"
                className="bg-[#7fad39] hover:bg-[#6e9e33] transition text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3"
              >
                <Send size={18} />
                {isSendingMail ? "Sending ..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* RIGHT */}
          <div className="rounded-3xl overflow-hidden shadow-sm h-[700px]">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.815856936728!2d-73.98930868459384!3d40.74189527932853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18f6e9b9%3A0x5e8e1e7e736d9193!2sNew%20York!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;