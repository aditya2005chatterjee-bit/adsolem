"use client";

import { useEffect, useRef } from "react";

const whatWeDo = [
  {
    title: "More 5-star reviews, without lifting a finger",
    body: "Happy customers get a friendly nudge at just the right moment. You just watch the reviews come in.",
  },
  {
    title: "Customers who've gone quiet, brought back automatically",
    body: "When someone hasn't booked or bought in a while, we reach out on your behalf and bring them back.",
  },
  {
    title: "Invoices that get paid, without an awkward email from you",
    body: "Gentle, well-timed reminders go out automatically, so you never have to chase anyone for money.",
  },
  {
    title: "Customer questions answered instantly, even after hours",
    body: "Someone asking about hours, pricing, or availability at 9pm gets a real answer — not silence until morning.",
  },
];

const howItWorks = [
  {
    num: "01",
    title: "You share your customer list",
    body: "That's it. No new software to learn, no dashboards to set up.",
  },
  {
    num: "02",
    title: "We handle the follow-up",
    body: "Reviews, win-backs, invoice reminders, and questions — all running quietly in the background.",
  },
  {
    num: "03",
    title: "You see the results",
    body: "More reviews, more repeat customers, fewer unpaid invoices. You keep running your business.",
  },
];

function SunMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 150 96" fill="none" aria-hidden="true">
      <path pathLength={100} d="M17 70C36 63 55 59 75 59C95 59 114 63 133 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path pathLength={100} d="M52 58C52 45.3 62.3 35 75 35C87.7 35 98 45.3 98 58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path pathLength={100} d="M75 6V28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path pathLength={100} d="M48 15L60 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path pathLength={100} d="M102 15L90 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path pathLength={100} d="M27 35L48 47" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path pathLength={100} d="M123 35L102 47" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path pathLength={100} d="M16 56H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path pathLength={100} d="M110 56H134" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Brand() {
  return (
    <a href="#home" className="brand" aria-label="AdSolem home">
      <SunMark className="brand-mark" />
      <span>AdSolem</span>
    </a>
  );
}

function AmbientBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--scroll", `${window.scrollY}px`);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ambient" ref={ref} aria-hidden="true">
      <div className="orb orb-hero" />
      <div className="orb orb-mid" />
      <div className="orb orb-foot" />
    </div>
  );
}

function onCardTrack(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const { left, top } = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - left}px`);
  el.style.setProperty("--my", `${e.clientY - top}px`);
}

function Navbar() {
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Brand />
        <a href="mailto:aditya@adsolem.pro" className="pill-button">
          Say hello
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-inner section-grid">
        <p className="eyebrow reveal">Ad Solem · Towards the Sun</p>
        <h1 className="reveal reveal-d1">Keep the customers you already have</h1>
        <p className="hero-sub reveal reveal-d2">
          We handle reviews, win-backs, and follow-up for your customers — quietly, in the background, so you don&apos;t have to.
        </p>
        <p className="hero-who reveal reveal-d3">
          Built for restaurants, salons, gyms, clinics, and other local businesses with customers who come back.
        </p>
        <a href="mailto:aditya@adsolem.pro" className="glow-button reveal reveal-d4">
          Get a free first look
        </a>
      </div>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section id="what-we-do" className="section section-grid">
      <div className="section-heading reveal">
        <p className="eyebrow">What we do</p>
        <h2>The follow-up you never get around to. Handled.</h2>
      </div>
      <div className="what-grid">
        {whatWeDo.map((item, i) => (
          <article
            className={`what-card reveal reveal-d${(i % 4) + 1}`}
            key={item.title}
            onMouseMove={onCardTrack}
          >
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="section how-section">
      <div className="section-grid">
        <div className="section-heading reveal">
          <p className="eyebrow">How it works</p>
          <h2>Almost no effort on your end.</h2>
        </div>
        <div className="how-grid">
          {howItWorks.map((step, i) => (
            <div className={`how-step reveal reveal-d${i + 1}`} key={step.num}>
              <span className="how-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
        <p className="privacy-note reveal">
          Your customer list stays yours — we never share it, sell it, or use it for anything beyond what you asked us to do.
        </p>
      </div>
    </section>
  );
}

function FounderNote() {
  return (
    <section className="founder-section">
      <div className="section-grid">
        <p className="founder-note reveal">
          Hi, I&apos;m Aditya. I built this whole thing myself, mostly because I kept seeing the same dumb pattern: good businesses doing everything right, then losing customers who already liked them, just because nobody followed up. Felt like such an easy thing to fix that I went and built it.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-grid contact-inner reveal">
        <h2>Want a free first look at what this would catch for your business?</h2>
        <a href="mailto:aditya@adsolem.pro" className="glow-button">
          aditya@adsolem.pro
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="section-grid footer-inner">
        <Brand />
        <p>Copyright &copy; {new Date().getFullYear()} AdSolem. All rights reserved.</p>
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
      <AmbientBackdrop />
      <Navbar />
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <FounderNote />
      <Contact />
      <Footer />
    </main>
  );
}
