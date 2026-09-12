// Web Audio API tactile audio synthesizers (zero external assets needed)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playClickSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // AudioContext blocked or not supported
  }
}

export function playKeypadBeep(frequency = 770, enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Ignore
  }
}

export function playSmsChime(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const now = ctx.currentTime;
    [
      { freq: 587.33, start: now, dur: 0.12 }, // D5
      { freq: 880.00, start: now + 0.1, dur: 0.22 }, // A5
    ].forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0.15, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(start);
      osc.stop(start + dur);
    });
  } catch {
    // Ignore
  }
}

export function playSuccessChime(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const now = ctx.currentTime;
    // Ascending major chord (C5, E5, G5, C6)
    [
      { freq: 523.25, start: now, dur: 0.15 },
      { freq: 659.25, start: now + 0.08, dur: 0.15 },
      { freq: 783.99, start: now + 0.16, dur: 0.18 },
      { freq: 1046.50, start: now + 0.24, dur: 0.35 },
    ].forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(start);
      osc.stop(start + dur);
    });
  } catch {
    // Ignore
  }
}
