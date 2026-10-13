import React, { useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

interface HowItWorksModalProps {
  onClose: () => void;
  onOpenContact: (type: "funding" | "business" | "contact") => void;
}

export function HowItWorksModal({ onClose, onOpenContact }: HowItWorksModalProps) {
  const [activeTab, setActiveTab] = useState<"business" | "investor">("business");

  const businessSteps = [
    {
      step: "01",
      title: "Opportunity Submission",
      duration: "Day 1",
      summary: "Upload outstanding invoices, purchase orders, or project briefs via our secure portal with GST & ERP data.",
      details: [
        "Instant authentication of PDF invoices, Tally XML, or SAP records",
        "Zero upfront fees or non-refundable application charges",
        "Direct intake for invoices from ₹5 Lakhs to ₹1 Crore",
      ],
    },
    {
      step: "02",
      title: "48-Hour Risk Underwriting",
      duration: "48 Hours",
      summary: "Our risk desk evaluates buyer creditworthiness, commercial CIBIL scores, and trade receivable history.",
      details: [
        "Buyer credit rating & payment history cross-checked",
        "GST e-invoice matching and contract validation",
        "No personal guarantees required for rated buyer categories",
      ],
    },
    {
      step: "03",
      title: "Capital Disbursement",
      duration: "Immediate",
      summary: "Receive 80% to 90% advance rate disbursed straight to your operating bank account via RTGS.",
      details: [
        "Non-dilutive working capital with zero balance sheet leverage",
        "Immediate liquidity to fund raw materials and new orders",
        "Transparent discount fees quoted upfront with zero hidden line items",
      ],
    },
    {
      step: "04",
      title: "Escrow Settlement & Close",
      duration: "Due Date",
      summary: "Your enterprise buyer settles into Karncy escrow on due date; reserve balance is released instantly.",
      details: [
        "Automated 30-minute reserve release upon buyer deposit",
        "Full transaction summary archived permanently in your dashboard",
        "Revolving limit continuously refreshed for repeat invoices",
      ],
    },
  ];

  const investorSteps = [
    {
      step: "01",
      title: "Onboarding & Verification",
      duration: "24 Hours",
      summary: "Complete digital KYC and accredited investor verification to access Karncy's private credit pipeline.",
      details: [
        "Encrypted KYC & PAN verification compliant with RBI standards",
        "Access to private deal room for accredited individuals & entities",
        "Independent trustee and legal structure documentation access",
      ],
    },
    {
      step: "02",
      title: "Opportunity Review",
      duration: "Self-Paced",
      summary: "Review thoroughly underwritten opportunities across Invoice Financing, Joint Ventures, and Equity sleeves.",
      details: [
        "Detailed deal briefs including buyer risk, tenor, and security",
        "Full disclosure of underlying contracts & counterparty scores",
        "Clear risk-reward metrics reviewed by our Investment Committee",
      ],
    },
    {
      step: "03",
      title: "Milestone Capital Commitment",
      duration: "Instant",
      summary: "Commit capital into ring-fenced investment vehicles with tranche-based deployment and trustee oversight.",
      details: [
        "Dedicated tri-party escrow bank routing for 100% transparency",
        "Capital released strictly against pre-agreed execution milestones",
        "Comptroller oversight over vendor disbursements",
      ],
    },
    {
      step: "04",
      title: "Preferred Returns & MIS",
      duration: "Quarterly",
      summary: "Receive quarterly preferred returns (9%+ p.a.) with real-time portfolio dashboards and standardized MIS.",
      details: [
        "Quarterly cash-flow distributions directly to your bank account",
        "Standardized MIS reporting covering variance and cash position",
        "Dedicated investor desk for ongoing portfolio reviews",
      ],
    },
  ];

  const steps = activeTab === "business" ? businessSteps : investorSteps;

  return (
    <motion.div
      className="mobile-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
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
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          maxWidth: "64rem",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "calc(var(--radius) * 2)",
          boxShadow: "0 30px 90px rgba(15,23,42,0.35)",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
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
              Execution Journey
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
              How It Works
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
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

        {/* Scrollable Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "clamp(1.25rem, 3vw, 2.5rem)",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Track Switcher Tabs (Business / Investor) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "center" }}>
            <div
              style={{
                display: "inline-flex",
                background: "#f1f5f9",
                padding: "0.3rem",
                borderRadius: "9999px",
                border: "1px solid var(--border)",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("business")}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  padding: "0.6rem 1.75rem",
                  borderRadius: "9999px",
                  border: "none",
                  background: activeTab === "business" ? "var(--primary)" : "transparent",
                  color: activeTab === "business" ? "#ffffff" : "#475569",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: activeTab === "business" ? "0 4px 14px rgba(13,31,130,0.25)" : "none",
                }}
              >
                For Businesses & SMEs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("investor")}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  padding: "0.6rem 1.75rem",
                  borderRadius: "9999px",
                  border: "none",
                  background: activeTab === "investor" ? "var(--primary)" : "transparent",
                  color: activeTab === "investor" ? "#ffffff" : "#475569",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: activeTab === "investor" ? "0 4px 14px rgba(13,31,130,0.25)" : "none",
                }}
              >
                For Investors & Capital Partners
              </button>
            </div>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "#475569", textAlign: "center", maxWidth: "36rem", margin: 0, lineHeight: 1.6 }}>
              {activeTab === "business"
                ? "Unlock working capital from outstanding receivables and contracts in 4 clean, transparent steps."
                : "Deploy capital into structured, underwritten credit opportunities with milestone deployment and trustee oversight."}
            </p>
          </div>

          {/* Timeline Vertical Layout */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1.75rem", paddingLeft: "1rem" }}>
            {/* Connecting Vertical Timeline Line */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: "2.75rem",
                top: "1.5rem",
                bottom: "1.5rem",
                width: "2px",
                background: "linear-gradient(to bottom, var(--primary) 0%, #cbd5e1 100%)",
                zIndex: 0,
              }}
            />

            {steps.map((s, idx) => (
              <div
                key={s.step}
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                {/* Step Circle Badge */}
                <div
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    borderRadius: "50%",
                    background: "#0f172a",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    boxShadow: "0 4px 16px rgba(15,23,42,0.25)",
                    border: "3px solid #ffffff",
                    flexShrink: 0,
                  }}
                >
                  {s.step}
                </div>

                {/* Timeline Content Box */}
                <div
                  style={{
                    flex: 1,
                    background: "#ffffff",
                    border: "1px solid var(--border)",
                    borderRadius: "calc(var(--radius) * 1.2)",
                    padding: "1.25rem 1.5rem",
                    boxShadow: "0 2px 10px rgba(15,23,42,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                      {s.title}
                    </h3>

                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, color: "var(--cta)", background: "rgba(255,105,0,0.08)", padding: "0.2rem 0.65rem", borderRadius: "9999px" }}>
                      {s.duration}
                    </span>
                  </div>

                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "#334155", lineHeight: 1.6, margin: 0 }}>
                    {s.summary}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", paddingTop: "0.5rem", borderTop: "1px solid #f1f5f9" }}>
                    {s.details.map((bullet, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "#64748b" }}>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
