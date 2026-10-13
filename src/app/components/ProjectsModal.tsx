import React, { useState } from "react";
import { motion } from "motion/react";
import { X, ArrowRight, Building2, Layers } from "lucide-react";

interface ProjectCardData {
  id: string;
  category: "invoice" | "ventures" | "startup";
  categoryLabel: string;
  title: string;
  subtitle: string;
  facility: string;
  tenor: string;
  description: string;
  tags: string[];
}

const PROJECTS_DATA: ProjectCardData[] = [
  {
    id: "proj-1",
    category: "invoice",
    categoryLabel: "Invoice Financing",
    title: "Asha Lubes",
    subtitle: "Industrial Tech",
    facility: "₹50L – ₹1.5Cr",
    tenor: "60 Days",
    description:
      "Automatic centralized lubrication systems for mining, construction, ports, steel and wind — engineered to keep bearings operating under demanding conditions.",
    tags: ["Mining & Construction", "Steel & Wind Energy", "Centralized Systems"],
  },
  {
    id: "proj-2",
    category: "ventures",
    categoryLabel: "Joint Ventures",
    title: "FORRE",
    subtitle: "Design & Interiors",
    facility: "₹1.2 Crores",
    tenor: "12 Months",
    description:
      "A bespoke furniture and interior design studio crafting custom pieces for modern residential living and commercial working spaces.",
    tags: ["Bespoke Furniture", "Interior Studio", "Commercial & Residential"],
  },
  {
    id: "proj-3",
    category: "startup",
    categoryLabel: "Startup Equity",
    title: "Ocean",
    subtitle: "CleanTech · Materials",
    facility: "₹2.5 Crores",
    tenor: "24 Months",
    description:
      "Patent-pending structural bamboo panels as a low-carbon alternative to conventional building materials, sourced directly from farmers.",
    tags: ["Structural Bamboo", "Low-Carbon Building", "Farmer Direct Sourcing"],
  },
  {
    id: "proj-4",
    category: "startup",
    categoryLabel: "Startup Equity",
    title: "Qbic Materials",
    subtitle: "Circular Materials",
    facility: "₹1.8 Crores",
    tenor: "36 Months",
    description:
      "Advanced lightweight materials made with 70–100% post-consumer recycled PET for circular-economy applications.",
    tags: ["Recycled PET", "Circular Economy", "Advanced Polymers"],
  },
  {
    id: "proj-5",
    category: "invoice",
    categoryLabel: "Invoice Financing",
    title: "FlashGard",
    subtitle: "Consumer Tech",
    facility: "₹75 Lakhs",
    tenor: "45 Days",
    description:
      "Premium screen protectors and device skins for phones, tablets, laptops and audio devices across nationwide retail channels.",
    tags: ["Screen Protection", "Device Skins", "Retail & Distribution"],
  },
  {
    id: "proj-6",
    category: "ventures",
    categoryLabel: "Joint Ventures",
    title: "Xagrotor Tek",
    subtitle: "AgriTech · Defense Drones",
    facility: "₹3.0 Crores",
    tenor: "18 Months",
    description:
      "India-built precision agri-drones (AGR-16 and AGR-10), extended into the Rudra FX defense drones joint venture initiative.",
    tags: ["AGR-16 & AGR-10 Drones", "Rudra FX Defense", "Precision Agriculture"],
  },
  {
    id: "proj-7",
    category: "ventures",
    categoryLabel: "Joint Ventures",
    title: "Anvita High9",
    subtitle: "Real Estate",
    facility: "₹5.0 Crores",
    tenor: "24 Months",
    description:
      "A residential development of nine towers conceived for premium urban living in prime growth corridors.",
    tags: ["Residential Towers", "Urban Living", "Infrastructure Development"],
  },
  {
    id: "proj-8",
    category: "invoice",
    categoryLabel: "Invoice Financing",
    title: "Derivate Labs",
    subtitle: "Pharma · APIs",
    facility: "₹1.5 Crores",
    tenor: "60 Days",
    description:
      "Quality active pharmaceutical ingredients and advanced pharma intermediates for regulated markets, with a focus on process chemistry and batch consistency.",
    tags: ["Active Ingredients (APIs)", "Regulated Markets", "Process Chemistry"],
  },
  {
    id: "proj-9",
    category: "ventures",
    categoryLabel: "Joint Ventures",
    title: "Havih",
    subtitle: "Renewable Energy",
    facility: "₹2.2 Crores",
    tenor: "12 Months",
    description:
      "Industrial-grade B100 biodiesel from sustainable feedstocks for transport, heavy industry and power generation.",
    tags: ["B100 Biodiesel", "Sustainable Feedstocks", "Industrial Power"],
  },
  {
    id: "proj-10",
    category: "invoice",
    categoryLabel: "Invoice Financing",
    title: "Scratchgard",
    subtitle: "Automotive · PPF",
    facility: "₹80 Lakhs",
    tenor: "30 Days",
    description:
      "Automotive protection products spanning paint protection film (PPF), solar film, interior surface film and display protectors.",
    tags: ["Paint Protection Film", "Solar & Surface Film", "Automotive Aftermarket"],
  },
];

import ashaLubesLogo from "../Clients/Frame 1597880572 (1).png";
import forreLogo from "../Clients/fdc4ea87-28d9-4703-af90-d94e7092bc85 1.png";
import oceanLogo from "../Clients/logo_Ocean_Bright Green_CMYK.ai_page-0001 1.png";
import qbicLogo from "../Clients/Group 1597880575 (1).png";
import flashgardLogo from "../../imports/images__3__4.png";
import xagrotorLogo from "../Clients/logo.webp";
import anvitaLogo from "../Clients/Frame 1597880573.png";
import derivateLogo from "../Clients/derivate-logo.png";
import havihLogo from "../Clients/Frame 1171278855.png";
import scratchgardLogo from "../Clients/Frame 1597880574.png";

const PROJECT_LOGOS: Record<string, string> = {
  "Asha Lubes": ashaLubesLogo,
  "FORRE": forreLogo,
  "Ocean": oceanLogo,
  "Qbic Materials": qbicLogo,
  "FlashGard": flashgardLogo,
  "Xagrotor Tek": xagrotorLogo,
  "Anvita High9": anvitaLogo,
  "Derivate Labs": derivateLogo,
  "Havih": havihLogo,
  "Scratchgard": scratchgardLogo,
};

// Helper to render distinct high-definition brand logos for each project
function renderProjectLogo(title: string, category: string) {
  const logoSrc = PROJECT_LOGOS[title];
  if (logoSrc) {
    return (
      <div
        style={{
          width: "3.25rem",
          height: "3.25rem",
          borderRadius: "12px",
          background: "#ffffff",
          border: "1px solid var(--border)",
          padding: "0.4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <img
          src={logoSrc}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }
  return null;
}

interface ProjectsModalProps {
  onClose: () => void;
  onOpenContact: (type: "funding" | "business" | "contact") => void;
}

export function ProjectsModal({ onClose, onOpenContact }: ProjectsModalProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "invoice" | "ventures" | "startup">("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "invoice", label: "Invoice Financing" },
    { id: "ventures", label: "Joint Ventures" },
    { id: "startup", label: "Startup Equity" },
  ];

  const filteredProjects = PROJECTS_DATA.filter((p) => activeCategory === "all" || p.category === activeCategory);

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
          maxWidth: "68rem",
          height: "92vh",
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
              Karncy Portfolio & Initiatives
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
              Featured Projects
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close projects modal"
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

        {/* Modal Scrollable Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "clamp(1.25rem, 3vw, 2.5rem)",
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
          }}
        >
          {/* Header Summary & Category Filter Tabs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
              A selected view of projects and ventures across industrial technology, design, circular materials, agriculture, healthcare, and renewable energy.
            </p>

            {/* Category Filter Pills */}
            <div className="projects-filter-tabs" style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      padding: "0.45rem 1rem",
                      borderRadius: "9999px",
                      border: isActive ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                      background: isActive ? "var(--primary)" : "#ffffff",
                      color: isActive ? "#ffffff" : "#475569",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.15s ease",
                      boxShadow: isActive ? "0 4px 12px rgba(13,31,130,0.15)" : "none",
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Width Stacked Project Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              width: "100%",
            }}
          >
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  width: "100%",
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  borderRadius: "calc(var(--radius) * 1.2)",
                  padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  position: "relative",
                }}
              >
                {/* Header Row: Logo + Title + Subtitle + Category Pill */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {renderProjectLogo(proj.title, proj.category)}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "#0f172a",
                          margin: 0,
                          lineHeight: 1.2,
                        }}
                      >
                        {proj.title}
                      </h3>

                      {/* Subtitle & Category Badges below company name on mobile */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            color: "#475569",
                            background: "#f1f5f9",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "4px",
                          }}
                        >
                          {proj.subtitle}
                        </span>
                        <span
                          className="projects-category-badge-mobile"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            color: "var(--cta)",
                            background: "rgba(255,105,0,0.08)",
                            padding: "0.2rem 0.65rem",
                            borderRadius: "9999px",
                          }}
                        >
                          {proj.categoryLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className="projects-category-badge-desktop"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "var(--cta)",
                      background: "rgba(255,105,0,0.08)",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                    }}
                  >
                    {proj.categoryLabel}
                  </span>
                </div>

                {/* Description Text */}
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "#334155", lineHeight: 1.6, margin: 0 }}>
                  {proj.description}
                </p>

                {/* Tags Row + Facility / Action Bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                    paddingTop: "0.85rem",
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  {/* Industry Tags */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    {proj.tags.map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.76rem",
                          color: "#64748b",
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "4px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                    <div>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#94a3b8", display: "block" }}>
                        Facility Size
                      </span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 700, color: "var(--primary)" }}>
                        {proj.facility}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#94a3b8", display: "block" }}>
                        Tenor
                      </span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 700, color: "#1e293b" }}>
                        {proj.tenor}
                      </span>
                    </div>
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
