import React, { useState } from 'react';
import { X, Wifi, Battery, Send, RefreshCw, Smartphone } from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';
import { playKeypadBeep } from '../../utils/audioFeedback';

export const BasicPhoneSimulator: React.FC = () => {
  const {
    isBasicPhoneOpen,
    setIsBasicPhoneOpen,
    activeJob,
    workers,
    smsLogs,
    simulateWorkerResponse,
    accessibility,
  } = useWorkforce();

  const [inputVal, setInputVal] = useState('');
  const [selectedWorkerId, setSelectedWorkerId] = useState('SQ-W-1042'); // Default Ramesh Naik

  if (!isBasicPhoneOpen) return null;

  const currentWorker = workers.find(w => w.id === selectedWorkerId) || workers[0];

  // Get messages for this worker
  const workerSms = smsLogs
    .filter(s => s.workerId === selectedWorkerId || s.workerPhone === currentWorker.phone)
    .slice(0, 4);

  const handleKeyPress = (num: string) => {
    playKeypadBeep(500 + parseInt(num, 10) * 80, accessibility.soundEnabled);
    setInputVal(prev => prev + num);
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const choice = inputVal.trim() === '1' ? '1' : inputVal.trim() === '2' ? '2' : '3';
    simulateWorkerResponse(selectedWorkerId, choice, activeJob?.id);
    setInputVal('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-slide-up">
      {/* Phone Casing */}
      <div className="w-[310px] bg-gradient-to-b from-slate-800 to-slate-950 p-4 rounded-[40px] shadow-2xl border-4 border-slate-700/80 text-white flex flex-col items-center">
        {/* Top Speaker Ear-piece */}
        <div className="w-16 h-1.5 bg-slate-700 rounded-full mb-3 shadow-inner" />

        {/* Worker Selector Bar */}
        <div className="w-full flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <select
              value={selectedWorkerId}
              onChange={(e) => setSelectedWorkerId(e.target.value)}
              aria-label="Select worker simulation profile"
              className="text-[11px] font-bold bg-slate-900 text-slate-200 border border-slate-700 rounded-lg px-2 py-1 focus:outline-none"
            >
              {workers.slice(0, 6).map(w => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.primarySkill})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsBasicPhoneOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Screen Bezel & LCD Display */}
        <div className="w-full h-[220px] bg-[#91B88B] border-4 border-[#6C9467] rounded-2xl p-2.5 flex flex-col justify-between text-slate-900 font-mono shadow-inner select-none overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between border-b border-[#7B9F75] pb-1 text-[10px] font-bold">
            <div className="flex items-center gap-1">
              <Wifi className="w-3 h-3 text-slate-800" />
              <span>SHRAMIK-2G</span>
            </div>
            <div className="flex items-center gap-1">
              <span>98%</span>
              <Battery className="w-3.5 h-3.5 text-slate-800" />
            </div>
          </div>

          {/* SMS Message Area */}
          <div className="flex-1 py-1.5 overflow-y-auto space-y-1.5 text-[10.5px] leading-tight">
            {workerSms.length === 0 ? (
              <div className="h-full flex flex-col justify-center text-center px-2">
                <p className="font-bold text-[11px] text-slate-800">1 NEW MESSAGE</p>
                <div className="bg-[#A4C99E] p-2 rounded mt-1 text-[9.5px] text-left border border-[#7B9F75]">
                  <p className="font-bold">SHRAMIK-QUOTE:</p>
                  <p>Painting Job in Mapusa.</p>
                  <p>5 Days • ₹800/day</p>
                  <p className="mt-1 font-bold">Reply: 1-Yes, 2-No</p>
                </div>
              </div>
            ) : (
              workerSms.map((sms, i) => (
                <div
                  key={i}
                  className={`p-1.5 rounded text-[9.5px] ${
                    sms.direction === 'incoming'
                      ? 'bg-[#7E9F79] text-right font-bold'
                      : 'bg-[#A4C99E] text-left border border-[#7B9F75]'
                  }`}
                >
                  <span className="text-[8px] opacity-75 block">
                    {sms.direction === 'incoming' ? 'You replied' : 'SHRAMIK-QUOTE'}
                  </span>
                  <p className="whitespace-pre-line">{sms.content}</p>
                </div>
              ))
            )}
          </div>

          {/* Current Keypad Input Bar */}
          <div className="border-t border-[#7B9F75] pt-1 flex items-center justify-between text-[11px] font-bold">
            <span className="truncate">
              {inputVal ? `Reply: [ ${inputVal} ]` : 'Press 1 to Accept'}
            </span>
            {inputVal && (
              <button
                onClick={handleSend}
                className="bg-slate-900 text-[#91B88B] px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
              >
                Send
              </button>
            )}
          </div>
        </div>

        {/* Action / Navigation Buttons */}
        <div className="w-full flex items-center justify-between px-3 mt-3">
          <button
            onClick={() => handleKeyPress('1')}
            className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold shadow active:scale-95 transition-all flex items-center gap-1"
          >
            <span>[ 1 ] Accept</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-slate-300 text-[10px] font-bold shadow-inner">
            OK
          </div>
          <button
            onClick={() => handleKeyPress('2')}
            className="px-3 py-1.5 rounded-xl bg-rose-800 hover:bg-rose-700 text-white text-[11px] font-bold shadow active:scale-95 transition-all flex items-center gap-1"
          >
            <span>[ 2 ] Reject</span>
          </button>
        </div>

        {/* Tactile Keypad Grid (1-9, *, 0, #) */}
        <div className="grid grid-cols-3 gap-2 w-full px-2 mt-3">
          {[
            { num: '1', sub: '._@' },
            { num: '2', sub: 'abc' },
            { num: '3', sub: 'def' },
            { num: '4', sub: 'ghi' },
            { num: '5', sub: 'jkl' },
            { num: '6', sub: 'mno' },
            { num: '7', sub: 'pqrs' },
            { num: '8', sub: 'tuv' },
            { num: '9', sub: 'wxyz' },
            { num: '*', sub: 'clear' },
            { num: '0', sub: 'space' },
            { num: '#', sub: 'send' },
          ].map((key) => (
            <button
              key={key.num}
              onClick={() => {
                if (key.num === '*') {
                  setInputVal('');
                  playKeypadBeep(400, accessibility.soundEnabled);
                } else if (key.num === '#') {
                  handleSend();
                } else {
                  handleKeyPress(key.num);
                }
              }}
              className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-center shadow transition-all active:translate-y-0.5"
            >
              <span className="block text-xs font-bold text-slate-200">{key.num}</span>
              <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-mono">
                {key.sub}
              </span>
            </button>
          ))}
        </div>

        {/* Quick Send 1-Tap Pill */}
        <div className="w-full mt-3 flex items-center gap-2">
          <button
            onClick={() => {
              simulateWorkerResponse(selectedWorkerId, '1', activeJob?.id);
              setInputVal('');
            }}
            className="flex-1 py-2 rounded-xl bg-shramik-600 hover:bg-shramik-500 text-white text-xs font-bold shadow-md active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Simulate Reply '1'</span>
          </button>
        </div>
      </div>
    </div>
  );
};
