import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ArrowDown, X, Mail, Phone, MapPin, Info,
  FileText, Users, TrendingUp, ChevronDown, ChevronLeft, ChevronRight,
  Zap, Shield, Clock, BarChart2, Heart, Star, CheckCircle,
  AlertTriangle, Linkedin, Facebook, Twitter,
} from "lucide-react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import bgImage from "../imports/debora-pilati-dOG0z4-gqp0-unsplash_1.png";
import logoSrc from "../imports/Group_1171280047.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import msmeForge from "../imports/Forre-Logo_1.png";
import msmeFlashgard from "../imports/images__3__4.png";
import msmeApporchid from "../imports/img132_1.png";
import msmeXaqrotor from "../imports/logo_8.png";
import msmeOcean from "../imports/logo_ocean_1500pxW_1_1.png";
import msmeScratchgard from "../imports/Logo-2-e1715860301443_1.png";
import msmeQbic from "../imports/nuzrBBNFnrnekt4aoIu9UgHMz6m1735188281962_200x200_1.png";
import certSoc2 from "../imports/images-1.png";
import certIso27001 from "../imports/iso2001-logo-300x200-1.png";
import ingrainLogo from "../imports/ingrain-logo.jpg";

type ProductId = "invoice" | "ventures" | "startup";

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTION_W = "clamp(300px, 90%, 70vw)";
const AUTO = "0 auto";
const CARD_GAP = 28;
const CARD_WIDTH = "clamp(300px, 90%, 70vw)";
const CARD_MAX_WIDTH = 1120;
const CARD_MIN_WIDTH = 320;

// ─── Content ──────────────────────────────────────────────────────────────────

const products = {
  invoice: {
    title: "Karncy Financing",
    tagline: "Cash flow, unlocked from paper.",
    cta: "Let's unlock",
    description:
      "Turn outstanding receivables into immediate working capital — without waiting weeks for buyer settlement. We underwrite fast and deploy faster.",
    steps: [
      {
        title: "List Your Invoice",
        desc: "Upload outstanding invoices to our platform. We review and validate in hours, not days.",
        tooltip: "We accept all standard invoice formats — PDF, Excel, Tally XML, and direct ERP integrations (SAP, Zoho, etc.). Each invoice is instantly authenticated before entering the review queue. Multiple invoices from the same buyer can be bundled to speed up processing and improve advance rates.",
      },
      {
        title: "48-Hour Underwriting",
        desc: "Our risk team performs rapid underwriting — credit assessment, buyer profile, and invoice authenticity checks.",
        tooltip: "Our underwriting engine cross-references buyer creditworthiness using CIBIL commercial scores, GST return regularity, and historical payment behaviour from trade registry data. Invoice age, sector norms, and buyer concentration risk are all factored in. You receive a decision letter with a full risk summary within 48 hours of submission.",
      },
      {
        title: "Capital Deployed",
        desc: "Funds reach your account within 48 hours of approval. No equity dilution, no collateral, no delay.",
        tooltip: "Post-approval, disbursement instructions are raised within 2 hours and cleared via RTGS before the next business morning. The advance rate is typically 80–90% of invoice face value, net of platform fees. The remaining reserve is held in escrow until buyer settlement and returned automatically upon closure.",
      },
      {
        title: "Transaction Closes",
        desc: "When your buyer settles, the loop closes. Simple, clean, and fully repeatable.",
        tooltip: "Our reconciliation engine monitors the escrow account in real-time. When the buyer's payment lands, your reserve is released within 30 minutes — no manual action required. A full transaction summary including timeline, fees, and net receipts is auto-generated and permanently archived in your dashboard.",
      },
    ],
  },
  ventures: {
    title: "Karncy Ventures",
    tagline: "We don't fund and disappear. We build alongside you.",
    cta: "Let's venture",
    description:
      "Present capital, not silent capital. We enter as active partners — contributing expertise, networks, and operational muscle alongside financial resources.",
    steps: [
      {
        title: "Viability Assessment",
        desc: "We run a rigorous market, financial, and operational analysis. No assumptions — only evidence.",
        tooltip: "Our analysts spend 2–4 weeks on structured due diligence covering TAM and serviceable market size, unit economics stress-testing, competitive moat analysis, and founding team execution history. We do not use standardised scoring matrices — every assessment is built from scratch for your specific context and sector realities.",
      },
      {
        title: "Investor Syndication",
        desc: "We curate the right capital partners — strategic, patient, and aligned with your sector's realities.",
        tooltip: "Our LP and HNI network spans 18 sectors and is weighted toward patient, operationally-minded capital rather than return-first institutional funds. We brief each investor on your story before the first meeting so introductions are warm, not cold decks. Typical syndication closes within 6–10 weeks of viability sign-off.",
      },
      {
        title: "Tranche-Based Deployment",
        desc: "Capital releases against milestones. This protects both sides and builds accountability into the structure.",
        tooltip: "Capital is released in 2–4 tranches tied to pre-agreed operational milestones — revenue thresholds, hiring checkpoints, or product delivery dates. Each tranche is documented with a side letter, giving both parties clear accountability and reducing capital waste from premature full deployment.",
      },
      {
        title: "Operational Partnership",
        desc: "We embed — attending reviews, solving blockers, and actively connecting you to our network.",
        tooltip: "A named Karncy partner joins your monthly operations review as an active participant, not an observer. We attend board calls, assist with vendor negotiations, and open network doors proactively — not reactively. Our involvement is logged and can be reported to your investors or board on request.",
      },
    ],
  },
  startup: {
    title: "Karncy Equity",
    tagline: "Founders don't need money first. They need a partner first.",
    cta: "Let's partner",
    description:
      "Network, operations, compliance scaffolding — we build the foundation so founders can build the business. Capital follows once the structure is solid.",
    steps: [
      {
        title: "Deep Assessment",
        desc: "We spend real time understanding the founder, the market, and the business model — not just the pitch deck.",
        tooltip: "Our intake process includes a 2-week structured discovery covering market validation, financial model review, team dynamics, and competitive landscape. We supplement founder conversations with independent market research and reference checks. There is no standardised questionnaire — we adapt depth and focus to the complexity of each business.",
      },
      {
        title: "Aligned Investors",
        desc: "We introduce you to investors who understand your sector, your stage, and your ambition.",
        tooltip: "We maintain warm relationships with 80+ investors who have opted into our deal pipeline — ranging from angel-stage domain experts to Series A-ready institutional funds. Every introduction includes a detailed briefing note prepared by Karncy, ensuring the first meeting is substantive rather than a generic exploratory call.",
      },
      {
        title: "Operational Scaffolding",
        desc: "Compliance, GST, labor law, vendor networks — we remove friction so you can focus on growth.",
        tooltip: "We set up the full compliance stack from day one: company incorporation, GST registration, TDS and advance tax filings, labour law compliance, and a registered office where required. Our vendor network provides compliant payroll, legal retainers, and accounting at startup-appropriate pricing. Founders spend zero hours on regulatory overhead.",
      },
      {
        title: "Growth, Then Exit",
        desc: "We stay with you through scale, helping position for a strategic exit when the time is right.",
        tooltip: "When the business reaches exit readiness, we initiate a structured 12–18 month preparation process: financial clean-up, data room construction, normalised EBITDA presentation, and strategic buyer mapping. We run warm introductions to acquirers and PE/strategic investors in our network, and provide support through term sheet, due diligence, and close.",
      },
    ],
  },
};

const sections = [
  { id: "prologue", label: "Clarity" },
  { id: "compass", label: "Journey" },
  { id: "chapters", label: "Directions" },
  { id: "operations", label: "Operations" },
  { id: "why-karncy", label: "Why Karncy" },
  { id: "social-proof", label: "Partners" },
  { id: "horizon", label: "The Horizon" },
];

const productIcons: Record<ProductId, React.ReactNode> = {
  invoice: <FileText size={20} />,
  ventures: <Users size={20} />,
  startup: <TrendingUp size={20} />,
};

// ─── Testimonial data ──────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: "Partnering with Karncy has been one of our best investment decisions. The platform is seamless, transparent, and incredibly efficient. We've seen consistent returns and timely payouts, making it a reliable addition to our financial strategy. Karncy's team is professional and supportive, ensuring our experience is smooth from start to finish. Highly recommend it to anyone looking for smart, secure investment opportunities.",
    author: "Siva",
    role: "Manager",
    company: "Ingrain Systems Private Limited",
    photo: ingrainLogo,
    isLogo: true,
  },
  {
    quote: "Karncy unlocked working capital against our receivables within 48 hours. The process was cleaner than any bank we had approached in three years of trying.",
    author: "Rahul Mehta",
    role: "CFO",
    company: "PrecisionParts Manufacturing",
    photo: "https://images.unsplash.com/photo-1627401632925-a4c565d08a80?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=200&q=80",
  },
  {
    quote: "They didn't just bring capital to the joint venture — they brought structure, governance, and a network we couldn't have built on our own in three years.",
    author: "Divya Krishnan",
    role: "Founder",
    company: "LogiScale Ventures",
    photo: "https://images.unsplash.com/flagged/photo-1570607008863-da87b9deefa7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=200&q=80",
  },
  {
    quote: "From compliance setup to investor introductions, Karncy handled everything we didn't have time to. We closed our first funding round six months after onboarding.",
    author: "Arjun Shetty",
    role: "Co-founder",
    company: "NovaTech Solutions",
    photo: "https://images.unsplash.com/photo-1771244670407-42e9585ab333?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=200&q=80",
  },
  {
    quote: "The tranche-based deployment model gave our board confidence that capital would be used responsibly. Karncy's monthly reporting is better than what most listed companies produce.",
    author: "Priya Nambiar",
    role: "Managing Director",
    company: "GreenLine Logistics",
    photo: "https://images.unsplash.com/photo-1729157661483-ed21901ed892?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=200&q=80",
  },
  {
    quote: "As an investor, the deal flow from Karncy is genuinely curated — every opportunity comes with a thorough brief. It's not a shotgun approach. I trust the process.",
    author: "Vikram Rao",
    role: "HNI Investor",
    company: "Independent Capital",
    photo: "https://images.unsplash.com/photo-1623662346414-af98877cab19?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=200&q=80",
  },
];

// ─── Partner logos data ────────────────────────────────────────────────────────

const msmeLogos: { src: string; name: string }[] = [
  { src: msmeForge, name: "Forre" },
  { src: msmeFlashgard, name: "Flashgard" },
  { src: msmeApporchid, name: "Apporchid" },
  { src: msmeXaqrotor, name: "Xaqrotor Tek" },
  { src: msmeOcean, name: "Ocean" },
  { src: msmeScratchgard, name: "Scratchgard" },
  { src: msmeQbic, name: "Qbic Materials" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function useActiveSection() {
  const [active, setActive] = useState("prologue");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const threshold = id === "chapters" ? 0.04 : 0.18;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);
  return active;
}

// ─── CountUp ──────────────────────────────────────────────────────────────────

function CountUp({ to, prefix = "", suffix = "", duration = 1.8 }: {
  to: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [val, setVal] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / (duration * 1000), 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={spanRef}>{prefix}{val}{suffix}</span>;
}

// ─── FadeUp ───────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "", style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────

function ScrollProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setP(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <motion.div
      style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: "var(--primary)", transformOrigin: "left", zIndex: 100 }}
      animate={{ scaleX: p }}
      transition={{ duration: 0.08, ease: "linear" }}
    />
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tip({ content }: { content: string }) {
  return (
    <TooltipPrimitive.Provider delayDuration={100}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <button
            type="button"
            style={{ display: "inline-flex", alignItems: "center", color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)")}
          >
            <Info size={12} />
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="top" sideOffset={6}
            style={{ zIndex: 300, maxWidth: "300px", padding: "0.75rem 1rem", fontSize: "0.75rem", lineHeight: 1.55, boxShadow: "0 4px 20px rgba(20,20,43,0.14)", background: "var(--foreground)", color: "var(--background)", borderRadius: "calc(var(--radius) * 1.2)", fontFamily: "var(--font-sans)" }}
          >
            {content}
            <TooltipPrimitive.Arrow style={{ fill: "var(--foreground)" }} width={10} height={5} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

// ─── Right scroll nav ─────────────────────────────────────────────────────────

function ScrollNav({ active }: { active: string }) {
  const [barHeights, setBarHeights] = useState<Record<string, number>>({});
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const measure = () => {
      const raw: Record<string, number> = {};
      let total = 0;
      sections.forEach(({ id }) => {
        const h = document.getElementById(id)?.offsetHeight ?? window.innerHeight;
        raw[id] = h;
        total += h;
      });
      const scale = 320 / total;
      const result: Record<string, number> = {};
      sections.forEach(({ id }) => { result[id] = Math.max(16, Math.round(raw[id] * scale)); });
      setBarHeights(result);
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", measure); };
  }, []);

  return (
    <nav aria-label="Section navigation" className="hidden lg:block" style={{ position: "fixed", right: "2rem", top: "50%", transform: "translateY(-50%)", zIndex: 50 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", alignItems: "flex-end" }}>
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          const barH = barHeights[id] ?? 40;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label}`}
              style={{ display: "flex", alignItems: "center", gap: "0.875rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: isActive ? 600 : 400, color: isActive ? "var(--foreground)" : "var(--muted-foreground)", whiteSpace: "nowrap", transition: "color 0.22s", opacity: isActive ? 1 : 0.55 }}>
                {label}
              </span>
              <motion.div
                animate={{ background: isActive ? "var(--cta)" : "rgba(20,20,43,0.12)" }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                style={{ width: "3px", height: `${barH}px`, borderRadius: "2px", flexShrink: 0 }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function Ticker() {
  const items = ["Invoice Financing", "Joint Ventures", "Startup Partnerships", "48-Hour Underwriting", "SME Growth", "Embedded Partners", "India's Next Enterprises"];
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", display: "flex", alignItems: "center", width: "100%" }}>
      <motion.div
        style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--font-sans)", fontSize: "0.67rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--muted-foreground)", padding: "0 2.25rem", whiteSpace: "nowrap" }}>
            {item}
            <span style={{ marginLeft: "2.25rem", width: "3px", height: "3px", borderRadius: "50%", background: "rgba(107,114,128,0.35)", display: "inline-block", flexShrink: 0 }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Testimonial Carousel ──────────────────────────────────────────────────────

function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const total = testimonials.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  const t = testimonials[idx];

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="testimonial-card"
          style={{ background: "rgba(255,255,255,0.97)", border: "1px solid var(--border)", borderRadius: "calc(var(--radius) * 2)", padding: "clamp(1.5rem, 5vw, 2.75rem) clamp(1.25rem, 4vw, 3rem)" }}
        >
          {/* Photo / Logo */}
          <div className="testimonial-photo" style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "3px solid var(--border)", background: "#ffffff", padding: (t as any).isLogo ? "0.6rem" : 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src={t.photo}
              alt={t.author}
              style={{ width: "100%", height: "100%", objectFit: (t as any).isLogo ? "contain" : "cover" }}
            />
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontStyle: "italic", color: "var(--foreground)", lineHeight: 1.72, marginBottom: "1.5rem" }}>
              "{t.quote}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "0.875rem", fontWeight: 700, color: "var(--foreground)" }}>{t.author}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted-foreground)", marginTop: "0.15rem" }}>
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.75rem", justifyContent: "space-between" }}>
        {/* Dots */}
        <div style={{ display: "flex", gap: "0.45rem", alignItems: "center" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{ width: i === idx ? "24px" : "6px", height: "6px", borderRadius: "9999px", background: i === idx ? "var(--cta)" : "rgba(20,20,43,0.18)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.3s ease, background 0.3s ease" }}
            />
          ))}
        </div>
        {/* Arrows */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={prev}
            style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "1px solid var(--border)", background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--foreground)", transition: "background 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--muted)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--card)")}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "1px solid var(--border)", background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--foreground)", transition: "background 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--muted)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--card)")}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MSME Empowered marquee ────────────────────────────────────────────────────

function MsmeMarquee() {
  const half = Math.ceil(msmeLogos.length / 2);
  const row1Logos = msmeLogos.slice(0, half);
  const row2Logos = msmeLogos.slice(half);

  const row1 = [...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos];
  const row2 = [...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos];

  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100%", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Fade edges */}
      <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "clamp(2rem, 8vw, 6rem)", background: "linear-gradient(to right, var(--background), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "clamp(2rem, 8vw, 6rem)", background: "linear-gradient(to left, var(--background), transparent)", zIndex: 2, pointerEvents: "none" }} />

      {/* Row 1 */}
      <motion.div
        style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexShrink: 0 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        {row1.map((logo, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              background: "#ffffff",
              border: "1px solid var(--border)",
              borderRadius: "calc(var(--radius) * 1.5)",
              padding: "1rem 2.25rem",
              height: "clamp(80px, 14vw, 115px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "clamp(180px, 34vw, 270px)",
            }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              style={{ maxHeight: "clamp(48px, 8vw, 72px)", maxWidth: "clamp(140px, 26vw, 210px)", objectFit: "contain", display: "block" }}
            />
          </div>
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div
        style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexShrink: 0 }}
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {row2.map((logo, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              background: "#ffffff",
              border: "1px solid var(--border)",
              borderRadius: "calc(var(--radius) * 1.5)",
              padding: "1rem 2.25rem",
              height: "clamp(80px, 14vw, 115px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "clamp(180px, 34vw, 270px)",
            }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              style={{ maxHeight: "clamp(48px, 8vw, 72px)", maxWidth: "clamp(140px, 26vw, 210px)", objectFit: "contain", display: "block" }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Chapter card ─────────────────────────────────────────────────────────────

function ChapterCard({
  productId,
  onExplore,
  isActive,
  cardWidth,
}: {
  productId: ProductId;
  onExplore: () => void;
  isActive: boolean;
  cardWidth: string;
}) {


  const product = products[productId];
  const idx = (["invoice", "ventures", "startup"] as ProductId[]).indexOf(productId) + 1;

  return (
    <motion.div

      style={{
        width: cardWidth,
        minWidth: cardWidth,
        maxWidth: cardWidth,
        flexShrink: 0,
        borderRadius: "calc(var(--radius) * 3)",
        border: "1px solid rgba(255,255,255,0.55)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
      }}

      animate={{ opacity: isActive ? 1 : 0.38, scale: isActive ? 1 : 0.92, y: isActive ? 0 : 18, boxShadow: isActive ? "0 24px 72px rgba(30,58,95,0.18), 0 2px 12px rgba(20,20,43,0.06)" : "0 2px 20px rgba(30,58,95,0.07)" }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{ background: "var(--primary)", padding: "clamp(2rem, 5vw, 4.4rem) clamp(1.5rem, 4vw, 3rem)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", bottom: "2rem", right: "2rem", color: "rgba(255,255,255,0.07)", userSelect: "none", pointerEvents: "none" }}>
          <span style={{ display: "block", transform: "scale(4)", transformOrigin: "bottom right" }}>{productIcons[productId]}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "auto" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.67rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            {String(idx).padStart(2, "0")} / 03
          </span>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "2.25rem", height: "2.25rem", borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}>
            {productIcons[productId]}
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 1, marginTop: "2.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 2.2vw, 2.1rem)", fontWeight: 700, color: "var(--primary-foreground)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "0.75rem" }}>
            {product.title}
          </h3>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", fontStyle: "italic", lineHeight: 1.5, marginBottom: "2.75rem" }}>
            {product.tagline}
          </p>
          <button
            onClick={onExplore}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600, padding: "0.75rem 1.75rem", borderRadius: "9999px", border: "1.5px solid rgba(255,255,255,0.5)", color: "var(--primary-foreground)", background: "rgba(255,255,255,0.1)", cursor: "pointer", transition: "background 0.18s, border-color 0.18s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.22)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.8)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.5)"; }}
          >
            {product.cta} <ArrowDown size={14} />
          </button>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(10px)", padding: "clamp(2rem, 5vw, 4.4rem) clamp(1.5rem, 4vw, 3.5rem)", display: "flex", flexDirection: "column" }}>
        <p className="mobile-hide-desc" style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--muted-foreground)", lineHeight: 1.72, marginBottom: "2rem" }}>{product.description}</p>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.4rem" }}>
          {product.steps.map((step, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.75rem 1fr", gap: "0.875rem", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.67rem", color: "var(--primary)", paddingTop: "0.2rem", fontWeight: 600, opacity: 0.65 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.2rem" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--foreground)" }}>{step.title}</span>
                  <Tip content={step.tooltip} />
                </div>
                <p className="mobile-hide-desc" style={{ fontFamily: "var(--font-sans)", fontSize: "0.79rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Sticky horizontal chapters — per-card wheel snap ────────────────────────

function ChaptersScroll({ onOpen }: { onOpen: (id: ProductId) => void }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  // Always-current refs — never stale inside event handlers
  const activeCardRef = useRef(0);
  const throttleRef = useRef(false);
  const ids: ProductId[] = ["invoice", "ventures", "startup"];
  const NUM = ids.length;
  const CARD_GAP = 28;
  const CARD_WIDTH = "clamp(320px, 75vw, 1120px)";

  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cardWidth = CARD_WIDTH;



  //const LEAD = "0px";

  // True while the sticky panel is pinned (generous tolerance for subpixels)
  const isSectionPinned = useCallback((): boolean => {
    const el = outerRef.current;
    if (!el) return false;
    const { top, bottom } = el.getBoundingClientRect();
    return top <= 4 && bottom >= window.innerHeight - 4;
  }, []);

  // Absolute scrollY that centers cardIdx in the sticky panel
  const cardScrollY = useCallback((cardIdx: number): number => {
    const el = outerRef.current;
    if (!el) return 0;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    return sectionTop + (NUM > 1 ? (cardIdx / (NUM - 1)) * range : 0);
  }, [NUM]);

  const goToCard = useCallback((idx: number) => {
    activeCardRef.current = idx;
    setActiveCard(idx);
    window.scrollTo({ top: cardScrollY(idx), behavior: "smooth" });
  }, [cardScrollY]);

  // ── Wheel interception ────────────────────────────────────────────────────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!isSectionPinned()) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const curr = activeCardRef.current;

      // When at boundary (last card scrolling down or first card scrolling up),
      // do not prevent default — let native page scroll carry the user smoothly.
      if ((dir > 0 && curr >= NUM - 1) || (dir < 0 && curr <= 0)) {
        return;
      }

      e.preventDefault();

      if (throttleRef.current) return;
      throttleRef.current = true;
      setTimeout(() => { throttleRef.current = false; }, 500);

      const next = curr + dir;
      if (next >= 0 && next < NUM) {
        goToCard(next);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isSectionPinned, goToCard, NUM]);

  // ── Keep card state in sync for touch / keyboard / dot-clicks ────────────
  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const range = el.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const progress = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / range));
      const card = Math.round(progress * (NUM - 1));
      if (card !== activeCardRef.current) {
        activeCardRef.current = card;
        setActiveCard(card);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [NUM]);

  return (
    <div ref={outerRef} id="chapters" style={{ height: `${NUM * 100}vh`, position: "relative" }}>
      <div
        style={{
          position: "sticky", top: 0, height: "100vh",
          overflow: "hidden", background: "transparent",
        }}
      >
        {/* Section header */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "2.5rem 0 1.25rem", zIndex: 2 }}>
          <div style={{ width: SECTION_W, margin: AUTO }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
              <div style={{ width: "1.5rem", height: "1px", background: "var(--primary)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.67rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>03</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
              Our Products
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: "0.35rem", fontWeight: 600, margin: 0 }}>
              Scroll to View <ArrowDown size={14} style={{ color: "var(--cta)" }} />
            </p>
          </div>
        </div>

        {/* Container: left:15vw clips the left bleed; overflow:hidden+flex centers strip vertically */}
        <div
          style={{
            position: "absolute",
            top: "7rem",
            bottom: "4rem",
            left: 0,
            right: 0,
            width: "100%",
            margin: 0,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >


          <div
            style={{
              display: "flex",
              gap: `${CARD_GAP}px`,
              width: "max-content",
              flexShrink: 0,
              transform: `translateX(
      calc(
        50vw -
        (${cardWidth} / 2) -
        ${activeCard} * (${cardWidth} + ${CARD_GAP}px)
      )
    )`,
              transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >





            {ids.map((pid, i) => (
              <ChapterCard
                key={pid}
                productId={pid}
                onExplore={() => onOpen(pid)}
                isActive={activeCard === i}
                cardWidth={cardWidth}
              />


            ))}
          </div>
        </div>

        {/* Dot indicators — also clickable for direct navigation */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem 0 2rem", zIndex: 2 }}>
          <div style={{ width: SECTION_W, margin: AUTO, display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {ids.map((_, i) => (
              <button
                key={i}
                onClick={() => goToCard(i)}
                aria-label={`Go to card ${i + 1}`}
                style={{
                  height: "4px", borderRadius: "9999px",
                  width: i === activeCard ? "28px" : "4px",
                  background: i === activeCard ? "var(--cta)" : "rgba(30,58,95,0.18)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "width 0.32s ease, background 0.32s ease",
                }}
              />
            ))}
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.67rem", color: "var(--muted-foreground)", marginLeft: "0.75rem" }}>
              {activeCard + 1} / {NUM}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product detail overlay ────────────────────────────────────────────────────

function ProductDetailOverlay({ id, onClose, onOpenContact }: { id: ProductId; onClose: () => void; onOpenContact: (type: ModalType) => void }) {
  const product = products[id];
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", background: "rgba(20,20,43,0.5)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", maxWidth: "54rem", maxHeight: "90vh", overflowY: "auto", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 20, width: "2.1rem", height: "2.1rem", borderRadius: "50%", border: "1px solid var(--border)", background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--muted-foreground)" }}>
          <X size={13} />
        </button>
        <div style={{ background: "var(--card)", borderBottom: "1px solid var(--border)", padding: "1.25rem 2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "var(--foreground)" }}>{product.title}</h2>
        </div>
        <div style={{ padding: "2.25rem 2rem" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontWeight: 700, fontStyle: "italic", color: "var(--primary)", marginBottom: "1rem", lineHeight: 1.2 }}>"{product.tagline}"</p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.72, marginBottom: "1.75rem" }}>{product.description}</p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.67rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "1.1rem" }}>The Process</p>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 17, top: 22, bottom: 22, width: 1, background: "var(--border)" }} />
            {product.steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.06 }}
                style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", paddingBottom: i < product.steps.length - 1 ? "1.5rem" : 0 }}>
                <div style={{ position: "relative", zIndex: 1, width: "2.1rem", height: "2.1rem", borderRadius: "50%", border: "1px solid var(--border)", background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--font-sans)", fontSize: "0.67rem", color: "var(--primary)" }}>
                  {i + 1}
                </div>
                <div style={{ paddingTop: "0.3rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.2rem" }}>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)" }}>{step.title}</h4>
                    <Tip content={step.tooltip} />
                  </div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: "2.25rem", paddingTop: "1.75rem", borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => {
                onClose();
                onOpenContact(id === "invoice" ? "funding" : "business");
              }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 600, padding: "0.875rem 2.25rem", background: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)", border: "none", cursor: "pointer" }}
            >
              {product.cta} <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Quick links sub-menu ─────────────────────────────────────────────────────

function QuickLinksMenu({ onSelectProduct }: { onSelectProduct?: (pid: ProductId) => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const items: { label: string; pid?: ProductId; href?: string }[] = [
    { label: "Karncy Financing", pid: "invoice" },
    { label: "Karncy Ventures", pid: "ventures" },
    { label: "Karncy Equity", pid: "startup" },
    { label: "Risk Disclosure policy", href: "https://karncy.com/privacy-policy/" },
    { label: "Blog", href: "https://karncy.com/blogs/" },
    { label: "Careers", href: "https://karncy.com/careers/" },
  ];

  return (
    <div ref={menuRef} style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          fontFamily: "var(--font-sans)",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "#0f172a",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          lineHeight: 1,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--primary)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#0f172a")}
      >
        Quick links
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "inline-flex", alignItems: "center" }}>
          <ChevronDown size={14} style={{ color: "currentColor" }} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 0.5rem)",
              left: 0,
              background: "#ffffff",
              border: "1px solid var(--border)",
              borderRadius: "calc(var(--radius) * 1.2)",
              padding: "0.6rem 0.85rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              boxShadow: "0 10px 30px rgba(15,23,42,0.15)",
              zIndex: 60,
              minWidth: "200px",
              whiteSpace: "nowrap",
            }}
          >
            {items.map((item) => (
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "#334155",
                    textDecoration: "none",
                    padding: "0.25rem 0.35rem",
                    borderRadius: "var(--radius)",
                    transition: "background 0.15s, color 0.15s",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    const a = e.currentTarget as HTMLAnchorElement;
                    a.style.color = "var(--primary)";
                    a.style.background = "rgba(13,31,130,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    const a = e.currentTarget as HTMLAnchorElement;
                    a.style.color = "#334155";
                    a.style.background = "transparent";
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    if (item.pid && onSelectProduct) {
                      onSelectProduct(item.pid);
                    }
                  }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "#334155",
                    background: "none",
                    border: "none",
                    padding: "0.25rem 0.35rem",
                    textAlign: "left",
                    cursor: "pointer",
                    borderRadius: "var(--radius)",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.color = "var(--primary)";
                    btn.style.background = "rgba(13,31,130,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.color = "#334155";
                    btn.style.background = "transparent";
                  }}
                >
                  {item.label}
                </button>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Contact Form Modal ───────────────────────────────────────────────────────

type ModalType = "funding" | "business";

function ContactModal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    phone: "",
    companyName: "",
    fundingRequirement: "₹25L–₹50L",
    howCanWeHelp: "Business Funding",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isFunding = type === "funding";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(15,23,42,0.65)",
        backdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          maxWidth: "30rem",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "calc(var(--radius) * 1.2)",
          position: "relative",
          boxShadow: "0 24px 64px rgba(15,23,42,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            zIndex: 10,
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--muted-foreground)",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "#e2e8f0";
            btn.style.color = "#0f172a";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "#f8fafc";
            btn.style.color = "var(--muted-foreground)";
          }}
        >
          <X size={14} />
        </button>

        {/* Modal Header */}
        <div style={{ padding: "1.75rem 2rem 1.25rem", borderBottom: "1px solid var(--border)", background: isFunding ? "rgba(255,105,0,0.03)" : "rgba(13,31,130,0.03)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: isFunding ? "var(--cta)" : "var(--primary)" }}>
              {isFunding ? "Fast 48-Hour Approval" : "Karncy Business Network"}
            </span>
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>
            {isFunding ? "Apply for Funding" : "Apply for Business"}
          </h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem", lineHeight: 1.5 }}>
            {isFunding
              ? "Tell us about your business to get working capital unlocked in 48 hours."
              : "Let's explore growth, joint venture, or investment opportunities together."}
          </p>
        </div>

        {/* Modal Body / Form */}
        <div style={{ padding: "1.5rem 2rem 2rem" }}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: "center", padding: "1.5rem 0" }}
            >
              <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", background: "rgba(22,163,74,0.12)", color: "#16a34a", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <CheckCircle size={28} />
              </div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>
                Application Received!
              </h4>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "#475569", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                Thank you, <strong>{formData.fullName}</strong>. Our team will review <strong>{formData.companyName}</strong>'s request and contact you at <strong>{formData.workEmail}</strong> within 24 hours.
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  padding: "0.8rem 2rem",
                  background: "#0f172a",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "calc(var(--radius) * 0.7)",
                  cursor: "pointer",
                }}
              >
                Close Window
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {/* Full Name */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                  Full Name <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    color: "#0f172a",
                    background: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    borderRadius: "calc(var(--radius) * 0.7)",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Work Email */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                  Work Email <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    color: "#0f172a",
                    background: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    borderRadius: "calc(var(--radius) * 0.7)",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                  Phone Number <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    color: "#0f172a",
                    background: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    borderRadius: "calc(var(--radius) * 0.7)",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Business / Company Name */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                  Business / Company Name <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Enterprises Pvt Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    color: "#0f172a",
                    background: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    borderRadius: "calc(var(--radius) * 0.7)",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Dropdown Field */}
              {isFunding ? (
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                    Funding Requirement <span style={{ color: "#e11d48" }}>*</span>
                  </label>
                  <select
                    required
                    value={formData.fundingRequirement}
                    onChange={(e) => setFormData({ ...formData, fundingRequirement: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.7rem 2.25rem 0.7rem 0.9rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9rem",
                      color: "#0f172a",
                      background: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "calc(var(--radius) * 0.7)",
                      outline: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <option value="₹5L–₹25L">₹5L–₹25L</option>
                    <option value="₹25L–₹50L">₹25L–₹50L</option>
                    <option value="₹50L–₹1Cr">₹50L–₹1Cr</option>
                    <option value="₹1Cr–₹5Cr">₹1Cr–₹5Cr</option>
                    <option value="₹5Cr+">₹5Cr+</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                    How can we help? <span style={{ color: "#e11d48" }}>*</span>
                  </label>
                  <select
                    required
                    value={formData.howCanWeHelp}
                    onChange={(e) => setFormData({ ...formData, howCanWeHelp: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.7rem 2.25rem 0.7rem 0.9rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9rem",
                      color: "#0f172a",
                      background: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: "calc(var(--radius) * 0.7)",
                      outline: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Business Funding">Business Funding</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Joint Venture">Joint Venture</option>
                    <option value="Investment">Investment</option>
                    <option value="Invoice Financing">Invoice Financing</option>
                  </select>
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                style={{
                  marginTop: "0.5rem",
                  width: "100%",
                  padding: "0.85rem 1.5rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: isFunding ? "var(--cta-foreground)" : "#ffffff",
                  background: isFunding ? "var(--cta)" : "var(--primary)",
                  border: "none",
                  borderRadius: "calc(var(--radius) * 0.7)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: isFunding ? "0 4px 14px rgba(255,105,0,0.25)" : "0 4px 14px rgba(13,31,130,0.25)",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.92")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              >
                {isFunding ? "Request Funding" : "Connect With Us"} <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section label helper ─────────────────────────────────────────────────────

function SectionLabel({ n }: { n: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
      <div style={{ width: "1.5rem", height: "1px", background: "var(--primary)" }} />
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.67rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>{n}</span>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeProduct, setActiveProduct] = useState<ProductId | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const activeSection = useActiveSection();

  useEffect(() => {
    document.body.style.overflow = (activeProduct || activeModal) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProduct, activeModal]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const scrollToChapterCard = (pid: ProductId) => {
    setActiveProduct(pid);
    const el = document.getElementById("chapters");
    if (!el) return;
    const cardIdx = (["invoice", "ventures", "startup"] as ProductId[]).indexOf(pid);
    const NUM = 3;
    const rect = el.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const targetY = sectionTop + (NUM > 1 ? (cardIdx / (NUM - 1)) * range : 0) + (cardIdx > 0 ? 30 : 5);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const sectionBase: React.CSSProperties = { padding: "7rem 0" };

  // Why Choose Karncy reasons
  const whyReasons = [
    { icon: <Zap size={18} />, title: "Technology-Driven Platform", desc: "Our proprietary underwriting engine and real-time dashboards remove manual delays from every step." },
    { icon: <Clock size={18} />, title: "Faster Approvals", desc: "48-hour underwriting and same-day disbursement. No queues, no ambiguity." },
    { icon: <CheckCircle size={18} />, title: "Transparent Process", desc: "Every decision, fee, and milestone is documented and shared in real time. No hidden charges." },
    { icon: <Star size={18} />, title: "Experienced Management", desc: "Led by finance professionals with decades of combined experience in Indian credit markets." },
    { icon: <BarChart2 size={18} />, title: "Strong Credit Assessment", desc: "Multi-layer risk evaluation using CIBIL scores, GST regularity, and sectoral data." },
  ];

  return (
    <div
      style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)", minHeight: "100vh", overflowX: "clip", position: "relative", backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "rgba(255,252,248,0.75)" }} />

      <ScrollProgressBar />
      <ScrollNav active={activeSection} />

      <main style={{ position: "relative", zIndex: 10 }}>

        {/* Logo — fixed on desktop, 5% left margin on mobile */}
        <div className="site-logo">
          <ImageWithFallback src={logoSrc} alt="Karncy" style={{ height: "3rem", width: "auto", objectFit: "contain" }} />
        </div>

        {/* ─── Prologue ─────────────────────────────────────────────────── */}
        <section id="prologue" style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", width: SECTION_W, margin: AUTO, paddingTop: "7rem", paddingBottom: "6rem", position: "relative", zIndex: 1 }}>
            <FadeUp>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "3rem" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--primary)" }}>
                  Karncy — Your Growth Partner
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="hero-title" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 5.5rem)", fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.03em", color: "var(--foreground)", marginBottom: "2.5rem" }}>
                <span style={{ display: "block" }}>Capital is the easy part.</span>
                <span style={{ display: "block", color: "var(--primary)" }}>The journey is the real work.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "3rem", maxWidth: "32rem" }}>
                <div style={{ width: "2px", background: "var(--border)", alignSelf: "stretch", flexShrink: 0, borderRadius: "9999px" }} />
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.08rem", color: "var(--muted-foreground)", lineHeight: 1.76 }}>
                  Embedded financial partner for Indian SMEs — invoice financing, joint ventures, and startup growth.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "36rem" }}>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                  <button onClick={() => setActiveModal("funding")} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 700, padding: "0.9rem 2rem", background: "var(--cta)", color: "var(--cta-foreground)", borderRadius: "var(--radius)", border: "none", cursor: "pointer", letterSpacing: "0.01em" }}>
                    Apply for Funding <ArrowRight size={15} />
                  </button>
                  <button onClick={() => setActiveModal("business")} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 700, padding: "0.9rem 2rem", background: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)", border: "none", cursor: "pointer", letterSpacing: "0.01em" }}>
                    Apply for Business <ArrowRight size={15} />
                  </button>
                </div>
                <button onClick={() => scrollTo("compass")} style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600, color: "var(--foreground)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "4px", textAlign: "left", padding: 0 }}>
                  Begin the journey instead →
                </button>
              </div>
            </FadeUp>
          </div>
          {/* Marquee — full width, no section padding */}
          <div style={{ position: "relative", zIndex: 6, height: "3rem", display: "flex", alignItems: "center", overflow: "hidden", background: "transparent" }}>
            <Ticker />
          </div>
        </section>

        {/* ─── Dual Audience ────────────────────────────────────────────── */}
        <section style={{ padding: "5rem 0" }}>
          <div style={{ width: SECTION_W, margin: AUTO }}>
            <FadeUp>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.9rem, 1.5vw, 1.25rem)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "2rem" }}>
                Who are you here for?
              </p>
            </FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "1.5rem" }}>

              {/* Business card — white background */}
              <FadeUp delay={0.05}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(13,31,130,0.1)" }}
                  transition={{ duration: 0.24 }}
                  style={{ background: "#ffffff", border: "1px solid var(--border)", borderRadius: "calc(var(--radius) * 2)", padding: "3rem 2.5rem", display: "flex", flexDirection: "column", gap: "1rem", height: "100%", boxSizing: "border-box" }}
                >
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "3rem", height: "3rem", borderRadius: "calc(var(--radius) * 1.5)", background: "rgba(255,105,0,0.1)", color: "var(--cta)", marginBottom: "0.25rem" }}>
                    <TrendingUp size={20} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                    For Businesses
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.98rem", color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                    Access invoice financing, joint venture capital, and operational support tailored to Indian SMEs.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem", marginTop: "0.5rem" }}>
                    {[
                      { text: "Karncy Financing — 48-hr turnaround", pid: "invoice" as const },
                      { text: "Karncy Ventures — active capital partners", pid: "ventures" as const },
                      { text: "Karncy Equity — idea to exit", pid: "startup" as const },
                      { text: "Compliance and operational scaffolding", pid: "invoice" as const },
                    ].map((item) => (
                      <li
                        key={item.text}
                        onClick={() => scrollToChapterCard(item.pid)}
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--muted-foreground)", cursor: "pointer", transition: "color 0.15s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLLIElement).style.color = "var(--foreground)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLLIElement).style.color = "var(--muted-foreground)")}
                      >
                        <span style={{ color: "var(--cta)", flexShrink: 0 }}>→</span> {item.text}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollToChapterCard("invoice")} style={{ marginTop: "1.25rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 700, padding: "0.75rem 1.75rem", background: "var(--cta)", color: "var(--cta-foreground)", borderRadius: "var(--radius)", border: "none", cursor: "pointer", alignSelf: "flex-start" }}>
                    Apply for Funding <ArrowRight size={14} />
                  </button>
                </motion.div>
              </FadeUp>

              {/* Investor card — white */}
              <FadeUp delay={0.1}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(13,31,130,0.1)" }}
                  transition={{ duration: 0.24 }}
                  style={{ background: "#ffffff", border: "1px solid var(--border)", borderRadius: "calc(var(--radius) * 2)", padding: "3rem 2.5rem", display: "flex", flexDirection: "column", gap: "1rem", height: "100%", boxSizing: "border-box" }}
                >
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "3rem", height: "3rem", borderRadius: "calc(var(--radius) * 1.5)", background: "rgba(13,31,130,0.08)", color: "var(--primary)", marginBottom: "0.25rem" }}>
                    <BarChart2 size={20} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                    For Investors
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.98rem", color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                    Deploy capital into curated, underwritten SME deals with structured milestones and active oversight.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem", marginTop: "0.5rem" }}>
                    {[
                      { text: "Curated deal flow — pre-screened opportunities", pid: "ventures" as const },
                      { text: "Tranche-based deployment — milestone-protected", pid: "ventures" as const },
                      { text: "Monthly MIS and board-ready reporting", pid: "ventures" as const },
                      { text: "Returns (ROI) tracked in real-time dashboards", pid: "ventures" as const },
                    ].map((item) => (
                      <li
                        key={item.text}
                        onClick={() => scrollToChapterCard(item.pid)}
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--muted-foreground)", cursor: "pointer", transition: "color 0.15s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLLIElement).style.color = "var(--foreground)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLLIElement).style.color = "var(--muted-foreground)")}
                      >
                        <span style={{ color: "var(--primary)", flexShrink: 0 }}>→</span> {item.text}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollToChapterCard("ventures")} style={{ marginTop: "1.25rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 700, padding: "0.75rem 1.75rem", background: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)", border: "none", cursor: "pointer", alignSelf: "flex-start" }}>
                    Apply for Business <ArrowRight size={14} />
                  </button>
                </motion.div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ─── Compass ─────────────────────────────────────────────────── */}
        <section id="compass" style={sectionBase}>
          <div style={{ width: SECTION_W, margin: AUTO }}>
            <div style={{ marginBottom: "3.5rem" }}>
              <FadeUp>
                <div style={{ marginBottom: "1.25rem" }}>
                  <SectionLabel n="02" />
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--foreground)", lineHeight: 1.04, marginBottom: 0 }}>
                    Three doors open from here.
                  </h2>
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.08rem", color: "var(--muted-foreground)", lineHeight: 1.72 }}>
                  Each one is its own journey. Choose where you are or let the page carry you through all three.
                </p>
              </FadeUp>
            </div>

            <div style={{ border: "1px solid var(--border)", borderRadius: "calc(var(--radius) * 2)", overflow: "hidden", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
              {(["invoice", "ventures", "startup"] as const).map((pid, i) => {
                const p = products[pid];
                return (
                    <motion.div
                      key={pid}
                      onClick={() => scrollToChapterCard(pid)}
                      whileHover={{ backgroundColor: "rgba(255,105,0,0.03)" }}
                      transition={{ duration: 0.2 }}
                      style={{ width: "100%", height: "100%", textAlign: "left", padding: "4rem 2.25rem", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)", borderRight: i < 2 ? "1px solid var(--border)" : "none", cursor: "pointer", display: "flex", flexDirection: "column", boxSizing: "border-box" }}
                    >
                      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "2.75rem", height: "2.75rem", borderRadius: "calc(var(--radius) * 1.5)", background: "rgba(255,105,0,0.1)", color: "var(--cta)", marginBottom: "1.75rem" }}>
                        {productIcons[pid]}
                      </div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.45rem", letterSpacing: "-0.02em" }}>
                        {p.title}
                      </h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.81rem", color: "var(--muted-foreground)", lineHeight: 1.65, flex: 1, marginBottom: "2rem" }}>
                        {p.tagline}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToChapterCard(pid);
                        }}
                        style={{ border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 700, color: "var(--cta-foreground)", fontFamily: "var(--font-sans)", background: "var(--cta)", padding: "0.6rem 1.4rem", borderRadius: "var(--radius)", alignSelf: "flex-start", transition: "transform 0.15s ease" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)")}
                      >
                        {p.cta} <ArrowRight size={13} />
                      </button>
                    </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Our Products (sticky scroll) ────────────────────────────── */}
        <ChaptersScroll onOpen={(id) => setActiveProduct(id)} />

        {/* ─── Operations ──────────────────────────────────────────────── */}
        <section id="operations" style={sectionBase}>
          <div style={{ width: SECTION_W, margin: AUTO }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem", alignItems: "flex-end", marginBottom: "3.5rem" }}>
              <FadeUp>
                <div>
                  <SectionLabel n="04" />
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--foreground)", lineHeight: 1.04, marginBottom: 0 }}>
                    Beyond capital.
                  </h2>
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.08rem", color: "var(--muted-foreground)", lineHeight: 1.72, maxWidth: "30rem" }}>
                  Capital is the fuel. Operations are the engine. We stay embedded long after the check clears — building the infrastructure your business runs on.
                </p>
              </FadeUp>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: "3.5rem" }}>
              {[
                { end: 48, prefix: "", suffix: "", unit: "hrs", label: "Typical underwriting turnaround" },
                { end: 200, prefix: "", suffix: "+", unit: "", label: "Active SME partnerships" },
                { end: 50, prefix: "₹", suffix: "Cr+", unit: "", label: "Capital deployed to date" },
              ].map((stat, i) => (
                <div key={i} style={{ padding: "2rem 1.5rem" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem, 4.2vw, 3.6rem)", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.45rem" }}>
                    <CountUp to={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
                    {stat.unit && <span style={{ fontSize: "0.44em", color: "var(--primary)", marginLeft: "0.15em" }}>{stat.unit}</span>}
                  </div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground)", opacity: 0.7 }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Capabilities */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", border: "1px solid var(--border)", borderRadius: "calc(var(--radius) * 2)", overflow: "hidden", marginBottom: "1.25rem" }}>
              {[
                { title: "Operational Oversight", points: ["Embedded monthly finance reviews", "Cash-flow modeling and forecasting", "KPI dashboards and OKR tracking", "Working capital cycle optimisation", "Vendor payment scheduling"] },
                { title: "Network Leverage", points: ["Curated vendor introductions", "Buyer and channel partner access", "Government liaison and policy support", "Industry body memberships", "Cross-portfolio collaboration"] },
                { title: "Foolproof Compliance", points: ["GST, TDS and advance tax management", "MCA annual and event-based filings", "Audit preparation and coordination", "Labour law and ESIC compliance", "FEMA and RBI regulatory adherence"] },
                { title: "Transparent Reporting", points: ["ICAI-aligned standardized MIS", "Real-time financial dashboards", "Monthly budget vs actuals variance", "Board-ready quarterly packs", "Investor update drafting support"] },
              ].map((item, i) => (
                <FadeUp key={i} delay={i * 0.06} style={{ height: "100%" }}>
                  <div style={{ padding: "2rem", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)", borderRight: i < 3 ? "1px solid var(--border)" : "none", height: "100%", boxSizing: "border-box" }}>
                    <div style={{ width: "1.5rem", height: "2px", background: "var(--primary)", marginBottom: "1.1rem", borderRadius: "9999px" }} />
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.93rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "1rem", letterSpacing: "-0.01em" }}>
                      {item.title}
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {item.points.map((point, idx) => (
                        <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.79rem", color: "var(--muted-foreground)", lineHeight: 1.4 }}>
                          <span style={{ color: "var(--primary)", fontSize: "0.9rem", lineHeight: 1.2, flexShrink: 0 }}>•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.2}>
              <p className="text-center" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.01em", lineHeight: 1.5, paddingTop: "1.75rem", borderTop: "1px solid var(--border)" }}>
                Built for <span style={{ color: "var(--primary)" }}>manufacturers</span>,{" "}
                <span style={{ color: "var(--primary)" }}>logistics operators</span>, and{" "}
                <span style={{ color: "var(--primary)" }}>SaaS startups</span> across India.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ─── Why Choose Karncy — 2 rows × 3 columns ──────────────────── */}
        <section id="why-karncy" style={sectionBase}>
          <div style={{ width: SECTION_W, margin: AUTO }}>
            <FadeUp>
              <SectionLabel n="05" />
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--foreground)", lineHeight: 1.04, marginBottom: "0.75rem" }}>
                Why choose Karncy?
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.08rem", color: "var(--muted-foreground)", lineHeight: 1.72, maxWidth: "52rem", marginBottom: "3.5rem" }}>
                <span style={{ display: "block" }}>We are not another capital provider. We are the partner that stays —</span>
                <span style={{ display: "block" }}>operationally embedded, transparently accountable, and relentlessly focused on your outcome.</span>
              </p>
            </FadeUp>

            {/* 2 rows × 3 columns */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "calc(var(--radius) * 2)", overflow: "hidden" }}>
              {whyReasons.map((r, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(13,31,130,0.03)" }}
                    transition={{ duration: 0.2 }}
                    style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)", padding: "2.25rem 2rem", height: "100%", boxSizing: "border-box" }}
                  >
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "2.5rem", height: "2.5rem", borderRadius: "calc(var(--radius) * 1.5)", background: "rgba(13,31,130,0.08)", color: "var(--primary)", marginBottom: "1.25rem" }}>
                      {r.icon}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.93rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
                      {r.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.79rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
                      {r.desc}
                    </p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Social Proof — testimonials + partner logos ───────────────── */}
        <section id="social-proof" style={sectionBase}>
          <div style={{ width: SECTION_W, margin: AUTO }}>
            <FadeUp>
              <SectionLabel n="06" />
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--foreground)", lineHeight: 1.04, marginBottom: "0.75rem" }}>
                Trusted by growing businesses.
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.08rem", color: "var(--muted-foreground)", lineHeight: 1.72, maxWidth: "36rem", marginBottom: "3.5rem" }}>
                From manufacturers and logistics operators to early-stage founders, Karncy has been the partner behind India's quiet growth stories.
              </p>
            </FadeUp>

            {/* Testimonial carousel */}
            <FadeUp delay={0.08}>
              <TestimonialCarousel />
            </FadeUp>

            {/* MSME Empowered */}
            <FadeUp delay={0.12}>
              <div className="msme-container" style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
                  <div style={{ width: "1.5rem", height: "1px", background: "var(--primary)" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                    MSME Empowered
                  </span>
                </div>
                <MsmeMarquee />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ─── Horizon ─────────────────────────────────────────────────── */}
        <section id="horizon" style={{ height: "100vh", display: "flex", flexDirection: "column", boxSizing: "border-box", overflow: "hidden" }}>
          <div style={{ width: SECTION_W, margin: AUTO, flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", border: "1px solid var(--border)", borderRadius: "calc(var(--radius) * 2)", overflow: "hidden", flex: 1, minHeight: 0 }}>
              {/* Left — navy */}
              <FadeUp style={{ height: "100%" }}>
                <div style={{ padding: "clamp(1.5rem, 3vw, 3.5rem) clamp(1.5rem, 5vw, 15%)", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", boxSizing: "border-box" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                    <div style={{ width: "1.5rem", height: "1px", background: "var(--primary)" }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.67rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>07</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.2vw, 2.8rem)", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "1.5rem", maxWidth: "32rem" }}>
                    <span style={{ display: "block" }}>India's next enterprises</span>
                    <span style={{ display: "block" }}>start here.</span>
                  </h2>
                  <p style={{ fontFamily: "var(--font-sans)", color: "var(--muted-foreground)", fontSize: "0.88rem", lineHeight: 1.72, marginBottom: "2.5rem", maxWidth: "22rem" }}>
                    The journey begins with a conversation. Let's talk about where your business is headed.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", alignSelf: "flex-start" }}>
                    <button onClick={() => setActiveModal("funding")} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 700, padding: "0.9rem 2.25rem", background: "var(--cta)", color: "var(--cta-foreground)", borderRadius: "var(--radius)", border: "none", cursor: "pointer" }}>
                      Apply for Funding <ArrowRight size={14} />
                    </button>
                    <button onClick={() => setActiveModal("business")} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 600, padding: "0.9rem 2.25rem", background: "transparent", color: "var(--primary)", borderRadius: "var(--radius)", border: "1.5px solid var(--primary)", cursor: "pointer" }}>
                      Apply for Business <ArrowRight size={14} />
                    </button>
                    <button onClick={() => setActiveModal("business")} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 600, padding: "0.9rem 2.25rem", background: "var(--foreground)", color: "var(--background)", borderRadius: "var(--radius)", border: "none", cursor: "pointer" }}>
                      <Mail size={14} /> Talk to Karncy directly
                    </button>
                  </div>

                  {/* Menu — horizontal equal alignment */}
                  <div style={{ marginTop: "1.75rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#0f172a", fontWeight: 700, marginBottom: "1rem" }}>Menu</p>
                    <nav style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
                      {[
                        { label: "About", href: "#prologue" },
                        { label: "Privacy", href: "https://karncy.com/privacy-policy/" },
                        { label: "Terms", href: "https://karncy.com/terms-and-conditions/" },
                      ].map((item) => (
                        <div key={item.label} style={{ display: "inline-flex", alignItems: "center", gap: "1.25rem" }}>
                          {item.href.startsWith("#") ? (
                            <a
                              href={item.href}
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("prologue")?.scrollIntoView({ behavior: "smooth" });
                              }}
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                color: "#0f172a",
                                textDecoration: "none",
                                lineHeight: 1,
                                transition: "color 0.15s",
                              }}
                              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)")}
                              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#0f172a")}
                            >
                              {item.label}
                            </a>
                          ) : (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                color: "#0f172a",
                                textDecoration: "none",
                                lineHeight: 1,
                                transition: "color 0.15s",
                              }}
                              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)")}
                              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#0f172a")}
                            >
                              {item.label}
                            </a>
                          )}
                          <span style={{ width: "1px", height: "14px", background: "rgba(20,20,43,0.18)", display: "inline-block" }} />
                        </div>
                      ))}
                      <QuickLinksMenu onSelectProduct={(pid) => setActiveProduct(pid)} />
                    </nav>
                  </div>
                </div>
              </FadeUp>

              {/* Right — cream */}
              <FadeUp delay={0.1} style={{ height: "100%" }}>
                <div style={{ padding: "clamp(1.5rem, 3vw, 3.5rem) clamp(1.5rem, 5vw, 4rem)", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", boxSizing: "border-box" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", letterSpacing: "-0.01em", textTransform: "uppercase", color: "#0f172a", fontWeight: 700, marginBottom: "2rem" }}>
                    Reach us
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: "24rem" }}>
                    {[
                      { label: "Email", icon: <Mail size={14} style={{ color: "var(--primary)" }} />, value: "hello@karncy.com", href: "mailto:hello@karncy.com" },
                      { label: "Phone", icon: <Phone size={14} style={{ color: "var(--primary)" }} />, value: "040-42011067", href: "tel:04042011067" },
                    ].map((c) => (
                      <div key={c.label}>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--cta)", fontWeight: 700, marginBottom: "0.35rem" }}>{c.label}</p>
                        <a href={c.href} style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-sans)", fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", textDecoration: "none" }}>
                          {c.icon} {c.value}
                        </a>
                      </div>
                    ))}
                    <div>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--cta)", fontWeight: 700, marginBottom: "0.35rem" }}>Address</p>
                      <p style={{ display: "flex", alignItems: "flex-start", gap: "0.45rem", fontFamily: "var(--font-sans)", fontSize: "1.02rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.6, margin: 0 }}>
                        <MapPin size={14} style={{ color: "var(--primary)", marginTop: "0.25rem", flexShrink: 0 }} />
                        5th Floor, The Park View, Gachibowli, Hyderabad, 500032
                      </p>
                    </div>

                    {/* Company details + certifications */}
                    <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "#0f172a", fontWeight: 700, marginBottom: "0.85rem" }}>Company Details</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Karncy Ventures Private Limited</p>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.98rem", fontWeight: 600, color: "#334155", margin: 0 }}>CIN: U65100TG2022PTC164XXXX</p>
                      </div>
                      <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
                        <img src={certIso27001} alt="ISO 27001 Information Security Certified" style={{ height: "82px", width: "auto", objectFit: "contain", opacity: 0.95 }} />
                        <img src={certSoc2} alt="AICPA SOC 2 Type II Security Certified" style={{ height: "88px", width: "auto", objectFit: "contain", opacity: 1 }} />
                      </div>
                    </div>

                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Security warning */}
            <div style={{ background: "rgba(255,105,0,0.06)", borderTop: "1px solid rgba(255,105,0,0.18)", padding: "0.6rem 0" }}>
              <div style={{ width: SECTION_W, margin: AUTO, display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <AlertTriangle size={15} style={{ color: "var(--cta)", flexShrink: 0, marginTop: "0.1rem" }} />
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.55, margin: 0 }}>
                  <strong>Beware of impersonated websites.</strong> Karncy only communicates through official channels: hello@karncy.com and 040-42011067. Do not share financial information with unverified sources claiming to represent Karncy.
                </p>
              </div>
            </div>

            {/* Footer bar — 70% centered width */}
            <div style={{ borderTop: "1px solid var(--border)", padding: "0.75rem 0" }}>
              <div style={{ width: SECTION_W, margin: AUTO, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500, color: "var(--muted-foreground)" }}>
                  © 2026 Karncy Ventures Private Limited. All rights reserved.
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  {/* Social icons */}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <a href="https://www.linkedin.com/karncy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "2rem", height: "2rem", borderRadius: "50%", background: "#0077B5", color: "#fff", textDecoration: "none", transition: "opacity 0.15s, transform 0.15s" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "0.85"; el.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "1"; el.style.transform = "translateY(0)"; }}
                    >
                      <Linkedin size={13} />
                    </a>
                    <a href="https://www.facebook.com/karncy" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "2rem", height: "2rem", borderRadius: "50%", background: "#1877F2", color: "#fff", textDecoration: "none", transition: "opacity 0.15s, transform 0.15s" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "0.85"; el.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "1"; el.style.transform = "translateY(0)"; }}
                    >
                      <Facebook size={13} />
                    </a>
                    <a href="https://x.com/karncy" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--foreground)", color: "var(--background)", textDecoration: "none", transition: "opacity 0.15s, transform 0.15s" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "0.85"; el.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "1"; el.style.transform = "translateY(0)"; }}
                    >
                      <Twitter size={13} />
                    </a>
                  </div>
                  <button onClick={() => scrollTo("prologue")} style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", fontWeight: 600, color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)"; }}
                  >
                    Back to top ↑
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {activeProduct && (
          <ProductDetailOverlay id={activeProduct} onClose={() => setActiveProduct(null)} onOpenContact={(type) => setActiveModal(type)} />
        )}
        {activeModal && (
          <ContactModal type={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
