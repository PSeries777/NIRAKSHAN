import React, { useState } from 'react';
import { X, Star, ShieldCheck, MapPin, Phone, Briefcase, Award, Clock, CheckCircle2, MessageSquare, Smartphone } from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';
import { WorkHistoryTimeline } from './WorkHistoryTimeline';
import { ProfessionTool3D } from '../3d/ProfessionTool3D';

export const WorkerProfileModal: React.FC = () => {
  const {
    isWorkerProfileOpen,
    setIsWorkerProfileOpen,
    selectedWorker,
    workHistory,
    activeJob,
    assignWorkersToJob,
    setIsBasicPhoneOpen,
  } = useWorkforce();

  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');

  if (!isWorkerProfileOpen || !selectedWorker) return null;

  const workerHistory = workHistory.filter(h => h.workerId === selectedWorker.id);

  const handleQuickAssign = () => {
    if (activeJob) {
      assignWorkersToJob(activeJob.id, [selectedWorker.id]);
      setIsWorkerProfileOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-modal shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Hero Banner */}
        <div className="p-6 bg-gradient-to-r from-navy-900 to-shramik-950 text-white relative">
          <button
            onClick={() => setIsWorkerProfileOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <ProfessionTool3D skill={selectedWorker.primarySkill} size="lg" />

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold font-display">{selectedWorker.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/10 text-blue-200 border border-white/20">
                  {selectedWorker.id}
                </span>
                {selectedWorker.verified && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    Verified
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-300 mt-1">
                {selectedWorker.primarySkill} • {selectedWorker.experienceYears} Years Professional Experience
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {selectedWorker.availability === 'available' ? 'Available for Work' : 'On Project'}
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-amber-300 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {selectedWorker.rating} Rating
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 font-semibold">
                  <Award className="w-3.5 h-3.5 text-blue-400" />
                  {selectedWorker.jobsCompleted} Jobs Completed
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-shramik-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Craftsman Profile
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-shramik-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>Digital Work History</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-slate-900 font-bold">
                {workerHistory.length}
              </span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-5">
          {activeTab === 'overview' ? (
            <>
              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  About & Background
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {selectedWorker.bio}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Verified Skills & Capabilities
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-shramik-600 text-white shadow-sm">
                    {selectedWorker.primarySkill} (Primary)
                  </span>
                  {selectedWorker.additionalSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Mobile Phone</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedWorker.phone}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Daily Wage</span>
                  <p className="text-xs font-bold text-emerald-700 mt-0.5">₹{selectedWorker.dailyRate}/day</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Home Base</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedWorker.location}</p>
                </div>
              </div>

              {/* Service Areas & Certifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Operational Service Areas
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedWorker.serviceAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      📍 {area}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Verified Experience Timeline</h4>
                  <p className="text-xs text-slate-500">
                    Tamper-proof employment milestones automatically logged after project sign-off.
                  </p>
                </div>
              </div>
              <WorkHistoryTimeline history={workerHistory} />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => setIsBasicPhoneOpen(true)}
            className="tactile-btn-secondary px-4 py-2.5 text-xs font-bold flex items-center gap-1.5"
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Open in Basic Phone</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWorkerProfileOpen(false)}
              className="tactile-btn-secondary px-4 py-2.5 text-xs font-bold"
            >
              Close
            </button>
            <button
              onClick={handleQuickAssign}
              className="tactile-btn-primary px-6 py-2.5 text-xs font-extrabold flex items-center gap-1.5 shadow-md"
            >
              <Briefcase className="w-4 h-4" />
              <span>Assign to Active Project</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
