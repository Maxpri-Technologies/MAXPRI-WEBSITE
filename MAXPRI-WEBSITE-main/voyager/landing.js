/* ---------- Hero stage: looping demo ---------- */
(function(){
  const fields = { f1:document.getElementById('f1'), f2:document.getElementById('f2'), f3:document.getElementById('f3'), f4:document.getElementById('f4') };
  const carets = { c1:document.getElementById('c1'), c2:document.getElementById('c2'), c3:document.getElementById('c3') };
  const cursor = document.getElementById('cursor');
  const status = document.getElementById('stageStatus');
  const url    = document.getElementById('stageUrl');

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

  async function runSequence(){
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
    fields.f4.style.boxShadow = '0 0 0 3px rgba(255,138,61,0.18)';
    await step(1500, ()=>{});

    status.textContent = 'Confirmed by user — submitting';
    url.textContent = 'app.example.com/welcome';
    fields.f4.style.borderColor = ''; fields.f4.style.boxShadow = '';
    await step(2200, ()=>{});

    runSequence();
  }
  runSequence();
})();

/* ---------- Log marquee content, duplicated for seamless loop ---------- */
(function(){
  const lines = [
    'Parsed 14 semantic elements on page',
    'Matched field <b>company_name</b> from context',
    'Selected action: <b>express_checkout</b>',
    'Waiting on user confirmation for <b>submit</b>',
    'Created Google Sheet: <b>Q3_Lead_List</b>',
    'Compared 6 listings across 3 retailers',
    'Logged in using existing session cookie',
    'Drafted Google Doc from research summary'
  ];
  const track = document.getElementById('logTrack');
  const html = lines.map(l => '<span>' + l + '</span>').join('');
  track.innerHTML = html + html; // duplicate for seamless scroll
})();

/* ---------- Scroll reveal + workflow line ---------- */
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
})();
