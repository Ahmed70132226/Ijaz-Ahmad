import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ShieldCheck, Activity, TrendingUp, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Haleon Pakistan",
    role: "Senior Regional Detailing Manager",
    period: "2024 – Present",
    location: "Islamabad",
    icon: TrendingUp,
    details: [
      "Strategic regional leadership in healthcare engagement",
      "Commercial execution and sales excellence across the region",
      "Team development, mentoring, and sales force capability building",
      "Market growth initiatives for leading oral care and wellness brands"
    ],
    current: true,
  },
  {
    company: "Haleon Pakistan",
    role: "Senior Regional Detailing Manager",
    period: "2022 – 2024",
    location: "Karachi",
    icon: Users,
    details: [
      "Led key regional detailing teams and commercial programs",
      "Strengthened healthcare practitioner engagement models",
      "Drove local market execution of global brand strategies"
    ],
    current: false,
  },
  {
    company: "GlaxoSmithKline Consumer Healthcare",
    role: "Senior Regional Detailing Manager",
    period: "2020 – 2022",
    location: "Pakistan",
    icon: Award,
    details: [
      "Managed detailing strategy for major consumer health segments",
      "Coached field forces on strategic detailing and marketing campaigns",
      "Maintained key relationships with medical bodies and institutions"
    ],
    current: false,
  },
  {
    company: "GlaxoSmithKline Consumer Healthcare",
    role: "Senior Regional Sales Manager",
    period: "2017 – 2020",
    location: "Pakistan",
    icon: TrendingUp,
    details: [
      "Supervised regional sales performance and distribution channels",
      "Executed commercial excellence and trade marketing programs",
      "Consistently achieved regional sales targets and grew market share"
    ],
    current: false,
  },
  {
    company: "GlaxoSmithKline Consumer Healthcare",
    role: "Regional Sales Manager",
    period: "2016 – 2017",
    location: "Pakistan",
    icon: Users,
    details: [
      "Managed sales planning, target setting, and distributor relations",
      "Built and nurtured high-performing sales teams"
    ],
    current: false,
  },
  {
    company: "GlaxoSmithKline",
    role: "Medical Representative Coordinator",
    period: "2014 – 2016",
    location: "Pakistan",
    icon: ShieldCheck,
    details: [
      "HCP data management and targeted field profiling",
      "Successful implementation of digital sales aids (E-Sales Aid)",
      "Coordinated reporting, training, and global compliance standards"
    ],
    current: false,
  },
  {
    company: "GlaxoSmithKline",
    role: "Senior Area Sales Manager",
    period: "2010 – 2015",
    location: "Pakistan",
    icon: TrendingUp,
    details: [
      "Sales focus on premium Oral Care, Wellness, and Nutrition portfolios",
      "Developed territory growth models and key account relationships"
    ],
    current: false,
  },
  {
    company: "Sanofi Pasteur",
    role: "District Vaccines Manager",
    period: "2008 – 2009",
    location: "Pakistan",
    icon: Activity,
    details: [
      "Successfully launched Sanofi Pasteur Vaccines portfolio in Pakistan",
      "Organized large-scale immunization advocacy campaigns and sales networks"
    ],
    current: false,
  },
  {
    company: "GlaxoSmithKline",
    role: "Senior Product Specialist Vaccines",
    period: "1992 – 2008",
    location: "Pakistan",
    icon: Activity,
    details: [
      "Led pediatric and adult vaccines business development nationwide",
      "Built long-term strategic relationships with key opinion leaders (KOLs) and pediatricians"
    ],
    current: false,
  },
];

export const Experience = () => {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 50%",
            toggleActions: "play none none reset",
          },
        });
      }

      gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: -30,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        });
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      className="section"
      style={{ background: "var(--bg-surface)" }}
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
          <span className="section-tag">Career Journey</span>
          <h2 className="section-heading">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="section-sub">
            Over 30 years of dedicated leadership in sales operations, marketing, and detailing across leading multinational organizations.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="timeline" style={{ maxWidth: "800px", position: "relative" }}>
          {/* Animated line */}
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              left: "15px",
              top: 0,
              width: "2px",
              height: "100%",
              background: "linear-gradient(to bottom, var(--primary), var(--primary-glow))",
              transformOrigin: "top center",
            }}
          />

          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <div key={i} className="timeline-item" style={{ display: "flex", gap: "1.5rem", paddingBottom: "2.5rem", paddingLeft: "3rem", position: "relative" }}>
                {/* Dot / Icon container */}
                <div
                  style={{
                    position: "absolute",
                    left: "2px",
                    top: "4px",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "var(--bg-surface)",
                    border: "2px solid var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                    color: "var(--primary-dark)",
                  }}
                >
                  <Icon size={12} />
                  {exp.current && (
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: "absolute",
                        inset: "-4px",
                        borderRadius: "50%",
                        border: "1.5px solid var(--primary)",
                      }}
                    />
                  )}
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="shine-card"
                  style={{
                    flex: 1,
                    background: "var(--bg-card)",
                    border: exp.current ? "1px solid var(--primary)" : "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "1.5rem",
                    boxShadow: "0 10px 30px rgba(10, 77, 104, 0.03)",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = exp.current ? "var(--primary)" : "var(--border-subtle)"; }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: "1.15rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        {exp.company}
                      </h3>
                      <h4
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--primary-dark)",
                          fontWeight: 600,
                          marginTop: "0.15rem",
                        }}
                      >
                        {exp.role}
                      </h4>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                      <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-body)", fontWeight: 700, color: "var(--primary)" }}>
                        {exp.period}
                      </span>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>
                        📍 {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul style={{ paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {exp.details.map((detail, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: "0.88rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.6,
                        }}
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
