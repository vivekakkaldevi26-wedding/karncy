import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, RefreshCw, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  action?: {
    label: string;
    modalType: "funding" | "business" | "contact";
  };
}

interface PreexistingQuestion {
  id: string;
  question: string;
  answer: string;
  actionLabel?: string;
  modalType?: "funding" | "business" | "contact";
}

const PREEXISTING_QUESTIONS: PreexistingQuestion[] = [
  {
    id: "funding-speed",
    question: "How fast can I get invoice funding?",
    answer: "Our automated risk underwriting engine evaluates verified invoices within 24 to 48 hours. Once approved, working capital is disbursed directly into your business bank account with zero equity dilution.",
    actionLabel: "Let's Unlock Capital",
    modalType: "funding",
  },
  {
    id: "eligibility",
    question: "What criteria are required for Karncy Financing?",
    answer: "To qualify for invoice financing: 1) Active B2B/MSME business operating in India, 2) Verified unpaid customer invoices or purchase orders, 3) Minimum 6 months banking history. Capital ranges from ₹5 Lakhs up to ₹5 Crores.",
    actionLabel: "Apply for Funding",
    modalType: "funding",
  },
  {
    id: "ventures",
    question: "How does Karncy Equity venture partnership work?",
    answer: "Karncy Equity collaborates with early and growth-stage startups. We provide growth capital, institutional credit access, and strategic mentorship in exchange for equity ownership.",
    actionLabel: "Let's Partner",
    modalType: "business",
  },
  {
    id: "documents",
    question: "What documents are needed to apply?",
    answer: "You only need: 1) GST Returns & Bank Statements (last 6 months), 2) Copy of unpaid customer invoices/POs, and 3) Basic business registration (GST/Udyam/PAN).",
    actionLabel: "Talk to Karncy directly",
    modalType: "funding",
  },
  {
    id: "contact",
    question: "How can I reach the Karncy team?",
    answer: "You can click 'Reach Us' to submit a direct inquiry, or email our support team directly at privacy@karncy.com for general assistance.",
    actionLabel: "Reach Us Now",
    modalType: "contact",
  },
];

interface AIChatbotProps {
  onOpenModal: (type: "funding" | "business" | "contact") => void;
}

export function AIChatbot({ onOpenModal }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessage: Message = {
    id: "welcome-1",
    sender: "bot",
    text: "Hello! I am Karncy Assistant. How can I help unlock your business growth today?",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const handleSelectQuestion = (q: PreexistingQuestion) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: q.question,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: q.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        action: q.actionLabel && q.modalType ? { label: q.actionLabel, modalType: q.modalType } : undefined,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = input.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Knowledge matching logic
    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText = "";
      let actionObj: Message["action"] = undefined;

      if (lower.includes("fast") || lower.includes("speed") || lower.includes("time") || lower.includes("hours") || lower.includes("how long")) {
        replyText = "Karncy processes working capital requests within 24 to 48 hours upon document verification. Disbursements are fast and equity-free!";
        actionObj = { label: "Apply for Funding", modalType: "funding" };
      } else if (lower.includes("invoice") || lower.includes("financing") || lower.includes("credit") || lower.includes("capital")) {
        replyText = "Karncy Financing allows MSMEs to convert unpaid invoices into instant cash flow from ₹5L up to ₹5Cr with transparent terms.";
        actionObj = { label: "Let's Unlock", modalType: "funding" };
      } else if (lower.includes("venture") || lower.includes("equity") || lower.includes("startup") || lower.includes("partner")) {
        replyText = "Karncy Ventures & Equity program offers strategic growth capital and institutional partnership for high-velocity companies.";
        actionObj = { label: "Let's Partner", modalType: "business" };
      } else if (lower.includes("contact") || lower.includes("reach") || lower.includes("phone") || lower.includes("email") || lower.includes("team")) {
        replyText = "You can connect with our team directly through the 'Reach Us' portal or email privacy@karncy.com.";
        actionObj = { label: "Reach Us", modalType: "contact" };
      } else if (lower.includes("doc") || lower.includes("gst") || lower.includes("require") || lower.includes("eligib")) {
        replyText = "Required documents include GST returns, bank statements for the last 6 months, and verified invoice/purchase order copies.";
        actionObj = { label: "Talk to Karncy directly", modalType: "funding" };
      } else {
        replyText = "Thank you for reaching out! Our team is available to assist you with tailored credit solutions or venture partnerships.";
        actionObj = { label: "Talk to Karncy directly", modalType: "contact" };
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        action: actionObj,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleReset = () => {
    setMessages([initialMessage]);
  };

  return (
    <>
      {/* ─── Floating Action Button (FAB) ─── */}
      <div style={{ position: "fixed", bottom: "1.75rem", right: "1.75rem", zIndex: 250 }}>
        {!isOpen && hasUnread && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: "absolute",
              bottom: "4rem",
              right: 0,
              background: "#0f172a",
              color: "#ffffff",
              padding: "0.5rem 0.9rem",
              borderRadius: "9999px",
              boxShadow: "0 10px 25px rgba(15,23,42,0.3)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Ask Karncy
          </motion.div>
        )}

        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Toggle Karncy Chatbot"
          style={{
            width: "3.6rem",
            height: "3.6rem",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--primary) 0%, #1e3a8a 100%)",
            color: "#ffffff",
            border: "2px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 24px rgba(13,31,130,0.4), 0 0 16px rgba(255,105,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <>
              <MessageSquare size={22} />
              {hasUnread && (
                <span
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "3px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "var(--cta)",
                    border: "2px solid #ffffff",
                  }}
                />
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* ─── Chatbot Modal Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              bottom: "6rem",
              right: "1.75rem",
              width: "clamp(320px, 92vw, 400px)",
              height: "540px",
              maxHeight: "calc(85vh - 6rem)",
              background: "#ffffff",
              border: "1px solid var(--border)",
              borderRadius: "calc(var(--radius) * 1.6)",
              boxShadow: "0 20px 50px rgba(15,23,42,0.22)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 260,
            }}
          >
            {/* Header (No robot head icon, Header title: Karncy Assistant) */}
            <div
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                color: "#ffffff",
                padding: "1.1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      margin: 0,
                    }}
                  >
                    Karncy Assistant
                  </h4>
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "inline-block",
                    }}
                  />
                </div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "#94a3b8" }}>
                  Instant SME & Capital Advisor
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "none",
                    borderRadius: "50%",
                    width: "1.8rem",
                    height: "1.8rem",
                    color: "#cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <RefreshCw size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Chatbot"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "none",
                    borderRadius: "50%",
                    width: "1.8rem",
                    height: "1.8rem",
                    color: "#cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Chat Body / Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                background: "#f8fafc",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "88%",
                      padding: "0.75rem 0.95rem",
                      borderRadius: msg.sender === "user" ? "1.1rem 1.1rem 0.2rem 1.1rem" : "1.1rem 1.1rem 1.1rem 0.2rem",
                      background: msg.sender === "user" ? "var(--primary)" : "#ffffff",
                      color: msg.sender === "user" ? "#ffffff" : "#0f172a",
                      border: msg.sender === "user" ? "none" : "1px solid var(--border)",
                      boxShadow: msg.sender === "user" ? "0 4px 12px rgba(13,31,130,0.18)" : "0 2px 8px rgba(15,23,42,0.04)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {msg.text}

                    {/* Action Button inside reply (Text Left, Icon Right) */}
                    {msg.action && (
                      <div style={{ marginTop: "0.6rem" }}>
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            onOpenModal(msg.action!.modalType);
                          }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.45rem",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            padding: "0.45rem 0.9rem",
                            background: "var(--cta)",
                            color: "var(--cta-foreground)",
                            borderRadius: "9999px",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(255,105,0,0.25)",
                          }}
                        >
                          <span>{msg.action.label}</span>
                          <ArrowRight size={13} style={{ flexShrink: 0 }} />
                        </button>
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      color: "#94a3b8",
                      marginTop: "0.25rem",
                      padding: "0 0.2rem",
                    }}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Suggested Questions List displayed directly in Chat Body */}
              {messages.length === 1 && (
                <div style={{ marginTop: "0.2rem", display: "flex", flexDirection: "column", gap: "0.45rem", maxWidth: "92%" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "0.1rem",
                    }}
                  >
                    Suggested Questions
                  </span>
                  {PREEXISTING_QUESTIONS.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => handleSelectQuestion(q)}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "var(--primary)",
                        background: "#ffffff",
                        border: "1px solid rgba(13,31,130,0.16)",
                        borderRadius: "0.65rem",
                        padding: "0.55rem 0.85rem",
                        textAlign: "left",
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(15,23,42,0.03)",
                        transition: "all 0.15s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        btn.style.background = "rgba(13,31,130,0.04)";
                        btn.style.borderColor = "var(--primary)";
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        btn.style.background = "#ffffff";
                        btn.style.borderColor = "rgba(13,31,130,0.16)";
                      }}
                    >
                      <span>{q.question}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      padding: "0.6rem 0.9rem",
                      borderRadius: "1.1rem 1.1rem 1.1rem 0.2rem",
                      background: "#ffffff",
                      border: "1px solid var(--border)",
                      display: "flex",
                      gap: "0.3rem",
                      alignItems: "center",
                    }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--primary)" }}
                    />
                    <motion.span
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--primary)" }}
                    />
                    <motion.span
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--primary)" }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: "0.75rem 0.85rem",
                background: "#ffffff",
                borderTop: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <input
                type="text"
                placeholder="Ask about funding, criteria, rates..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.6rem 0.85rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.84rem",
                  color: "#0f172a",
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "9999px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "50%",
                  background: input.trim() ? "var(--primary)" : "#cbd5e1",
                  color: "#ffffff",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() ? "pointer" : "default",
                  transition: "background 0.15s",
                }}
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
