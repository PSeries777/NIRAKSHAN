import React from 'react';
import { Play, SkipForward, RotateCcw, X, CheckCircle2, ArrowRight, Sparkles, Smartphone, Award } from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';

export const HackathonDemoRunner: React.FC = () => {
  const {
    isDemoTourActive,
    setIsDemoTourActive,
    demoStep,
    setDemoStep,
    setIsCreateWorkOpen,
    setIsMatchingOpen,
    setIsSendSmsOpen,
    setIsBasicPhoneOpen,
    setIsShramikAiOpen,
    simulateWorkerResponse,
    assignWorkersToJob,
    completeJob,
    activeJob,
    workers,
    setSelectedWorker,
    setIsWorkerProfileOpen,
  } = useWorkforce();

  if (!isDemoTourActive) return null;

  const demoSteps = [
    {
      step: 1,
      title: 'Step 1: Create Work',
      desc: 'Recruiter needs 10 Painters in Mapusa for 5 days at ₹800/day.',
      actionLabel: 'Open Create Work Wizard',
      action: () => {
        setIsCreateWorkOpen(true);
      },
    },
    {
      step: 2,
      title: 'Step 2: Worker Matching',
      desc: 'System scans database and finds 27 suitable local craftspeople.',
      actionLabel: 'Scan & Match Candidates',
      action: () => {
        setIsCreateWorkOpen(false);
        setIsMatchingOpen(true);
      },
    },
    {
      step: 3,
      title: 'Step 3: Select Candidate Pool',
      desc: 'Top match: Ramesh Naik (96%). Recruiter shortlists 15 painters.',
      actionLabel: 'Proceed to SMS Dispatch',
      action: () => {
        setIsMatchingOpen(false);
        setIsSendSmsOpen(true);
      },
    },
    {
      step: 4,
      title: 'Step 4: Send SMS Broadcast',
      desc: 'Automated SMS broadcast dispatched across GSM carriers.',
      actionLabel: 'Dispatch SMS (15 / 15)',
      action: () => {
        setIsSendSmsOpen(false);
        setIsBasicPhoneOpen(true);
      },
    },
    {
      step: 5,
      title: 'Step 5: Simulated Basic Phone Receives SMS',
      desc: 'Worker receives opportunity on classic keypad mobile phone.',
      actionLabel: "Worker Replies '1' (Interested)",
      action: () => {
        simulateWorkerResponse('SQ-W-1042', '1', activeJob?.id);
      },
    },
    {
      step: 6,
      title: 'Step 6: Dashboard Live Update',
      desc: "Dashboard immediately reflects: Ramesh Naik — Interested via SMS.",
      actionLabel: 'Open Shramik AI Assistant',
      action: () => {
        setIsShramikAiOpen(true);
      },
    },
    {
      step: 7,
      title: 'Step 7: Worker Asks Shramik AI',
      desc: 'Worker asks: "काम कितने दिन का है?" AI answers 5 days from live job data.',
      actionLabel: 'Assign Crew to Project',
      action: () => {
        setIsShramikAiOpen(false);
        if (activeJob) {
          assignWorkersToJob(activeJob.id, ['SQ-W-1042', 'SQ-W-1043', 'SQ-W-1044']);
        }
      },
    },
    {
      step: 8,
      title: 'Step 8: Complete Work & Upgrade Portfolio',
      desc: 'Job is completed. Worker profile upgrades from 126 to 127 verified jobs!',
      actionLabel: 'Mark Completed & Inspect History',
      action: () => {
        if (activeJob) {
          completeJob(activeJob.id);
        }
        const ramesh = workers.find(w => w.id === 'SQ-W-1042');
        if (ramesh) {
          setSelectedWorker(ramesh);
          setIsWorkerProfileOpen(true);
        }
      },
    },
  ];

  const current = demoSteps[demoStep - 1] || demoSteps[0];

  const handleNext = () => {
    current.action();
    if (demoStep < demoSteps.length) {
      setDemoStep(demoStep + 1);
    } else {
      setDemoStep(1);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-modal p-5 shadow-2xl border-2 border-amber-400/80 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 font-display">
            Hackathon Demo Guide
          </h4>
        </div>
        <button
          onClick={() => setIsDemoTourActive(false)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Current Step Description */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-white">{current.title}</span>
          <span className="text-[10px] text-slate-400 font-mono">
            {demoStep} / {demoSteps.length}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{current.desc}</p>
      </div>

      {/* Action Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleNext}
          className="flex-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-extrabold shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <span>{current.actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setDemoStep(1)}
          className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          title="Restart Demo"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
