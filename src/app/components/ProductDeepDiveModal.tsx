import React from "react";
import { motion } from "motion/react";
import { X, ArrowRight, CheckCircle, ShieldCheck, Zap, Layers, TrendingUp, Check, ChevronRight, FileText, Users, Scale, DollarSign } from "lucide-react";
import { ProductId } from "../App";

interface ProductDeepDiveModalProps {
  id: ProductId;
  onClose: () => void;
  onOpenContact: (type: "funding" | "business" | "contact") => void;
}

export function ProductDeepDiveModal({ id, onClose, onOpenContact }: ProductDeepDiveModalProps) {
  const isInvoice = id === "invoice";
  const isVentures = id === "ventures";
  const isStartup = id === "startup";

  return (
    <motion.div
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
        {/* Modal Top Header */}
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
              Karncy Deep Dive
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
              {isInvoice && "Karncy Financing — Working Capital from Receivables"}
              {isVentures && "Karncy Ventures — Project Capital & Execution Platform"}
              {isStartup && "Karncy Equity — Assessment, Capital & Operational Scaffolding"}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close deep dive modal"
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

        {/* Modal Content Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "clamp(2rem, 4vw, 3.5rem)",
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          {/* Executive Summary Quote Box */}
          <div
            style={{
              padding: "1.25rem 1.5rem",
              background: "#f8fafc",
              borderLeft: "4px solid var(--primary)",
              borderRadius: "0 calc(var(--radius) * 1.2) calc(var(--radius) * 1.2) 0",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.68rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--primary)",
                display: "block",
                marginBottom: "0.35rem",
              }}
            >
              Executive Summary
            </span>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "#334155", lineHeight: 1.7, margin: 0 }}>
              {isInvoice && "Karncy Financing converts approved receivables from creditworthy buyers into immediate working capital — typically within 48 hours of underwriting. Unlike a term loan, funding is tied to a specific invoice, priced against buyer risk, and self-liquidating on settlement. The business does not add fixed obligations to its balance sheet, and does not raise equity to cover a timing gap."}
              {isVentures && "Karncy Ventures is a non-equity, project-specific funding and execution platform that bridges businesses needing capital for defined projects and investors seeking structured, secured, and time-bound returns. Unlike venture capital or private equity, Karncy does not invest in businesses or acquire ownership. Every engagement is linked to a specific commercial project."}
              {isStartup && "Karncy Equity works with early and growth-stage startups across India that need more than a cheque. We apply the same assessment-to-operations discipline used in our joint ventures — evaluating founders, unit economics, and execution capacity before capital moves. Once aligned, we deploy capital against defined milestones and stay involved operationally."}
            </p>
          </div>

          {/* Philosophy Banner — Clean, No Background Box */}
          <div
            style={{
              padding: "0.5rem 0",
              borderLeft: "3px solid var(--cta)",
              paddingLeft: "1.25rem",
            }}
          >
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--cta)", display: "block", marginBottom: "0.35rem" }}>
              Our Philosophy
            </span>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600, color: "#1e293b", margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>
              {isInvoice && "“Growth should not wait on a buyer's 60-day payment cycle. Capital tied up in paper is capital denied to the next order, the next hire, the next shipment.”"}
              {isVentures && "“Businesses should raise capital without sacrificing ownership. Investors should earn attractive returns without depending solely on an uncertain equity exit. Karncy is the framework where both objectives coexist — through disciplined project execution.”"}
              {isStartup && "“Founders don't need money first — they need a partner first. Capital without operating support is the reason most early ventures stall between two rounds.”"}
            </p>
          </div>

          {/* Specific Product Deep-Dive Sections */}

          {/* INVOICE FINANCING DEEP DIVE */}
          {isInvoice && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2.75rem" }}>
              {/* Who Qualifies */}
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem" }}>
                  Who Qualifies
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.75rem" }}>
                  {[
                    "GST-registered supplier operating in India or exports",
                    "2+ years of active trading history",
                    "Invoices issued to rated corporate or government buyers",
                    "Verifiable delivery or customer acceptance evidence",
                    "Clean charge on receivable with escrow collections",
                    "Ticket sizes from ₹5 Lakhs up to ₹1 Crore+",
                    "Flexible tenor up to 90 days",
                  ].map((q, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", padding: "0.75rem 0.9rem", background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
                      <Check size={14} style={{ color: "var(--primary)", marginTop: "0.15rem", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", color: "#334155" }}>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Flows — Timeline UI Design matching reference model */}
              <div style={{ width: "100%", padding: "0.5rem 0" }}>
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "#0f172a", margin: "0 0 0.4rem 0", display: "inline-block", position: "relative" }}>
                    How It <span style={{ color: "var(--cta)" }}>Flows</span>
                    <div style={{ width: "50%", height: "3px", background: "var(--cta)", borderRadius: "9999px", margin: "0.4rem auto 0" }} />
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--muted-foreground)", margin: 0 }}>
                    The 48-Hour Path from invoice upload to instant capital disbursal
                  </p>
                </div>

                <div style={{ position: "relative", maxWidth: "48rem", margin: "0 auto" }}>
                  {/* Vertical Accent Line — Dead-center aligned with node circles */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "1.5rem",
                      bottom: "1.5rem",
                      left: "calc(clamp(3.5rem, 14vw, 5.25rem) + 0.75rem + 1.25rem)",
                      transform: "translateX(-50%)",
                      width: "2px",
                      background: "rgba(255, 105, 0, 0.35)",
                      zIndex: 0,
                    }}
                  />

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
                    {[
                      { icon: <Users size={16} />, title: "Onboard", desc: "KYC, GST, banking, and buyer references submitted once." },
                      { icon: <FileText size={16} />, title: "List Invoice", desc: "Upload invoice, PO, and proof of delivery / acceptance." },
                      { icon: <ShieldCheck size={16} />, title: "Buyer Verification", desc: "We confirm the payable directly with the buyer AP team." },
                      { icon: <Scale size={16} />, title: "Underwrite", desc: "Risk desk approves advance rate and tenor within 24–48 hours." },
                      { icon: <DollarSign size={16} />, title: "Fund", desc: "80% of invoice value released directly to your account." },
                      { icon: <CheckCircle size={16} />, title: "Settle", desc: "Buyer pays into escrow on due date; balance released same day." },
                    ].map((s, i) => (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "clamp(3.5rem, 14vw, 5.25rem) 2.5rem 1fr",
                          gap: "0.75rem",
                          alignItems: "center",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {/* Left Step indicator */}
                        <div
                          style={{
                            textAlign: "right",
                            fontFamily: "var(--font-sans)",
                            fontSize: "clamp(0.72rem, 2vw, 0.8rem)",
                            fontWeight: 700,
                            color: "var(--muted-foreground)",
                            letterSpacing: "0.02em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Step 0{i + 1}
                        </div>

                        {/* Node Icon Circle */}
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <div
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              borderRadius: "50%",
                              background: "#ffffff",
                              border: "2px solid var(--cta)",
                              color: "var(--cta)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 0 0 4px rgba(255, 105, 0, 0.12)",
                              flexShrink: 0,
                            }}
                          >
                            {s.icon}
                          </div>
                        </div>

                        {/* Right Card Box with Left Triangle Pointer */}
                        <div
                          style={{
                            position: "relative",
                            background: "#ffffff",
                            border: "1px solid var(--border)",
                            borderRadius: "calc(var(--radius) * 1.2)",
                            padding: "clamp(0.75rem, 2.5vw, 1.1rem) clamp(0.85rem, 3vw, 1.35rem)",
                            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.05)",
                          }}
                        >
                          {/* Pointer Arrow */}
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "-6px",
                              transform: "translateY(-50%) rotate(45deg)",
                              width: "10px",
                              height: "10px",
                              background: "#ffffff",
                              borderLeft: "1px solid var(--border)",
                              borderBottom: "1px solid var(--border)",
                            }}
                          />

                          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)", fontWeight: 700, color: "#0f172a", margin: "0 0 0.25rem 0", lineHeight: 1.2 }}>
                            {s.title}
                          </h4>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.78rem, 2vw, 0.85rem)", color: "#475569", margin: 0, lineHeight: 1.5 }}>
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* How We Underwrite — Full Width, No Background Box */}
              <div style={{ width: "100%", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem" }}>
                  How We Underwrite
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.85rem 1.75rem" }}>
                  {[
                    "Buyer credit rating & payment history",
                    "Sector concentration analysis",
                    "Contract, PO & GST e-invoice matching",
                    "Delivery & acceptance evidence",
                    "Escrow-ability of underlying receivable",
                  ].map((item, i) => (
                    <li key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "#334155", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing & Structure — Full Width, No Background Box */}
              <div style={{ width: "100%", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem" }}>
                  Pricing & Structure
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "#334155", lineHeight: 1.7, margin: 0 }}>
                    <strong>Advance Rate:</strong> 80% of invoice value on approval.<br />
                    <strong>Discount Fee:</strong> Priced against buyer risk & tenor — quoted upfront, no hidden reset.<br />
                    <strong>Settlement:</strong> Buyer pays into a Karncy-managed escrow; balance released same day.
                  </p>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--muted-foreground)", fontStyle: "italic" }}>
                    No collateral outside receivable. No personal guarantees for approved buyer categories.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* JOINT VENTURES DEEP DIVE */}
          {isVentures && (
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {/* Non-Equity Project Capital — Full Width, No Background Box */}
              <div style={{ width: "100%", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.75rem" }}>
                  Non-Equity Project Capital
                </h4>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "#334155", lineHeight: 1.7, margin: 0 }}>
                  Every investment is linked to a defined commercial project — purchase orders, supply contracts, manufacturing cycles, or infrastructure builds. The business retains 100% equity, valuation integrity, and cap table control without dilution or board seats.
                </p>
              </div>

              {/* Flexible Investment Duration — Full Width, No Background Box */}
              <div style={{ width: "100%", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.75rem" }}>
                  Flexible Investment Duration
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "#334155", lineHeight: 1.7, margin: 0 }}>
                    <strong>Short-Cycle (3–6 months):</strong> Purchase order financing, export fulfillment, inventory trading cycles.<br />
                    <strong>Long-Cycle (up to 24 months):</strong> Construction milestones, industrial equipment deployment, renewable energy infrastructure.
                  </p>
                </div>
              </div>

              {/* 10 Milestone-Based Capital Deployment Steps — Timeline UI Design */}
              <div style={{ width: "100%", borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "#0f172a", margin: "0 0 0.4rem 0", display: "inline-block", position: "relative" }}>
                    10 Milestone-Based <span style={{ color: "var(--cta)" }}>Capital Deployment</span>
                    <div style={{ width: "50%", height: "3px", background: "var(--cta)", borderRadius: "9999px", margin: "0.4rem auto 0" }} />
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--muted-foreground)", margin: 0 }}>
                    Tranche disbursal and risk mitigation tied to verifiable operational milestones
                  </p>
                </div>

                <div style={{ position: "relative", maxWidth: "48rem", margin: "0 auto" }}>
                  {/* Vertical Accent Line */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "1.5rem",
                      bottom: "1.5rem",
                      left: "calc(clamp(3.5rem, 14vw, 5.25rem) + 0.75rem + 1.25rem)",
                      transform: "translateX(-50%)",
                      width: "2px",
                      background: "rgba(255, 105, 0, 0.35)",
                      zIndex: 0,
                    }}
                  />

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
                    {[
                      { icon: <Layers size={16} />, title: "Procurement", desc: "Raw material & equipment sourcing linked to verified project POs." },
                      { icon: <Zap size={16} />, title: "Manufacturing", desc: "Fabrication & assembly executed in controlled facility environment." },
                      { icon: <TrendingUp size={16} />, title: "Site Mobilisation", desc: "Logistics, transport, and site prep deployment." },
                      { icon: <CheckCircle size={16} />, title: "Delivery", desc: "On-site shipment receipt & delivery verification sign-off." },
                      { icon: <Scale size={16} />, title: "Installation", desc: "Engineering setup, mounting, and mechanical integration." },
                      { icon: <ShieldCheck size={16} />, title: "Inspection", desc: "Quality control audit, safety checks, and compliance sign-off." },
                      { icon: <Check size={16} />, title: "Customer Acceptance", desc: "Formal buyer operational acceptance certificate issued." },
                      { icon: <FileText size={16} />, title: "Invoice Generation", desc: "Receivable billing generated directly against contract terms." },
                      { icon: <DollarSign size={16} />, title: "Collections", desc: "Buyer payment deposited into designated project escrow." },
                      { icon: <CheckCircle size={16} />, title: "Final Completion", desc: "Escrow payout, principal return, yield distribution & SPV release." },
                    ].map((s, i) => (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "clamp(3.5rem, 14vw, 5.25rem) 2.5rem 1fr",
                          gap: "0.75rem",
                          alignItems: "center",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {/* Left Step indicator */}
                        <div
                          style={{
                            textAlign: "right",
                            fontFamily: "var(--font-sans)",
                            fontSize: "clamp(0.72rem, 2vw, 0.8rem)",
                            fontWeight: 700,
                            color: "var(--muted-foreground)",
                            letterSpacing: "0.02em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Step {String(i + 1).padStart(2, "0")}
                        </div>

                        {/* Node Icon Circle */}
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <div
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              borderRadius: "50%",
                              background: "#ffffff",
                              border: "2px solid var(--cta)",
                              color: "var(--cta)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 0 0 4px rgba(255, 105, 0, 0.12)",
                              flexShrink: 0,
                            }}
                          >
                            {s.icon}
                          </div>
                        </div>

                        {/* Right Card Box with Left Pointer */}
                        <div
                          style={{
                            position: "relative",
                            background: "#ffffff",
                            border: "1px solid var(--border)",
                            borderRadius: "calc(var(--radius) * 1.2)",
                            padding: "clamp(0.75rem, 2.5vw, 1.1rem) clamp(0.85rem, 3vw, 1.35rem)",
                            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.05)",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "-6px",
                              transform: "translateY(-50%) rotate(45deg)",
                              width: "10px",
                              height: "10px",
                              background: "#ffffff",
                              borderLeft: "1px solid var(--border)",
                              borderBottom: "1px solid var(--border)",
                            }}
                          />

                          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)", fontWeight: 700, color: "#0f172a", margin: "0 0 0.25rem 0", lineHeight: 1.2 }}>
                            {s.title}
                          </h4>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.78rem, 2vw, 0.85rem)", color: "#475569", margin: 0, lineHeight: 1.5 }}>
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Priority Waterfall Distribution — Full Width, No Background Box */}
              <div style={{ width: "100%", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem" }}>
                  Priority Waterfall Cash-Flow Distribution
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                  {[
                    { num: "01", title: "Statutory & Essential Ops", desc: "Statutory obligations and essential project operating expenses paid first." },
                    { num: "02", title: "Investor Principal", desc: "100% repayment of investor principal." },
                    { num: "03", title: "Agreed Investor Returns", desc: "Distribution of agreed commercial investor returns." },
                    { num: "04", title: "Residual Surplus", desc: "Residual project surplus released entirely to the business." },
                  ].map((w, i) => (
                    <div key={i} style={{ padding: "1rem", background: "#f8fafc", borderRadius: "calc(var(--radius) * 1.2)", border: "1px solid var(--border)" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, color: "var(--cta)", display: "block", marginBottom: "0.2rem" }}>Step {w.num}</span>
                      <h5 style={{ fontFamily: "var(--font-display)", fontSize: "0.92rem", fontWeight: 700, color: "#0f172a", margin: "0.2rem 0 0.4rem 0" }}>{w.title}</h5>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>{w.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STARTUP EQUITY DEEP DIVE */}
          {isStartup && (
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {/* Who We Back — Full Width, No Background Box */}
              <div style={{ width: "100%", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.85rem" }}>
                  Who We Back
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.85rem 1.75rem" }}>
                  {[
                    "Sector-agnostic (manufacturing, D2C, SaaS, logistics, agri)",
                    "Post-revenue or clear path to customer monetization",
                    "Founders open to active operational partnership",
                    "Unit economics that can be rigorously underwritten",
                    "Investment rounds from ₹1 Crore up to ₹25 Crores",
                  ].map((item, i) => (
                    <li key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "#334155", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Operational Scaffolding — Full Width, No Background Box */}
              <div style={{ width: "100%", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.85rem" }}>
                  Operational Scaffolding
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.85rem 1.75rem" }}>
                  {[
                    "Weekly cash-flow review & FP&A operating support",
                    "Access to Karncy's pre-vetted corporate vendor network",
                    "Distributor & institutional buyer introductions (retail & export)",
                    "Procurement cost optimization & supply chain audit",
                    "Standardized MIS executive dashboards & Series A governance readiness",
                  ].map((item, i) => (
                    <li key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "#334155", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--cta)", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Milestone Tranche Deployment — Timeline UI Design */}
              <div style={{ width: "100%", borderTop: "1px solid var(--border)", paddingTop: "2.5rem" }}>
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "#0f172a", margin: "0 0 0.4rem 0", display: "inline-block", position: "relative" }}>
                    Milestone Tranche <span style={{ color: "var(--cta)" }}>Deployment</span>
                    <div style={{ width: "50%", height: "3px", background: "var(--cta)", borderRadius: "9999px", margin: "0.4rem auto 0" }} />
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--muted-foreground)", margin: 0 }}>
                    Capital released strictly against pre-agreed operational and commercial milestones
                  </p>
                </div>

                <div style={{ position: "relative", maxWidth: "48rem", margin: "0 auto" }}>
                  {/* Vertical Accent Line */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "1.5rem",
                      bottom: "1.5rem",
                      left: "calc(clamp(3.5rem, 14vw, 5.25rem) + 0.75rem + 1.25rem)",
                      transform: "translateX(-50%)",
                      width: "2px",
                      background: "rgba(255, 105, 0, 0.35)",
                      zIndex: 0,
                    }}
                  />

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
                    {[
                      { icon: <Layers size={16} />, title: "Seed Tranche", desc: "Core team assembly, MVP product iteration, and foundational ops setup." },
                      { icon: <TrendingUp size={16} />, title: "Traction Tranche", desc: "Key revenue target validation, unit economic validation, and customer retention." },
                      { icon: <Zap size={16} />, title: "Scale Tranche", desc: "Capex deployment, geographic channel expansion, and key executive hiring." },
                      { icon: <CheckCircle size={16} />, title: "Growth Tranche", desc: "Institutional round bridge, cap table cleanup & Series A readiness." },
                    ].map((s, i) => (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "clamp(3.5rem, 14vw, 5.25rem) 2.5rem 1fr",
                          gap: "0.75rem",
                          alignItems: "center",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {/* Left Step indicator */}
                        <div
                          style={{
                            textAlign: "right",
                            fontFamily: "var(--font-sans)",
                            fontSize: "clamp(0.72rem, 2vw, 0.8rem)",
                            fontWeight: 700,
                            color: "var(--muted-foreground)",
                            letterSpacing: "0.02em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Step 0{i + 1}
                        </div>

                        {/* Node Icon Circle */}
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <div
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              borderRadius: "50%",
                              background: "#ffffff",
                              border: "2px solid var(--cta)",
                              color: "var(--cta)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 0 0 4px rgba(255, 105, 0, 0.12)",
                              flexShrink: 0,
                            }}
                          >
                            {s.icon}
                          </div>
                        </div>

                        {/* Right Card Box with Left Pointer */}
                        <div
                          style={{
                            position: "relative",
                            background: "#ffffff",
                            border: "1px solid var(--border)",
                            borderRadius: "calc(var(--radius) * 1.2)",
                            padding: "clamp(0.75rem, 2.5vw, 1.1rem) clamp(0.85rem, 3vw, 1.35rem)",
                            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.05)",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "-6px",
                              transform: "translateY(-50%) rotate(45deg)",
                              width: "10px",
                              height: "10px",
                              background: "#ffffff",
                              borderLeft: "1px solid var(--border)",
                              borderBottom: "1px solid var(--border)",
                            }}
                          />

                          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)", fontWeight: 700, color: "#0f172a", margin: "0 0 0.25rem 0", lineHeight: 1.2 }}>
                            {s.title}
                          </h4>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.78rem, 2vw, 0.85rem)", color: "#475569", margin: 0, lineHeight: 1.5 }}>
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Our Positioning — Full Width, No Background Box */}
              <div style={{ width: "100%", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.85rem" }}>
                  Our Positioning
                </h4>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "#334155", lineHeight: 1.7, margin: 0 }}>
                  <strong>Not a Passive VC Fund:</strong> We don't chase 100x speculative outliers or force unnatural burn rates. Every venture is underwritten on real operating cash flows.<br />
                  <strong>Not an Accelerator:</strong> No batch cohorts, demo days, or generic lectures. Direct, hands-on operating partnership.<br />
                  <strong>Not an External CFO Service:</strong> We don't bill hourly consulting fees. We share co-responsibility for operational and commercial milestones under a unified mandate.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Bar */}
        <div
          style={{
            padding: "1.25rem clamp(1.25rem, 3vw, 2.25rem)",
            background: "#f8fafc",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => {
              onClose();
              onOpenContact(isInvoice ? "funding" : "business");
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              fontWeight: 700,
              padding: "0.85rem 2.5rem",
              background: "var(--cta)",
              color: "var(--cta-foreground)",
              borderRadius: "var(--radius)",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(255,105,0,0.25)",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)")}
          >
            {isInvoice && "Let's Unlock"}
            {isVentures && "Let's Venture"}
            {isStartup && "Let's Partner"} <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
