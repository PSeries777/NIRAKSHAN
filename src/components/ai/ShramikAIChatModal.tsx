import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Mic, MicOff, Volume2, ShieldCheck } from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';
import { useLanguage } from '../../context/LanguageContext';
import { answerWorkerQuery } from '../../services/aiService';
import { ChatMessage } from '../../types';
import { playClickSound } from '../../utils/audioFeedback';

export const ShramikAIChatModal: React.FC = () => {
  const {
    isShramikAiOpen,
    setIsShramikAiOpen,
    activeJob,
    workers,
    accessibility,
  } = useWorkforce();

  const { language } = useLanguage();
  const currentWorker = workers[0]; // Ramesh Naik by default

  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      content:
        language === 'hi'
          ? 'नमस्ते! मैं श्रमिक एआई हूँ। आप मुझसे कार्य अवधि, दैनिक भुगतान, स्थान या कार्य आवंटन के बारे में पूछ सकते हैं।'
          : language === 'mr'
          ? 'नमस्कार! मी श्रमिक एआय आहे. तुम्ही मला कामाचा कालावधी, रोजचा मोबदला, कामाचे ठिकाण किंवा वाटपाबद्दल विचारू शकता.'
          : 'Namaste! I am Shramik AI. Ask me about project duration, daily wages, location, or assignment details.',
      timestamp: 'Just now',
      language,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isShramikAiOpen) return null;

  const quickPrompts = [
    { label: 'काम कितने दिन का है?', query: 'काम कितने दिन का है?' },
    { label: 'पैसे कितने मिलेंगे?', query: 'पैसे कितने मिलेंगे?' },
    { label: 'स्थान कहाँ है?', query: 'स्थान कहाँ है?' },
    { label: 'क्या मैं कल आ सकता हूँ?', query: 'क्या मैं कल आ सकता हूँ?' },
    { label: 'मेरा कार्य इतिहास?', query: 'मेरा कार्य इतिहास बताओ' },
  ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    playClickSound(accessibility.soundEnabled);

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'worker',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Answer with context
    setTimeout(() => {
      const response = answerWorkerQuery(text, {
        activeJob,
        currentWorker,
        language,
      });

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 400);
  };

  const handleSpeak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoiceInput = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognition as any)();
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        handleSend(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-white rounded-modal shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[650px] max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-blue-50/70 via-white to-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-shramik-600 to-sky-400 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 font-display">
                  SHRAMIK AI
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Context
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Context: {activeJob ? activeJob.title : 'General Workforce'} (
                {activeJob ? activeJob.location : 'Goa'})
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsShramikAiOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Carousel */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
            Ask:
          </span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p.query)}
              className="px-3 py-1 rounded-xl text-xs font-semibold bg-white hover:bg-blue-50 text-slate-700 hover:text-shramik-700 border border-slate-200 shadow-sm whitespace-nowrap transition-all active:scale-95"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'worker' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-xl bg-shramik-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1 shadow-sm">
                  AI
                </div>
              )}

              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-xs leading-relaxed ${
                  msg.sender === 'worker'
                    ? 'bg-shramik-600 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                }`}
              >
                <p className="font-medium whitespace-pre-line">{msg.content}</p>
                <div
                  className={`mt-1.5 flex items-center justify-between text-[10px] ${
                    msg.sender === 'worker' ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => handleSpeak(msg.content)}
                      className="ml-2 hover:text-shramik-600 flex items-center gap-1 font-bold"
                      title="Read out loud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'worker' && (
                <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1 shadow-sm">
                  RN
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-3 rounded-2xl border transition-all ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
              title="Speak question via microphone"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'काम या भुगतान के बारे में पूछें...'
                  : language === 'mr'
                  ? 'कामाबद्दल किंवा मानधनाबद्दल विचारा...'
                  : 'Ask question about this job...'
              }
              className="tactile-input flex-1 py-3"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="tactile-btn-primary px-5 py-3 text-xs disabled:opacity-50 disabled:pointer-events-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
