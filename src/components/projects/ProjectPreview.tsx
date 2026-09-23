import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Expand, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import FlowDiagram from "./FlowDiagram";
import type { Preview, Slide } from "./types";

/* Time each shot stays up while the card is cycling. The progress bar in
   index.css (.animate-progress) runs on the same clock. */
export const CYCLE_MS = 2400;

type Props = {
  title: string;
  preview: Preview;
  live: boolean;
  isPrivate?: boolean;
  onOpen: (slide: number) => void;
};

const CardSlide = ({
  slide,
  framed,
  videoRef,
  onEnded,
}: {
  slide: Slide;
  /* Inside the browser frame a contained shot sits flush; without one it
     floats on the backdrop with room and a shadow around it. */
  framed: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  onEnded: () => void;
}) => {
  if (slide.kind === "diagram") return <FlowDiagram diagram={slide.diagram} compact />;

  if (slide.kind === "video")
    return (
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        poster={slide.poster}
        onEnded={onEnded}
        className="h-full w-full object-cover object-top"
      >
        <source src={slide.webm} type="video/webm" />
        <source src={slide.mp4} type="video/mp4" />
      </video>
    );

  return (
    <img
      src={slide.src}
      alt={slide.caption}
      loading="lazy"
      decoding="async"
      className={cn(
        "h-full w-full",
        slide.fit !== "contain" && "object-cover object-top",
        slide.fit === "contain" &&
          (framed
            ? "object-contain"
            : "object-contain p-[7%] drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]")
      )}
    />
  );
};

/**
 * The media half of a project card. At rest it shows the cover shot framed
 * like the app it is; hovered (or scrolled into view on touch screens) it
 * steps through the rest of the shots, plays the demo video, and tilts a
 * little with the cursor. Clicking hands off to the full viewer.
 */
const ProjectPreview = ({ title, preview, live, isPrivate, onOpen }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const reducedMotion = useReducedMotion();
  const { slides } = preview;
  const current = slides[index];
  const next = () => setIndex((i) => (i + 1) % slides.length);

  // Step through the shots while active. A video slide advances when it ends.
  useEffect(() => {
    if (!active || reducedMotion || slides.length < 2 || current.kind === "video") return;
    const t = window.setTimeout(next, CYCLE_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, index, reducedMotion, slides.length, current.kind]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active && current.kind === "video") {
      v.playbackRate = 2; // the walkthrough is 27 s; a hover shouldn't be
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active, current.kind]);

  // Touch screens have no hover: play while the card is mostly on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.intersectionRatio >= 0.6),
      { threshold: [0, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el || reducedMotion) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const onMouseLeave = () => {
    setActive(false);
    setIndex(0);
    if (videoRef.current) videoRef.current.currentTime = 0;
    rootRef.current?.style.setProperty("--mx", "0");
    rootRef.current?.style.setProperty("--my", "0");
  };

  const slideStack = (
    <div className="relative flex-1 overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out",
            i === index ? "opacity-100" : "opacity-0"
          )}
          style={{ background: slide.kind === "image" ? slide.bg : undefined }}
        >
          <CardSlide
            slide={slide}
            framed={preview.frame === "browser"}
            videoRef={videoRef}
            onEnded={next}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={rootRef}
      role="button"
      tabIndex={0}
      aria-label={`Open the preview of ${title}`}
      onClick={() => onOpen(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(index);
        }
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className="group/preview relative aspect-[16/10] cursor-zoom-in overflow-hidden bg-[hsl(222_47%_6%)] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      style={{ "--accent": preview.accent } as CSSProperties}
    >
      {/* Backdrop: the project's own colour, glowing up from behind the frame */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-500 group-hover/preview:opacity-100 opacity-80"
        style={{
          background:
            "radial-gradient(110% 85% at 50% 0%, hsl(var(--accent) / 0.38), transparent 62%), radial-gradient(70% 60% at 100% 100%, hsl(var(--accent) / 0.2), transparent 70%)",
        }}
      />
      <div aria-hidden="true" className="preview-grid absolute inset-0 opacity-60" />

      {preview.frame === "browser" ? (
        <div
          className="absolute inset-x-[7%] top-[17%] -bottom-[5%] sm:top-[10%] flex flex-col overflow-hidden rounded-t-xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/60 transition-transform duration-300 ease-out"
          style={{
            transform:
              "translate3d(calc(var(--mx, 0) * -7px), calc(var(--my, 0) * -5px), 0)",
          }}
        >
          <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-white/5 bg-[#161b22] px-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            <span className="mx-auto flex h-4 max-w-[60%] items-center gap-1 truncate rounded-md bg-white/5 px-3 text-[10px] text-white/50">
              {live && <Lock className="h-2.5 w-2.5 shrink-0" />}
              {preview.label}
            </span>
          </div>
          {slideStack}
        </div>
      ) : (
        <div
          className="absolute inset-0 flex transition-transform duration-300 ease-out"
          style={{
            transform:
              "translate3d(calc(var(--mx, 0) * -5px), calc(var(--my, 0) * -4px), 0) scale(1.02)",
          }}
        >
          {slideStack}
        </div>
      )}

      {preview.mobile && (
        <div
          aria-hidden="true"
          className="absolute -bottom-[12%] right-[4%] w-[20%] overflow-hidden rounded-[16px] border-[3px] border-[#1f2430] bg-black shadow-2xl shadow-black/70 ring-1 ring-white/10 transition-transform duration-300 ease-out"
          style={{
            aspectRatio: "9 / 19.5",
            transform:
              "translate3d(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 9px), 0)",
          }}
        >
          <img
            src={preview.mobile}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/preview:-translate-y-[6%]"
          />
        </div>
      )}

      {/* Bottom fade into the card body */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-card/90 to-transparent"
      />

      {live && (
        <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-400/30 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
      )}
      {isPrivate && (
        <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white/80 ring-1 ring-white/15 backdrop-blur-sm">
          <Lock className="h-3 w-3" /> Private
        </span>
      )}

      <span className="absolute right-2 top-2 z-10 sm:right-3 sm:top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white/85 ring-1 ring-white/15 backdrop-blur-sm transition-opacity duration-300 opacity-0 group-hover/preview:opacity-100 group-focus-visible/preview:opacity-100">
        <Expand className="h-3 w-3" />
        {slides.length > 1 ? `${slides.length} views` : "Expand"}
      </span>

      {slides.length > 1 && (
        <div
          aria-hidden="true"
          className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/50 px-2 py-1.5 backdrop-blur-sm"
        >
          {slides.map((_, i) => (
            <span key={i} className="h-1 w-5 overflow-hidden rounded-full bg-white/25">
              <span
                // Re-keyed per step so the fill animation restarts each time
                key={`${i}-${index}-${active}`}
                className={cn(
                  "block h-full origin-left rounded-full bg-white",
                  i < index && "scale-x-100",
                  i > index && "scale-x-0",
                  i === index &&
                    (active && !reducedMotion && current.kind !== "video"
                      ? "animate-progress"
                      : "scale-x-100")
                )}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPreview;
