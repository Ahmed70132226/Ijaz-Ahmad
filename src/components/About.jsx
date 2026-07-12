import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Award, Shield, BookOpen, BarChart } from "lucide-react";

const STATS = [
  { value: 35, label: "Years Experience", suffix: "+", icon: Award },
  { value: 8, label: "Leadership Roles", suffix: "+", icon: Shield },
  { value: 5000, label: "Healthcare Professionals Managed", suffix: "+", icon: BarChart },
  { value: 100, label: "Business Excellence Initiatives", suffix: "+", icon: BookOpen },
];

export const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      className="section"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem", alignItems: "start" }} className="about-grid">
          {/* Left - Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Executive Summary</span>
            <h2 className="section-heading" style={{ marginBottom: "2rem" }}>
              About <span className="text-gradient">Me</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.8 }}>
              <p>
                An accomplished pharmaceutical business leader with over three decades of experience in sales leadership, strategic planning, commercial excellence, healthcare marketing, and people development.
              </p>
              <p>
                Throughout my career, I have successfully led regional and national teams, launched innovative healthcare products, developed high-performing professionals, and built long-lasting partnerships across Pakistan.
              </p>
              <p style={{ fontWeight: 500, color: "var(--primary-dark)" }}>
                My leadership philosophy centers on integrity, continuous learning, innovation, and empowering people to achieve sustainable business growth.
              </p>
            </div>
          </motion.div>

          {/* Right - Stats Grid */}
          <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="stats-grid">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="shine-card"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-lg)",
                    padding: "2rem 1.5rem",
                    textAlign: "center",
                    boxShadow: "0 10px 30px rgba(10, 77, 104, 0.03)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    transition: "transform 0.3s ease, border-color 0.3s ease",
                  }}
                  whileHover={{ y: -5, borderColor: "var(--border)" }}
                >
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "var(--primary-glow-sm)",
                    color: "var(--primary-dark)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--primary)", fontFamily: "var(--font-display)" }}>
                      {inView ? <CountUp end={stat.value} duration={2.5} /> : "0"}
                      {stat.suffix}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", lineHeight: 1.4 }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
