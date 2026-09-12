import React from 'react';
import { Star, ShieldCheck, MapPin, Calendar, Clock, IndianRupee, Award } from 'lucide-react';
import { WorkHistoryItem } from '../../types';

interface WorkHistoryTimelineProps {
  history: WorkHistoryItem[];
}

export const WorkHistoryTimeline: React.FC<WorkHistoryTimelineProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-8 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm font-bold text-slate-700">No Verified Work History Yet</p>
        <p className="text-xs text-slate-400 mt-1">Completed projects will automatically create permanent, verified experience records here.</p>
      </div>
    );
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-shramik-500 before:via-blue-300 before:to-slate-200">
      {history.map((item, idx) => (
        <div key={item.id || idx} className="relative group">
          {/* Timeline Node Dot */}
          <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-white border-4 border-shramik-600 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform" />

          {/* Experience Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-blue-50 text-shramik-700 border border-blue-200">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.completedDate}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{item.jobTitle}</h4>
              </div>

              {/* Rating Pill */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{item.rating}.0 Verified</span>
              </div>
            </div>

            {/* Location, Duration, and Payment */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{item.durationDays} Days</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-emerald-700">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>₹{item.earnedAmount}</span>
              </div>
            </div>

            {/* Recruiter Feedback Quote */}
            {item.recruiterFeedback && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 italic flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p>"{item.recruiterFeedback}"</p>
                  <span className="not-italic text-[10px] font-bold text-slate-400 block mt-1">
                    — {item.recruiterName}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
