import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Smartphone, Globe, Sparkles } from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageCode } from '../../types';

export const SendOpportunityModal: React.FC = () => {
  const {
    isSendSmsOpen,
    setIsSendSmsOpen,
    activeJob,
    dispatchJobSMS,
    setIsBasicPhoneOpen,
  } = useWorkforce();

  const { language } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(language);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isSendSmsOpen || !activeJob) return null;

  const recipientsCount = activeJob.shortlistedWorkerIds.length || 15;

  const getSmsPreview = () => {
    if (selectedLang === 'mr') {
      return `SHRAMIK-QUOTE: नवीन कामाची संधी!\n\nकाम: ${activeJob.title}\n📍 ${activeJob.location}\n📅 ${activeJob.startDate}\n⏱ ${activeJob.durationDays} दिवस\n💰 ₹${activeJob.dailyPayment}/दिवस\n\nउत्तर द्या:\n1 — इच्छुक आहे\n2 — नाही\n3 — अधिक माहिती`;
    } else if (selectedLang === 'hi') {
      return `SHRAMIK-QUOTE: नया कार्य अवसर!\n\nकार्य: ${activeJob.title}\n📍 ${activeJob.location}\n📅 ${activeJob.startDate}\n⏱ ${activeJob.durationDays} दिन\n💰 ₹${activeJob.dailyPayment}/दिन\n\nउत्तर दें:\n1 — इच्छुक हूँ\n2 — नहीं\n3 — अधिक विवरण`;
    } else {
      return `SHRAMIK-QUOTE: New Work Opportunity!\n\nWork: ${activeJob.title}\n📍 ${activeJob.location}\n📅 ${activeJob.startDate}\n⏱ ${activeJob.durationDays} Days\n💰 ₹${activeJob.dailyPayment}/day\n\nReply:\n1 — Interested\n2 — Not Interested\n3 — More Details`;
    }
  };

  const handleSend = () => {
    setIsSending(true);

    setTimeout(() => {
      dispatchJobSMS(activeJob.id, activeJob.shortlistedWorkerIds, selectedLang);
      setIsSending(false);
      setIsSent(true);

      setTimeout(() => {
        setIsSendSmsOpen(false);
        setIsSent(false);
        // Pop open the basic phone so the demo immediately shows the incoming message!
        setIsBasicPhoneOpen(true);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-modal shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50/70 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-shramik-600 text-white flex items-center justify-center shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 font-display">
                Dispatch SMS Opportunity
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Broadcast directly to basic phones via GSM SMS Gateway
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSendSmsOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Dispatch Metrics */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Target Recipients</span>
              <p className="text-base font-extrabold text-slate-900">{recipientsCount} Workers</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Carrier Gateway</span>
              <p className="text-base font-bold text-emerald-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Ready (100% Delivery)
              </p>
            </div>
          </div>

          {/* Language Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-shramik-600" />
              <span>SMS Broadcast Language</span>
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
                  onClick={() => setSelectedLang(l.code as LanguageCode)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    selectedLang === l.code
                      ? 'bg-shramik-600 text-white border-shramik-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Simulated Phone Screen Preview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-shramik-600" />
              <span>Basic Phone SMS Preview</span>
            </label>
            <div className="bg-slate-900 rounded-2xl p-4 text-emerald-400 font-mono text-xs shadow-inner border border-slate-800 relative">
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-1.5 mb-2">
                <span>From: SHRAMIK</span>
                <span>Just Now</span>
              </div>
              <p className="whitespace-pre-line leading-relaxed">{getSmsPreview()}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => setIsSendSmsOpen(false)}
            className="tactile-btn-secondary px-4 py-2.5 text-xs font-bold"
          >
            Cancel
          </button>

          {isSent ? (
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-button bg-emerald-600 text-white text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{recipientsCount}/{recipientsCount} Dispatched!</span>
            </div>
          ) : (
            <button
              onClick={handleSend}
              disabled={isSending}
              className="tactile-btn-primary px-7 py-3 text-xs font-extrabold flex items-center gap-2 shadow-md"
            >
              {isSending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Dispatching to {recipientsCount} Workers...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send SMS Broadcast ({recipientsCount})</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
