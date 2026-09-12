import React, { useState } from 'react';
import { Search, Filter, Star, ShieldCheck, MapPin, UserPlus, Phone, Briefcase } from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';
import { WorkerSkill, Worker } from '../../types';
import { ProfessionTool3D } from '../3d/ProfessionTool3D';

export const WorkerDirectory: React.FC = () => {
  const {
    workers,
    setSelectedWorker,
    setIsWorkerProfileOpen,
    setIsRegisterWorkerOpen,
    setIsCreateWorkOpen,
  } = useWorkforce();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('All');
  const [selectedAvailabilityFilter, setSelectedAvailabilityFilter] = useState<string>('All');

  const skills: string[] = [
    'All',
    'Painter',
    'Plumber',
    'Carpenter',
    'Electrician',
    'Mason',
    'Mechanic',
  ];

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.primarySkill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSkill =
      selectedSkillFilter === 'All' || worker.primarySkill === selectedSkillFilter;

    const matchesAvail =
      selectedAvailabilityFilter === 'All' || worker.availability === selectedAvailabilityFilter;

    return matchesSearch && matchesSkill && matchesAvail;
  });

  const availableCount = filteredWorkers.filter(w => w.availability === 'available').length;

  const handleOpenWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    setIsWorkerProfileOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Skilled Workforce Directory
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Showing <strong className="text-slate-800">{filteredWorkers.length}</strong> craftspeople (
            <strong className="text-emerald-700">{availableCount} Available</strong> right now)
          </p>
        </div>

        <button
          onClick={() => setIsRegisterWorkerOpen(true)}
          className="tactile-btn-primary text-xs font-extrabold flex items-center gap-2 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Register New Worker</span>
        </button>
      </div>

      {/* Search & Skill Filter Tabs */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-tactile flex flex-col md:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by worker name, skill, ID (SQ-W-1042), or area..."
            className="tactile-input pl-11 py-2.5 text-xs"
          />
        </div>

        {/* Skill Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkillFilter(skill)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSkillFilter === skill
                  ? 'bg-shramik-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Workers Grid */}
      {filteredWorkers.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-base font-bold text-slate-800">No Workers Match Filters</p>
          <p className="text-xs text-slate-500 mt-1">Try broadening your search query or reset skill filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSkillFilter('All');
              setSelectedAvailabilityFilter('All');
            }}
            className="mt-4 tactile-btn-secondary text-xs font-bold px-4 py-2"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="soft-box soft-box-hover p-5 flex flex-col justify-between cursor-pointer"
              onClick={() => handleOpenWorker(worker)}
            >
              <div>
                {/* Card Header: 3D Profession Badge, ID, Availability */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <ProfessionTool3D skill={worker.primarySkill} size="md" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-shramik-600">
                          {worker.name}
                        </h4>
                        {worker.verified && (
                          <span title="Verified Worker">
                            <ShieldCheck className="w-4 h-4 text-blue-600" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-slate-400">
                        {worker.id}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      worker.availability === 'available'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        worker.availability === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    {worker.availability === 'available' ? 'Available' : 'Busy'}
                  </span>
                </div>

                {/* Skill & Experience */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">
                    {worker.primarySkill} • {worker.experienceYears}y exp
                  </span>
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{worker.rating}</span>
                  </div>
                </div>

                {/* Additional Skills Tags */}
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {worker.additionalSkills.slice(0, 3).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
                    >
                      {s}
                    </span>
                  ))}
                  {worker.additionalSkills.length > 3 && (
                    <span className="text-[10px] text-slate-400 font-medium">
                      +{worker.additionalSkills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Location & Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-[130px]">{worker.location}</span>
                </div>

                <span className="font-extrabold text-emerald-700">
                  ₹{worker.dailyRate}/day
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
