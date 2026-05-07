/* ━━━ STATE ━━━ */
function load(k) { try { const s = localStorage.getItem('ss_' + k); return s ? JSON.parse(s) : DEFAULTS[k]; } catch (e) { return DEFAULTS[k]; } }
function save(k, v) { try { localStorage.setItem('ss_' + k, JSON.stringify(v)); } catch (e) {} }

let DB = { projects: load('projects'), ventures: load('ventures'), papers: load('papers'), posts: load('posts') };
let activeM = null;
let apEditingId = { projects: null, ventures: null, papers: null };

/* ━━━ THEME ━━━ */
function toggleTheme() {
  document.body.classList.toggle('light');
  localStorage.setItem('t', document.body.classList.contains('light') ? 'l' : 'd');
}
if (localStorage.getItem('t') === 'l') document.body.classList.add('light');

/* ━━━ DRAWER / NAV ━━━ */
function toggleDr() {
  const h = document.getElementById('ham'), d = document.getElementById('drawer');
  const o = d.classList.toggle('open');
  h.classList.toggle('open', o);
  h.setAttribute('aria-expanded', String(o));
  document.body.style.overflow = o ? 'hidden' : '';
}
function closeDr() {
  const h = document.getElementById('ham');
  h.classList.remove('open');
  h.setAttribute('aria-expanded', 'false');
  document.getElementById('drawer').classList.remove('open');
  document.body.style.overflow = '';
}

/* ━━━ CLOCK ━━━ */
function tick() {
  const t = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date());
  document.getElementById('n-clk').textContent = `${t} KTM`;
  const dc = document.getElementById('dr-clk');
  if (dc) dc.textContent = `${t} KTM`;
}
tick();
setInterval(tick, 1000);

/* ━━━ ACTIVE NAV ━━━ */
function updateActiveNav() {
  const ids = ['work', 'ventures', 'history', 'research', 'quotes', 'contact'];
  const links = document.querySelectorAll('.n-links a');
  let cur = '';
  ids.forEach(id => { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 100) cur = id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href').replace('#', '') === cur));
}

/* ━━━ CAROUSEL FACTORY ━━━ */
function makeCarousel({ wrapId, trackId, dotsId, prevId, nextId, getPerView, getPeek, onUpdate }) {
  let idx = 0, dragging = false, startX = 0, delta = 0;

  function cardW() {
    const wrap = document.getElementById(wrapId); if (!wrap) return 0;
    const pv = getPerView(), cards = document.getElementById(trackId).querySelectorAll('[data-card]');
    const maxIdx = Math.max(0, cards.length - pv);
    const peek = idx < maxIdx ? getPeek() : 0;
    return wrap.offsetWidth / (pv + peek);
  }
  function update() {
    const track = document.getElementById(trackId);
    const dotsEl = document.getElementById(dotsId);
    const prev = document.getElementById(prevId);
    const next = document.getElementById(nextId);
    if (!track) return;
    const pv = getPerView();
    const cards = track.querySelectorAll('[data-card]');
    const maxIdx = Math.max(0, cards.length - pv);
    idx = Math.min(idx, maxIdx);
    const cw = cardW();
    cards.forEach(c => { c.style.flex = `0 0 ${cw}px`; c.style.minWidth = `${cw}px`; });
    track.style.transform = `translateX(-${idx * cw}px)`;
    if (dotsEl) {
      dotsEl.innerHTML = Array.from({ length: maxIdx + 1 }, (_, i) =>
        `<div class="c-dot${i === idx ? ' on' : ''}" onclick="window['${wrapId}_goto'](${i})" title="Slide ${i+1}"></div>`
      ).join('');
    }
    if (prev) prev.disabled = idx === 0;
    if (next) next.disabled = idx >= maxIdx;
    if (onUpdate) onUpdate(idx);
  }
  function move(dir) {
    const track = document.getElementById(trackId); if (!track) return;
    const maxIdx = Math.max(0, track.querySelectorAll('[data-card]').length - getPerView());
    idx = Math.max(0, Math.min(idx + dir, maxIdx));
    update();
  }
  function goTo(i) { idx = i; update(); }

  window[wrapId + '_move'] = move;
  window[wrapId + '_goto'] = goTo;
  window[wrapId + '_update'] = update;
  window[wrapId + '_reset'] = () => { idx = 0; update(); };

  const wrap = document.getElementById(wrapId);
  if (wrap) {
    const track = document.getElementById(trackId);
    function onStart(x) { dragging = true; startX = x; delta = 0; track.style.transition = 'none'; }
    function onMove(x) { if (!dragging) return; delta = x - startX; const cw = cardW(); track.style.transform = `translateX(${-(idx * cw) + delta}px)`; }
    function onEnd() { if (!dragging) return; dragging = false; track.style.transition = ''; const cw = cardW(); if (Math.abs(delta) > cw * .22) move(delta < 0 ? 1 : -1); else update(); }
    wrap.addEventListener('mousedown', e => onStart(e.clientX));
    window.addEventListener('mousemove', e => onMove(e.clientX));
    window.addEventListener('mouseup', onEnd);
    wrap.addEventListener('touchstart', e => onStart(e.touches[0].clientX), { passive: true });
    wrap.addEventListener('touchmove', e => onMove(e.touches[0].clientX), { passive: true });
    wrap.addEventListener('touchend', onEnd, { passive: true });
  }
  window.addEventListener('resize', () => { clearTimeout(window['_rt_' + wrapId]); window['_rt_' + wrapId] = setTimeout(update, 120); });
  return { update, move, goTo };
}

/* ━━━ SKILLS ━━━ */
let skType = 'managerial';
let skCarousel;

function switchSk(type, el) {
  document.querySelectorAll('.sk-tog-btn').forEach(t => { t.classList.remove('on'); t.setAttribute('aria-pressed', 'false'); });
  el.classList.add('on');
  el.setAttribute('aria-pressed', 'true');
  skType = type;
  renderSkCards();
}

function renderSkCards() {
  const track = document.getElementById('sk-track'); if (!track) return;
  track.style.transition = 'none';
  track.innerHTML = SK_DATA[skType].map(d => `
    <div class="sk-card" data-card>
      <div class="sk-card-num">${d.num}</div>
      <div class="sk-card-layer">${d.layer}</div>
      <h3 class="sk-card-title">${d.title}</h3>
      <div class="sk-bars">${d.skills.map(s => {
        const p = SK_PCT[s] || 75;
        return `<div class="sk-bar-row"><div class="sk-bar-head"><span class="sk-bar-name">${s}</span><span class="sk-bar-pct">${p}%</span></div><div class="sk-bar-track"><div class="sk-bar-fill" style="width:${p}%"></div></div></div>`;
      }).join('')}</div>
    </div>`).join('');
  track.getBoundingClientRect();
  track.style.transition = '';
  window['sk-wrap_reset'] && window['sk-wrap_reset']();
  setTimeout(() => track.querySelectorAll('.sk-bar-fill').forEach(b => b.classList.add('go')), 80);
}
function skMove(dir) { window['sk-wrap_move'] && window['sk-wrap_move'](dir); }

/* ━━━ RENDER PROJECTS ━━━ */
function renderProjects() {
  const el = document.getElementById('pg');
  el.style.background = 'var(--line)';
  el.innerHTML = DB.projects.map((x, i) => `
    <div class="pc" tabindex="0" role="listitem" aria-label="${x.title}" onclick="openM('projects','${x.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')openM('projects','${x.id}')">
      <div class="pc-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="pc-tag">${x.tag}</div>
      <h3 class="pc-title">${x.title}</h3>
      <p class="pc-desc">${x.info}</p>
      <span class="pc-arr" aria-hidden="true">↗</span>
    </div>`).join('');
  if (!el.innerHTML.trim()) el.innerHTML = '<div style="padding:40px;color:var(--sub);font-size:13px">No projects yet.</div>';
}

/* ━━━ RENDER VENTURES ━━━ */
function renderVentures() {
  const track = document.getElementById('vc-track'); if (!track) return;
  if (!DB.ventures.length) { track.innerHTML = '<div style="padding:40px;color:var(--sub)">No ventures yet.</div>'; return; }
  track.innerHTML = DB.ventures.map((x, i) => `
    <div class="vc" data-card tabindex="0" onclick="openM('ventures','${x.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')openM('ventures','${x.id}')" aria-label="${x.title}">
      <div class="vc-n">${String(i + 1).padStart(2, '0')}</div>
      <div class="vc-tag">${x.tag}</div>
      <h3 class="vc-title">${x.title}</h3>
      <p class="vc-desc">${x.info}</p>
      <span class="vc-arrow" aria-hidden="true">↗</span>
    </div>`).join('');
  window['vc-wrap_reset'] && window['vc-wrap_reset']();
  document.getElementById('stat-ventures').textContent = DB.ventures.length + '+';
}
function vcMove(dir) { window['vc-wrap_move'] && window['vc-wrap_move'](dir); }

/* ━━━ RENDER PAPERS ━━━ */
function renderPapers() {
  const el = document.getElementById('ppg');
  el.innerHTML = DB.papers.map(x => `
    <div class="ppc" tabindex="0" role="listitem" onclick="openM('papers','${x.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')openM('papers','${x.id}')" aria-label="${x.title}">
      <div class="ppc-ref">${x.tag}</div>
      <h3 class="ppc-title">${x.title}</h3>
      <p class="ppc-body">${x.info}</p>
    </div>`).join('');
  if (!el.innerHTML.trim()) el.innerHTML = '<div style="padding:40px;color:var(--sub)">No papers yet.</div>';
}

/* ━━━ QUOTES CAROUSEL ━━━ */
function renderQuotes() {
  const track = document.getElementById('qt-track'); if (!track) return;
  track.innerHTML = QUOTES.map(q => `
    <div class="qt-card" data-card>
      <div class="qt-mark" aria-hidden="true">"</div>
      <p class="qt-text">${q.text}</p>
      <div class="qt-attr"><div class="qt-line"></div><div class="qt-who"><span class="qt-name">${q.name}</span><span class="qt-role">${q.role}</span></div></div>
    </div>`).join('');
  window['qt-wrap_reset'] && window['qt-wrap_reset']();
}
function qtMove(dir) { window['qt-wrap_move'] && window['qt-wrap_move'](dir); }

/* ━━━ MODAL ━━━ */
function openM(cat, id) {
  activeM = DB[cat].find(x => x.id === id); if (!activeM) return;
  document.getElementById('m-tag').textContent = activeM.tag;
  document.getElementById('m-title').textContent = activeM.title;
  document.getElementById('m-vis').textContent = activeM.title[0];
  document.getElementById('m-body').textContent = activeM.info;
  document.querySelectorAll('.m-tab').forEach((t, i) => { t.classList.toggle('on', i === 0); t.setAttribute('aria-selected', i === 0 ? 'true' : 'false'); });
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.querySelector('.m-x').focus(), 80);
}
function setMTab(i, el) {
  document.querySelectorAll('.m-tab').forEach(t => { t.classList.remove('on'); t.setAttribute('aria-selected', 'false'); });
  el.classList.add('on');
  el.setAttribute('aria-selected', 'true');
  const b = document.getElementById('m-body');
  b.style.opacity = '0';
  setTimeout(() => { b.textContent = [activeM.info, activeM.specs, activeM.status][i]; b.style.opacity = '1'; b.style.transition = 'opacity .28s'; }, 150);
}
function closeModal() { document.getElementById('modal').classList.remove('open'); document.body.style.overflow = ''; }

/* ━━━ ADMIN PANEL ━━━ */
const ADMIN_PW = 'SASSY';

function openPwModal() {
  document.getElementById('pw-modal').classList.add('open');
  document.getElementById('pw-err').textContent = '';
  document.getElementById('pw-inp').value = '';
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('pw-inp').focus(), 120);
}
function closePwModal() {
  document.getElementById('pw-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function checkPw() {
  const val = document.getElementById('pw-inp').value;
  if (val === ADMIN_PW) {
    closePwModal();
    openAdmin();
  } else {
    const inp = document.getElementById('pw-inp');
    document.getElementById('pw-err').textContent = 'Incorrect password.';
    inp.classList.remove('shake');
    void inp.offsetWidth;
    inp.classList.add('shake');
    inp.value = '';
    setTimeout(() => inp.focus(), 50);
  }
}
function openAdmin() { document.getElementById('admin-panel').classList.add('open'); document.body.style.overflow = 'hidden'; apRefreshAllLists(); apUpdateCounts(); }
function closeAdmin() { document.getElementById('admin-panel').classList.remove('open'); document.body.style.overflow = ''; }

function apSwitch(sec, btn) {
  document.querySelectorAll('.ap-nav-btn').forEach(b => b.classList.remove('on'));
  document.querySelectorAll('.ap-section').forEach(s => s.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('ap-' + sec).classList.add('on');
}
function apUpdateCounts() {
  ['projects', 'ventures', 'papers', 'posts'].forEach(k => {
    const el = document.getElementById('apn-' + k); if (el) el.textContent = DB[k].length;
  });
}
function apOpenForm(sec, editId) {
  const form = document.getElementById('apf-' + sec); form.classList.add('open');
  if (editId) {
    apEditingId[sec] = editId;
    document.getElementById('apf-' + sec + '-label').textContent = 'Edit ' + sec.charAt(0).toUpperCase() + sec.slice(1, -1);
    const item = DB[sec].find(x => x.id === editId); if (!item) return;
    if (sec === 'projects') { ['title', 'tag', 'info', 'specs', 'status'].forEach(f => document.getElementById('apf-p-' + f).value = item[f] || ''); }
    else if (sec === 'ventures') { ['title', 'tag', 'info', 'specs', 'status'].forEach(f => document.getElementById('apf-v-' + f).value = item[f] || ''); }
    else if (sec === 'papers') { ['title', 'tag', 'info', 'specs', 'status'].forEach(f => document.getElementById('apf-pp-' + f).value = item[f] || ''); }
  } else {
    apEditingId[sec] = null;
    document.getElementById('apf-' + sec + '-label').textContent = 'New ' + sec.charAt(0).toUpperCase() + sec.slice(1, -1);
    apClearForm(sec);
  }
  form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function apCloseForm(sec) { document.getElementById('apf-' + sec).classList.remove('open'); apEditingId[sec] = null; apClearForm(sec); }
function apClearForm(sec) {
  const maps = { projects: ['apf-p-title', 'apf-p-tag', 'apf-p-info', 'apf-p-specs', 'apf-p-status'], ventures: ['apf-v-title', 'apf-v-tag', 'apf-v-info', 'apf-v-specs', 'apf-v-status'], papers: ['apf-pp-title', 'apf-pp-tag', 'apf-pp-info', 'apf-pp-specs', 'apf-pp-status'], posts: ['apf-pt-text'] };
  (maps[sec] || []).forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}
function apSave(sec) {
  let item = {}, valid = true;
  const maps = {
    projects: { prefix: 'p', fields: ['title', 'tag', 'info', 'specs', 'status'], req: ['title', 'info'], msg: 'apf-p-msg' },
    ventures: { prefix: 'v', fields: ['title', 'tag', 'info', 'specs', 'status'], req: ['title', 'info'], msg: 'apf-v-msg' },
    papers:   { prefix: 'pp', fields: ['title', 'tag', 'info', 'specs', 'status'], req: ['title', 'info'], msg: 'apf-pp-msg' }
  };
  const cfg = maps[sec]; if (!cfg) return;
  item.id = apEditingId[sec] || sec.slice(0, 3) + '_' + Date.now();
  cfg.fields.forEach(f => { item[f] = (document.getElementById('apf-' + cfg.prefix + '-' + f) || {}).value?.trim() || ''; });
  const missing = cfg.req.filter(f => !item[f]);
  const msgEl = document.getElementById(cfg.msg);
  if (missing.length) { if (msgEl) msgEl.textContent = 'Required: ' + missing.join(', '); valid = false; } else { if (msgEl) msgEl.textContent = ''; }
  if (!valid) return;
  if (apEditingId[sec]) { const i = DB[sec].findIndex(x => x.id === apEditingId[sec]); if (i !== -1) DB[sec][i] = item; }
  else DB[sec].push(item);
  save(sec, DB[sec]); apCloseForm(sec); apRefreshList(sec); apUpdateCounts();
  if (sec === 'projects') renderProjects();
  if (sec === 'ventures') renderVentures();
  if (sec === 'papers') renderPapers();
  showToast('Saved.');
}
async function apSavePost() {
  const raw = document.getElementById('apf-pt-text').value.trim();
  if (!raw) { document.getElementById('apf-pt-msg').textContent = 'Please paste a post.'; return; }
  const btn = document.getElementById('apf-pt-btn');
  btn.textContent = 'Processing…'; btn.style.opacity = '.6'; document.getElementById('apf-pt-msg').textContent = 'AI categorising…';
  let meta = { tag: 'Insight', date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), reactions: { like: 14, comment: 4 } };
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514', max_tokens: 300,
        system: 'Return ONLY valid JSON: {"tag":"one of: Strategy,Operations,Ventures,Data,Leadership,Other","date":"short date like Apr 2025","reactions":{"like":<10-80>,"comment":<3-20>}}',
        messages: [{ role: 'user', content: `Categorise this LinkedIn post:\n\n${raw}` }]
      })
    });
    const d = await res.json();
    try { meta = JSON.parse(d.content[0].text.trim()); } catch (e) {}
  } catch (e) {}
  DB.posts.unshift({ id: 'p' + Date.now(), featured: false, tag: meta.tag || 'Insight', date: meta.date, reactions: meta.reactions, text: raw });
  save('posts', DB.posts); apRefreshList('posts'); apUpdateCounts(); apCloseForm('posts');
  btn.textContent = 'Publish to Feed'; btn.style.opacity = '1'; document.getElementById('apf-pt-msg').textContent = 'AI auto-categorises';
  showToast('Post published.');
}
function apDelete(sec, id) {
  DB[sec] = DB[sec].filter(x => x.id !== id); save(sec, DB[sec]); apRefreshList(sec); apUpdateCounts();
  if (sec === 'projects') renderProjects();
  if (sec === 'ventures') renderVentures();
  if (sec === 'papers') renderPapers();
  showToast('Deleted.');
}
function apRefreshList(sec) {
  const list = document.getElementById('apl-' + sec);
  if (!DB[sec].length) { list.innerHTML = '<div class="ap-empty">Nothing here yet.</div>'; return; }
  if (sec === 'posts') {
    list.innerHTML = DB[sec].map(p => `<div class="ap-item"><div class="ap-item-head"><div><span class="ap-item-tag">${p.tag}</span><span style="font-family:'DM Mono',monospace;font-size:8px;color:var(--sub);margin-left:10px">${p.date}</span></div><div class="ap-item-actions"><button class="ap-del-btn" onclick="apDelete('posts','${p.id}')">Delete</button></div></div><div class="ap-post-preview">${p.text.replace(/\n/g, ' ')}</div></div>`).join('');
  } else {
    list.innerHTML = DB[sec].map(x => `<div class="ap-item"><div class="ap-item-head"><div><span class="ap-item-tag">${x.tag || '—'}</span><span class="ap-item-title" style="margin-left:10px;font-size:clamp(16px,1.8vw,20px)">${x.title}</span></div><div class="ap-item-actions"><button class="ap-edit-btn" onclick="apOpenForm('${sec}','${x.id}')">Edit</button><button class="ap-del-btn" onclick="apDelete('${sec}','${x.id}')">Delete</button></div></div><div class="ap-item-body">${x.info || ''}</div></div>`).join('');
  }
}
function apRefreshAllLists() { ['projects', 'ventures', 'papers', 'posts'].forEach(s => apRefreshList(s)); }

/* ━━━ TOAST ━━━ */
function showToast(msg, dur = 2800) {
  const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
}

/* ━━━ CONTACT FORM ━━━ */
function sendMsg() {
  const name     = document.getElementById('f-name');
  const org      = document.getElementById('f-org');
  const email    = document.getElementById('f-email');
  const purpose  = document.getElementById('f-purpose');
  const msg      = document.getElementById('f-msg');
  const btn      = document.getElementById('f-btn');

  // Validate required fields
  if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) {
    showToast('Please fill in your name, email and message.');
    return;
  }

  // Build mailto — opens native mail client with pre-filled content
  const to      = 'mrsashiraj@gmail.com';
  const subject = purpose.value.trim()
    ? `[Portfolio] ${purpose.value.trim()} — from ${name.value.trim()}`
    : `[Portfolio] Message from ${name.value.trim()}`;

  const body = [
    `Name: ${name.value.trim()}`,
    org.value.trim() ? `Organisation: ${org.value.trim()}` : '',
    `Email: ${email.value.trim()}`,
    purpose.value.trim() ? `Purpose: ${purpose.value.trim()}` : '',
    '',
    msg.value.trim(),
    '',
    '---',
    'Sent via sashiraj.com.np contact form'
  ].filter(l => l !== null && l !== undefined).join('\n');

  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Feedback then open mail client
  btn.textContent = 'Opening mail…';
  btn.disabled = true;

  window.location.href = mailto;

  // Reset button after a moment
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    showToast('Mail client opened — message ready to send.');
    // Clear form
    [name, org, email, purpose, msg].forEach(el => { if (el) el.value = ''; });
  }, 1800);
}

/* ━━━ SCROLL / KEYBOARD ━━━ */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 20);
  updateActiveNav();
}, { passive: true });

document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.shiftKey && e.key === 'A') {
    e.preventDefault();
    const p = document.getElementById('admin-panel');
    p.classList.contains('open') ? closeAdmin() : openPwModal();
  }
  if (e.key === 'Escape') {
    if (document.getElementById('modal').classList.contains('open')) closeModal();
    else if (document.getElementById('admin-panel').classList.contains('open')) closeAdmin();
    else if (document.getElementById('pw-modal').classList.contains('open')) closePwModal();
    else closeDr();
  }
});

/* ━━━ REVEAL ON SCROLL ━━━ */
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('on'), (i % 5) * 55); ro.unobserve(e.target); } });
}, { threshold: .07, rootMargin: '0px 0px -28px 0px' });

const tlo = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); tlo.unobserve(e.target); } });
}, { threshold: .1 });

/* ━━━ INIT ━━━ */
document.addEventListener('DOMContentLoaded', () => {
  skCarousel = makeCarousel({
    wrapId: 'sk-wrap', trackId: 'sk-track', dotsId: 'sk-dots', prevId: 'sk-prev', nextId: 'sk-next',
    getPerView: () => window.innerWidth < 560 ? 1 : window.innerWidth < 900 ? 2 : 3,
    getPeek: () => 0.32
  });
  makeCarousel({
    wrapId: 'vc-wrap', trackId: 'vc-track', dotsId: 'vc-dots', prevId: 'vc-prev', nextId: 'vc-next',
    getPerView: () => window.innerWidth < 560 ? 1 : window.innerWidth < 900 ? 2 : 3,
    getPeek: () => 0.28
  });
  makeCarousel({
    wrapId: 'qt-wrap', trackId: 'qt-track', dotsId: 'qt-dots', prevId: 'qt-prev', nextId: 'qt-next',
    getPerView: () => window.innerWidth < 560 ? 1 : window.innerWidth < 900 ? 2 : 3,
    getPeek: () => 0.25
  });

  renderProjects();
  renderVentures();
  renderPapers();
  renderSkCards();
  renderQuotes();

  document.querySelectorAll('.rv').forEach(el => ro.observe(el));
  document.querySelectorAll('.tl-e').forEach(el => tlo.observe(el));
});
