import type { Diagram } from "./FlowDiagram";

export type Slide =
  | {
      kind: "image";
      src: string;
      caption: string;
      /* "contain" for shots whose shape doesn't match the frame (a narrow
         desktop window, a wide crop); they float on `bg` instead of being cut. */
      fit?: "cover" | "contain";
      bg?: string;
    }
  | { kind: "video"; mp4: string; webm: string; poster: string; caption: string }
  | { kind: "diagram"; diagram: Diagram; caption: string };

export type Preview = {
  /* "browser" draws a window with an address bar around the shots; "none"
     lets them fill the card (full-screen shots, diagrams, floating windows). */
  frame: "browser" | "none";
  /* Shown in the address bar. */
  label?: string;
  /* HSL triple ("152 62% 45%") tinting the backdrop behind the frame. */
  accent: string;
  slides: Slide[];
  /* Phone-sized shot laid over the corner of the cover. */
  mobile?: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  demoUrl: string | null;
  repoUrl: string | null;
  preview: Preview;
};
