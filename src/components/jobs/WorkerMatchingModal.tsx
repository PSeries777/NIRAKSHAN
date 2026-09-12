import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, CheckSquare, Square, Star, Send, ShieldCheck } from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';
import { useLanguage } from '../../context/LanguageContext';
import { ProfessionTool3D } from '../3d/ProfessionTool3D';

export const WorkerMatchingModal: React.FC = () => {
  const {
    isMatchingOpen,
    setIsMatchingOpen,
    activeJob,
    findMatchesForJob,
    shortlistWorkersForJob,
    setIsSendSmsOpen,
  } = useWorkforce();

  const { t } = useLanguage();

  const [isScanning, setIsScanning] = useState(true);
  const [selectedWorkerIds, setSelectedWorkerIds] = useState<string[]>([]);

  const matches = activeJob ? findMatchesForJob(activeJob.id) : [];

  useEffect(() => {
    if (isMatchingOpen) {
      setIsScanning(true);
      const timer = setTimeout(() => {
        setIsScanning(false);
        // Pre-select top recommended workers (e.g. up to 15)
        const topIds = matches.slice(0, 15).map(m => m.worker.id);
        setSelectedWorkerIds(topIds);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isMatchingOpen, activeJob?.id]);

  if (!isMatchingOpen) return null;

  const toggleSelect = (workerId: string) => {
    setSelectedWorkerIds(prev =>
      prev.includes(workerId)
        ? prev.filter(id => id !== workerId)
        : [...prev, workerId]
    );
  };

  const handleSelectAllTop = (count: number) => {
    const topIds = matches.slice(0, count).map(m => m.worker.id);
    setSelectedWorkerIds(topIds);
  };

  const handleProceedToSMS = () => {
    if (activeJob) {
      shortlistWorkersForJob(activeJob.id, selectedWorkerIds);
    }
    setIsMatchingOpen(false);
    setIsSendSmsOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-white rounded-modal shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50/70 via-white to-amber-50/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-shramik-600 to-sky-500 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 font-display">
                  {t('matching_title')}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-shramik-100 text-shramik-800">
                  {matches.length} Candidates Scanned
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                For: {activeJob?.title} ({activeJob?.workersRequired} workers needed)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMatchingOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan Status & Matching Factors Banner */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-bold text-slate-700">Matching algorithm weighted on:</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-700">Skill 40%</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-700">Proximity 20%</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-700">Experience 20%</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-700">Rating 10%</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectAllTop(15)}
              className="px-2.5 py-1 rounded-lg bg-blue-100 text-shramik-700 font-bold hover:bg-blue-200 text-xs"
            >
              Select Top 15
            </button>
          </div>
        </div>

        {/* Candidate List */}
        <div className="p-6 flex-1 overflow-y-auto space-y-3">
          {isScanning ? (
            <div className="h-64 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-shramik-200 border-t-shramik-600 rounded-full animate-spin" />
              <p className="text-sm font-bold text-slate-700">Scanning Local Skilled Craftspeople...</p>
              <p className="text-xs text-slate-400">Verifying distance and schedule availability...</p>
            </div>
          ) : (
            matches.map(({ worker, matchScore, breakdown }) => {
              const isSelected = selectedWorkerIds.includes(worker.id);
              return (
                <div
                  key={worker.id}
                  onClick={() => toggleSelect(worker.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-blue-50/50 border-shramik-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Left: Checkbox & Avatar */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-shramik-600 focus:outline-none"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 text-shramik-600" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-300" />
                      )}
                    </button>

                    <ProfessionTool3D skill={worker.primarySkill} size="md" />

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{worker.name}</h4>
                        <span className="text-[10px] font-mono font-semibold text-slate-400">
                          {worker.id}
                        </span>
                        {worker.verified && (
                          <span title="Verified Worker">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {worker.primarySkill} • {worker.experienceYears}y exp • {worker.distanceKm} km ({worker.location})
                      </p>
                    </div>
                  </div>

                  {/* Right: Score Breakdown & Match Pill */}
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{worker.rating}</span>
                      <span className="text-slate-400">({worker.jobsCompleted} jobs)</span>
                    </div>

                    <div className="text-right">
                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold ${
                          matchScore >= 90
                            ? 'bg-emerald-100 text-emerald-800'
                            : matchScore >= 80
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>{matchScore}% {t('match_percentage')}</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        ₹{worker.dailyRate}/day
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-700">
              Selected: <span className="text-shramik-700 text-sm">{selectedWorkerIds.length}</span> candidates
            </p>
            <p className="text-[10px] text-slate-400">
              Target requirement: {activeJob?.workersRequired} workers (Recommended buffer: 1.5x)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMatchingOpen(false)}
              className="tactile-btn-secondary px-4 py-2.5 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleProceedToSMS}
              disabled={selectedWorkerIds.length === 0}
              className="tactile-btn-primary px-6 py-2.5 text-xs font-extrabold flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Continue to SMS Dispatch ({selectedWorkerIds.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
