import { useEffect, useRef } from "react";

export function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Check for touch/non-pointer device
    const mediaQuery = window.matchMedia("(hover: none)");
    if (mediaQuery.matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outerX = mouseX;
    let outerY = mouseY;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Inner dot follows instantly
      inner.style.left = `${mouseX}px`;
      inner.style.top = `${mouseY}px`;
    };

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animateOuter = () => {
      outerX = lerp(outerX, mouseX, 0.1);
      outerY = lerp(outerY, mouseY, 0.1);
      outer.style.left = `${outerX}px`;
      outer.style.top = `${outerY}px`;
      rafId = requestAnimationFrame(animateOuter);
    };
    animateOuter();

    // Hover detection
    const onMouseEnterInteractive = () => outer.classList.add("hovered");
    const onMouseLeaveInteractive = () => outer.classList.remove("hovered");
    const onMouseDown = () => outer.classList.add("clicked");
    const onMouseUp = () => outer.classList.remove("clicked");

    // Hide default cursor
    document.body.style.cursor = "none";

    const interactiveEls = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, .card, .project-card, .service-card"
    );
    interactiveEls.forEach((el) => {
      el.style.cursor = "none";
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Handle cursor leaving/entering window
    document.addEventListener("mouseleave", () => { outer.style.opacity = "0"; inner.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { outer.style.opacity = "1"; inner.style.opacity = "1"; });

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      interactiveEls.forEach((el) => {
        el.style.cursor = "";
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="custom-cursor-outer" aria-hidden="true" />
      <div ref={innerRef} className="custom-cursor-inner" aria-hidden="true" />
    </>
  );
}
