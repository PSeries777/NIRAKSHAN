# SHRAMIK-QUOTE 🔨

> **Digital Workforce Management and Employment Platform for India's Informal Skilled Workforce**  
> *"Work should find the worker."* • *"One mobile number. One worker identity. More opportunities."*

---

## 📌 Executive Summary

India's informal skilled workforce (plumbers, painters, carpenters, electricians, masons, mechanics, welders, and construction craftspeople) powers billions in daily infrastructure. Yet their professional history has remained informal and invisible.

A skilled craftsperson may not have a smartphone, email, or a corporate digital resume. **With Shramik-Quote, all they need is a mobile number + their skill.** Shramik transforms that into a structured, verifiable digital employment identity, connecting them directly to organized work opportunities through automated SMS dispatch and context-grounded AI assistance.

---

## 🚀 Key Features

1. **Intelligent Recruiter Operations Desk**
   - Live workforce overview: Total Workers, Available Now, Active Work, Completed Jobs.
   - 5-step **Create Work Wizard**: Category, Location, Duration, Worker Quota, Daily Wage (₹/day), and Allowances.
   - Algorithmic candidate matching weighted across trade skills (40%), proximity (20%), verified experience (20%), and past ratings (10%).

2. **Zero-Smartphone SMS Workflow & Basic Keypad Phone Simulator**
   - Full two-way GSM SMS gateway abstraction.
   - Recruiter dispatches opportunity broadcasts in Marathi, Hindi, or English.
   - Built-in **interactive 2G Keypad Phone Simulator**: Worker receives SMS and simply presses `1` (Interested) or `2` (Not Available).
   - Recruiter dashboard updates in real-time upon SMS receipt.

3. **Context-Grounded SHRAMIK AI Assistant**
   - Zero-hallucination workforce assistant inspecting actual project records in the store.
   - Answers queries regarding job duration, reporting time, daily payment, location, and worker status.
   - Web Speech API integration supporting voice queries and voice response audio readout.
   - Multilingual support (Hindi, Marathi, English).

4. **Tamper-Proof Digital Work History & Portfolio Transformation**
   - When a contractor marks work completed, every assigned worker's verified job count increments (e.g. 126 → 127).
   - Verified star ratings and client testimonials are permanently recorded in an experience timeline.

5. **Soft Boxy Design DNA & 3D Workforce Visual System**
   - Inspired by tactile Indian technology aesthetics: 24–32px rounded cards, beveled buttons, calm visual hierarchy.
   - Three.js + React Three Fiber + Drei interactive 3D workforce hero composition and 3D profession tool badges.
   - Full 2D accessible fallback for low-spec devices or when 3D is disabled.

6. **Universal Accessibility & Multilingual Engine**
   - Dynamic font scaling (Normal, Large, Extra Large).
   - High Contrast mode and Reduced Motion modes.
   - Native toggle for English, हिंदी (Hindi), and मराठी (Marathi).
   - Synthesized Web Audio API tactile feedback (clicks, keypad tones, SMS chimes, celebration fanfare).

---

## 🛠 Tech Stack

- **Core:** React 18.3, TypeScript, Vite
- **Styling & Design System:** Tailwind CSS with custom soft-boxy tokens (`box-soft`, `rounded-card`, tactile shadows)
- **3D Graphics:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Icons & Effects:** Lucide React, Canvas Confetti
- **State Management & Persistence:** Reactive React Context with `localStorage` fallback and realistic Indian seed data
- **Audio:** Web Audio API sound synthesis

---

## 🏃 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/PSeries777/NIRAKSHAN.git
cd NIRAKSHAN

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🎯 15-Step Hackathon Demonstration Scenario

Click the **"Demo Tour"** floating button in the navbar or bottom corner to run through the hero demonstration:
1. **Recruiter Creates Work:** 10 Painters in Mapusa, 5 days, ₹800/day.
2. **Matching Engine:** Ranks 27 candidates; top match Ramesh Naik at 96%.
3. **SMS Dispatch:** Recruiter broadcasts SMS to 15 candidates.
4. **Basic Phone:** Keypad phone receives SMS notification.
5. **Worker Replies:** Worker presses `1` (Interested).
6. **Live Dashboard Update:** Recruiter instantly sees "Ramesh Naik — Interested".
7. **Shramik AI Query:** Worker asks *"काम कितने दिन का है?"* — AI responds *"5 दिनों का है और ₹800 प्रति दिन भुगतान है."*
8. **Assignment & Completion:** Recruiter assigns crew, marks job completed, and worker portfolio jumps from 126 to 127 verified jobs with 5-star rating!

---

## 📄 License
MIT License. Built for the Hackathon.
