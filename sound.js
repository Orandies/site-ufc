
const SFX = (() => {
  const STORE_KEY = 'ufc_sound_muted';
  let ctx = null, master = null, uiBus = null, fxBus = null, noiseBuf = null;
  let muted = false, held = false;
  const volume = 0.55;
  const pulseCache = {};

  try { muted = localStorage.getItem(STORE_KEY) === '1'; } catch (e) {}
  function init() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = muted ? 0 : volume;

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 6;
    master.connect(comp); comp.connect(ctx.destination);

    uiBus = ctx.createGain(); uiBus.connect(master);
    fxBus = ctx.createGain(); fxBus.connect(master);

    // 1 секунда белого шума для всех «шипящих» звуков
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ctx;
  }

  function unlock() {
    init();
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
    window.addEventListener(ev, unlock, { passive: true }));

  const ready = () => ctx && !muted && !held && ctx.state !== 'closed';

  function pulseWave(duty) {
    if (pulseCache[duty]) return pulseCache[duty];
    const n = 32, re = new Float32Array(n), im = new Float32Array(n);
    for (let k = 1; k < n; k++) {
      re[k] = Math.sin(2 * k * Math.PI * duty) / (k * Math.PI);
      im[k] = 2 * Math.pow(Math.sin(k * Math.PI * duty), 2) / (k * Math.PI);
    }
    return (pulseCache[duty] = ctx.createPeriodicWave(re, im));
  }

  // type: square | triangle | sawtooth | sine | pulse12 | pulse25
  function tone({ type = 'square', f = 440, to = null, dur = 0.1, vol = 0.25,
                  delay = 0, attack = 0.004, bus = 'ui', vib = 0 }) {
    const t0 = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    if (type === 'pulse12') o.setPeriodicWave(pulseWave(0.125));
    else if (type === 'pulse25') o.setPeriodicWave(pulseWave(0.25));
    else o.type = type;

    o.frequency.setValueAtTime(f, t0);
    if (to) o.frequency.exponentialRampToValueAtTime(Math.max(1, to), t0 + dur);

    if (vib) {
      const l = ctx.createOscillator(), lg = ctx.createGain();
      l.frequency.value = 9; lg.gain.value = vib;
      l.connect(lg); lg.connect(o.frequency);
      l.start(t0); l.stop(t0 + dur + 0.05);
    }

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    o.connect(g); g.connect(bus === 'fx' ? fxBus : uiBus);
    o.start(t0); o.stop(t0 + dur + 0.03);
  }

  function noise({ dur = 0.1, vol = 0.25, delay = 0, type = 'lowpass',
                   f0 = 2000, f1 = null, q = 1, bus = 'fx', attack = 0.003 }) {
    const t0 = ctx.currentTime + delay;
    const s = ctx.createBufferSource();
    s.buffer = noiseBuf; s.loop = true;

    const fl = ctx.createBiquadFilter();
    fl.type = type; fl.Q.value = q;
    fl.frequency.setValueAtTime(f0, t0);
    if (f1) fl.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + dur);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    s.connect(fl); fl.connect(g); g.connect(bus === 'fx' ? fxBus : uiBus);
    s.start(t0, Math.random() * 0.5); s.stop(t0 + dur + 0.03);
  }

  const note = n => 440 * Math.pow(2, n / 12);
  function arp(semis, { step = 0.06, type = 'square', dur = 0.09, vol = 0.2,
                        bus = 'ui', delay = 0 } = {}) {
    semis.forEach((s, i) => tone({ type, f: note(s), dur, vol, bus, delay: delay + i * step }));
  }

  const play = fn => (...a) => { if (!ready()) return; try { fn(...a); } catch (e) { if (globalThis.__SFX_DEBUG) throw e; } };

  /* ============================================================
     ИНТЕРФЕЙС
     ============================================================ */
  const click    = play(() => tone({ type: 'pulse25', f: 700, to: 1100, dur: 0.05, vol: 0.18 }));
  const select   = play(() => { tone({ type: 'pulse25', f: 520, dur: 0.05, vol: 0.18 }); tone({ type: 'pulse25', f: 780, dur: 0.07, vol: 0.18, delay: 0.05 }); });
  const typeKey  = play(() => tone({ type: 'square', f: 900 + Math.random() * 300, dur: 0.02, vol: 0.06 }));
  const error    = play(() => { tone({ type: 'square', f: 200, to: 150, dur: 0.12, vol: 0.22 }); tone({ type: 'square', f: 150, to: 100, dur: 0.18, vol: 0.22, delay: 0.1 }); });

  const statUp   = play((level = 1, maxed = false) => {
    tone({ type: 'pulse25', f: note(level * 2 - 4), dur: 0.08, vol: 0.22 });
    tone({ type: 'pulse25', f: note(level * 2 + 3), dur: 0.08, vol: 0.18, delay: 0.05 });
    if (maxed) arp([12, 16, 19, 24], { step: 0.05, type: 'pulse12', vol: 0.16, delay: 0.1 });
  });
  const statDown = play((level = 0) => tone({ type: 'pulse25', f: note(level * 2 + 4), to: note(level * 2 - 2), dur: 0.1, vol: 0.2 }));
  const diceRoll = play((ms = 650) => {
    for (let t = 0; t < ms / 1000 - 0.05; t += 0.07) {
      tone({ type: 'square', f: 300 + Math.random() * 500, dur: 0.03, vol: 0.12, delay: t });
      noise({ dur: 0.03, vol: 0.12, delay: t, type: 'highpass', f0: 3000, bus: 'ui' });
    }
  });
  const diceLand = play(() => arp([0, 4, 7, 12, 16], { step: 0.055, type: 'pulse25', vol: 0.2 }));
  const recStart = play(() => tone({ type: 'pulse25', f: 600, to: 1000, dur: 0.07, vol: 0.16 }));
  const recStop  = play(() => { tone({ type: 'pulse25', f: 900, dur: 0.06, vol: 0.18 }); tone({ type: 'pulse25', f: 600, dur: 0.1, vol: 0.18, delay: 0.07 }); });
  const remove   = play(() => tone({ type: 'sawtooth', f: 500, to: 80, dur: 0.22, vol: 0.18 }));

  /* ============================================================
     ВЫБОР АНИМАЦИИ АТАКИ (и сама атака в ульте)
     ============================================================ */
  const classAttack = play((key) => {
    if (key === 'brawler') {            // кулак: глухой удар
      noise({ dur: 0.07, vol: 0.3, type: 'lowpass', f0: 1800, f1: 300 });
      tone({ type: 'sine', f: 180, to: 50, dur: 0.14, vol: 0.5, bus: 'fx' });
      tone({ type: 'square', f: 420, to: 200, dur: 0.05, vol: 0.12, bus: 'fx' });
    } else if (key === 'acrobat') {     // вертушка: свист вверх + шлепок
      noise({ dur: 0.22, vol: 0.2, type: 'bandpass', f0: 500, f1: 3500, q: 3 });
      tone({ type: 'triangle', f: 300, to: 900, dur: 0.18, vol: 0.2, bus: 'fx' });
      noise({ dur: 0.06, vol: 0.28, delay: 0.19, type: 'lowpass', f0: 2500, f1: 400 });
    } else {                            // меч: металлический «шинг»
      noise({ dur: 0.25, vol: 0.18, type: 'highpass', f0: 2500, f1: 8000, q: 2 });
      tone({ type: 'sine', f: 2400, to: 3600, dur: 0.3, vol: 0.12, bus: 'fx', vib: 40 });
      tone({ type: 'square', f: 1200, to: 2000, dur: 0.08, vol: 0.08, bus: 'fx' });
    }
  });

  /* ============================================================
     СТИХИИ - тембр для чипа и для ульты
     ============================================================ */
  function elementVoice(key, vol = 1, bus = 'ui', delay = 0) {
    const v = n => n * vol;
    switch (key) {
      case 'fire':
        noise({ dur: 0.35, vol: v(0.28), delay, type: 'lowpass', f0: 400, f1: 3000, q: 2, bus });
        tone({ type: 'sawtooth', f: 110, to: 220, dur: 0.3, vol: v(0.12), delay, bus });
        break;
      case 'ice':
        [0, 7, 12, 19].forEach((s, i) =>
          tone({ type: 'sine', f: note(s + 24), dur: 0.22, vol: v(0.16), delay: delay + i * 0.06, bus }));
        break;
      case 'lightning':
        noise({ dur: 0.12, vol: v(0.3), delay, type: 'highpass', f0: 2000, bus });
        tone({ type: 'sawtooth', f: 2400, to: 150, dur: 0.18, vol: v(0.2), delay, bus });
        tone({ type: 'square', f: 1800, to: 120, dur: 0.12, vol: v(0.14), delay: delay + 0.1, bus });
        break;
      case 'cyber':
        for (let i = 0; i < 6; i++)
          tone({ type: 'square', f: note(Math.floor(Math.random() * 18)), dur: 0.04, vol: v(0.14), delay: delay + i * 0.045, bus });
        break;
      case 'nature':
        tone({ type: 'triangle', f: 330, to: 880, dur: 0.18, vol: v(0.22), delay, bus });
        tone({ type: 'triangle', f: 440, to: 1175, dur: 0.18, vol: v(0.18), delay: delay + 0.1, bus });
        break;
      case 'dark':
        tone({ type: 'sawtooth', f: 160, to: 40, dur: 0.45, vol: v(0.22), delay, bus, vib: 6 });
        tone({ type: 'sawtooth', f: 165, to: 42, dur: 0.45, vol: v(0.18), delay, bus });
        break;
      case 'light':
        arp([12, 16, 19, 24, 28], { step: 0.05, type: 'triangle', dur: 0.14, vol: v(0.2), bus, delay });
        break;
      case 'cosmos':
        tone({ type: 'sine', f: 200, to: 900, dur: 0.5, vol: v(0.22), delay, bus, vib: 30 });
        tone({ type: 'sine', f: 303, to: 1350, dur: 0.5, vol: v(0.12), delay, bus, vib: 24 });
        break;
      default:
        tone({ type: 'square', f: 500, dur: 0.08, vol: v(0.2), delay, bus });
    }
  }
  const element = play((key) => elementVoice(key, 1, 'ui'));

  /* ============================================================
     УЛЬТИМЕЙТ: ШКАЛА, ПРИЁМЫ, УДАР
     ============================================================ */
  const superStart = play(() => {
    arp([0, 4, 7, 12], { step: 0.05, type: 'pulse12', dur: 0.1, vol: 0.18, bus: 'fx' });
    tone({ type: 'sawtooth', f: 90, to: 360, dur: 0.22, vol: 0.12, bus: 'fx' });
  });

  const dash = play(() => {
    noise({ dur: 0.45, vol: 0.28, type: 'bandpass', f0: 300, f1: 4000, q: 2 });
    tone({ type: 'sawtooth', f: 120, to: 400, dur: 0.4, vol: 0.14, bus: 'fx' });
  });
  const aoe = play((elKey) => {
    tone({ type: 'sine', f: 140, to: 28, dur: 0.5, vol: 0.7, bus: 'fx' });
    noise({ dur: 0.5, vol: 0.4, type: 'lowpass', f0: 3000, f1: 80 });
    elementVoice(elKey, 0.8, 'fx', 0.02);
  });
  const drop = play(() => {
    tone({ type: 'sine', f: 1800, to: 260, dur: 0.65, vol: 0.2, bus: 'fx' });
    tone({ type: 'triangle', f: 1830, to: 262, dur: 0.65, vol: 0.1, bus: 'fx' });
  });
  const beam = play(() => {
    tone({ type: 'sawtooth', f: 220, to: 1400, dur: 0.42, vol: 0.2, bus: 'fx' });
    tone({ type: 'square', f: 110, to: 700, dur: 0.42, vol: 0.12, bus: 'fx' });
    noise({ dur: 0.42, vol: 0.14, type: 'highpass', f0: 1500, f1: 6000 });
  });
  const teleportOut = play(() => {
    tone({ type: 'square', f: 300, to: 2400, dur: 0.2, vol: 0.18, bus: 'fx' });
    noise({ dur: 0.15, vol: 0.12, type: 'highpass', f0: 4000, bus: 'fx' });
  });
  const teleportIn = play(() => {
    tone({ type: 'square', f: 2400, to: 300, dur: 0.18, vol: 0.18, bus: 'fx' });
    tone({ type: 'pulse12', f: 800, dur: 0.08, vol: 0.18, delay: 0.17, bus: 'fx' });
  });
  const punch = play((i = 0) => {
    noise({ dur: 0.05, vol: 0.28, type: 'lowpass', f0: 2200, f1: 300 });
    tone({ type: 'sine', f: 200 + i * 25, to: 60, dur: 0.09, vol: 0.4, bus: 'fx' });
  });
  const uppercut = play(() => {
    noise({ dur: 0.25, vol: 0.2, type: 'bandpass', f0: 300, f1: 2800, q: 2 });
    tone({ type: 'triangle', f: 150, to: 700, dur: 0.25, vol: 0.2, bus: 'fx' });
  });

  /* ---------- удар + эффект ---------- */
  const EFFECT_SOUNDS = {
    damage()    { tone({ type: 'sine', f: 110, to: 30, dur: 0.35, vol: 0.6, bus: 'fx' }); noise({ dur: 0.25, vol: 0.35, type: 'lowpass', f0: 2500, f1: 120 }); },
    stun()      { [0, 0.14, 0.28].forEach(d => { tone({ type: 'sine', f: 1568, dur: 0.2, vol: 0.18, delay: d, bus: 'fx', vib: 30 }); tone({ type: 'sine', f: 2093, dur: 0.2, vol: 0.1, delay: d, bus: 'fx' }); }); },
    knockback() { noise({ dur: 0.4, vol: 0.28, type: 'bandpass', f0: 2500, f1: 250, q: 2 }); tone({ type: 'sawtooth', f: 400, to: 70, dur: 0.35, vol: 0.14, bus: 'fx' }); },
    vampire()   { arp([0, 4, 7, 12, 16, 19], { step: 0.055, type: 'triangle', dur: 0.14, vol: 0.2, bus: 'fx' }); },
    slow()      { tone({ type: 'sawtooth', f: 500, to: 70, dur: 0.6, vol: 0.18, bus: 'fx', vib: 20 }); tone({ type: 'square', f: 250, to: 40, dur: 0.6, vol: 0.1, bus: 'fx' }); },
    dot()       { for (let i = 0; i < 9; i++) noise({ dur: 0.04, vol: 0.18, delay: i * 0.06 + Math.random() * 0.03, type: 'highpass', f0: 2000 + Math.random() * 3000 }); tone({ type: 'sawtooth', f: 90, to: 60, dur: 0.5, vol: 0.1, bus: 'fx' }); },
    steal()     { arp([-5, 0, 4, 7, 12, 16], { step: 0.045, type: 'pulse25', dur: 0.1, vol: 0.2, bus: 'fx' }); }
  };

  const impact = play((elKey, effectKey) => {
    // сам удар
    noise({ dur: 0.18, vol: 0.4, type: 'lowpass', f0: 3500, f1: 150 });
    tone({ type: 'sine', f: 160, to: 40, dur: 0.22, vol: 0.55, bus: 'fx' });
    tone({ type: 'square', f: 900, to: 200, dur: 0.06, vol: 0.14, bus: 'fx' });
    // стихия и эффект чуть позже, чтобы не слипались
    elementVoice(elKey, 0.7, 'fx', 0.05);
    const fx = EFFECT_SOUNDS[effectKey];
    if (fx) setTimeout(() => { if (ready()) { try { fx(); } catch (e) {} } }, 120);
  });

  /* ============================================================
     БОЙ: промах, шкала готова, горение, нокаут
     ============================================================ */
  const miss = play(() => noise({ dur: 0.14, vol: 0.14, type: 'bandpass', f0: 800, f1: 2600, q: 2 }));
  const superReady = play(() => arp([0, 4, 7, 12, 16], { step: 0.05, type: 'pulse25', dur: 0.1, vol: 0.18, bus: 'fx' }));
  const dotTick = play(() => {
    noise({ dur: 0.05, vol: 0.16, type: 'highpass', f0: 3000, bus: 'fx' });
    tone({ type: 'square', f: 200, to: 90, dur: 0.06, vol: 0.08, bus: 'fx' });
  });
  const ko = play(() => {
    noise({ dur: 0.5, vol: 0.4, type: 'lowpass', f0: 3000, f1: 100 });
    tone({ type: 'sine', f: 180, to: 30, dur: 0.7, vol: 0.7, bus: 'fx' });
    arp([12, 7, 4, 0, -5], { step: 0.09, type: 'pulse12', dur: 0.15, vol: 0.16, bus: 'fx', delay: 0.1 });
  });
  const lose = play(() => {
    arp([0, -3, -7, -12], { step: 0.16, type: 'triangle', dur: 0.3, vol: 0.28, bus: 'fx' });
    tone({ type: 'sawtooth', f: 110, to: 40, dur: 0.8, vol: 0.18, bus: 'fx' });
  });

  /* ============================================================
     ОТПРАВКА АНКЕТЫ
     ============================================================ */
  const coin = play(() => {
    tone({ type: 'pulse25', f: 988, dur: 0.07, vol: 0.22 });
    tone({ type: 'pulse25', f: 1319, dur: 0.35, vol: 0.22, delay: 0.07 });
  });
  const win = play(() => {
    arp([0, 4, 7, 12], { step: 0.09, type: 'pulse25', dur: 0.12, vol: 0.2 });
    arp([7, 12, 16, 19, 24], { step: 0.09, type: 'pulse12', dur: 0.16, vol: 0.16, delay: 0.38 });
    tone({ type: 'triangle', f: note(-12), dur: 0.9, vol: 0.3, delay: 0.38 });
    tone({ type: 'pulse25', f: note(24), dur: 0.7, vol: 0.2, delay: 0.85, vib: 8 });
  });

  /* ============================================================
     УПРАВЛЕНИЕ
     ============================================================ */
  function cut() {
    if (!ctx) return;
    const old = fxBus, t = ctx.currentTime;
    old.gain.cancelScheduledValues(t);
    old.gain.setTargetAtTime(0, t, 0.015);
    setTimeout(() => { try { old.disconnect(); } catch (e) {} }, 150);
    fxBus = ctx.createGain();
    fxBus.connect(master);
  }
  function hold(on) { held = !!on; }

  function setMuted(m) {
    muted = !!m;
    try { localStorage.setItem(STORE_KEY, muted ? '1' : '0'); } catch (e) {}
    if (master) master.gain.setTargetAtTime(muted ? 0 : volume, ctx.currentTime, 0.02);
    if (!muted) { unlock(); setTimeout(click, 30); }
  }
  const isMuted = () => muted;

  return {
    click, select, typeKey, error, statUp, statDown, diceRoll, diceLand,
    recStart, recStop, remove, classAttack, element,
    superStart, dash, aoe, drop, beam, teleportOut, teleportIn, punch, uppercut,
    impact, miss, ready: superReady, dotTick, ko, lose, coin, win, cut, hold, setMuted, isMuted, unlock
  };
})();
