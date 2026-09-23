import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { courseAreas, courseCount, type CourseArea } from "./courses";

/* Part-to-whole bar: one segment per subject area, sized by course count.
   Hovering or focusing a segment, a legend entry or a card highlights that
   area everywhere; the cards below are the full table behind the bar. */
const Coursework = () => {
  const [active, setActive] = useState<string | null>(null);
  const bind = (id: string) => ({
    onMouseEnter: () => setActive(id),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(id),
    onBlur: () => setActive(null),
  });
  const dimmed = (a: CourseArea) => active !== null && active !== a.id;

  return (
    <div id="courses">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold tracking-tight">Coursework</h3>
        <p className="mt-1 max-w-2xl text-muted-foreground">
          The {courseCount} courses behind the degree, by subject. Security and
          networking make up the specialization; systems and cloud are the
          other big block.
        </p>
      </div>

      <figure className="surface-card mb-8 p-5 md:p-6">
        <figcaption className="mb-1 flex items-baseline justify-between text-sm">
          <span className="font-medium">Courses by subject area</span>
          <span className="text-muted-foreground">{courseCount} total</span>
        </figcaption>

        <div className="flex gap-[2px]">
          {courseAreas.map((area, i) => {
            const n = area.courses.length;
            const edge = i === 0 ? "left-0" : i === courseAreas.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2";
            return (
              <a
                key={area.id}
                href={`#course-${area.id}`}
                aria-label={`${area.name}: ${n} of ${courseCount} courses`}
                className="group relative block py-3 outline-none"
                style={{ flex: `${n} 1 0%` }}
                {...bind(area.id)}
              >
                <span
                  className={cn(
                    "block h-3 transition-[filter,opacity] duration-200 group-focus-visible:ring-2 group-focus-visible:ring-foreground/60",
                    i === courseAreas.length - 1 && "rounded-r-[4px]",
                    dimmed(area) ? "opacity-30" : "opacity-100",
                    active === area.id && "brightness-125"
                  )}
                  style={{ background: area.color }}
                />
                {active === area.id && (
                  <span
                    role="tooltip"
                    className={cn(
                      "pointer-events-none absolute bottom-full z-10 mb-1 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-lg",
                      edge
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-0.5 w-3 rounded-full" style={{ background: area.color }} />
                      <strong className="text-sm text-foreground">{n}</strong>
                      <span className="text-muted-foreground">
                        {area.name} · {Math.round((n / courseCount) * 100)}%
                      </span>
                    </span>
                  </span>
                )}
              </a>
            );
          })}
        </div>

        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {courseAreas.map((area) => (
            <li key={area.id}>
              <a
                href={`#course-${area.id}`}
                className={cn(
                  "inline-flex items-center gap-2 rounded-sm transition-opacity",
                  dimmed(area) && "opacity-40"
                )}
                {...bind(area.id)}
              >
                <span className="h-2.5 w-3.5 rounded-[2px]" style={{ background: area.color }} />
                <span className="text-foreground">{area.name}</span>
                <span className="tabular-nums text-muted-foreground">{area.courses.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </figure>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {courseAreas.map((area) => {
          const Icon = area.icon;
          return (
            <article
              key={area.id}
              id={`course-${area.id}`}
              {...bind(area.id)}
              className={cn(
                "surface-card relative h-full overflow-hidden p-5 pt-6",
                dimmed(area) && "opacity-50",
                active === area.id && "-translate-y-1 border-foreground/25 shadow-lg shadow-black/20"
              )}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: area.color }}
              />
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h4 className="font-semibold leading-tight">{area.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {area.courses.length} {area.courses.length === 1 ? "course" : "courses"}
                  </p>
                </div>
                {area.specialization && (
                  <span className="ml-auto shrink-0 rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold text-primary ring-1 ring-primary/30">
                    Specialization
                  </span>
                )}
              </div>

              <ul className="mt-4 space-y-2.5">
                {area.courses.map((course) => (
                  <li key={course.name} className="flex items-start gap-2.5 text-sm">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: area.color }}
                    />
                    <span className="flex-1">{course.name}</span>
                    {course.link && (
                      <a
                        href={course.link.href}
                        className="inline-flex shrink-0 items-center gap-0.5 text-xs font-medium text-primary hover:underline"
                      >
                        {course.link.label}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Coursework;
