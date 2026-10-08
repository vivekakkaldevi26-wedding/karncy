import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, RefreshCw, ArrowRight } from "lucide-react";

export interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: string[];
  action?: {
    label: string;
    modalType: "funding" | "business" | "contact";
  };
}

interface UserData {
  product?: string;
  fundingNeed?: string;
  hasUnpaidInvoices?: string;
  invoiceValue?: string;
  timeframe?: string;
  ventureType?: string;
  hasProjectPlan?: string;
  ventureFunding?: string;
  ventureStage?: string;
  startupStage?: string;
  startupFunding?: string;
  fundingUse?: string;
  startupRevenue?: string;
  name?: string;
  phone?: string;
  email?: string;
  handoffTopic?: string;
}

type FlowState =
  | "main_menu"
  // Invoice flow
  | "invoice_q1"
  | "invoice_q2"
  | "invoice_q3"
  | "invoice_q4"
  | "invoice_complete"
  // Joint Ventures flow
  | "jv_q1"
  | "jv_q2"
  | "jv_q3"
  | "jv_q4"
  | "jv_complete"
  // Startup Funding flow
  | "startup_q1"
  | "startup_q2"
  | "startup_q3"
  | "startup_q4"
  | "startup_complete"
  // Investment flow
  | "invest_menu"
  // Handoff flow
  | "handoff_name"
  | "handoff_phone"
  | "handoff_email"
  | "handoff_topic"
  | "handoff_complete"
  // General Q
  | "general_q"
  | "unknown_fallback";

const MAIN_MENU_OPTIONS = [
  "Invoice Financing",
  "Joint Ventures",
  "Startup Funding",
  "I want to invest",
  "General Question",
  "Talk to the Team",
];

interface AIChatbotProps {
  onOpenModal: (type: "funding" | "business" | "contact") => void;
}

export function AIChatbot({ onOpenModal }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [flowState, setFlowState] = useState<FlowState>("main_menu");
  const [userData, setUserData] = useState<UserData>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getTimestamp = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const initialMessage: Message = {
    id: "welcome-1",
    sender: "bot",
    text: "Hi 👋 Welcome to Karncy.\nHow can we help you today?",
    timestamp: getTimestamp(),
    options: MAIN_MENU_OPTIONS,
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

  const handleReset = () => {
    setFlowState("main_menu");
    setUserData({});
    setMessages([initialMessage]);
  };

  const addBotReply = (text: string, options?: string[], action?: Message["action"], delay = 500) => {
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text,
        timestamp: getTimestamp(),
        options,
        action,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleOptionClick = (optionText: string) => {
    // 1. Render user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: optionText,
      timestamp: getTimestamp(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. State Machine Transitions
    const lower = optionText.toLowerCase();

    // Check Global Handoff or Menu triggers
    if (optionText === "Talk to the Team" || optionText === "Talk to Team" || optionText === "Connect with the Team" || optionText === "Request a Callback") {
      startHandoffFlow();
      return;
    }
    if (optionText === "Main Menu" || optionText === "Ask Another Question" || optionText === "Continue Exploring") {
      setFlowState("main_menu");
      addBotReply("Hi 👋 Welcome back to Karncy.\nHow can we help you today?", MAIN_MENU_OPTIONS);
      return;
    }
    if (optionText === "Apply Now" || optionText === "Let's Unlock Capital") {
      onOpenModal("funding");
      addBotReply("Opening the Karncy Financing application modal for you now...", ["Main Menu", "Talk to the Team"]);
      return;
    }
    if (optionText === "Submit Project" || optionText === "Let's Partner") {
      onOpenModal("business");
      addBotReply("Opening the Joint Venture & Equity application modal for you now...", ["Main Menu", "Talk to the Team"]);
      return;
    }
    if (optionText === "Reach Us Now") {
      onOpenModal("contact");
      addBotReply("Opening the Reach Us contact form for you now...", ["Main Menu", "Talk to the Team"]);
      return;
    }

    // --- State Machine ---
    switch (flowState) {
      case "main_menu":
        if (optionText === "Invoice Financing") {
          setFlowState("invoice_q1");
          setUserData((prev) => ({ ...prev, product: "Invoice Financing" }));
          addBotReply(
            "Sure. I can help you understand Invoice Financing and check your basic requirement.\n\nWhat do you need funding for?",
            ["Working Capital", "Business Expenses", "Cash Flow", "Other"]
          );
        } else if (optionText === "Joint Ventures") {
          setFlowState("jv_q1");
          setUserData((prev) => ({ ...prev, product: "Joint Ventures" }));
          addBotReply(
            "Sure. Let me understand your Joint Venture requirement.\n\nWhat type of venture are you planning?",
            ["Real Estate", "Business Project", "Commercial Project", "Other"]
          );
        } else if (optionText === "Startup Funding") {
          setFlowState("startup_q1");
          setUserData((prev) => ({ ...prev, product: "Startup Funding" }));
          addBotReply(
            "Sure. Let me understand your startup and funding requirement.\n\nWhat stage is your startup currently in?",
            ["Idea Stage", "Early Stage", "Revenue Generating", "Growth / Expansion"]
          );
        } else if (optionText === "I want to invest") {
          setFlowState("invest_menu");
          addBotReply(
            "Sure. Karncy also helps users explore investment opportunities.\nTo help you better, would you like to:",
            ["Explore Opportunities", "Learn How It Works", "Talk to the Team", "Main Menu"]
          );
        } else if (optionText === "General Question") {
          setFlowState("general_q");
          addBotReply(
            "Karncy provides funding solutions for businesses, ventures, and startups through three main products:\n\n• Invoice Financing\n• Joint Ventures\n• Startup Funding\n\nWhat would you like to know about?",
            ["Invoice Financing", "Joint Ventures", "Startup Funding", "Talk to the Team"]
          );
        }
        break;

      // --- Invoice Flow ---
      case "invoice_q1":
        setUserData((prev) => ({ ...prev, fundingNeed: optionText }));
        setFlowState("invoice_q2");
        addBotReply("Do you currently have unpaid invoices from your customers?", ["Yes", "No", "Not Sure"]);
        break;

      case "invoice_q2":
        setUserData((prev) => ({ ...prev, hasUnpaidInvoices: optionText }));
        setFlowState("invoice_q3");
        addBotReply("What is the approximate value of the invoices?", ["Below ₹10 Lakhs", "₹10–50 Lakhs", "₹50 Lakhs–₹1 Crore", "Above ₹1 Crore", "Not Sure"]);
        break;

      case "invoice_q3":
        setUserData((prev) => ({ ...prev, invoiceValue: optionText }));
        setFlowState("invoice_q4");
        addBotReply("How soon do you need the funding?", ["Immediately", "Within 1 Week", "Within 1 Month", "Just Exploring"]);
        break;

      case "invoice_q4":
        setUserData((prev) => ({ ...prev, timeframe: optionText }));
        setFlowState("invoice_complete");
        addBotReply(
          "Thanks. I have the basic details about your requirement.\nOur team can review your requirement and guide you through the next steps.",
          ["Apply Now", "Talk to the Team", "Ask Another Question", "Main Menu"],
          { label: "Apply Now", modalType: "funding" }
        );
        break;

      // --- Joint Ventures Flow ---
      case "jv_q1":
        setUserData((prev) => ({ ...prev, ventureType: optionText }));
        setFlowState("jv_q2");
        addBotReply("Do you already have a project or business plan?", ["Yes", "No", "In Progress"]);
        break;

      case "jv_q2":
        setUserData((prev) => ({ ...prev, hasProjectPlan: optionText }));
        setFlowState("jv_q3");
        addBotReply("What is the approximate funding requirement?", ["Below ₹25 Lakhs", "₹25–50 Lakhs", "₹50 Lakhs–₹1 Crore", "Above ₹1 Crore", "Not Sure"]);
        break;

      case "jv_q3":
        setUserData((prev) => ({ ...prev, ventureFunding: optionText }));
        setFlowState("jv_q4");
        addBotReply("What stage is your project currently in?", ["Planning", "Ready to Start", "Already Operating", "Expansion"]);
        break;

      case "jv_q4":
        setUserData((prev) => ({ ...prev, ventureStage: optionText }));
        setFlowState("jv_complete");
        addBotReply(
          "Thanks. I have the basic details about your venture.\nA detailed discussion with our team may be required to understand the project and funding requirement.",
          ["Submit Project", "Talk to the Team", "Ask Another Question", "Main Menu"],
          { label: "Submit Project", modalType: "business" }
        );
        break;

      // --- Startup Funding Flow ---
      case "startup_q1":
        setUserData((prev) => ({ ...prev, startupStage: optionText }));
        setFlowState("startup_q2");
        addBotReply("How much funding are you looking for?", ["Below ₹25 Lakhs", "₹25–50 Lakhs", "₹50 Lakhs–₹1 Crore", "Above ₹1 Crore", "Not Sure"]);
        break;

      case "startup_q2":
        setUserData((prev) => ({ ...prev, startupFunding: optionText }));
        setFlowState("startup_q3");
        addBotReply("What will the funding mainly be used for?", ["Product Development", "Marketing", "Hiring", "Expansion", "Working Capital", "Other"]);
        break;

      case "startup_q3":
        setUserData((prev) => ({ ...prev, fundingUse: optionText }));
        setFlowState("startup_q4");
        addBotReply("Is your startup currently generating revenue?", ["Yes", "No", "Starting Soon"]);
        break;

      case "startup_q4":
        setUserData((prev) => ({ ...prev, startupRevenue: optionText }));
        setFlowState("startup_complete");
        addBotReply(
          "Thanks. I have the basic details about your startup.\nOur team can review your requirement and discuss the appropriate next steps with you.",
          ["Apply Now", "Talk to the Team", "Ask Another Question", "Main Menu"],
          { label: "Apply Now", modalType: "business" }
        );
        break;

      // --- Investment Flow ---
      case "invest_menu":
        if (optionText === "Explore Opportunities" || optionText === "Learn How It Works") {
          addBotReply(
            "Karncy SME Synergy Fund connects accredited and institutional investors with curated private credit opportunities.\nTarget preferred returns are payable strictly from distributable cash flow.",
            ["Talk to the Team", "Main Menu"],
            { label: "Reach Us", modalType: "contact" }
          );
        }
        break;

      // --- Handoff Topic ---
      case "handoff_topic":
        setUserData((prev) => ({ ...prev, handoffTopic: optionText }));
        setFlowState("handoff_complete");
        addBotReply(
          `Thank you, ${userData.name || "valued visitor"}.\nWe have received your request. The Karncy team can review your requirement and contact you shortly.`,
          ["Main Menu"],
          { label: "Reach Us", modalType: "contact" }
        );
        break;

      default:
        setFlowState("main_menu");
        addBotReply("How can we help you today?", MAIN_MENU_OPTIONS);
        break;
    }
  };

  const startHandoffFlow = () => {
    setFlowState("handoff_name");
    addBotReply("Sure. I can help you connect with the Karncy team.\n\nWhat is your name?");
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = input.trim();
    if (!query) return;

    // 1. Render user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: getTimestamp(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const lower = query.toLowerCase();

    // Check for Human Handoff Triggers
    const humanTriggers = ["human", "talk to someone", "contact team", "call me", "speak to someone", "contact karncy", "need help", "expert", "talk to an expert"];
    if (humanTriggers.some((t) => lower.includes(t))) {
      startHandoffFlow();
      return;
    }

    // Handing text inputs in Handoff Flow
    if (flowState === "handoff_name") {
      setUserData((prev) => ({ ...prev, name: query }));
      setFlowState("handoff_phone");
      addBotReply(`Thank you, ${query}.\nWhat is your phone number?`);
      return;
    }

    if (flowState === "handoff_phone") {
      setUserData((prev) => ({ ...prev, phone: query }));
      setFlowState("handoff_email");
      addBotReply("What is your email address?");
      return;
    }

    if (flowState === "handoff_email") {
      setUserData((prev) => ({ ...prev, email: query }));
      setFlowState("handoff_topic");
      addBotReply("What would you like to discuss?", [
        "Invoice Financing",
        "Joint Ventures",
        "Startup Funding",
        "Investment",
        "Other",
      ]);
      return;
    }

    // Knowledge & Product Answers (No invented promises)
    if (lower.includes("invoice") && (lower.includes("what") || lower.includes("how") || lower.includes("work"))) {
      addBotReply(
        "Invoice Financing turns outstanding receivables into immediate working capital without waiting 30–90 days for buyer settlement.\n\nWould you like to check your requirement with a few quick questions?",
        ["Invoice Financing", "Talk to the Team", "Main Menu"]
      );
      return;
    }

    if (lower.includes("venture") && (lower.includes("what") || lower.includes("how") || lower.includes("work"))) {
      addBotReply(
        "Joint Ventures with Karncy provide co-investment, project funding, and strategic execution for commercial & real estate projects.\n\nWould you like to check your venture requirement?",
        ["Joint Ventures", "Talk to the Team", "Main Menu"]
      );
      return;
    }

    if (lower.includes("startup") && (lower.includes("what") || lower.includes("how") || lower.includes("work"))) {
      addBotReply(
        "Startup Funding provides non-dilutive and growth equity partnerships for early to expansion stage startups.\n\nWould you like to check your startup requirement?",
        ["Startup Funding", "Talk to the Team", "Main Menu"]
      );
      return;
    }

    if (lower.includes("karncy") && lower.includes("what")) {
      addBotReply(
        "Karncy provides funding solutions for businesses, ventures, and startups through three main products:\n\n• Invoice Financing\n• Joint Ventures\n• Startup Funding\n\nWhat would you like to know about?",
        ["Invoice Financing", "Joint Ventures", "Startup Funding", "Talk to the Team"]
      );
      return;
    }

    // Fallback for complex/unknown questions
    addBotReply(
      "That's a detailed question and may depend on your specific situation.\nIt's better to discuss this directly with the Karncy team.",
      ["Connect with the Team", "Request a Callback", "Main Menu"]
    );
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
            {/* Header (Karncy Assistant, status green dot, reset & close) */}
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
                      whiteSpace: "pre-line",
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

                  {/* Options List directly in chat message */}
                  {msg.sender === "bot" && msg.options && msg.options.length > 0 && (
                    <div style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.4rem", width: "90%" }}>
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleOptionClick(opt)}
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
                          <span>{opt}</span>
                          <ArrowRight size={12} style={{ color: "var(--primary)", flexShrink: 0 }} />
                        </button>
                      ))}
                    </div>
                  )}

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
                placeholder="Type your message or answer..."
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
