import { motion } from "framer-motion";
import {
  TrendingUp, Users, Compass, Briefcase, Award, Target, Zap, BarChart3,
  Network, FileText, HeartPulse, Calendar, CheckCircle, ShieldCheck, Heart, Users2
} from "lucide-react";

const expertiseList = [
  { title: "Commercial Excellence", icon: Award, desc: "Maximizing sales force effectiveness and operational execution." },
  { title: "Regional Sales Leadership", icon: TrendingUp, desc: "Leading large regional sales organizations to exceed growth targets." },
  { title: "Business Strategy", icon: Compass, desc: "Formulating business planning and long-term healthcare strategies." },
  { title: "Healthcare Marketing", icon: HeartPulse, desc: "Brand management and specialized campaigns for healthcare providers." },
  { title: "Vaccines Business", icon: ShieldCheck, desc: "Deep market expertise launching and scaling immunization products." },
  { title: "Sales Coaching", icon: Users, desc: "Training and mentoring teams on modern sales tactics and detailing." },
  { title: "People Development", icon: Users2, desc: "Nurturing talent and building future leaders within the organization." },
  { title: "Performance Management", icon: Target, desc: "Setting clear KPIs, auditing metrics, and achieving commercial goals." },
  { title: "Market Expansion", icon: Zap, desc: "Identifying untapped market segments and launching growth campaigns." },
  { title: "Customer Relationship Management", icon: Heart, desc: "Nurturing deep alliances with major medical institutions & practitioners." },
  { title: "Team Building", icon: Network, desc: "Fostering cohesive, highly motivated, and resilient sales teams." },
  { title: "Business Planning", icon: Calendar, desc: "Developing forecasting, budgeting, and execution timetables." },
  { title: "Stakeholder Management", icon: FileText, desc: "Aligning cross-functional medical, regulatory, and corporate teams." },
  { title: "Commercial Operations", icon: BarChart3, desc: "Optimizing detailing channels, supply streams, and logistics." },
  { title: "Expert Detailing", icon: CheckCircle, desc: "Scientific communication and evidence-based brand advocacy to HCPs." },
  { title: "Sales Effectiveness", icon: Briefcase, desc: "Adopting modern digital detailing aids and CRM workflows." },
];

export const Leadership = () => {
  return (
    <section
      id="expertise"
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
          <span className="section-tag">Core Capabilities</span>
          <h2 className="section-heading">
            Leadership & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="section-sub">
            Key professional skills and executive operational capabilities developed over 30 years in the healthcare sector.
          </p>
        </motion.div>

        {/* Grid of expertise */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {expertiseList.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="shine-card"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.75rem 1.5rem",
                  boxShadow: "0 10px 30px rgba(10, 77, 104, 0.02)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
                whileHover={{ y: -5, borderColor: "var(--border)" }}
              >
                <div style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--primary-glow-sm)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Icon size={18} />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
