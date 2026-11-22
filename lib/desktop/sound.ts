// Tiny WebAudio synth for boot sounds. Nothing is created until initAudio()
// is called from a user gesture, so autoplay policies are respected.
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;
const LEVEL = 0.4;

export function initAudio() {
  if (ctx || typeof window === "undefined") return;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : LEVEL;
  master.connect(ctx.destination);
  void ctx.resume();
}

export function setMuted(m: boolean) {
  muted = m;
  if (ctx && master) master.gain.setTargetAtTime(m ? 0 : LEVEL, ctx.currentTime, 0.01);
}

function tone(freq: number, at: number, dur: number, type: OscillatorType, vol: number, endFreq?: number) {
  if (!ctx || !master) return;
  const t = ctx.currentTime + at;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (endFreq) o.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + dur + 0.05);
}

export const playPowerOn = () => {
  tone(50, 0, 0.9, "sawtooth", 0.35, 120); // CRT hum swell
  tone(2200, 0.05, 0.5, "sine", 0.05, 15000); // degauss whine
};
export const playBeep = () => tone(1000, 0, 0.12, "square", 0.12);
export const playTick = () => tone(1800, 0, 0.02, "square", 0.04);
export const playChime = () =>
  [440, 554, 659, 880].forEach((f, i) => tone(f, i * 0.11, 0.5, "triangle", 0.18));

// ---------------------------------------------------------------------------
// Interface sound effects. All are no-ops until initAudio() has run (which only
// happens inside the power-on user gesture), and all respect the master mute.
// ---------------------------------------------------------------------------
export const sfx = {
  click: () => tone(1400, 0, 0.025, "square", 0.05),
  hover: () => tone(2100, 0, 0.012, "square", 0.018),
  menuOpen: () => { tone(700, 0, 0.04, "square", 0.05); tone(950, 0.04, 0.045, "square", 0.05); },
  menuSelect: () => tone(1100, 0, 0.05, "square", 0.07),
  windowOpen: () => { tone(520, 0, 0.07, "square", 0.07); tone(780, 0.07, 0.09, "square", 0.07); },
  windowClose: () => { tone(780, 0, 0.07, "square", 0.07); tone(430, 0.07, 0.1, "square", 0.07); },
  minimize: () => tone(900, 0, 0.16, "triangle", 0.1, 300),
  restore: () => tone(300, 0, 0.16, "triangle", 0.1, 900),
  maximize: () => { tone(600, 0, 0.05, "square", 0.06); tone(900, 0.05, 0.07, "square", 0.06); },
  error: () => tone(140, 0, 0.2, "sawtooth", 0.12),
  success: () => playChime(),
  shutdown: () => [880, 660, 440, 220].forEach((f, i) => tone(f, i * 0.12, 0.3, "triangle", 0.14)),
};

// Optional ambient CRT hum: mains hum plus faint filtered noise, routed through the master gain.
let ambientNodes: { stop: () => void } | null = null;

export function setAmbient(on: boolean) {
  if (!ctx || !master) return;
  if (!on) {
    ambientNodes?.stop();
    ambientNodes = null;
    return;
  }
  if (ambientNodes) return;
  const c = ctx;
  const bus = c.createGain();
  bus.gain.value = 0;
  bus.gain.setTargetAtTime(1, c.currentTime, 0.4);
  bus.connect(master);

  const mk = (freq: number, vol: number) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    g.gain.value = vol;
    o.connect(g).connect(bus);
    o.start();
    return o;
  };
  const hum1 = mk(60, 0.05);
  const hum2 = mk(120, 0.02);

  const buf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const noise = c.createBufferSource();
  noise.buffer = buf;
  noise.loop = true;
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 500;
  const ng = c.createGain();
  ng.gain.value = 0.012;
  noise.connect(lp).connect(ng).connect(bus);
  noise.start();

  ambientNodes = {
    stop: () => {
      bus.gain.setTargetAtTime(0, c.currentTime, 0.1);
      setTimeout(() => {
        hum1.stop();
        hum2.stop();
        noise.stop();
        bus.disconnect();
      }, 400);
    },
  };
}
