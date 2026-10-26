/* ============================================================
   CONFIG
   ============================================================ */
const CONFIG = {
  bodyTypes: [
    { key:'small',  name:'МАЛЕНЬКИЙ', desc:'Худой, твинк' },
    { key:'medium', name:'СРЕДНИЙ',   desc:'Стандартное телосложение' },
    { key:'large',  name:'КРУПНЫЙ',   desc:'Накаченый гигачад или медведь' }
  ],

  maxTokens: 10,
  maxPerStat: 5,
  minUltEnergy: 50,

  stats: [
    { key:'hp',     label:'ЗДОРОВЬЕ', icon:'heart',   color:'#ff5a5f', base:100, perToken:20,  unit:'',        hint:'+20 HP за жетон' },
    { key:'dmg',    label:'УРОН',     icon:'fist',    color:'#ff9d3c', base:10,  perToken:4,   unit:'',        hint:'+4 урона за жетон' },
    { key:'spd',    label:'СКОРОСТЬ', icon:'boot',    color:'#57d7ff', base:100, perToken:10,  unit:'',        hint:'+10 скорости передвижения за жетон' },
    { key:'agi',    label:'ЛОВКОСТЬ', icon:'agility', color:'#7ce38b', base:5,   perToken:2,   unit:'%',       hint:'+2% к уклонению за жетон' },
    { key:'charge', label:'ЗАРЯД',    icon:'bolt',    color:'#ffd23f', base:100, perToken:-10, unit:' энергии', hint:'-10 энергии для ульты за жетон' }
  ],

  animationClasses: [
    { key:'brawler', name:'БОРЕЦ',     icon:'glove', color:'#ff5a5f', pose:'guard', attackPose:'brawler_attack', desc:'Удары кулаками' },
    { key:'acrobat', name:'ЗВЕРЬ',   icon:'kick',  color:'#57d7ff', pose:'guard', attackPose:'acrobat_attack', desc:'Удары когтями' },
    { key:'weapon',  name:'ОРУЖЕЙНИК', icon:'sword', color:'#c9d4ef', pose:'sword', attackPose:'weapon_attack',  desc:'Удары холодным оружием' }
  ],

  ultTypes: [
    { key:'dash',     name:'Рывок',        pose:'dash',     verb:'РЫВОК',    desc:'Боец срывается с места и бьёт в упор.' },
    { key:'aoe',      name:'Зональный взрыв',   pose:'slam',     verb:'ВЗРЫВ',    desc:'Руки вниз - ударная волна на 360°.' },
    { key:'drop',     name:'Снаряд сверху',     pose:'raise',    verb:'СВЕРХУ',   desc:'Рука вверх - шар падает на противника.' },
    { key:'charge',   name:'Мощный заряд',      pose:'thrust',   verb:'ПРОБОЙ',   desc:'Пробивающий луч по прямой.' },
    { key:'teleport', name:'Телепорт за спину', pose:'teleport', verb:'ТЕЛЕПОРТ', desc:'Исчезает, бьёт со спины и возвращается на место.' },
    { key:'flurry',   name:'Шквал ударов',      pose:'flurry',   verb:'ШКВАЛ',    desc:'Серия из 5 быстрых ударов.' },
    { key:'uppercut', name:'Апперкот',          pose:'uppercut', verb:'АПЕРКОТ',  desc:'Удар снизу, подбрасывает врага.' }
  ],

  ultEffects: [
    { key:'damage',    name:'Усиленый удар',       pop:'-40',    desc:'Массивный урон.' },
    { key:'stun',      name:'Оглушение',         pop:'STUN!',  desc:'Враг обездвижен на 1.5 сек.' },
    { key:'knockback', name:'Отбрасывание',      pop:'ОТБРОС', desc:'Врага отбрасывает к краю.' },
    { key:'vampire',   name:'Вампиризм',         pop:'+20 HP', desc:'Возвращает часть здоровья.' },
    { key:'slow',      name:'Замедление',        pop:'SLOW!',  desc:'Скорость врага -50% на 4 сек.' },
    { key:'dot',       name:'Урон со временем',  pop:'BURN!',  desc:'Урон каждую 0.5 сек на протяжении 4 сек.' },
    { key:'steal',     name:'Кража силы',        pop:'+DMG',   desc:'Урон бойца +30% на 5 сек.' }
  ],

  elements: [
    { key:'fire',      name:'ОГОНЬ',   icon:'fire',   color:'#ff6b2c', core:'#ffd23f' },
    { key:'ice',       name:'ЛЁД',     icon:'ice',    color:'#7fd8ff', core:'#eaf9ff' },
    { key:'lightning', name:'МОЛНИЯ',  icon:'bolt',   color:'#ffe14d', core:'#fff7c2' },
    { key:'cyber',     name:'КИБЕР',   icon:'cyber',  color:'#ff5ad0', core:'#63f0ff' },
    { key:'nature',    name:'ПРИРОДА', icon:'leaf',   color:'#7ce38b', core:'#e6ff9a' },
    { key:'dark',      name:'ТЬМА',    icon:'moon',   color:'#a77bff', core:'#3a2450' },
    { key:'light',     name:'СВЕТ',    icon:'sun',    color:'#fff7a3', core:'#ffffff' },
    { key:'cosmos',    name:'КОСМОС',  icon:'cosmos', color:'#2a1a4a', core:'#6b4fa0' }
  ]
};

/* ============================================================
   ИКОНКИ
   ============================================================ */
const ICONS = {
  heart:`<rect x="3" y="3" width="4" height="3" fill="#ff5a5f"/><rect x="9" y="3" width="4" height="3" fill="#ff5a5f"/><rect x="2" y="5" width="12" height="4" fill="#ff5a5f"/><rect x="3" y="9" width="10" height="3" fill="#e63b4a"/><rect x="5" y="12" width="6" height="2" fill="#e63b4a"/><rect x="7" y="14" width="2" height="1" fill="#e63b4a"/><rect x="4" y="4" width="2" height="2" fill="#ffb3b8"/>`,
  fist:`<rect x="4" y="5" width="9" height="7" fill="#ffb454"/><rect x="4" y="3" width="2" height="4" fill="#ffd08a"/><rect x="7" y="3" width="2" height="4" fill="#ffd08a"/><rect x="10" y="3" width="2" height="4" fill="#ffd08a"/><rect x="2" y="8" width="3" height="4" fill="#ff9d3c"/><rect x="4" y="11" width="9" height="3" fill="#ff5a5f"/>`,
  glove:`<rect x="3" y="3" width="9" height="8" fill="#ff5a5f"/><rect x="3" y="3" width="9" height="2" fill="#ff9a9e"/><rect x="2" y="7" width="3" height="4" fill="#ff9a9e"/><rect x="4" y="11" width="8" height="3" fill="#ffd23f"/>`,
  boot:`<rect x="3" y="3" width="5" height="7" fill="#57d7ff"/><rect x="3" y="3" width="5" height="2" fill="#c9f2ff"/><rect x="3" y="9" width="9" height="4" fill="#2b8fb8"/><rect x="10" y="7" width="4" height="3" fill="#57d7ff"/><rect x="2" y="12" width="12" height="2" fill="#173a4a"/>`,
  kick:`<rect x="2" y="4" width="3" height="2" fill="#e8e8e8"/><rect x="6" y="3" width="3" height="2" fill="#e8e8e8"/><rect x="10" y="4" width="3" height="2" fill="#e8e8e8"/><rect x="1" y="6" width="4" height="3" fill="#a0a0a0"/><rect x="5" y="5" width="4" height="3" fill="#a0a0a0"/><rect x="9" y="6" width="4" height="3" fill="#a0a0a0"/><rect x="3" y="9" width="9" height="3" fill="#ff5a5f"/>`,  agility:`<rect x="2" y="3" width="2" height="2" fill="#7ce38b"/><rect x="4" y="5" width="2" height="2" fill="#7ce38b"/><rect x="6" y="7" width="2" height="2" fill="#7ce38b"/><rect x="4" y="9" width="2" height="2" fill="#7ce38b"/><rect x="2" y="11" width="2" height="2" fill="#7ce38b"/><rect x="8" y="3" width="2" height="2" fill="#c6ff9a"/><rect x="10" y="5" width="2" height="2" fill="#c6ff9a"/><rect x="12" y="7" width="2" height="2" fill="#c6ff9a"/><rect x="10" y="9" width="2" height="2" fill="#c6ff9a"/><rect x="8" y="11" width="2" height="2" fill="#c6ff9a"/>`,
  bolt:`<path d="M9 1h5l-3 6h4l-7 8 2-6H5z" fill="#ffd23f"/><rect x="9" y="3" width="2" height="3" fill="#fff3b0"/>`,
  sword:`<rect x="9" y="2" width="3" height="9" fill="#c9d4ef"/><rect x="10" y="1" width="2" height="2" fill="#ffffff"/><rect x="10" y="3" width="1" height="7" fill="#8fa2c8"/><rect x="5" y="10" width="10" height="2" fill="#ffd23f"/><rect x="8" y="12" width="3" height="3" fill="#8b5a2b"/>`,
  file:`<rect x="3" y="2" width="9" height="12" fill="#ffd23f"/><rect x="4" y="3" width="6" height="2" fill="#7a5a12"/><rect x="5" y="7" width="5" height="1" fill="#7a5a12"/><rect x="5" y="9" width="5" height="1" fill="#7a5a12"/><rect x="5" y="11" width="3" height="1" fill="#7a5a12"/>`,
  chart:`<rect x="2" y="10" width="3" height="4" fill="#ff5a5f"/><rect x="6" y="7" width="3" height="7" fill="#ffd23f"/><rect x="10" y="4" width="3" height="10" fill="#57d7ff"/><rect x="1" y="14" width="14" height="1" fill="#b3a68d"/>`,
  chat:`<rect x="2" y="3" width="12" height="8" fill="#7ce38b"/><rect x="4" y="11" width="3" height="3" fill="#7ce38b"/><rect x="4" y="5" width="7" height="1" fill="#173a2a"/><rect x="4" y="7" width="5" height="1" fill="#173a2a"/>`,
  eye:`<rect x="3" y="4" width="10" height="8" fill="#57d7ff"/><rect x="1" y="6" width="14" height="4" fill="#57d7ff"/><rect x="6" y="6" width="4" height="4" fill="#10202a"/><rect x="7" y="6" width="1" height="1" fill="#ffffff"/>`,
  check:`<rect x="3" y="8" width="2" height="2" fill="#7ce38b"/><rect x="5" y="10" width="2" height="2" fill="#7ce38b"/><rect x="7" y="8" width="2" height="2" fill="#7ce38b"/><rect x="9" y="6" width="2" height="2" fill="#7ce38b"/><rect x="11" y="4" width="2" height="2" fill="#7ce38b"/>`,
  play:`<path d="M4 2h2v2h2v2h2v2h2v2h-2v2h-2v2h-2v2H4z" fill="#ffd23f"/>`,
  star:`<rect x="7" y="2" width="2" height="12" fill="#ffd23f"/><rect x="2" y="7" width="12" height="2" fill="#ffd23f"/><rect x="5" y="5" width="6" height="6" fill="#ffd23f"/><rect x="7" y="7" width="2" height="2" fill="#fff7c2"/>`,
  ult:`<rect x="6" y="2" width="4" height="2" fill="#57d7ff"/><rect x="4" y="4" width="8" height="2" fill="#57d7ff"/><rect x="2" y="6" width="12" height="4" fill="#57d7ff"/><rect x="4" y="10" width="8" height="2" fill="#57d7ff"/><rect x="6" y="12" width="4" height="2" fill="#57d7ff"/><rect x="6" y="6" width="4" height="4" fill="#ffd23f"/>`,
  fire:`<rect x="7" y="2" width="3" height="5" fill="#ff6b2c"/><rect x="5" y="5" width="7" height="4" fill="#ff9d3c"/><rect x="3" y="8" width="11" height="5" fill="#ff6b2c"/><rect x="6" y="9" width="5" height="4" fill="#ffd23f"/><rect x="8" y="10" width="2" height="3" fill="#fff3b0"/>`,
  ice:`<rect x="7" y="2" width="2" height="12" fill="#7fd8ff"/><rect x="2" y="7" width="12" height="2" fill="#7fd8ff"/><rect x="4" y="4" width="2" height="2" fill="#eaf9ff"/><rect x="10" y="4" width="2" height="2" fill="#eaf9ff"/><rect x="4" y="10" width="2" height="2" fill="#eaf9ff"/><rect x="10" y="10" width="2" height="2" fill="#eaf9ff"/>`,
  cyber:`<rect x="2" y="2" width="5" height="5" fill="#ff5ad0"/><rect x="9" y="2" width="5" height="5" fill="#63f0ff"/><rect x="2" y="9" width="5" height="5" fill="#63f0ff"/><rect x="9" y="9" width="5" height="5" fill="#ff5ad0"/><rect x="7" y="7" width="2" height="2" fill="#ffffff"/>`,
  leaf:`<rect x="8" y="2" width="5" height="3" fill="#7ce38b"/><rect x="5" y="5" width="8" height="4" fill="#7ce38b"/><rect x="3" y="9" width="7" height="3" fill="#4fae68"/><rect x="3" y="12" width="2" height="3" fill="#8b5a2b"/>`,
  moon:`<rect x="7" y="2" width="5" height="2" fill="#a77bff"/><rect x="5" y="4" width="3" height="2" fill="#a77bff"/><rect x="4" y="6" width="2" height="4" fill="#a77bff"/><rect x="5" y="10" width="3" height="2" fill="#a77bff"/><rect x="7" y="12" width="5" height="2" fill="#a77bff"/><rect x="9" y="10" width="3" height="2" fill="#a77bff"/>`,
  sun:`<rect x="7" y="2" width="2" height="12" fill="#fff7a3"/><rect x="2" y="7" width="12" height="2" fill="#fff7a3"/><rect x="4" y="4" width="2" height="2" fill="#fff7a3"/><rect x="10" y="4" width="2" height="2" fill="#fff7a3"/><rect x="4" y="10" width="2" height="2" fill="#fff7a3"/><rect x="10" y="10" width="2" height="2" fill="#fff7a3"/><rect x="6" y="6" width="4" height="4" fill="#ffffff"/>`,
  cosmos:`<rect x="7" y="2" width="2" height="12" fill="#6b4fa0"/><rect x="2" y="7" width="12" height="2" fill="#6b4fa0"/><rect x="4" y="4" width="2" height="2" fill="#2a1a4a"/><rect x="10" y="4" width="2" height="2" fill="#2a1a4a"/><rect x="4" y="10" width="2" height="2" fill="#2a1a4a"/><rect x="10" y="10" width="2" height="2" fill="#2a1a4a"/><rect x="6" y="6" width="4" height="4" fill="#9b7fd0"/>`,
  speaker:`<rect x="2" y="6" width="3" height="4" fill="#ffd23f"/><rect x="5" y="4" width="3" height="8" fill="#ffd23f"/><rect x="8" y="2" width="2" height="12" fill="#ffd23f"/><rect x="11" y="5" width="2" height="6" fill="#fff3b0"/><rect x="13" y="3" width="2" height="10" fill="#fff3b0"/>`,
  mute:`<rect x="2" y="6" width="3" height="4" fill="#b3a68d"/><rect x="5" y="4" width="3" height="8" fill="#b3a68d"/><rect x="8" y="2" width="2" height="12" fill="#b3a68d"/><rect x="11" y="5" width="2" height="2" fill="#ff5a5f"/><rect x="13" y="7" width="2" height="2" fill="#ff5a5f"/><rect x="11" y="9" width="2" height="2" fill="#ff5a5f"/><rect x="13" y="3" width="2" height="2" fill="#ff5a5f"/><rect x="13" y="11" width="2" height="2" fill="#ff5a5f"/>`,
  fox:`<rect x="2" y="2" width="3" height="5" fill="#ff9d3c"/><rect x="11" y="2" width="3" height="5" fill="#ff9d3c"/><rect x="3" y="5" width="10" height="7" fill="#ff9d3c"/><rect x="5" y="10" width="6" height="3" fill="#ffe0a3"/><rect x="5" y="7" width="2" height="2" fill="#1a1620"/><rect x="9" y="7" width="2" height="2" fill="#1a1620"/>`
};

function icon(name){
  return `<svg class="px" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">${ICONS[name] || ICONS.star}</svg>`;
}

/* ============================================================
   СОСТОЯНИЕ
   ============================================================ */
const state = {
  stats: Object.fromEntries(CONFIG.stats.map(s => [s.key, 0])),
  animationClass: null,
  ultType: CONFIG.ultTypes[0].key,
  ultEffect: CONFIG.ultEffects[0].key,
  element: CONFIG.elements[0].key,
  body: 'medium',
  voiceWin: null,
  voiceUlt: null
};

const $ = id => document.getElementById(id);
const NAME_MAX = 16;
const sanitizeName = str => String(str)
    .replace(/[^A-Za-z0-9._!-]/g, '')
    .slice(0, NAME_MAX);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const byKey = (arr, key) => arr.find(x => x.key === key);
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

/* ============================================================
   ПЕРСОНАЖ: БЕЛЫЙ СИЛУЭТ + YOU
   ============================================================ */
const PALETTES = {
  hero:{ fur:'#ffffff', fur2:'#f0f0f0', light:'#ffffff', dark:'#cccccc', eye:'#000000', youText:'#0066ff' },
  rival:{ fur:'#7f8bb0', fur2:'#a6b3d6', light:'#dbe4ff', dark:'#20263a', eye:'#ff6b6b', youText:'#0066ff' }
};

function fighterSVG(pose = 'idle', side = 'hero', forcedBody = null, claws = null, weapon = null){
  const p = PALETTES[side];
  const R = (x,y,w,h,c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  const tail = `<g class="p-tail">${R(2,20,4,5,p.fur)}${R(1,18,3,3,p.fur2)}${R(4,23,5,4,p.fur)}</g>`;
  const hurt = pose === 'hurt';
  const hx = hurt ? -2 : 0, hy = pose === 'slam' ? 3 : hurt ? 1 : 0;

  const bodyType = forcedBody || state.body || 'medium';
  const mod = {
    small:  { dx: 1, dw: -1 },
    medium: { dx: 0, dw: 0 },
    large:  { dx: -1, dw: 2 }
  }[bodyType];

  const RL = (x,y,w,h,c) => {
    const isLeft = x < 16;
    const adjX = isLeft ? x + mod.dx : x - mod.dx;
    const adjW = w + mod.dw;
    return R(Math.max(0, adjX), y, Math.max(1, adjW), h, c);
  };

  // Определяем, рисовать ли когти и оружие
  const showClaws = claws !== null ? claws : (state.animationClass === 'acrobat');
  const showWeapon = weapon !== null ? weapon : (state.animationClass === 'weapon');
  const clawColor = '#e8e8e8';
  const clawDark = '#a0a0a0';

  const head = `<g transform="translate(${hx} ${hy})"> ${R(10,2,4,6,p.fur)}${R(18,1,4,7,p.fur)} ${R(10,6,13,9,p.fur)}${R(11,6,10,2,p.fur2)} ${R(21,10,6,4,p.light)}${R(25,10,2,2,p.dark)} ${side === 'hero' ? '' : R(18,8,3,3,p.eye) + R(17,7,4,1,p.dark)} ${side === 'hero' ?`<g fill="${p.youText}">
    ${R(12,7,1,1,p.youText)}${R(14,7,1,1,p.youText)}${R(13,8,1,2,p.youText)}
    ${R(16,7,3,1,p.youText)}${R(16,9,3,1,p.youText)}${R(16,7,1,3,p.youText)}${R(18,7,1,3,p.youText)}
    ${R(20,7,1,3,p.youText)}${R(22,7,1,3,p.youText)}${R(20,9,3,1,p.youText)}
    </g>`: ''} </g>`;

  const neck = bodyType === 'large' ? `<g transform="translate(${hx} ${hy})">${R(12,12,8,3,p.fur2)}</g>` : '';

  const dy = pose === 'slam' ? 3 : ['dash','thrust','teleport','flurry'].includes(pose) ? -1 : hurt ? 1 : 0;
  const dx = ['dash','thrust','teleport','flurry'].includes(pose) ? 2 : hurt ? -2 : 0;

  let torso = '';
  if (bodyType === 'small') {
    torso = `<g transform="translate(${dx} ${dy})"> ${R(12,14,8,11,p.fur)}${R(13,16,6,7,p.light)}${R(12,24,8,3,p.dark)} </g>`;
  } else if (bodyType === 'large') {
    torso = `<g transform="translate(${dx} ${dy})"> 
      ${R(8,14,16,11,p.fur)}${R(11,16,10,7,p.light)}${R(8,24,16,3,p.dark)}
      ${R(7,14,3,4,p.fur)}${R(22,14,3,4,p.fur)} 
      ${R(12,17,2,2,p.light)}${R(18,17,2,2,p.light)}
    </g>`;
  } else {
    torso = `<g transform="translate(${dx} ${dy})"> ${R(10,14,12,11,p.fur)}${R(13,16,7,7,p.light)}${R(10,24,12,3,p.dark)} </g>`;
  }

  let legs = '';
  if(pose === 'kick' || pose === 'acrobat_attack'){
    legs = RL(11,26,5,8,p.fur)+RL(10,33,7,4,p.fur2)+RL(10,36,7,1,p.dark)
    + RL(16,22,8,4,p.fur)+RL(23,19,5,4,p.fur)+RL(26,17,5,5,p.fur2)+RL(29,18,2,3,p.fur);
  } else if(pose === 'slam'){
    legs = RL(8,25,6,7,p.fur)+RL(7,31,8,5,p.fur2)+RL(7,35,8,1,p.dark)
    + RL(18,25,6,7,p.fur)+RL(18,31,8,5,p.fur2)+RL(18,35,8,1,p.dark);
  } else if(['dash','thrust','teleport','flurry'].includes(pose)){
    legs = RL(5,26,9,4,p.fur)+RL(1,24,5,4,p.fur2)
    + RL(18,25,5,9,p.fur)+RL(18,33,8,4,p.fur2)+RL(18,36,8,1,p.dark);
  } else if(pose === 'raise' || hurt || pose === 'uppercut' || pose === 'brawler_attack'){
    legs = RL(8,26,5,8,p.fur)+RL(7,33,7,4,p.fur2)+RL(7,36,7,1,p.dark)
    + RL(19,26,5,8,p.fur)+RL(19,33,7,4,p.fur2)+RL(19,36,7,1,p.dark);
  } else {
    legs = RL(10,26,5,8,p.fur)+RL(9,33,7,4,p.fur2)+RL(9,36,7,1,p.dark)
    + RL(17,26,5,8,p.fur)+RL(17,33,8,4,p.fur2)+RL(17,36,8,1,p.dark);
  }

  let arms = '';
  if(pose === 'guard'){
    arms = RL(7,17,4,5,p.fur)+RL(7,13,5,5,p.fur)+RL(21,17,5,4,p.fur)+RL(25,14,5,5,p.fur);
    // Когти в боевой стойке
    if (showClaws) {
      arms += R(5, 14, 2, 1, clawColor) + R(5, 16, 2, 1, clawColor) + R(5, 18, 2, 1, clawColor);
      arms += R(26, 15, 2, 1, clawColor) + R(26, 17, 2, 1, clawColor) + R(26, 19, 2, 1, clawColor);
    }
    // Оружие в боевой стойке (меч в правой руке, торчит вверх)
    if (showWeapon) {
      arms += `<g>${R(26,6,2,8,'#cfd8ea')}${R(27,4,1,2,'#f2f6ff')}${R(26,7,1,6,'#8fa2c8')} ${R(24,13,6,2,p.fur)}${R(25,15,2,3,'#8b5a2b')}</g>`;
    }
  } else if(pose === 'kick' || pose === 'acrobat_attack'){
    arms = RL(3,15,7,3,p.fur)+RL(1,14,4,4,p.fur)+RL(21,12,3,6,p.fur)+RL(21,9,4,4,p.fur);
    // Когти в атаке
    if (showClaws) {
      arms += R(0, 13, 2, 1, clawColor) + R(0, 15, 2, 1, clawColor);
      arms += R(27, 8, 2, 1, clawColor) + R(27, 10, 2, 1, clawColor);
    }
  } else if(pose === 'sword' || pose === 'weapon_attack'){
    arms = RL(7,17,4,6,p.fur)+RL(6,21,5,4,p.fur)+RL(21,15,5,4,p.fur)+RL(25,13,4,4,p.light)
    + `<g>${R(27,2,3,12,'#cfd8ea')}${R(28,0,2,2,'#f2f6ff')}${R(27,3,1,10,'#8fa2c8')} ${RL(24,13,8,2,p.fur)}${RL(26,15,2,4,'#8b5a2b')}</g>`;
  } else if(pose === 'raise'){
    arms = RL(8,10,3,7,p.fur)+RL(7,6,4,4,p.fur)+RL(22,10,3,7,p.fur)+RL(23,6,4,4,p.fur);
    if (showWeapon) {
      arms += `<g>${R(23,0,2,8,'#cfd8ea')}${R(24,-2,1,2,'#f2f6ff')}${R(23,1,1,6,'#8fa2c8')} ${R(22,7,4,2,p.fur)}${R(23,9,2,3,'#8b5a2b')}</g>`;
    }
  } else if(pose === 'slam'){
    arms = RL(5,20,4,7,p.fur)+RL(3,26,5,5,p.fur)+RL(24,20,4,7,p.fur)+RL(24,26,5,5,p.fur);
    if (showWeapon) {
      arms += `<g>${R(25,24,2,8,'#cfd8ea')}${R(26,31,1,2,'#8fa2c8')} ${R(23,26,4,2,p.fur)}</g>`;
    }
  } else if(['dash','thrust','teleport','flurry'].includes(pose)){
    arms = RL(4,17,6,3,p.fur)+RL(2,16,4,4,p.fur)+RL(23,17,7,3,p.fur)+RL(29,16,3,5,p.fur);
    if (showWeapon) {
      arms += `<g>${R(30,10,2,8,'#cfd8ea')}${R(31,8,1,2,'#f2f6ff')} ${R(28,16,4,2,p.fur)}</g>`;
    }
  } else if(pose === 'uppercut' || pose === 'brawler_attack'){
    arms = RL(7,17,4,6,p.fur)+RL(6,21,5,4,p.fur)+RL(21,10,5,4,p.fur)+RL(25,6,4,5,p.fur);
    if (showWeapon) {
      arms += `<g>${R(26,0,2,8,'#cfd8ea')}${R(27,-2,1,2,'#f2f6ff')} ${R(24,9,4,2,p.fur)}</g>`;
    }
  } else if(hurt){
    arms = RL(5,13,4,5,p.fur)+RL(3,10,4,4,p.fur)+RL(20,13,3,6,p.fur)+RL(20,10,4,4,p.fur);
  } else {
    // Обычная стойка (idle)
    arms = RL(7,16,4,7,p.fur)+RL(6,21,5,5,p.fur)+RL(21,16,4,6,p.fur)+RL(23,15,5,5,p.fur);
    // Когти в idle — торчат вниз из опущенных рук
    if (showClaws) {
      arms += R(6, 26, 1, 2, clawColor) + R(8, 26, 1, 2, clawColor) + R(10, 26, 1, 2, clawColor);
      arms += R(23, 25, 1, 2, clawColor) + R(25, 25, 1, 2, clawColor) + R(27, 25, 1, 2, clawColor);
    }
    // Оружие в idle — меч в правой руке, торчит вниз
    if (showWeapon) {
      arms += `<g>${R(24,20,2,10,'#cfd8ea')}${R(25,29,1,2,'#8fa2c8')} ${R(22,19,5,2,p.fur)}${R(23,21,2,3,'#8b5a2b')}</g>`;
    }
  }

  if (bodyType === 'large') {
    arms += `<g transform="translate(${dx} ${dy})">${R(6,15,3,3,p.fur2)}${R(23,15,3,3,p.fur2)}</g>`;
  }

  return `<svg viewBox="0 0 32 40" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> ${tail}${legs}${torso}${head}${neck}<g>${arms}</g></svg>`;
}
/* ============================================================
   ЭФФЕКТЫ
   ============================================================ */
function orbSVG(el){
  const R=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  let s='';
  [[2,8,8],[4,5,14],[6,3,18],[8,2,20],[10,1,22],[12,1,22],[14,1,22],[16,2,20],[18,3,18],[20,5,14],[22,8,8]]
    .forEach(([y,x,w])=>s+=R(x,y,w,2,el.color));
  [[8,6,12],[10,4,16],[12,4,16],[14,4,16],[16,6,12]]
    .forEach(([y,x,w])=>s+=R(x,y,w,2,el.core));
  s+=R(8,7,4,3,'#ffffff');
  if(el.key==='fire') s+=R(6,1,3,4,el.color)+R(12,0,3,5,el.color)+R(17,2,3,4,el.color)+R(10,10,4,4,'#fff3b0');
  if(el.key==='ice') s+=R(4,5,3,3,'#ffffff')+R(17,4,3,3,'#ffffff')+R(10,16,4,3,'#ffffff');
  if(el.key==='lightning') s+=`<path d="M12 2h4l-3 6h4l-6 10 2-8h-4z" fill="#ffffff"/>`;
  if(el.key==='cyber') s+=`<g class="p-glitch">`+R(4,4,4,4,'#ffffff')+R(16,4,4,4,el.core)+R(4,16,4,4,el.core)+`</g>`;
  if(el.key==='nature') s+=R(5,5,4,3,'#ffffff')+R(15,4,4,3,el.core)+R(16,15,4,3,'#ffffff');
  if(el.key==='dark') s+=R(6,6,12,12,'#241631')+R(8,8,3,3,el.color);
  if(el.key==='light') s+=R(6,1,3,4,el.color)+R(12,0,3,5,el.color)+R(17,2,3,4,el.color);
  if(el.key==='cosmos') s+=R(3,3,2,2,'#ffffff')+R(8,4,1,1,'#ffffff')+R(14,5,2,2,'#ffffff')+R(5,12,1,1,'#ffffff')+R(17,14,2,2,'#ffffff')+R(10,18,1,1,'#ffffff');
  return `<svg viewBox="0 0 24 24" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;
}

function burstSVG(el){
  const R=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  let s=R(10,1,4,22,el.color)+R(1,10,22,4,el.color)+R(5,5,4,4,el.core)+R(15,5,4,4,el.core)
       +R(5,15,4,4,el.core)+R(15,15,4,4,el.core)+R(9,9,6,6,'#ffffff');
  if(el.key==='cosmos') s+=R(3,3,2,2,'#ffffff')+R(18,4,2,2,'#ffffff')+R(4,18,2,2,'#ffffff')+R(19,17,2,2,'#ffffff');
  return `<svg viewBox="0 0 24 24" width="72" height="72" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;
}

function ringSVG(el){
  const R=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${el.color}"/>`;
  let s=R(16,2,16,4)+R(8,6,8,4)+R(32,6,8,4)+R(4,10,4,10)+R(40,10,4,10)+R(2,20,4,10)+R(42,20,4,10)
       +R(4,30,4,8)+R(40,30,4,8)+R(8,38,8,4)+R(32,38,8,4)+R(16,42,16,4)
       +`<rect x="20" y="18" width="8" height="8" fill="${el.core}"/>`;
  if(el.key==='cosmos') s+=R(10,10,2,2,'#ffffff')+R(30,12,2,2,'#ffffff')+R(15,30,2,2,'#ffffff');
  return `<svg viewBox="0 0 48 48" width="140" height="140" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;
}

function particleShape(el){
  return ({fire:'circle',ice:'diamond',lightning:'zigzag',cyber:'square',nature:'leaf',dark:'circle',light:'star',cosmos:'star'})[el.key] || 'circle';
}

function sparks(x,y,el,count=10){
  const shape=particleShape(el), c=el.color;
  for(let i=0;i<count;i++){
    const a=(Math.PI*2/count)*i;
    const sx=Math.cos(a)*(45+Math.random()*35), sy=Math.sin(a)*(35+Math.random()*35);
    let html='';
    if(shape==='circle') html=`<div style="width:18px;height:18px;border-radius:50%;background:${c}"></div>`;
    else if(shape==='diamond') html=`<div style="width:18px;height:18px;background:${c};transform:rotate(45deg)"></div>`;
    else if(shape==='zigzag') html=`<svg width="22" height="22" viewBox="0 0 22 22"><path d="M0,11 L6,3 L12,19 L22,11" stroke="${c}" stroke-width="4" fill="none"/></svg>`;
    else if(shape==='square') html=`<div style="width:18px;height:18px;background:${c}"></div>`;
    else if(shape==='leaf') html=`<svg width="22" height="22" viewBox="0 0 22 22"><path d="M11,0 Q17,6 11,22 Q5,6 11,0" fill="${c}"/></svg>`;
    else html=`<svg width="22" height="22" viewBox="0 0 22 22"><path d="M11,0 L13,8 L22,8 L15,13 L17,22 L11,16 L5,22 L7,13 L0,8 L9,8 Z" fill="${c}"/></svg>`;
    spawn(html,'spark',x,y,`--sx:${sx}px;--sy:${sy}px;animation-delay:${i*.03}s`);
  }
}

/* ============================================================
   РЕНДЕР
   ============================================================ */
function renderIcons(){
  document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
}

function renderStats(){
  $('statsList').innerHTML = CONFIG.stats.map(s => `
    <div class="stat-row" data-stat="${s.key}" style="--stat:${s.color}">
      <span class="stat-name">
        <span class="stat-title">${icon(s.icon)}${s.label}</span>
        <span class="stat-hint">${s.hint}</span>
      </span>
      <div class="stat-bar">
        <div class="seg base"></div>
        ${Array.from({length:CONFIG.maxPerStat},(_,i)=>`<button type="button" class="seg" data-level="${i+1}" aria-label="${s.label}: уровень ${i+1}"></button>`).join('')}
      </div>
      <button type="button" class="step" data-dir="-1" aria-label="Уменьшить ${s.label}">-</button>
      <span class="stat-value" id="val-${s.key}">0</span>
      <button type="button" class="step" data-dir="1" aria-label="Увеличить ${s.label}">+</button>
    </div>`).join('');
}

function renderSelects(){
  $('ultType').innerHTML=CONFIG.ultTypes.map(t=>`<option value="${t.key}">${t.name}</option>`).join('');
  $('ultEffect').innerHTML=CONFIG.ultEffects.map(e=>`<option value="${e.key}">${e.name}</option>`).join('');
}

function renderElements(){
  $('elementRow').innerHTML=CONFIG.elements.map(e=>`
    <button type="button" class="element-chip" data-element="${e.key}" style="--el:${e.color}" aria-pressed="false">
      ${icon(e.icon)}${e.name}</button>`).join('');
}

function renderAnimationPreview(){
  $('animationPreviewGrid').innerHTML = CONFIG.animationClasses.map(c => {
    const hasClaws = c.key === 'acrobat';
    const hasWeapon = c.key === 'weapon';
    return `<div class="animation-preview-card" data-class="${c.key}" style="--card:${c.color}"> 
      <div class="animation-preview-stage"> 
        <div class="animation-preview-floor"></div> 
        <div class="animation-preview-fighter"><div class="sprite" id="preview-${c.key}">${fighterSVG(c.pose, 'hero', null, hasClaws, hasWeapon)}</div></div> 
      </div> 
      <div class="animation-preview-label">${c.name}</div> 
      <button type="button" class="animation-preview-btn" data-class="${c.key}">ВЫБРАТЬ И ПОКАЗАТЬ</button> 
    </div>`;
  }).join('');
}

const currentAnimationClass=()=>byKey(CONFIG.animationClasses,state.animationClass);
const currentType=()=>byKey(CONFIG.ultTypes,state.ultType);
const currentEffect=()=>byKey(CONFIG.ultEffects,state.ultEffect);
const currentElement=()=>byKey(CONFIG.elements,state.element);
const totalSpent=()=>Object.values(state.stats).reduce((a,b)=>a+b,0);

function calculateStats(){
  const out={};
  CONFIG.stats.forEach(s=>{
    let v=s.base+state.stats[s.key]*s.perToken;
    if(s.key==='charge') v=Math.max(CONFIG.minUltEnergy,v);
    out[s.key]=v;
  });
  return out;
}

function updateLoadout(){
  const name=($('charName').value.trim()||'ИГРОК 1').toUpperCase();
  $('heroName').textContent=name; $('hudName').textContent=name;

  const active=CONFIG.stats.filter(s=>state.stats[s.key]>0);
  $('heroLoadout').innerHTML=active.length
    ? active.map(s=>`<span class="loadout-chip" style="--chip:${s.color}">${icon(s.icon)}${state.stats[s.key]}</span>`).join('')
    : `<span class="loadout-empty">Раздай жетоны ниже</span>`;

  $('buildFill').style.width=(totalSpent()/CONFIG.maxTokens*100)+'%';
  $('buildText').textContent=`${totalSpent()}/${CONFIG.maxTokens}`;

  const calc=calculateStats();
  $('heroStats').innerHTML=CONFIG.stats.map(s=>`
    <div class="stat-line"><span class="stat-label">${icon(s.icon)}${s.label}</span><span>${calc[s.key]}${s.unit}</span></div>`).join('');
}

function updateStatsUI(){
  const left=CONFIG.maxTokens-totalSpent();
  $('tokensLeft').textContent=left;
  CONFIG.stats.forEach(s=>{
    const val=state.stats[s.key];
    const row=document.querySelector(`.stat-row[data-stat="${s.key}"]`);
    $(`val-${s.key}`).textContent=val;
    row.classList.toggle('is-max',val>=CONFIG.maxPerStat);
    row.querySelectorAll('.seg:not(.base)').forEach((seg,i)=>{
      seg.classList.toggle('on',i<val);
      seg.setAttribute('aria-pressed',i<val?'true':'false');
    });
    row.querySelector('.step[data-dir="-1"]').disabled=val===0;
    row.querySelector('.step[data-dir="1"]').disabled=left===0||val>=CONFIG.maxPerStat;
  });
  updateLoadout();
}

function setStat(key,value){
  const others=totalSpent()-state.stats[key];
  const next=Math.max(0,Math.min(CONFIG.maxPerStat,value));
  if(others+next>CONFIG.maxTokens){
    toast('Жетоны закончились. Уменьши другую характеристику.',true);
    return;
  }
  const prev=state.stats[key];
  state.stats[key]=next;
  if(next>prev) SFX.statUp(next,next>=CONFIG.maxPerStat);
  else if(next<prev) SFX.statDown(next);
  updateStatsUI(); updateMeter();
}

/* ============================================================
   КОСТИ / РАНДОМ
   ============================================================ */
const DICE_PATTERNS={
  1:[4], 2:[0,8], 3:[0,4,8], 4:[0,2,6,8], 5:[0,2,4,6,8], 6:[0,2,3,5,6,8]
};

function paintDice(btn,value){
  btn.querySelectorAll('.pip').forEach((pip,i)=>pip.classList.toggle('on',DICE_PATTERNS[value].includes(i)));
}

function rollDice(btn,callback){
  if(btn.disabled) return;
  btn.disabled=true;
  btn.classList.add('rolling');
  SFX.diceRoll(650);
  const spin=setInterval(()=>paintDice(btn,1+Math.floor(Math.random()*6)),70);
  setTimeout(()=>{
    clearInterval(spin);
    btn.classList.remove('rolling');
    btn.disabled=false;
    paintDice(btn,5);
    SFX.diceLand();
    callback();
  },650);
}

function randomizeStats(silent=false){
  CONFIG.stats.forEach(s=>state.stats[s.key]=0);
  let left=CONFIG.maxTokens;
  while(left>0){
    const available=CONFIG.stats.filter(s=>state.stats[s.key]<CONFIG.maxPerStat);
    if(!available.length) break;
    const stat=randomItem(available);
    const max=Math.min(3,left,CONFIG.maxPerStat-state.stats[stat.key]);
    const add=1+Math.floor(Math.random()*max);
    state.stats[stat.key]+=add;
    left-=add;
  }
  updateStatsUI(); updateMeter();
  if(!silent) toast('Билд собран кубиком!');
  saveDraft();
}

function syncElementUI(){
  document.querySelectorAll('.element-chip').forEach(btn=>{
    const on=btn.dataset.element===state.element;
    btn.classList.toggle('is-selected',on);
    btn.setAttribute('aria-pressed',on?'true':'false');
  });
}

function randomizeUltimate(silent=false){
  state.ultType=randomItem(CONFIG.ultTypes).key;
  state.ultEffect=randomItem(CONFIG.ultEffects).key;
  state.element=randomItem(CONFIG.elements).key;
  $('ultType').value=state.ultType;
  $('ultEffect').value=state.ultEffect;
  syncElementUI();
  updateArenaInfo();
  if(!silent) toast('Ультимейт выпал на кубике!');
  saveDraft();
}

const attackLocks = new Set();
async function playClassAttack(key){
  if(attackLocks.has(key)) return;
  const c = byKey(CONFIG.animationClasses, key), sprite = $('preview-' + key);
  if(!c || !sprite) return;
  attackLocks.add(key);
  SFX.classAttack(key);

  state.animationClass = key;
  document.querySelectorAll('.animation-preview-card').forEach(card =>
    card.classList.toggle('is-selected', card.dataset.class === key));
  const btn = document.querySelector(`.animation-preview-btn[data-class="${key}"]`);
  if(btn) btn.disabled = true;

  const hasClaws = key === 'acrobat';
  const hasWeapon = key === 'weapon';
  sprite.innerHTML = fighterSVG(c.attackPose, 'hero', null, hasClaws, hasWeapon);
  await sleep(850);
  sprite.innerHTML = fighterSVG(c.pose, 'hero', null, hasClaws, hasWeapon);
  if(btn) btn.disabled = false;
  attackLocks.delete(key);
  refreshHeroPose();
  // Перерисовываем превью телосложения с новыми когтями/оружием
  renderBodyTypes();
  syncBodyUI();
}
/* ============================================================
   ГОЛОС: ЗАПИСЬ / СТОП / ПРОСЛУШИВАНИЕ / УДАЛЕНИЕ
   ============================================================ */
const voiceSessions={};
const voiceStateKey=key=>key==='winQuote'?'voiceWin':'voiceUlt';
const voiceBtn=key=>document.querySelector(`.voice-btn[data-voice="${key}"]`);

function formatTime(sec){
  return `${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`;
}

function resetVoiceButton(key){
  const btn=voiceBtn(key);
  if(!btn) return;
  btn.classList.remove('recording');
  btn.querySelector('.voice-label').textContent='ЗАПИСАТЬ ГОЛОС';
}

function stopVoice(key){
  const s=voiceSessions[key];
  if(s && s.recorder && s.recorder.state!=='inactive') s.recorder.stop();
}

async function toggleVoice(key){
  const existing=voiceSessions[key];

  if(existing && existing.recorder && existing.recorder.state!=='inactive'){
    stopVoice(key);
    return;
  }

  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder==='undefined'){
    toast('Браузер не поддерживает запись. Открой сайт по HTTPS или localhost.',true);
    return;
  }

  const btn=voiceBtn(key);
  if(!btn) return;

  SFX.recStart();

  try{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});

    const mime=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg']
      .find(t=>MediaRecorder.isTypeSupported(t)) || '';

    const recorder=new MediaRecorder(stream,mime?{mimeType:mime}:undefined);
    const chunks=[];
    const session={recorder,stream,chunks,url:null,seconds:0,timer:null};
    voiceSessions[key]=session;

    recorder.ondataavailable=e=>{ if(e.data && e.data.size>0) chunks.push(e.data); };

    recorder.onstop=()=>{
      clearInterval(session.timer);
      session.stream.getTracks().forEach(track=>track.stop());
      resetVoiceButton(key);
      SFX.hold(false); SFX.recStop();

      const type=recorder.mimeType||mime||'audio/webm';
      const blob=new Blob(chunks,{type});

      if(blob.size===0){
        toast('Запись получилась пустой. Попробуй ещё раз.',true);
        return;
      }

      if(session.url) URL.revokeObjectURL(session.url);
      session.url=URL.createObjectURL(blob);
      state[voiceStateKey(key)]=blob;

      $( 'voice-'+key ).innerHTML=`
        <audio controls preload="metadata" src="${session.url}"></audio>
        <button type="button" class="voice-delete" data-delete-voice="${key}">УДАЛИТЬ</button>`;

      toast('Голос записан! Можно прослушать перед отправкой.');
    };

    recorder.onerror=()=>{
      SFX.hold(false);
      clearInterval(session.timer);
      session.stream.getTracks().forEach(t=>t.stop());
      resetVoiceButton(key);
      toast('Ошибка записи микрофона.',true);
    };

    session.timer=setInterval(()=>{
      session.seconds++;
      btn.querySelector('.voice-label').textContent='СТОП · '+formatTime(session.seconds);
      if(session.seconds>=CONFIG.maxVoiceSeconds) stopVoice(key);
    },1000);

    await sleep(160);
    SFX.hold(true);
    recorder.start(250);
    btn.classList.add('recording');
    btn.querySelector('.voice-label').textContent='СТОП · 0:00';
    $('voice-'+key).innerHTML='';
    state[voiceStateKey(key)]=null;

  }catch(err){
    SFX.hold(false);
    const msg=err.name==='NotAllowedError'
      ? 'Микрофон заблокирован. Разреши доступ в адресной строке.'
      : err.name==='NotFoundError'
      ? 'Микрофон не найден. Подключи его и попробуй снова.'
      : 'Не удалось включить микрофон. Проверь HTTPS и настройки браузера.';
    toast(msg,true);
  }
}

function deleteVoice(key){
  const s=voiceSessions[key];
  if(s){
    if(s.recorder && s.recorder.state!=='inactive') s.recorder.stop();
    clearInterval(s.timer);
    s.stream.getTracks().forEach(t=>t.stop());
    if(s.url) URL.revokeObjectURL(s.url);
    delete voiceSessions[key];
  }
  state[voiceStateKey(key)]=null;
  $('voice-'+key).innerHTML='';
  resetVoiceButton(key);
  SFX.hold(false); SFX.remove();
  toast('Запись удалена.');
}

async function finalizeVoices(){
  const pending=Object.entries(voiceSessions)
    .filter(([,s])=>s.recorder && s.recorder.state!=='inactive');

  await Promise.all(pending.map(([key,s])=>new Promise(resolve=>{
    s.recorder.addEventListener('stop',resolve,{once:true});
    s.recorder.stop();
  })));
}

function blobToDataURL(blob){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=()=>resolve(reader.result);
    reader.onerror=reject;
    reader.readAsDataURL(blob);
  });
}

/* ============================================================
   СОБЫТИЯ
   ============================================================ */
let toastTimer;
function toast(text,error=false){
  const t=$('toast');
  t.textContent=text;
  if(error) SFX.error();
  t.classList.toggle('error',error);
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),3200);
}


/* ============================================================
   ТЕЛОСЛОЖЕНИЕ, КЛАСС, ИМЯ
   ============================================================ */
let nameHinted=false;

function renderBodyTypes(){
  const hasClaws = state.animationClass === 'acrobat';
  const hasWeapon = state.animationClass === 'weapon';
  $('bodyRow').innerHTML = CONFIG.bodyTypes.map(b => `<button type="button" class="body-btn" data-body="${b.key}" aria-pressed="false"> 
    <span class="body-sprite body-${b.key}">${fighterSVG('idle', 'hero', b.key, hasClaws, hasWeapon)}</span> 
    <b>${b.name}</b><small>${b.desc}</small> 
  </button>`).join('');
}

function syncBodyUI(){
  document.body.dataset.body = state.body;
  document.querySelectorAll('.body-btn').forEach(btn => {
    const on = btn.dataset.body === state.body;
    btn.classList.toggle('is-selected', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  
  if (typeof refreshHeroPose === 'function') {
    refreshHeroPose();
  }
  
  // Перерисовываем бойцов в карточках с учётом текущего класса
  CONFIG.animationClasses.forEach(c => {
    const sprite = $('preview-' + c.key);
    if (sprite) {
      const hasClaws = c.key === 'acrobat';
      const hasWeapon = c.key === 'weapon';
      sprite.innerHTML = fighterSVG(c.pose, 'hero', null, hasClaws, hasWeapon);
    }
  });
  
  // Перерисовываем кнопки телосложения с когтями/оружием если выбран класс
  renderBodyTypes();
}

function syncClassUI(){
  document.querySelectorAll('.animation-preview-card').forEach(card=>
    card.classList.toggle('is-selected',card.dataset.class===state.animationClass));
}

function checkClean(el){
    if(!el) return;
    el.setCustomValidity(
        el.id === 'charName' && !el.value.trim()
            ? 'Введи имя персонажа.'
            : ''
    );
}


function randomizeFighter(){
  state.body=randomItem(CONFIG.bodyTypes).key;
  syncBodyUI();
  state.animationClass=randomItem(CONFIG.animationClasses).key;
  syncClassUI();
  refreshHeroPose();
  randomizeStats(true);
  updateLoadout();
  randomizeUltimate(true);          
  SFX.diceLand();
  toast('Случайный боец собран! Допиши ссылку, контакт и фразы.');
  saveDraft();
}

/* ============================================================
   ЧЕРНОВИК (localStorage)
   ============================================================ */
const DRAFT_FIELDS=['charName','refLink','visualDetail','contact','winQuote','ultQuote'];
let draftDisabled=false, saveTimer=null;

function scheduleSave(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(saveDraft,400);
}

function draftHasContent(d){
  return DRAFT_FIELDS.some(id=>(d.fields[id]||'').trim())
      || Object.values(d.stats).some(v=>v>0)
      || !!d.animationClass;
}

function saveDraft(){
  if(draftDisabled) return;
  try{
    const d={
      at:Date.now(),
      fields:Object.fromEntries(DRAFT_FIELDS.map(id=>[id,$(id).value])),
      stats:{...state.stats},
      animationClass:state.animationClass,
      ultType:state.ultType, ultEffect:state.ultEffect, element:state.element, body:state.body,
      hadVoice:!!(state.voiceWin||state.voiceUlt)
    };
    if(draftHasContent(d)) localStorage.setItem(CONFIG.draftKey,JSON.stringify(d));
  }catch(e){ /* хранилище недоступно - не страшно */ }
}

function clearDraft(){
  try{ localStorage.removeItem(CONFIG.draftKey); }catch(e){}
}

function loadDraft(){
  let d;
  try{ d=JSON.parse(localStorage.getItem(CONFIG.draftKey)||'null'); }catch(e){ return; }
  if(!d || !d.fields || !d.stats) return;
  if(Date.now()-d.at>CONFIG.draftDays*86400000){ clearDraft(); return; }

  DRAFT_FIELDS.forEach(id=>{ if(typeof d.fields[id]==='string') $(id).value=d.fields[id]; });
$('charName').value = sanitizeName($('charName').value);

  const stats={}; let sum=0, ok=true;
  CONFIG.stats.forEach(st=>{
    const v=Number(d.stats[st.key]||0);
    if(!Number.isInteger(v)||v<0||v>CONFIG.maxPerStat) ok=false;
    stats[st.key]=v; sum+=v;
  });
  if(ok && sum<=CONFIG.maxTokens) Object.assign(state.stats,stats);

  if(byKey(CONFIG.animationClasses,d.animationClass)) state.animationClass=d.animationClass;
  if(byKey(CONFIG.ultTypes,d.ultType))     { state.ultType=d.ultType;     $('ultType').value=d.ultType; }
  if(byKey(CONFIG.ultEffects,d.ultEffect)) { state.ultEffect=d.ultEffect; $('ultEffect').value=d.ultEffect; }
  if(byKey(CONFIG.elements,d.element))     state.element=d.element;
  if(byKey(CONFIG.bodyTypes,d.body))       state.body=d.body;

  syncClassUI(); syncBodyUI(); syncElementUI();
  checkClean($('charName')); checkClean($('winQuote')); checkClean($('ultQuote'));
  updateStatsUI(); updateMeter();

  if(draftHasContent(d)){
    toast(d.hadVoice
      ? 'Черновик восстановлен. Голос придётся записать заново.'
      : 'Черновик восстановлен. Можно продолжить с того же места.');
  }
}

/* ============================================================
   ПРОВЕРКА АНКЕТЫ ПЕРЕД ОТПРАВКОЙ
   ============================================================ */
function buildPayload(){
  return {
    event:'United Furry Con',
    character:{
      name:$('charName').value.trim().toUpperCase(),
      reference:$('refLink').value.trim(),
      detail:$('visualDetail').value.trim(),
      contact:$('contact').value.trim(),
      body:state.body,
      animationClass:state.animationClass,
      stats:{...state.stats},
      calculated:calculateStats(),
      ultimate:{type:state.ultType,effect:state.ultEffect,element:state.element},
      quotes:{win:$('winQuote').value.trim(),ultimate:$('ultQuote').value.trim()}
    },
    consent:{aiSprites:$('consentAi').checked,storage:$('consent').checked},
    meta:{version:'1.4',submittedAt:new Date().toISOString()}
  };
}

function openReview(payload){
  const c=payload.character;
  const cls=byKey(CONFIG.animationClasses,c.animationClass), body=byKey(CONFIG.bodyTypes,c.body);
  const t=byKey(CONFIG.ultTypes,c.ultimate.type), ef=byKey(CONFIG.ultEffects,c.ultimate.effect), el=byKey(CONFIG.elements,c.ultimate.element);
  const voiceTag='<span class="review-tag">ГОЛОС ЕСТЬ</span>';

  const statsHtml=CONFIG.stats.map(st=>`
    <div class="review-stat" style="--chip:${st.color}">
      <span>${icon(st.icon)}${st.label}</span>
      <b>${c.calculated[st.key]}${st.unit}</b><em>жетонов: ${c.stats[st.key]}</em>
    </div>`).join('');

  const o=document.createElement('div');
  o.className='success-overlay review-overlay';
  o.innerHTML=`
    <div class="success-card review-card" role="dialog" aria-modal="true" aria-labelledby="reviewTitle">
      <h2 id="reviewTitle">ПРОВЕРЬ АНКЕТУ</h2>
      <div class="review-top">
        <div class="review-sprite">${fighterSVG(cls.pose,'hero')}</div>
        <div>
          <div class="review-name">${escapeHtml(c.name)}</div>
          <div class="review-sub">${body.name} · ${cls.name}</div>
        </div>
      </div>
      <div class="review-stats">${statsHtml}</div>
      <dl class="review-list">
        <dt>УЛЬТИМЕЙТ</dt><dd>${t.name} · ${ef.name} · ${el.name}</dd>
        <dt>ФРАЗА ПОБЕДЫ</dt><dd>${c.quotes.win?escapeHtml(c.quotes.win):'-'}${state.voiceWin?voiceTag:''}</dd>
        <dt>ФРАЗА УЛЬТЫ</dt><dd>${c.quotes.ultimate?escapeHtml(c.quotes.ultimate):'-'}${state.voiceUlt?voiceTag:''}</dd>
        <dt>ДЕТАЛЬ</dt><dd>${escapeHtml(c.detail)}</dd>
        <dt>РЕФЕРЕНС</dt><dd>${escapeHtml(c.reference)}</dd>
        <dt>КОНТАКТ</dt><dd>${escapeHtml(c.contact)}</dd>
        <dt>ИИ-СПРАЙТЫ</dt><dd>Согласен(на)</dd>
      </dl>
      <div class="review-actions">
        <button type="button" class="pixel-btn ghost" id="reviewBack">ИСПРАВИТЬ</button>
        <button type="button" class="pixel-btn" id="reviewSend"><i data-icon="check"></i> ВСЁ ВЕРНО</button>
      </div>
    </div>`;
  document.body.appendChild(o);
  renderIcons();

  const close=()=>{ document.removeEventListener('keydown',onKey); o.remove(); };
  const onKey=ev=>{ if(ev.key==='Escape'){ SFX.click(); close(); } };
  document.addEventListener('keydown',onKey);

  $('reviewBack').addEventListener('click',()=>{ SFX.click(); close(); });
  $('reviewSend').addEventListener('click',()=>{ close(); sendFighter(payload); });
  $('reviewSend').focus();
}

async function sendFighter(payload){
  const btn=$('characterForm').querySelector('.submit-btn');
  const btnHTML=btn.innerHTML;
  btn.disabled=true;
  btn.textContent='ОТПРАВКА...';
  SFX.coin();

  const fd=new FormData();
  fd.append('payload',JSON.stringify(payload));
  fd.append('website',$('website').value);           
  if(state.voiceWin) fd.append('voiceWin',state.voiceWin,'win.'+audioExt(state.voiceWin));
  if(state.voiceUlt) fd.append('voiceUlt',state.voiceUlt,'ult.'+audioExt(state.voiceUlt));

  const ctrl=new AbortController();
  const timeout=setTimeout(()=>ctrl.abort(),45000);
  try{
    const res=await fetch(CONFIG.apiUrl,{method:'POST',body:fd,signal:ctrl.signal});
    const data=await res.json().catch(()=>({}));
    if(!res.ok||!data.ok) throw new Error(data.error||`Ошибка сервера (${res.status})`);
    draftDisabled=true; clearDraft();
    showSuccess(data.id,payload.character.name);
  }catch(err){
    const msg=err.name==='AbortError' ? 'Сервер не отвечает. Попробуй ещё раз через минуту.'
            : err instanceof TypeError ? 'Нет связи с сервером. Проверь интернет и попробуй снова.'
            : err.message;
    toast(msg,true);
    btn.disabled=false;
    btn.innerHTML=btnHTML;
  }finally{
    clearTimeout(timeout);
  }
}

const escapeHtml=str=>String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function audioExt(blob){
  const t=(blob.type||'').toLowerCase();
  return t.includes('mp4')?'m4a':t.includes('ogg')?'ogg':'webm';
}

function showSuccess(id,name){
  SFX.win();
  const o=document.createElement('div');
  o.className='success-overlay';
  o.innerHTML=`
    <div class="success-card" role="dialog" aria-modal="true" aria-labelledby="successTitle">
      <div class="success-icon">${icon('star')}</div>
      <h2 id="successTitle">АНКЕТА ПРИНЯТА!</h2>
      <p>Боец <b>${escapeHtml(name.toUpperCase())}</b> в очереди на спрайты.</p>
      <p class="success-id">НОМЕР ЗАЯВКИ: <b>${escapeHtml(id||'-')}</b></p>
      <p>Организаторы свяжутся с тобой по указанному контакту.</p>
      <button type="button" class="pixel-btn" id="againBtn"><i data-icon="fox"></i> СОЗДАТЬ ЕЩЁ ОДНОГО</button>
    </div>`;
  document.body.appendChild(o);
  renderIcons();
  $('againBtn').addEventListener('click',()=>{ SFX.click(); location.reload(); });
  $('againBtn').focus();
}

function initSoundToggle(){
  const btn=$('soundToggle'); if(!btn) return;
  const paint=()=>{
    const m=SFX.isMuted();
    btn.classList.toggle('is-muted',m);
    btn.setAttribute('aria-pressed',m?'true':'false');
    btn.querySelector('.snd-icon').innerHTML=icon(m?'mute':'speaker');
    btn.querySelector('.snd-label').textContent=m?'ЗВУК: ВЫКЛ':'ЗВУК: ВКЛ';
  };
  btn.addEventListener('click',()=>{ SFX.setMuted(!SFX.isMuted()); paint(); });
  paint();
}

function bindEvents(){
$('charName').addEventListener('input', e => {
    const el = e.target, raw = el.value;
    const clean = sanitizeName(raw);

    if(clean !== raw){
        const caret = sanitizeName(raw.slice(0, el.selectionStart)).length;
        el.value = clean;
        el.setSelectionRange(caret, caret);
        if(!nameHinted){
            nameHinted = true;
            toast('В имени можно латиницу, цифры и - _ . !');
        }
    }

    checkClean(el);
    updateLoadout();
    SFX.typeKey();
});
  ['winQuote','ultQuote'].forEach(id=>$(id).addEventListener('input',e=>checkClean(e.target)));
  ['refLink','visualDetail','winQuote','ultQuote','contact'].forEach(id=>{
    const el=$(id); if(el) el.addEventListener('input',()=>SFX.typeKey());
  });
  initSoundToggle();

  // Телосложение
  $('bodyRow').addEventListener('click',e=>{
    const b=e.target.closest('.body-btn'); if(!b) return;
    state.body=b.dataset.body;
    syncBodyUI();
    SFX.select();
  });

  $('randomFighter').addEventListener('click',e=>{
    e.preventDefault();
    rollDice(e.currentTarget,randomizeFighter);
  });

  ['input','change','click'].forEach(ev=>$('characterForm').addEventListener(ev,scheduleSave));
  window.addEventListener('pagehide',saveDraft);
  $('clearDraft').addEventListener('click',()=>{
    if(!confirm('Очистить всю анкету? Введённые данные пропадут.')) return;
    draftDisabled=true; clearDraft(); location.reload();
  });

  $('statsList').addEventListener('click',e=>{
    const row=e.target.closest('.stat-row'); if(!row) return;
    const key=row.dataset.stat;

    const seg=e.target.closest('.seg:not(.base)');
    if(seg){
      const level=Number(seg.dataset.level);
      if(state.stats[key]>=level) setStat(key,level-1);
      else{
        const others=totalSpent()-state.stats[key];
        setStat(key,Math.min(level,CONFIG.maxPerStat,CONFIG.maxTokens-others));
      }
      return;
    }
    const step=e.target.closest('.step');
    if(step && !step.disabled) setStat(key,state.stats[key]+Number(step.dataset.dir));
  });

  $('ultType').addEventListener('change',e=>{state.ultType=e.target.value;SFX.select();updateArenaInfo();});
  $('ultEffect').addEventListener('change',e=>{state.ultEffect=e.target.value;SFX.select();updateArenaInfo();});

  $('elementRow').addEventListener('click',e=>{
    const btn=e.target.closest('.element-chip'); if(!btn) return;
    state.element=btn.dataset.element;
    SFX.element(state.element);
    updateArenaInfo();
  });

  $('animationPreviewGrid').addEventListener('click',e=>{
    const target=e.target.closest('[data-class]'); if(!target) return;
    playClassAttack(target.dataset.class);
  });

  $('randomizeStats').addEventListener('click',e=>{
    e.preventDefault();
    rollDice(e.currentTarget,randomizeStats);
  });
  $('randomizeUlt').addEventListener('click',e=>{
    e.preventDefault();
    rollDice(e.currentTarget,randomizeUltimate);
  });

  $('characterForm').addEventListener('click',e=>{
    const rec=e.target.closest('[data-voice]');
    if(rec){ e.preventDefault(); toggleVoice(rec.dataset.voice); return; }

    const del=e.target.closest('[data-delete-voice]');
    if(del){ e.preventDefault(); deleteVoice(del.dataset.deleteVoice); return; }
  });


  window.addEventListener('pagehide',()=>{
    Object.keys(voiceSessions).forEach(deleteVoice);
  });

  $('characterForm').addEventListener('submit',async e=>{
    e.preventDefault();

    if(!state.animationClass){
      toast('Выбери анимацию атаки.',true);
      $('animationPreviewField').scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    if(totalSpent()!==CONFIG.maxTokens){
      toast(`Раздай все ${CONFIG.maxTokens} жетонов. Осталось: ${CONFIG.maxTokens-totalSpent()}.`,true);
      $('statsField').scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    if(!$('characterForm').reportValidity()){ SFX.error(); return; }

    try{
      const u=new URL($('refLink').value.trim());
      if(!['http:','https:'].includes(u.protocol)) throw new Error();
    }catch(err){
      toast('Ссылка на референс должна начинаться с http:// или https://',true);
      $('refLink').focus();
      return;
    }

    await finalizeVoices();
    SFX.click();
    openReview(buildPayload());
  });
}

/* ============================================================
   ИНИЦИАЛИЗАЦИЯ
   ============================================================ */
renderIcons();
renderStats();
renderSelects();
renderElements();
renderAnimationPreview();
renderBodyTypes();
document.querySelectorAll('.dice-btn').forEach(btn=>paintDice(btn,5));
updateStatsUI();
bindEvents();
loadDraft();
syncBodyUI();
initArena();
