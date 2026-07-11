import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FileText, ArrowDown, Activity, Award, TrendingUp, Users } from "lucide-react";

const ROLES = [
  "Senior Regional Detailing Manager",
  "Haleon Pakistan",
  "Healthcare Strategist",
  "Commercial Excellence Leader"
];

// Particle system tailored for Molecular / Biotech structures
function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3 - 0.05;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.decay = 0.0005 + Math.random() * 0.0005;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
        if (this.alpha <= 0) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "#088395";
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#05BFDB";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      // Draw lines between nearby particles to look like molecular bonds
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 120) * 0.08;
            ctx.strokeStyle = "#088395";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

// Typewriter hook
function useTypewriter(words) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 35);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);

  return display;
}

// Mouse parallax
function useParallax(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      const layers = container.querySelectorAll("[data-parallax]");
      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.parallax) || 1;
        gsap.to(layer, {
          x: x * depth * 25,
          y: y * depth * 12,
          duration: 1.2,
          ease: "power2.out",
        });
      });
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);
}

const HEALTH_ORBIT = [
  { icon: Activity, label: "Healthcare" },
  { icon: Award, label: "Excellence" },
  { icon: TrendingUp, label: "Commercial" },
  { icon: Users, label: "Leadership" },
];

export const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  const role = useTypewriter(ROLES);

  useParticles(canvasRef);
  useParallax(containerRef);

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    if (titleRef.current) {
      const text = titleRef.current.textContent;
      titleRef.current.innerHTML = text
        .split("")
        .map((ch) => `<span style="display:inline-block;opacity:0;transform:translateY(30px)">${ch === " " ? "&nbsp;" : ch}</span>`)
        .join("");

      tl.to(titleRef.current.querySelectorAll("span"), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power3.out",
      });
    }
    tl.from(subtitleRef.current, { opacity: 0, y: 15, duration: 0.5 }, "-=0.1")
      .from(descRef.current, { opacity: 0, y: 15, duration: 0.5 }, "-=0.2")
      .from(ctaRef.current?.children ? Array.from(ctaRef.current.children) : [], { opacity: 0, y: 10, stagger: 0.08, duration: 0.4 }, "-=0.1");
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "var(--bg-deep)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 5%",
        paddingTop: "120px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Molecular mesh graphics & blobs */}
      <div
        data-parallax="0.2"
        style={{
          position: "absolute",
          top: "15%",
          right: "55%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,131,149,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        data-parallax="0.4"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "55%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(5,191,219,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="hero-canvas"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
      />

      {/* Main content grid */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "var(--container-max)",
          width: "100%",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Executive Tag */}
          <motion.div
            className="stat-badge"
            style={{ alignSelf: "flex-start", animationDuration: "5s", background: "var(--bg-surface)", boxShadow: "0 4px 20px rgba(10, 77, 104, 0.05)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span style={{ color: "var(--primary)", fontSize: "0.9rem" }}>💼</span>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)" }}>
              Fortune 500 Executive Brand
            </span>
          </motion.div>

          {/* Title & Typewriter */}
          <div>
            <h1
              ref={titleRef}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 6.5vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              IJAZ AHMAD
            </h1>
            <div
              ref={subtitleRef}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                fontWeight: 600,
                color: "var(--primary-dark)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                letterSpacing: "0.02em",
              }}
            >
              {role}
              <span className="typewriter-cursor" />
            </div>
          </div>

          {/* Description */}
          <p
            ref={descRef}
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: "520px",
            }}
          >
            Senior Regional Detailing Manager at{" "}
            <span style={{ color: "var(--primary)", fontWeight: 700 }}>Haleon Pakistan</span>
            . Over 30 years of excellence in Sales Leadership, Commercial Execution, Healthcare Strategy, and Business Development.
          </p>

          {/* Buttons */}
          <div ref={ctaRef} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            <a
              href="/Profile (1).pdf"
              download
              className="btn-primary ripple-btn"
              style={{ gap: "0.6rem" }}
            >
              <FileText size={16} />
              Download Resume
            </a>
            <a
              href="https://www.linkedin.com/in/ijaz-ahmad-20284922/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ gap: "0.6rem" }}
            >
              <i className="fab fa-linkedin" style={{ fontSize: "16px" }} />
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Right - Portrait */}
        <motion.div
          data-parallax="0.5"
          className="hero-visual"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Ambient Glows */}
          <div style={{
            position: "absolute",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(5,191,219,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Spinning dashed rings (Biotech/Pharma motif) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              border: "1.5px dashed rgba(10, 77, 104, 0.12)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              width: "270px",
              height: "270px",
              borderRadius: "50%",
              border: "1px dashed rgba(8, 131, 149, 0.08)",
              pointerEvents: "none",
            }}
          />

          {/* Conic rotating gradient frame */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              width: "244px",
              height: "244px",
              borderRadius: "50%",
              background: "conic-gradient(from 0deg, var(--primary), transparent 50%, var(--primary-dim))",
              opacity: 0.3,
              pointerEvents: "none",
            }}
          />

          {/* Photo Frame */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "relative", zIndex: 2 }}
          >
            {/* Inner Border Ring */}
            <div style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dim) 100%)",
              zIndex: 0,
            }} />

            {/* Portrait Image */}
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "230px",
              height: "230px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid var(--bg-surface)",
              boxShadow: "0 20px 50px rgba(10, 77, 104, 0.15)",
            }}>
              <img
                src="/Ijaz Ahmed.jpeg"
                alt="Ijaz Ahmad — Senior Pharmaceutical Executive"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />
            </div>
          </motion.div>

          {/* Orbiting Executive Icons */}
          {HEALTH_ORBIT.map((orbit, i) => {
            const angle = (i / HEALTH_ORBIT.length) * 2 * Math.PI - Math.PI / 4;
            const radius = 155;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={orbit.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.12, type: "spring", damping: 12 }}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px - 24px)`,
                  top: `calc(50% + ${y}px - 24px)`,
                  zIndex: 3,
                }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3.5 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                  whileHover={{ scale: 1.15 }}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "2px",
                    color: "var(--primary-dark)",
                    cursor: "default",
                    boxShadow: "0 8px 24px rgba(10, 77, 104, 0.08)",
                  }}
                >
                  <orbit.icon size={16} strokeWidth={2} />
                  <span style={{ fontSize: "0.45rem", fontWeight: 700, letterSpacing: "0.06em", color: "var(--text-muted)", textTransform: "uppercase" }}>
                    {orbit.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Floating Badges */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="glass"
            style={{
              position: "absolute",
              top: "10%",
              right: "-5%",
              padding: "0.7rem 1.1rem",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 10px 30px rgba(10, 77, 104, 0.05)",
              zIndex: 4,
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.78rem", color: "var(--text-primary)" }}>
                Active Executive
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Haleon Pakistan</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass"
            style={{
              position: "absolute",
              bottom: "10%",
              left: "-8%",
              padding: "0.7rem 1.1rem",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 10px 30px rgba(10, 77, 104, 0.05)",
              zIndex: 4,
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>🏆</span>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.78rem", color: "var(--text-primary)" }}>
                30+ Years Experience
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Leadership & Growth</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass"
            style={{
              position: "absolute",
              bottom: "22%",
              right: "-5%",
              padding: "0.7rem 1.1rem",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 10px 30px rgba(10, 77, 104, 0.05)",
              zIndex: 4,
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>👥</span>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.78rem", color: "var(--text-primary)" }}>
                8+ Key Roles
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>National & Regional</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
      >
        <div className="scroll-indicator">
          <div className="scroll-indicator-dot" />
          <div className="scroll-indicator-line" style={{ background: "linear-gradient(to bottom, var(--primary), transparent)" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-visual {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
