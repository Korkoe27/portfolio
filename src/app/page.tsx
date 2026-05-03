"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTheme } from "next-themes";

/* Hydration-safe mounted detection */
const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
import {
  Download,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
  ArrowUp,
  Code2,
  Server,
  Globe,
  ChevronRight,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

/* ──────────── Data ──────────── */

const NAV_ITEMS = [
  { label: "Home", href: "#home", num: "00" },
  { label: "About", href: "#about", num: "01" },
  { label: "Projects", href: "#projects", num: "02" },
  { label: "Contact", href: "#contact", num: "03" },
];

const SKILLS = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "PHP",
  "Laravel",
  "MySQL",
  "Tailwind CSS",
  "Livewire",
  "AWS",
  "Git/GitHub",
  "WebSockets",
];

const EXPERIENCES = [
  {
    role: "Software Engineer",
    company: "PaySwitch Com. Ltd",
    location: "Accra",
    period: "Oct 2024 – Present",
    descriptions: [
      "Developed a Laravel and Next.js web application that evolved from a visitor management system into the company's primary HRM platform, implementing real-time sign-in monitoring using WebSockets.",
      "Served as Principal Web Developer responsible for developing and maintaining the company's main static websites to ensure performance, reliability, and brand consistency.",
      "Provided Integration Support for clients and developers integrating with TheTeller Payment API, resolving technical issues related to API usage and transaction flows.",
      "Led and mentored interns and NSS personnel, delivering hands-on training in web development technologies and best practices.",
    ],
    tags: ["Laravel", "Next.js", "WebSockets", "PHP"],
  },
  {
    role: "Front-End Engineer",
    company: "Dept. of Optometry, UCC",
    location: "Cape Coast",
    period: "Apr 2024 – Oct 2024",
    descriptions: [
      "Developed the UI for a Patient Information Management System and Electronic Health Record for the department's eye clinic using ReactJS for a Django app.",
      "Redesigned the Diagnostic Visual Function Research Lab website using Next.js.",
    ],
    tags: ["React", "Next.js", "Django", "Healthcare"],
  },
  {
    role: "Software Engineer",
    company: "Ghana Armed Forces HQ",
    location: "Accra",
    period: "Sep 2023 – Dec 2023",
    descriptions: [
      "Developed a web app to manage personal and medical records of Cadets at the Ghana Military Academy Infirmary using Laravel, PHP, and JavaScript.",
      "Tutored colleague interns in web development with HTML, CSS, JavaScript, and PHP.",
    ],
    tags: ["Laravel", "PHP", "JavaScript", "MySQL"],
  },
  {
    role: "Software Engineer",
    company: "BlueSPACE Africa",
    location: "Accra",
    period: "Nov 2022 – Jan 2023",
    descriptions: [
      "Gathered comprehensive data on car makes and models to support the creation of an API.",
      "Tested MTN USSD and web app functionality for purchasing and renewing insurance policies.",
      "Researched FAQs for the creation of an auto insurance WhatsApp bot.",
    ],
    tags: ["API", "USSD", "QA Testing", "WhatsApp Bot"],
  },
  {
    role: "Software Engineer",
    company: "Ghana Armed Forces HQ",
    location: "Accra",
    period: "Jun 2022 – Aug 2022",
    descriptions: [
      "Built an inventory web app using PHP, Laravel, and MySQL to track store stocks.",
      "Collaborated on redesigning the Ghana Military Academy website using HTML, CSS, Bulma, JavaScript, and Figma.",
    ],
    tags: ["PHP", "Laravel", "MySQL", "Figma"],
  },
];

const PROJECTS = [
  {
    title: "HRM Platform — PaySwitch",
    description:
      "A full-stack HRM platform evolved from a visitor management system, featuring real-time sign-in monitoring for visitors and employees using WebSockets. Built with Laravel and Next.js.",
    tags: ["Laravel", "Next.js", "WebSockets"],
    icon: Server,
    color: "text-emerald-500",
  },
  {
    title: "Patient Info System — UCC Eye Clinic",
    description:
      "Patient Information Management System and Electronic Health Record for the University of Cape Coast's eye clinic, built with ReactJS integrated with a Django backend.",
    tags: ["React", "Django", "Healthcare"],
    icon: Globe,
    color: "text-teal-500",
  },
  {
    title: "Cadet Medical Records — GMA Infirmary",
    description:
      "Web application for managing personal and medical records of cadets at the Ghana Military Academy Infirmary, built with Laravel, PHP, and JavaScript.",
    tags: ["Laravel", "PHP", "JavaScript"],
    icon: Code2,
    color: "text-cyan-500",
  },
  {
    title: "Insurance Platform — BlueSPACE Africa",
    description:
      "Contributed to API development for auto insurance, tested MTN USSD and web apps for insurance policy purchases, and supported a WhatsApp bot for auto insurance.",
    tags: ["API", "USSD", "QA"],
    icon: Sparkles,
    color: "text-amber-500",
  },
  {
    title: "Inventory System — Ghana Armed Forces",
    description:
      "Inventory management web application built with PHP, Laravel, and MySQL to track store stocks. Also redesigned the Ghana Military Academy website.",
    tags: ["PHP", "Laravel", "MySQL"],
    icon: Server,
    color: "text-rose-500",
  },
];

const CERTIFICATIONS = [
  "AWS Certified Cloud Practitioner",
  "Certified in Cybersecurity (CC)",
];

/* ──────────── Animated Section Wrapper ──────────── */

function AnimatedSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

/* ──────────── Navigation ──────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between h-16 md:h-20">
          <a
            href="#home"
            className="text-lg font-bold text-accent-brand hover:text-accent-brand/80 transition-colors"
          >
            korkoe.
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="font-mono text-xs text-accent-brand">
                  {item.num}.
                </span>
                <span className="group-hover:text-foreground transition-colors">
                  {item.label}
                </span>
              </a>
            ))}
            <a href="/Korkoe_Dumashie_Resume.pdf" download>
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1.5 border-accent-brand/40 text-accent-brand hover:bg-accent-brand hover:text-accent-brand-foreground"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </Button>
            </a>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center gap-8"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-center group"
                >
                  <span className="block text-accent-brand font-mono text-sm mb-1">
                    {item.num}.
                  </span>
                  <span className="text-2xl font-semibold text-foreground group-hover:text-accent-brand transition-colors">
                    {item.label}
                  </span>
                </a>
              ))}
              <a
                href="/Korkoe_Dumashie_Resume.pdf"
                download
                onClick={() => setMobileOpen(false)}
              >
                <Button
                  variant="outline"
                  className="mt-4 gap-2 border-accent-brand/40 text-accent-brand hover:bg-accent-brand hover:text-accent-brand-foreground"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </Button>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ──────────── Hero Section ──────────── */

function HeroSection() {
  const { theme } = useTheme();
  const mounted = useMounted();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 pb-16 md:pb-24"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 w-full">
        {/* Mobile layout: inspired by the reference image */}
        <div className="flex flex-col items-center text-center gap-6 md:hidden">
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge
              variant="outline"
              className="gap-2 px-3 py-1.5 border-accent-brand/30 bg-accent-brand/5 text-accent-brand"
            >
              <span className="w-2 h-2 rounded-full bg-accent-brand animate-pulse" />
              Available for work
            </Badge>
          </motion.div>

          {/* Profile row: avatar + name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent-brand/30">
              {mounted && (
                <img
                  src={
                    theme === "dark"
                      ? "/images/avatar-dark.webp"
                      : "/images/avatar-light.webp"
                  }
                  alt="Korkoe Dumashie"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold text-foreground">
                Korkoe Dumashie
              </h2>
              <p className="text-sm text-muted-foreground">
                Software Engineer
              </p>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-2"
          >
            <p className="text-lg font-semibold text-foreground">
              Hi, I&apos;m Korkoe:
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              <span className="text-foreground">React & Laravel</span>
              <br />
              <span className="text-accent-brand">Software Engineer</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground text-base leading-relaxed max-w-sm"
          >
            I build robust web applications with React, Next.js, and Laravel —
            from payment gateways to health records systems. Based in Accra,
            Ghana.
          </motion.p>

          {/* Hero photo on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full max-w-xs rounded-2xl overflow-hidden border border-border shadow-lg mt-2"
          >
            {mounted && (
              <img
                src={
                  theme === "dark"
                    ? "/images/avatar-dark.webp"
                    : "/images/avatar-light.webp"
                }
                alt="Korkoe Dumashie"
                className="w-full aspect-square object-cover"
              />
            )}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-3 mt-2"
          >
            <a href="#contact">
              <Button className="gap-2 bg-accent-brand hover:bg-accent-brand/90 text-accent-brand-foreground">
                <Send className="w-4 h-4" />
                Get in Touch
              </Button>
            </a>
            <a href="/Korkoe_Dumashie_Resume.pdf" download>
              <Button
                variant="outline"
                className="gap-2 border-accent-brand/30 text-accent-brand hover:bg-accent-brand/10"
              >
                <Download className="w-4 h-4" />
                Resume
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Desktop layout: two-column */}
        <div className="hidden md:grid grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge
                variant="outline"
                className="gap-2 px-3 py-1.5 border-accent-brand/30 bg-accent-brand/5 text-accent-brand mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-accent-brand animate-pulse" />
                Available for work
              </Badge>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-accent-brand font-mono text-sm"
            >
              HI, MY NAME IS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
            >
              KORKOE
              <br />
              DUMASHIE.
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl lg:text-3xl font-semibold text-muted-foreground"
            >
              I build reliable web systems
              <br />
              that <span className="text-accent-brand">power businesses</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-xl"
            >
              I&apos;m a React/Laravel Software Engineer specializing in
              full-stack web development — from payment gateways and HRM
              platforms to healthcare systems. Currently building fintech
              solutions at PaySwitch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-3 pt-2"
            >
              <a href="#contact">
                <Button className="gap-2 bg-accent-brand hover:bg-accent-brand/90 text-accent-brand-foreground">
                  <Send className="w-4 h-4" />
                  Get in Touch
                </Button>
              </a>
              <a href="/Korkoe_Dumashie_Resume.pdf" download>
                <Button
                  variant="outline"
                  className="gap-2 border-accent-brand/30 text-accent-brand hover:bg-accent-brand/10"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Avatar on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-accent-brand/10 rounded-3xl rotate-3" />
              <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-2 border-accent-brand/20 shadow-2xl">
                {mounted && (
                  <img
                    src={
                      theme === "dark"
                        ? "/images/avatar-dark.webp"
                        : "/images/avatar-light.webp"
                    }
                    alt="Korkoe Dumashie"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 bg-accent-brand text-accent-brand-foreground px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg">
                React · Laravel
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────── About Section ──────────── */

function AboutSection() {
  return (
    <AnimatedSection
      id="about"
      className="py-20 md:py-28 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-accent-brand text-sm">01.</span>
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <div className="flex-1 h-px bg-border ml-4" />
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Bio */}
          <div className="md:col-span-3 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Hello! I&apos;m <strong className="text-foreground">Korkoe Anthony Kwami Dumashie</strong>, 
              a Software Engineer based in Accra, Ghana. I enjoy creating things 
              that live on the internet — whether that be websites, applications, 
              or anything in between. My goal is to always build products that 
              provide pixel-perfect, performant experiences.
            </p>
            <p>
              I specialize in the <strong className="text-foreground">React</strong> and{" "}
              <strong className="text-foreground">Laravel</strong> ecosystems, building 
              full-stack applications ranging from fintech payment systems to healthcare 
              management platforms. Currently, I&apos;m building and maintaining HRM and 
              payment solutions at{" "}
              <strong className="text-accent-brand">PaySwitch Company Ltd</strong>.
            </p>
            <p>
              I graduated with a{" "}
              <strong className="text-foreground">B.Sc. in Information Technology</strong>{" "}
              from the <strong className="text-foreground">University of Cape Coast</strong>, 
              where I studied Software Engineering, Database Management, Data Structures &amp; 
              Algorithms, and Object-Oriented Programming with Java.
            </p>
            <p>
              Beyond coding, I&apos;m passionate about mentoring — I&apos;ve led training 
              sessions for interns and National Service personnel, helping them develop 
              practical web development skills.
            </p>

            {/* Certifications */}
            <div className="pt-4">
              <h3 className="text-sm font-mono text-accent-brand mb-3">
                Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert) => (
                  <Badge
                    key={cert}
                    variant="outline"
                    className="border-accent-brand/30 text-accent-brand bg-accent-brand/5"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-mono text-accent-brand mb-4">
              Technologies I Work With
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {SKILLS.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ChevronRight className="w-3 h-3 text-accent-brand group-hover:translate-x-0.5 transition-transform" />
                  {skill}
                </div>
              ))}
            </div>

            {/* Education quick card */}
            <Card className="mt-6 bg-card/50 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-sm">B.Sc. Information Technology</p>
                <p className="text-xs text-muted-foreground">
                  University of Cape Coast • 2020 – 2024
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mt-20">
          <h3 className="text-sm font-mono text-accent-brand mb-8">
            Where I&apos;ve Worked
          </h3>
          <div className="space-y-6">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="bg-card/50 border-border hover:border-accent-brand/30 transition-colors group">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div>
                        <CardTitle className="text-base group-hover:text-accent-brand transition-colors">
                          {exp.role}
                        </CardTitle>
                        <CardDescription className="text-accent-brand text-sm font-medium">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {exp.period} • {exp.location}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1.5">
                      {exp.descriptions.map((desc, j) => (
                        <li
                          key={j}
                          className="text-sm text-muted-foreground flex gap-2"
                        >
                          <span className="text-accent-brand mt-1 shrink-0">
                            ▹
                          </span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 border-accent-brand/20 text-accent-brand"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ──────────── Projects Section ──────────── */

function ProjectsSection() {
  return (
    <AnimatedSection id="projects" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-accent-brand text-sm">02.</span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Things I&apos;ve Built
          </h2>
          <div className="flex-1 h-px bg-border ml-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border hover:border-accent-brand/30 transition-all hover:-translate-y-1 hover:shadow-lg group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Icon
                        className={`w-8 h-8 ${project.color}`}
                      />
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent-brand transition-colors" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-accent-brand transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 border-accent-brand/20 text-accent-brand"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ──────────── Contact Section ──────────── */

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");

      toast({
        title: "Message sent!",
        description:
          "Thanks for reaching out. I'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatedSection
      id="contact"
      className="py-20 md:py-28 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-accent-brand text-sm">03.</span>
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
          <div className="flex-1 h-px bg-border ml-4" />
        </div>
        <p className="text-muted-foreground mb-12 max-w-xl">
          I&apos;m currently open to new opportunities. Whether you have a
          question, a project idea, or just want to say hi — my inbox is always
          open!
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <a
              href="mailto:dumashiekorkoe@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent-brand/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-accent-brand/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent-brand" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium group-hover:text-accent-brand transition-colors">
                  dumashiekorkoe@gmail.com
                </p>
              </div>
            </a>

            <a
              href="tel:+233501093481"
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent-brand/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-accent-brand/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-accent-brand" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium group-hover:text-accent-brand transition-colors">
                  +233 50 109 3481
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-accent-brand/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent-brand" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">Accra, Ghana</p>
              </div>
            </div>

            {/* Resume download card */}
            <a
              href="/Korkoe_Dumashie_Resume.pdf"
              download
              className="flex items-center gap-4 p-4 rounded-xl bg-accent-brand/5 border-2 border-accent-brand/20 hover:border-accent-brand/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-accent-brand/10 flex items-center justify-center">
                <Download className="w-5 h-5 text-accent-brand" />
              </div>
              <div>
                <p className="text-sm font-semibold text-accent-brand group-hover:underline">
                  Download My Resume
                </p>
                <p className="text-xs text-muted-foreground">PDF • Updated 2024</p>
              </div>
            </a>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-card border-border focus:border-accent-brand"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-card border-border focus:border-accent-brand"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="bg-card border-border focus:border-accent-brand resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="w-full gap-2 bg-accent-brand hover:bg-accent-brand/90 text-accent-brand-foreground"
            >
              {sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ──────────── Footer ──────────── */

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Korkoe27"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent-brand transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/korkoedumashie/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent-brand transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:dumashiekorkoe@gmail.com"
              className="text-muted-foreground hover:text-accent-brand transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Designed &amp; Built by{" "}
            <span className="text-accent-brand font-medium">
              Korkoe Dumashie
            </span>
          </p>

          <a
            href="/Korkoe_Dumashie_Resume.pdf"
            download
            className="text-xs text-muted-foreground hover:text-accent-brand transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ──────────── Scroll to Top ──────────── */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-accent-brand text-accent-brand-foreground shadow-lg flex items-center justify-center hover:bg-accent-brand/90 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ──────────── Main Page ──────────── */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
