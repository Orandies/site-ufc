
const BALANCE = {
  rival: { hp: 300, dmg: 6, cooldown: 2000, dodge: 0.05 },  // соперник: здоровье, урон, пауза между ударами (мс), шанс уклонения
  hero:  { cooldown: 900 },                                 // пауза между обычными ударами при СКОРОСТИ 100 (мс)
  dodgePerAgi: 0.004,                                       // уклонение бойца = 5% + (ЛОВКОСТЬ − 100) × 0.4%
  energy: { max: 100, perDealt: 1.5, perTaken: 1 },         // шкала ульты: энергии за нанесённый / полученный урон

  // Прямой урон ульты при УРОНЕ бойца = 10. Растёт пропорционально характеристике УРОН.
  ultDirect: { damage: 40, stun: 20, knockback: 20, vampire: 30, slow: 20, dot: 10, steal: 25 },

  stun:      { ms: 1500 },                                  // оглушение
  slow:      { ms: 4000, factor: 0.5 },                     // замедление: скорость врага ×0.5
  dot:       { ticks: 8, everyMs: 500, tick: 4 },           // урон со временем: 8 тиков по 0.5 сек = 4 сек
  steal:     { ms: 5000, bonus: 0.3 },                      // кража силы: урон бойца +30%
  vampire:   { heal: 20 },                                  // вампиризм
  knockback: { downMs: 1400 }                               // отбрасывание: столько враг возвращается и не бьёт
};

let A = { ready: false };            // ссылки на элементы арены
let fight = null;                    // текущий бой
let tokenCounter = 0, sigStats = '', aiOn = true, lastFrame = 0, lastChips = '';
const NEUTRAL = { key: 'cyber', color: '#fff3b0', core: '#ffffff' };
const FX_COLORS = { damage: '#ff5a5f', stun: '#ffd23f', knockback: '#57d7ff', vampire: '#7ce38b', slow: '#57d7ff', dot: '#ff6b2c', steal: '#ff9d3c' };

const alive = t => !!fight && t === fight.token;
const setPose = (el, pose, side) => { el.querySelector('.sprite').innerHTML = fighterSVG(pose, side); };

function makeFight(calc) {
  return {
    token: ++tokenCounter, active: false, over: false, energy: 0, calc,
    hero:  { hp: calc.hp, max: calc.hp, cd: 0, steal: 0, busy: false, dead: false, poseTimer: 0 },
    rival: { hp: BALANCE.rival.hp, max: BALANCE.rival.hp, cd: 0, stun: 0, slow: 0, down: 0,
             dotLeft: 0, dotNext: 0, dotDmg: 0, attacking: false, dead: false, poseTimer: 0 }
  };
}

function initArena() {
  A = {
    ready: true,
    arena: $('arena'), f1: $('f1'), f2: $('f2'), vfx: $('vfx'), pop: $('pop'), status: $('arenaStatus'),
    hp1: $('hp1'), hp2: $('hp2'), hpNum1: $('hpNum1'), hpNum2: $('hpNum2'), fx1: $('fx1'), fx2: $('fx2'),
    meter: $('meter'), meterFill: $('meterFill'), meterMark: $('meterMark'), superNow: $('superNow'), superCost: $('superCost'),
    btnHit: $('btnHit'), btnUlt: $('btnUlt'), btnCharge: $('btnCharge'), btnRestart: $('btnRestart')
  };

  A.btnHit.addEventListener('click', () => heroAttack());
  A.btnUlt.addEventListener('click', () => heroUlt());
  A.btnCharge.addEventListener('click', () => chargeMeter());
  A.btnRestart.addEventListener('click', () => { SFX.click(); newFight(); });
  $('aiToggle').addEventListener('change', e => {
    aiOn = e.target.checked;
    SFX.click();
    if (aiOn && fight && fight.active) fight.rival.cd = Math.max(fight.rival.cd, 1200);
  });

  document.addEventListener('keydown', e => {
    if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code !== 'KeyZ' && e.code !== 'KeyX') return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (['input', 'textarea', 'select'].includes(tag) || e.target.isContentEditable) return;
    const r = A.arena.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;        // арена не на экране
    e.preventDefault();
    if (e.code === 'KeyZ') heroAttack(); else heroUlt();
  });

  lastFrame = performance.now();
  requestAnimationFrame(tick);
  newFight();
}

function updateMeter() {
  if (!A.ready) return;
  const sig = JSON.stringify(calculateStats());
  if (sig !== sigStats) newFight(); else { updateArenaInfo(); updateHud(); }
}

function refreshHeroPose() {
  if (A.ready && fight && !fight.hero.busy) restoreHeroPose();
}

/* ============================================================
   НОВЫЙ БОЙ
   ============================================================ */
function newFight() {
  SFX.cut();
  const calc = calculateStats();
  fight = makeFight(calc);
  sigStats = JSON.stringify(calc);
  lastChips = '';

  const { f1, f2, vfx, pop, arena } = A;
  vfx.innerHTML = '';
  pop.className = 'pop';
  arena.classList.remove('shake');
  f1.className = 'fighter f1';
  f2.className = 'fighter f2';
  f1.removeAttribute('style');
  f2.removeAttribute('style');
  A.btnRestart.classList.remove('pulse');

  restoreHeroPose();
  setPose(f2, 'guard', 'rival');
  setStatus('ЖМИ «УДАР» (Z). УЛЬТА - ПОСЛЕ НАБОРА ЭНЕРГИИ');
  updateArenaInfo();
  updateHud();
  updateChips();
}

function startFight() {
  if (fight.active) return;
  fight.active = true;
  fight.rival.cd = 1600;               
  setStatus('БОЙ!');
}

const setStatus = text => { A.status.textContent = text; };

/* ============================================================
   ОПИСАНИЕ ЭФФЕКТОВ - с реальными числами текущего билда
   ============================================================ */
function effectText(key) {
  const calc = (fight && fight.calc) || calculateStats();
  const m = calc.dmg / 10;
  const d = Math.round(BALANCE.ultDirect[key] * m);
  const sec = ms => String(ms / 1000);
  switch (key) {
    case 'damage':    return `Прямой урон ${d}.`;
    case 'stun':      return `Урон ${d}. Враг не может действовать ${sec(BALANCE.stun.ms)} сек.`;
    case 'knockback': return `Урон ${d}. Врага отбрасывает к краю: ${sec(BALANCE.knockback.downMs)} сек он возвращается и не бьёт.`;
    case 'vampire':   return `Урон ${d}. Боец лечится на ${BALANCE.vampire.heal} HP.`;
    case 'slow':      return `Урон ${d}. Скорость врага −${Math.round((1 - BALANCE.slow.factor) * 100)}% на ${sec(BALANCE.slow.ms)} сек: он бьёт реже.`;
    case 'dot': {
      const tick = Math.max(1, Math.round(BALANCE.dot.tick * m));
      return `Урон ${d}, затем ${tick} урона каждые ${sec(BALANCE.dot.everyMs)} сек в течение ${sec(BALANCE.dot.ticks * BALANCE.dot.everyMs)} сек (всего ${tick * BALANCE.dot.ticks}).`;
    }
    case 'steal':     return `Урон ${d}. Урон бойца +${Math.round(BALANCE.steal.bonus * 100)}% на ${sec(BALANCE.steal.ms)} сек.`;
    default:          return '';
  }
}

function updateArenaInfo() {
  const t = currentType(), e = currentEffect(), el = currentElement();
  $('arenaDesc').innerHTML = `<b>${t.name} / ${el.name}:</b> ${t.desc} <b>${e.name}:</b> ${effectText(e.key)}`;
  syncElementUI();
}

/* ============================================================
   ВИЗУАЛ: позиции, всплывающие числа, HUD
   ============================================================ */
function geometry() {
  const a = A.arena.getBoundingClientRect(), r1 = A.f1.getBoundingClientRect(), r2 = A.f2.getBoundingClientRect();
  const ground = a.height - 36;
  return {
    A: a, ground, width: r1.width,
    x1: r1.left - a.left + r1.width / 2,
    x2: r2.left - a.left + r2.width / 2,
    top1: ground - r1.height, top2: ground - r2.height
  };
}

function spawn(html, cls, x, y, extra = '', ttl = 1500) {
  const el = document.createElement('div');
  el.className = 'vfx-piece ' + cls;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  if (extra) el.style.cssText += ';' + extra;
  el.innerHTML = html;
  A.vfx.appendChild(el);
  if (ttl) setTimeout(() => el.remove(), ttl);
  return el;
}

const floatText = (text, x, y, color, big) => spawn(text, 'dmg-num' + (big ? ' big' : ''), x, y, `--c:${color}`);

function fpos(el) {
  const a = A.arena.getBoundingClientRect(), r = el.getBoundingClientRect();
  return { x: r.left - a.left + r.width / 2, top: r.top - a.top };
}

function flash(el) {
  el.classList.remove('hurt-flash');
  void el.offsetWidth;
  el.classList.add('hurt-flash');
}

function showPop(text, color) {
  A.pop.textContent = text;
  A.pop.style.color = color;
  A.pop.classList.remove('show');
  void A.pop.offsetWidth;
  A.pop.classList.add('show');
}

function setBar(bar, ratio, hero) {
  bar.style.width = Math.max(0, Math.min(100, ratio * 100)) + '%';
  if (hero) {
    bar.classList.toggle('low', ratio <= 0.5 && ratio > 0.25);
    bar.classList.toggle('crit', ratio <= 0.25);
  }
}

function updateHud() {
  if (!fight) return;
  const { hero, rival, calc } = fight;
  setBar(A.hp1, hero.hp / hero.max, true);
  setBar(A.hp2, rival.hp / rival.max, false);
  A.hpNum1.textContent = `${Math.ceil(hero.hp)}/${hero.max}`;
  A.hpNum2.textContent = `${Math.ceil(rival.hp)}/${rival.max}`;

  const cost = calc.charge, e = fight.energy;
  A.meterFill.style.width = Math.min(100, e / BALANCE.energy.max * 100) + '%';
  A.meterMark.style.left = (cost / BALANCE.energy.max * 100) + '%';
  A.superNow.textContent = Math.floor(e);
  A.superCost.textContent = cost;
  updateButtons();
}

function updateButtons() {
  if (!fight) return;
  const { hero } = fight, ready = fight.energy >= fight.calc.charge;
  A.meter.classList.toggle('is-ready', ready);
  A.btnHit.disabled = fight.over;
  A.btnHit.classList.toggle('on-cd', hero.cd > 0 && !fight.over);
  A.btnUlt.disabled = !ready || hero.busy || fight.over;
  A.btnUlt.classList.toggle('is-ready', ready && !hero.busy && !fight.over);
  A.btnUlt.title = ready ? 'Ультимейт готов (X)' : `Нужно ${fight.calc.charge} энергии`;
}

function updateChips() {
  if (!fight) return;
  const { hero, rival } = fight;
  const t = ms => (ms / 1000).toFixed(1);
  const chip = (label, ms, c) => `<span class="fx-chip" style="--c:${c}">${label} ${t(ms)}</span>`;

  const heroChips = hero.steal > 0 ? chip('+УРОН', hero.steal, '#ff9d3c') : '';
  const rivalChips = [
    rival.stun > 0 ? chip('СТАН', rival.stun, '#ffd23f') : '',
    rival.slow > 0 ? chip('СЛОУ', rival.slow, '#57d7ff') : '',
    rival.down > 0 ? chip('ОТБРОС', rival.down, '#c9d4ef') : '',
    rival.dotLeft > 0 ? `<span class="fx-chip" style="--c:#ff6b2c">ГОРИТ ×${rival.dotLeft}</span>` : ''
  ].join('');

  const sig = heroChips + '|' + rivalChips;
  if (sig === lastChips) return;
  lastChips = sig;
  A.fx1.innerHTML = heroChips;
  A.fx2.innerHTML = rivalChips;
}

/* ============================================================
   ПОЗЫ
   ============================================================ */
function restoreHeroPose() {
  const c = currentAnimationClass();
  setPose(A.f1, fight && fight.hero.dead ? 'hurt' : (c ? c.pose : 'idle'), 'hero');
}

function restoreRivalPose() {
  const r = fight.rival;
  setPose(A.f2, (r.dead || r.stun > 0 || r.down > 0) ? 'hurt' : 'guard', 'rival');
}

function heroHurtPose() {
  const h = fight.hero, token = fight.token;
  if (h.busy || h.dead) return;
  setPose(A.f1, 'hurt', 'hero');
  clearTimeout(h.poseTimer);
  h.poseTimer = setTimeout(() => { if (alive(token) && !h.busy && !h.dead) restoreHeroPose(); }, 230);
}

function rivalHurtPose() {
  const r = fight.rival, token = fight.token;
  if (r.dead) return;
  setPose(A.f2, 'hurt', 'rival');
  clearTimeout(r.poseTimer);
  r.poseTimer = setTimeout(() => { if (alive(token) && !r.attacking) restoreRivalPose(); }, 260);
}

/* ============================================================
   УРОН, ЭНЕРГИЯ, СМЕРТЬ
   ============================================================ */
const heroCooldown = () => BALANCE.hero.cooldown * 100 / Math.max(50, fight.calc.spd);
const dmgMult = () => fight.calc.dmg / 10 * (fight.hero.steal > 0 ? 1 + BALANCE.steal.bonus : 1);
const basicDamage = () => fight.calc.dmg * (fight.hero.steal > 0 ? 1 + BALANCE.steal.bonus : 1);

function addEnergy(n) {
  const f = fight, before = f.energy, cost = f.calc.charge;
  f.energy = Math.min(BALANCE.energy.max, f.energy + n);
  if (before < cost && f.energy >= cost) {
    SFX.ready();
    if (!f.over) setStatus('УЛЬТА ГОТОВА! (X)');
  }
}

function dealToRival(raw, opt = {}) {
  const f = fight, r = f.rival;
  if (f.over || r.dead) return 0;
  const dmg = Math.max(1, Math.round(raw));
  const applied = Math.min(r.hp, dmg);
  r.hp -= applied;

  const p = fpos(A.f2);
  floatText('-' + dmg, p.x, p.top - 4, opt.color || '#ffffff', opt.big);
  if (!opt.noFlash) flash(A.f2);
  if (!opt.noPose) rivalHurtPose();
  if (r.hp <= 0) koRival();
  updateHud();
  return applied;
}

function dealToHero(raw) {
  const f = fight, h = f.hero;
  if (f.over || h.dead) return 0;
  const dmg = Math.max(1, Math.round(raw));
  const applied = Math.min(h.hp, dmg);
  h.hp -= applied;

  const p = fpos(A.f1);
  floatText('-' + dmg, p.x, p.top - 4, '#ff5a5f');
  flash(A.f1);
  heroHurtPose();
  addEnergy(applied * BALANCE.energy.perTaken);
  if (h.hp <= 0) koHero();
  updateHud();
  return applied;
}

function endStatuses() {
  const r = fight.rival, h = fight.hero;
  r.stun = r.slow = r.down = r.dotLeft = 0;
  h.steal = 0;
  A.f2.classList.remove('is-stunned', 'is-slowed', 'is-burning', 'knocked', 'atk', 'is-acting');
  A.f1.classList.remove('is-buffed');
}

function koRival() {
  const f = fight, r = f.rival;
  r.dead = true; f.over = true;
  endStatuses();
  A.f2.classList.add('ko');
  setPose(A.f2, 'hurt', 'rival');
  const p = fpos(A.f2);
  sparks(p.x, p.top + 55, currentElement(), 14);
  A.arena.classList.remove('shake'); void A.arena.offsetWidth; A.arena.classList.add('shake');
  showPop('K.O.!', '#ffd23f');
  setStatus('K.O.! ПОБЕДА. НАЖМИ «НОВЫЙ БОЙ»');
  SFX.ko();
  A.btnRestart.classList.add('pulse');
}

function koHero() {
  const f = fight, h = f.hero;
  h.dead = true; f.over = true;
  endStatuses();
  A.f1.classList.add('ko');
  setPose(A.f1, 'hurt', 'hero');
  showPop('K.O.', '#ff5a5f');
  setStatus('ПОРАЖЕНИЕ. НАЖМИ «НОВЫЙ БОЙ»');
  SFX.lose();
  A.btnRestart.classList.add('pulse');
}

/* ============================================================
   ОБЫЧНЫЙ УДАР БОЙЦА
   ============================================================ */
async function heroAttack() {
  const f = fight;
  if (!f || f.over || f.hero.busy || f.hero.cd > 0) return;
  startFight();
  const token = f.token, h = f.hero, c = currentAnimationClass();
  h.busy = true;
  h.cd = heroCooldown();

  const g = geometry();
  A.f1.style.setProperty('--reach', Math.max(30, g.x2 - g.x1 - g.width * 0.55) + 'px');
  A.f1.classList.add('is-acting', 'atk');
  setPose(A.f1, c ? c.attackPose : 'brawler_attack', 'hero');
  SFX.classAttack(c ? c.key : 'brawler');
  updateButtons();

  try {
    await sleep(130); if (!alive(token)) return;
    if (!f.over) heroHit();
    await sleep(200); if (!alive(token)) return;
  } finally {
    if (alive(token)) {
      A.f1.classList.remove('atk', 'is-acting');
      h.busy = false;
      restoreHeroPose();
      updateButtons();
    }
  }
}

function heroHit() {
  const r = fight.rival;
  if (r.dead) return;
  const p = fpos(A.f2);
  if (Math.random() < BALANCE.rival.dodge) {
    floatText('MISS', p.x, p.top - 4, '#57d7ff');
    SFX.miss();
    return;
  }
  const dealt = dealToRival(basicDamage());
  addEnergy(dealt * BALANCE.energy.perDealt);
  sparks(p.x, p.top + 55, NEUTRAL, 5);
  SFX.punch(1);
  updateHud();
}

/* ============================================================
   УДАРЫ СОПЕРНИКА
   ============================================================ */
function canRivalAct() {
  const f = fight, r = f.rival;
  return f.active && !f.over && !r.dead && !f.hero.dead && !r.attacking && r.stun <= 0 && r.down <= 0;
}

async function rivalAttack() {
  const f = fight, r = f.rival, token = f.token;
  const slowed = r.slow > 0;
  r.cd = BALANCE.rival.cooldown * (0.85 + Math.random() * 0.3);
  r.attacking = true;

  const g = geometry();
  A.f2.style.setProperty('--reach', Math.max(30, g.x2 - g.x1 - g.width * 0.55) + 'px');
  A.f2.style.setProperty('--atkdur', (slowed ? 0.64 : 0.32) + 's');
  A.f2.classList.add('is-acting', 'atk');
  setPose(A.f2, 'brawler_attack', 'rival');

  try {
    await sleep(slowed ? 260 : 130); if (!alive(token)) return;
    // Если за время замаха врага оглушили или отбросили, удар срывается
    if (!f.over && !r.dead && r.stun <= 0 && r.down <= 0) rivalHit();
    await sleep(slowed ? 380 : 200); if (!alive(token)) return;
  } finally {
    if (alive(token)) {
      r.attacking = false;
      A.f2.classList.remove('atk', 'is-acting');
      if (!r.dead) restoreRivalPose();
    }
  }
}

function rivalHit() {
  const h = fight.hero;
  if (h.dead) return;
  const dodge = Math.min(0.6, fight.calc.agi / 100); 
  if (Math.random() < dodge) {
    const p = fpos(A.f1);
    floatText('MISS', p.x, p.top - 4, '#57d7ff');
    SFX.miss();
    return;
  }
  SFX.punch(3);
  dealToHero(BALANCE.rival.dmg);
}

/* ============================================================
   ЦИКЛ: таймеры эффектов, ИИ соперника
   ============================================================ */
function tick(now) {
  requestAnimationFrame(tick);
  const dt = Math.min(100, now - lastFrame);
  lastFrame = now;
  if (!fight || !fight.active || fight.over) return;

  const h = fight.hero, r = fight.rival;

  if (h.cd > 0) h.cd = Math.max(0, h.cd - dt);
  if (h.steal > 0) {
    h.steal -= dt;
    if (h.steal <= 0) { h.steal = 0; A.f1.classList.remove('is-buffed'); }
  }
  if (r.stun > 0) {
    r.stun -= dt;
    if (r.stun <= 0) { r.stun = 0; A.f2.classList.remove('is-stunned'); r.cd = Math.max(r.cd, 500); if (!r.attacking) restoreRivalPose(); }
  }
  if (r.slow > 0) {
    r.slow -= dt;
    if (r.slow <= 0) { r.slow = 0; A.f2.classList.remove('is-slowed'); }
  }
  if (r.down > 0) {
    r.down -= dt;
    if (r.down <= 0) { r.down = 0; A.f2.classList.remove('knocked'); r.cd = Math.max(r.cd, 600); if (!r.attacking) restoreRivalPose(); }
  }
  if (r.dotLeft > 0) {
    r.dotNext -= dt;
    while (r.dotNext <= 0 && r.dotLeft > 0) {
      r.dotNext += BALANCE.dot.everyMs;
      r.dotLeft--;
      dotTick();
      if (fight.over) return;
    }
    if (r.dotLeft <= 0) A.f2.classList.remove('is-burning');
  }

  if (aiOn && canRivalAct()) {
    r.cd -= dt * (r.slow > 0 ? BALANCE.slow.factor : 1); 
    if (r.cd <= 0) rivalAttack();
  }

  updateButtons();
  updateChips();
}

function dotTick() {
  const r = fight.rival;
  if (r.dead || fight.over) return;
  dealToRival(r.dotDmg, { color: '#ff6b2c', noPose: true, noFlash: true });
  const p = fpos(A.f2);
  sparks(p.x, p.top + 60, byKey(CONFIG.elements, 'fire'), 3);
  SFX.dotTick();
}

function chargeMeter() {
  if (!fight || fight.over) return;
  fight.energy = BALANCE.energy.max;
  SFX.ready();
  setStatus('ШКАЛА ЗАРЯЖЕНА! ЖМИ «УЛЬТА» (X)');
  updateHud();
}

/* ============================================================
   УЛЬТИМЕЙТ - запускается ТОЛЬКО кнопкой (или клавишей X)
   ============================================================ */
async function heroUlt() {
    const f = fight;
    if (!f || f.over || f.hero.busy) return;
    const cost = f.calc.charge;
    if (f.energy < cost) {
        toast(`Не хватает энергии: ${Math.floor(f.energy)}/${cost}. Бей соперника или нажми «Зарядить шкалу».`, true);
        return;
    }
    startFight();
    f.energy -= cost;
    f.hero.busy = true;
    updateHud();
    const token = f.token, { f1, f2, vfx, arena } = A;
    const t = currentType(), eff = currentEffect(), el = currentElement(), c = currentAnimationClass();
    let teleported = false;
    
    f1.classList.remove('atk');
    f1.removeAttribute('style');
    setStatus(`${t.verb} // ${el.name}`);
    SFX.superStart();
    
    try {
        await sleep(220); if (!alive(token)) return;
        const g = geometry();
        setPose(f1, t.pose, 'hero');
        f1.classList.add('is-acting');
        
        if (t.key === 'dash') {
            f1.style.setProperty('--lunge', Math.max(60, g.x2 - g.x1 - g.width * 0.55) + 'px');
            f1.classList.add('run-dash');
            SFX.dash();
            await sleep(500); if (!alive(token)) return;
            
        } else if (t.key === 'aoe') {
            await sleep(300); if (!alive(token)) return;
            SFX.aoe(el.key);
            spawn(ringSVG(el), 'ring', g.x1, g.ground - 55);
            sparks(g.x1, g.ground - 55, el, 12);
            arena.classList.add('shake');
            await sleep(280); if (!alive(token)) return;
            
        } else if (t.key === 'drop') {
            await sleep(280); if (!alive(token)) return;
            const orb = spawn(`<div class="orb-pulse" style="width:72px;height:72px">${orbSVG(el)}</div>`, 'falling-orb', g.x2, 0, `--fall:${g.ground - 70}px`);
            orb.querySelector('svg').style.cssText = 'width:72px;height:72px';
            SFX.drop();
            await sleep(650); if (!alive(token)) return;
            
        } else if (t.key === 'charge') {
            await sleep(300); if (!alive(token)) return;
            const beam = document.createElement('div');
            beam.className = 'beam';
            beam.style.cssText = `left:${g.x1 + 24}px;top:${g.ground - 66}px;width:${Math.max(60, g.x2 - g.x1 - 30)}px;--el:${el.color};--core:${el.core}`;
            vfx.appendChild(beam);
            setTimeout(() => beam.remove(), 1200);
            SFX.beam();
            await sleep(420); if (!alive(token)) return;
            
        } else if (t.key === 'teleport') {
            teleported = true;
            f1.classList.add('is-vanished');
            SFX.teleportOut();
            await sleep(300); if (!alive(token)) return;
            
            f1.classList.remove('is-vanished');
            f1.classList.add('is-teleported');
            SFX.teleportIn();
            
            await sleep(500); if (!alive(token)) return;
            
            setPose(f1, 'brawler_attack', 'hero');
            SFX.punch(1);
            await sleep(400); if (!alive(token)) return;
            
        } else if (t.key === 'flurry') {
            f1.style.transition = 'transform 0.3s steps(6)';
            f1.style.transform = 'translateX(500px)';
            await sleep(350); if (!alive(token)) return;
            setPose(f1, 'flurry', 'hero');
            for (let i = 0; i < 5; i++) {
                if (!alive(token)) return;
                f1.style.transform = `translateX(${500 + (i % 4 === 0 ? 20 : -20)}px)`;
                SFX.punch(i);
                flash(f2);
                const p2 = fpos(f2);
                sparks(p2.x, p2.top + 30, el, 4);
                
                await sleep(120);
            }
            await sleep(200); if (!alive(token)) return;
            
        } else if (t.key === 'uppercut') {
            f1.style.transition = 'transform 0.3s steps(6)';
            f1.style.transform = 'translateX(500px)';
            await sleep(350); if (!alive(token)) return;            
            setPose(f1, 'uppercut', 'hero');
            if (eff.key === 'knockback') {
                f2.classList.add('knocked');
                f2.style.setProperty('--knock', Math.min(90, g.A.width * 0.1) + 'px');
            }
            f2.classList.add('uppercut-toss');
            SFX.uppercut();
            await sleep(500);
            f2.classList.remove('uppercut-toss');
            if (!alive(token)) return;
        }
        
        if (c && t.key !== 'teleport') {
            setPose(f1, c.attackPose, 'hero');
            SFX.classAttack(c.key);
            await sleep(280); if (!alive(token)) return;
        }
        
        if (teleported) {
            f1.classList.remove('is-teleported');
            await sleep(260); if (!alive(token)) return;
        }
        
        f1.classList.remove('is-acting', 'run-dash');
        if (!f.over && !f.rival.dead) ultImpact(eff, el);
        await sleep(750); if (!alive(token)) return;
        
    } finally {
        if (alive(token)) {
            f1.classList.remove('is-acting', 'run-dash', 'is-teleported', 'is-vanished');
            f1.removeAttribute('style');
            arena.classList.remove('shake');
            f.hero.busy = false;
            f.hero.cd = Math.max(f.hero.cd, 300);
            restoreHeroPose();
            if (!f.over) setStatus('БОЙ!');
            updateHud();
        }
    }
}

function ultImpact(eff, el) {
  const f = fight, r = f.rival, h = f.hero, { f1, f2, arena } = A;
  const g = geometry();
  const mult = dmgMult();
  const direct = Math.round(BALANCE.ultDirect[eff.key] * mult);

  spawn(burstSVG(el), 'impact', g.x2, g.ground - 68);
  sparks(g.x2, g.ground - 68, el, 10);
  arena.classList.remove('shake'); void arena.offsetWidth; arena.classList.add('shake');
  SFX.impact(el.key, eff.key);

  const dealt = dealToRival(direct, { color: FX_COLORS[eff.key], big: true });
  if (f.over) return;                       

  const color = FX_COLORS[eff.key];
  const p2 = fpos(f2), p1 = fpos(f1);

  switch (eff.key) {
    case 'damage':
      showPop(`-${dealt}`, color);
      break;

    case 'stun':
      r.stun = Math.max(r.stun, BALANCE.stun.ms);
      f2.classList.add('is-stunned');
      setPose(f2, 'hurt', 'rival');
      showPop('STUN!', color);
      break;

    case 'knockback':
      r.down = BALANCE.knockback.downMs;
      f2.style.setProperty('--knock', Math.min(90, g.A.width * 0.1) + 'px');
      f2.classList.add('knocked');
      setPose(f2, 'hurt', 'rival');
      showPop('ОТБРОС', color);
      break;

    case 'vampire': {
      const heal = Math.min(BALANCE.vampire.heal, h.max - h.hp);
      h.hp += heal;
      floatText('+' + heal, p1.x, p1.top - 4, '#7ce38b', true);
      for (let i = 0; i < 3; i++) {
        spawn(`<div style="width:18px;height:18px;background:#7ce38b;clip-path:polygon(35% 0,65% 0,65% 35%,100% 35%,100% 65%,65% 65%,65% 100%,35% 100%,35% 65%,0 65%,0 35%,35% 35%)"></div>`,
          'heal', g.x1 - 20 + i * 20, g.top1 - 6);
      }
      showPop(`+${heal} HP`, color);
      break;
    }

    case 'slow':
      r.slow = BALANCE.slow.ms;
      f2.classList.add('is-slowed');
      showPop('SLOW!', color);
      break;

    case 'dot':
      r.dotLeft = BALANCE.dot.ticks;
      r.dotNext = BALANCE.dot.everyMs;
      r.dotDmg = Math.max(1, Math.round(BALANCE.dot.tick * mult));
      f2.classList.add('is-burning');
      sparks(p2.x, p2.top + 60, byKey(CONFIG.elements, 'fire'), 6);
      showPop('BURN!', color);
      break;

    case 'steal':
      h.steal = BALANCE.steal.ms;
      f1.classList.add('is-buffed');
      for (let i = 0; i < 2; i++) {
        spawn(`<div style="width:20px;height:20px;background:#ff9d3c;clip-path:polygon(50% 0,100% 50%,60% 50%,60% 100%,40% 100%,40% 50%,0 50%)"></div>`,
          'heal', g.x1 - 12 + i * 24, g.top1 - 10);
      }
      showPop('+УРОН', color);
      break;
  }
  updateHud();
  updateChips();
}
