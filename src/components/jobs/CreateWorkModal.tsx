import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, MapPin, Calendar, Users, IndianRupee } from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';
import { useLanguage } from '../../context/LanguageContext';
import { WorkerSkill, LanguageCode } from '../../types';

export const CreateWorkModal: React.FC = () => {
  const {
    isCreateWorkOpen,
    setIsCreateWorkOpen,
    createJob,
    setIsMatchingOpen,
  } = useWorkforce();

  const { t } = useLanguage();

  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('Government Complex Exterior Painting');
  const [category, setCategory] = useState<WorkerSkill>('Painter');
  const [description, setDescription] = useState(
    'Exterior weather-coat painting and surface primer prep for 3-storey municipal building in Mapusa. Requires skilled painters with scaffold comfort.'
  );
  const [location, setLocation] = useState('Mapusa, North Goa');
  const [startDate, setStartDate] = useState('18 September 2026');
  const [durationDays, setDurationDays] = useState(5);
  const [reportingTime, setReportingTime] = useState('08:00 AM');
  const [workersRequired, setWorkersRequired] = useState(10);
  const [experienceRequired, setExperienceRequired] = useState(3);
  const [preferredLanguage, setPreferredLanguage] = useState<LanguageCode>('mr');
  const [dailyPayment, setDailyPayment] = useState(800);
  const [paymentNotes, setPaymentNotes] = useState('Direct cash/UPI upon completion of Day 5. Tea allowance provided.');

  if (!isCreateWorkOpen) return null;

  const categories: WorkerSkill[] = [
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

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCreate = () => {
    createJob({
      title,
      category,
      description,
      location,
      startDate,
      durationDays,
      reportingTime,
      workersRequired,
      skills: [category, 'Surface Prep', 'Site Safety'],
      experienceRequired,
      preferredLanguage,
      dailyPayment,
      paymentNotes,
    });

    setIsCreateWorkOpen(false);
    setStep(1);
    // Automatically transition to Worker Matching
    setIsMatchingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-modal shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50/60 to-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-shramik-600 uppercase tracking-wider">
              Step {step} of 5
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 font-display">
              {step === 1 && t('step_details')}
              {step === 2 && t('step_location')}
              {step === 3 && t('step_requirements')}
              {step === 4 && t('step_payment')}
              {step === 5 && t('step_review')}
            </h3>
          </div>
          <button
            onClick={() => setIsCreateWorkOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 flex">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 transition-all duration-300 ${
                s <= step ? 'bg-shramik-600' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Form Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {/* STEP 1: Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('field_work_title')}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="tactile-input"
                  placeholder="e.g. Government Complex Exterior Painting"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('field_category')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                        category === c
                          ? 'bg-shramik-600 text-white border-shramik-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('field_description')}
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="tactile-input"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Location & Timing */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('field_location')}
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="tactile-input pl-11"
                    placeholder="e.g. Mapusa, North Goa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t('field_start_date')}
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="tactile-input pl-11"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t('field_duration')}
                  </label>
                  <input
                    type="number"
                    value={durationDays}
                    onChange={(e) => setDurationDays(parseInt(e.target.value, 10) || 1)}
                    className="tactile-input"
                    min={1}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('field_reporting_time')}
                </label>
                <input
                  type="text"
                  value={reportingTime}
                  onChange={(e) => setReportingTime(e.target.value)}
                  className="tactile-input"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Worker Requirements */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t('field_workers_needed')}
                  </label>
                  <div className="relative">
                    <Users className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="number"
                      value={workersRequired}
                      onChange={(e) => setWorkersRequired(parseInt(e.target.value, 10) || 1)}
                      className="tactile-input pl-11 font-bold text-lg text-shramik-700"
                      min={1}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Min Experience (Years)
                  </label>
                  <input
                    type="number"
                    value={experienceRequired}
                    onChange={(e) => setExperienceRequired(parseInt(e.target.value, 10) || 0)}
                    className="tactile-input"
                    min={0}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Preferred Worker Language
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { code: 'mr', label: 'मराठी (Marathi)' },
                    { code: 'hi', label: 'हिंदी (Hindi)' },
                    { code: 'en', label: 'English' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setPreferredLanguage(l.code as LanguageCode)}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
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
            </div>
          )}

          {/* STEP 4: Payment Terms */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('field_daily_pay')}
                </label>
                <div className="relative">
                  <IndianRupee className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="number"
                    value={dailyPayment}
                    onChange={(e) => setDailyPayment(parseInt(e.target.value, 10) || 0)}
                    className="tactile-input pl-11 font-extrabold text-xl text-emerald-700"
                    step={50}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Estimated Total per Worker ({durationDays} days):{' '}
                  <strong className="text-slate-800">₹{dailyPayment * durationDays}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Payment Schedule & Site Allowances
                </label>
                <textarea
                  rows={3}
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  className="tactile-input"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Review */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-slate-50 border border-blue-200">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-shramik-100 text-shramik-800">
                  {category} Project
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-2">{title}</h4>
                <p className="text-xs text-slate-600 mt-1">{description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-blue-200/80">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Location</span>
                    <p className="text-xs font-bold text-slate-800">{location}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Duration</span>
                    <p className="text-xs font-bold text-slate-800">{durationDays} Days</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Crew Size</span>
                    <p className="text-xs font-bold text-slate-800">{workersRequired} Workers</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Daily Wage</span>
                    <p className="text-xs font-bold text-emerald-700">₹{dailyPayment}/day</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  After creating this project, our intelligent matching algorithm will instantly scan
                  and rank suitable local craftspeople.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="tactile-btn-secondary px-5 py-2.5 text-xs font-bold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="tactile-btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-1.5"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="tactile-btn-saffron px-7 py-3 text-xs font-extrabold flex items-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Launch & Find Workers</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
