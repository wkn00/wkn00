import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ExternalLink, Images, Lock, MonitorPlay, Network, RotateCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FlowDiagram from "./FlowDiagram";
import type { Project, Slide } from "./types";

export type ViewerState = {
  project: Project;
  slide: number;
  tab: "shots" | "live";
};

const VideoSlide = ({ slide, active }: { slide: Extract<Slide, { kind: "video" }>; active: boolean }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  return (
    <video
      ref={ref}
      controls
      muted
      loop
      playsInline
      preload="metadata"
      poster={slide.poster}
      className="max-h-full max-w-full rounded-lg shadow-2xl"
    >
      <source src={slide.webm} type="video/webm" />
      <source src={slide.mp4} type="video/mp4" />
    </video>
  );
};

const Thumb = ({ slide }: { slide: Slide }) => {
  if (slide.kind === "diagram")
    return (
      <span className="flex h-full w-full items-center justify-center bg-[hsl(222_47%_6%)] text-primary">
        <Network className="h-5 w-5" />
      </span>
    );
  return (
    <img
      src={slide.kind === "video" ? slide.poster : slide.src}
      alt=""
      loading="lazy"
      className="h-full w-full object-cover object-top"
      style={{ background: slide.kind === "image" ? slide.bg : undefined }}
    />
  );
};

/**
 * Full-size look at a project: every shot in a swipeable carousel, and for
 * the apps that are deployed, the real thing running in a frame.
 */
const ProjectViewer = ({
  state,
  onClose,
}: {
  state: ViewerState | null;
  onClose: () => void;
}) => {
  // Keep the last project around so the close animation has content to fade.
  const [shown, setShown] = useState<ViewerState | null>(state);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [tab, setTab] = useState<ViewerState["tab"]>("shots");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!state) return;
    setShown(state);
    setCurrent(state.slide);
    setTab(state.tab);
  }, [state]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    // A fresh carousel (reopened, or back from the live tab) starts where
    // `opts.startIndex` put it, so sync the caption to that straight away.
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!shown) return null;
  const { project } = shown;
  const { slides } = project.preview;
  const liveUrl = project.demoUrl;

  const onKeyDown = (e: KeyboardEvent) => {
    // The carousel handles arrows itself when it has focus; this covers the
    // rest of the dialog so arrows work straight after it opens.
    if (e.defaultPrevented || tab !== "shots" || !api) return;
    if (e.key === "ArrowLeft") api.scrollPrev();
    if (e.key === "ArrowRight") api.scrollNext();
  };

  return (
    <Dialog open={state !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        onKeyDown={onKeyDown}
        className="flex max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-6xl flex-col gap-0 overflow-hidden border-border/70 bg-background/95 p-0 backdrop-blur-xl sm:rounded-2xl"
      >
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as ViewerState["tab"])}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border/60 px-5 py-4 pr-14">
            <div className="min-w-0 flex-1 basis-60">
              <DialogTitle className="truncate text-lg">{project.title}</DialogTitle>
              <DialogDescription className="truncate text-sm">
                {tab === "live" && liveUrl
                  ? "The real app, running on my own k3s cluster — go ahead and use it."
                  : slides.length > 1
                    ? `${slides.length} views · use ← → or swipe`
                    : project.tags.slice(0, 4).join(" · ")}
              </DialogDescription>
            </div>
            {liveUrl && (
              <TabsList className="h-9">
                <TabsTrigger value="shots" className="gap-1.5 text-xs sm:text-sm">
                  <Images className="h-4 w-4" /> Screenshots
                </TabsTrigger>
                <TabsTrigger value="live" className="gap-1.5 text-xs sm:text-sm">
                  <MonitorPlay className="h-4 w-4" /> Try it live
                </TabsTrigger>
              </TabsList>
            )}
          </div>

          <TabsContent value="shots" className="mt-0 min-h-0 flex-1 overflow-y-auto">
            <Carousel
              setApi={setApi}
              opts={{ startIndex: shown.slide, loop: slides.length > 1 }}
              className="group/carousel"
            >
              <CarouselContent className="ml-0">
                {slides.map((slide, i) => (
                  <CarouselItem key={i} className="pl-0">
                    <div className="flex h-[min(52dvh,520px)] items-center justify-center bg-black/30 p-3 sm:h-[min(62dvh,640px)] sm:p-6">
                      {slide.kind === "image" && (
                        <img
                          src={slide.src}
                          alt={slide.caption}
                          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
                          style={{ background: slide.bg }}
                        />
                      )}
                      {slide.kind === "video" && <VideoSlide slide={slide} active={i === current} />}
                      {slide.kind === "diagram" && (
                        <div className="aspect-[16/10] h-full max-h-full max-w-full overflow-hidden rounded-lg ring-1 ring-white/10">
                          <FlowDiagram diagram={slide.diagram} />
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {slides.length > 1 && (
                <>
                  <CarouselPrevious className="left-3 h-10 w-10 border-white/15 bg-black/50 text-white backdrop-blur hover:bg-black/70 hover:text-white" />
                  <CarouselNext className="right-3 h-10 w-10 border-white/15 bg-black/50 text-white backdrop-blur hover:bg-black/70 hover:text-white" />
                </>
              )}
            </Carousel>

            <div className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
              <p className="text-foreground/90">{slides[current]?.caption}</p>
              {slides.length > 1 && (
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  {current + 1} / {slides.length}
                </span>
              )}
            </div>

            {slides.length > 1 && (
              <div className="flex gap-2 overflow-x-auto px-5 pb-5 pt-1">
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Show view ${i + 1}: ${slide.caption}`}
                    aria-current={i === current}
                    className={cn(
                      "h-14 w-24 shrink-0 overflow-hidden rounded-md ring-2 ring-offset-2 ring-offset-background transition-all",
                      i === current
                        ? "ring-primary"
                        : "opacity-60 ring-transparent hover:opacity-100"
                    )}
                  >
                    <Thumb slide={slide} />
                  </button>
                ))}
              </div>
            )}
          </TabsContent>

          {liveUrl && (
            <TabsContent value="live" className="mt-0 flex min-h-0 flex-1 flex-col">
              <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border/60 bg-card px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                <span className="mx-2 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-secondary/70 px-3 py-1 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3 shrink-0" />
                  {liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setReloadKey((k) => k + 1)}
                  aria-label="Reload the app"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 gap-1.5" asChild>
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">New tab</span>
                  </a>
                </Button>
              </div>
              <iframe
                key={reloadKey}
                src={liveUrl}
                title={`${project.title} — live`}
                className="h-[min(72dvh,760px)] min-h-0 w-full bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectViewer;
