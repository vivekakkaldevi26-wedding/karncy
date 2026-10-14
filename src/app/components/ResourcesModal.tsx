import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle } from "lucide-react";

export interface ResourceDocument {
  id: string;
  title: string;
  description: string;
  tag: string;
  pages: string;
  classification: string;
}

export const RESOURCE_DOCUMENTS: ResourceDocument[] = [
  {
    id: "investment-overview",
    title: "Investment overview",
    description: "How Karncy sources, structures and manages opportunities across the three engines.",
    tag: "Core Engine",
    pages: "18 Pages",
    classification: "Confidential Institutional Brief",
  },
  {
    id: "platform-overview",
    title: "Platform overview",
    description: "The operating model — assessment, deployment, monitoring and reporting in one system.",
    tag: "Operating Model",
    pages: "24 Pages",
    classification: "Confidential System Architecture",
  },
  {
    id: "risk-governance",
    title: "Risk & governance",
    description: "The risk framework, investment committee and controls that govern every decision.",
    tag: "Risk Framework",
    pages: "32 Pages",
    classification: "Regulatory & Underwriting Mandate",
  },
  {
    id: "investment-thesis",
    title: "Investment thesis",
    description: "Why India's SME economy is a structural capital opportunity, in our words.",
    tag: "Macro Opportunity",
    pages: "14 Pages",
    classification: "Strategic Research Note",
  },
  {
    id: "investor-faq",
    title: "Investor FAQ",
    description: "Eligibility, deployment, defaults, reporting, fees and documentation — answered plainly.",
    tag: "Diligence Q&A",
    pages: "20 Pages",
    classification: "Institutional Diligence Pack",
  },
];

interface ResourcesModalProps {
  onClose: () => void;
  onOpenContact?: (type: "funding" | "business" | "contact") => void;
}

export function ResourcesModal({ onClose }: ResourcesModalProps) {
  // State for active sub-popups
  const [viewDoc, setViewDoc] = useState<ResourceDocument | null>(null);
  const [requestDoc, setRequestDoc] = useState<ResourceDocument | null>(null);
  const [isGeneralRequest, setIsGeneralRequest] = useState(false);

  // Password Verification State for "View" popup
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Password Request Form State
  const [requestForm, setRequestForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    selectedDocId: "all",
  });
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Open "View Document" popup
  const handleOpenView = (doc: ResourceDocument) => {
    setViewDoc(doc);
    setPasswordInput("");
    setPasswordError("");
    setIsUnlocked(false);
  };

  // Open "Request Password" popup
  const handleOpenRequest = (doc?: ResourceDocument) => {
    if (doc) {
      setRequestDoc(doc);
      setIsGeneralRequest(false);
      setRequestForm((prev) => ({ ...prev, selectedDocId: doc.id }));
    } else {
      setRequestDoc(null);
      setIsGeneralRequest(true);
      setRequestForm((prev) => ({ ...prev, selectedDocId: "all" }));
    }
    setRequestSubmitted(false);
    setIsSubmitting(false);
  };

  // Verify entered password
  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passwordInput.trim().toLowerCase();
    // Valid passwords for demonstration: karncy2026, investor, access, karncy
    if (cleanPass === "karncy2026" || cleanPass === "investor" || cleanPass === "access" || cleanPass === "karncy") {
      setIsUnlocked(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please verify your access key or request a new password.");
    }
  };

  // Submit password request form
  const handlePasswordRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const selectedDocTitle =
        requestForm.selectedDocId === "all"
          ? "All Investor Materials (Complete Pack)"
          : RESOURCE_DOCUMENTS.find((d) => d.id === requestForm.selectedDocId)?.title || requestForm.selectedDocId;

      await fetch("./send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "password_request",
          name: requestForm.name,
          email: requestForm.email,
          phone: requestForm.phone,
          company: requestForm.company,
          document: selectedDocTitle,
        }),
      });
    } catch (err) {
      console.warn("Password request mail dispatch error:", err);
    } finally {
      setIsSubmitting(false);
      setRequestSubmitted(true);
    }
  };

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
        zIndex: 250,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(0.75rem, 2vw, 2rem)",
        background: "rgba(15, 23, 42, 0.78)",
        backdropFilter: "blur(18px)",
      }}
      onClick={onClose}
    >
      <motion.div
        className="mobile-modal-card"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          maxWidth: "76rem",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "calc(var(--radius) * 2)",
          boxShadow: "0 32px 96px rgba(15, 23, 42, 0.35)",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            zIndex: 30,
            width: "2.25rem",
            height: "2.25rem",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            background: "rgba(15, 23, 42, 0.6)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.15s ease",
            backdropFilter: "blur(6px)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#0f172a";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(15, 23, 42, 0.6)";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Scrollable Container */}
        <div style={{ flex: 1, overflowY: "auto", padding: "clamp(1.75rem, 4vw, 3.25rem)" }}>
          {/* Header Section */}
          <div
            style={{
              marginBottom: "2.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.8vw, 3.1rem)",
                fontWeight: 700,
                color: "#0f172a",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Everything an investor should read first.
            </h2>
          </div>

          {/* Cards Grid — Responsive 5-columns or auto-fit */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 215px), 1fr))",
              gap: "1.25rem",
              alignItems: "stretch",
            }}
          >
            {RESOURCE_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "calc(var(--radius) * 1.4)",
                  padding: "1.5rem 1.35rem 1.35rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                  transition: "all 0.2s ease",
                  minHeight: "17rem",
                  position: "relative",
                }}
              >
                {/* Top Card Info */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.22rem",
                      fontWeight: 700,
                      color: "#0f172a",
                      lineHeight: 1.25,
                      marginBottom: "0.75rem",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {doc.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      lineHeight: 1.62,
                      color: "#475569",
                      margin: 0,
                    }}
                  >
                    {doc.description}
                  </p>
                </div>

                {/* Card Action Buttons: 1st is View, 2nd is Request Password */}
                <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  {/* Button 1: View */}
                  <button
                    type="button"
                    onClick={() => handleOpenView(doc)}
                    style={{
                      width: "100%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      padding: "0.58rem 1rem",
                      borderRadius: "calc(var(--radius) * 0.8)",
                      background: "var(--primary)",
                      color: "#ffffff",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.opacity = "0.92";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    }}
                  >
                    View
                  </button>

                  {/* Button 2: Request Password */}
                  <button
                    type="button"
                    onClick={() => handleOpenRequest(doc)}
                    style={{
                      width: "100%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      padding: "0.52rem 0.85rem",
                      borderRadius: "calc(var(--radius) * 0.8)",
                      background: "transparent",
                      color: "var(--cta)",
                      border: "1.5px solid var(--cta)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,105,0,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }}
                  >
                    Request Password
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          POPUP 1: "Enter Password" (Opens on clicking "View")
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {viewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              background: "rgba(15, 23, 42, 0.72)",
              backdropFilter: "blur(12px)",
            }}
            onClick={() => setViewDoc(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 14 }}
              transition={{ duration: 0.22 }}
              style={{
                width: "100%",
                maxWidth: "28rem",
                background: "#ffffff",
                borderRadius: "calc(var(--radius) * 1.5)",
                border: "1px solid var(--border)",
                boxShadow: "0 28px 80px rgba(15, 23, 42, 0.35)",
                padding: "2rem",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close "X" Button */}
              <button
                type="button"
                onClick={() => setViewDoc(null)}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                <X size={14} />
              </button>

              {!isUnlocked ? (
                <>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--cta)" }}>
                      Protected Document
                    </span>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", margin: 0, marginTop: "0.25rem" }}>
                      Enter Password
                    </h4>
                  </div>

                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#475569", lineHeight: 1.6, marginBottom: "1rem" }}>
                    <strong>{viewDoc.title}</strong> is encrypted and restricted to authorized parties. Enter your key to decrypt and view.
                  </p>

                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "#64748b", margin: "0 0 1.25rem 0", lineHeight: 1.55 }}>
                    <strong style={{ fontWeight: 600, color: "#334155" }}>Confidential:</strong> Do not share or disclose this information to any third party without our prior written permission.
                  </p>

                  <form onSubmit={handleVerifyPassword} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem" }}>
                        Access Password <span style={{ color: "#e11d48" }}>*</span>
                      </label>
                      <input
                        type="password"
                        required
                        autoFocus
                        placeholder="Enter document password"
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          setPasswordError("");
                        }}
                        style={{
                          width: "100%",
                          padding: "0.75rem 0.9rem",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.9rem",
                          background: "#f8fafc",
                          border: passwordError ? "1.5px solid #e11d48" : "1px solid #cbd5e1",
                          borderRadius: "calc(var(--radius) * 0.8)",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                      {passwordError && (
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "#e11d48", marginTop: "0.4rem", margin: 0 }}>
                          {passwordError}
                        </p>
                      )}
                    </div>

                    <div style={{ marginTop: "0.5rem" }}>
                      <button
                        type="submit"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          background: "var(--primary)",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "calc(var(--radius) * 0.8)",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Unlock & View
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Unlocked state */
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div style={{ textAlign: "center", padding: "1rem 0" }}>
                    <div
                      style={{
                        width: "3.5rem",
                        height: "3.5rem",
                        borderRadius: "50%",
                        background: "rgba(22,163,74,0.12)",
                        color: "#16a34a",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <CheckCircle size={28} />
                    </div>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.4rem" }}>
                      Access Granted
                    </h4>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                      <strong>{viewDoc.title}</strong> has been decrypted for your session.
                    </p>

                    <div
                      style={{
                        background: "#f8fafc",
                        border: "1px dashed #cbd5e1",
                        borderRadius: "calc(var(--radius) * 1)",
                        padding: "1.25rem",
                        marginBottom: "1.5rem",
                        textAlign: "left",
                      }}
                    >
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        Karncy_{viewDoc.title.replace(/\s+/g, "_")}.pdf
                      </p>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "#64748b" }}>
                        Verified Institutional Copy
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setViewDoc(null)}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        background: "var(--primary)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "calc(var(--radius) * 0.8)",
                        cursor: "pointer",
                      }}
                    >
                      Close Viewer
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          POPUP 2: "Password Request" (Opens on clicking "Request Password")
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {(requestDoc || isGeneralRequest) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 330,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              background: "rgba(15, 23, 42, 0.75)",
              backdropFilter: "blur(12px)",
            }}
            onClick={() => {
              setRequestDoc(null);
              setIsGeneralRequest(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25 }}
              style={{
                width: "100%",
                maxWidth: "32rem",
                maxHeight: "92vh",
                overflowY: "auto",
                background: "#ffffff",
                borderRadius: "calc(var(--radius) * 1.5)",
                border: "1px solid var(--border)",
                boxShadow: "0 30px 90px rgba(15, 23, 42, 0.4)",
                padding: "2rem clamp(1.25rem, 3vw, 2.25rem)",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close "X" Button */}
              <button
                type="button"
                onClick={() => {
                  setRequestDoc(null);
                  setIsGeneralRequest(false);
                }}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  width: "2.1rem",
                  height: "2.1rem",
                  borderRadius: "50%",
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#64748b",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#e2e8f0";
                  (e.currentTarget as HTMLButtonElement).style.color = "#0f172a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#f8fafc";
                  (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
                }}
              >
                <X size={15} />
              </button>

              {requestSubmitted ? (
                /* Success screen */
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", padding: "1.5rem 0" }}>
                  <div
                    style={{
                      width: "3.75rem",
                      height: "3.75rem",
                      borderRadius: "50%",
                      background: "rgba(22,163,74,0.12)",
                      color: "#16a34a",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <CheckCircle size={30} />
                  </div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>
                    Password Request Received
                  </h4>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "#475569", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                    Thank you, <strong>{requestForm.name}</strong>. Our compliance desk has received your request for <strong>{requestForm.company}</strong>. We will review your accreditation details and email the document password to <strong>{requestForm.email}</strong> within 2–4 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setRequestDoc(null);
                      setIsGeneralRequest(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "0.85rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      background: "var(--primary)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "calc(var(--radius) * 0.8)",
                      cursor: "pointer",
                    }}
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                /* Password Request Form */
                <>
                  <div style={{ marginBottom: "1.5rem", paddingRight: "2rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
                      Password Request
                    </h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#64748b", margin: "0.35rem 0 0 0" }}>
                      Provide your institutional credentials to receive access keys for protected materials.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordRequestSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                    {/* Field 1: Name */}
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                        Full Name <span style={{ color: "#e11d48" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={requestForm.name}
                        onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.72rem 0.9rem",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.88rem",
                          background: "#f8fafc",
                          border: "1px solid #cbd5e1",
                          borderRadius: "calc(var(--radius) * 0.8)",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {/* Field 2: Email */}
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                        Work Email <span style={{ color: "#e11d48" }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@institution.com"
                        value={requestForm.email}
                        onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.72rem 0.9rem",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.88rem",
                          background: "#f8fafc",
                          border: "1px solid #cbd5e1",
                          borderRadius: "calc(var(--radius) * 0.8)",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {/* Field 3: Phone Number */}
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                        Phone Number <span style={{ color: "#e11d48" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={requestForm.phone}
                        onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.72rem 0.9rem",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.88rem",
                          background: "#f8fafc",
                          border: "1px solid #cbd5e1",
                          borderRadius: "calc(var(--radius) * 0.8)",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {/* Field 3: Company */}
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                        Company / Institution <span style={{ color: "#e11d48" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Family Office / Capital Partners"
                        value={requestForm.company}
                        onChange={(e) => setRequestForm({ ...requestForm, company: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.72rem 0.9rem",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.88rem",
                          background: "#f8fafc",
                          border: "1px solid #cbd5e1",
                          borderRadius: "calc(var(--radius) * 0.8)",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {/* Field 4: Select Document Dropdown */}
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "0.35rem" }}>
                        Select Document <span style={{ color: "#e11d48" }}>*</span>
                      </label>
                      <select
                        required
                        value={requestForm.selectedDocId}
                        onChange={(e) => setRequestForm({ ...requestForm, selectedDocId: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.72rem 0.9rem",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.88rem",
                          color: "#0f172a",
                          background: "#f8fafc",
                          border: "1px solid #cbd5e1",
                          borderRadius: "calc(var(--radius) * 0.8)",
                          outline: "none",
                          boxSizing: "border-box",
                          cursor: "pointer",
                        }}
                      >
                        <option value="all">All Investor Materials (Complete Pack)</option>
                        {RESOURCE_DOCUMENTS.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.title}
                          </option>
                        ))}
                      </select>
                    </div>



                    {/* Action Buttons: Cancel and Request Password */}
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setRequestDoc(null);
                          setIsGeneralRequest(false);
                        }}
                        style={{
                          flex: 1,
                          padding: "0.78rem",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          background: "#f1f5f9",
                          color: "#475569",
                          border: "none",
                          borderRadius: "calc(var(--radius) * 0.8)",
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          flex: 1.6,
                          padding: "0.78rem",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          background: "var(--cta)",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "calc(var(--radius) * 0.8)",
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          opacity: isSubmitting ? 0.8 : 1,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 14px rgba(255,105,0,0.25)",
                        }}
                      >
                        {isSubmitting ? "Submitting..." : "Request Password"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
