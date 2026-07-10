import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Leadership } from "./components/Leadership";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Competencies } from "./components/Competencies";

import { Preloader } from "./components/Preloader";
import { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";
import { ArrowUp } from "lucide-react";

function AnimatedFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "4rem 5% 2.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2.5rem",
            marginBottom: "3.5rem",
          }}
        >
          {/* Brand */}
          <div style={{ flex: "1 1 300px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "1.8rem",
                color: "var(--primary)",
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              IJAZ AHMAD
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--primary-dim)",
                  marginLeft: "4px",
                  verticalAlign: "middle",
                }}
              />
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "380px",
              }}
            >
              Senior Regional Detailing Manager at Haleon Pakistan. Empowering Healthcare Through Leadership & Excellence.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1.2rem" }}>
              Quick Links
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Experience", href: "#experience" },
                { label: "Expertise", href: "#expertise" },
                { label: "Competencies", href: "#competencies" },
                { label: "Highlights", href: "#highlights" },
                { label: "Certifications", href: "#certifications" },
                { label: "Education & Languages", href: "#education" },
                { label: "Contact", href: "#contact" }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="link-underline"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.target.style.color = "var(--primary)"; }}
                  onMouseLeave={(e) => { e.target.style.color = "var(--text-secondary)"; }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1.2rem" }}>
              Connect
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { faIcon: "fab fa-linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/ijaz-ahmad-20284922/" },
                { faIcon: "fas fa-envelope", label: "Email", href: "mailto:ijazgsk@yahoo.com" },
              ].map(({ faIcon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  <i className={faIcon} style={{ fontSize: "14px", color: "var(--primary)" }} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
            marginBottom: "2.2rem",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.25rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
            }}
          >
            © 2026 Ijaz Ahmad. All Rights Reserved.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-full)",
              padding: "0.45rem 1.1rem",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "0.78rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.color = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-subtle)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <ArrowUp size={12} />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  useLenis();

  const handlePreloaderDone = useCallback(() => {
    if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    }
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderDone} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ width: "100%", minHeight: "100vh" }}
          >
            <Navbar />
            <Hero />
            <About />
            <Experience />
            <Leadership />
            <Competencies />
            <Education />
            <Certifications />
            <Contact />
            <AnimatedFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
