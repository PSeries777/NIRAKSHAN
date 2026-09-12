import React from 'react';
import {
  Users,
  UserCheck,
  Briefcase,
  Award,
  Plus,
  Search,
  Send,
  ArrowUpRight,
  Clock,
  Sparkles,
  Smartphone,
  Star,
  ShieldCheck
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';
import { useLanguage } from '../context/LanguageContext';
import { Worker, Job, SMSMessage } from '../types';
import { WorkerDirectory } from '../components/workers/WorkerDirectory';
import { WorkManagementView } from '../components/jobs/WorkManagementView';
import { WorkHistoryTimeline } from '../components/workers/WorkHistoryTimeline';
import { ProfessionTool3D } from '../components/3d/ProfessionTool3D';

interface RecruiterDashboardProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ currentTab, setCurrentTab }) => {
  const {
    workers,
    jobs,
    workHistory,
    smsLogs,
    activeJob,
    setActiveJob,
    setIsCreateWorkOpen,
    setIsRegisterWorkerOpen,
    setIsBasicPhoneOpen,
    setIsMatchingOpen,
    setIsSendSmsOpen,
    setSelectedWorker,
    setIsWorkerProfileOpen,
  } = useWorkforce();

  const { t } = useLanguage();

  const totalWorkers = workers.length;
  const availableWorkers = workers.filter((w: Worker) => w.availability === 'available').length;
  const activeJobs = jobs.filter((j: Job) => j.status === 'recruiting' || j.status === 'in_progress').length;
  const completedJobs = jobs.filter((j: Job) => j.status === 'completed').length;

  // Render Sub-Views based on Navbar Tab
  if (currentTab === 'workers') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <WorkerDirectory />
      </div>
    );
  }

  if (currentTab === 'work') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <WorkManagementView />
      </div>
    );
  }

  if (currentTab === 'history') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Verified Digital Employment Records
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Tamper-proof history of completed craft projects across all registered informal workers.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-tactile">
          <WorkHistoryTimeline history={workHistory} />
        </div>
      </div>
    );
  }

  // DEFAULT: Dashboard Overview
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Recruiter Greeting & Hackathon Context Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-50/80 via-white to-amber-50/50 rounded-card-lg border border-blue-200/80 shadow-tactile">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-shramik-700">
              Contractor Operations Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
            {t('greeting_recruiter')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t('greeting_sub')} One mobile number connects informal skill with structured opportunity.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsCreateWorkOpen(true)}
            className="tactile-btn-primary text-xs font-extrabold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Work</span>
          </button>
          <button
            onClick={() => setIsBasicPhoneOpen(true)}
            className="tactile-btn-secondary text-xs font-bold flex items-center gap-1.5"
            title="Open Basic Phone simulation"
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Simulated Phone</span>
          </button>
        </div>
      </div>

      {/* 4 Large Rounded Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Workers */}
        <div className="soft-box p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('stat_total_workers')}
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-shramik-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-900 font-display">{totalWorkers}</h3>
            <span className="text-xs font-semibold text-emerald-600 mt-1 block">
              ✓ Verified Skilled Profiles
            </span>
          </div>
        </div>

        {/* Available Now */}
        <div className="soft-box p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('stat_available_now')}
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-emerald-600 font-display">
              {availableWorkers}
            </h3>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">
              Ready for immediate SMS callout
            </span>
          </div>
        </div>

        {/* Active Work */}
        <div className="soft-box p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('stat_active_work')}
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-900 font-display">{activeJobs}</h3>
            <span className="text-xs font-semibold text-amber-600 mt-1 block">
              In recruiting or active progress
            </span>
          </div>
        </div>

        {/* Completed Jobs */}
        <div className="soft-box p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('stat_completed_jobs')}
            </span>
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-900 font-display">{completedJobs}</h3>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">
              Work history & ratings recorded
            </span>
          </div>
        </div>
      </div>

      {/* 4 Tactile Quick Action Cards */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Tactile Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setIsRegisterWorkerOpen(true)}
            className="soft-box soft-box-hover p-5 text-left flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-shramik-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{t('action_register_worker')}</h4>
              <p className="text-[11px] text-slate-500">Phone + Trade onboarding</p>
            </div>
          </button>

          <button
            onClick={() => setIsCreateWorkOpen(true)}
            className="soft-box soft-box-hover p-5 text-left flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{t('action_create_work')}</h4>
              <p className="text-[11px] text-slate-500">5-Step Project Wizard</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('workers')}
            className="soft-box soft-box-hover p-5 text-left flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{t('action_find_worker')}</h4>
              <p className="text-[11px] text-slate-500">Filter skills & proximity</p>
            </div>
          </button>

          <button
            onClick={() => {
              if (activeJob) setIsSendSmsOpen(true);
            }}
            className="soft-box soft-box-hover p-5 text-left flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{t('action_broadcast')}</h4>
              <p className="text-[11px] text-slate-500">GSM SMS to candidate pool</p>
            </div>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Active Project Spotlight + Live Inbound SMS Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Spotlight Project Card (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 font-display">
              Active Project Spotlight
            </h3>
            <button
              onClick={() => setCurrentTab('work')}
              className="text-xs font-bold text-shramik-600 hover:text-shramik-800 flex items-center gap-1"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeJob ? (
            <div className="soft-box p-6 space-y-5 border-2 border-blue-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-shramik-50 text-shramik-700">
                      {activeJob.category} Project
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {activeJob.id}
                    </span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900 mt-1.5 font-display">
                    {activeJob.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">{activeJob.description}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  {activeJob.status.toUpperCase()}
                </span>
              </div>

              {/* Progress and Numbers */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Required</span>
                  <p className="text-sm font-extrabold text-slate-900">
                    {activeJob.workersRequired} Workers
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Interested</span>
                  <p className="text-sm font-extrabold text-emerald-700">
                    {activeJob.interestedWorkerIds.length} Responded
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Daily Pay</span>
                  <p className="text-sm font-extrabold text-slate-900">₹{activeJob.dailyPayment}</p>
                </div>
              </div>

              {/* Quick Matching & SMS Dispatch Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setIsMatchingOpen(true)}
                  className="tactile-btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Scan & Match Workers</span>
                </button>
                <button
                  onClick={() => setIsSendSmsOpen(true)}
                  className="tactile-btn-secondary px-5 py-2.5 text-xs font-bold flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4 text-shramik-600" />
                  <span>Dispatch SMS Callout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="soft-box p-8 text-center text-xs text-slate-500">
              No active project selected.
            </div>
          )}
        </div>

        {/* Live Inbound SMS Feed (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 font-display flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Inbound SMS Responses</span>
            </h3>
            <button
              onClick={() => setIsBasicPhoneOpen(true)}
              className="text-xs font-bold text-shramik-600 hover:text-shramik-800"
            >
              Test Basic Phone
            </button>
          </div>

          <div className="soft-box p-4 divide-y divide-slate-100">
            {smsLogs.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <p>No SMS logs yet.</p>
                <p className="mt-1">
                  Click <strong>"Simulated Phone"</strong> in the top-right to test replying via basic
                  phone SMS!
                </p>
              </div>
            ) : (
              smsLogs.slice(0, 5).map((log: SMSMessage) => (
                <div key={log.id} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      log.direction === 'incoming'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {log.direction === 'incoming' ? '←' : '→'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900 truncate">
                        {log.workerName}
                      </h5>
                      <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                      {log.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
