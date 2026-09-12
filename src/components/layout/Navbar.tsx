import React from 'react';
import {
  Bell,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  PlayCircle,
  Briefcase,
  UserCheck,
  Globe
} from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageCode } from '../../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onGoHome }) => {
  const {
    unreadNotificationCount,
    setIsNotificationDrawerOpen,
    setIsAccessibilityModalOpen,
    setIsBasicPhoneOpen,
    isBasicPhoneOpen,
    setIsShramikAiOpen,
    currentRole,
    setCurrentRole,
    setIsDemoTourActive,
    isDemoTourActive,
  } = useWorkforce();

  const { language, setLanguage, t } = useLanguage();

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिं' },
    { code: 'mr', label: 'मराठी' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={onGoHome}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            {/* Logo Emblem */}
            <div className="relative w-11 h-11 rounded-[16px] bg-gradient-to-br from-shramik-600 to-navy-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Stylized Hardhat / Arch */}
                <path d="M4 14C4 9.58172 7.58172 6 12 6C16.4183 6 20 14 20 14" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                {/* Base foundation line */}
                <path d="M3 15H21" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                {/* Saffron Opportunity Spark */}
                <circle cx="12" cy="10" r="2.2" fill="#F59E0B" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight font-display">
                  SHRAMIK
                </span>
                <span className="px-2 py-0.5 rounded-lg text-xs font-bold text-shramik-700 bg-shramik-50 border border-shramik-200">
                  QUOTE
                </span>
              </div>
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                {t('brand_tagline')}
              </p>
            </div>
          </div>

          {/* Recruiter Navigation Links (Desktop) */}
          {currentRole === 'recruiter' && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-button border border-slate-200/80">
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'dashboard'
                    ? 'bg-white text-shramik-700 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {t('nav_dashboard')}
              </button>
              <button
                onClick={() => setCurrentTab('workers')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'workers'
                    ? 'bg-white text-shramik-700 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {t('nav_workers')}
              </button>
              <button
                onClick={() => setCurrentTab('work')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'work'
                    ? 'bg-white text-shramik-700 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {t('nav_work')}
              </button>
              <button
                onClick={() => setCurrentTab('history')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'history'
                    ? 'bg-white text-shramik-700 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {t('nav_history')}
              </button>
            </nav>
          )}

          {/* Right Action Suite */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hackathon Demo Tour Runner Button */}
            <button
              onClick={() => setIsDemoTourActive(!isDemoTourActive)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border border-amber-200 text-xs font-bold shadow-sm hover:bg-amber-100 transition-all active:scale-95"
              title="Run 15-Step Hackathon Demo"
            >
              <PlayCircle className="w-4 h-4 text-amber-600" />
              <span>Demo Tour</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={() => setIsShramikAiOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-shramik-50 text-shramik-700 border border-shramik-200 hover:bg-shramik-100 text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-shramik-600 animate-pulse" />
              <span className="hidden sm:inline">Shramik AI</span>
            </button>

            {/* Simulated Basic Phone Toggle */}
            <button
              onClick={() => setIsBasicPhoneOpen(!isBasicPhoneOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                isBasicPhoneOpen
                  ? 'bg-slate-900 text-white border-slate-800 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="Open simulated keypad phone"
            >
              <Smartphone className="w-4 h-4 text-emerald-500" />
              <span className="hidden sm:inline">Basic Phone</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </button>

            {/* Role Switcher (Recruiter vs Worker Mobile) */}
            <button
              onClick={() => setCurrentRole(currentRole === 'recruiter' ? 'worker' : 'recruiter')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all active:scale-95"
            >
              {currentRole === 'recruiter' ? (
                <>
                  <Briefcase className="w-4 h-4 text-shramik-600" />
                  <span className="hidden sm:inline">{t('nav_recruiter_view')}</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">{t('nav_mobile_demo')}</span>
                </>
              )}
            </button>

            {/* Language Switcher Dropdown */}
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 hidden sm:inline" />
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                    language === l.code
                      ? 'bg-white text-shramik-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Accessibility Settings */}
            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all active:scale-95"
              aria-label="Accessibility Settings"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
