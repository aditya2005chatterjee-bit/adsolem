"use client";

import { useEffect, useMemo, useState } from "react";

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

const products = [
  {
    num: "01",
    name: "Clio",
    tag: "Travel",
    tagline: "Your journey, guided by Clio.",
    status: "Live",
    isLive: true,
    link: "https://clio-adsolem.vercel.app",
    body: "An AI travel companion that knows your full itinerary, gives you a morning briefing before your day starts, and answers anything about your trip in real time. Like a brilliant local friend in your pocket for every journey.",
  },
  {
    num: "02",
    name: "EduFlow",
    tag: "Education",
    status: "Coming Soon",
    isLive: false,
    body: "Intelligent system for coaching institutes and tutoring centres. Automates student progress reports, personalised study planning, and parent communication.",
  },
  {
    num: "03",
    name: "PulseAI",
    tag: "Fitness",
    status: "Coming Soon",
    isLive: false,
    body: "AI system for gyms and personal trainers. Automated client programming, check-ins, nutrition guidance, and progress tracking — so every client feels guided.",
  },
];

const whyPoints = [
  {
    label: "Intelligence",
    body: "Our systems are built on real AI — not automation scripts or off-the-shelf tools rebranded with an AI label.",
  },
  {
    label: "Vertical Focus",
    body: "We work exclusively in travel, education, and fitness. Deep domain knowledge means better systems, faster.",
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
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Brand />
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#approach">Approach</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
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
          We build intelligent systems for travel, education, and fitness businesses — so they can operate smarter, compete harder, and grow faster.
        </p>
        <a href="#approach" className="pill-button reveal reveal-d3">
          Explore Our Approach
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

function Products() {
  return (
    <section id="products" className="section section-grid">
      <div className="section-heading reveal">
        <p className="eyebrow">Products</p>
        <h2>Purpose-built AI tools for the markets we know best.</h2>
      </div>
      <div className="products-grid-new">
        {products.map((product, i) => (
          <article className={`product-card-new reveal reveal-d${i + 1}`} key={product.name}>
            <div className="product-card-top">
              <span className="product-num-large">{product.num}</span>
              <span className="product-tag-badge">{product.tag}</span>
              <span className={`product-status-badge${product.isLive ? " live" : ""}`}>
                {product.status}
              </span>
            </div>
            <h3>{product.name}</h3>
            {product.tagline && <p className="product-tagline">{product.tagline}</p>}
            <p>{product.body}</p>
            {product.isLive && (
              <a href={product.link ?? "#contact"} className="product-card-link" target={product.link ? "_blank" : undefined} rel={product.link ? "noopener noreferrer" : undefined}>
                Learn More <ArrowIcon />
              </a>
            )}
          </article>
        ))}
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
          <strong>${monthlyCost.toLocaleString("en-US")}</strong>
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
  const [form, setForm] = useState({ name: "", email: "", company: "", vertical: "", message: "" });
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
      setForm({ name: "", email: "", company: "", vertical: "", message: "" });
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
          <a href="#calculator">Estimate automation value</a>
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
              Vertical Interest
              <select
                name="vertical"
                value={form.vertical}
                onChange={(e) => setForm((p) => ({ ...p, vertical: e.target.value }))}
              >
                <option value="">Select a vertical</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Fitness and Wellness">Fitness &amp; Wellness</option>
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
        </div>
        <div className="footer-bottom">
          <Brand />
          <nav aria-label="Footer navigation">
            <a href="#approach">Approach</a>
            <a href="#process">Process</a>
            <a href="#products">Products</a>
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
      <Navbar />
      <Hero />
      <About />
      <Approach />
      <HowWeWork />
      <Products />
      <WhyAdSolem />
      <Calculator />
      <Contact />
      <Footer />
    </main>
  );
}
