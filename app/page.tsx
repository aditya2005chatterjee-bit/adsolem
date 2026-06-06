"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Zap, FileText, Mail, Eye, Newspaper, Brain, ShieldCheck, MessageCircle, Bell, BarChart2, TrendingUp, PenLine, ClipboardList, MessageSquare, Package } from "lucide-react";

type ContactState = "idle" | "loading" | "success" | "error";

const approachData = [
  {
    category: "Consulting",
    subtitle: "Discovery",
    body: "We audit your operations, identify automation opportunities, and turn scattered ideas into a clear implementation roadmap.",
  },
  {
    category: "Systems",
    subtitle: "Architecture",
    body: "We design intelligent workflows around your existing tools, data, and team habits so the system fits the business instead of forcing change.",
  },
  {
    category: "Deployment",
    subtitle: "Launch",
    body: "We build, integrate, test, and launch production-ready automations with clean handover and practical documentation.",
  },
  {
    category: "Support",
    subtitle: "Monitor",
    body: "We monitor performance, improve prompts and workflows, and keep your automation stack useful as your business grows.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Consult",
    body: "We learn how your business operates, where time leaks, and which automations will create measurable leverage.",
  },
  {
    num: "02",
    title: "Build",
    body: "We design and develop the workflows, AI logic, and integrations behind your intelligent operating system.",
  },
  {
    num: "03",
    title: "Deploy",
    body: "We launch carefully, monitor the first runs, and hand over a documented system your team can trust and build on.",
  },
];


const includedCards = [
  { Icon: Zap,            name: "Repetitive task automation",              desc: "Eliminate the manual work that eats your team's time every day." },
  { Icon: FileText,       name: "Document processing pipelines",           desc: "Extract, summarise, and route information from any document automatically." },
  { Icon: Mail,           name: "Email & communication automation",         desc: "Draft, send, and follow up without lifting a finger." },
  { Icon: Eye,            name: "Competitive intelligence monitoring",      desc: "Know what your competitors are doing before it affects you." },
  { Icon: Newspaper,      name: "Industry news tracking & summaries",       desc: "Stay current without spending hours reading." },
  { Icon: Brain,          name: "Custom AI assistant with memory",          desc: "An AI that knows your business, your clients, and your context." },
  { Icon: ShieldCheck,    name: "QA & quality control agents",              desc: "Automated checks that catch errors before they reach your clients." },
  { Icon: MessageCircle,  name: "AI chatbot for website or WhatsApp",       desc: "Answer customer questions 24/7 without hiring anyone." },
  { Icon: Bell,           name: "Automated follow-up sequences",            desc: "Never let a lead go cold because you forgot to reply." },
  { Icon: BarChart2,      name: "Automated business reports",               desc: "Weekly and monthly summaries generated and delivered automatically." },
  { Icon: TrendingUp,     name: "Sales & performance trend analysis",       desc: "Spot what's working and what isn't before it's too late." },
  { Icon: PenLine,        name: "AI email & proposal drafting in your voice", desc: "Communicate at volume without losing your personal tone." },
  { Icon: ClipboardList,  name: "Meeting notes & action item extraction",   desc: "Turn every call into a clear list of next steps automatically." },
  { Icon: MessageSquare,  name: "Customer feedback analysis",               desc: "Understand what your customers are really saying at scale." },
  { Icon: Package,        name: "Inventory & project status monitoring",    desc: "Always know where things stand without chasing updates." },
];

const services = [
  {
    num: "01",
    name: "Competitor Radar",
    engagement: "$350 / mo",
    body: "A fully automated intelligence brief delivered to your inbox every Monday. We monitor your competitors' websites, pricing, product launches, social activity, and press mentions — then synthesize it into a clean, scannable report. You stop manually checking five websites every week and start getting the full picture in five minutes. Built for ecommerce store owners and small business owners who are tired of finding out about competitor moves after they've already happened.",
    cta: "Get Competitor Radar",
    featured: true,
    tag: "Most Popular",
  },
  {
    num: "02",
    name: "Business Pulse",
    engagement: "$350 / mo",
    body: "Automated weekly performance reports pulled from all your tools — Google Ads, Meta, GA4, your CRM, your spreadsheets — synthesized into one clean summary with the actual insights surfaced, not just the numbers. No more Monday mornings stitching together dashboards that don't talk to each other. No more screen shares walking clients through data they don't trust. Just a clear, accurate report that's ready before the week starts. Built for small agency owners and consultants spending 4–8 hours every week on reporting that should take 20 minutes.",
    cta: "Get Business Pulse",
    featured: false,
    tag: "Best for Agencies",
  },
  {
    num: "03",
    name: "Intelligence Stack",
    engagement: "$600 / mo",
    body: "Both services combined. Competitor Radar monitors everything happening outside your business. Business Pulse monitors everything happening inside it. Together they give you a complete operating picture every single week — market intelligence and performance intelligence in one system, one inbox, one Monday morning read. Built for operators who want the full picture without hiring an analyst.",
    cta: "Get the Full Stack",
    featured: false,
    tag: "Most Comprehensive",
  },
];

const whyPoints = [
  {
    label: "Intelligence",
    body: "Our systems are built on real AI — not automation scripts or off-the-shelf tools rebranded with an AI label.",
  },
  {
    label: "Relevance",
    body: "AI moves fast. We stay current so you don't have to. Every system we build is designed for a world that looks different in 12 months.",
  },
  {
    label: "Durability",
    body: "Everything we build is documented, maintainable, and designed for your team to own and operate long-term.",
  },
  {
    label: "Selectivity",
    body: "We work with a select number of clients. Our process is thorough, timelines are honest, and we build to last.",
  },
];


function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={barRef} className="scroll-progress-bar" aria-hidden="true" />;
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef<number>(undefined);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = to;
    if (from === to) return;

    const duration = 380;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      setDisplayed(Math.round(from + (to - from) * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  return <>${displayed.toLocaleString("en-US")}</>;
}

function onCardTilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.classList.add("tilting");
  const { left, top, width, height } = el.getBoundingClientRect();
  const x = (e.clientX - left) / width - 0.5;
  const y = (e.clientY - top) / height - 0.5;
  el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(6px)`;
}

function onCardUntilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.classList.remove("tilting");
  el.style.transform = "";
}

function SunMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 150 96" fill="none" aria-hidden="true">
      <path d="M17 70C36 63 55 59 75 59C95 59 114 63 133 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M52 58C52 45.3 62.3 35 75 35C87.7 35 98 45.3 98 58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M75 6V28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 15L60 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M102 15L90 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M27 35L48 47" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M123 35L102 47" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 56H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M110 56H134" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="brand" aria-label="AdSolem home">
      <SunMark className="brand-mark" />
      {!compact && (
        <span>
          <strong>AdSolem</strong>
          <small>Towards the Sun</small>
        </span>
      )}
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M3 10L10 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4 3H10V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = ["home", "about", "approach", "process", "services", "calculator", "contact"];
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const is = (...ids: string[]) => ids.includes(active) ? "active" : "";

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Brand />
        <div className="nav-links">
          <a href="#about" className={is("about")}>About</a>
          <a href="#approach" className={is("approach", "process")}>Approach</a>
          <a href="#services" className={is("services")}>Services</a>
          <a href="#contact" className={is("calculator", "contact")}>Contact</a>
        </div>
        <a href="#contact" className="pill-button light">
          Get in Touch
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-top section-grid reveal">
        <div className="hero-brand-display">
          <SunMark className="hero-mark" />
          <h1>AdSolem</h1>
        </div>
        <p className="hero-tagline">AD SOLEM · TOWARDS THE SUN</p>
        <div className="hero-contact-row reveal reveal-d1">
          <a href="#contact" className="glow-button">Book a Call <ArrowIcon /></a>
        </div>
      </div>

      <div className="hero-glow-zone" aria-hidden="true">
        <div className="hero-glow" />
      </div>

      <div className="hero-statement section-grid">
        <p className="reveal reveal-d2">
          Your competitors are moving. Your reports are piling up. We automate both.
        </p>
        <p className="hero-sub reveal reveal-d3">
          AdSolem builds intelligent monitoring and reporting systems for small businesses and agencies — so you always know what&apos;s happening outside your business and inside it.
        </p>
        <a href="#services" className="pill-button reveal reveal-d4">
          Explore Our Services
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-image-col reveal">
        <div className="founder-wrap">
          {/* Save your photo as public/founder.jpg */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/founder.jpg" alt="Aditya Chatterjee, Founder of AdSolem" className="founder-img" />
          <div className="founder-blend" aria-hidden="true" />
        </div>
      </div>
      <div className="about-text-col reveal reveal-d1">
        <p className="section-label">About the Founder</p>
        <h2 className="about-name">Aditya Chatterjee</h2>
        <p className="about-meta">20 · Kolkata, India</p>
        <div className="about-bio">
          <p>
            I founded AdSolem because I believe every business — not just enterprises with large budgets — deserves intelligent systems that make them sharper, faster, and more competitive.
          </p>
          <p>
            I build with AI at the core of everything. Not as a gimmick, but as genuine infrastructure that compounds over time.
          </p>
          <p>
            When I&apos;m not building, I&apos;m training, reading, or thinking about the next problem worth solving.
          </p>
        </div>
        <div className="about-stats">
          <div className="about-stat">
            <span className="about-stat-num">3</span>
            <span className="about-stat-label">Verticals</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-num">1</span>
            <span className="about-stat-label">Live Product</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-num">AI</span>
            <span className="about-stat-label">Native</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="approach-section section-grid">
      <div className="approach-header reveal">
        <p className="section-label">About Our Approach to Work</p>
        <div className="approach-rule" />
      </div>
      <div className="approach-grid">
        {approachData.map((col, i) => (
          <article className={`approach-col reveal reveal-d${i + 1}`} key={col.category}>
            <span className="approach-category">{col.category}</span>
            <div className="approach-accent" />
            <h3>{col.subtitle}</h3>
            <p>{col.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowWeWork() {
  return (
    <section id="process" className="venn-section">
      <div className="venn-glow" aria-hidden="true" />
      <div className="venn-inner">
        <div className="venn-left reveal">
          <h2 className="venn-heading">How We<br />Work</h2>
          <p className="venn-subtext">
            Clear milestones, honest timelines, and systems designed for durability — not trend cycles.
          </p>
        </div>
        <div className="venn-right">
          <div className="venn-circles" aria-label="Process steps: Consult, Build, Deploy">
            {processSteps.map((step, i) => (
              <div className={`venn-circle reveal reveal-d${i + 1}`} key={step.title}>
                <div className="venn-circle-label">
                  <span className="venn-step-num">{step.num}</span>
                  <strong>{step.title}</strong>
                </div>
              </div>
            ))}
          </div>
          <div className="venn-steps">
            {processSteps.map((step, i) => (
              <div className={`venn-step reveal reveal-d${i + 2}`} key={step.num}>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function Services() {
  const [open, setOpen] = useState(false);

  return (
    <section id="services" className="section section-grid">
      <div className="section-heading reveal">
        <p className="eyebrow">Services</p>
        <h2>Work directly with Aditya.</h2>
      </div>
      <p className="services-intro reveal reveal-d1">
        We build two things: systems that watch your market so you never miss a competitor move, and systems that replace your manual reporting so Monday mornings stop being a grind. Done for you, running automatically, delivered to your inbox.
      </p>
      <div className="services-grid">
        {services.map((service, i) => (
          <article
            className={`service-card reveal reveal-d${i + 1}${service.featured ? " featured" : ""}`}
            key={service.name}
            onMouseMove={onCardTilt}
            onMouseLeave={onCardUntilt}
          >
            {service.tag && (
              <span className="service-recommended-badge">{service.tag}</span>
            )}
            <div className="service-card-top">
              <span className="service-num">{service.num}</span>
              <span className="service-engagement-badge">{service.engagement}</span>
            </div>
            <h3>{service.name}</h3>
            <p>{service.body}</p>
            <a
              href="#contact"
              className={`service-cta ${service.featured ? "glow-button" : "pill-button"}`}
            >
              {service.cta} <ArrowIcon />
            </a>
          </article>
        ))}
      </div>

      <div className="included-toggle-row reveal">
        <button
          className="included-toggle-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? "Hide ↑" : "See what's included ↓"}
        </button>
      </div>

      <div className={`included-panel${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="included-panel-inner">
          <div className="included-cards-grid">
            {includedCards.map(({ Icon, name, desc }) => (
              <div className="included-card" key={name}>
                <Icon className="included-card-icon" size={20} strokeWidth={1.6} aria-hidden="true" />
                <h4>{name}</h4>
                <p>{desc}</p>
                <span className="included-card-arrow" aria-hidden="true">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyAdSolem() {
  return (
    <section className="section section-grid">
      <div className="section-heading reveal">
        <p className="eyebrow">Why AdSolem</p>
        <h2>Why choose AdSolem?</h2>
      </div>
      <div className="why-grid">
        {whyPoints.map((point, i) => (
          <article className={`why-item reveal reveal-d${i + 1}`} key={point.label}>
            <div className="why-dot" />
            <div>
              <h3>{point.label}</h3>
              <p>{point.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Calculator() {
  const [team, setTeam] = useState(12);
  const [hours, setHours] = useState(8);
  const [cost, setCost] = useState(35);

  const monthlyHours = Math.round(team * hours * 4.33);
  const monthlyCost = monthlyHours * cost;
  const annualCost = monthlyCost * 12;

  const controls = useMemo(
    () => [
      { label: "Team size", value: team, min: 1, max: 120, setter: setTeam, suffix: "people" },
      { label: "Manual hours per person / week", value: hours, min: 1, max: 40, setter: setHours, suffix: "hours" },
      { label: "Average hourly cost", value: cost, min: 10, max: 200, setter: setCost, prefix: "$" },
    ],
    [cost, hours, team]
  );

  return (
    <section id="calculator" className="section section-grid calculator-section">
      <div className="section-heading reveal">
        <p className="eyebrow">Calculator</p>
        <h2>Make the cost of manual work visible.</h2>
      </div>
      <div className="calculator-shell reveal reveal-d1">
        <div className="calculator-controls">
          {controls.map((control) => {
            const percent = ((control.value - control.min) / (control.max - control.min)) * 100;
            return (
              <label key={control.label} className="range-control">
                <span>{control.label}</span>
                <strong>
                  {control.prefix}
                  {control.value}
                  {control.suffix ? ` ${control.suffix}` : ""}
                </strong>
                <input
                  type="range"
                  min={control.min}
                  max={control.max}
                  value={control.value}
                  onChange={(e) => control.setter(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(90deg, #C9A84C ${percent}%, rgba(255,255,255,0.12) ${percent}%)`,
                  }}
                />
              </label>
            );
          })}
        </div>
        <div className="calculator-result">
          <small>Estimated manual-work drag</small>
          <strong><AnimatedNumber value={monthlyCost} /></strong>
          <span>per month</span>
          <p>
            {monthlyHours.toLocaleString("en-US")} hours per month — roughly ${annualCost.toLocaleString("en-US")} per year — can be redirected into higher-leverage work.
          </p>
          <a href="#contact" className="glow-button">
            Automate This <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [status, setStatus] = useState<ContactState>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to send your message.");
      setStatus("success");
      setForm({ name: "", email: "", company: "", service: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to send your message.");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-heading-area section-grid reveal">
        <h2>Build with AdSolem Now.</h2>
        <div className="contact-pills">
          <a href="mailto:adsolemai@gmail.com" aria-label="Email Aditya" className="contact-pill-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2"/>
              <path d="M3 7l9 6 9-6"/>
            </svg>
          </a>
          <a href="https://x.com/AdityaC_411" target="_blank" rel="noopener noreferrer" aria-label="Aditya on X (Twitter)" className="contact-pill-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="contact-glow-zone" aria-hidden="true">
        <div className="contact-glow" />
      </div>

      <div className="contact-body-area section-grid">
        <p className="contact-intro reveal reveal-d1">
          Tell us about your business, your manual workflows, and the system you wish already existed.
        </p>
        <form className="contact-form reveal reveal-d2" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Full name *
              <input
                name="name"
                placeholder="Sam Sample"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
              />
            </label>
            <label>
              Email *
              <input
                name="email"
                type="email"
                placeholder="sam@company.com"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Company
              <input
                name="company"
                placeholder="Company name"
                value={form.company}
                onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
              />
            </label>
            <label>
              Which service are you interested in?
              <select
                name="service"
                value={form.service}
                onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
              >
                <option value="">Select a service</option>
                <option value="AI Audit">AI Audit</option>
                <option value="AI Build">AI Build</option>
                <option value="AI Retainer">AI Retainer</option>
                <option value="Just Exploring">Just Exploring</option>
              </select>
            </label>
          </div>
          <label>
            Message *
            <textarea
              name="message"
              placeholder="What should your business stop doing manually?"
              rows={5}
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              required
            />
          </label>
          {status === "error" && <p className="form-status error">{error}</p>}
          {status === "success" && (
            <p className="form-status success">Message received. We will be in touch shortly.</p>
          )}
          <button className="glow-button form-submit" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending" : "Send Message"} <ArrowIcon />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="footer-inner section-grid">
        <div className="footer-statement reveal">
          <div className="footer-mark">
            <SunMark />
          </div>
          <p>AdSolem builds intelligent systems for businesses ready to operate smarter, compete harder, and grow faster.</p>
          <div className="footer-social">
            <a href="mailto:adsolemai@gmail.com" aria-label="Email Aditya">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="M3 7l9 6 9-6"/>
              </svg>
            </a>
            <a href="https://x.com/AdityaC_411" target="_blank" rel="noopener noreferrer" aria-label="Aditya on X (Twitter)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <Brand />
          <nav aria-label="Footer navigation">
            <a href="#approach">Approach</a>
            <a href="#process">Process</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <p>Copyright &copy; {new Date().getFullYear()} AdSolem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Approach />
      <HowWeWork />
      <Services />
      <WhyAdSolem />
      <Calculator />
      <Contact />
      <Footer />
    </main>
  );
}
