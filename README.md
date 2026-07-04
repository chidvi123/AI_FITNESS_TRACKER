# PulseAI Fitness Coach 🏋️‍♂️✨

[![Language - HTML5](https://img.shields.io/badge/Language-HTML5-orange?style=for-the-badge&logo=html5)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![Style - CSS3](https://img.shields.io/badge/Style-CSS3-blue?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Logic - JavaScript](https://img.shields.io/badge/Logic-Vanilla--JS-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Design - Glassmorphism](https://img.shields.io/badge/Design-Glassmorphism-purple?style=for-the-badge)](https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb135e39)

> **InAmigos Foundation - Internship Portfolio (Task 3: AI Website Generation)**
> 
> A visual-heavy, responsive single-page web portal showcasing **PulseAI Fitness**, a futuristic personal training platform that utilizes smart biometric log syncing and camera computer vision to adapt workouts and nutritional macros in real time.

---

## 📸 Preview Mockup

| Desktop View | Mobile View |
| :--- | :--- |
| ![Desktop Layout](https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80) | ![Mobile Layout](https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=200&q=80) |

*(Note: Open `index.html` locally in your browser to view the live responsive scaling and animated vector waves)*

---

## 🌟 Key Features

*   **⚡ Real-Time Calorie & Macro Planner**: An interactive calculator dashboard. Users toggle target fitness goals (Fat Loss, Muscle Gain, Endurance), experience levels, and available equipment to observe immediate recalculations of daily calories and macro splits.
*   **📊 Counting Metric Stats**: Statistics counters that animate numbers from `0` up to their target values once they enter the viewport.
*   **🩺 Interactive Posture Pillar**: Spotlights biometric tracking (smartwatch sync, camera squat form auditing, and macros).
*   **🌊 SVG Heartbeat Waveform**: A neon lime-green pulse line that animates continuously across the hero panel.
*   **📬 Athlete Uplink Form**: A contact onboarding form equipped with inputs validation, button loading states, and a slide-in alert toast.

---

## 🛠️ Tech Stack & Architecture

*   **Markup**: Semantic HTML5 elements (`<nav>`, `<section>`, `<form>`) for layout and SEO.
*   **Styling**: Vanilla CSS3 featuring:
    *   Dynamic HSL custom variables (`--bg-darker`, `--lime`, `--cyan`).
    *   Glassmorphic panels using frosted filters and transparent borders.
    *   Keyframe rotations and line path offset animations.
*   **Logic**: Vanilla JavaScript utilizing:
    *   `IntersectionObserver` API to trigger entry scroll transitions.
    *   Timing functions (`setInterval`) for statistical animations.
    *   Decision matrices mapping goal states to calorie/protein/carb counts.

---

## 🚀 Getting Started & Local Run

No build step, framework, or local database configuration is required. To launch:

### 1. Direct Open
Double-click the `index.html` file in your file explorer to launch it in any modern browser (Chrome, Edge, Firefox, Safari).

### 2. Run via Python Local Server
If you have Python installed and want to run it via `localhost`:
```bash
# Navigate to project folder and start HTTP server
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 📋 Task Submission Checklist

If you are using this repository to submit **Task 3** for your **InAmigos Foundation** evaluation:

1.  **Capture Viewports**: Open the webpage in your browser, press `F12` for developer options, select mobile width, and take screenshots of both Desktop and Mobile views.
2.  **Upload to Drive**: Bundle `index.html`, `styles.css`, and `app.js` and upload them to your designated Google Drive folder.
3.  **Share Proof**: Post your screenshots on LinkedIn tagging **InAmigos Foundation** as proof.
