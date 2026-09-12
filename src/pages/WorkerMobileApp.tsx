import React, { useState } from 'react';
import {
  Home,
  Briefcase,
  Clock,
  Sparkles,
  User,
  Star,
  ShieldCheck,
  MapPin,
  Calendar,
  Check,
  Send,
  Award,
  Smartphone
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';
import { useLanguage } from '../context/LanguageContext';
import { Job, WorkHistoryItem } from '../types';
import { WorkHistoryTimeline } from '../components/workers/WorkHistoryTimeline';
import { ProfessionTool3D } from '../components/3d/ProfessionTool3D';

export const WorkerMobileApp: React.FC = () => {
  const {
    workers,
    jobs,
    workHistory,
    simulateWorkerResponse,
    setIsShramikAiOpen,
    setIsBasicPhoneOpen,
  } = useWorkforce();

  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'home' | 'jobs' | 'my_work' | 'profile'>('home');

  // Active simulated worker: Ramesh Naik
  const worker = workers[0];
  const workerJobs = jobs.filter((j: Job) => j.status === 'recruiting' || j.status === 'in_progress');
  const myWorkHistory = workHistory.filter((h: WorkHistoryItem) => h.workerId === worker.id);

  const handleExpressInterest = (jobId: string) => {
    simulateWorkerResponse(worker.id, '1', jobId);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col justify-between pb-24 shadow-2xl border-x border-slate-200">
      {/* Top Header Card */}
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-shramik-950 text-white p-6 rounded-b-[36px] shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ProfessionTool3D skill={worker.primarySkill} size="md" />
            <div>
              <p className="text-xs text-slate-300 font-medium">{t('worker_greeting')},</p>
              <h2 className="text-xl font-extrabold font-display">{worker.name}</h2>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {t('worker_status_available')}
          </span>
        </div>

        {/* Worker Identity Strip */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-mono">WORKER ID</span>
            <p className="font-mono font-bold text-white text-sm">{worker.id}</p>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 font-mono">EXPERIENCE</span>
            <p className="font-bold text-white text-sm">{worker.experienceYears} Years</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-mono">JOBS DONE</span>
            <p className="font-bold text-amber-400 text-sm">{worker.jobsCompleted} Completed</p>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 flex-1 space-y-4">
        {/* Tab 1: HOME & RECOMMENDED JOBS */}
        {activeTab === 'home' && (
          <div className="space-y-4 animate-fade-in">
            {/* Zero-Smartphone Notification Banner */}
            <div
              onClick={() => setIsBasicPhoneOpen(true)}
              className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm flex items-center justify-between cursor-pointer active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">Basic Keypad Phone Mode</h4>
                  <p className="text-[11px] text-emerald-800">
                    Works offline via standard SMS without internet.
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                Open
              </span>
            </div>

            {/* Opportunities Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-extrabold text-slate-900 font-display">
                  New Opportunities Near You
                </h3>
                <span className="text-xs text-shramik-700 font-bold">
                  {workerJobs.length} Available
                </span>
              </div>

              <div className="space-y-3">
                {workerJobs.map((job: Job) => {
                  const hasExpressedInterest = job.interestedWorkerIds.includes(worker.id);

                  return (
                    <div
                      key={job.id}
                      className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-shramik-700">
                            {job.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-1">{job.title}</h4>
                        </div>
                        <span className="font-extrabold text-emerald-700 text-sm">
                          ₹{job.dailyPayment}/day
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.durationDays} Days Duration</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        {hasExpressedInterest ? (
                          <div className="flex-1 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                            <Check className="w-4 h-4" />
                            <span>Interest Recorded (SMS Replied)</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleExpressInterest(job.id)}
                            className="tactile-btn-primary flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{t('btn_interested')}</span>
                          </button>
                        )}

                        <button
                          onClick={() => setIsShramikAiOpen(true)}
                          className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200"
                          title="Ask AI about this job"
                        >
                          <Sparkles className="w-4 h-4 text-shramik-600" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: MY WORK HISTORY */}
        {(activeTab === 'my_work' || activeTab === 'jobs') && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 font-display">
                Digital Employment Records
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {myWorkHistory.length} Verified
              </span>
            </div>
            <WorkHistoryTimeline history={myWorkHistory} />
          </div>
        )}

        {/* Tab 3: PROFILE & ID CARD */}
        {activeTab === 'profile' && (
          <div className="space-y-4 animate-fade-in">
            {/* Shramik Digital Worker ID Card */}
            <div className="bg-gradient-to-tr from-navy-900 to-shramik-800 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                  RECOGNIZED INFORMAL CRAFTSPERSON
                </span>
                <ShieldCheck className="w-5 h-5 text-blue-300" />
              </div>

              <div className="mt-4 flex items-center gap-4">
                <ProfessionTool3D skill={worker.primarySkill} size="lg" />
                <div>
                  <h3 className="text-lg font-bold">{worker.name}</h3>
                  <p className="text-xs text-blue-200">{worker.primarySkill}</p>
                  <p className="text-xs font-mono font-bold mt-1 text-amber-300">{worker.id}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-slate-200">
                <span>{worker.location}</span>
                <span className="font-bold">★ {worker.rating} Rating</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Skills & Capabilities
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {worker.additionalSkills.map((s: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rounded Bottom Navigation Bar */}
      <div className="fixed bottom-0 max-w-md w-full bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-6 flex items-center justify-between shadow-lg">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === 'home' ? 'text-shramik-600' : 'text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === 'jobs' ? 'text-shramik-600' : 'text-slate-400'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Jobs</span>
        </button>

        <button
          onClick={() => setIsShramikAiOpen(true)}
          className="relative -top-5 w-12 h-12 rounded-full bg-shramik-600 text-white shadow-xl flex items-center justify-center border-4 border-white active:scale-95 transition-transform"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </button>

        <button
          onClick={() => setActiveTab('my_work')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === 'my_work' ? 'text-shramik-600' : 'text-slate-400'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>My Work</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === 'profile' ? 'text-shramik-600' : 'text-slate-400'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};
