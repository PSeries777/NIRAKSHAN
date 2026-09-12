import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Globe,
  Star,
  Send,
  PlayCircle
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';
import { useLanguage } from '../context/LanguageContext';
import { HeroWorkforce3D } from '../components/3d/HeroWorkforce3D';
import { ProfessionTool3D } from '../components/3d/ProfessionTool3D';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const {
    setIsBasicPhoneOpen,
    setIsShramikAiOpen,
    setIsDemoTourActive,
  } = useWorkforce();

  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 space-y-20 pb-20">
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-shramik-700 text-xs font-bold tracking-wider uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-shramik-600 animate-pulse" />
                <span>{t('hero_badge')}</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.1]">
                {t('hero_title')}
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-xl">
                {t('hero_subtitle')}
              </p>

              {/* Value Propositions Strip */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('hero_value_1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('hero_value_2')}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onGetStarted}
                  className="tactile-btn-primary px-8 py-4 text-sm font-extrabold flex items-center gap-2 shadow-lg"
                >
                  <span>{t('hero_cta_primary')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="tactile-btn-secondary px-6 py-4 text-sm font-bold"
                >
                  {t('hero_cta_secondary')}
                </button>

                <button
                  onClick={() => setIsDemoTourActive(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-button bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all"
                >
                  <PlayCircle className="w-4 h-4 text-amber-600" />
                  <span>Run Hackathon Demo</span>
                </button>
              </div>
            </div>

            {/* Right: 3D Workforce Composition (6 Cols) */}
            <div className="lg:col-span-6">
              <HeroWorkforce3D />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="soft-box-navy p-8 sm:p-12 rounded-[40px] text-white">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              {t('problem_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
              {t('problem_title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t('problem_desc_1')}
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t('problem_desc_2')}
            </p>
            <p className="text-sm sm:text-base text-blue-200 font-semibold leading-relaxed">
              {t('problem_desc_3')}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS (7 STEPS TIMELINE) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-widest text-shramik-600 uppercase">
            {t('how_badge')}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            {t('how_title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            From project specification to verified worker portfolio upgrade.
          </p>
        </div>

        {/* 7-Step Interactive Flow */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {[
            { num: '01', title: t('step_1'), desc: 'Contractor specifies trade, area, pay & workers needed.' },
            { num: '02', title: t('step_2'), desc: 'Algorithmic scan by distance, rating & trade proficiency.' },
            { num: '03', title: t('step_3'), desc: 'Contractor shortlists 1.5x candidates for high fulfillment.' },
            { num: '04', title: t('step_4'), desc: 'Instant GSM SMS delivered to ordinary keypad mobiles.' },
            { num: '05', title: t('step_5'), desc: "Craftsperson replies '1' (Interested) via free text." },
            { num: '06', title: t('step_6'), desc: 'Live dashboard updates & crew is assigned immediately.' },
            { num: '07', title: t('step_7'), desc: 'Completed jobs increment (126 → 127) with verified rating.' },
          ].map((s, idx) => (
            <div
              key={idx}
              className="soft-box p-4 rounded-2xl flex flex-col justify-between space-y-3 relative group hover:border-shramik-400"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-extrabold font-mono text-shramik-600">{s.num}</span>
                <span className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-shramik-500 transition-colors" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{s.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — WORKER ACCESS (NO SMARTPHONE? NO PROBLEM) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-50/80 via-white to-amber-50/40 p-8 sm:p-12 rounded-[40px] border border-blue-200/80 shadow-tactile">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">
                {t('access_badge')}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                {t('access_title')}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                {t('access_subtitle')}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {[
                  { title: 'Basic Keypad', desc: 'Any 2G/GSM feature phone' },
                  { title: 'Instant SMS', desc: 'No app download required' },
                  { title: 'Local Languages', desc: 'Marathi, Hindi & English' },
                  { title: 'AI Assistant', desc: 'Context-verified facts' },
                ].map((f, i) => (
                  <div key={i} className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-sm">
                    <p className="text-xs font-bold text-slate-900">{f.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{f.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsBasicPhoneOpen(true)}
                  className="tactile-btn-primary text-xs font-bold flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Launch Simulated Phone Demo</span>
                </button>
              </div>
            </div>

            {/* Phone Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => setIsBasicPhoneOpen(true)}
                className="w-full max-w-xs bg-slate-900 p-5 rounded-[36px] shadow-2xl border-4 border-slate-800 text-emerald-400 font-mono text-xs cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2 border-b border-slate-800">
                  <span>SHRAMIK SMS</span>
                  <span>10:42 AM</span>
                </div>
                <div className="py-4 space-y-2">
                  <p className="text-white font-bold">New Work Opportunity:</p>
                  <p>Painting Municipal Building</p>
                  <p>📍 Mapusa, North Goa</p>
                  <p>⏱ 5 Days • 💰 ₹800/day</p>
                  <p className="text-amber-400 font-bold pt-2">
                    Reply: 1 — Interested, 2 — Not Interested
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 text-center">
                  [ Click to Test Reply in Keypad Phone ]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — MULTILINGUAL SYSTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-widest text-shramik-600 uppercase">
            {t('lang_badge')}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            {t('lang_title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t('lang_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { lang: 'हिंदी', region: 'National / North', sample: 'काम को मजदूर तक पहुँचना चाहिए' },
            { lang: 'मराठी', region: 'Maharashtra & Goa', sample: 'कामाचा शोध कामगारापर्यंत पोहोचला पाहिजे' },
            { lang: 'English', region: 'Pan-India', sample: 'Work should find the worker' },
            { lang: 'कोंकणी', region: 'Goa Coastal', sample: 'कामाची सोद कामगाराकडे पावली जाय' },
            { lang: 'ગુજરાતી', region: 'Western Zone', sample: 'કામ કામદાર સુધી પહોંચવું જોઈએ' },
            { lang: 'বাংলা', region: 'Eastern Belt', sample: 'কাজ শ্রমিকের কাছে পৌঁছানো উচিত' },
          ].map((item, idx) => (
            <div key={idx} className="soft-box p-4 rounded-2xl flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-lg font-extrabold text-slate-900 font-display">{item.lang}</h4>
                <p className="text-[10px] text-slate-400 font-semibold">{item.region}</p>
              </div>
              <p className="text-xs text-slate-600 italic">"{item.sample}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — MEET SHRAMIK AI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-[40px] border border-slate-200/90 shadow-tactile">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold tracking-widest text-shramik-600 uppercase">
                {t('ai_badge')}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                {t('ai_title')}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('ai_subtitle')}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Strict AI Safety & Verified Context</span>
                </div>
                <p className="text-slate-500">
                  Unlike generic AI chatbots, Shramik AI reads directly from active database records. It never invents daily rates, locations, or dates.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsShramikAiOpen(true)}
                  className="tactile-btn-primary text-xs font-bold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Test Shramik AI Assistant</span>
                </button>
              </div>
            </div>

            {/* AI Conversation Snippet Cards */}
            <div className="lg:col-span-6 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400">Worker asks (Hindi):</span>
                <p className="font-bold text-slate-800">"{t('ai_sample_q1')}"</p>
                <div className="pt-2 mt-2 border-t border-slate-200 text-shramik-800">
                  <span className="text-[10px] font-bold text-shramik-600 block">Shramik AI:</span>
                  <p>"{t('ai_sample_a1')}"</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400">Worker asks (Payment):</span>
                <p className="font-bold text-slate-800">"{t('ai_sample_q2')}"</p>
                <div className="pt-2 mt-2 border-t border-blue-200 text-emerald-800">
                  <span className="text-[10px] font-bold text-emerald-700 block">Shramik AI:</span>
                  <p>"{t('ai_sample_a2')}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — WORK HISTORY TRANSFORMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="soft-box-navy p-8 sm:p-12 rounded-[40px] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                DIGITAL IDENTITY
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight font-display">
                Every job becomes verified experience.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                When a recruiter marks work completed, the worker's digital record transforms instantly. No paper, no bureaucracy, no lost reputation.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-center">
                  <span className="text-2xl font-extrabold text-slate-400 font-display">126</span>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">Previous</span>
                </div>
                <ArrowRight className="w-5 h-5 text-amber-400" />
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center">
                  <span className="text-2xl font-extrabold text-emerald-400 font-display">127</span>
                  <span className="block text-[10px] text-emerald-300 uppercase font-bold">Upgraded</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Ramesh Naik (SQ-W-1042)</span>
                <span className="text-emerald-400 font-bold">★ 4.7 Verified</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Mapusa Municipal Complex</span>
                  <span className="text-amber-400 font-bold">₹4,000 Earned</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  "Completed 5 days exterior coating on schedule. Zero incidents."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-shramik-700 via-shramik-600 to-navy-900 text-white p-12 sm:p-16 rounded-[48px] shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight max-w-3xl mx-auto">
            Build a workforce that doesn't get left behind.
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            One mobile number. One worker identity. More opportunities. Join Shramik-Quote and bring India's informal skilled craftspeople into the organized economy.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="tactile-btn-saffron px-8 py-4 text-sm font-extrabold flex items-center gap-2 shadow-xl"
            >
              <span>Get Started as Recruiter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsBasicPhoneOpen(true)}
              className="px-6 py-4 rounded-button bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-bold transition-all"
            >
              Test Basic Phone Flow
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
