const CONFIG = {
  maxTokens: 10,
  maxPerStat: 5,

  stats: [
    { key:'hp',     label:'ЗДОРОВЬЕ',    icon:'heart',   color:'#ff5a5f', hint:'+15% к запасу здоровья за жетон' },
    { key:'dmg',    label:'УРОН',        icon:'fist',    color:'#ff9d3c', hint:'+10% к урону всех атак за жетон' },
    { key:'spd',    label:'СКОРОСТЬ',    icon:'boot',    color:'#57d7ff', hint:'+5% к скорости передвижения за жетон' },
    { key:'agi',    label:'ЛОВКОСТЬ',    icon:'agility', color:'#7ce38b', hint:'+8% к скорости атаки и быстрее восстановление' },
    { key:'charge', label:'ЗАРЯД УЛЬТЫ', icon:'bolt',    color:'#ffd23f', hint:'+15% к скорости заполнения шкалы супера' }
  ],

  classes: [
    { key:'brawler', name:'БОРЕЦ',      icon:'glove', color:'#ff5a5f', pose:'guard', desc:'Кулаки и когти. Быстрая серия вблизи.' },
    { key:'acrobat', name:'АКРОБАТ',    icon:'kick',  color:'#57d7ff', pose:'kick',  desc:'Удары ногами и вертушки. Две ноги, длинный пинок.' },
    { key:'weapon',  name:'ОРУЖЕЙНИК',  icon:'sword', color:'#c9d4ef', pose:'sword', desc:'Меч или копьё. Длинный хитбокс.' }
  ],

  ultTypes: [
    { key:'dash',     name:'Рывок-удар',       pose:'dash',     verb:'РЫВОК',    desc:'Боец срывается с места и наносит удар в упор.' },
    { key:'aoe',      name:'Зональный взрыв',  pose:'slam',     verb:'ВЗРЫВ',    desc:'Боец опускает руки вниз — ударная волна бьёт на 360°.' },
    { key:'drop',     name:'Снаряд сверху',    pose:'raise',    verb:'СВЕРХУ',   desc:'Боец поднимает руку — энергетический шар падает на противника.' },
    { key:'charge',   name:'Мощный заряд',     pose:'thrust',   verb:'ПРОБОЙ',   desc:'Боец вытягивает руку и посылает пробивающий луч.' },
    { key:'teleport', name:'Телепорт за спину',pose:'teleport', verb:'ТЕЛЕПОРТ', desc:'Боец исчезает и появляется за спиной врага с ударом.' },
    { key:'flurry',   name:'Шквал ударов',     pose:'flurry',   verb:'ШКВАЛ',    desc:'Боец наносит серию из 5-7 быстрых ударов на месте.' },
    { key:'uppercut', name:'Апперкот',         pose:'uppercut', verb:'АПЕРКОТ',  desc:'Мощный удар снизу, подбрасывающий врага в воздух.' }
  ],

  ultEffects: [
    { key:'damage',    name:'Чистый урон',      pop:'-40',    desc:'Массивный урон без дополнительных эффектов.' },
    { key:'stun',      name:'Оглушение',        pop:'STUN!',  desc:'Противник обездвижен на 1.5 секунды.' },
    { key:'knockback', name:'Отбрасывание',     pop:'ОТБРОС', desc:'Противника отбрасывает к краю арены.' },
    { key:'vampire',   name:'Вампиризм',        pop:'+20 HP', desc:'Часть нанесённого урона возвращает здоровье.' },
    { key:'slow',      name:'Замедление',       pop:'SLOW!',  desc:'Скорость противника снижена на 50% в течение 4 секунд.' },
    { key:'dot',       name:'Урон со временем', pop:'BURN!',  desc:'Противник получает урон каждые 0.5 сек в течение 4 секунд.' },
    { key:'steal',     name:'Кража силы',       pop:'+DMG',   desc:'Урон бойца увеличен на 30% в течение 5 секунд.' }
  ],

  elements: [
    { key:'fire',      name:'ОГОНЬ',   icon:'fire',  color:'#ff6b2c', core:'#ffd23f' },
    { key:'ice',       name:'ЛЁД',     icon:'ice',   color:'#7fd8ff', core:'#eaf9ff' },
    { key:'lightning', name:'МОЛНИЯ',  icon:'bolt',  color:'#ffe14d', core:'#fff7c2' },
    { key:'cyber',     name:'КИБЕР',   icon:'cyber', color:'#ff5ad0', core:'#63f0ff' },
    { key:'nature',    name:'ПРИРОДА', icon:'leaf',  color:'#7ce38b', core:'#e6ff9a' },
    { key:'dark',      name:'ТЬМА',    icon:'moon',  color:'#a77bff', core:'#3a2450' },
    { key:'light',     name:'СВЕТ',    icon:'sun',   color:'#fff7a3', core:'#ffffff' },
    { key:'cosmos',    name:'КОСМОС',  icon:'cosmos',color:'#6b4fa0', core:'#c9a3ff' }
  ]
};

const ICONS = {
  heart:`<rect x="3" y="3" width="4" height="3" fill="#ff5a5f"/><rect x="9" y="3" width="4" height="3" fill="#ff5a5f"/><rect x="2" y="5" width="12" height="4" fill="#ff5a5f"/><rect x="3" y="9" width="10" height="3" fill="#e63b4a"/><rect x="5" y="12" width="6" height="2" fill="#e63b4a"/><rect x="7" y="14" width="2" height="1" fill="#e63b4a"/><rect x="4" y="4" width="2" height="2" fill="#ffb3b8"/>`,
  fist:`<rect x="4" y="5" width="9" height="7" fill="#ffb454"/><rect x="4" y="3" width="2" height="4" fill="#ffd08a"/><rect x="7" y="3" width="2" height="4" fill="#ffd08a"/><rect x="10" y="3" width="2" height="4" fill="#ffd08a"/><rect x="2" y="8" width="3" height="4" fill="#ff9d3c"/><rect x="4" y="11" width="9" height="3" fill="#ff5a5f"/>`,
  glove:`<rect x="3" y="3" width="9" height="8" fill="#ff5a5f"/><rect x="3" y="3" width="9" height="2" fill="#ff9a9e"/><rect x="2" y="7" width="3" height="4" fill="#ff9a9e"/><rect x="4" y="11" width="8" height="3" fill="#ffd23f"/>`,
  boot:`<rect x="3" y="3" width="5" height="7" fill="#57d7ff"/><rect x="3" y="3" width="5" height="2" fill="#c9f2ff"/><rect x="3" y="9" width="9" height="4" fill="#2b8fb8"/><rect x="10" y="7" width="4" height="3" fill="#57d7ff"/><rect x="2" y="12" width="12" height="2" fill="#173a4a"/>`,
  kick:`<rect x="2" y="4" width="6" height="3" fill="#57d7ff"/><rect x="6" y="6" width="6" height="3" fill="#57d7ff"/><rect x="10" y="3" width="4" height="5" fill="#ff5a5f"/><rect x="3" y="10" width="4" height="4" fill="#2b8fb8"/><rect x="2" y="13" width="6" height="2" fill="#173a4a"/>`,
  agility:`<rect x="2" y="3" width="2" height="2" fill="#7ce38b"/><rect x="4" y="5" width="2" height="2" fill="#7ce38b"/><rect x="6" y="7" width="2" height="2" fill="#7ce38b"/><rect x="4" y="9" width="2" height="2" fill="#7ce38b"/><rect x="2" y="11" width="2" height="2" fill="#7ce38b"/><rect x="8" y="3" width="2" height="2" fill="#c6ff9a"/><rect x="10" y="5" width="2" height="2" fill="#c6ff9a"/><rect x="12" y="7" width="2" height="2" fill="#c6ff9a"/><rect x="10" y="9" width="2" height="2" fill="#c6ff9a"/><rect x="8" y="11" width="2" height="2" fill="#c6ff9a"/>`,
  bolt:`<path d="M9 1h5l-3 6h4l-7 8 2-6H5z" fill="#ffd23f"/><rect x="9" y="3" width="2" height="3" fill="#fff3b0"/>`,
  sword:`<rect x="9" y="2" width="3" height="9" fill="#c9d4ef"/><rect x="10" y="1" width="2" height="2" fill="#ffffff"/><rect x="10" y="3" width="1" height="7" fill="#8fa2c8"/><rect x="5" y="10" width="10" height="2" fill="#ffd23f"/><rect x="8" y="12" width="3" height="3" fill="#8b5a2b"/>`,
  bow:`<rect x="11" y="2" width="2" height="2" fill="#7ce38b"/><rect x="13" y="4" width="2" height="8" fill="#7ce38b"/><rect x="11" y="12" width="2" height="2" fill="#7ce38b"/><rect x="10" y="3" width="1" height="10" fill="#eaf9ff"/><rect x="3" y="7" width="9" height="1" fill="#ffffff"/><rect x="10" y="6" width="2" height="3" fill="#ff5a5f"/>`,
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
  cosmos:`<rect x="7" y="2" width="2" height="12" fill="#c9a3ff"/><rect x="2" y="7" width="12" height="2" fill="#c9a3ff"/><rect x="4" y="4" width="2" height="2" fill="#6b4fa0"/><rect x="10" y="4" width="2" height="2" fill="#6b4fa0"/><rect x="4" y="10" width="2" height="2" fill="#6b4fa0"/><rect x="10" y="10" width="2" height="2" fill="#6b4fa0"/><rect x="6" y="6" width="4" height="4" fill="#ffffff"/>`,
  fox:`<rect x="2" y="2" width="3" height="5" fill="#ff9d3c"/><rect x="11" y="2" width="3" height="5" fill="#ff9d3c"/><rect x="3" y="3" width="1" height="2" fill="#ffe0a3"/><rect x="12" y="3" width="1" height="2" fill="#ffe0a3"/><rect x="3" y="5" width="10" height="7" fill="#ff9d3c"/><rect x="5" y="10" width="6" height="3" fill="#ffe0a3"/><rect x="5" y="7" width="2" height="2" fill="#1a1620"/><rect x="9" y="7" width="2" height="2" fill="#1a1620"/><rect x="7" y="10" width="2" height="2" fill="#1a1620"/>`,
  raccoon:`<rect x="2" y="2" width="3" height="5" fill="#7f8bb0"/><rect x="11" y="2" width="3" height="5" fill="#7f8bb0"/><rect x="3" y="3" width="1" height="2" fill="#dbe4ff"/><rect x="12" y="3" width="1" height="2" fill="#dbe4ff"/><rect x="3" y="5" width="10" height="7" fill="#7f8bb0"/><rect x="5" y="10" width="6" height="3" fill="#dbe4ff"/><rect x="5" y="7" width="2" height="2" fill="#1a1620"/><rect x="9" y="7" width="2" height="2" fill="#1a1620"/><rect x="7" y="10" width="2" height="2" fill="#1a1620"/>`,
  dog:`<rect x="2" y="2" width="3" height="5" fill="#c9a37f"/><rect x="11" y="2" width="3" height="5" fill="#c9a37f"/><rect x="3" y="3" width="1" height="2" fill="#f5e6d0"/><rect x="12" y="3" width="1" height="2" fill="#f5e6d0"/><rect x="3" y="5" width="10" height="7" fill="#c9a37f"/><rect x="5" y="10" width="6" height="3" fill="#f5e6d0"/><rect x="5" y="7" width="2" height="2" fill="#1a1620"/><rect x="9" y="7" width="2" height="2" fill="#1a1620"/><rect x="7" y="10" width="2" height="2" fill="#1a1620"/>`
};

function icon(name){
  return `<svg class="px" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">${ICONS[name] || ICONS.star}</svg>`;
}

const state = {
  stats: Object.fromEntries(CONFIG.stats.map(s => [s.key, 0])),
  fighterClass: null,
  ultType: CONFIG.ultTypes[0].key,
  ultEffect: CONFIG.ultEffects[0].key,
  element: CONFIG.elements[0].key,
  animal: 'fox'
};

const $ = id => document.getElementById(id);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const byKey = (arr, key) => arr.find(x => x.key === key);

const ANIMALS = [
  { key:'fox',     name:'ЛИСА',   color:'#ff9d3c' },
  { key:'raccoon', name:'ЕНОТ',   color:'#7f8bb0' },
  { key:'dog',     name:'СОБАКА', color:'#c9a37f' }
];

const PALETTES = {
  fox:{
    fur:'#ff9d3c', fur2:'#ffc46b', light:'#ffe0a3', dark:'#3a2318',
    pants:'#39415a', pants2:'#4a5578', boot:'#e64545', boot2:'#ff7a5c',
    glove:'#ffd23f', scarf:'#ff5a5f', eye:'#1a1620'
  },
  raccoon:{
    fur:'#7f8bb0', fur2:'#a6b3d6', light:'#dbe4ff', dark:'#20263a',
    pants:'#2b3145', pants2:'#39415c', boot:'#4d6fa8', boot2:'#7fa8dd',
    glove:'#dbe4ff', scarf:'#57d7c8', eye:'#ff6b6b'
  },
  dog:{
    fur:'#c9a37f', fur2:'#e6c9a3', light:'#f5e6d0', dark:'#5a3a20',
    pants:'#4a3a2a', pants2:'#6a5a4a', boot:'#8b5a2b', boot2:'#b87f4a',
    glove:'#ffd23f', scarf:'#ff5a5f', eye:'#1a1620'
  },
  rival:{
    fur:'#7f8bb0', fur2:'#a6b3d6', light:'#dbe4ff', dark:'#20263a',
    pants:'#2b3145', pants2:'#39415c', boot:'#4d6fa8', boot2:'#7fa8dd',
    glove:'#dbe4ff', scarf:'#57d7c8', eye:'#ff6b6b'
  }
};

function fighterSVG(pose = 'idle', side = 'hero'){
  const paletteKey = side === 'hero' ? state.animal : side;
  const p = PALETTES[paletteKey];
  const R = (x,y,w,h,c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;

  let tail = '';
  if(state.animal === 'fox'){
    tail = `<g class="p-tail">${R(2,20,4,5,p.fur)}${R(1,18,3,3,p.light)}${R(4,23,5,4,p.fur2)}</g>`;
  } else if(state.animal === 'raccoon'){
    tail = `<g class="p-tail">${R(2,20,4,5,p.fur)}${R(1,18,3,3,p.dark)}${R(4,23,5,4,p.fur2)}</g>`;
  } else if(state.animal === 'dog'){
    tail = `<g class="p-tail">${R(2,20,4,5,p.fur)}${R(1,18,3,3,p.fur2)}${R(4,23,5,4,p.fur)}</g>`;
  }

  const hurt = pose === 'hurt';
  const hx = hurt ? -2 : 0, hy = (pose === 'slam' ? 3 : hurt ? 1 : 0);
  const head = `<g transform="translate(${hx} ${hy})">
    ${R(10,2,4,6,p.fur)}${R(11,3,2,3,p.light)}
    ${R(18,1,4,7,p.fur)}${R(19,2,2,4,p.light)}
    ${R(10,6,13,9,p.fur)}${R(11,6,10,2,p.fur2)}
    ${R(11,10,3,3,p.light)}
    ${R(21,10,6,4,p.light)}${R(25,10,2,2,p.dark)}${R(23,13,3,1,p.dark)}
    ${R(18,8,3,3,p.eye).replace('<rect ', '<rect class="p-eye" ')}${R(19,8,1,1,'#ffffff')}
    ${R(17,7,4,1,p.dark)}
    ${hurt ? R(23,11,2,2,p.dark) : ''}
  </g>`;

  const dy = pose === 'slam' ? 3 : (pose === 'dash' || pose === 'thrust' || pose === 'teleport' || pose === 'flurry') ? -1 : hurt ? 1 : 0;
  const dx = (pose === 'dash' || pose === 'thrust' || pose === 'teleport' || pose === 'flurry') ? 2 : hurt ? -2 : 0;
  const torso = `<g transform="translate(${dx} ${dy})">
    ${R(5,14,5,3,p.scarf)}${R(3,16,3,4,p.scarf)}
    ${R(10,14,12,11,p.fur)}${R(13,16,7,7,p.light)}
    ${R(10,13,13,3,p.scarf)}
    ${R(10,24,12,3,p.dark)}${R(15,24,3,3,p.glove)}
  </g>`;

  let legs = '';
  if(pose === 'kick'){
    legs = R(11,26,5,8,p.pants) + R(10,33,7,4,p.boot) + R(10,36,7,1,p.dark)
         + R(16,22,8,4,p.pants2) + R(23,19,5,4,p.pants2)
         + R(26,17,5,5,p.boot2) + R(29,18,2,3,p.boot);
  } else if(pose === 'slam'){
    legs = R(8,25,6,7,p.pants) + R(7,31,8,5,p.boot) + R(7,35,8,1,p.dark)
         + R(18,25,6,7,p.pants2) + R(18,31,8,5,p.boot2) + R(18,35,8,1,p.dark);
  } else if(pose === 'dash' || pose === 'thrust' || pose === 'teleport' || pose === 'flurry'){
    legs = R(5,26,9,4,p.pants) + R(1,24,5,4,p.boot)
         + R(18,25,5,9,p.pants2) + R(18,33,8,4,p.boot2) + R(18,36,8,1,p.dark);
  } else if(pose === 'raise' || hurt){
    legs = R(8,26,5,8,p.pants) + R(7,33,7,4,p.boot) + R(7,36,7,1,p.dark)
         + R(19,26,5,8,p.pants2) + R(19,33,7,4,p.boot2) + R(19,36,7,1,p.dark);
  } else if(pose === 'uppercut'){
    legs = R(8,25,6,8,p.pants) + R(7,32,7,4,p.boot) + R(7,35,7,1,p.dark)
         + R(19,26,5,8,p.pants2) + R(19,33,7,4,p.boot2) + R(19,36,7,1,p.dark);
  } else {
    legs = R(10,26,5,8,p.pants) + R(9,33,7,4,p.boot) + R(9,36,7,1,p.dark)
         + R(17,26,5,8,p.pants2) + R(17,33,8,4,p.boot2) + R(17,36,8,1,p.dark);
  }

  let arms = '';
  if(pose === 'guard'){
    arms = R(7,17,4,5,p.fur) + R(7,13,5,5,p.boot)
         + R(21,17,5,4,p.fur) + R(25,14,5,5,p.boot);
  } else if(pose === 'kick'){
    arms = R(3,15,7,3,p.fur) + R(1,14,4,4,p.glove)
         + R(21,12,3,6,p.fur) + R(21,9,4,4,p.glove);
  } else if(pose === 'bow'){
    arms = R(9,17,4,5,p.fur) + R(18,17,4,3,p.light)
         + R(21,17,7,3,p.fur) + R(27,16,3,4,p.light)
         + `<g>${R(29,8,2,16,'#8b5a2b')}${R(27,7,2,2,'#8b5a2b')}${R(27,23,2,2,'#8b5a2b')}
            ${R(28,8,1,16,'#f4f1e6')}${R(20,15,9,1,'#dfe6f2')}${R(28,14,2,3,p.boot)}</g>`;
  } else if(pose === 'sword'){
    arms = R(7,17,4,6,p.fur) + R(6,21,5,4,p.glove)
         + R(21,15,5,4,p.fur) + R(25,13,4,4,p.light)
         + `<g>${R(27,2,3,12,'#cfd8ea')}${R(28,0,2,2,'#f2f6ff')}${R(27,3,1,10,'#8fa2c8')}
            ${R(24,13,8,2,p.glove)}${R(26,15,2,4,'#8b5a2b')}</g>`;
  } else if(pose === 'raise'){
    arms = R(8,10,3,7,p.fur) + R(7,6,4,4,p.glove)
         + R(22,10,3,7,p.fur) + R(23,6,4,4,p.glove);
  } else if(pose === 'slam'){
    arms = R(5,20,4,7,p.fur) + R(3,26,5,5,p.glove)
         + R(24,20,4,7,p.fur) + R(24,26,5,5,p.glove);
  } else if(pose === 'dash' || pose === 'thrust' || pose === 'teleport' || pose === 'flurry'){
    arms = R(4,17,6,3,p.fur) + R(2,16,4,4,p.glove)
         + R(23,17,7,3,p.fur) + R(29,16,3,5,p.glove);
  } else if(pose === 'uppercut'){
    arms = R(7,17,4,6,p.fur) + R(6,21,5,4,p.glove)
         + R(21,10,5,4,p.fur) + R(25,6,4,5,p.glove);
  } else if(hurt){
    arms = R(5,13,4,5,p.fur) + R(3,10,4,4,p.glove)
         + R(20,13,3,6,p.fur) + R(20,10,4,4,p.glove);
  } else {
    arms = R(7,16,4,7,p.fur) + R(6,21,5,5,p.glove)
         + R(21,16,4,6,p.fur) + R(23,15,5,5,p.glove);
  }

  return `<svg viewBox="0 0 32 40" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${tail}${legs}${torso}${head}
    <g>${arms}</g>
  </svg>`;
}

function orbSVG(el){
  const R = (x,y,w,h,c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  let s = '';
  [[2,8,8],[4,5,14],[6,3,18],[8,2,20],[10,1,22],[12,1,22],[14,1,22],[16,2,20],[18,3,18],[20,5,14],[22,8,8]]
    .forEach(([y,x,w]) => s += R(x,y,w,2,el.color));
  [[8,6,12],[10,4,16],[12,4,16],[14,4,16],[16,6,12]]
    .forEach(([y,x,w]) => s += R(x,y,w,2,el.core));
  s += R(8,7,4,3,'#ffffff');

  if(el.key === 'fire') s += R(6,1,3,4,el.color)+R(12,0,3,5,el.color)+R(17,2,3,4,el.color)+R(10,10,4,4,'#fff3b0');
  if(el.key === 'ice')  s += R(4,5,3,3,'#ffffff')+R(17,4,3,3,'#ffffff')+R(10,16,4,3,'#ffffff')+R(7,9,2,6,'#ffffff');
  if(el.key === 'lightning') s += `<path d="M12 2h4l-3 6h4l-6 10 2-8h-4z" fill="#ffffff"/>`+R(2,10,3,2,el.color)+R(19,14,3,2,el.color);
  if(el.key === 'cyber') s += `<g class="p-glitch">`+R(4,4,4,4,'#ffffff')+R(16,4,4,4,el.core)+R(4,16,4,4,el.core)+R(16,16,4,4,'#ffffff')+`</g>`;
  if(el.key === 'nature') s += R(5,5,4,3,'#ffffff')+R(15,4,4,3,el.core)+R(16,15,4,3,'#ffffff')+R(11,9,2,6,'#2f7a45');
  if(el.key === 'dark') s += R(6,6,12,12,'#241631')+R(8,8,3,3,el.color)+R(14,12,3,3,el.color);
  if(el.key === 'light') s += R(6,1,3,4,el.color)+R(12,0,3,5,el.color)+R(17,2,3,4,el.color)+R(10,10,4,4,'#ffffff');
  if(el.key === 'cosmos') s += R(4,4,2,2,el.color)+R(18,4,2,2,el.color)+R(4,18,2,2,el.color)+R(18,18,2,2,el.color)+R(10,10,4,4,el.core);

  return `<svg viewBox="0 0 24 24" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;
}

function burstSVG(el){
  const R = (x,y,w,h,c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  return `<svg viewBox="0 0 24 24" width="64" height="64" shape-rendering="crispEdges" aria-hidden="true">
    ${R(10,1,4,22,el.color)}${R(1,10,22,4,el.color)}
    ${R(5,5,4,4,el.core)}${R(15,5,4,4,el.core)}${R(5,15,4,4,el.core)}${R(15,15,4,4,el.core)}
    ${R(9,9,6,6,'#ffffff')}
  </svg>`;
}

function ringSVG(el){
  const R = (x,y,w,h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${el.color}"/>`;
  return `<svg viewBox="0 0 48 48" width="120" height="120" shape-rendering="crispEdges" aria-hidden="true">
    ${R(16,2,16,4)}${R(8,6,8,4)}${R(32,6,8,4)}${R(4,10,4,10)}${R(40,10,4,10)}
    ${R(2,20,4,10)}${R(42,20,4,10)}${R(4,30,4,8)}${R(40,30,4,8)}
    ${R(8,38,8,4)}${R(32,38,8,4)}${R(16,42,16,4)}
    <rect x="20" y="18" width="8" height="8" fill="${el.core}"/>
  </svg>`;
}

function renderIcons(){
  document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));
}

function renderClasses(){
  $('classGrid').innerHTML = CONFIG.classes.map((c,i) => `
    <label class="pixel-card" data-class="${c.key}" style="--card:${c.color}">
      <input type="radio" name="fightClass" value="${c.key}" required>
      ${icon(c.icon)}
      <span class="card-body">
        <span class="card-title">${c.name}</span>
        <span class="card-desc">${c.desc}</span>
      </span>
      <span class="card-num">0${i+1}</span>
    </label>`).join('');
}

function renderStats(){
  $('statsList').innerHTML = CONFIG.stats.map(s => `
    <div class="stat-row" data-stat="${s.key}" style="--stat:${s.color}" title="${s.hint}">
      <span class="stat-name">${icon(s.icon)}${s.label}</span>
      <div class="stat-bar">
        ${Array.from({length:CONFIG.maxPerStat}, (_,i) =>
          `<button type="button" class="seg" data-level="${i+1}" aria-label="${s.label}: уровень ${i+1}"></button>`
        ).join('')}
      </div>
      <button type="button" class="step" data-dir="-1" aria-label="Уменьшить: ${s.label}">-</button>
      <span class="stat-value" id="val-${s.key}">0</span>
      <button type="button" class="step" data-dir="1" aria-label="Увеличить: ${s.label}">+</button>
    </div>`).join('');
}

function renderSelects(){
  $('ultType').innerHTML = CONFIG.ultTypes.map(t => `<option value="${t.key}">${t.name}</option>`).join('');
  $('ultEffect').innerHTML = CONFIG.ultEffects.map(e => `<option value="${e.key}">${e.name}</option>`).join('');
}

function renderElements(){
  $('elementRow').innerHTML = CONFIG.elements.map(e => `
    <button type="button" class="element-chip" data-element="${e.key}"
            style="--el:${e.color}" aria-pressed="false">${icon(e.icon)}${e.name}</button>`).join('');
}

function renderAnimalSelector(){
  $('animalSelector').innerHTML = ANIMALS.map(a => `
    <button type="button" class="animal-chip" data-animal="${a.key}"
            style="--el:${a.color}" aria-pressed="false">${icon(a.key)}${a.name}</button>`).join('');
}

function currentClass(){ return byKey(CONFIG.classes, state.fighterClass); }
function currentType(){ return byKey(CONFIG.ultTypes, state.ultType); }
function currentEffect(){ return byKey(CONFIG.ultEffects, state.ultEffect); }
function currentElement(){ return byKey(CONFIG.elements, state.element); }
function totalSpent(){ return Object.values(state.stats).reduce((a,b) => a+b, 0); }

function renderHero(){
  const c = currentClass();
  $('heroSprite').innerHTML = fighterSVG(c ? c.pose : 'idle', 'hero');
  $('heroClassTag').textContent = c ? c.name : 'ВЫБЕРИ КЛАСС';
}

function calculateStats(){
  const base = { hp: 100, dmg: 10, spd: 100, agi: 100, charge: 100 };
  const multipliers = {
    hp: 1 + (state.stats.hp * 0.15),
    dmg: 1 + (state.stats.dmg * 0.10),
    spd: 1 + (state.stats.spd * 0.05),
    agi: 1 + (state.stats.agi * 0.08),
    charge: 1 + (state.stats.charge * 0.15)
  };
  return {
    hp: Math.round(base.hp * multipliers.hp),
    dmg: Math.round(base.dmg * multipliers.dmg * 10) / 10,
    spd: Math.round(base.spd * multipliers.spd),
    agi: Math.round(base.agi * multipliers.agi),
    charge: Math.round(base.charge * multipliers.charge)
  };
}

function updateLoadout(){
  const name = ($('charName').value.trim() || 'ИГРОК 1').toUpperCase();
  $('heroName').textContent = name;
  $('hudName').textContent = name;

  const active = CONFIG.stats.filter(s => state.stats[s.key] > 0);
  $('heroLoadout').innerHTML = active.length
    ? active.map(s => `<span class="loadout-chip" style="--chip:${s.color}">${icon(s.icon)}${state.stats[s.key]}</span>`).join('')
    : `<span class="loadout-empty">Раздай жетоны ниже</span>`;

  const total = totalSpent();
  $('buildFill').style.width = (total / CONFIG.maxTokens * 100) + '%';
  $('buildText').textContent = `${total}/${CONFIG.maxTokens}`;

  const calcStats = calculateStats();
  $('heroStats').innerHTML = `
    <div class="stat-line">HP: <span>${calcStats.hp}</span></div>
    <div class="stat-line">DMG: <span>${calcStats.dmg}</span></div>
    <div class="stat-line">SPD: <span>${calcStats.spd}%</span></div>
    <div class="stat-line">AGI: <span>${calcStats.agi}%</span></div>
    <div class="stat-line">CHG: <span>${calcStats.charge}%</span></div>
  `;
}

function updateStatsUI(){
  const left = CONFIG.maxTokens - totalSpent();
  $('tokensLeft').textContent = left;

  CONFIG.stats.forEach(s => {
    const val = state.stats[s.key];
    const row = document.querySelector(`.stat-row[data-stat="${s.key}"]`);
    $(`val-${s.key}`).textContent = val;
    row.classList.toggle('is-max', val >= CONFIG.maxPerStat);

    row.querySelectorAll('.seg').forEach((seg,i) => {
      seg.classList.toggle('on', i < val);
      seg.setAttribute('aria-pressed', i < val ? 'true' : 'false');
    });

    const minus = row.querySelector('.step[data-dir="-1"]');
    const plus = row.querySelector('.step[data-dir="1"]');
    minus.disabled = val === 0;
    plus.disabled = left === 0 || val >= CONFIG.maxPerStat;
  });

  updateLoadout();
}

function setStat(key, value){
  const others = totalSpent() - state.stats[key];
  const next = Math.max(0, Math.min(CONFIG.maxPerStat, value));

  if(others + next > CONFIG.maxTokens){
    toast('Жетоны закончились. Уменьши другую характеристику.', true);
    $('statsField').classList.remove('shake-field');
    void $('statsField').offsetWidth;
    $('statsField').classList.add('shake-field');
    return;
  }
  state.stats[key] = next;
  updateStatsUI();
  updateMeter();
}

const arena = $('arena'), f1 = $('f1'), f2 = $('f2');
const vfx = $('vfx'), pop = $('pop');
let playing = false, animToken = 0, demoTimer = null;

function alive(token){ return token === animToken; }

function setPose(el, pose, side){
  el.querySelector('.sprite').innerHTML = fighterSVG(pose, side);
}

function updateMeter(){
  const charge = state.stats.charge || 0;
  $('meterFill').style.width = (20 + charge * 12) + '%';
}

function resetArena(){
  animToken++;
  playing = false;
  $('playUlt').disabled = false;
  clearTimeout(demoTimer);

  vfx.innerHTML = '';
  pop.className = 'pop';
  arena.classList.remove('shake');

  f1.className = 'fighter f1';
  f2.className = 'fighter f2';
  f1.style.removeProperty('--lunge');
  f2.style.removeProperty('--knock');

  const c = currentClass();
  setPose(f1, c ? c.pose : 'idle', 'hero');
  setPose(f2, 'guard', 'rival');

  $('hp1').style.width = '70%';
  $('hp2').style.width = '100%';
  $('arenaStatus').textContent = 'ВЫБЕРИ ПРИЁМ';
  updateMeter();
  updateArenaInfo();
}

function updateArenaInfo(){
  const t = currentType(), e = currentEffect(), el = currentElement();
  $('arenaDesc').innerHTML = `<b>${t.name} / ${el.name}:</b> ${t.desc} <b>${e.name}:</b> ${e.desc}`;
  document.querySelectorAll('.element-chip').forEach(btn => {
    const on = btn.dataset.element === state.element;
    btn.classList.toggle('is-selected', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

function scheduleDemo(){
  clearTimeout(demoTimer);
  resetArena();
  demoTimer = setTimeout(() => playUlt(), 420);
}

function geometry(){
  const A = arena.getBoundingClientRect();
  const r1 = f1.getBoundingClientRect();
  const r2 = f2.getBoundingClientRect();
  const ground = A.height - 36;
  return {
    A,
    x1: r1.left - A.left + r1.width / 2,
    x2: r2.left - A.left + r2.width / 2,
    top1: ground - r1.height,
    top2: ground - r2.height,
    ground,
    width: r1.width
  };
}

function spawn(html, cls, x, y, extra = ''){
  const el = document.createElement('div');
  el.className = 'vfx-piece ' + cls;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  if(extra) el.style.cssText += extra;
  el.innerHTML = html;
  vfx.appendChild(el);
  return el;
}

function showPop(text, color){
  pop.textContent = text;
  pop.style.color = color;
  pop.classList.remove('show');
  void pop.offsetWidth;
  pop.classList.add('show');
}

function sparks(x, y, el, count = 6){
  for(let i = 0; i < count; i++){
    const angle = (Math.PI * 2 / count) * i;
    const sx = Math.cos(angle) * (28 + Math.random() * 22);
    const sy = Math.sin(angle) * (22 + Math.random() * 22);
    spawn(`<div style="width:6px;height:6px;background:${i % 2 ? el.core : el.color}"></div>`,
      'spark', x, y, `--sx:${sx}px;--sy:${sy}px;animation-delay:${i * 0.02}s`);
  }
}

async function playUlt(){
  if(playing) return;
  const token = ++animToken;
  playing = true;
  $('playUlt').disabled = true;
  clearTimeout(demoTimer);

  vfx.innerHTML = '';
  pop.className = 'pop';
  f1.className = 'fighter f1';
  f2.className = 'fighter f2';
  $('hp1').style.width = '70%';
  $('hp2').style.width = '100%';

  const t = currentType(), eff = currentEffect(), el = currentElement();
  $('meterFill').style.width = '100%';
  $('arenaStatus').textContent = `${t.verb} // ${el.name}`;

  try{
    await sleep(220);
    if(!alive(token)) return;

    const g = geometry();
    setPose(f1, t.pose, 'hero');
    setPose(f2, 'guard', 'rival');
    f1.classList.add('is-acting');

    if(t.key === 'dash'){
      const lunge = Math.max(60, g.x2 - g.x1 - g.width * 0.55);
      f1.style.setProperty('--lunge', lunge + 'px');
      f1.classList.add('run-dash');
      await sleep(500);
      if(!alive(token)) return;

    } else if(t.key === 'aoe'){
      await sleep(300);
      if(!alive(token)) return;
      spawn(ringSVG(el), 'ring', g.x1, g.ground - 55);
      sparks(g.x1, g.ground - 55, el, 8);
      arena.classList.add('shake');
      await sleep(280);
      if(!alive(token)) return;

    } else if(t.key === 'drop'){
      await sleep(280);
      if(!alive(token)) return;
      const orb = spawn(
        `<div class="orb-pulse" style="width:64px;height:64px">${orbSVG(el)}</div>`,
        'falling-orb', g.x2, 0, `--fall:${g.ground - 70}px`
      );
      orb.querySelector('svg').style.cssText = 'width:64px;height:64px';
      await sleep(650);
      if(!alive(token)) return;

    } else if(t.key === 'charge'){
      await sleep(300);
      if(!alive(token)) return;
      const beam = document.createElement('div');
      beam.className = 'beam';
      beam.style.cssText = `left:${g.x1 + 24}px;top:${g.ground - 66}px;width:${Math.max(60, g.x2 - g.x1 - 30)}px;--el:${el.color};--core:${el.core}`;
      vfx.appendChild(beam);
      await sleep(420);
      if(!alive(token)) return;

    } else if(t.key === 'teleport'){
      f1.style.opacity = '0';
      await sleep(300);
      if(!alive(token)) return;
      f1.style.left = 'auto';
      f1.style.right = '12%';
      f1.style.opacity = '1';
      await sleep(200);
      if(!alive(token)) return;

    } else if(t.key === 'flurry'){
      for(let i = 0; i < 5; i++){
        if(!alive(token)) return;
        f1.style.transform = `translateX(${i % 2 ? 5 : -5}px)`;
        await sleep(100);
      }
      f1.style.transform = '';
      await sleep(200);
      if(!alive(token)) return;

    } else if(t.key === 'uppercut'){
      await sleep(300);
      if(!alive(token)) return;
    }

    f1.classList.remove('is-acting', 'run-dash');
    setPose(f2, 'hurt', 'rival');
    f2.classList.add('hurt-flash');
    spawn(burstSVG(el), 'impact', g.x2, g.ground - 68);
    sparks(g.x2, g.ground - 68, el);
    arena.classList.remove('shake');
    void arena.offsetWidth;
    arena.classList.add('shake');

    const popColors = { damage:'#ff5a5f', stun:'#ffd23f', knockback:'#57d7ff', vampire:'#7ce38b', slow:'#57d7ff', dot:'#ff6b2c', steal:'#ff9d3c' };
    showPop(eff.pop, popColors[eff.key]);

    if(eff.key === 'damage'){
      $('hp2').style.width = '35%';

    } else if(eff.key === 'stun'){
      $('hp2').style.width = '65%';
      for(let i = 0; i < 3; i++){
        const star = spawn(`<svg viewBox="0 0 16 16" width="14" height="14" shape-rendering="crispEdges">${ICONS.star}</svg>`,
          'star', g.x2 - 16 + i * 16, g.top2 - 8);
        star.style.animationDelay = (i * 0.12) + 's';
      }

    } else if(eff.key === 'knockback'){
      $('hp2').style.width = '55%';
      f2.style.setProperty('--knock', Math.min(90, g.A.width * 0.10) + 'px');
      f2.classList.add('knocked');

    } else if(eff.key === 'vampire'){
      $('hp2').style.width = '55%';
      $('hp1').style.width = '95%';
      for(let i = 0; i < 3; i++){
        spawn(`<div style="width:14px;height:14px;position:relative">
                 <div style="position:absolute;left:5px;top:0;width:4px;height:14px;background:#7ce38b"></div>
                 <div style="position:absolute;left:0;top:5px;width:14px;height:4px;background:#7ce38b"></div>
               </div>`, 'heal', g.x1 - 18 + i * 18, g.top1 - 6);
      }

    } else if(eff.key === 'slow'){
      $('hp2').style.width = '70%';
      for(let i = 0; i < 2; i++){
        spawn(`<svg viewBox="0 0 16 16" width="20" height="20" shape-rendering="crispEdges">
                 <rect x="2" y="2" width="12" height="12" fill="#57d7ff"/>
                 <rect x="4" y="4" width="8" height="8" fill="#10202a"/>
                 <rect x="7" y="6" width="2" height="5" fill="#57d7ff"/>
                 <rect x="6" y="7" width="4" height="2" fill="#57d7ff"/>
               </svg>`, 'star', g.x2 - 10 + i * 20, g.top2 - 12);
      }

    } else if(eff.key === 'dot'){
      $('hp2').style.width = '80%';
      for(let i = 0; i < 3; i++){
        spawn(`<div style="width:12px;height:12px;background:#ff6b2c;animation:sparkFly .6s steps(4) forwards;--sx:0;--sy:-30px"></div>`,
          'spark', g.x2 - 15 + i * 15, g.ground - 60);
      }

    } else if(eff.key === 'steal'){
      $('hp2').style.width = '75%';
      $('hp1').style.width = '85%';
      for(let i = 0; i < 2; i++){
        spawn(`<svg viewBox="0 0 16 16" width="18" height="18" shape-rendering="crispEdges">
                 <rect x="7" y="2" width="2" height="12" fill="#ff9d3c"/>
                 <rect x="2" y="7" width="12" height="2" fill="#ff9d3c"/>
                 <rect x="4" y="4" width="2" height="2" fill="#ffd23f"/>
                 <rect x="10" y="4" width="2" height="2" fill="#ffd23f"/>
               </svg>`, 'heal', g.x1 - 10 + i * 20, g.top1 - 10);
      }
    }

    await sleep(950);
    if(!alive(token)) return;
    resetArena();

  } finally {
    if(alive(token)){
      playing = false;
      $('playUlt').disabled = false;
    }
  }
}

let toastTimer;
function toast(text, error = false){
  const t = $('toast');
  t.textContent = text;
  t.classList.toggle('error', error);
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

function bindEvents(){
  $('charName').addEventListener('input', updateLoadout);

  $('classGrid').addEventListener('change', e => {
    if(e.target.name !== 'fightClass') return;
    state.fighterClass = e.target.value;
    document.querySelectorAll('.pixel-card').forEach(card =>
      card.classList.toggle('is-selected', card.dataset.class === state.fighterClass));
    renderHero();
    resetArena();
  });

  $('statsList').addEventListener('click', e => {
    const row = e.target.closest('.stat-row');
    if(!row) return;
    const key = row.dataset.stat;

    const seg = e.target.closest('.seg');
    if(seg){
      const level = Number(seg.dataset.level);
      if(state.stats[key] >= level) setStat(key, level - 1);
      else {
        const others = totalSpent() - state.stats[key];
        setStat(key, Math.min(level, CONFIG.maxPerStat, CONFIG.maxTokens - others));
      }
      return;
    }

    const step = e.target.closest('.step');
    if(step && !step.disabled) setStat(key, state.stats[key] + Number(step.dataset.dir));
  });

  $('ultType').addEventListener('change', e => { state.ultType = e.target.value; scheduleDemo(); });
  $('ultEffect').addEventListener('change', e => { state.ultEffect = e.target.value; scheduleDemo(); });

  $('elementRow').addEventListener('click', e => {
    const btn = e.target.closest('.element-chip');
    if(!btn) return;
    state.element = btn.dataset.element;
    scheduleDemo();
  });

  $('animalSelector').addEventListener('click', e => {
    const btn = e.target.closest('.animal-chip');
    if(!btn) return;
    state.animal = btn.dataset.animal;
    document.querySelectorAll('.animal-chip').forEach(b => {
      const on = b.dataset.animal === state.animal;
      b.classList.toggle('is-selected', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderHero();
    resetArena();
  });

  $('playUlt').addEventListener('click', () => playUlt());

  $('characterForm').addEventListener('submit', async e => {
    e.preventDefault();

    if(!$('characterForm').reportValidity()) return;

    if(!state.fighterClass){
      toast('Выбери класс боя.', true);
      return;
    }
    if(totalSpent() !== CONFIG.maxTokens){
      toast(`Раздай все ${CONFIG.maxTokens} жетонов. Осталось: ${CONFIG.maxTokens - totalSpent()}.`, true);
      $('statsField').scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }

    const payload = {
      event: 'United Furry Con',
      character: {
        name: $('charName').value.trim(),
        reference: $('refLink').value.trim(),
        detail: $('visualDetail').value.trim(),
        class: state.fighterClass,
        stats: { ...state.stats },
        ultimate: {
          type: state.ultType,
          effect: state.ultEffect,
          element: state.element
        },
        quotes: {
          win: $('winQuote').value.trim(),
          ultimate: $('ultQuote').value.trim()
        }
      },
      meta: { version:'1.0', submittedAt:new Date().toISOString() }
    };

    console.log('Анкета бойца:', payload);

    toast('Анкета собрана! Данные в консоли (F12). Подключи свой API для отправки.');
  });
}

renderIcons();
renderClasses();
renderStats();
renderSelects();
renderElements();
renderAnimalSelector();
renderHero();
updateStatsUI();
bindEvents();
resetArena();