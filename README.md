# Wael Kattan — Portfolio

Personal portfolio and résumé site, live at **[wael.elfaheem.com](https://wael.elfaheem.com/)**.

A single-page site (hero → about → certifications → experience →
projects → education & coursework → contact) with a hidden `/secret-room`
easter egg route. The Projects section links out to the other apps in this
body of work (carpet-house games, trivia, price-guessing, classroom tools,
and more); each card has an interactive preview, a full-size viewer, and —
for the deployed apps — a "Try it live" tab that embeds the running app.

## Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- [react-router-dom](https://reactrouter.com/) for routing
- [EmailJS](https://www.emailjs.com/) for client-side contact form delivery (no backend)

## Project structure

```
src/
├── pages/
│   ├── Index.tsx          # main one-page portfolio, composes all sections below
│   ├── SecretRoom.tsx     # easter-egg route
│   └── NotFound.tsx       # 404 page
├── components/
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── CertificationsSection.tsx   # Azure path stepper + credential cards
│   ├── ExperienceSection.tsx
│   ├── EducationSection.tsx        # degree timeline + coursework
│   ├── education/                  # course data and the coursework breakdown
│   ├── ProjectsSection.tsx         # project data (shots, captions, links)
│   ├── projects/                   # ProjectPreview (card media), ProjectViewer
│   │                               # (lightbox + live embed), FlowDiagram
│   ├── ContactSection.tsx
│   ├── Navbar.tsx / Footer.tsx / ParticleBackground.tsx
│   └── ui/                # shadcn/ui components
├── hooks/, lib/           # shared hooks and utilities
└── assets/                # imported (content-hashed) media:
                           # projects/ screenshots + demo video, certs/ badges

k8s/            # namespace.yaml, deployment.yaml (k3s deployment)
Dockerfile      # multi-stage: node:22-alpine build -> nginx:1.27-alpine runtime
nginx.conf      # SPA-aware nginx config
```

## Getting started

This repo ships both a `bun.lockb` and a `package-lock.json` — pick one
package manager and stick with it.

```bash
# with bun
bun install
bun run dev

# or with npm
npm install
npm run dev
```

Other scripts:

```bash
npm run build       # production build to dist/
npm run build:dev   # development-mode build
npm run preview     # preview the production build locally
npm run lint         # eslint
```

## Deployment

The site runs on a k3s cluster: `Dockerfile` builds a static bundle and
serves it with nginx, and `k8s/namespace.yaml` + `k8s/deployment.yaml`
deploy it (exposed the same way as the rest of the app family, via
Cloudflare Tunnel to a Service).

To ship a change:

```bash
# bump the image tag in k8s/deployment.yaml, then:
docker build -t ghcr.io/wkn00/wael-portfolio:<tag> .
docker push ghcr.io/wkn00/wael-portfolio:<tag>
kubectl apply -f k8s/deployment.yaml
kubectl -n wael rollout status deploy/wael-frontend
```

## License

No license file yet — all rights reserved by default.
