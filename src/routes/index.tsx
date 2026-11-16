import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Blocks,
  BrainCircuit,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Globe2,
  Layers3,
  Menu,
  MessageSquareText,
  MonitorSmartphone,
  Network,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import globalNetwork from "@/assets/pkc-global-network-illustration.png";
import missionIllustration from "@/assets/pkc-mission-illustration.png";
import visionIllustration from "@/assets/pkc-vision-illustration.png";

const navItems = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Our Approach", id: "process" },
  { label: "Our Team", id: "team" },
  { label: "Our World", id: "global" },
  { label: "Contact", id: "contact" },
];

const serviceItems = [
  {
    number: "01",
    title: "Software Development",
    description: "Thoughtful, custom software built around how your business really works.",
    icon: Code2,
    wide: true,
  },
  {
    number: "02",
    title: "IT Consulting",
    description: "Clear technology guidance to turn your next big decision into the right one.",
    icon: Compass,
  },
  {
    number: "03",
    title: "Web & Mobile Applications",
    description: "Useful, beautifully made digital experiences that work anywhere.",
    icon: MonitorSmartphone,
  },
  {
    number: "04",
    title: "Cloud Solutions",
    description: "Secure, dependable cloud foundations that grow with your ambitions.",
    icon: Cloud,
    wide: true,
  },
  {
    number: "05",
    title: "AI & Automation",
    description: "Make everyday work smarter with practical AI and intelligent automation.",
    icon: BrainCircuit,
  },
  {
    number: "06",
    title: "Digital Transformation",
    description: "Connect your people, processes, and technology for lasting momentum.",
    icon: Layers3,
  },
  {
    number: "07",
    title: "Business Technology Consulting",
    description: "Bring your business goals and the right technology into closer alignment.",
    icon: Blocks,
    wide: true,
  },
];

const serviceTicker = [
  "Software development",
  "Cloud solutions",
  "AI & automation",
  "Digital transformation",
  "Technology consulting",
];

const processItems = [
  {
    number: "01",
    title: "Discover",
    description: "We listen, ask the right questions, and understand what success means to you.",
  },
  {
    number: "02",
    title: "Design",
    description: "We find a clear direction and shape a solution around your goals.",
  },
  {
    number: "03",
    title: "Develop",
    description: "We build with care, share progress, and keep you part of every decision.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "We launch, learn, and help your new solution grow with your business.",
  },
];

interface TeamMember {
  name: string;
  role: string;
  category: "leadership" | "engineering" | "strategy";
  categoryLabel: string;
  initials: string;
  badge: string;
  experience: string;
  bio: string;
  skills: string[];
}

const teamCategories = [
  { id: "all", label: "All Members" },
  { id: "leadership", label: "Leadership" },
  { id: "engineering", label: "Engineering" },
  { id: "strategy", label: "Consulting & Growth" },
] as const;

const teamMembers: TeamMember[] = [
  {
    name: "Santhosh M",
    role: "Director & Strategy Lead",
    category: "leadership",
    categoryLabel: "Executive Leadership",
    initials: "SM",
    badge: "Strategic Vision",
    experience: "12+ Yrs Exp",
    bio: "Spearheading global technology roadmaps, executive enterprise consulting, and long-term client partnerships with sustainable digital delivery models.",
    skills: ["Enterprise Strategy", "Global Operations", "Tech Governance"],
  },
  {
    name: "Adam P",
    role: "Chief Technology Officer",
    category: "leadership",
    categoryLabel: "Executive Leadership",
    initials: "AP",
    badge: "Architecture & AI",
    experience: "10+ Yrs Exp",
    bio: "Architecting cloud-native platforms, resilient microservices, and AI-driven distributed backends engineered for mission-critical enterprise scale.",
    skills: ["Cloud Architecture", "Distributed Systems", "AI & Data"],
  },
  {
    name: "Hendricks R",
    role: "Software Development Consultant",
    category: "strategy",
    categoryLabel: "Consulting & Advisory",
    initials: "HR",
    badge: "Systems Advisory",
    experience: "8+ Yrs Exp",
    bio: "Translating sophisticated business demands into modular, secure, and high-performance software architectures and integration protocols.",
    skills: ["Systems Consulting", "API Architecture", "Performance Tuning"],
  },
  {
    name: "Bindu M",
    role: "Business Development Manager",
    category: "strategy",
    categoryLabel: "Consulting & Advisory",
    initials: "BM",
    badge: "Client Growth",
    experience: "7+ Yrs Exp",
    bio: "Connecting technological capabilities with tangible revenue growth and managing multinational stakeholder relationships with complete transparency.",
    skills: ["Client Partnerships", "Strategic Growth", "Value Realization"],
  },
  {
    name: "Vikas T",
    role: "Full Stack Developer",
    category: "engineering",
    categoryLabel: "Core Engineering",
    initials: "VT",
    badge: "Modern Web & Cloud",
    experience: "6+ Yrs Exp",
    bio: "Crafting fluid, high-performance web applications and resilient API services with modern TypeScript, React, and cloud architectures.",
    skills: ["React & TypeScript", "Node.js Services", "Full-Stack Security"],
  },
  {
    name: "Sandeep N",
    role: "Product Lead",
    category: "engineering",
    categoryLabel: "Core Engineering",
    initials: "SN",
    badge: "Product & UX",
    experience: "7+ Yrs Exp",
    bio: "Bridging customer empathy with technical execution to drive product development from discovery and roadmapping to global deployment.",
    skills: ["Product Strategy", "Agile Execution", "UX Architecture"],
  },
];

const reasons = [
  {
    number: "01",
    title: "Technical expertise",
    description: "Broad technical knowledge, applied to the challenges that matter.",
    icon: Cpu,
  },
  {
    number: "02",
    title: "Business understanding",
    description: "Technology decisions grounded in real business priorities.",
    icon: Network,
  },
  {
    number: "03",
    title: "Customer-first approach",
    description: "Open, thoughtful collaboration from the first conversation onwards.",
    icon: MessageSquareText,
  },
  {
    number: "04",
    title: "Reliable & scalable delivery",
    description: "Dependable solutions designed for the next step, not just this one.",
    icon: ShieldCheck,
  },
];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(255, "Email must be under 255 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more about your project.")
    .max(2000, "Keep your message under 2,000 characters."),
});

type ContactForm = z.infer<typeof contactSchema>;
type FormErrors = { [Key in keyof ContactForm]?: string | undefined };

export const Route = createFileRoute("/")({
  component: PkcSolutionsWebsite,
  head: () => ({
    meta: [
      { title: "PKC Solutions Inc. | Global Software Consulting & Technology Solutions" },
      {
        name: "description",
        content:
          "PKC Solutions is a global software consulting and technology solutions company helping businesses across Canada, India, and internationally innovate, scale, and succeed.",
      },
      {
        name: "keywords",
        content:
          "PKC Solutions, software consulting, technology partner, enterprise cloud solutions, custom software development, web applications, AI automation, digital transformation, Canada, India",
      },
      { name: "author", content: "PKC Solutions Inc." },
      { name: "publisher", content: "PKC Solutions Inc." },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:site_name", content: "PKC Solutions Inc." },
      { property: "og:locale", content: "en_US" },
      {
        property: "og:title",
        content: "PKC Solutions Inc. | Global Software Consulting & Technology Solutions",
      },
      {
        property: "og:description",
        content:
          "Think Global. Build Smart. Grow Together. PKC Solutions is your global software consulting and technology partner delivering scalable enterprise solutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pkcsolutionsinc.com" },
      { property: "og:image", content: "https://pkcsolutionsinc.com/pkc-solutions-logo.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "PKC Solutions Inc. - Global Technology Partner" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "PKC Solutions Inc. | Global Software Consulting & Technology Solutions",
      },
      {
        name: "twitter:description",
        content:
          "Think Global. Build Smart. Grow Together. PKC Solutions is your global software consulting and technology partner delivering scalable enterprise solutions.",
      },
      { name: "twitter:image", content: "https://pkcsolutionsinc.com/pkc-solutions-logo.png" },
      { name: "theme-color", content: "#000000" },
    ],
    links: [
      { rel: "canonical", href: "https://pkcsolutionsinc.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "PKC Solutions Inc.",
          url: "https://pkcsolutionsinc.com",
          logo: "https://pkcsolutionsinc.com/pkc-solutions-logo.png",
          description:
            "Global software consulting and technology solutions company serving Canada, India, and international markets.",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-437-837-9306",
            contactType: "customer service",
            email: "hr@pksolutionsinc.com",
            availableLanguage: ["English"],
          },
          sameAs: ["https://pkcsolutionsinc.com"],
        }),
      },
    ],
  }),
});

function PkcSolutionsWebsite() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [formValues, setFormValues] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");
  const [activeTeamFilter, setActiveTeamFilter] = useState<string>("all");
  const progressRef = useRef<HTMLDivElement>(null);

  const filteredTeam =
    activeTeamFilter === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.category === activeTeamFilter);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) setIntroVisible(false);
    const introTimer = mediaQuery.matches
      ? undefined
      : window.setTimeout(() => setIntroVisible(false), 1900);
    return () => {
      if (introTimer !== undefined) window.clearTimeout(introTimer);
    };
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 28);
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const countNodes = entry.target.querySelectorAll<HTMLElement>("[data-count]");
          const observedCount =
            entry.target instanceof HTMLElement && entry.target.dataset["count"]
              ? [entry.target]
              : Array.from(countNodes);
          observedCount.forEach((node) => {
            if (node.dataset["countStarted"] === "true") return;
            node.dataset["countStarted"] = "true";
            const count = Number(node.dataset["count"] ?? 0);
            if (reducedMotion) {
              node.textContent = `${count}+`;
              return;
            }
            const started = performance.now();
            const duration = 1750;
            const step = (now: number) => {
              const amount = Math.min(1, (now - started) / duration);
              const eased = 1 - Math.pow(1 - amount, 3);
              node.textContent = `${Math.floor(count * eased)}+`;
              if (amount < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection((entry.target as HTMLElement).id || "home");
        });
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    sections.forEach((section) => {
      activeObserver.observe(section);
      section
        .querySelectorAll<HTMLElement>(".reveal-item, [data-reveal]")
        .forEach((child, index) => {
          child.style.setProperty("--reveal-index", String(index));
          revealObserver.observe(child);
        });
    });
    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setTaglineIndex((current) => (current + 1) % 2), 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress / 100})`;
  }, [progress]);

  const handleSpotlight = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = contactSchema.safeParse(formValues);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFormErrors({
        name: errors.name?.[0],
        email: errors.email?.[0],
        message: errors.message?.[0],
      });
      setFormStatus("idle");
      return;
    }
    setFormErrors({});
    setFormStatus("sending");
    window.setTimeout(() => {
      const params = new URLSearchParams({
        subject: `Website enquiry from ${result.data.name}`,
        body: `From: ${result.data.name} (${result.data.email})\n\n${result.data.message}`,
      });
      window.location.href = `mailto:hr@pksolutionsinc.com?${params.toString()}`;
      setFormStatus("success");
    }, 650);
  };

  return (
    <main className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-fill" ref={progressRef} />
      </div>

      {introVisible && (
        <div className="intro-overlay" aria-hidden="true">
          <div className="intro-brand">
            <span className="intro-symbol">
              <img src="/favicon.png" alt="" />
            </span>
            <span className="intro-name">PKC Solutions Inc.</span>
          </div>
        </div>
      )}

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-wrap">
          <a
            className="brand-link"
            href="#home"
            aria-label="PKC Solutions Inc. home"
            onClick={() => setMenuOpen(false)}
          >
            <img className="brand-logo" src="/pkc-solutions-logo-transparent.png" alt="PKC Solutions Inc." />
          </a>
          <nav className={`main-nav ${menuOpen ? "menu-open" : ""}`} aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                href={`#${item.id}`}
                key={item.id}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button asChild className="nav-cta">
            <a href="#contact">
              Let’s talk <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      <div id="main-content">
        <section className="hero-section" id="home" data-section aria-labelledby="hero-title">
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="hero-aurora hero-aurora-one" aria-hidden="true" />
          <div className="hero-aurora hero-aurora-two" aria-hidden="true" />
          <div className="hero-content page-width">
            <div className="hero-copy">
              <div className="hero-kicker reveal-item">
                <span className="live-dot" />
                <span>Technology, with a wider perspective</span>
              </div>
              <h1 className="hero-title reveal-item" id="hero-title">
                Your <span className="gradient-text">Global</span>
                <br />
                Technology Partner<span className="title-period">.</span>
              </h1>
              <div className="hero-tagline-slot" aria-live="polite">
                <p className="hero-tagline" key={taglineIndex}>
                  {taglineIndex === 0
                    ? "Think Global. Build Smart. Grow Together."
                    : "Innovating Today. Transforming Tomorrow."}
                </p>
              </div>
              <p className="hero-description reveal-item">
                PKC Solutions is a global software consulting and technology solutions company
                committed to helping businesses innovate, grow and succeed in the digital world.
              </p>
              <div className="hero-actions reveal-item">
                <Button asChild className="button-primary">
                  <a href="#services">
                    Explore services <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="button-secondary">
                  <a href="#contact">
                    Contact us <ArrowUpRight aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <div className="hero-locations reveal-item">
                <span className="location-pulse" />
                <span>Working across borders</span>
                <span className="location-divider" />
                <span>Canada</span>
                <span className="location-separator">·</span>
                <span>India</span>
                <span className="location-separator">·</span>
                <span>International</span>
              </div>
              <a className="scroll-cue" href="#about" aria-label="Scroll to About us">
                <span>Scroll to explore</span>
                <ChevronDown aria-hidden="true" />
              </a>
            </div>
            <figure
              className="hero-visual reveal-item"
              aria-label="Connected global technology network"
            >
              <span className="hero-visual-orbit hero-visual-orbit-one" aria-hidden="true" />
              <span className="hero-visual-orbit hero-visual-orbit-two" aria-hidden="true" />
              <span className="hero-visual-caption">
                <i /> CONNECTING IDEAS ACROSS BORDERS
              </span>
              <img
                src={globalNetwork}
                alt="Emerald dotted globe connected across North America and India"
                width={1024}
                height={1024}
                fetchPriority="high"
              />
              <span className="hero-visual-coordinate" aria-hidden="true">
                45°N — 20°N
                <br />
                CA / IN / WORLD
              </span>
            </figure>
          </div>
          <div className="hero-index" aria-hidden="true">
            PKC <span>/</span> GLOBAL TECHNOLOGY
          </div>
        </section>

        <section
          className="section section-about"
          id="about"
          data-section
          aria-labelledby="about-title"
        >
          <div className="page-width">
            <SectionEyebrow index="01" label="A little about us" />
            <div className="about-grid">
              <div className="about-copy reveal-item">
                <h2 className="section-title" id="about-title">
                  Good technology starts with <span className="gradient-text">understanding.</span>
                </h2>
                <p>
                  PKC Solutions is a global software consulting and technology solutions company
                  committed to helping businesses innovate, grow and succeed in the digital world.
                </p>
                <p>
                  We partner with startups, small businesses and established enterprises across
                  Canada, India and international markets to deliver innovative, reliable and
                  scalable technology solutions.
                </p>
                <p>
                  Our expertise spans software development, IT consulting, web and mobile
                  applications, cloud technologies, AI-driven solutions and digital transformation.
                  We combine technical expertise, business understanding and a customer-first
                  approach to turn complex challenges into smart technology solutions.
                </p>
                <a className="text-link" href="#process">
                  A thoughtful way of working <ArrowDownRight aria-hidden="true" />
                </a>
              </div>
              <div className="stats-panel reveal-item" aria-label="PKC Solutions at a glance">
                <div className="stats-heading">
                  <span>Our work at a glance</span>
                  <span className="stats-live">
                    <i /> growing globally
                  </span>
                </div>
                <div className="stats-grid">
                  <Stat
                    count={3}
                    numberLabel="Countries served"
                    valueLabel="Canada, India + more"
                  />
                  <Stat count={50} numberLabel="Projects delivered" valueLabel="Ideas made real" />
                  <Stat count={40} numberLabel="Happy clients" valueLabel="Built on trust" />
                  <Stat
                    count={8}
                    numberLabel="Years of experience"
                    valueLabel="Experience in every step"
                  />
                </div>
                <div className="stat-footnote">
                  <span>ILLUSTRATIVE FIGURES</span>
                  <span>Replace with verified company data</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceTicker />

        <ServicesSection onSpotlight={handleSpotlight} />

        <ServiceTicker alternate />

        <section
          className="section section-process"
          id="process"
          data-section
          aria-labelledby="process-title"
        >
          <div className="page-width">
            <SectionEyebrow index="03" label="How we make it happen" />
            <div className="section-heading-row reveal-item">
              <h2 className="section-title" id="process-title">
                Clear thinking.
                <br />
                <span className="gradient-text">Real progress.</span>
              </h2>
              <p>
                Great work comes from working together. Here’s how we turn a first conversation into
                lasting impact.
              </p>
            </div>
            <div className="process-track" data-reveal>
              <div className="process-grid">
                {processItems.map((step, index) => (
                  <article
                    className="process-step reveal-item"
                    key={step.number}
                    style={{ "--reveal-index": index } as React.CSSProperties}
                  >
                    <div className="process-marker">
                      <span>{step.number}</span>
                    </div>
                    {index < processItems.length - 1 && (
                      <div className="process-step-line" aria-hidden="true">
                        <span className="process-step-line-fill" />
                        <span className="process-step-arrow">
                          <ArrowRight />
                        </span>
                      </div>
                    )}
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="process-note reveal-item">
              <span>
                <Sparkles />
              </span>
              <p>Curious minds and clear communication make every step better.</p>
            </div>
          </div>
        </section>

        <section
          className="section section-purpose"
          id="purpose"
          data-section
          aria-labelledby="purpose-title"
        >
          <div className="page-width">
            <SectionEyebrow index="04" label="What keeps us moving" />
            <div className="purpose-heading reveal-item">
              <h2 className="section-title" id="purpose-title">
                Rooted in purpose.
                <br />
                <span className="gradient-text">Ready for what’s next.</span>
              </h2>
            </div>
            <div className="purpose-grid">
              <article
                className="purpose-card purpose-mission spotlight-card reveal-item"
                onMouseMove={handleSpotlight}
              >
                <div className="purpose-illustration">
                  <img
                    src={missionIllustration}
                    alt="Connected collaborators building a shared technology foundation"
                    width={1024}
                    height={1024}
                    loading="lazy"
                  />
                </div>
                <div className="purpose-content">
                  <div className="purpose-card-top">
                    <span className="purpose-icon">
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                    <span>OUR MISSION</span>
                    <span className="purpose-card-num">01</span>
                  </div>
                  <h3>Our Mission</h3>
                  <p>
                    To empower businesses worldwide with innovative technology, exceptional
                    consulting and solutions that create lasting value.
                  </p>
                  <div className="purpose-card-line" />
                </div>
              </article>
              <article
                className="purpose-card purpose-vision spotlight-card reveal-item"
                onMouseMove={handleSpotlight}
              >
                <div className="purpose-illustration">
                  <img
                    src={visionIllustration}
                    alt="Connected globe with an upward path representing a shared global future"
                    width={1024}
                    height={1024}
                    loading="lazy"
                  />
                </div>
                <div className="purpose-content">
                  <div className="purpose-card-top">
                    <span className="purpose-icon">
                      <Globe2 aria-hidden="true" />
                    </span>
                    <span>OUR VISION</span>
                    <span className="purpose-card-num">02</span>
                  </div>
                  <h3>Our Vision</h3>
                  <p>
                    To become a globally trusted technology partner, connecting businesses with the
                    future of digital innovation.
                  </p>
                  <div className="purpose-card-line" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-why" id="why" data-section aria-labelledby="why-title">
          <div className="page-width">
            <SectionEyebrow index="05" label="A partner that looks out for you" />
            <div className="why-layout">
              <div className="why-intro reveal-item">
                <h2 className="section-title" id="why-title">
                  Technology is what we do.
                  <br />
                  <span className="gradient-text">Partnership is how.</span>
                </h2>
                <p>
                  We believe in building more than software — we build long-term partnerships, drive
                  innovation and turn ideas into impactful digital experiences.
                </p>
                <a className="text-link" href="#contact">
                  Let’s build something meaningful <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
              <div className="reasons-grid">
                {reasons.map((reason, index) => {
                  const Icon = reason.icon;
                  return (
                    <article
                      className="reason-card spotlight-card reveal-item"
                      key={reason.number}
                      onMouseMove={handleSpotlight}
                      style={{ "--reveal-index": index } as React.CSSProperties}
                    >
                      <div className="reason-top">
                        <span>{reason.number}</span>
                        <Icon className="reason-icon" aria-hidden="true" />
                      </div>
                      <h3>{reason.title}</h3>
                      <p>{reason.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          className="section section-team"
          id="team"
          data-section
          aria-labelledby="team-title"
        >
          <div className="page-width">
            <SectionEyebrow index="06" label="The people behind the work" />
            <div className="team-heading-row reveal-item">
              <div>
                <h2 className="section-title" id="team-title">
                  Built by people who <span className="gradient-text">care.</span>
                </h2>
                <p>
                  A dedicated squad of technology architects, engineering practitioners, and strategic consultants committed to delivering real results for your business.
                </p>
              </div>
              <div className="team-stats-banner">
                <div className="team-stat-item">
                  <span className="team-stat-value">100%</span>
                  <span className="team-stat-label">Senior-Led Squads</span>
                </div>
                <div className="team-stat-divider" aria-hidden="true" />
                <div className="team-stat-item">
                  <span className="team-stat-value">6+</span>
                  <span className="team-stat-label">Core Practice Leads</span>
                </div>
                <div className="team-stat-divider" aria-hidden="true" />
                <div className="team-stat-item">
                  <span className="team-stat-value">Global</span>
                  <span className="team-stat-label">Delivery Footprint</span>
                </div>
              </div>
            </div>

            <div className="team-filters reveal-item" role="tablist" aria-label="Team member categories">
              {teamCategories.map((cat) => {
                const count =
                  cat.id === "all"
                    ? teamMembers.length
                    : teamMembers.filter((m) => m.category === cat.id).length;
                const isActive = activeTeamFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`team-filter-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveTeamFilter(cat.id)}
                  >
                    <span>{cat.label}</span>
                    <span className="team-filter-count">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="team-grid">
              {filteredTeam.map((member, index) => (
                <article
                  className="team-card spotlight-card reveal-item"
                  key={member.name}
                  onMouseMove={handleSpotlight}
                  style={{ "--reveal-index": index } as React.CSSProperties}
                >
                  <div className="team-card-mesh" aria-hidden="true" />

                  <div className="team-card-header">
                    <div className="team-avatar-wrapper">
                      <div className="team-avatar" aria-hidden="true">
                        <span className="team-initials">{member.initials}</span>
                      </div>
                      <span className="team-status-indicator" title="Active Core Team" />
                    </div>
                    <div className="team-header-badges">
                      <span className="team-category-badge">{member.categoryLabel}</span>
                    </div>
                  </div>

                  <div className="team-card-copy">
                    <div className="team-name-row">
                      <h3>{member.name}</h3>
                      <span className="team-role-highlight">{member.badge}</span>
                    </div>
                    <p className="team-role-title">{member.role}</p>
                    <p className="team-bio">{member.bio}</p>
                  </div>

                  <div className="team-skills-list" aria-label="Core expertise">
                    {member.skills.map((skill) => (
                      <span key={skill} className="team-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="team-card-footer">
                    <span className="team-footer-status">
                      <span className="team-pulse-dot" /> Verified Practice Lead
                    </span>
                    <span className="team-footer-exp">{member.experience}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="team-collaboration-callout reveal-item">
              <div className="team-collab-content">
                <div className="team-collab-icon-box">
                  <Sparkles className="team-collab-sparkle" aria-hidden="true" />
                </div>
                <div>
                  <h4>Work directly with our leadership and specialists</h4>
                  <p>
                    No intermediaries or layered handoffs. Our senior engineers and consulting leads collaborate directly with your team from day one.
                  </p>
                </div>
              </div>
              <Button asChild className="button-primary team-collab-btn">
                <a href="#contact">
                  Schedule an Intro <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section
          className="section section-global"
          id="global"
          data-section
          aria-labelledby="global-title"
        >
          <div className="page-width">
            <SectionEyebrow index="07" label="Good ideas travel" />
            <div className="section-heading-row global-heading reveal-item">
              <h2 className="section-title" id="global-title">
                Local insight.
                <br />
                <span className="gradient-text">Global outlook.</span>
              </h2>
              <p>
                Rooted in Canada and India, ready to collaborate across time zones and continents.
              </p>
            </div>
            <div className="world-panel reveal-item">
              <div className="map-caption">
                <Globe2 aria-hidden="true" />
                <span>ONE CONNECTED WORLD</span>
                <i />
              </div>
              <WorldMap />
              <div className="map-legend">
                <span className="map-location">
                  <i />
                  Canada
                </span>
                <span className="map-connector" />
                <span className="map-location">
                  <i />
                  India
                </span>
                <span className="map-availability">
                  Open to international collaboration <ArrowUpRight aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section section-contact"
          id="contact"
          data-section
          aria-labelledby="contact-title"
        >
          <div className="page-width">
            <SectionEyebrow index="08" label="Every good thing starts somewhere" />
            <div className="contact-heading reveal-item">
              <h2 className="section-title" id="contact-title">
                Have something
                <br />
                in mind? <span className="gradient-text">Let’s talk.</span>
              </h2>
              <p>Tell us where you’d like to go. We’ll help you find a smart way to get there.</p>
            </div>
            <div className="contact-grid">
              <div className="contact-form-wrap reveal-item">
                {formStatus === "success" ? (
                  <div className="form-success" role="status">
                    <span className="success-icon">
                      <Check aria-hidden="true" />
                    </span>
                    <p className="form-eyebrow">MESSAGE READY</p>
                    <h3>Thank you, {formValues.name.split(" ")[0]}.</h3>
                    <p>
                      Your email app has been opened with your message. We look forward to
                      connecting with you.
                    </p>
                    <Button
                      variant="outline"
                      className="button-secondary form-reset"
                      onClick={() => {
                        setFormStatus("idle");
                        setFormValues({ name: "", email: "", message: "" });
                      }}
                    >
                      Write another <ArrowRight />
                    </Button>
                  </div>
                ) : (
                  <form className="contact-form" noValidate onSubmit={handleFormSubmit}>
                    <div className="form-heading">
                      <span>LET’S GET STARTED</span>
                      <span className="form-index">01 / 02</span>
                    </div>
                    <div className="floating-field">
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder=" "
                        maxLength={100}
                        autoComplete="name"
                        aria-invalid={Boolean(formErrors.name)}
                        aria-describedby={formErrors.name ? "name-error" : undefined}
                        value={formValues.name}
                        onChange={(event) =>
                          setFormValues((values) => ({ ...values, name: event.target.value }))
                        }
                      />
                      <label htmlFor="contact-name">Your name</label>
                      {formErrors.name && (
                        <span className="field-error" id="name-error">
                          {formErrors.name}
                        </span>
                      )}
                    </div>
                    <div className="floating-field">
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder=" "
                        maxLength={255}
                        autoComplete="email"
                        aria-invalid={Boolean(formErrors.email)}
                        aria-describedby={formErrors.email ? "email-error" : undefined}
                        value={formValues.email}
                        onChange={(event) =>
                          setFormValues((values) => ({ ...values, email: event.target.value }))
                        }
                      />
                      <label htmlFor="contact-email">Email address</label>
                      {formErrors.email && (
                        <span className="field-error" id="email-error">
                          {formErrors.email}
                        </span>
                      )}
                    </div>
                    <div className="floating-field floating-field-message">
                      <textarea
                        id="contact-message"
                        name="message"
                        placeholder=" "
                        rows={3}
                        maxLength={2000}
                        aria-invalid={Boolean(formErrors.message)}
                        aria-describedby={formErrors.message ? "message-error" : "message-count"}
                        value={formValues.message}
                        onChange={(event) =>
                          setFormValues((values) => ({ ...values, message: event.target.value }))
                        }
                      />
                      <label htmlFor="contact-message">A little about your project</label>
                      {formErrors.message ? (
                        <span className="field-error" id="message-error">
                          {formErrors.message}
                        </span>
                      ) : (
                        <span className="message-count" id="message-count">
                          {formValues.message.length} / 2,000
                        </span>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="button-primary form-submit"
                      disabled={formStatus === "sending"}
                    >
                      {formStatus === "sending" ? (
                        <>
                          Preparing your message <span className="loading-dot" />
                        </>
                      ) : (
                        <>
                          Send your message <Send aria-hidden="true" />
                        </>
                      )}
                    </Button>
                    <p className="form-privacy">
                      Your details are only used to respond to your enquiry.
                    </p>
                  </form>
                )}
              </div>
              <aside className="contact-aside reveal-item">
                <div className="contact-aside-top">
                  <span>BEHIND THE NEXT GOOD THING</span>
                  <span className="aside-dash">—</span>
                </div>
                <div className="contact-statement">
                  Let’s connect
                  <br />
                  ideas to <span className="gradient-text">impact.</span>
                </div>
                <p>
                  Great partnerships begin with a simple conversation. We’re looking forward to
                  hearing what you’re working on.
                </p>
                <div className="contact-detail">
                  <span className="detail-icon">
                    <MessageSquareText aria-hidden="true" />
                  </span>
                  <div>
                    <span className="detail-label">EMAIL US</span>
                    <a href="mailto:hr@pksolutionsinc.com">
                      hr@pksolutionsinc.com <ArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="detail-icon">
                    <Phone aria-hidden="true" />
                  </span>
                  <div>
                    <span className="detail-label">CALL US</span>
                    <a href="tel:4378379306">
                      +1 437 837 9306 <ArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="detail-icon">
                    <Globe2 aria-hidden="true" />
                  </span>
                  <div>
                    <span className="detail-label">WHERE WE WORK</span>
                    <span className="detail-value">Canada · India · International</span>
                    <span className="detail-note">Connected across borders.</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#home" aria-label="PKC Solutions Inc. home">
                <img
                  className="brand-logo footer-logo"
                  src="/pkc-solutions-logo-transparent.png"
                  alt="PKC Solutions Inc."
                />
              </a>
              <p>
                Think Global. Build Smart.
                <br />
                Grow Together.
              </p>
            </div>
            <div className="footer-links">
              <span>EXPLORE</span>
              {navItems.map((item) => (
                <a href={`#${item.id}`} key={item.id}>
                  {item.label}
                </a>
              ))}
            </div>
            <a className="back-top" href="#home" aria-label="Back to top">
              <span>Back to top</span>
              <span className="back-top-icon">
                <ArrowUp aria-hidden="true" />
              </span>
            </a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 PKC Solutions Inc. All rights reserved.</span>
            <span>Global perspective. Thoughtful technology.</span>
            <a href="https://pkcsolutionsinc.com" target="_blank" rel="noreferrer">
              pkcsolutionsinc.com <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ServicesSection({ onSpotlight }: { onSpotlight: (event: MouseEvent<HTMLElement>) => void }) {
  return (
    <section
      className="section section-services"
      id="services"
      data-section
      aria-labelledby="services-title"
    >
      <div className="page-width">
        <SectionEyebrow index="02" label="What we bring to the table" />
        <div className="section-heading-row reveal-item">
          <h2 className="section-title" id="services-title">
            One partner.
            <br />
            <span className="gradient-text">More possibilities.</span>
          </h2>
          <p>Thoughtful technology services to help you take your next step — and the one after that.</p>
        </div>
        <div className="services-grid">
          {serviceItems.map((service, index) => {
            const Icon = service.icon;
            const card = (
              <article
                key={service.number}
                className={`service-card spotlight-card reveal-item ${service.wide ? "service-card-wide" : ""} ${service.number === "01" ? "service-featured" : ""}`}
                onMouseMove={onSpotlight}
                style={{ "--reveal-index": index } as React.CSSProperties}
              >
                <div className="service-card-top">
                  <span>{service.number} / 07</span>
                  <span className="card-arrow"><ArrowUpRight aria-hidden="true" /></span>
                </div>
                {service.number === "01" ? (
                  <div className="service-featured-art" aria-hidden="true">
                    <span className="service-art-orbit service-art-orbit-one" />
                    <span className="service-art-orbit service-art-orbit-two" />
                    <span className="service-featured-icon"><Icon /></span>
                    <span className="service-art-node service-art-node-one" />
                    <span className="service-art-node service-art-node-two" />
                  </div>
                ) : (
                  <div className="service-card-icon"><Icon aria-hidden="true" /></div>
                )}
                <div className="service-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="service-card-line" />
              </article>
            );

            return service.number === "01" ? (
              <div className="service-featured-wrap" key={service.number}>
                <span className="service-featured-backplate service-featured-backplate-one" aria-hidden="true" />
                <span className="service-featured-backplate service-featured-backplate-two" aria-hidden="true" />
                {card}
              </div>
            ) : (
              card
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="section-eyebrow reveal-item">
      <span>{index}</span>
      <i />
      <span>{label}</span>
    </div>
  );
}

function Stat({
  count,
  numberLabel,
  valueLabel,
}: {
  count: number;
  numberLabel: string;
  valueLabel: string;
}) {
  return (
    <div className="stat-cell" data-reveal>
      <span className="stat-number" data-count={count}>
        0+
      </span>
      <span className="stat-label">{numberLabel}</span>
      <span className="stat-caption">{valueLabel}</span>
    </div>
  );
}

function ServiceTicker({ alternate = false }: { alternate?: boolean }) {
  const items = [...serviceTicker, ...serviceTicker];
  return (
    <div
      className={`ticker-strip ${alternate ? "ticker-alternate" : ""}`}
      aria-label="Technology services"
    >
      <div className="ticker-track">
        {items.map((service, index) => (
          <span className="ticker-item" key={`${service}-${index}`}>
            <i />
            {service}
            <ArrowUpRight aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

function pointInPolygon(x: number, y: number, polygon: Array<[number, number]>) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const current = polygon[i];
    const previous = polygon[j];
    if (!current || !previous) continue;
    const [xi, yi] = current;
    const [xj, yj] = previous;
    const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

function WorldMap() {
  const land = [
    [
      [65, 92],
      [80, 72],
      [113, 58],
      [140, 57],
      [162, 68],
      [171, 84],
      [155, 101],
      [145, 118],
      [126, 126],
      [113, 148],
      [95, 142],
      [86, 124],
      [72, 116],
    ],
    [
      [116, 148],
      [130, 152],
      [142, 170],
      [145, 195],
      [137, 222],
      [125, 254],
      [112, 272],
      [106, 250],
      [107, 227],
      [98, 203],
      [99, 182],
    ],
    [
      [181, 74],
      [204, 64],
      [227, 68],
      [237, 84],
      [226, 98],
      [205, 101],
      [190, 94],
    ],
    [
      [222, 114],
      [242, 106],
      [262, 111],
      [273, 127],
      [264, 146],
      [249, 159],
      [243, 181],
      [231, 173],
      [222, 153],
      [213, 135],
    ],
    [
      [272, 81],
      [300, 64],
      [339, 62],
      [367, 72],
      [390, 68],
      [418, 80],
      [453, 79],
      [485, 90],
      [514, 84],
      [542, 96],
      [565, 95],
      [587, 108],
      [571, 121],
      [542, 118],
      [524, 130],
      [496, 128],
      [478, 139],
      [449, 132],
      [428, 145],
      [399, 136],
      [376, 145],
      [355, 133],
      [334, 141],
      [321, 124],
      [301, 119],
      [290, 101],
    ],
    [
      [340, 147],
      [361, 144],
      [376, 157],
      [383, 179],
      [375, 197],
      [369, 225],
      [356, 246],
      [345, 227],
      [340, 206],
      [331, 189],
      [333, 168],
    ],
    [
      [452, 192],
      [470, 181],
      [492, 185],
      [500, 197],
      [492, 209],
      [475, 208],
      [461, 217],
      [451, 209],
    ],
    [
      [492, 213],
      [508, 208],
      [518, 220],
      [516, 231],
      [505, 228],
    ],
    [
      [483, 254],
      [508, 249],
      [539, 256],
      [561, 270],
      [548, 281],
      [521, 274],
      [496, 278],
      [480, 267],
    ],
    [
      [587, 246],
      [603, 241],
      [613, 251],
      [605, 263],
      [591, 258],
    ],
  ] as Array<Array<[number, number]>>;
  const dots: Array<{ x: number; y: number }> = [];
  for (let y = 53; y <= 281; y += 7) {
    for (let x = 65; x <= 612; x += 7) {
      if (land.some((polygon) => pointInPolygon(x, y, polygon))) dots.push({ x, y });
    }
  }
  return (
    <svg
      className="world-map-svg"
      viewBox="0 0 680 330"
      role="img"
      aria-label="Dotted map showing PKC Solutions' presence in Canada and India"
    >
      <defs>
        <filter id="map-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path className="map-route-shadow" d="M127 110 C224 55 340 69 490 198" />
      <path className="map-route" d="M127 110 C224 55 340 69 490 198" />
      <g className="map-dots">
        {dots.map((dot) => (
          <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="1.45" />
        ))}
      </g>
      <g className="map-marker map-marker-canada">
        <circle className="marker-pulse" cx="127" cy="110" r="16" />
        <circle className="marker-core" cx="127" cy="110" r="5" />
        <circle className="marker-center" cx="127" cy="110" r="2" />
      </g>
      <g className="map-marker map-marker-india">
        <circle className="marker-pulse" cx="490" cy="198" r="16" />
        <circle className="marker-core" cx="490" cy="198" r="5" />
        <circle className="marker-center" cx="490" cy="198" r="2" />
      </g>
      <g className="map-place-label">
        <rect x="83" y="78" width="74" height="20" rx="10" />
        <text x="120" y="91">
          CANADA
        </text>
      </g>
      <g className="map-place-label">
        <rect x="463" y="222" width="58" height="20" rx="10" />
        <text x="492" y="235">
          INDIA
        </text>
      </g>
      <circle className="map-moving-dot" r="3.2">
        <animateMotion dur="6s" repeatCount="indefinite" path="M127 110 C224 55 340 69 490 198" />
      </circle>
    </svg>
  );
}
