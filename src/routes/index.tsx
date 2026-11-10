import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Blocks,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Globe2,
  Layers3,
  Linkedin,
  Menu,
  MessageSquareText,
  MonitorSmartphone,
  Network,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import pkcLogoOriginal from "@/assets/pkc-solutions-logo-transparent.png.asset.json";
import globalNetwork from "@/assets/pkc-global-network-illustration.png";
import missionIllustration from "@/assets/pkc-mission-illustration.png";
import visionIllustration from "@/assets/pkc-vision-illustration.png";

const navItems = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Our approach", id: "process" },
  { label: "Our world", id: "global" },
  { label: "Contact", id: "contact" },
];

const serviceItems = [
  {
    number: "01",
    title: "Software Development",
    description: "Custom software crafted around your goals, your people, and the way you work.",
    icon: Code2,
    tags: ["Custom software", "Product engineering", "Modernization"],
  },
  {
    number: "02",
    title: "IT Consulting",
    description: "Practical technology advice that turns complex decisions into clear next steps.",
    icon: Compass,
    tags: ["IT strategy", "Architecture", "Advisory"],
  },
  {
    number: "03",
    title: "Web & Mobile Applications",
    description: "Intuitive web and mobile experiences that keep your customers connected.",
    icon: MonitorSmartphone,
    tags: ["Web apps", "Mobile", "User experience"],
  },
  {
    number: "04",
    title: "Cloud Solutions",
    description: "Secure cloud foundations designed to make your business more agile and resilient.",
    icon: Cloud,
    tags: ["Cloud migration", "Infrastructure", "Security"],
  },
  {
    number: "05",
    title: "AI & Automation",
    description: "Put useful AI and automation to work on repetitive, everyday challenges.",
    icon: BrainCircuit,
    tags: ["Applied AI", "Automation", "Smart workflows"],
  },
  {
    number: "06",
    title: "Digital Transformation",
    description: "Bring people, processes, and technology together for lasting progress.",
    icon: Layers3,
    tags: ["Modernization", "Change", "Digital strategy"],
  },
  {
    number: "07",
    title: "Business Technology Consulting",
    description: "Align business priorities and technology choices to create measurable value.",
    icon: Blocks,
    tags: ["Business alignment", "Technology roadmap", "Growth"],
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
  { number: "01", title: "Discover", description: "We listen, ask the right questions, and understand what success means to you." },
  { number: "02", title: "Design", description: "We find a clear direction and shape a solution around your goals." },
  { number: "03", title: "Develop", description: "We build with care, share progress, and keep you part of every decision." },
  { number: "04", title: "Deliver", description: "We launch, learn, and help your new solution grow with your business." },
];

const reasons = [
  { number: "01", title: "Technical expertise", description: "Broad technical knowledge, applied to the challenges that matter.", icon: Cpu },
  { number: "02", title: "Business understanding", description: "Technology decisions grounded in real business priorities.", icon: Network },
  { number: "03", title: "Customer-first approach", description: "Open, thoughtful collaboration from the first conversation onwards.", icon: MessageSquareText },
  { number: "04", title: "Reliable & scalable delivery", description: "Dependable solutions designed for the next step, not just this one.", icon: ShieldCheck },
];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Keep your name under 100 characters."),
  email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be under 255 characters."),
  message: z.string().trim().min(10, "Please share a little more about your project.").max(2000, "Keep your message under 2,000 characters."),
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
          "A global technology partner helping businesses in Canada, India, and around the world build thoughtful, scalable digital solutions.",
      },
      { property: "og:title", content: "PKC Solutions Inc. | Global Software Consulting & Technology Solutions" },
      {
        property: "og:description",
        content:
          "Think global. Build smart. Grow together. Meet your global software consulting and technology partner.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#000000" },
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
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) setIntroVisible(false);
    const introTimer = mediaQuery.matches ? undefined : window.setTimeout(() => setIntroVisible(false), 1900);
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
          const observedCount = entry.target instanceof HTMLElement && entry.target.dataset["count"] ? [entry.target] : Array.from(countNodes);
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
      section.querySelectorAll<HTMLElement>(".reveal-item, [data-reveal]").forEach((child, index) => {
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
      window.location.href = `mailto:hello@pkcsolutionsinc.com?${params.toString()}`;
      setFormStatus("success");
    }, 650);
  };

  return (
    <main className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true"><div className="scroll-progress-fill" ref={progressRef} /></div>

      {introVisible && (
        <div className="intro-overlay" aria-hidden="true">
          <div className="intro-brand">
            <span className="intro-symbol"><img src="/favicon.png" alt="" /></span>
            <span className="intro-name">PKC Solutions Inc.</span>
          </div>
        </div>
      )}

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-wrap">
          <a className="brand-link" href="#home" aria-label="PKC Solutions Inc. home" onClick={() => setMenuOpen(false)}>
            <img className="brand-logo" src={pkcLogoOriginal.url} alt="PKC Solutions Inc." />
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
          <Button asChild className="nav-cta"><a href="#contact">Let’s talk <ArrowUpRight aria-hidden="true" /></a></Button>
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
              Your <span className="gradient-text">Global</span><br />
              Technology Partner<span className="title-period">.</span>
            </h1>
            <div className="hero-tagline-slot" aria-live="polite">
              <p className="hero-tagline" key={taglineIndex}>
                {taglineIndex === 0 ? "Think Global. Build Smart. Grow Together." : "Innovating Today. Transforming Tomorrow."}
              </p>
            </div>
            <p className="hero-description reveal-item">
              PKC Solutions is a global software consulting and technology solutions company committed to helping businesses innovate, grow and succeed in the digital world.
            </p>
            <div className="hero-actions reveal-item">
              <Button asChild className="button-primary"><a href="#services">Explore services <ArrowRight aria-hidden="true" /></a></Button>
              <Button asChild variant="outline" className="button-secondary"><a href="#contact">Contact us <ArrowUpRight aria-hidden="true" /></a></Button>
            </div>
            <div className="hero-locations reveal-item">
              <span className="location-pulse" />
              <span>Working across borders</span>
              <span className="location-divider" />
              <span>Canada</span><span className="location-separator">·</span>
              <span>India</span><span className="location-separator">·</span>
              <span>International</span>
            </div>
            <a className="scroll-cue" href="#about" aria-label="Scroll to About us">
              <span>Scroll to explore</span><ChevronDown aria-hidden="true" />
            </a>
            </div>
            <figure className="hero-visual reveal-item" aria-label="Connected global technology network">
              <span className="hero-visual-orbit hero-visual-orbit-one" aria-hidden="true" />
              <span className="hero-visual-orbit hero-visual-orbit-two" aria-hidden="true" />
              <span className="hero-visual-caption"><i /> CONNECTING IDEAS ACROSS BORDERS</span>
              <img src={globalNetwork} alt="Emerald dotted globe connected across North America and India" width={1024} height={1024} fetchPriority="high" />
              <span className="hero-visual-coordinate" aria-hidden="true">45°N — 20°N<br />CA / IN / WORLD</span>
            </figure>
          </div>
          <div className="hero-index" aria-hidden="true">PKC <span>/</span> GLOBAL TECHNOLOGY</div>
        </section>

        <section className="section section-about" id="about" data-section aria-labelledby="about-title">
          <div className="page-width">
            <SectionEyebrow index="01" label="A little about us" />
            <div className="about-grid">
              <div className="about-copy reveal-item">
                <h2 className="section-title" id="about-title">Good technology starts with <span className="gradient-text">understanding.</span></h2>
                <p>PKC Solutions is a global software consulting and technology solutions company committed to helping businesses innovate, grow and succeed in the digital world.</p>
                <p>We partner with startups, small businesses and established enterprises across Canada, India and international markets to deliver innovative, reliable and scalable technology solutions.</p>
                <p>Our expertise spans software development, IT consulting, web and mobile applications, cloud technologies, AI-driven solutions and digital transformation. We combine technical expertise, business understanding and a customer-first approach to turn complex challenges into smart technology solutions.</p>
                <a className="text-link" href="#process">A thoughtful way of working <ArrowDownRight aria-hidden="true" /></a>
              </div>
              <div className="stats-panel reveal-item" aria-label="PKC Solutions at a glance">
                <div className="stats-heading"><span>Our work at a glance</span><span className="stats-live"><i /> growing globally</span></div>
                <div className="stats-grid">
                  <Stat count={3} numberLabel="Countries served" valueLabel="Canada, India + more" />
                  <Stat count={50} numberLabel="Projects delivered" valueLabel="Ideas made real" />
                  <Stat count={40} numberLabel="Happy clients" valueLabel="Built on trust" />
                  <Stat count={8} numberLabel="Years of experience" valueLabel="Experience in every step" />
                </div>
                <div className="stat-footnote"><span>ILLUSTRATIVE FIGURES</span><span>Replace with verified company data</span></div>
              </div>
            </div>
          </div>
        </section>

        <ServiceTicker />

        <ServiceCarousel onSpotlight={handleSpotlight} />

        <ServiceTicker alternate />

        <section className="section section-process" id="process" data-section aria-labelledby="process-title">
          <div className="page-width">
            <SectionEyebrow index="03" label="How we make it happen" />
            <div className="section-heading-row reveal-item">
              <h2 className="section-title" id="process-title">Clear thinking.<br /><span className="gradient-text">Real progress.</span></h2>
              <p>Great work comes from working together. Here’s how we turn a first conversation into lasting impact.</p>
            </div>
            <div className="process-track" data-reveal>
              <div className="process-line" aria-hidden="true"><span className="process-line-fill" /></div>
              <div className="process-grid">
                {processItems.map((step, index) => (
                  <article className="process-step reveal-item" key={step.number} style={{ "--reveal-index": index } as React.CSSProperties}>
                    <div className="process-marker"><span>{step.number}</span><i /></div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <span className="process-direction" aria-hidden="true">{index === processItems.length - 1 ? <Check /> : <ArrowRight />}</span>
                  </article>
                ))}
              </div>
            </div>
            <div className="process-note reveal-item"><span><Sparkles /></span><p>Curious minds and clear communication make every step better.</p></div>
          </div>
        </section>

        <section className="section section-purpose" id="purpose" data-section aria-labelledby="purpose-title">
          <div className="page-width">
            <SectionEyebrow index="04" label="What keeps us moving" />
            <div className="purpose-heading reveal-item"><h2 className="section-title" id="purpose-title">Rooted in purpose.<br /><span className="gradient-text">Ready for what’s next.</span></h2></div>
            <div className="purpose-grid">
              <article className="purpose-card purpose-mission spotlight-card reveal-item" onMouseMove={handleSpotlight}>
                <div className="purpose-illustration"><img src={missionIllustration} alt="Connected collaborators building a shared technology foundation" width={1024} height={1024} loading="lazy" /></div>
                <div className="purpose-content">
                  <div className="purpose-card-top"><span className="purpose-icon"><ArrowUpRight aria-hidden="true" /></span><span>OUR MISSION</span><span className="purpose-card-num">01</span></div>
                  <h3>Our Mission</h3>
                  <p>To empower businesses worldwide with innovative technology, exceptional consulting and solutions that create lasting value.</p>
                  <div className="purpose-card-line" />
                </div>
              </article>
              <article className="purpose-card purpose-vision spotlight-card reveal-item" onMouseMove={handleSpotlight}>
                <div className="purpose-illustration"><img src={visionIllustration} alt="Connected globe with an upward path representing a shared global future" width={1024} height={1024} loading="lazy" /></div>
                <div className="purpose-content">
                  <div className="purpose-card-top"><span className="purpose-icon"><Globe2 aria-hidden="true" /></span><span>OUR VISION</span><span className="purpose-card-num">02</span></div>
                  <h3>Our Vision</h3>
                  <p>To become a globally trusted technology partner, connecting businesses with the future of digital innovation.</p>
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
                <h2 className="section-title" id="why-title">Technology is what we do.<br /><span className="gradient-text">Partnership is how.</span></h2>
                <p>We believe in building more than software — we build long-term partnerships, drive innovation and turn ideas into impactful digital experiences.</p>
                <a className="text-link" href="#contact">Let’s build something meaningful <ArrowUpRight aria-hidden="true" /></a>
              </div>
              <div className="reasons-grid">
                {reasons.map((reason, index) => {
                  const Icon = reason.icon;
                  return (
                    <article className="reason-card spotlight-card reveal-item" key={reason.number} onMouseMove={handleSpotlight} style={{ "--reveal-index": index } as React.CSSProperties}>
                      <div className="reason-top"><span>{reason.number}</span><Icon className="reason-icon" aria-hidden="true" /></div>
                      <h3>{reason.title}</h3><p>{reason.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-global" id="global" data-section aria-labelledby="global-title">
          <div className="page-width">
            <SectionEyebrow index="06" label="Good ideas travel" />
            <div className="section-heading-row global-heading reveal-item">
              <h2 className="section-title" id="global-title">Local insight.<br /><span className="gradient-text">Global outlook.</span></h2>
              <p>Rooted in Canada and India, ready to collaborate across time zones and continents.</p>
            </div>
            <div className="world-panel reveal-item">
              <div className="map-caption"><Globe2 aria-hidden="true" /><span>ONE CONNECTED WORLD</span><i /></div>
              <WorldMap />
              <div className="map-legend"><span className="map-location"><i />Canada</span><span className="map-connector" /><span className="map-location"><i />India</span><span className="map-availability">Open to international collaboration <ArrowUpRight aria-hidden="true" /></span></div>
            </div>
          </div>
        </section>

        <section className="section section-contact" id="contact" data-section aria-labelledby="contact-title">
          <div className="page-width">
            <SectionEyebrow index="07" label="Every good thing starts somewhere" />
            <div className="contact-heading reveal-item">
              <h2 className="section-title" id="contact-title">Have something<br />in mind? <span className="gradient-text">Let’s talk.</span></h2>
              <p>Tell us where you’d like to go. We’ll help you find a smart way to get there.</p>
            </div>
            <div className="contact-grid">
              <div className="contact-form-wrap reveal-item">
                {formStatus === "success" ? (
                  <div className="form-success" role="status">
                    <span className="success-icon"><Check aria-hidden="true" /></span>
                    <p className="form-eyebrow">MESSAGE READY</p>
                    <h3>Thank you, {formValues.name.split(" ")[0]}.</h3>
                    <p>Your email app has been opened with your message. We look forward to connecting with you.</p>
                    <Button variant="outline" className="button-secondary form-reset" onClick={() => { setFormStatus("idle"); setFormValues({ name: "", email: "", message: "" }); }}>Write another <ArrowRight /></Button>
                  </div>
                ) : (
                  <form className="contact-form" noValidate onSubmit={handleFormSubmit}>
                    <div className="form-heading"><span>LET’S GET STARTED</span><span className="form-index">01 / 02</span></div>
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
                        onChange={(event) => setFormValues((values) => ({ ...values, name: event.target.value }))}
                      />
                      <label htmlFor="contact-name">Your name</label>
                      {formErrors.name && <span className="field-error" id="name-error">{formErrors.name}</span>}
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
                        onChange={(event) => setFormValues((values) => ({ ...values, email: event.target.value }))}
                      />
                      <label htmlFor="contact-email">Email address</label>
                      {formErrors.email && <span className="field-error" id="email-error">{formErrors.email}</span>}
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
                        onChange={(event) => setFormValues((values) => ({ ...values, message: event.target.value }))}
                      />
                      <label htmlFor="contact-message">A little about your project</label>
                      {formErrors.message ? <span className="field-error" id="message-error">{formErrors.message}</span> : <span className="message-count" id="message-count">{formValues.message.length} / 2,000</span>}
                    </div>
                    <Button type="submit" className="button-primary form-submit" disabled={formStatus === "sending"}>
                      {formStatus === "sending" ? <>Preparing your message <span className="loading-dot" /></> : <>Send your message <Send aria-hidden="true" /></>}
                    </Button>
                    <p className="form-privacy">Your details are only used to respond to your enquiry.</p>
                  </form>
                )}
              </div>
              <aside className="contact-aside reveal-item">
                <div className="contact-aside-top"><span>BEHIND THE NEXT GOOD THING</span><span className="aside-dash">—</span></div>
                <div className="contact-statement">Let’s connect<br />ideas to <span className="gradient-text">impact.</span></div>
                <p>Great partnerships begin with a simple conversation. We’re looking forward to hearing what you’re working on.</p>
                <div className="contact-detail">
                  <span className="detail-icon"><MessageSquareText aria-hidden="true" /></span>
                  <div><span className="detail-label">EMAIL US</span><a href="mailto:hello@pkcsolutionsinc.com">hello@pkcsolutionsinc.com <ArrowUpRight aria-hidden="true" /></a><span className="detail-note">Placeholder — replace with your preferred email.</span></div>
                </div>
                <div className="contact-detail">
                  <span className="detail-icon"><Globe2 aria-hidden="true" /></span>
                  <div><span className="detail-label">WHERE WE WORK</span><span className="detail-value">Canada · India · International</span><span className="detail-note">Connected across borders.</span></div>
                </div>
                <div className="social-row"><span>FOLLOW ALONG</span><span className="social-placeholder" aria-label="LinkedIn profile coming soon" title="LinkedIn profile coming soon"><Linkedin aria-hidden="true" /></span><span className="social-placeholder" aria-label="Social profile coming soon" title="Social profile coming soon"><ArrowUpRight aria-hidden="true" /></span><span className="social-coming-soon">Profiles coming soon</span></div>
              </aside>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-main">
            <div className="footer-brand"><a href="#home" aria-label="PKC Solutions Inc. home"><img className="brand-logo footer-logo" src={pkcLogoOriginal.url} alt="PKC Solutions Inc." /></a><p>Think Global. Build Smart.<br />Grow Together.</p></div>
            <div className="footer-links"><span>EXPLORE</span>{navItems.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}</div>
            <a className="back-top" href="#home" aria-label="Back to top"><span>Back to top</span><span className="back-top-icon"><ArrowUp aria-hidden="true" /></span></a>
          </div>
          <div className="footer-bottom"><span>© 2026 PKC Solutions Inc.</span><span>Global perspective. Thoughtful technology.</span><a href="https://pkcsolutionsinc.com" target="_blank" rel="noreferrer">pkcsolutionsinc.com <ArrowUpRight aria-hidden="true" /></a></div>
        </div>
      </footer>
    </main>
  );
}

function ServiceCarousel({ onSpotlight }: { onSpotlight: (event: MouseEvent<HTMLElement>) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 75, damping: 24, mass: 0.35 });
  const activePosition = useTransform(reducedMotion ? scrollYProgress : smoothProgress, [0, 1], [0, serviceItems.length - 1]);
  const progressWidth = useTransform(activePosition, (value) => `${(value / (serviceItems.length - 1)) * 100}%`);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useMotionValueEvent(activePosition, "change", (value) => {
    if (!isMobile) setActiveIndex(Math.round(value));
  });

  const scrollToService = (index: number) => {
    const nextIndex = Math.max(0, Math.min(serviceItems.length - 1, index));
    setActiveIndex(nextIndex);
    if (isMobile) {
      const card = trackRef.current?.querySelector<HTMLElement>(`[data-service-index="${nextIndex}"]`);
      if (trackRef.current && card) {
        const centeredLeft = Math.max(0, Math.min(
          trackRef.current.scrollWidth - trackRef.current.clientWidth,
          card.offsetLeft - (trackRef.current.clientWidth - card.clientWidth) / 2,
        ));
        trackRef.current.scrollTo({ left: centeredLeft, behavior: reducedMotion ? "auto" : "smooth" });
      }
      return;
    }
    const section = sectionRef.current;
    if (!section) return;
    const scrollDistance = Math.max(0, section.offsetHeight - window.innerHeight);
    const destination = section.getBoundingClientRect().top + window.scrollY + (scrollDistance * nextIndex) / (serviceItems.length - 1);
    window.scrollTo({ top: destination, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const handleSwipeScroll = () => {
    const track = trackRef.current;
    if (!track || !isMobile) return;
    const card = track.querySelector<HTMLElement>("[data-service-index]");
    if (!card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const cardStep = card.getBoundingClientRect().width + gap;
    if (cardStep > 0) setActiveIndex(Math.max(0, Math.min(serviceItems.length - 1, Math.round(track.scrollLeft / cardStep))));
  };

  return (
    <section className="section-services-scroll" id="services" data-section aria-labelledby="services-title" ref={sectionRef}>
      <div className="service-carousel-sticky">
        <div className="service-carousel-heading page-width">
          <SectionEyebrow index="02" label="What we bring to the table" />
          <div className="service-carousel-title-row">
            <h2 className="section-title" id="services-title">One partner.<br /><span className="gradient-text">More possibilities.</span></h2>
            <p>Thoughtful technology services to help you take your next step — and the one after that.</p>
          </div>
        </div>
        <div className="service-carousel-stage page-width" onMouseMove={onSpotlight}>
          <div className="service-carousel-track" ref={trackRef} onScroll={handleSwipeScroll} aria-label="PKC Solutions services">
            {serviceItems.map((service, index) => (
              <ServiceCarouselCard
                key={service.number}
                service={service}
                index={index}
                activeIndex={activeIndex}
                activePosition={activePosition}
                reducedMotion={Boolean(reducedMotion)}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
        <div className="service-carousel-controls page-width">
          <span className="service-carousel-count"><strong>{String(activeIndex + 1).padStart(2, "0")}</strong> / 07</span>
          <div className="service-carousel-progress" role="group" aria-label="Choose a service">
            <div className="service-progress-rail"><motion.div className="service-progress-fill" style={{ width: isMobile ? `${((activeIndex + 1) / serviceItems.length) * 100}%` : progressWidth }} /></div>
            {serviceItems.map((service, index) => (
              <Button
                key={service.number}
                type="button"
                variant="ghost"
                size="icon"
                className={`service-progress-dot${activeIndex === index ? " is-active" : ""}`}
                aria-label={`Show service ${service.number}: ${service.title}`}
                aria-pressed={activeIndex === index}
                onClick={() => scrollToService(index)}
              ><span /></Button>
            ))}
          </div>
          <div className="service-carousel-arrows">
            <Button type="button" variant="outline" size="icon" className="service-carousel-arrow" aria-label="Previous service" onClick={() => scrollToService(activeIndex - 1)} disabled={activeIndex === 0}><ChevronLeft /></Button>
            <Button type="button" variant="outline" size="icon" className="service-carousel-arrow" aria-label="Next service" onClick={() => scrollToService(activeIndex + 1)} disabled={activeIndex === serviceItems.length - 1}><ChevronRight /></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCarouselCard({
  service,
  index,
  activeIndex,
  activePosition,
  reducedMotion,
  isMobile,
}: {
  service: (typeof serviceItems)[number];
  index: number;
  activeIndex: number;
  activePosition: MotionValue<number>;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const Icon = service.icon;
  const offsets = [index - 1.5, index - 1, index, index + 1, index + 1.5];
  const x = useTransform(activePosition, offsets, ["60%", "29%", "-50%", "-129%", "-160%"]);
  const rotateY = useTransform(activePosition, offsets, ["-42deg", "-35deg", "0deg", "35deg", "42deg"]);
  const scale = useTransform(activePosition, offsets, [0.76, 0.85, 1, 0.85, 0.76]);
  const opacity = useTransform(activePosition, offsets, [0, 0.52, 1, 0.52, 0]);
  const reducedOpacity = useTransform(activePosition, [index - 1, index, index + 1], [0, 1, 0]);
  const cardStyle = isMobile
    ? { x: 0, y: 0, rotateY: 0, scale: 1, opacity: 1 }
    : reducedMotion
      ? { x: "-50%", y: "-50%", rotateY: 0, scale: 1, opacity: activeIndex === index ? 1 : 0 }
      : { x, y: "-50%", rotateY, scale, opacity };

  return (
    <motion.article
      data-service-index={index}
      className={`service-carousel-card${activeIndex === index ? " is-active" : ""}`}
      style={cardStyle}
      aria-hidden={Boolean(reducedMotion && !isMobile && activeIndex !== index)}
      aria-label={`Service ${service.number}: ${service.title}`}
      aria-current={activeIndex === index ? "step" : undefined}
    >
      <div className="service-carousel-visual" aria-hidden="true">
        <div className="service-visual-ornament service-visual-ornament-one" />
        <div className="service-visual-ornament service-visual-ornament-two" />
        <div className="service-visual-grid" />
        <div className="service-visual-icon"><Icon /></div>
        <span className="service-visual-index">PKC / {service.number}</span>
      </div>
      <div className="service-carousel-copy">
        <div className="service-copy-kicker"><span>{service.number}</span><i /> SERVICE {service.number}</div>
        <h3>{service.title}</h3>
        <div className="service-copy-underline" />
        <p>{service.description}</p>
        <ul className="service-tags" aria-label={`${service.title} capabilities`}>
          {service.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
    </motion.article>
  );
}

function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return <div className="section-eyebrow reveal-item"><span>{index}</span><i /><span>{label}</span></div>;
}

function Stat({ count, numberLabel, valueLabel }: { count: number; numberLabel: string; valueLabel: string }) {
  return (
    <div className="stat-cell" data-reveal>
      <span className="stat-number" data-count={count}>0+</span>
      <span className="stat-label">{numberLabel}</span>
      <span className="stat-caption">{valueLabel}</span>
    </div>
  );
}

function ServiceTicker({ alternate = false }: { alternate?: boolean }) {
  const items = [...serviceTicker, ...serviceTicker];
  return (
    <div className={`ticker-strip ${alternate ? "ticker-alternate" : ""}`} aria-label="Technology services">
      <div className="ticker-track">
        {items.map((service, index) => <span className="ticker-item" key={`${service}-${index}`}><i />{service}<ArrowUpRight aria-hidden="true" /></span>)}
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
    [[65, 92], [80, 72], [113, 58], [140, 57], [162, 68], [171, 84], [155, 101], [145, 118], [126, 126], [113, 148], [95, 142], [86, 124], [72, 116]],
    [[116, 148], [130, 152], [142, 170], [145, 195], [137, 222], [125, 254], [112, 272], [106, 250], [107, 227], [98, 203], [99, 182]],
    [[181, 74], [204, 64], [227, 68], [237, 84], [226, 98], [205, 101], [190, 94]],
    [[222, 114], [242, 106], [262, 111], [273, 127], [264, 146], [249, 159], [243, 181], [231, 173], [222, 153], [213, 135]],
    [[272, 81], [300, 64], [339, 62], [367, 72], [390, 68], [418, 80], [453, 79], [485, 90], [514, 84], [542, 96], [565, 95], [587, 108], [571, 121], [542, 118], [524, 130], [496, 128], [478, 139], [449, 132], [428, 145], [399, 136], [376, 145], [355, 133], [334, 141], [321, 124], [301, 119], [290, 101]],
    [[340, 147], [361, 144], [376, 157], [383, 179], [375, 197], [369, 225], [356, 246], [345, 227], [340, 206], [331, 189], [333, 168]],
    [[452, 192], [470, 181], [492, 185], [500, 197], [492, 209], [475, 208], [461, 217], [451, 209]],
    [[492, 213], [508, 208], [518, 220], [516, 231], [505, 228]],
    [[483, 254], [508, 249], [539, 256], [561, 270], [548, 281], [521, 274], [496, 278], [480, 267]],
    [[587, 246], [603, 241], [613, 251], [605, 263], [591, 258]],
  ] as Array<Array<[number, number]>>;
  const dots: Array<{ x: number; y: number }> = [];
  for (let y = 53; y <= 281; y += 7) {
    for (let x = 65; x <= 612; x += 7) {
      if (land.some((polygon) => pointInPolygon(x, y, polygon))) dots.push({ x, y });
    }
  }
  return (
    <svg className="world-map-svg" viewBox="0 0 680 330" role="img" aria-label="Dotted map showing PKC Solutions' presence in Canada and India">
      <defs><filter id="map-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
      <path className="map-route-shadow" d="M127 110 C224 55 340 69 490 198" />
      <path className="map-route" d="M127 110 C224 55 340 69 490 198" />
      <g className="map-dots">{dots.map((dot) => <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="1.45" />)}</g>
      <g className="map-marker map-marker-canada"><circle className="marker-pulse" cx="127" cy="110" r="16" /><circle className="marker-core" cx="127" cy="110" r="5" /><circle className="marker-center" cx="127" cy="110" r="2" /></g>
      <g className="map-marker map-marker-india"><circle className="marker-pulse" cx="490" cy="198" r="16" /><circle className="marker-core" cx="490" cy="198" r="5" /><circle className="marker-center" cx="490" cy="198" r="2" /></g>
      <g className="map-place-label"><rect x="83" y="78" width="74" height="20" rx="10" /><text x="120" y="91">CANADA</text></g>
      <g className="map-place-label"><rect x="463" y="222" width="58" height="20" rx="10" /><text x="492" y="235">INDIA</text></g>
      <circle className="map-moving-dot" r="3.2"><animateMotion dur="6s" repeatCount="indefinite" path="M127 110 C224 55 340 69 490 198" /></circle>
    </svg>
  );
}