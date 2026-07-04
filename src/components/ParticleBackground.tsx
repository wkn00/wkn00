import { useEffect, useRef } from "react";

/**
 * Subtle interactive particle-network background.
 * - Particles drift slowly and connect with faint lines
 * - Cursor gently repels nearby particles
 * - Scrolling parallax-shifts particles by depth and slowly
 *   drifts the hue from blue toward violet
 * - Respects prefers-reduced-motion, pauses when tab is hidden
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number; // 0.3 (far) – 1 (near), used for parallax + size
  radius: number;
};

const LINK_DISTANCE = 130;
const MOUSE_RADIUS = 160;

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return; // static page for reduced-motion users

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let running = true;

    const mouse = { x: -9999, y: -9999, active: false };
    let lastScrollY = window.scrollY;
    let scrollProgress = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with viewport, capped for performance
      const target = Math.min(100, Math.floor((width * height) / 16000));
      particles = Array.from({ length: target }, () => {
        const depth = 0.3 + Math.random() * 0.7;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22 * depth,
          vy: (Math.random() - 0.5) * 0.22 * depth,
          depth,
          radius: 0.8 + depth * 1.4,
        };
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      scrollProgress = Math.min(1, Math.max(0, scrollY / max));

      // Parallax: nearer particles shift more against scroll direction
      for (const p of particles) {
        p.y -= delta * p.depth * 0.18;
      }
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        lastScrollY = window.scrollY;
        rafId = requestAnimationFrame(tick);
      }
    };

    const wrap = (p: Particle) => {
      if (p.x < -20) p.x = width + 20;
      else if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      else if (p.y > height + 20) p.y = -20;
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      // Hue drifts from blue (217) toward violet (~252) as you scroll
      const hue = 217 + scrollProgress * 35;

      for (const p of particles) {
        // Gentle cursor repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS && dist > 0.001) {
            const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.035;
            p.vx += (dx / dist) * force * p.depth;
            p.vy += (dy / dist) * force * p.depth;
          }
        }

        // Mild damping keeps velocities bounded after interactions
        p.vx *= 0.985;
        p.vy *= 0.985;
        // Tiny baseline drift so the field never fully stalls
        p.x += p.vx + 0.03 * p.depth;
        p.y += p.vy;
        wrap(p);
      }

      // Connection lines
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > LINK_DISTANCE || Math.abs(dy) > LINK_DISTANCE)
            continue;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.14;
            ctx.strokeStyle = `hsla(${hue}, 85%, 65%, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const p of particles) {
        const alpha = 0.25 + p.depth * 0.3;
        ctx.fillStyle = `hsla(${hue}, 85%, 68%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};

export default ParticleBackground;
