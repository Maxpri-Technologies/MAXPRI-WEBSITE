/* ---------- Hero stage: looping demo (Agent mode -> Code mode) ---------- */
(function(){
  const fields = { f1:document.getElementById('f1'), f2:document.getElementById('f2'), f3:document.getElementById('f3'), f4:document.getElementById('f4') };
  const carets = { c1:document.getElementById('c1'), c2:document.getElementById('c2'), c3:document.getElementById('c3') };
  const cursor = document.getElementById('cursor');
  const status = document.getElementById('stageStatus');
  const url    = document.getElementById('stageUrl');
  const lock   = document.getElementById('stageLock');
  const tag    = document.getElementById('stageTag');
  const bodyA  = document.getElementById('stageBody');
  const bodyC  = document.getElementById('stageCode');
  const tree   = bodyC.querySelectorAll('.ct-file');
  const lines  = bodyC.querySelectorAll('.cl');
  const review = document.getElementById('ctReview');
  const reviewMsg = document.getElementById('ctReviewMsg');

  function typeInto(caretEl, text, cb){
    let i = 0;
    caretEl.textContent = '';
    const iv = setInterval(function(){
      caretEl.textContent = text.slice(0, i+1);
      i++;
      if(i > text.length){ clearInterval(iv); cb && cb(); }
    }, 42);
  }
  function moveCursor(x, y){ cursor.style.left = x+'px'; cursor.style.top = y+'px'; }
  function setActive(id){ Object.values(fields).forEach(f=>f && f.classList.remove('active')); if(fields[id]) fields[id].classList.add('active'); }
  function clearAll(){ Object.values(carets).forEach(c=>c.textContent=''); Object.values(fields).forEach(f=>f && f.classList.remove('active')); }
  function step(delay, fn){ return new Promise(res => setTimeout(()=>{ fn(); res(); }, delay)); }

  function setMode(mode){
    const code = mode === 'code';
    bodyA.hidden = code;
    bodyC.hidden = !code;
    tag.textContent = code ? 'Code mode' : 'Agent mode';
    tag.classList.toggle('code', code);
    lock.textContent = code ? '▤' : '🔒';
  }

  async function runAgent(){
    setMode('agent');
    clearAll();
    url.textContent = 'app.example.com/onboarding';
    status.textContent = 'Reading page structure…';
    moveCursor(280, 62);
    await step(900, ()=>{});

    status.textContent = 'Filling: full name';
    moveCursor(150, 62); setActive('f1');
    await step(700, ()=> typeInto(carets.c1, 'Daniel R.'));
    await step(1100, ()=>{});

    status.textContent = 'Filling: company';
    moveCursor(150, 138); setActive('f2');
    await step(500, ()=> typeInto(carets.c2, 'Maxpri Technologies'));
    await step(1500, ()=>{});

    status.textContent = 'Filling: plan';
    moveCursor(110, 214); setActive('f3');
    await step(500, ()=> typeInto(carets.c3, 'Pro'));
    await step(1000, ()=>{});

    status.textContent = 'Awaiting your confirmation…';
    moveCursor(249, 214); setActive('f4');
    fields.f4.style.borderColor = 'var(--amber)';
    fields.f4.style.boxShadow = '0 0 0 3px rgba(0,157,255,0.2)';
    await step(1500, ()=>{});

    status.textContent = 'Confirmed by user — submitting';
    url.textContent = 'app.example.com/welcome';
    fields.f4.style.borderColor = ''; fields.f4.style.boxShadow = '';
    await step(2000, ()=>{});
  }

  async function runCode(){
    tree.forEach(t=>t.classList.remove('on','mod'));
    lines.forEach(l=>l.classList.remove('show'));
    review.classList.remove('show','ok');
    reviewMsg.textContent = 'Write src/cart.js?';

    setMode('code');
    url.textContent = 'folder: my-shop/';
    status.textContent = 'Mapping folder structure…';
    await step(1100, ()=>{});

    status.textContent = 'Reading src/cart.js';
    await step(0, ()=> tree[1].classList.add('on'));
    await step(1000, ()=>{});

    status.textContent = 'Drafting edit…';
    for(const l of lines){ await step(280, ()=> l.classList.add('show')); }
    await step(500, ()=>{});

    status.textContent = 'Awaiting your review…';
    await step(0, ()=> review.classList.add('show'));
    await step(2000, ()=>{});

    status.textContent = 'Approved — wrote src/cart.js';
    await step(0, ()=>{
      review.classList.add('ok');
      reviewMsg.textContent = '✓ Wrote src/cart.js';
      tree[1].classList.remove('on');
      tree[1].classList.add('mod');
    });
    await step(2600, ()=>{});
  }

  (async function loop(){
    while(true){
      await runAgent();
      await runCode();
    }
  })();
})();

/* ---------- Log marquee content, duplicated for seamless loop ---------- */
(function(){
  const lines = [
    'Parsed 14 semantic elements on page',
    'Matched field <b>company_name</b> from context',
    'Batched 3 dependent actions: <b>click, type, submit</b>',
    'Mode switched: <b>Code</b> — project folder connected',
    'Mapped folder: 18 directories, 214 entries',
    'Read <b>src/cart.js</b> before planning the edit',
    'Proposed edit to <b>src/cart.js</b> — awaiting review',
    'Waiting on user confirmation for <b>submit</b>',
    'Created Google Sheet: <b>Q3_Lead_List</b>',
    'Compared 6 listings across 3 retailers',
    'Verified selected flight before final booking step',
    'Logged in using existing session cookie',
    'Drafted Google Doc from research summary'
  ];
  const track = document.getElementById('logTrack');
  const html = lines.map(l => '<span>' + l + '</span>').join('');
  track.innerHTML = html + html; // duplicate for seamless scroll
})();

/* ---------- Scroll reveal + workflow line + browser-loop lanes ---------- */
(function(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold:0.15 });
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const rail = document.getElementById('wfRail');
  const railIo = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ rail.classList.add('play'); railIo.disconnect(); } });
  }, { threshold:0.4 });
  if(rail) railIo.observe(rail);

  const lanes = document.getElementById('lanes');
  const laneIo = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ lanes.classList.add('play'); laneIo.disconnect(); } });
  }, { threshold:0.35 });
  if(lanes) laneIo.observe(lanes);
})();
