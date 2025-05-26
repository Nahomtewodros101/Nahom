"use client";

import { useEffect, useRef, useState } from "react";

import {
  Code,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  User,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { ThemeProvider } from "../components/theme-provider";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
const isBrowser = typeof window !== "undefined";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const sections: Array<keyof typeof sectionRefs> = [
    "home",
    "about",
    "projects",
    "testimonials",
    "cv",
    "skills",
  ];

  const sectionRefs: Record<
    "home" | "about" | "projects" | "testimonials" | "cv" | "skills",
    React.MutableRefObject<HTMLDivElement | null>
  > = {
    home: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    testimonials: useRef(null),
    cv: useRef(null),
    skills: useRef(null),
  };

  useEffect(() => {
    if (!isBrowser) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = sectionRefs[section].current;
        if (!element) continue;

        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs, sections]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-black text-white">
        <Header
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sectionRefs={sectionRefs}
          sections={sections}
        />

        <main className="container mx-auto px-4 pt-20">
          <Hero ref={sectionRefs.home} />
          <About ref={sectionRefs.about} />
          <Projects ref={sectionRefs.projects} />
          <Testimonials ref={sectionRefs.testimonials} />
          <CV ref={sectionRefs.cv} />
          <Skills ref={sectionRefs.skills} />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

interface HeaderProps {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  sectionRefs: Record<string, React.MutableRefObject<HTMLDivElement | null>>;
  sections: string[];
}

const Header = ({
  activeSection,
  setActiveSection,
  sectionRefs,
  sections,
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section: (typeof sections)[number]) => {
    setActiveSection(section);
    const ref = sectionRefs[section].current;
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold bg-clip-text text-transparent bg-white"
          whileHover={{ scale: 1.05 }}
        >
          Nahom
        </motion.div>

        <nav className="hidden md:flex space-x-6">
          {sections.map((section) => (
            <motion.button
              key={section}
              className={`capitalize ${
                activeSection === section
                  ? "text-purple-400 font-medium"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => scrollToSection(section)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {section}
            </motion.button>
          ))}
        </nav>

        <motion.div
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex items-center space-x-2 bg-white hover:bg-white/80 px-4 py-2 rounded-full text-sm font-bold  shadow-lg cursor-pointer transition duration-300"
        >
          <Link
            href="/contact"
            className="flex items-center space-x-2 text-black"
          >
            <span>Contact</span>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};

interface HeroProps {
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

const Hero = ({ ref }: HeroProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full w-[500px] h-[500px] bg-purple-600/20 blur-[100px]"
          style={{
            left: `${cursorPosition.x / 10}px`,
            top: `${cursorPosition.y / 10}px`,
          }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.div
              className="text-gray-700 font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I am
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="bg-clip-text text-transparent bg-white">
                Nahom Tewodros
              </span>
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl text-gray-700 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Full Stack Developer
            </motion.h2>
          </div>
          <hr className="border-gray-700" />
          <motion.p
            className="text-gray-400 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            I create
            <span className="text-purple-600 pl-1">
              Stunning digital experiences with modern tech.
            </span>
            <br />
            Specializing in building exceptional websites, applications, and
            everything in between.
          </motion.p>
          <Link href="/contact">
          <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-all">
           contact me!
          </Button>
        </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <HeroAnimation />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-8 h-12 border-2 border-purple-400 rounded-full flex justify-center p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <motion.div className="w-1 h-3 bg-purple-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const HeroAnimation = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <svg viewBox="0 0 500 500" className="w-full h-full">
        <motion.circle
          cx="250"
          cy="250"
          r="100"
          fill="none"
          stroke="rgba(147, 51, 234, 0.5)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <motion.circle
          cx="250"
          cy="250"
          r="150"
          fill="none"
          stroke="rgba(147, 51, 234, 0.3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />

        <motion.circle
          cx="250"
          cy="250"
          r="200"
          fill="none"
          stroke="rgba(147, 51, 234, 0.1)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
        />

        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={i}
            cx="250"
            cy="250"
            r="5"
            fill="#a855f7"
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{
              x: 150 * Math.cos(i * (Math.PI / 6)),
              y: 150 * Math.sin(i * (Math.PI / 6)),
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 1.5 + i * 0.1,
              ease: "easeOut",
            }}
          />
        ))}

        <motion.circle
          cx="250"
          cy="250"
          r="80"
          fill="url(#gradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <defs>
          <radialGradient
            id="gradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6b21a8" />
          </radialGradient>
        </defs>
      </svg>

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Image
          src="/numa.jpg"
          alt="Profile"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

interface AboutProps {
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

interface AboutProps {
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

interface AboutProps {
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

interface Certification {
  title: string;
  platform: string;
  description: string;
  link: string;
}

const About = ({ ref }: AboutProps) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  const certifications: Certification[] = [
    {
      title: "Introduction to Programming using Javascript",
      platform: "Udemy",
      description:
        "Acquired foundational knowledge in programming using JavaScript, enabling me to apply efficient, scalable, and problem-solving skills.",
      link: "https://www.udacity.com/certificate/e/5fc6d9ec-5829-11ef-b982-8b31cba2558f",
    },
    {
      title: "Introduction to Programming using Typescript",
      platform: "Udemy",
      description:
        "Acquired foundational knowledge in programming using Typescript, enabling me to apply efficient, scalable, and problem-solving skills.",
      link: "https://certificates.simplicdn.net/share/8124837_65976871743515680488.pdf",
    },
    {
      title: "Frontend Development Bootcamp",
      platform: "FreeCodeCamp",
      description:
        "Proficient in HTML, CSS, and JavaScript, enabling me to build dynamic and user-friendly web interfaces.",
      link: "https://freecodecamp.org/certification/Nahom1o1/front-end-development-libraries",
    },
    {
      title: "MERN Stack Development",
      platform: "Simplilearn",
      description:
        "Mastered MongoDB, Express, React, and Node.js for full-stack development, creating scalable applications.",
      link: "https://certificates.simplicdn.net/share/8020450_64390131741574352002.pdf",
    },
    {
      title: "MEAN Stack Development",
      platform: "Simplilearn",
      description:
        "Mastered MongoDB, Express, Angular, and Node.js for full-stack development, creating scalable applications.",
      link: "https://certificates.simplicdn.net/share/8125290_65976871743584465606.pdf",
    },
    {
      title: "Backend Web Development Bootcamp",
      platform: "FreeCodeCamp",
      description:
        "Mastered the fundamentals of backend development with hands-on projects covering modern frameworks and databases.",
      link: "https://freecodecamp.org/certification/Nahom1o1/back-end-development-and-apis",
    },
    {
      title: "Responsive and Adaptive Web Design",
      platform: "FreeCodeCamp",
      description:
        "Designed responsive web pages that adapt beautifully across devices using HTML5, CSS3, and media queries.",
      link: "https://freecodecamp.org/certification/Nahom1o1/responsive-web-design",
    },
    {
      title: "Data Science and Visualization",
      platform: "Udemy",
      description:
        "Leveraged data analysis, visualization, and machine learning tools to extract insights and create compelling reports.",
      link: "https://www.udacity.com/certificate/e/8f5f7320-6496-11ef-8dcb-e3d05c10daca",
    },
    {
      title: "Intro to AI & Tools",
      platform: "Udemy",
      description:
        "Gained a foundational understanding of artificial intelligence and its tools, building blocks, and applications.",
      link: "https://www.udacity.com/certificate/e/81492622-9b8d-11ef-9d9b-13b09807cbc9",
    },
  ];

  const hobbies = [
    { name: "Tech", icon: "💻" },
    { name: "Hiking", icon: "🥾" },
    { name: "Chess", icon: "♟️" },
    { name: "Games", icon: "🎮" },
    { name: "Coffee", icon: "☕" },
    { name: "Music", icon: "🎵" },
  ];

  return (
    <motion.section
      ref={ref}
      className="py-20 min-h-screen flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <motion.h2
            className="text-3xl md:text-5xl font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            About <span className="text-purple-400">Me</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-purple-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-extrabold text-purple-400">
              Who am I?
            </h3>
            <p className="text-gray-300 leading-relaxed">
              I specialize in building modern web applications using React,
              Next.js, Node.js, and various other technologies. I am constantly
              learning and exploring new tools to stay at the cutting edge of
              web development. I am a passionate Full Stack Developer with over
              2 years of experience crafting digital experiences that users
              love.
            </p>
            <br />
            <p className="text-xl font-semibold">
              {" "}
              <span className="text-purple-400 font-extrabold text-3xl">
                Coding
              </span>{" "}
              Saves Lives <span className="text-purple-400">!</span>
            </p>
            <p className="text-gray-300 leading-relaxed">
              My journey in tech started when I met my current colleges |
              Executives at my lowest possible level in life and they introduced
              me into programming. been hooked ever since and cant literally
              stop learning and evolving my tech skills and my life for the
              better.
            </p>
            <h1 className="text-2xl font-extrabold text-purple-400">
              A Little Get To Know Me
            </h1>
            <p className="text-gray-300 leading-relaxed">
              When I am not coding, you can find me exploring nature, taking
              photographs, or enjoying a good book. I believe in the power of
              technology to transform lives and am committed to using my skills
              to make a positive impact.
            </p>

            <motion.div
              className="grid grid-cols-2 gap-4 pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <h4 className="text-lg font-medium text-purple-300">Name</h4>
                <p className="text-gray-400">Nahom Tewodros</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-purple-300">Email:</h4>
                <p className="text-gray-400">nahomtewodrosm@gmail.com</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-purple-300">From:</h4>
                <p className="text-gray-400">Gerji, Addis Ababa</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-purple-300">
                  Experience:
                </h4>
                <p className="text-gray-400">2+ Years</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 p-6 rounded-xl border border-purple-900/50"
            >
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-900/30 rounded-lg">
                        <Code size={18} className="text-purple-400" />
                      </div>
                      <motion.a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-purple-400 hover:underline transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {cert.title}
                      </motion.a>
                    </div>
                    <span className="text-sm text-purple-400">
                      {cert.platform}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900/50 p-6 rounded-xl border border-purple-900/50"
            >
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                Hobbies & Interests
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {hobbies.map((hobby, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="text-2xl">{hobby.icon}</div>
                    <span className="text-gray-300">{hobby.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string; // Added for live site or demo
  githubLink: string; // Added for GitHub repo
}

interface ProjectsProps {
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

const Projects = ({ ref }: ProjectsProps) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  const projects: Project[] = [
    {
      title: "Shoe Shop",
      description:
        "An e-commerce platform for premium footwear with seamless shopping experience.",
      image: "/chamaa.png",
      tech: ["Next.js", "Zustand", "Typescript", "Tailwind CSS", "shadCn ui"],
      link: "https://chama-git-main-nahoms-projects-356562bd.vercel.app/",
      githubLink: "https://github.com/Nahomtewodros101/Chama.git",
    },
    {
      title: "Lead Generation Website",
      description:
        "A conversion-focused website designed to capture and nurture potential customer leads.",
      image: "/leadgen.png",
      tech: ["Next.js", "Tailwind CSS", "Shadcn ui", "Typescript"],
      link: "https://leadgeneth.vercel.app/",
      githubLink: "https://github.com/Nahomtewodros101/leadgeneth.git",
    },

    {
      title: "RiseUp , A Qemem devs portfolio ",
      description:
        "The project i landed a job at qemem devs and a stunning web app to add to the skill set of mine .",
      image: "/riseup.png",
      tech: [
        "Next.js",
        "Tailwind CSS",
        "Shadcn ui",
        "Typescript",
        "Mongodb",
        "vercel",
        "Prisma",
      ],
      link: "https://rise-up-chi.vercel.app/",
      githubLink: "https://github.com/Nahomtewodros101/RiseUp.git",
    },
    {
      title: "Shopendaw ",
      description:
        "A modern e-commerce platform for premium clothing with seamless shopping experience.",
      image: "/shop.jpg",
      tech: [
        "Next.js",
        "Tailwind CSS",
        "Shadcn ui",
        "Typescript",
        "Mongodb",
        "vercel",
        "Prisma",
      ],
      link: "https://shopendaw.vercel.app/",
      githubLink: "https://github.com/Nahomtewodros101/shopendaw.git",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="py-20 min-h-screen flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <motion.h2
            className="text-3xl md:text-5xl font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My <span className="text-purple-400">Projects</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-purple-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="max-w-2xl text-xl mx-auto text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Here are some of my recent projects that showcase my skills and
            expertise.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-gray-900/50 rounded-xl overflow-hidden border border-purple-900/50 hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="relative overflow-hidden h-48">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <div className="flex space-x-3">
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-purple-600 rounded-full text-white"
              whileHover={{ y: -5 }}
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-purple-600 rounded-full text-white"
              whileHover={{ y: -5 }}
            >
              <ExternalLink size={18} />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold text-purple-300 hover:text-purple-400 hover:underline transition-colors group-hover:text-purple-400 group-hover:underline"
          whileHover={{ scale: 1.05 }}
        >
          {project.title}
        </motion.a>
        <p className="text-gray-400 text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech: string, i: number) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-purple-900/30 text-purple-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface TestimonialsProps {
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

const Testimonials = ({ ref }: TestimonialsProps) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Kaleab Taye",
      position: "CEO at Qmem Devs corp.",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQHyKlvhTktW8Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1668945738081?e=1750291200&v=beta&t=ak_Vavc4zdFKwzUqAKg63drFhGmsI-qaU3IrX43qJSo",
      text: "Nahom is an exceptional developer who delivered our project ahead of schedule. His attention to detail and problem-solving skills are outstanding.",
    },
    {
      name: "Beka Dessalegn",
      position: "CTO at Qmem Devs corp.",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQFRFPP4r0AbUw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1665579224389?e=1750291200&v=beta&t=cOH2JY7FHPyajjNfkqby1jv1Qj4tIRP3eZIrfbA_7Lc",
      text: "Working with Nahom was a pleasure. He understood our requirements perfectly and implemented features that exceeded our expectations.",
    },
    {
      name: "Abenezer Wasihun",
      position: "Founder of DesignHub",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQF4T7k-fMK6tQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724874421828?e=1750291200&v=beta&t=E3yp-EtIjfsCJlzmHnkyldTOgqQwCbTfLh_XWBS9GDk",
      text: "Nahom technical expertise combined with his eye for design made him the perfect developer for our project. I highly recommend his services.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <motion.section
      ref={ref}
      className="py-20 min-h-screen flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <motion.h2
            className="text-3xl md:text-5xl font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Client <span className="text-purple-400">Testimonials</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-purple-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="max-w-2xl mx-auto text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Here is what some of my clients have to say about working with me.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/50 p-8 md:p-10 rounded-xl border border-purple-900/50"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500">
                      <Image
                        src={
                          testimonials[activeIndex].image || "/placeholder.svg"
                        }
                        alt={testimonials[activeIndex].name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 text-center md:text-left">
                    <svg
                      className="w-10 h-10 text-purple-500/30 mx-auto md:mx-0"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M10 8c-2.2 0-4 1.8-4 4v12h12V12h-6c0-2.2 1.8-4 4-4h2V0h-2C11.6 0 10 8 10 8zm16-8h-2c-4.4 0-6 8-6 8-2.2 0-4 1.8-4 4v12h12V12h-6c0-2.2 1.8-4 4-4h2V0z" />
                    </svg>

                    <p className="text-gray-300 italic leading-relaxed">
                      {testimonials[activeIndex].text}
                    </p>

                    <div>
                      <h4 className="text-lg font-semibold text-purple-400">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {testimonials[activeIndex].position}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeIndex === index ? "bg-purple-500" : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

interface CVProps {
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

const CV = ({ ref }: CVProps) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  const experience = [
    {
      position: "Junior Full Stack Developer",
      company: "QmemDevs Tech Inc.",
      period: "2021 - Present",
      description:
        "Led development of multiple web applications using React, Node.js, and AWS. Implemented CI/CD pipelines and mentored junior developers.",
    },
    {
      position: "Web Developer intern",
      company: "Truest Tech Agency",
      period: "2020 - 20",
      description:
        "Built and maintained websites for various clients using JavaScript, HTML, and CSS. Implemented SEO best practices.",
    },
  ];

  const education = [
    {
      degree: "Bsc in Computer Science",
      institution: "Unity University",
      period: "2021 - 2025",
      description:
        "Learned web development using JavaScript, HTML, and CSS. Participated in coding competitions Lab Projects .",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="py-20 min-h-screen flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <motion.h2
            className="text-3xl md:text-5xl font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My <span className="text-purple-400">Resume</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-purple-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
            >
              <a
                href="/nahom.pdf"
                download="Nahom.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} />
                Download CV
              </a>
            </Button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <motion.h3
              className="text-2xl font-semibold flex items-center gap-2 text-purple-400"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <User size={20} />
              Work Experience
            </motion.h3>

            <div className="space-y-6 relative">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-purple-900/50" />

              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-purple-900 border-2 border-purple-500 z-10" />

                  <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-900/50 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
                      <h4 className="text-lg font-medium text-white">
                        {item.position}
                      </h4>
                      <span className="text-sm px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 w-fit">
                        {item.period}
                      </span>
                    </div>
                    <h5 className="text-purple-400 mb-3">{item.company}</h5>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <motion.h3
              className="text-2xl font-semibold flex items-center gap-2 text-purple-400"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <User size={20} />
              Education
            </motion.h3>

            <div className="space-y-6 relative">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-purple-900/50" />

              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-purple-900 border-2 border-purple-500 z-10" />

                  <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-900/50 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
                      <h4 className="text-lg font-medium text-white">
                        {item.degree}
                      </h4>
                      <span className="text-sm px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 w-fit">
                        {item.period}
                      </span>
                    </div>
                    <h5 className="text-purple-400 mb-3">{item.institution}</h5>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

interface Skill {
  name: string;
  percentage: number;
}

interface SkillsProps {
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

const Skills = ({ ref }: SkillsProps) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  const technicalSkills: Skill[] = [
    { name: "JavaScript", percentage: 95 },
    { name: "React", percentage: 90 },
    { name: "Node.js", percentage: 85 },
    { name: "TypeScript", percentage: 80 },
    { name: "Next.js", percentage: 90 },
    { name: "HTML/CSS", percentage: 95 },
  ];

  const softSkills: Skill[] = [
    { name: "Problem Solving", percentage: 90 },
    { name: "Communication", percentage: 85 },
    { name: "Teamwork", percentage: 90 },
    { name: "Time Management", percentage: 80 },
  ];

  return (
    <motion.section
      ref={ref}
      className="py-20 min-h-screen flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <motion.h2
            className="text-3xl md:text-5xl font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My <span className="text-purple-400">Skills</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-purple-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="max-w-2xl mx-auto text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Here are my technical and soft skills that I have developed over the
            years.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-purple-400">
              Technical Skills
            </h3>

            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-purple-400">
              Soft Skills
            </h3>

            <div className="space-y-6">
              {softSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

interface SkillBarProps {
  skill: Skill;
  index: number;
}

const SkillBar = ({ skill, index }: SkillBarProps) => {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-gray-300">{skill.name}</h4>
        <span className="text-purple-400">{skill.percentage}%</span>
      </div>

      <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
        />
      </div>
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-300 mb-4 md:mb-0">
            Nahom.T
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <motion.a
              href="https://github.com/Nahomtewodros101"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              whileHover={{ y: -5 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/nahom-tewodros/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              whileHover={{ y: -5 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:nahomtewodrosm@gmail.com"
              className="text-gray-400 hover:text-white"
              whileHover={{ y: -5 }}
            >
              <Mail size={20} />
            </motion.a>
          </div>

          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Nahom Tewodros&copy;. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
