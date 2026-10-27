/* ============================================================
   UNITED FURRY CON — ФОНОВАЯ МУЗЫКА
   3 трека, синтезируются прямо в браузере (Web Audio), файлов нет.
   Трек 3 «поёт» текст через встроенный синтезатор речи браузера.
   Выбор «музыка вкл/выкл» хранится в cookie ufc_music.
   ============================================================ */
const MUSIC = (() => {
  const COOKIE = 'ufc_music';
  const VOLUME = 0.34;
  const LOOKAHEAD = 0.16;               // сек. вперёд планируем ноты

  /* ---------- настройка треков ---------- */
  const P = s => s.trim().split(/\s+/).map(x => x === '.' ? null : x === '~' ? '~' : Number(x));
  const rep = (s, n) => Array(n).fill(s);

  // lead: по строке на такт (16 шестнадцатых). число = полутонов от lead root, '.' пауза, '~' продолжение ноты
  const TRACKS = [
    {
      name: 'ARCADE RUSH', bpm: 150, loops: 4,
      leadRoot: 69, bassBase: 45, arpBase: 57,
      chords: [[0, 'm'], [-4, 'M'], [3, 'M'], [-2, 'M']],
      lead: [
        '12 ~ . 7 3 . 7 . 12 ~ 10 7 3 . . .',
        '8 . 12 . 15 ~ 12 . 8 . 12 . 10 ~ . .',
        '15 ~ 12 . 10 . 12 . 15 ~ 17 ~ 15 . 12 .',
        '14 . 10 . 14 . 17 . 19 ~ ~ ~ 17 . 14 .',
        '12 ~ 15 ~ 12 . 7 . 12 ~ 15 ~ 19 ~ 15 .',
        '20 ~ . 17 ~ . 15 . 12 ~ . 15 . 17 . .',
        '19 ~ 15 . 19 ~ 22 ~ 19 . 15 . 12 . 15 .',
        '17 . 14 . 10 . 14 . 17 ~ ~ . 14 ~ 10 ~'
      ],
      leadVoice: { duty: 0.25, vol: 0.07, vib: 0.6 },
      bass: '0 . 0 . 12 . 0 . 0 . 0 . 12 . 0 .',
      bassVoice: { type: 'triangle', vol: 0.30 },
      arp: { duty: 0.125, vol: 0.028, pattern: [0, 1, 2, 3, 2, 1, 2, 3] },
      drums: { k: 'x...x...x...x..x', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.', o: '..............x.' }
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
      name: 'UFC 2 THEME', bpm: 126, loops: 2,
      leadRoot: 72, bassBase: 36, arpBase: 60,
      chords: [[0, 'M'], [7, 'M'], [9, 'm'], [5, 'M']],
      lead: [
        // такты 0-7: мелодия «стелется», чтобы был слышен вокал
        ...rep('7 ~ ~ ~ ~ ~ ~ ~ 4 ~ ~ ~ ~ ~ ~ ~', 1),
        '7 ~ ~ ~ ~ ~ ~ ~ 2 ~ ~ ~ ~ ~ ~ ~',
        '4 ~ ~ ~ ~ ~ ~ ~ 9 ~ ~ ~ ~ ~ ~ ~',
        '5 ~ ~ ~ ~ ~ ~ ~ 9 ~ ~ ~ ~ ~ ~ ~',
        '7 ~ ~ ~ ~ ~ ~ ~ 4 ~ ~ ~ ~ ~ ~ ~',
        '7 ~ ~ ~ ~ ~ ~ ~ 2 ~ ~ ~ ~ ~ ~ ~',
        '4 ~ ~ ~ ~ ~ ~ ~ 9 ~ ~ ~ ~ ~ ~ ~',
        '5 ~ ~ ~ ~ ~ ~ ~ 9 ~ ~ ~ ~ ~ ~ ~',
        // такты 8-15: главный хук
        '4 . 7 . 12 ~ 7 . 4 . 7 . 9 ~ 7 .',
        '11 ~ 7 . 11 . 14 ~ ~ ~ 11 . 7 . 2 .',
        '12 ~ 9 . 12 . 16 ~ 14 . 12 . 9 ~ 4 .',
        '12 . 9 . 5 . 9 . 12 ~ ~ ~ 14 ~ 12 ~',
        '4 . 7 . 12 ~ 7 . 4 . 7 . 9 ~ 7 .',
        '11 ~ 7 . 11 . 14 ~ ~ ~ 11 . 7 . 2 .',
        '12 ~ 9 . 12 . 16 ~ 14 . 12 . 9 ~ 4 .',
        '12 ~ 9 . 12 ~ 14 . 17 ~ ~ ~ 19 ~ ~ ~'
      ],
      leadVoice: { type: 'square', vol: 0.05, vib: 0.8 },
      bass: '0 . 0 . 12 . 0 . 0 . 0 . 12 . 0 .',
      bassVoice: { type: 'triangle', vol: 0.30 },
      arp: { duty: 0.25, vol: 0.022, pattern: [0, 2, 1, 3, 2, 3, 1, 2] },
      pad: { vol: 0.018 },
      drums: { k: 'x...x...x...x...', s: '....x.......x...', h: '..x...x...x...x.', o: '..............x.' },
      // Текст песни. Больше никаких слов в треке нет.
      vocal: [
        { bar: 0,  step: 0, text: 'о даааа',                    lang: 'ru-RU', pitch: 1.5, rate: 0.62 },
        { bar: 1,  step: 0, text: 'United Furry Con two',       lang: 'en-US', pitch: 1.3, rate: 0.95 },
        { bar: 2,  step: 0, text: 'это очень крутааааа',        lang: 'ru-RU', pitch: 1.35, rate: 0.7 },
        { bar: 4,  step: 0, text: 'о даааа',                    lang: 'ru-RU', pitch: 1.5, rate: 0.62 },
        { bar: 5,  step: 0, text: 'эта песня от Орандисааа',    lang: 'ru-RU', pitch: 1.3, rate: 0.72 },
        { bar: 8,  step: 0, text: 'ля',                         lang: 'ru-RU', pitch: 1.2, rate: 0.9 },
        { bar: 8,  step: 4, text: 'ля',                         lang: 'ru-RU', pitch: 1.4, rate: 0.9 },
        { bar: 8,  step: 8, text: 'ляяя',                       lang: 'ru-RU', pitch: 1.6, rate: 0.8 },
        { bar: 12, step: 0, text: 'ля',                         lang: 'ru-RU', pitch: 1.2, rate: 0.9 },
        { bar: 12, step: 4, text: 'ля',                         lang: 'ru-RU', pitch: 1.4, rate: 0.9 },
        { bar: 12, step: 8, text: 'ляяя',                       lang: 'ru-RU', pitch: 1.6, rate: 0.8 }
      ]
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
  const timeouts = new Set();
  const pulseCache = {};
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

  /* ---------- cookie ---------- */
  function readPref() {
    const m = document.cookie.match(new RegExp('(?:^|; )' + COOKIE + '=(on|off)'));
    if (m) return m[1];
    try { const v = localStorage.getItem(COOKIE); if (v === 'on' || v === 'off') return v; } catch (e) {}
    return null;
  }
  function writePref(v) {
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = COOKIE + '=' + v + '; max-age=31536000; path=/; SameSite=Lax' + secure;
    try { localStorage.setItem(COOKIE, v); } catch (e) {}   // запасной вариант (например, при открытии файла с диска)
  }

  /* ---------- аудио-движок ---------- */
  function initCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = VOLUME;
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

  /* ---------- речь («вокал») ---------- */
  let voices = [];
  function loadVoices() { try { voices = window.speechSynthesis.getVoices() || []; } catch (e) {} }
  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  function pickVoice(lang) {
    const pre = lang.slice(0, 2).toLowerCase();
    const list = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith(pre));
    return list.find(v => /google|milena|yuri|siri|natural/i.test(v.name)) || list[0] || null;
  }
  function sing(ev, t) {
    if (!('speechSynthesis' in window)) return;
    const ms = Math.max(0, (t - ctx.currentTime) * 1000 - 70);
    const id = setTimeout(() => {
      timeouts.delete(id);
      if (!playing) return;
      try {
        const synth = window.speechSynthesis;
        if (synth.speaking) synth.cancel();
        const u = new SpeechSynthesisUtterance(ev.text);
        u.lang = ev.lang; u.pitch = ev.pitch; u.rate = ev.rate; u.volume = 0.85;
        const v = pickVoice(ev.lang); if (v) u.voice = v;
        synth.speak(u);
      } catch (e) {}
    }, ms);
    timeouts.add(id);
  }
  function silenceSpeech() {
    timeouts.forEach(clearTimeout); timeouts.clear();
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
  }

  /* ---------- секвенсор ---------- */
  function playStep(T, s, t) {
    const bar = Math.floor(s / 16), st = s % 16;
    const sd = 60 / T.bpm / 4;                       // длина шестнадцатой
    const [croot, cq] = T.chords[bar % T.chords.length];
    const tones = cq === 'm' ? [0, 3, 7, 12] : [0, 4, 7, 12];

    // соло
    const tk = T.leadP[bar][st];
    if (tk !== null && tk !== '~') {
      let len = 1;
      while (st + len < 16 && T.leadP[bar][st + len] === '~') len++;
      tone({ ...T.leadVoice, f: mtof(T.leadRoot + tk), t, dur: len * sd * 0.94, dest: leadBus, rel: 0.07 });
    }
    // бас
    const bv = T.bassP[st];
    if (bv !== null) tone({ ...T.bassVoice, f: mtof(T.bassBase + croot + bv), t, dur: sd * 1.7, att: 0.004, rel: 0.05 });
    // арпеджио
    if (T.arp) {
      const idx = T.arp.pattern[st % T.arp.pattern.length];
      tone({ duty: T.arp.duty, vol: T.arp.vol, f: mtof(T.arpBase + croot + 12 + tones[idx]), t, dur: sd * 0.8, rel: 0.03 });
    }
    // пэд
    if (T.pad && st === 0) {
      [0, 1, 2].forEach(i => tone({
        type: 'sawtooth', vol: T.pad.vol, f: mtof(T.arpBase + croot + 12 + tones[i]), t, dur: sd * 15,
        att: 0.25, rel: 0.4, lp: 1100
      }));
    }
    // ударные
    const D = T.drums;
    if (D.k[st] === 'x') kick(t);
    const fill = bar % 8 === 7 && st >= 12;          // сбивка в конце фразы
    if (D.s[st] === 'x' || fill) snare(t);
    if (D.o[st] === 'x') hat(t, true, false);
    else if (D.h[st] === 'x') hat(t, false, st % 2 === 1 && D.h === 'xxxxxxxxxxxxxxxx');

    // текст
    if (T.vocal) T.vocal.forEach(ev => { if (ev.bar === bar && ev.step === st) sing(ev, t); });
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
    silenceSpeech();
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
      master.gain.setValueAtTime(VOLUME, ctx.currentTime);
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
    silenceSpeech();
    teardownGraph(0.2);
    paintUI();
  }
  function next() {
    if (!ctx || !playing) return;
    goTo((cur + 1) % TRACKS.length, 0);
  }

  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) { silenceSpeech(); if (playing) ctx.suspend(); }
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
    const nx = $m('musicNext'); if (nx) nx.hidden = !on;
    const tr = $m('musicTrack'); if (tr) tr.hidden = !on;
    paintTrack();
  }

  function init() {
    const gate = $m('musicGate');
    const pref = readPref();

    $m('musicToggle').addEventListener('click', () => {
      if (wanted) { writePref('off'); stop(); }
      else { writePref('on'); start(); }
    });
    $m('musicNext').addEventListener('click', next);

    const hide = () => { gate.hidden = true; document.body.classList.remove('music-gate-open'); };
    $m('musicYes').addEventListener('click', () => { writePref('on'); hide(); start(); });
    $m('musicNo').addEventListener('click', () => { writePref('off'); hide(); paintUI(); });

    if (pref === null) {
      // первый визит - спрашиваем
      gate.hidden = false;
      document.body.classList.add('music-gate-open');
      $m('musicYes').focus();
      paintUI();
    } else if (pref === 'on') {
      // браузеры не дают играть звук без клика - стартуем на первом действии
      wanted = true; paintUI();
      const el = $m('musicTrack');
      if (el) { el.hidden = false; el.textContent = 'нажми куда угодно'; }
      const kick = () => {
        ['pointerdown', 'keydown', 'touchstart'].forEach(ev => window.removeEventListener(ev, kick));
        if (wanted && !playing) start();
      };
      ['pointerdown', 'keydown', 'touchstart'].forEach(ev => window.addEventListener(ev, kick, { passive: true }));
    } else {
      paintUI();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  return { start, stop, next, isOn: () => wanted };
})();
