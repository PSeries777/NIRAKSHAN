import React from 'react';
import { X, CheckCheck, Info, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    notifications,
    markNotificationsAsRead,
  } = useWorkforce();

  if (!isNotificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 font-display">Notifications</h3>
            <p className="text-xs text-slate-500 font-medium">Real-time alerts, SMS replies & project updates</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markNotificationsAsRead}
              className="p-2 rounded-xl text-xs font-semibold text-shramik-600 hover:bg-shramik-50 flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Clear</span>
            </button>
            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700">No Notifications</p>
              <p className="text-xs text-slate-400 mt-1">SMS responses and project alerts will appear here.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-2xl border transition-all ${
                  notif.read
                    ? 'bg-slate-50/70 border-slate-200/60 opacity-80'
                    : 'bg-white border-blue-200 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {notif.type === 'success' && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                    {notif.type === 'info' && (
                      <Info className="w-5 h-5 text-shramik-600" />
                    )}
                    {notif.type === 'warning' && (
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                      <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {notif.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
