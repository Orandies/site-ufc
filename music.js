/* ============================================================
   UNITED FURRY CON — ФОНОВАЯ МУЗЫКА
   3 трека, синтезируются прямо в браузере (Web Audio), файлов нет.
   Слов в музыке нет. Выбор «включить музыку?» нигде не сохраняется.
   ============================================================ */
const MUSIC = (() => {
  const MAXV = 0.7;                     // максимальная громкость (при ползунке 100)
  const LOOKAHEAD = 0.16;               // сек. вперёд планируем ноты
  let level = 70;                       // положение ползунка 0..100 (только на время визита)
  const vol = () => MAXV * Math.pow(level / 100, 2);

/* ---------- настройка треков ---------- */
  const P = s => s.trim().split(/\s+/).map(x => x === '.' ? null : x === '~' ? '~' : Number(x));
  const rep = (s, n) => Array(n).fill(s);

  // lead: по строке на такт (16 шестнадцатых). число = полутонов от lead root, '.' пауза, '~' продолжение ноты
  // flags в arrange (по строке на такт): L соло, A арпеджио, B бас, K бочка, S малый барабан, H хэт,
  // F частые 16-е хэты, P пэд. Если arrange нет - играют все слои.
  const hold = (n, flags) => Array(n).fill(flags);

  const T1_HOOK = [
    '12 . 12 15 . 12 . 7 . 12 . 15 . 19 . 15',
    '20 . 15 . 12 . 15 . 20 ~ 19 . 15 . 12 .',
    '19 . 15 . 19 . 22 ~ ~ . 19 . 15 . 10 .',
    '22 ~ 19 . 17 . 14 . 17 . 19 . 22 ~ 24 ~'
  ];
  const T1_VERSE = [
    '12 ~ ~ . . . 7 . 12 ~ ~ . . . 7 .',
    '12 ~ ~ . . . 8 . 12 ~ ~ . . . 15 .',
    '10 ~ ~ . . . 7 . 10 ~ ~ . . . 15 .',
    '14 ~ ~ . . . 10 . 14 ~ ~ . . . 17 .'
  ];
  const T3_HOOK = [
    '12 . 7 . 12 . 16 ~ ~ . 14 . 12 . 7 .',
    '14 . 11 . 14 . 19 ~ ~ . 16 . 14 . 11 .',
    '16 . 12 . 16 . 19 ~ 21 ~ ~ . 19 . 16 .',
    '17 . 14 . 12 . 9 . 12 . 14 . 17 ~ 19 ~'
  ];
  const T3_VERSE = [
    '7 . . 7 . . 7 . 12 . . 7 . . 4 .',
    '11 . . 11 . . 11 . 14 . . 11 . . 7 .',
    '12 . . 12 . . 12 . 16 . . 12 . . 9 .',
    '12 . . 12 . . 12 . 17 . . 12 . . 9 .'
  ];

  // lead: по строке на такт (16 шестнадцатых). число = полутонов от lead root, '.' пауза, '~' продолжение ноты
  const TRACKS = [
    {
      name: 'TURBO CHASE', bpm: 168, loops: 2,
      leadRoot: 64, bassBase: 40, arpBase: 40,
      chords: [[0, 'm'], [8, 'M'], [3, 'M'], [10, 'M']],
      lead: [
        ...T1_VERSE, ...T1_VERSE,                                                   // 0-7
        ...T1_HOOK,                                                                 // 8-11
        ...T1_HOOK.slice(0, 3), '22 ~ 19 . 22 ~ 19 . 24 ~ 22 ~ 19 ~ 17 ~'          // 12-15
      ],
      arrange: [
        ...hold(4, 'ABKH'), ...hold(3, 'ABKSHL'), 'ABKSHLF',
        ...hold(4, 'ABKSHLFP'), ...hold(3, 'ABKSHLFP'), 'ABKSHLFP'
      ],
      riser: [7, 15],
      leadVoice: { duty: 0.25, vol: 0.07, vib: 0.6 },
      bass: '0 0 12 0 0 0 12 0 0 0 12 0 0 12 0 12',
      bassVoice: { type: 'sawtooth', vol: 0.12, lp: 700 }, bassLen: 0.9,
      arp: { duty: 0.125, vol: 0.03, pattern: [0, 1, 2, 3, 2, 1, 2, 3] },
      pad: { vol: 0.016 },
      drums: { k: 'x...x...x...x.x.', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.', o: '..............x.' }
    },
    {
      name: 'NEON DRIVE', bpm: 112, loops: 3,
      leadRoot: 62, bassBase: 38, arpBase: 50,
      chords: [[0, 'm'], [8, 'M'], [10, 'M'], [7, 'm']],
      lead: [
        '12 ~ ~ ~ ~ ~ 7 ~ 8 ~ ~ ~ 7 ~ ~ ~',
        '15 ~ ~ ~ 12 ~ ~ ~ 8 ~ . . 12 ~ ~ ~',
        '14 ~ ~ 12 ~ ~ 10 ~ ~ ~ 14 ~ ~ ~ 12 ~',
        '14 ~ ~ ~ 10 ~ ~ ~ 7 ~ ~ ~ . . 10 ~',
        '19 ~ ~ ~ 17 ~ 15 ~ 14 ~ 12 ~ ~ ~ 15 ~',
        '17 ~ ~ ~ 15 ~ 12 ~ 15 ~ ~ ~ 17 ~ 20 ~',
        '19 ~ ~ ~ 17 ~ 14 ~ 17 ~ ~ ~ 14 ~ 10 ~',
        '14 ~ 10 ~ 7 ~ ~ ~ 10 ~ 14 ~ 12 ~ ~ ~'
      ],
      leadVoice: { type: 'sawtooth', vol: 0.045, vib: 1, lp: 2600 },
      bass: '0 . . 0 . . 0 . 0 . . 0 . . 12 .',
      bassVoice: { type: 'sawtooth', vol: 0.15, lp: 520 },
      pad: { vol: 0.022 },
      drums: { k: 'x.....x...x.....', s: '....x.......x...', h: 'xxxxxxxxxxxxxxxx', o: '..........x.....' }
    },
    {
      name: 'SKY RAIDER', bpm: 140, loops: 2,
      leadRoot: 67, bassBase: 43, arpBase: 43,
      chords: [[0, 'M'], [7, 'M'], [9, 'm'], [5, 'M']],
      lead: [
        ...T3_VERSE, ...T3_VERSE,                                                   // 0-7
        ...T3_HOOK,                                                                 // 8-11
        ...T3_HOOK.slice(0, 3), '17 ~ 19 ~ 21 ~ 19 ~ 17 ~ 14 ~ 12 ~ ~ ~'          // 12-15
      ],
      arrange: [
        ...hold(4, 'AKP'), ...hold(3, 'ABKSHLP'), 'ABKSHLFP',
        ...hold(7, 'ABKSHLFP'), 'ABKSHLFP'
      ],
      riser: [7, 15],
      leadVoice: { type: 'square', vol: 0.05, vib: 0.8 },
      bass: '. . 0 . . . 0 . . . 0 . . . 0 .',
      bassVoice: { type: 'sawtooth', vol: 0.14, lp: 650 }, bassLen: 1.4,
      arp: { duty: 0.25, vol: 0.026, pattern: [0, 2, 1, 3, 2, 3, 1, 2] },
      pad: { vol: 0.02 },
      drums: { k: 'x...x...x...x...', s: '....x.......x...', h: '................', o: '..x...x...x...x.' }
    }
  ];

  // разбираем строки в массивы
  TRACKS.forEach(T => {
    T.leadP = T.lead.map(P);
    T.bassP = P(T.bass);
    T.bars = T.lead.length;
    T.leadP.forEach(b => { if (b.length !== 16) throw new Error('bad bar in ' + T.name); });
  });

  /* ---------- состояние ---------- */
  let ctx = null, master = null, noiseBuf = null;
  let sess = null, bus = null, leadBus = null, dly = null;   // граф текущего трека
  let playing = false, wanted = false, cur = 0, step = 0, loops = 0, nextT = 0, timer = null;
  const pulseCache = {};
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

  /* ---------- аудио-движок ---------- */
  function initCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = vol();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 5;
    master.connect(comp); comp.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ctx;
  }

  function pulseWave(duty) {
    if (pulseCache[duty]) return pulseCache[duty];
    const n = 32, re = new Float32Array(n), im = new Float32Array(n);
    for (let k = 1; k < n; k++) {
      re[k] = Math.sin(2 * k * Math.PI * duty) / (k * Math.PI);
      im[k] = 2 * Math.pow(Math.sin(k * Math.PI * duty), 2) / (k * Math.PI);
    }
    return (pulseCache[duty] = ctx.createPeriodicWave(re, im));
  }

  function buildGraph(T) {
    teardownGraph(0.12);
    sess = ctx.createGain(); sess.gain.value = 1; sess.connect(master);
    bus = ctx.createGain(); bus.connect(sess);
    leadBus = ctx.createGain(); leadBus.connect(sess);
    // эхо на соло: 3/16 такта
    dly = ctx.createDelay(1.5);
    dly.delayTime.value = (60 / T.bpm / 4) * 3;
    const fb = ctx.createGain(); fb.gain.value = 0.3;
    const wet = ctx.createGain(); wet.gain.value = 0.3;
    leadBus.connect(dly); dly.connect(fb); fb.connect(dly); dly.connect(wet); wet.connect(sess);
  }
  function teardownGraph(fade) {
    if (!sess) return;
    const old = sess;
    old.gain.cancelScheduledValues(ctx.currentTime);
    old.gain.setValueAtTime(old.gain.value, ctx.currentTime);
    old.gain.linearRampToValueAtTime(0, ctx.currentTime + fade);
    setTimeout(() => { try { old.disconnect(); } catch (e) {} }, fade * 1000 + 80);
    sess = bus = leadBus = dly = null;
  }

  function tone({ type = 'square', duty = 0, f, t, dur, vol = 0.1, att = 0.006, rel = 0.05, vib = 0, lp = 0, dest = bus }) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    if (duty) o.setPeriodicWave(pulseWave(duty)); else o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (vib) {
      const l = ctx.createOscillator(), lg = ctx.createGain();
      l.frequency.value = 5.5; lg.gain.value = f * 0.011 * vib;
      l.connect(lg); lg.connect(o.frequency);
      l.start(t + 0.12); l.stop(t + dur + rel + 0.05);
    }
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + att);
    g.gain.setValueAtTime(vol, t + Math.max(att, dur - 0.02));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + rel);
    let out = g;
    o.connect(g);
    if (lp) {
      const flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = lp;
      g.connect(flt); out = flt;
    }
    out.connect(dest);
    o.start(t); o.stop(t + dur + rel + 0.05);
  }

  function noise(t, dur, vol, type, freq, q = 0.8) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const flt = ctx.createBiquadFilter(); flt.type = type; flt.frequency.value = freq; flt.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(flt); flt.connect(g); g.connect(bus);
    s.start(t, Math.random() * 0.5, dur + 0.02);
  }
  function kick(t) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(165, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.13);
    g.gain.setValueAtTime(0.7, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    o.connect(g); g.connect(bus); o.start(t); o.stop(t + 0.22);
  }
  function snare(t) {
    noise(t, 0.14, 0.32, 'bandpass', 1900, 0.7);
    tone({ type: 'triangle', f: 190, t, dur: 0.05, vol: 0.18, att: 0.002, rel: 0.05 });
  }
  const hat = (t, open, soft) => noise(t, open ? 0.16 : 0.035, soft ? 0.05 : 0.09, 'highpass', 8000, 0.5);

  function riser(t, dur) {
    const src = ctx.createBufferSource(); src.buffer = noiseBuf; src.loop = true;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 2;
    f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(7000, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + dur);
    g.gain.linearRampToValueAtTime(0, t + dur + 0.03);
    src.connect(f); f.connect(g); g.connect(bus);
    src.start(t); src.stop(t + dur + 0.05);
  }

  /* ---------- секвенсор ---------- */
  function playStep(T, s, t) {
    const bar = Math.floor(s / 16), st = s % 16;
    const sd = 60 / T.bpm / 4;                       // длина шестнадцатой
    const fl = T.arrange ? T.arrange[bar] : 'LABKSHFP'.replace('F', '');
    const [croot, cq] = T.chords[bar % T.chords.length];
    const tones = cq === 'm' ? [0, 3, 7, 12] : [0, 4, 7, 12];

    // соло
    const tk = T.leadP[bar][st];
    if (fl.includes('L') && tk !== null && tk !== '~') {
      let len = 1;
      while (st + len < 16 && T.leadP[bar][st + len] === '~') len++;
      tone({ ...T.leadVoice, f: mtof(T.leadRoot + tk), t, dur: len * sd * 0.94, dest: leadBus, rel: 0.07 });
    }
    // бас
    const bv = T.bassP[st];
    if (fl.includes('B') && bv !== null) {
      tone({ ...T.bassVoice, f: mtof(T.bassBase + croot + bv), t, dur: sd * (T.bassLen || 1.7), att: 0.004, rel: 0.05 });
    }
    // арпеджио
    if (T.arp && fl.includes('A')) {
      const idx = T.arp.pattern[st % T.arp.pattern.length];
      tone({ duty: T.arp.duty, vol: T.arp.vol, f: mtof(T.arpBase + croot + 12 + tones[idx]), t, dur: sd * 0.8, rel: 0.03 });
    }
    // пэд
    if (T.pad && fl.includes('P') && st === 0) {
      [0, 1, 2].forEach(i => tone({
        type: 'sawtooth', vol: T.pad.vol, f: mtof(T.arpBase + croot + 12 + tones[i]), t, dur: sd * 15,
        att: 0.25, rel: 0.4, lp: 1100
      }));
    }
    // ударные
    const D = T.drums;
    if (fl.includes('K') && D.k[st] === 'x') kick(t);
    const fill = fl.includes('K') && bar % 8 === 7 && st >= 12;   // сбивка в конце фразы
    if ((fl.includes('S') && D.s[st] === 'x') || fill) snare(t);
    if (fl.includes('H') || !T.arrange) {
      if (D.o[st] === 'x') hat(t, true, false);
      else if (D.h[st] === 'x') hat(t, false, st % 2 === 1 && D.h === 'xxxxxxxxxxxxxxxx');
    }
    if (fl.includes('F') && st % 2 === 1 && D.o[st] !== 'x') hat(t, false, true);

    // нарастание перед сменой секции и «крэш» на её первой доле
    if (T.riser && st === 0) {
      if (T.riser.includes(bar)) riser(t, sd * 16);
      if (bar > 0 && T.riser.includes(bar - 1)) noise(t, 0.7, 0.14, 'highpass', 5500, 0.4);
    }
  }

  function scheduler() {
    if (!playing || !ctx) return;
    const T = TRACKS[cur], sd = 60 / T.bpm / 4, total = T.bars * 16;
    while (nextT < ctx.currentTime + LOOKAHEAD) {
      playStep(T, step, nextT);
      nextT += sd; step++;
      if (step >= total) {
        step = 0; loops++;
        if (loops >= T.loops) { goTo((cur + 1) % TRACKS.length, nextT); return; }
      }
    }
  }

  function goTo(n, when) {
    cur = n; step = 0; loops = 0;
    buildGraph(TRACKS[cur]);
    nextT = Math.max(when || 0, ctx.currentTime + 0.08);
    paintTrack();
  }

  /* ---------- управление ---------- */
  function start() {
    wanted = true;
    if (!initCtx()) return;
    if (playing) return;
    const go = () => {
      if (!wanted) return;
      playing = true;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(vol(), ctx.currentTime);
      goTo(cur, 0);
      clearInterval(timer);
      timer = setInterval(scheduler, 25);
      paintUI();
    };
    if (ctx.state === 'suspended') ctx.resume().then(go).catch(go); else go();
  }
  function stop() {
    wanted = false;
    if (!ctx) { paintUI(); return; }
    playing = false;
    clearInterval(timer); timer = null;
    teardownGraph(0.2);
    paintUI();
  }
  function next() {
    if (!ctx || !playing) return;
    goTo((cur + 1) % TRACKS.length, 0);
  }

  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) { if (playing) ctx.suspend(); }
    else if (playing) ctx.resume();
  });

  /* ---------- интерфейс ---------- */
  const $m = id => document.getElementById(id);
  function paintTrack() {
    const el = $m('musicTrack'); if (!el) return;
    el.textContent = playing ? `${cur + 1}/${TRACKS.length} ${TRACKS[cur].name}` : '';
  }
function paintUI() {
  const btn = $m('musicToggle'); if (!btn) return;
  const on = wanted;
  btn.classList.toggle('is-muted', !on);
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  btn.querySelector('.mus-label').textContent = on ? 'МУЗЫКА: ВКЛ' : 'МУЗЫКА: ВЫКЛ';

  // Трек и переключатель следующего трека — только когда музыка играет
  ['musicNext', 'musicTrack'].forEach(id => {
    const el = $m(id); if (el) el.hidden = !on;
  });

  // Микшер: полностью прячем, если музыка выключена.
  // Если включена — оставляем в DOM, но виден он только по hover / is-open.
  const volWrap = $m('musicVolumeWrap');
  if (volWrap) {
    if (!on) {
      volWrap.classList.remove('is-open');
      volWrap.hidden = true;
    } else {
      volWrap.hidden = false;
    }
  }
  paintTrack();
}

  function setVolume(v) {
    level = Math.max(0, Math.min(100, Number(v) || 0));
    if (master) master.gain.setTargetAtTime(vol(), ctx.currentTime, 0.02);
  }

function init() {
  const gate = $m('musicGate');
  $m('musicToggle').addEventListener('click', () => { wanted ? stop() : start(); });
  $m('musicNext').addEventListener('click', next);

  // ---------- микшер: hover + таймер 4 сек ----------
  const group   = $m('musicGroup');
  const volWrap = $m('musicVolumeWrap');
  const slider  = $m('musicVolume');
  const num     = $m('musicVolNum');
  let hoverTimer = null;

  const showVolume = () => {
    clearTimeout(hoverTimer);
    if (wanted && volWrap) volWrap.classList.add('is-open');
  };
  const scheduleHide = () => {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      if (volWrap) volWrap.classList.remove('is-open');
    }, 4000);
  };

  if (group) {
    group.addEventListener('mouseenter', showVolume);
    group.addEventListener('mouseleave', scheduleHide);
    // На случай, если курсор уже был на элементе при загрузке
    group.addEventListener('focusin',  showVolume);
    group.addEventListener('focusout', scheduleHide);
  }

  slider.value = level;
  num.textContent = level;
  slider.addEventListener('input', () => {
    setVolume(slider.value);
    num.textContent = level;
    // Пока пользователь двигает ползунок — держим его видимым
    showVolume();
  });
  // Пока ползунок в фокусе/активен — не скрываем
  slider.addEventListener('mousedown', showVolume);
  slider.addEventListener('mouseup',   scheduleHide);

  // ---------- гейт "Включить музыку?" ----------
  const hide = () => { gate.hidden = true; document.body.classList.remove('music-gate-open'); };
  $m('musicYes').addEventListener('click', () => { hide(); start(); });
  $m('musicNo').addEventListener('click',  () => { hide(); paintUI(); });
  gate.hidden = false;
  document.body.classList.add('music-gate-open');
  $m('musicYes').focus();
  paintUI();
}

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  return { start, stop, next, setVolume, isOn: () => wanted };
})();
