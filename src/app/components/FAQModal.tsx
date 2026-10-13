import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

interface FAQItem {
  id: string;
  category: "invoice" | "ventures" | "startup" | "general";
  categoryLabel: string;
  question: string;
  answer: string;
  bullets?: string[];
}

const FAQ_DATA: FAQItem[] = [
  // Invoice Financing
  {
    id: "inv-1",
    category: "invoice",
    categoryLabel: "Invoice Financing",
    question: "What is Karncy Invoice Financing and how does it work?",
    answer:
      "Karncy Invoice Financing allows GST-registered suppliers in India to convert approved receivables from creditworthy corporate buyers into immediate cash flow — typically within 48 hours. Instead of waiting 30 to 90 days for buyer settlement, Karncy advances up to 80% of invoice value. When your buyer settles the invoice into escrow, the remaining balance minus a small discount fee is released directly to you.",
  },
  {
    id: "inv-2",
    category: "invoice",
    categoryLabel: "Invoice Financing",
    question: "What ticket sizes and tenor cycles are supported?",
    answer: "We support invoice funding ticket sizes starting from ₹5 Lakhs up to ₹1 Crore+ per facility, with flexible repayment tenors ranging from 15 to 90 days based on buyer payment terms.",
  },
  {
    id: "inv-3",
    category: "invoice",
    categoryLabel: "Invoice Financing",
    question: "Do I need to provide collateral or equity dilution?",
    answer: "No. Karncy Invoice Financing is completely non-dilutive. You retain 100% equity in your company. Funding is tied directly to the underlying buyer receivable without requiring collateral or personal guarantees for approved buyer categories.",
  },
  {
    id: "inv-4",
    category: "invoice",
    categoryLabel: "Invoice Financing",
    question: "What are the eligibility criteria to qualify?",
    bullets: [
      "GST-registered business operating in India or exporting globally",
      "Minimum 2+ years of active business trading history",
      "Invoices issued to rated corporate, MNC, or government buyers",
      "Verifiable proof of delivery, PO, or buyer acceptance certificate",
      "Clean escrow-ability on receivables",
    ],
    answer: "To qualify for invoice discounting, your business should satisfy the following criteria:",
  },

  // Joint Ventures
  {
    id: "jv-1",
    category: "ventures",
    categoryLabel: "Joint Ventures",
    question: "How does Karncy Joint Venture project capital work?",
    answer:
      "Karncy Joint Ventures provides non-equity, project-specific co-investment for defined commercial contracts, purchase orders, real estate, and industrial builds. We co-fund raw material procurement, manufacturing, and installation without acquiring equity or taking board seats in your parent company.",
  },
  {
    id: "jv-2",
    category: "ventures",
    categoryLabel: "Joint Ventures",
    question: "What is the 4-step Priority Waterfall Cash-Flow Distribution?",
    answer:
      "All project revenues flow into a dedicated joint project escrow account. Repayments follow a strict 4-step priority waterfall:",
    bullets: [
      "Step 01: Statutory obligations, taxes, and essential project operating expenses paid first.",
      "Step 02: 100% full repayment of initial investor principal.",
      "Step 03: Distribution of agreed commercial investor yields and preferred returns.",
      "Step 04: 100% residual project surplus released entirely to your business.",
    ],
  },
  {
    id: "jv-3",
    category: "ventures",
    categoryLabel: "Joint Ventures",
    question: "What is the typical investment duration for Joint Ventures?",
    answer:
      "We offer flexible investment durations based on project type:\n• Short-Cycle (3–6 months): Purchase order financing, export orders, inventory trading.\n• Long-Cycle (up to 24 months): Equipment deployment, infrastructure builds, commercial expansion.",
  },

  // Startup Equity
  {
    id: "eq-1",
    category: "startup",
    categoryLabel: "Startup Equity",
    question: "What stage startups does Karncy Equity back?",
    answer:
      "Karncy Equity partners with post-revenue early-stage and growth startups across manufacturing, D2C, SaaS, logistics, and agri-tech in India. Investment rounds range from ₹1 Crore up to ₹25 Crores.",
  },
  {
    id: "eq-2",
    category: "startup",
    categoryLabel: "Startup Equity",
    question: "What is Milestone Tranche Deployment?",
    answer:
      "Capital is released in 4 structured tranches tied to pre-agreed operational and commercial milestones:\n• Step 01 (Seed): Team assembly, MVP product iteration & ops setup.\n• Step 02 (Traction): Key revenue validation & unit economics.\n• Step 03 (Scale): Capex deployment & channel expansion.\n• Step 04 (Growth): Series A readiness & cap table cleanup.",
  },
  {
    id: "eq-3",
    category: "startup",
    categoryLabel: "Startup Equity",
    question: "What operational scaffolding does Karncy provide founders?",
    answer: "In addition to capital, founders gain weekly FP&A cash-flow support, access to Karncy's corporate vendor network, distributor introductions, procurement cost audits, and MIS executive dashboards.",
  },

  // General & Safety
  {
    id: "gen-1",
    category: "general",
    categoryLabel: "General & Safety",
    question: "How does Karncy safeguard user data and financial compliance?",
    answer:
      "Karncy adheres to strict SOC 2 Type II compliance, ISO 27001 data security standards, and Dun & Bradstreet D-U-N-S registration. All financial communications occur exclusively through official domain channels (hello@karncy.com and official phone numbers).",
  },
  {
    id: "gen-2",
    category: "general",
    categoryLabel: "General & Safety",
    question: "How do I apply or speak directly with the team?",
    answer:
      "You can click 'Apply for Funding' or 'Apply for Business' on our homepage, use the AI Chatbot to initiate WhatsApp contact, or call our team directly at 040-42011067.",
  },
];

interface FAQModalProps {
  onClose: () => void;
  onOpenContact: (type: "funding" | "business" | "contact") => void;
}

export function FAQModal({ onClose, onOpenContact }: FAQModalProps) {
  const [expandedId, setExpandedId] = useState<string | null>("inv-1");

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      className="mobile-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 220,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(0.75rem, 2.5vw, 2rem)",
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(18px)",
      }}
      onClick={onClose}
    >
      <motion.div
        className="mobile-modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 24 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          maxWidth: "64rem",
          height: "92vh",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "calc(var(--radius) * 2)",
          boxShadow: "0 30px 90px rgba(15,23,42,0.4)",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div
          style={{
            background: "#0f172a",
            color: "#ffffff",
            padding: "1.25rem clamp(1.25rem, 3vw, 2.25rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--cta)",
              }}
            >
              Karncy Knowledge Base
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                fontWeight: 700,
                color: "#ffffff",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close FAQ modal"
            style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#ffffff",
              transition: "all 0.18s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable Content Body — Borderless Accordion */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "clamp(1.5rem, 3.5vw, 3rem)",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {FAQ_DATA.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  padding: "0.25rem 0",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Accordion Question Header */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  style={{
                    width: "100%",
                    padding: "1rem 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(0.98rem, 2vw, 1.08rem)",
                      fontWeight: 700,
                      color: isExpanded ? "var(--primary)" : "#0f172a",
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    {faq.question}
                  </h4>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "inline-flex", color: isExpanded ? "var(--primary)" : "#64748b", flexShrink: 0 }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                {/* Accordion Answer Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div
                        style={{
                          padding: "0.25rem 0 1.25rem 0",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.9rem",
                            color: "#334155",
                            lineHeight: 1.7,
                            margin: 0,
                            whiteSpace: "pre-line",
                          }}
                        >
                          {faq.answer}
                        </p>

                        {faq.bullets && (
                          <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 0 0", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {faq.bullets.map((b, bIdx) => (
                              <li
                                key={bIdx}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "0.55rem",
                                  fontFamily: "var(--font-sans)",
                                  fontSize: "0.86rem",
                                  color: "#475569",
                                  lineHeight: 1.55,
                                }}
                              >
                                <span style={{ color: "var(--cta)", fontWeight: 700, flexShrink: 0 }}>•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>


      </motion.div>
    </motion.div>
  );
}
