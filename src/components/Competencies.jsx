import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, ShieldCheck, Briefcase, Award } from "lucide-react";

const COMPETENCIES = [
  { name: "Strategic Leadership", value: 98 },
  { name: "People Development", value: 98 },
  { name: "Leadership Coaching", value: 98 },
  { name: "Sales Management", value: 97 },
  { name: "Commercial Excellence", value: 96 },
  { name: "Business Growth", value: 96 },
  { name: "Training", value: 96 },
  { name: "Healthcare Marketing", value: 95 },
  { name: "Customer Engagement", value: 95 },
  { name: "Negotiation", value: 94 },
];

const HIGHLIGHTS = [
  { title: "30+ Years in Healthcare Industry", desc: "Long-standing history driving sales excellence and customer engagement." },
  { title: "Senior Leadership Positions", desc: "Successfully directed regional sales and detailing operations at Haleon and GSK." },
  { title: "Regional Business Management", desc: "Led teams and expansion initiatives across major business hubs in Pakistan." },
  { title: "National Product Launches", desc: "Successfully launched pediatric and adult vaccines for GSK and Sanofi Pasteur." },
  { title: "Commercial Excellence Programs", desc: "Implemented advanced territory management and training programs." },
  { title: "High Performing Team Leadership", desc: "Recruited, mentored, and retained top sales and detailing talent." },
  { title: "Sales Transformation", desc: "Introduced digital sales enablement systems (E-Sales Aid) at GSK." },
  { title: "Vaccines Market Leadership", desc: "Built pediatric market penetration and vaccines advocacy systems." },
  { title: "Healthcare Professional Engagement", desc: "Established lifelong trusted partnerships with key doctors and clinics." },
  { title: "Strategic Planning", desc: "Executed long-term organizational commercial programs and distribution networks." },
];

function CircularProgress({ name, value, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: "1.5rem 1rem",
        boxShadow: "0 8px 24px rgba(10, 77, 104, 0.02)",
      }}
    >
      <div style={{ position: "relative", width: "90px", height: "90px" }}>
        <svg style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }}>
          {/* Background circle */}
          <circle
            cx="45"
            cy="45"
            r={radius}
            fill="transparent"
            stroke="var(--border-subtle)"
            strokeWidth="5"
          />
          {/* Animated path circle */}
          <motion.circle
            cx="45"
            cy="45"
            r={radius}
            fill="transparent"
            stroke="var(--primary)"
            strokeWidth="5"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.5, delay: index * 0.05, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        {/* Percentage Text */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          fontWeight: 800,
          color: "var(--primary)",
          fontFamily: "var(--font-display)",
        }}>
          {value}%
        </div>
      </div>
      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", textAlign: "center", minHeight: "2.4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {name}
      </div>
    </div>
  );
}

export const Competencies = () => {
  return (
    <section id="competencies" className="section" style={{ background: "var(--bg-surface)" }}>
      <div className="container">
        {/* Competencies Part */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3rem" }}
        >
          <span className="section-tag">Performance Indices</span>
          <h2 className="section-heading">
            Core <span className="text-gradient">Competencies</span>
          </h2>
          <p className="section-sub">
            Verified leadership indicators showcasing strengths in regional management, execution, and commercial growth.
          </p>
        </motion.div>

        {/* Circular Indicators Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "1.25rem",
            marginBottom: "6rem",
          }}
        >
          {COMPETENCIES.map((comp, idx) => (
            <CircularProgress key={idx} name={comp.name} value={comp.value} index={idx} />
          ))}
        </div>

        {/* Highlights Part */}
        <div id="highlights" style={{ scrollMarginTop: "100px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "3rem" }}
          >
            <span className="section-tag">Track Record</span>
            <h2 className="section-heading">
              Career <span className="text-gradient">Highlights</span>
            </h2>
            <p className="section-sub">
              Signature achievements and leadership marks defining a 30-year legacy in pharmaceutical sales execution.
            </p>
          </motion.div>

          {/* Luxury Highlights Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {HIGHLIGHTS.map((hl, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="shine-card"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2rem",
                  boxShadow: "0 10px 30px rgba(10, 77, 104, 0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  transition: "all 0.3s ease",
                }}
                whileHover={{ y: -6, borderColor: "var(--border)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Star size={16} style={{ color: "var(--primary-dim)", fill: "var(--primary-dim)" }} />
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    {hl.title}
                  </h3>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {hl.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
