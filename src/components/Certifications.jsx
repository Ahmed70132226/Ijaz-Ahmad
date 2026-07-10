import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";

const certifications = [
  {
    title: "Discovering Your Strengths",
    issuer: "Executive Development Program",
    year: "Haleon / GSK Leadership",
    icon: "📈",
    color: "#0A4D68",
  },
  {
    title: "Leadership Through Feedback",
    issuer: "Commercial Excellence Academy",
    year: "GSK Corporate Development",
    icon: "💬",
    color: "#088395",
  },
  {
    title: "Building High Performance Teams",
    issuer: "Strategic Management Institute",
    year: "GSK Global Training",
    icon: "👥",
    color: "#05BFDB",
  },
  {
    title: "Leading Inclusive Teams",
    issuer: "Haleon Diversity & Inclusion",
    year: "Haleon Global Capability",
    icon: "🌐",
    color: "#0A4D68",
  },
  {
    title: "What Is Scrum",
    issuer: "Agile Project Frameworks",
    year: "Commercial Excellence Program",
    icon: "🔄",
    color: "#088395",
  },
];

export const Certifications = () => {
  return (
    <section
      id="certifications"
      className="section"
      style={{ background: "var(--bg-deep)" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "4rem" }}
        >
          <span className="section-tag">Development</span>
          <h2 className="section-heading">
            Executive <span className="text-gradient">Certifications</span>
          </h2>
          <p className="section-sub">
            Verified corporate training credentials in executive leadership, commercial capability, and agile team management.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="shine-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(10, 77, 104, 0.02)",
              }}
              whileHover={{
                y: -6,
                borderColor: "var(--border)",
                boxShadow: "0 15px 40px rgba(10, 77, 104, 0.06)",
              }}
            >
              {/* Background rings decoration */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: `1.5px dashed ${cert.color}10`,
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "var(--primary-glow-sm)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    flexShrink: 0,
                  }}
                >
                  {cert.icon}
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      marginBottom: "0.15rem",
                    }}
                  >
                    <BadgeCheck size={14} style={{ color: "var(--primary-dark)" }} />
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--primary-dark)",
                      }}
                    >
                      Verified
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "var(--text-muted)",
                    }}
                  >
                    {cert.year}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: "var(--text-primary)",
                  marginBottom: "0.4rem",
                }}
              >
                {cert.title}
              </h3>

              {/* Issuer */}
              <h4
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                }}
              >
                {cert.issuer}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
