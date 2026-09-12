import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  Plus,
  UserCheck,
  Award,
  AlertCircle
} from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';
import { Job, JobStatus } from '../../types';

export const WorkManagementView: React.FC = () => {
  const {
    jobs,
    workers,
    activeJob,
    setActiveJob,
    setIsCreateWorkOpen,
    setIsMatchingOpen,
    setIsSendSmsOpen,
    assignWorkersToJob,
    completeJob,
    setSelectedWorker,
    setIsWorkerProfileOpen,
  } = useWorkforce();

  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredJobs = jobs.filter((j) => {
    if (statusFilter === 'all') return true;
    return j.status === statusFilter;
  });

  const currentJob = activeJob || jobs[0];

  const handleSelectJob = (job: Job) => {
    setActiveJob(job);
  };

  // Find interested workers for current active job
  const interestedWorkers = workers.filter((w) =>
    currentJob?.interestedWorkerIds.includes(w.id)
  );

  const assignedWorkers = workers.filter((w) =>
    currentJob?.assignedWorkerIds.includes(w.id)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Work Projects & Assignments
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage project fulfillment, review incoming SMS responses, and deploy crew.
          </p>
        </div>

        <button
          onClick={() => setIsCreateWorkOpen(true)}
          className="tactile-btn-primary text-xs font-extrabold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Work</span>
        </button>
      </div>

      {/* Main Grid: Projects List + Selected Project Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Projects Overview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-x-auto">
            {['all', 'recruiting', 'in_progress', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all ${
                  statusFilter === tab
                    ? 'bg-shramik-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Jobs Cards */}
          <div className="space-y-3">
            {filteredJobs.map((job) => {
              const isSelected = currentJob?.id === job.id;
              const interestedCount = job.interestedWorkerIds.length;
              const assignedCount = job.assignedWorkerIds.length;
              const isComplete = job.status === 'completed';

              return (
                <div
                  key={job.id}
                  onClick={() => handleSelectJob(job)}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-shramik-600 shadow-md ring-2 ring-shramik-600/10'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {job.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-shramik-700">
                          {job.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{job.title}</h4>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        job.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : job.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {job.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                    <span className="font-bold text-emerald-700">₹{job.dailyPayment}/day</span>
                  </div>

                  {/* Progress Bar for Crew Fulfillment */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                      <span>Crew Fulfillment</span>
                      <span>
                        {assignedCount} / {job.workersRequired} Assigned
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                      <div
                        className="bg-shramik-600 h-full transition-all duration-300"
                        style={{
                          width: `${Math.min((assignedCount / job.workersRequired) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                      <span>SMS Broadcast: {job.notifiedWorkerIds.length} Sent</span>
                      <span className="text-emerald-700 font-bold">
                        {interestedCount} Interested
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Job Workspace & Crew Assignment (7 cols) */}
        <div className="lg:col-span-7">
          {currentJob ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-tactile p-6 space-y-6">
              {/* Project Header Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border border-blue-200/80">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl text-xs font-bold bg-shramik-600 text-white">
                      {currentJob.category} Project
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {currentJob.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentJob.status !== 'completed' ? (
                      <button
                        onClick={() => completeJob(currentJob.id)}
                        className="tactile-btn-saffron px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Mark Project Completed</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Project Completed & Verified
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mt-2 font-display">
                  {currentJob.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {currentJob.description}
                </p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-blue-200/70 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Location</span>
                    <p className="font-bold text-slate-800">{currentJob.location}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Start Date</span>
                    <p className="font-bold text-slate-800">{currentJob.startDate}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Duration</span>
                    <p className="font-bold text-slate-800">{currentJob.durationDays} Days</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Daily Pay</span>
                    <p className="font-bold text-emerald-700">₹{currentJob.dailyPayment}/day</p>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsMatchingOpen(true)}
                  className="tactile-btn-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Scan & Match Workers</span>
                </button>

                <button
                  onClick={() => setIsSendSmsOpen(true)}
                  className="tactile-btn-secondary px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4 text-shramik-600" />
                  <span>Send Opportunity SMS</span>
                </button>
              </div>

              {/* Section 1: Inbound Worker SMS Responses */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>Workers Interested via SMS ({interestedWorkers.length})</span>
                  </h4>
                  <span className="text-xs text-slate-500">
                    Received from basic phone text replies
                  </span>
                </div>

                {interestedWorkers.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                    <p>No worker responses recorded yet.</p>
                    <p className="mt-1">
                      Click <strong>"Send Opportunity SMS"</strong> and reply with <strong>1</strong> from the basic phone.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {interestedWorkers.map((worker) => (
                      <div
                        key={worker.id}
                        className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs font-bold text-slate-900">{worker.name}</h5>
                            <span className="text-[10px] font-mono font-semibold text-slate-500">
                              {worker.phone}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-900">
                              Replied 1: Interested
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {worker.primarySkill} • {worker.experienceYears}y exp • ★ {worker.rating}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedWorker(worker);
                              setIsWorkerProfileOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-semibold"
                          >
                            Profile
                          </button>
                          <button
                            onClick={() => assignWorkersToJob(currentJob.id, [worker.id])}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                          >
                            Assign
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 2: Assigned Active Crew */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-shramik-600" />
                    <span>Assigned Working Crew ({assignedWorkers.length} / {currentJob.workersRequired})</span>
                  </h4>
                </div>

                {assignedWorkers.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                    No craftspeople assigned yet. Assign candidates from the interested pool above.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {assignedWorkers.map((worker) => (
                      <div
                        key={worker.id}
                        className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900">{worker.name}</p>
                          <p className="text-[10px] text-slate-500">
                            {worker.primarySkill} • {worker.phone}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                          Confirmed
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <p>No Project Selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
