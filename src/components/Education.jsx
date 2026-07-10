import { motion } from "framer-motion";
import { GraduationCap, BookOpen, MessageSquare, Quote } from "lucide-react";

const education = [
  {
    institution: "Preston University",
    location: "Pakistan",
    degree: "MBA — Marketing & Marketing Management",
    period: "2010 – 2011",
    icon: GraduationCap,
    color: "var(--primary)",
    description: "Advanced studies in corporate marketing management, brand strategy, sales operations, and healthcare markets.",
    highlights: ["Marketing Management", "Brand Strategy", "Corporate Relations", "Sales Operations"],
  },
  {
    institution: "Government High School No.1 Sargodha",
    location: "Sargodha, Pakistan",
    degree: "Matric Science",
    period: "1980 – 1985",
    icon: BookOpen,
    color: "var(--primary-dark)",
    description: "Foundational sciences curriculum focusing on Physics, Chemistry, Biology, and Mathematics.",
    highlights: ["Physics", "Chemistry", "Biology", "Mathematics"],
  },
];

const languages = ["English", "Urdu", "Punjabi", "Saraiki", "Sindhi", "Persian", "Arabic"];

export const Education = () => {
  return (
    <section
      id="education"
      className="section"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="container">
        {/* Education Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "4rem", alignItems: "start", marginBottom: "5rem" }} className="education-grid">
          {/* Left - Academic History */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: "3rem" }}
            >
              <span className="section-tag">Academic</span>
              <h2 className="section-heading">
                Education
              </h2>
              <p className="section-sub">
                Academic qualifications that support strategic management and commercial operations.
              </p>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {education.map((edu, i) => {
                const Icon = edu.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="shine-card"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-lg)",
                      padding: "2rem",
                      position: "relative",
                      boxShadow: "0 10px 30px rgba(10, 77, 104, 0.02)",
                    }}
                    whileHover={{ x: 6, borderColor: "var(--border)" }}
                  >
                    <div style={{ display: "flex", gap: "1.25rem", alignItems: "start" }} className="edu-card-content">
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--primary-glow-sm)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <Icon size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.4rem" }}>
                          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                            {edu.institution}
                          </h3>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary-dark)" }}>
                            {edu.period}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--primary)", marginBottom: "0.75rem" }}>
                          {edu.degree}
                        </div>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                          {edu.description}
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                          {edu.highlights.map((h) => (
                            <span key={h} className="tag" style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem" }}>{h}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right - Languages */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: "3rem" }}
            >
              <span className="section-tag">Communication</span>
              <h2 className="section-heading">
                Languages
              </h2>
              <p className="section-sub">
                Multilingual competency driving cross-regional relations and commercial operations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="shine-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                boxShadow: "0 10px 30px rgba(10, 77, 104, 0.02)",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {languages.map((lang, idx) => (
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, type: "spring", damping: 10 }}
                    className="tag"
                    style={{
                      fontSize: "0.85rem",
                      padding: "0.4rem 1rem",
                      background: "var(--bg-deep)",
                      color: "var(--text-primary)",
                      borderColor: "var(--border)",
                    }}
                    whileHover={{ scale: 1.08, background: "var(--primary)", color: "#fff", borderColor: "var(--primary)" }}
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Leadership Philosophy Quote Block */}
        <div style={{ marginTop: "6rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: "4rem 3rem",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 15px 45px rgba(10, 77, 104, 0.04)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {/* Top quote icon decoration */}
            <div style={{
              color: "var(--primary-glow)",
              opacity: 0.25,
              marginBottom: "1.5rem",
            }}>
              <Quote size={60} style={{ fill: "currentColor" }} />
            </div>

            <blockquote style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.3rem, 3.2vw, 2.1rem)",
              fontWeight: 600,
              lineHeight: 1.5,
              color: "var(--primary)",
              maxWidth: "800px",
              marginBottom: "1.5rem",
              fontStyle: "italic",
            }}>
              "Great leadership is not about authority. It is about inspiring people, creating opportunities, and enabling teams to achieve excellence together."
            </blockquote>

            <cite style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              fontStyle: "normal",
            }}>
              — Ijaz Ahmad
            </cite>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .education-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 480px) {
          .edu-card-content {
            flex-direction: column !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};
