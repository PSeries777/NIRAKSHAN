import React from 'react';
import { X, Type, Eye, Zap, Box, Volume2, RotateCcw } from 'lucide-react';
import { useWorkforce } from '../../context/WorkforceContext';

export const AccessibilityModal: React.FC = () => {
  const {
    isAccessibilityModalOpen,
    setIsAccessibilityModalOpen,
    accessibility,
    updateAccessibility,
  } = useWorkforce();

  if (!isAccessibilityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-modal shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-shramik-50 text-shramik-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 font-display">
                Accessibility Settings
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Tailor readability, visual depth, and motion
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Text Size */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Type className="w-4 h-4 text-shramik-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Text Size</h4>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'xlarge'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => updateAccessibility({ textSize: size })}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                    accessibility.textSize === size
                      ? 'bg-shramik-600 text-white border-shramik-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {size === 'normal' && 'Normal (100%)'}
                  {size === 'large' && 'Large (115%)'}
                  {size === 'xlarge' && 'Extra Large (130%)'}
                </button>
              ))}
            </div>
          </div>

          {/* Contrast Mode */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-shramik-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Contrast</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(['standard', 'high'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => updateAccessibility({ contrast: mode })}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                    accessibility.contrast === mode
                      ? 'bg-shramik-600 text-white border-shramik-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {mode === 'standard' ? 'Standard UI' : 'High Contrast'}
                </button>
              ))}
            </div>
          </div>

          {/* Motion Control */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-shramik-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Motion & Animation</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(['standard', 'reduced'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => updateAccessibility({ motion: m })}
                  className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                    accessibility.motion === m
                      ? 'bg-shramik-600 text-white border-shramik-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m === 'standard' ? 'Standard Motion' : 'Reduced Motion'}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Graphics Toggle */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Box className="w-4 h-4 text-shramik-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">3D Graphics Mode</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateAccessibility({ threeD: true })}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                  accessibility.threeD
                    ? 'bg-shramik-600 text-white border-shramik-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Enabled (3D WebGL)
              </button>
              <button
                onClick={() => updateAccessibility({ threeD: false })}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                  !accessibility.threeD
                    ? 'bg-shramik-600 text-white border-shramik-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Disabled (2D Vector Fallbacks)
              </button>
            </div>
          </div>

          {/* Sound Synthesizer Toggle */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-4 h-4 text-shramik-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Tactile Audio Feedback</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateAccessibility({ soundEnabled: true })}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                  accessibility.soundEnabled
                    ? 'bg-shramik-600 text-white border-shramik-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Sound Active
              </button>
              <button
                onClick={() => updateAccessibility({ soundEnabled: false })}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                  !accessibility.soundEnabled
                    ? 'bg-shramik-600 text-white border-shramik-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Muted
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() =>
              updateAccessibility({
                textSize: 'normal',
                contrast: 'standard',
                motion: 'standard',
                threeD: true,
                soundEnabled: true,
              })
            }
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="tactile-btn-primary px-6 py-2.5 text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
