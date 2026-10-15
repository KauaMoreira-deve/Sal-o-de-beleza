/* =========================================================
   CONFIGURAÇÃO: preencha o WhatsApp do salão (só números, com DDI+DDD).
   Vazio = o botão abre o Direct do Instagram e copia a mensagem.
   ========================================================= */
const CONTATO = {
  whatsapp: '',               // ex.: '5519999999999'
  instagram: 'georgecabeleireiros'
};

/* ---------- faixa ---------- */
const words = ['Corte','Cor','Tratamento','Noivas','Maquiagem','Unhas','Correção de cor'];
document.getElementById('track').innerHTML = [...words,...words,...words,...words].map(w=>`<span>${w}</span>`).join('');

/* ---------- serviços ---------- */
const SERVICES = [
  {t:'Cor', d:'Coloração, mechas, morena iluminada, cobertura de brancos e cores fantasia. Fórmula montada na hora, para o seu fundo e o seu tom de pele.', tags:['Coloração','Mechas','Iluminado','Fantasia','Cobertura de brancos']},
  {t:'Corte', d:'Corte pensado para o seu fio, seu rosto e sua rotina. Curto, long bob, camadas, franja e cachos com corte a seco.', tags:['Feminino','Camadas','Franja','Cacheados','Visagismo']},
  {t:'Tratamento', d:'Protocolos profissionais de hidratação, nutrição e reconstrução, com acompanhamento entre as visitas.', tags:['Reconstrução','Hidratação','Nutrição','Matizador','Cronograma']},
  {t:'Noivas', d:'Penteado e maquiagem para o grande dia, com prova antes. Também para madrinhas, mães e formandas.', tags:['Penteado','Maquiagem','Prova','Madrinhas']},
  {t:'Maquiagem', d:'Maquiagem social e para eventos, que valoriza sem pesar e dura a noite inteira.', tags:['Social','Eventos','Pele','Olhos']},
  {t:'Unhas & sobrancelhas', d:'Manicure, pedicure, alongamento e nail art. Design de sobrancelhas com henna.', tags:['Manicure','Nail art','Alongamento','Henna']}
];
const menu = document.getElementById('menu');
SERVICES.forEach((s,i) => {
  const el = document.createElement('div');
  el.className = 'item' + (i===0?' open':'');
  el.innerHTML = `<button aria-expanded="${i===0}"><span class="no">0${i+1}</span><span class="t">${s.t}</span><span class="plus">+</span></button>
    <div class="body"><div><div class="inner"><span></span><p>${s.d}</p><div class="tags">${s.tags.map(x=>`<span>${x}</span>`).join('')}</div></div></div></div>`;
  el.querySelector('button').onclick = () => {
    const open = !el.classList.contains('open');
    menu.querySelectorAll('.item').forEach(x => {x.classList.remove('open'); x.querySelector('button').setAttribute('aria-expanded',false)});
    if(open){ el.classList.add('open'); el.querySelector('button').setAttribute('aria-expanded',true); }
  };
  menu.appendChild(el);
});

/* ---------- antes / depois ---------- */
const cmp = document.getElementById('compare');
let dragging=false;
function setPos(clientX){
  const r = cmp.getBoundingClientRect();
  const v = Math.max(2, Math.min(98, (clientX - r.left)/r.width*100));
  cmp.style.setProperty('--pos', v+'%'); cmp.setAttribute('aria-valuenow', Math.round(v));
}
cmp.addEventListener('pointerdown', e => { dragging=true; cmp.setPointerCapture(e.pointerId); setPos(e.clientX); });
cmp.addEventListener('pointermove', e => { if(dragging || e.pointerType==='mouse') setPos(e.clientX); });
cmp.addEventListener('pointerup', () => dragging=false);
cmp.addEventListener('keydown', e => {
  const v = parseFloat(cmp.style.getPropertyValue('--pos'));
  if(e.key==='ArrowLeft') cmp.style.setProperty('--pos', Math.max(2,v-5)+'%');
  if(e.key==='ArrowRight') cmp.style.setProperty('--pos', Math.min(98,v+5)+'%');
});

/* ---------- décadas ---------- */
const DECADES = [
  {y:'60', h:'O bufante e o laquê', p:'Volume no topo, rolinhos e muito spray. Cabelo era arquitetura.', c:'linear-gradient(180deg,#3a2616,#6e4a2c)'},
  {y:'70', h:'O shag e o volume livre', p:'Camadas desfiadas e o cabelo solto, sem medo do vento.', c:'linear-gradient(180deg,#5a3a25,#9a6a3c)'},
  {y:'80', h:'Permanente e franja armada', p:'Cachos de bobe, mechas marcadas e muito, muito volume.', c:'linear-gradient(180deg,#7a5530,#d7b27a)'},
  {y:'90', h:'O liso escovado', p:'Escova perfeita, o “Rachel” e o castanho brilhante.', c:'linear-gradient(180deg,#2f1e14,#5a3a25)'},
  {y:'00', h:'Chapinha e reflexos', p:'Liso de ponta a ponta, luzes finas e o loiro em alta.', c:'linear-gradient(180deg,#8a6a40,#e2cfa0)'},
  {y:'10', h:'Ombré e cachos assumidos', p:'Raiz escura, pontas claras e a transição capilar ganhando a rua.', c:'linear-gradient(180deg,#2f1e14 30%,#c9a26a)'},
  {y:'20', h:'Cor sob medida', p:'Saúde do fio em primeiro lugar e uma fórmula diferente para cada cliente. É onde estamos.', c:'linear-gradient(180deg,#1f3c80,#8a4f26 50%,#e2d9c8)', now:true}
];
const dec = document.getElementById('decades');
dec.innerHTML = DECADES.map(d => `<article class="dec${d.now?' now':''}">
  <span class="mono" style="opacity:.6">${d.now?'Hoje':'Década'}</span>
  <div class="y">’${d.y}</div>
  <div class="chip" style="background:${d.c}"></div>
  <h4>${d.h}</h4><p>${d.p}</p></article>`).join('');
// arrastar com o mouse
(() => {
  let down=false, sx=0, sl=0;
  dec.addEventListener('pointerdown', e => { if(e.pointerType!=='mouse') return; down=true; sx=e.clientX; sl=dec.scrollLeft; dec.classList.add('drag'); });
  addEventListener('pointerup', () => { down=false; dec.classList.remove('drag'); });
  addEventListener('pointermove', e => { if(down) dec.scrollLeft = sl - (e.clientX - sx); });
})();

/* ---------- diagnóstico ---------- */
const Q = [
  {key:'servico', h:'O que te traz ao George?', opts:[
    ['cor','Mudar a cor','Coloração, mechas, iluminado'],
    ['correcao','Corrigir uma cor','Ficou laranja, manchado, escuro demais'],
    ['corte','Um corte novo','Mudança grande ou só acertar'],
    ['tratamento','Recuperar o fio','Quebra, ressecamento, elasticidade'],
    ['noiva','Noiva ou evento','Penteado e maquiagem'],
    ['unhas','Mãos e sobrancelhas','Manicure, nail art, henna']]},
  {key:'estado', h:'Como está seu cabelo hoje?', opts:[
    ['natural','Natural','Nunca pintei'],
    ['colorido','Com coloração','Tinta, tonalizante'],
    ['descolorido','Com mechas ou descoloração','Luzes, platinado'],
    ['quimica','Com química','Progressiva, alisamento, relaxamento']]},
  {key:'quando', h:'Para quando?', opts:[
    ['semana','Esta semana','O quanto antes'],
    ['mes','Nas próximas semanas','Sem pressa'],
    ['data','Tenho uma data marcada','Evento, viagem, casamento']]}
];
const LABEL = Object.fromEntries(Q.flatMap(q => q.opts.map(o => [o[0], o[1]])));
const REC = {
  cor:{t:'Consultoria de cor', p:'Antes da tinta, a conversa. Avaliamos o fundo de clareamento, o tom da pele e o histórico do fio para chegar na fórmula certa.'},
  correcao:{t:'Correção de cor', p:'É a especialidade da casa. Começamos pelo diagnóstico do fio e planejamos a correção em etapas, preservando a saúde do cabelo.'},
  corte:{t:'Corte personalizado', p:'Um corte pensado para o seu rosto, sua textura e o tempo que você tem de manhã.'},
  tratamento:{t:'Protocolo de tratamento', p:'Identificamos o que o fio perdeu (água, nutrientes ou massa) e montamos um protocolo com retornos programados.'},
  noiva:{t:'Dia da noiva / evento', p:'Penteado e maquiagem com prova antes, para chegar no dia sem surpresas.'},
  unhas:{t:'Mãos & sobrancelhas', p:'Manicure, nail art, alongamento e design com henna.'}
};
const answers = {};
const card = document.getElementById('card');
const steps = [...document.querySelectorAll('#steps i')];

function render(i){
  if(answers.servico==='unhas' && i===1) i = 2;
  steps.forEach((s,k) => s.classList.toggle('on', k<=i));
  if(i >= Q.length) return result();
  const q = Q[i];
  card.innerHTML = `<div class="q show"><span class="mono" style="color:var(--ink-3)">Pergunta ${i+1} de 3</span>
    <h3>${q.h}</h3><div class="opts">${q.opts.map((o,k)=>`<button class="opt" data-v="${o[0]}"><span>${o[1]}<small>${o[2]}</small></span><span class="k">${String.fromCharCode(65+k)}</span></button>`).join('')}</div>
    ${i>0?'<button class="back">← voltar</button>':''}</div>`;
  card.querySelectorAll('.opt').forEach(b => b.onclick = () => { answers[q.key] = b.dataset.v; render(i+1); });
  const bk = card.querySelector('.back'); if(bk) bk.onclick = () => render(answers.servico==='unhas' && i===2 ? 0 : i-1);
}

function message(){
  const L = [`Olá, George! Vim pelo site e gostaria de agendar.`, `• Serviço: ${LABEL[answers.servico]}`];
  if(answers.estado && answers.servico!=='unhas') L.push(`• Meu cabelo hoje: ${LABEL[answers.estado]}`);
  L.push(`• Quando: ${LABEL[answers.quando]}`);
  return L.join('\n');
}

function result(){
  const r = REC[answers.servico];
  const isCor = answers.servico==='cor' || answers.servico==='correcao';
  let extra = '';
  if(isCor && (answers.estado==='descolorido' || answers.estado==='quimica')) extra = '<p class="rec" style="margin-top:10px">Como há química anterior, fazemos teste de mecha antes de aplicar a cor.</p>';
  card.innerHTML = `<div class="q show result"><span class="mono" style="color:var(--ink-3)">Sua ficha</span>
    <h3>${r.t}</h3><p class="rec">${r.p}</p>${extra}
    <div class="ticket"><span class="mono">Ficha · George Cabeleireiros</span>
      <dl><dt>Serviço</dt><dd>${LABEL[answers.servico]}</dd>
      ${answers.servico!=='unhas'?`<dt>Fio hoje</dt><dd>${LABEL[answers.estado]}</dd>`:''}
      <dt>Quando</dt><dd>${LABEL[answers.quando]}</dd>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn solid" id="send">${CONTATO.whatsapp?'Enviar pelo WhatsApp':'Enviar pelo Instagram'} <span class="arr">→</span></button>
      <button class="btn" id="redo">Refazer</button>
    </div></div>`;
  document.getElementById('redo').onclick = () => { for(const k in answers) delete answers[k]; render(0); };
  document.getElementById('send').onclick = async () => {
    const msg = message();
    if(CONTATO.whatsapp){
      open(`https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    } else {
      try { await navigator.clipboard.writeText(msg); toast('Mensagem copiada. É só colar no Direct.'); } catch(e){}
      setTimeout(() => open(`https://ig.me/m/${CONTATO.instagram}`, '_blank', 'noopener'), 700);
    }
  };
}
let tt; function toast(t){ const el=document.getElementById('toast'); el.textContent=t; el.classList.add('show'); clearTimeout(tt); tt=setTimeout(()=>el.classList.remove('show'),3200); }
render(0);

/* ---------- lookbook ----------
   Coloque fotos do Instagram em /img com estes nomes. Sem foto, aparece a mecha na cor. */
const LOOKS = [
  {src:'img/look-1.jpg', t:'Morena iluminada', c:'#6b4429'},
  {src:'img/look-2.jpg', t:'Cachos dourados', c:'#a4733d'},
  {src:'img/look-3.jpg', t:'Azul profundo', c:'#1f3c80'},
  {src:'img/look-4.jpg', t:'Nail art', c:'#8c2a1c'},
  {src:'img/look-5.jpg', t:'Noiva', c:'#2f1e14'},
  {src:'img/look-6.jpg', t:'Loiro bege', c:'#cdb48c'}
];
document.getElementById('look').innerHTML = LOOKS.map((l,i) => `<figure class="ph rv" style="--c:${l.c};transition-delay:${i*60}ms">
  <img src="${l.src}" alt="${l.t}" loading="lazy" onerror="this.remove()">
  <figcaption><b>${l.t}</b><span class="mono">0${i+1}</span></figcaption></figure>`).join('');

/* ---------- reveal + nav ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.12});
document.querySelectorAll('.rv').forEach(el => io.observe(el));
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 30), {passive:true});
