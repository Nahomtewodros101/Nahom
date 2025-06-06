"use client";

import type React from "react";
import { useState, useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  HTMLMotionProps,
} from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle,
  Loader2,
  Signal,
  Battery,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from "next/dynamic";
import Link from "next/link";

const MapWithNoSSR = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("success");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-black text-white">
        <ContactHero />

        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-16 ">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Get in <span className="text-purple-400">Touch</span>
                </h2>
                <p className="text-gray-400 max-w-md">
                  I am always open to new opportunities and collaborations. Feel
                  free to reach out if you have a question or just want to say
                  hi!
                </p>
              </div>

              <div className="space-y-6">
                <ContactInfoItem
                  icon={<MapPin />}
                  title="Location"
                  content="Addis Ababa, Ethiopia"
                  delay={0.4}
                />
                <ContactInfoItem
                  icon={<Phone />}
                  title="Phone"
                  content="+251 930902116"
                  delay={0.5}
                />
                <ContactInfoItem
                  icon={<Mail />}
                  title="Email"
                  content="nahomtewodrosm@gmail.com"
                  delay={0.6}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-400">
                  Connect with me
                </h3>
                <div className="flex space-x-4">
                  <SocialIcon
                    icon={<Github />}
                    href="https://github.com/Nahomtewodros101"
                    delay={0.7}
                  />
                  <SocialIcon
                    icon={<Linkedin />}
                    href="https://www.linkedin.com/in/nahom-tewodros/"
                    delay={0.8}
                  />
                  <SocialIcon
                    icon={<Twitter />}
                    href="https://x.com/NahomTewodros5"
                    delay={0.9}
                  />
                  <SocialIcon
                    icon={<Instagram />}
                    href="https://instagram.com/nahom1o1"
                    delay={1.0}
                  />
                </div>
              </div>
            </motion.div>

            {/* iPhone Frame Wrapper */}
            <div ref={formRef} className="relative flex justify-center">
              <div className="relative w-[320px] h-[640px] bg-black rounded-[40px] border-4 border-gray-800 shadow-xl overflow-hidden">
                {/* iPhone Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-black flex justify-between items-center px-4 text-white text-xs">
                  <div className="flex items-center gap-1">
                    <span>9:41</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Signal size={12} className="text-white" />
                    <Wifi size={12} className="text-white" />
                    <Battery size={12} className="text-white" />
                  </div>
                </div>

                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl"></div>

                {/* Form Content */}
                <div className="h-full pt-12 pb-8 px-4 overflow-y-auto bg-gray-900">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 space-y-4"
                  >
                    <h2 className="text-xl font-bold text-white text-center">
                      Send me a message
                    </h2>

                    <AnimatePresence mode="wait">
                      {formStatus === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-6 text-center space-y-4"
                        >
                          <div className="flex justify-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 10,
                              }}
                            >
                              <CheckCircle
                                size={40}
                                className="text-purple-400"
                              />
                            </motion.div>
                          </div>
                          <h3 className="text-lg font-semibold text-purple-300">
                            Message Sent!
                          </h3>
                          <p className="text-gray-300 text-sm">
                            Thank you for reaching out. I will get back to you
                            soon.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          onSubmit={handleSubmit}
                          className="space-y-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <AnimatedInput
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            delay={0.1}
                          />
                          <AnimatedInput
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            delay={0.2}
                          />
                          <AnimatedInput
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formState.subject}
                            onChange={handleChange}
                            required
                            delay={0.3}
                          />
                          <div className="relative">
                            <motion.textarea
                              name="message"
                              placeholder="Your Message"
                              value={formState.message}
                              onChange={handleChange}
                              required
                              rows={4}
                              className="w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-lg p-3 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                            />
                            <motion.div
                              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400"
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                              viewport={{ once: true }}
                            />
                          </div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            <Button
                              type="submit"
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                              disabled={formStatus === "submitting"}
                            >
                              {formStatus === "submitting" ? (
                                <>
                                  <Loader2 className="animate-spin" size={16} />
                                  <span>Sending...</span>
                                </>
                              ) : (
                                <>
                                  <Send size={16} />
                                  <span>Send Message</span>
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </motion.form>
                      )}
                    </AnimatePresence>

                    {/* Social Icons at the Bottom */}
                    <motion.div
                      className="flex justify-center space-x-4 mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <SocialIcon
                        icon={<Github size={20} />}
                        href="https://github.com/Nahomtewodros101"
                        delay={0.7}
                      />
                      <SocialIcon
                        icon={<Linkedin size={20} />}
                        href="https://www.linkedin.com/in/nahom-tewodros/"
                        delay={0.8}
                      />
                      <SocialIcon
                        icon={<Twitter size={20} />}
                        href="https://x.com/NahomTewodros5"
                        delay={0.9}
                      />
                      <SocialIcon
                        icon={<Instagram size={20} />}
                        href="https://instagram.com/nahom1o1"
                        delay={1.0}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* iPhone Home Bar */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <MapSection />
      </div>
    </ThemeProvider>
  );
}

const ContactHero = () => {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-600/20"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: Math.random() * 0.8 + 0.2,
                opacity: Math.random() * 0.3 + 0.1,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Let us <span className="text-purple-400">Connect</span>
        </motion.h1>
        <motion.div
          className="h-1 w-20 bg-purple-500 mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
        <motion.p
          className="text-gray-300 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Have a project in mind or want to explore opportunities? I would love
          to hear from you.
        </motion.p>
        <Link href="/">
          <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-all">
            Back to Home
          </Button>
        </Link>
      </div>
    </section>
  );
};

interface AnimatedInputProps extends HTMLMotionProps<"input"> {
  delay?: number;
}

const AnimatedInput = ({ delay = 0, ...props }: AnimatedInputProps) => {
  return (
    <div className="relative">
      <motion.input
        {...props}
        className="w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-lg p-3 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1.5, delay: delay + 0.2 }}
        viewport={{ once: true }}
      />
    </div>
  );
};

const ContactInfoItem = ({
  icon,
  title,
  content,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  delay?: number;
}) => {
  return (
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-3 bg-purple-900/30 rounded-lg text-purple-400">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-gray-400">{content}</p>
      </div>
    </motion.div>
  );
};

const SocialIcon = ({
  icon,
  href,
  delay = 0,
}: {
  icon: React.ReactNode;
  href: string;
  delay?: number;
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-purple-900 transition-colors"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {icon}
    </motion.a>
  );
};

const MapSection = () => {
  return (
    <section className="relative py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find{" "}
            <span className="text-purple-600 dark:text-purple-400">Me</span>
          </h2>
          <p className="text-white dark:text-gray-400 max-w-2xl mx-auto">
            Located in the heart of Addis Ababa, my office is easily accessible
            and I am always happy to schedule in-person meetings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="bg-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Office Address</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-purple-500 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Main Office</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Bole Sub City, Addis Ababa
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">Ethiopia</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-purple-500 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Saturday: By appointment
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-purple-500 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Phone: +251 930902116
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Email: nahomtewodrosm@gmail.com
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Transportation</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-purple-900 text-black dark:text-purple-300 rounded-full mr-3 text-xs">
                    P
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Parking available on premises
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-purple-900 text-black dark:text-purple-300 rounded-full mr-3 text-xs">
                    B
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Bus stop within 100m
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-purple-900 text-black dark:text-purple-300 rounded-full mr-3 text-xs">
                    T
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Taxi service readily available
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <MapWithNoSSR />
          </div>
        </div>
      </div>
    </section>
  );
};
