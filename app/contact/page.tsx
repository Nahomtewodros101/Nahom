"use client";

import { motion } from "framer-motion";
import { useState, ChangeEvent, FormEvent } from "react";
import { SendHorizontal, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [thankYou, setThankYou] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setThankYou(true);
    setForm({ name: "", email: "", message: "" });

    // Redirect to home after 2.5 seconds to show message
    setTimeout(() => router.push("/"), 2500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-black text-purple-100 relative">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 bg-purple-800 hover:bg-purple-700 text-sm px-4 py-2 rounded-lg shadow-md transition-all"
      >
        <ArrowLeft size={16} />
        Back to Home
      </button>

      <div className="relative container max-w-4xl bg-purple-900 shadow-xl rounded-xl p-10 overflow-hidden animate-fade-in-up">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-gradient-to-br from-purple-500 via-purple-700 to-black blur-3xl opacity-30 rounded-full z-0"
        />

        <h2 className="text-3xl font-bold z-10 relative text-purple-100 mb-6">
          Let’s Connect
        </h2>
        <p className="text-purple-300 mb-8 z-10 relative">
          Drop a message below and I will get to you back soon 💬
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 z-10 relative">
          <div>
            <label className="block mb-1 text-sm font-medium text-purple-200">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-purple-800 text-purple-100 border border-purple-600 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-purple-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-purple-800 text-purple-100 border border-purple-600 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-purple-200">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-purple-800 text-purple-100 border border-purple-600 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-all resize-none"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-purple-600 hover:shadow-lg transition-all"
          >
            Send Message <SendHorizontal size={18} />
          </motion.button>
        </form>

        {thankYou && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-black font-extrabold  z-10 relative text-center"
          >
            Thank you! I’ll get back to you soon 🚀
          </motion.p>
        )}
      </div>
    </section>
  );
}
