import { useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type FlowNode = {
  id: string;
  x: number;
  y: number;
  w?: number;
  label: string;
  sub?: string;
  color: string;
  /* What the part does — shown when the node is hovered or focused. */
  info: string;
};
export type FlowEdge = { from: string; to: string; label?: string };
export type FlowGroup = { x: number; y: number; w: number; h: number; label: string };
export type Diagram = {
  title: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  groups?: FlowGroup[];
};

/* Every diagram is drawn on the same 16:10 canvas as the screenshots, so it
   drops into a project card or the viewer without any special casing. */
const W = 720;
const H = 450;
const NODE_W = 112;
const NODE_H = 50;

/* Leaves the side of `a` facing `b` and enters the facing side of `b`, with an
   S-curve between; mostly-vertical links run top/bottom instead. */
function edgeGeometry(a: FlowNode, b: FlowNode) {
  const aw = (a.w ?? NODE_W) / 2;
  const bw = (b.w ?? NODE_W) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    const s = Math.sign(dx) || 1;
    const x1 = a.x + s * aw;
    const x2 = b.x - s * bw;
    const mx = (x1 + x2) / 2;
    return {
      d: `M${x1},${a.y} C${mx},${a.y} ${mx},${b.y} ${x2},${b.y}`,
      mid: { x: mx, y: (a.y + b.y) / 2 },
    };
  }

  const s = Math.sign(dy) || 1;
  const y1 = a.y + (s * NODE_H) / 2;
  const y2 = b.y - (s * NODE_H) / 2;
  const my = (y1 + y2) / 2;
  return {
    d: `M${a.x},${y1} C${a.x},${my} ${b.x},${my} ${b.x},${y2}`,
    mid: { x: (a.x + b.x) / 2, y: my },
  };
}

type Props = {
  diagram: Diagram;
  /* Card thumbnails skip the caption strip and keyboard focus stops. */
  compact?: boolean;
};

const FlowDiagram = ({ diagram, compact = false }: Props) => {
  const [active, setActive] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  const focused = active ? byId[active] : null;
  const touches = (e: FlowEdge) => !active || e.from === active || e.to === active;

  return (
    <div className="preview-grid relative h-full w-full bg-[hsl(222_47%_6%)]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full select-none"
        role="img"
        aria-label={diagram.title}
      >
        <text x={24} y={40} className="fill-foreground text-[15px] font-semibold">
          {diagram.title}
        </text>

        {diagram.groups?.map((g) => (
          <g key={g.label}>
            <rect
              x={g.x}
              y={g.y}
              width={g.w}
              height={g.h}
              rx={16}
              className="fill-primary/[0.04] stroke-border"
              strokeDasharray="5 5"
            />
            <text
              x={g.x + 14}
              y={g.y + 20}
              className="fill-muted-foreground text-[10px] font-semibold uppercase tracking-[0.14em]"
            >
              {g.label}
            </text>
          </g>
        ))}

        {diagram.edges.map((e, i) => {
          const from = byId[e.from];
          const { d, mid } = edgeGeometry(from, byId[e.to]);
          const lit = touches(e);
          return (
            <g
              key={`${e.from}-${e.to}`}
              className="transition-opacity duration-300"
              opacity={lit ? 1 : 0.12}
            >
              <path d={d} fill="none" stroke={from.color} strokeOpacity={0.35} strokeWidth={1.5} />
              <path
                d={d}
                fill="none"
                stroke={from.color}
                strokeWidth={1.5}
                className="flow-edge"
              />
              {!reducedMotion && (
                <circle r={3.5} fill={from.color}>
                  <animateMotion
                    dur="2.6s"
                    begin={`${(i * 0.4) % 2.6}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              )}
              {e.label && (
                <text
                  x={mid.x}
                  y={mid.y - 8}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[10px] [paint-order:stroke] [stroke:hsl(222_47%_6%)] [stroke-width:4px]"
                >
                  {e.label}
                </text>
              )}
            </g>
          );
        })}

        {diagram.nodes.map((n) => {
          const w = n.w ?? NODE_W;
          const isActive = active === n.id;
          return (
            <g
              key={n.id}
              tabIndex={compact ? undefined : 0}
              role={compact ? undefined : "button"}
              aria-label={compact ? undefined : `${n.label}: ${n.info}`}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive(null)}
              className={cn(
                "cursor-default outline-none transition-opacity duration-300",
                active && !isActive && !diagram.edges.some(
                  (e) => (e.from === active && e.to === n.id) || (e.to === active && e.from === n.id)
                ) && "opacity-40"
              )}
            >
              <rect
                x={n.x - w / 2}
                y={n.y - NODE_H / 2}
                width={w}
                height={NODE_H}
                rx={11}
                className="fill-card"
                stroke={n.color}
                strokeOpacity={isActive ? 1 : 0.5}
                strokeWidth={isActive ? 2 : 1.25}
              />
              <circle cx={n.x - w / 2 + 15} cy={n.y} r={4.5} fill={n.color} />
              <text
                x={n.x - w / 2 + 28}
                y={n.sub ? n.y - 3 : n.y + 4}
                className="fill-foreground text-[12.5px] font-semibold"
              >
                {n.label}
              </text>
              {n.sub && (
                <text
                  x={n.x - w / 2 + 28}
                  y={n.y + 12}
                  className="fill-muted-foreground text-[10px]"
                >
                  {n.sub}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {!compact && (
        <p
          aria-live="polite"
          className="pointer-events-none absolute inset-x-4 bottom-3 text-center text-xs text-muted-foreground sm:text-sm"
        >
          {focused ? (
            <>
              <span className="font-semibold" style={{ color: focused.color }}>
                {focused.label}
              </span>{" "}
              — {focused.info}
            </>
          ) : (
            "Hover or tab through the components to see what each one does."
          )}
        </p>
      )}
    </div>
  );
};

export default FlowDiagram;
