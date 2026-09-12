import React, { useState } from 'react';
import { X, UserPlus, Check, Sparkles, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';
import { useLanguage } from '../../context/LanguageContext';
import { WorkerSkill, LanguageCode } from '../../types';

export const WorkerRegisterModal: React.FC = () => {
  const {
    isRegisterWorkerOpen,
    setIsRegisterWorkerOpen,
    registerWorker,
    setSelectedWorker,
    setIsWorkerProfileOpen,
  } = useWorkforce();

  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [primarySkill, setPrimarySkill] = useState<WorkerSkill>('Painter');
  const [additionalSkillsStr, setAdditionalSkillsStr] = useState('Exterior Coating, Roller Prep');
  const [experienceYears, setExperienceYears] = useState(5);
  const [location, setLocation] = useState('Mapusa, Goa');
  const [preferredLanguage, setPreferredLanguage] = useState<LanguageCode>('mr');
  const [dailyRate, setDailyRate] = useState(800);
  const [bio, setBio] = useState('Skilled craftsperson with proven track record in residential and commercial sites.');

  if (!isRegisterWorkerOpen) return null;

  const skillsList: WorkerSkill[] = [
    'Painter',
    'Plumber',
    'Carpenter',
    'Electrician',
    'Mason',
    'Mechanic',
    'Welder',
    'Construction',
    'Cleaner',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newWorker = registerWorker({
      name,
      phone,
      primarySkill,
      additionalSkills: additionalSkillsStr.split(',').map(s => s.trim()),
      experienceYears,
      location,
      preferredLanguage,
      dailyRate,
      bio,
    });

    setIsRegisterWorkerOpen(false);
    setSelectedWorker(newWorker);
    setIsWorkerProfileOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-white rounded-modal shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50/70 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-shramik-600 text-white flex items-center justify-center shadow-md">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 font-display">
                Register New Worker
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                One mobile number + skill = Structured digital employment identity
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsRegisterWorkerOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Naik"
                className="tactile-input"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Mobile Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98201 XXXXX"
                  className="tactile-input pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Primary Trade / Skill
            </label>
            <div className="grid grid-cols-3 gap-2">
              {skillsList.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPrimarySkill(s)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                    primarySkill === s
                      ? 'bg-shramik-600 text-white border-shramik-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Experience (Years)
              </label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(parseInt(e.target.value, 10) || 1)}
                className="tactile-input"
                min={0}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Daily Rate (₹)
              </label>
              <input
                type="number"
                value={dailyRate}
                onChange={(e) => setDailyRate(parseInt(e.target.value, 10) || 500)}
                className="tactile-input"
                step={50}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Area / Town
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="tactile-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Preferred SMS Language
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { code: 'mr', label: 'मराठी' },
                { code: 'hi', label: 'हिंदी' },
                { code: 'en', label: 'English' },
              ].map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setPreferredLanguage(l.code as LanguageCode)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    preferredLanguage === l.code
                      ? 'bg-shramik-600 text-white border-shramik-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Additional Skills & Specializations
            </label>
            <input
              type="text"
              value={additionalSkillsStr}
              onChange={(e) => setAdditionalSkillsStr(e.target.value)}
              placeholder="e.g. Pipe Repair, Waterproofing, Tile Fitting"
              className="tactile-input"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-shramik-800 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-shramik-600 shrink-0" />
            <span>
              Upon registration, a unique Shramik Worker ID (e.g., <strong>SQ-W-1054</strong>) will be generated and an automated welcome SMS will be dispatched to their phone.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsRegisterWorkerOpen(false)}
              className="tactile-btn-secondary px-5 py-2.5 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="tactile-btn-primary px-7 py-2.5 text-xs font-extrabold flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Register</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
