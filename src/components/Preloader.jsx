import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;

    const animate = (now) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(pct));
      if (pct < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 200);
      }
    };
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo SVG */}
          <motion.svg
            className="preloader-logo"
            viewBox="0 0 80 80"
            fill="none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* IA initials */}
            <motion.path
              d="M22 22 L22 58 M40 58 L50 22 L60 58 M44 46 L56 46"
              stroke="#05BFDB"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
            />
            {/* Accent dot */}
            <motion.circle
              cx="50"
              cy="68"
              r="3.5"
              fill="#05BFDB"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.3 }}
            />
          </motion.svg>

          {/* Progress bar */}
          <div className="preloader-bar-track">
            <motion.div
              className="preloader-bar-fill"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="preloader-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {progress < 100 ? `Initializing... ${progress}%` : "Ready"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
