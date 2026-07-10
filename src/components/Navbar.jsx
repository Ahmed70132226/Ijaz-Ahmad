import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#expertise" },
  { label: "Competencies", href: "#competencies" },
  { label: "Highlights", href: "#highlights" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education & Languages", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      {/* ── NAVBAR BAR ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "0.65rem 5%" : "1.1rem 5%",
          background: scrolled
            ? "rgba(248, 250, 252, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(10, 77, 104, 0.05)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "1.5rem",
            color: "var(--primary)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            flexShrink: 0,
          }}
        >
          IJAZ AHMAD
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--primary)",
            display: "inline-block",
          }} />
        </motion.a>

        {/* ── DESKTOP NAV LINKS (inline horizontal) ── */}
        {!isMobile && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.15rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}>
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.3, duration: 0.4 }}
                  style={{
                    display: "block",
                    padding: "0.38rem 0.72rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    color: isActive ? "var(--primary)" : "var(--text-secondary)",
                    background: isActive ? "var(--primary-glow-sm)" : "transparent",
                    border: isActive ? "1px solid var(--border)" : "1px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--primary)";
                      e.currentTarget.style.background = "var(--primary-glow-sm)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "rgba(240, 246, 255, 0.65)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </motion.a>
              );
            })}

            {/* Hire Me CTA */}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.72 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.42rem 1.1rem",
                marginLeft: "0.5rem",
                background: "var(--primary)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.76rem",
                letterSpacing: "0.04em",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 20px rgba(10, 77, 104, 0.25)",
              }}
              whileTap={{ scale: 0.96 }}
            >
              Connect
            </motion.a>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.78 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                marginLeft: "0.5rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "50%",
                color: "var(--primary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              whileHover={{ scale: 1.1, background: "var(--primary-glow-sm)", borderColor: "var(--primary)" }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "light" ? (
                <i className="fas fa-moon" style={{ fontSize: "14px" }} />
              ) : (
                <i className="fas fa-sun" style={{ fontSize: "14px" }} />
              )}
            </motion.button>
          </div>
        )}

        {/* ── MOBILE HAMBURGER ── */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              padding: "4px",
              cursor: "pointer",
              zIndex: 1002,
            }}
          >
            <div className={`hamburger ${menuOpen ? "open" : ""}`}>
              <span />
              <span />
              <span />
            </div>
          </button>
        )}
      </motion.nav>

      {/* ── MOBILE FULL-SCREEN OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 38px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 40px) 38px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 38px)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(5, 10, 15, 0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.8rem",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.055 + 0.12 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem, 6vw, 2.4rem)",
                  fontWeight: 900,
                  textDecoration: "none",
                  letterSpacing: "-0.02em",
                  color: activeSection === link.href.slice(1)
                    ? "var(--primary)"
                    : "var(--text-primary)",
                  transition: "color 0.2s ease",
                }}
                whileHover={{ x: 8, color: "var(--primary)" }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* Mobile hire me button */}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: navLinks.length * 0.055 + 0.2 }}
              style={{
                marginTop: "0.5rem",
                padding: "0.75rem 2.5rem",
                background: "var(--primary)",
                color: "#fff",
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: "0.06em",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
              }}
            >
              Connect
            </motion.a>

            {/* Mobile Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: navLinks.length * 0.055 + 0.25 }}
              style={{
                marginTop: "1rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.75rem 2.5rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--primary)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.9rem",
                fontWeight: 750,
                cursor: "pointer",
              }}
            >
              {theme === "light" ? (
                <>
                  <i className="fas fa-moon" /> Dark Mode
                </>
              ) : (
                <>
                  <i className="fas fa-sun" /> Light Mode
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
