# Portfolio Redesign — Design Prompt

Paste the block below into Claude (claude.ai for a visual artifact mockup, or Claude Code
for the real React build).

Unresolved before building:
- Email: resume says `niranjanm0920@gmail.com`, current site says `niranjanmj02@gmail.com`
- Phone: resume says `+91 6363837187`, current site says `+91 9449198093`

---

Design and build a portfolio site for an AI/ML/Gen AI engineer. Modern, precise,
motion-led — the kind of site that wins Awwwards "Site of the Day", not a template.

## WHO IT'S FOR
Niranjan M — AI · ML · Gen AI Engineer, 3+ years, Mysuru, Karnataka, India.
Audience: AI hiring managers and founders scanning for 90 seconds. Every motion
must serve legibility of the work, never decorate for its own sake.

## STACK (must match the existing repo)
React 18 + Vite + Tailwind CSS 3 + shadcn/ui primitives (already installed:
lucide-react, class-variance-authority, tailwind-merge, tailwindcss-animate).
Add: framer-motion (motion/react), lenis (smooth scroll).
JavaScript, not TypeScript. Files: src/components/*.jsx. No CSS-in-JS libraries.
Do not use GSAP/ScrollTrigger (licensing) — use framer-motion's useScroll/useTransform
and IntersectionObserver instead.

## ART DIRECTION
Replace the current "fake terminal window with traffic-light dots" chrome — it's
overused and it fights the content. Keep the dark, engineered, monospace-inflected
feel but make it feel like a precision instrument, not a Mac terminal screenshot.

- Base: near-black #08090A, elevated surfaces #101113, hairline borders
  rgba(255,255,255,0.06–0.10).
- One accent only, used sparingly (<5% of pixels): electric mint #00FF88 or
  cyan #00D4FF — pick one, don't gradient between them everywhere.
- Type: Inter (or Geist) for prose, JetBrains Mono for labels/metadata/numbers.
  Big editorial display sizes: clamp(3rem, 9vw, 8rem) for hero.
- Layout: a real 12-column grid with generous asymmetry. Wide 1440px container,
  not a cramped max-w-4xl. Sections should breathe — 12–20vh vertical rhythm.
- Texture: a very subtle animated noise/grain overlay (opacity ~0.025) and a
  fixed radial glow that follows scroll position. No particle fields, no matrix rain.

## MOTION SYSTEM (specify it once, apply it everywhere)
Define these as shared tokens and reuse them — inconsistent easing is what makes
sites feel amateur.
- Easing: [0.16, 1, 0.3, 1] (expo-out) for entrances; [0.65, 0, 0.35, 1] for
  transforms; 150–200ms linear for hover states.
- Durations: micro 150ms, standard 400ms, entrance 700ms, hero 1100ms.
- Stagger: 60ms between siblings, capped at 8 items.
- Entrances: opacity 0→1 with translateY 24px→0 and a 2% blur burn-off.
  Trigger at 15% viewport intersection, once only (never re-animate on scroll-up).
- Every animated element must respect `prefers-reduced-motion: reduce` — collapse
  to instant opacity fades, disable smooth scroll, disable the custom cursor,
  freeze the 3D scene on a static frame.

## SCROLL SYSTEM (this is the centrepiece — be precise)
1. **Lenis smooth scroll** — lerp 0.1, duration 1.2, wheelMultiplier 1.
   Sync Lenis's RAF with framer-motion. Kill it on touch devices (native momentum
   is better) and under reduced-motion.
2. **Scroll progress rail** — a 2px accent line pinned to the viewport top, width
   driven by useScroll's scrollYProgress through a useSpring (stiffness 400,
   damping 90) so it eases rather than snapping.
3. **Section-scoped parallax** — each section's background layer moves at 0.85x
   scroll speed, foreground content at 1x. Subtle. If it reads as "moving", it's
   too much.
4. **Hero → About handoff** — as the hero scrolls out, its display type scales
   0.94 and fades while the About section slides up over it (sticky positioning,
   not a library carousel).
5. **Pinned horizontal scroll for the Experience timeline** — the section pins
   for ~300vh of scroll while three job cards translate horizontally. Each card
   locks into place and its bullet list staggers in as it centres. Must degrade
   to a plain vertical stack under 1024px and under reduced-motion.
6. **Sticky section index** — the section number/name (`01 / ABOUT`) sticks to the
   left gutter and morphs to the next section as you cross the boundary.
7. **Scroll-linked text reveal** — the About paragraph reveals word-by-word tied
   to scroll position (each word 0.25→1 opacity across its own scroll range).
8. **Nav scroll-spy** — active section derived from IntersectionObserver with
   rootMargin '-45% 0px -55% 0px', with a layoutId pill that slides between items.
9. **Counters** — stat numbers (3+ yrs, 8+ production systems, 1 IEEE paper)
   count up once on first intersection.
Performance: only ever animate transform and opacity. No layout-triggering
properties in any scroll handler. Target a sustained 60fps; hint with
will-change only on currently-animating nodes.

## 3D SCROLL SCENE (fixed background canvas, scroll-driven)
Add react-three-fiber (@react-three/fiber) + three. No drei, no GLTF, no external
asset files — the model is built from primitives so nothing has to be downloaded
or licensed.

**A laptop whose hinge is driven by the scroll.** Not a floating blob and not a
downloaded character model.

Geometry (all procedural):
- Chassis and lid as RoundedBoxGeometry; the lid hangs off a pivot group placed
  on the hinge line at the back edge of the base.
- A 70-key keyboard as a single InstancedMesh — one draw call for the lot.
- Trackpad and a recessed deck inlay as thin planes.
- The screen is a ShaderMaterial: abstract bars of code, a caret that blinks on
  one line at a time, and a slow vertical sweep. Emissive-looking, toneMapped
  off. Brightness is tied to how far the lid is open.
- Total: roughly 1.5k triangles and four draw calls.

Scroll choreography — one continuous take, no cuts and no per-section canvases:
- Hero: lid closed, seen from slightly above, sitting in the right-hand gutter.
- Hero -> About: the lid opens to ~106°, the screen lights up, the camera levels
  off from looking-down to looking-straight-on.
- About: laptop slides further into the right gutter and dims hard so body copy
  stays dominant.
- Experience: recentres and yaws a few degrees per company card, in sync with
  the pinned horizontal scroll.
- Work: crosses to the left gutter behind the project grid.
- Research -> Contact: the lid closes again and the whole thing fades out.

**Drive this from section position, not from scrollYProgress.** A raw 0..1
document fraction is meaningless when one section is 340vh tall — measure each
section's offset and express position as `stage` (2.4 = 40% through section 2),
then key every phase off that. Interpolate with damped lerp inside useFrame so
nothing ever snaps.

Hard performance rules (this is where 3D portfolios usually die):
- Lazy-load the whole scene with React.lazy + Suspense so three.js never blocks
  first paint. Render a CSS gradient poster until it's ready.
- One `<Canvas>` for the entire page, `position: fixed`, `pointer-events: none`,
  `z-index: 0`, all DOM content above it.
- CAREFUL: R3F applies the `<Canvas style>` prop to its outer wrapper div, not
  to the canvas element. Never put opacity there — fade `gl.domElement` instead,
  or the scene renders perfectly inside an invisible parent.
- dpr={[1, 1.5]}, no shadows, no post-processing.
- Pause the render loop when the tab is hidden.
- Skip 3D and render the static poster when `prefers-reduced-motion: reduce`,
  `navigator.hardwareConcurrency < 4`, or WebGL creation fails. Phones DO get the
  3D — the scene reframes itself using a fit distance derived from the live
  viewport aspect, so it is never cropped, and dims so text stays readable.
- Budget: the lazy 3D chunk stays under ~250KB gzipped and must not pull
  Lighthouse Performance below 90 on desktop.

## THEME (light + dark, cyan accent in both)
`data-theme` on `<html>`, resolved by an inline script in index.html BEFORE first
paint so there is no flash. Follow the OS preference until the visitor picks a
theme, then persist the choice. Toggle in the navbar and in the mobile menu.

- Dark: base #08090A, surfaces #101113, accent #00D4FF (10.8:1).
- Light: base #F6F8FA, surfaces #FFFFFF, accent #0E7490 (5.1:1).
- The accent is NOT the same hex in both. Bright cyan only reaches ~3.5:1 on a
  light ground and fails AA for text; keep a separate `--brand-glow` at the
  bright value for the 3D scene and glows.
- Every colour goes through a CSS variable — no hardcoded hex in components, and
  translucent accents via `rgba(var(--brand-rgb), a)`.
- The laptop flips too: light silver body on dark, graphite on light, with
  ambient and key-light intensities retuned per theme, and lower canvas opacity
  in light mode because a dark object under dark body text is harsher.

## CURSOR SYSTEM
A custom cursor that actually earns its place (desktop + fine pointer only —
detect with matchMedia('(pointer: fine)'), otherwise render nothing):
- Two elements: an 8px solid accent dot that tracks the pointer at 1:1, and a
  36px ring that trails with spring physics (stiffness 300, damping 28, mass 0.6).
- Magnetic hover: buttons, nav items and project cards pull the ring toward their
  centre and the element itself translates up to 8px toward the cursor.
- Contextual states: over links the ring scales to 2.5x and the dot hides; over
  project cards it becomes a filled disc with the label "VIEW"; over the hero it
  shows "SCROLL"; over draggable/horizontal areas, a ↔ glyph; mousedown scales the
  ring to 0.8x.
- The cursor also feeds the 3D scene: pointer position drives the camera parallax
  tilt, and hovering a project card pulses the nearest graph cluster.
- Hide the native cursor only where the custom one is live, and never on inputs
  or textareas (keep the I-beam).
- Position with transform: translate3d, driven by requestAnimationFrame or
  framer-motion springs — never by React state on every mousemove.

## SECTIONS AND EXACT CONTENT
Use this content verbatim — do not invent achievements or metrics.

### 00 — Hero
Name: Niranjan M
Role: AI · ML · Gen AI Engineer
Sub: Python · TensorFlow · LangGraph · RAG · NLP · Computer Vision — 3+ years
Line: Building production ML models, Generative AI systems, and LLM-powered
services. Currently at Examic EdTech.
Location: Mysuru, Karnataka
CTAs: View Work / Download Résumé / Get in touch
Micro-stats: 3+ yrs · 3 companies · 1 IEEE publication · Azure certified

### 01 — About
AI / ML / Gen AI Engineer with 3+ years building production ML models, Generative
AI systems, and LLM-powered services in Python. Ships classical ML (TensorFlow,
Scikit-learn, Hugging Face BERT, MediaPipe CV), Gen AI (LangGraph, LangChain, RAG,
prompt engineering, LLM evaluation, RLHF/SFT), and LLMOps / ML pipelines (Git,
Docker, CI/CD, Apache Airflow, FastAPI) at Examic; earlier remote Gen AI work at
Outlier. IEEE computer vision research (ASIANCON 2024). Microsoft Certified:
Azure Data Science Associate.
Photo: /assets/me.jpg — treat it editorially (duotone → full colour on hover,
slight scroll-linked scale), not as a circle avatar.

### 02 — Experience (the pinned horizontal timeline)

**Examic EdTech Private Limited** — AI / ML / Gen AI Engineer · July 2024 – Present
- Built Neural Nexus, a hybrid-RAG Gen AI knowledge engine integrating LLMs with
  Neo4j, PostgreSQL and Redis on FastAPI, with parallel retrieval, graph analytics
  and SSE streaming for grounded production responses.
- Architected RAG pipelines with adaptive chunking, metadata filtering and
  graph-augmented context to improve answer faithfulness; monitored retrieval hit
  rate, latency and grounding errors in live sessions.
- Shipped LangChain / LangGraph chatbots with Ollama / vLLM self-hosting and Google
  Gemini fallback for cost-aware Generative AI support workflows.
- Applied zero-shot and few-shot prompt templates with chain-of-thought patterns;
  refined prompts using A/B output quality scoring, format checks and stakeholder
  feedback loops.
- Developed NLP models with Hugging Face BERT and FastAPI for semantic similarity,
  grammar checking and automated PDF question generation.
- Trained and deployed computer vision proctoring with Google MediaPipe for
  multi-person and object detection; built Gemini multimodal voice agents for
  real-time spoken AI interactions.
- Designed Apache Airflow ETL DAGs for UAT-to-cloud migration and DWH upserts.
- Owned LLMOps: Git, Docker builds, CI/CD gates, structured logging and
  latency/quality monitoring for production LLM services on Azure.
Stack: Python, FastAPI, LangGraph, LangChain, RAG, TensorFlow, Hugging Face,
MediaPipe, Gemini, OpenAI API, Neo4j, PostgreSQL, Airflow, NLP, CV

**Codevice Solutions Private Limited** — ML Engineering Intern · March 2024 – July 2024
- Built Python data and REST API services for inventory and transaction datasets,
  with validation and structured preprocessing for downstream ML and analytics.
- Designed modular backend data layers with SQL integrations and Git-based
  delivery, enabling reusable pipelines for reporting and model-ready features.
- Supported feature extraction and dataset cleanup feeding Scikit-learn analytics
  modules and internal reporting dashboards.
Stack: Python, REST APIs, SQL, Data Preprocessing, Git, ML Pipelines

**Outlier** — Gen AI Engineer, Remote · July 2023 – March 2024
- Ran prompt engineering and LLM evaluation (A/B comparison) on factuality, format,
  latency and task completion for agentic Gen AI workflows.
- Built RLHF / SFT dataset pipelines and ML classification workflows for
  multimodal model alignment and quality scoring on client batches.
- Refined chain composition, guardrails and evaluation rubrics; shipped Python
  FastAPI preprocessing services with Git-tracked delivery QA.
- Preprocessed training datasets and supported LLM fine-tuning deliveries with
  validation, error handling and batch quality checks across multilingual domains.
Stack: Python, LangChain, LangGraph, LLM Evaluation, RLHF, SFT, Agentic AI, FastAPI

### 03 — Selected Work
Cards with a scroll-linked image/diagram reveal and magnetic hover. Order matters:
1. **Neural Nexus** — Hybrid-RAG knowledge engine. Neo4j + PostgreSQL + Redis,
   parallel retrieval, graph analytics, SSE streaming, FastAPI. [flagship]
2. **DeepWeed CNN** — VGG16 weed classification, published at 2024 ASIANCON,
   IEEE Xplore. TensorFlow, CNN, Python.
3. **AI Proctoring System** — Google MediaPipe multi-person and object detection,
   LiveKit real-time video.
4. **Gemini Voice Agent** — real-time multimodal spoken AI with LiveKit Agents.
5. **NLP Question Generator** — Hugging Face BERT + FastAPI for semantic
   similarity, grammar checking, automated PDF question generation.
6. **Airflow ETL Platform** — UAT→cloud migration DAGs, DWH upserts, Python
   validation pipelines on Azure.

### 04 — Skills
Five groups. NO percentage bars and no invented proficiency scores — use a
typographic marquee/cluster layout with weighted sizing, or a filterable tag grid.
- **Gen AI & LLM**: Generative AI, LangGraph, LangChain, RAG, RAG Architecture,
  Agentic AI, LLM, Prompt Engineering, Few-Shot Prompting, LLM Evaluation, RLHF,
  SFT, Ollama, vLLM
- **Machine Learning & Deep Learning**: TensorFlow, PyTorch, Scikit-learn, Pandas,
  Feature Engineering, Model Training, Model Evaluation, CNN, Supervised Learning
- **AI / NLP & Computer Vision**: NLP, Hugging Face Transformers, BERT, Computer
  Vision, OpenCV, Google MediaPipe, Object Detection, Multimodal AI
- **ML Engineering & APIs**: Python, FastAPI, REST APIs, Async Python, WebSockets,
  SSE Streaming, OpenAI API, Google Gemini
- **Data Engineering & MLOps**: Apache Airflow, ETL Pipelines, PostgreSQL, Neo4j,
  Redis, Azure Machine Learning, Azure Blob Storage, Git, Docker, CI/CD, LLMOps,
  pytest

### 05 — Research, Education & Certifications
- Publication: deep learning for weed classification, 2024 ASIANCON (IEEE Xplore).
- Amrita School of Computing, Mysuru (Amrita Vishwa Vidyapeetham) — Integrated
  BCA–MCA, 2019–2024. Coursework: Machine Learning, Data Structures & Algorithms,
  Database Management Systems, Statistics for Data Science.
- Microsoft Certified: Azure Data Science Associate.
- NPTEL — The Joy of Computing using Python.

### 06 — Contact
Email, phone, LinkedIn (linkedin.com/in/niranjan-m-1ba74b258), GitHub
(github.com/Niranjanmj02), Mysuru. Keep the form but make submission state
honest — no fake "sent successfully" without a real backend; wire it to a
mailto: fallback or Formspree and say which.

## NON-NEGOTIABLES
- Fully responsive: 360px → 1920px. Every pinned/horizontal/3D effect has a defined
  mobile fallback, described explicitly.
- Accessible: semantic landmarks, visible focus rings that survive the custom
  cursor, WCAG AA contrast on all text (the current #6b6b6b on #0a0a0a fails —
  lift muted text to at least #8b8b8b), keyboard-navigable everywhere, and a full
  prefers-reduced-motion path.
- No layout shift on load. Ship a short deterministic intro (~900ms max, skippable,
  shown once per session) — not the current fixed 1500ms blocking spinner.
- Lighthouse: Performance ≥ 90, Accessibility 100.

## DELIVERABLE
Component-by-component React implementation with the motion tokens centralised in
one file (src/lib/motion.js) and the 3D scene isolated in src/components/three/,
plus a short note on which scroll effect lives where. Start by showing me the hero
and the scroll system; I'll approve before you build the rest.
