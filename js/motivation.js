// js/motivation.js
// Lightweight enhancer for the Motivation block
(function(){
  function qs(sel, root=document){ return root.querySelector(sel); }
  function ce(tag, cls){ const el = document.createElement(tag); if(cls) el.className = cls; return el; }

  function buildModalContent(){
    const body = ce('div');
    const p = ce('p');
    p.textContent = "Research in positive psychology and strengths suggests that using your strengths regularly is associated with higher engagement, better well‑being, and steadier progress on goals. Effects vary by person and context.";
    const ul = ce('ul');
    const refs = [
      {t:"Gallup: How Employees' Strengths Make Your Company Stronger", u:"https://www.gallup.com/workplace/231605/employees-strengths-company-stronger.aspx"},
      {t:"Gallup: Employees Who Use Their Strengths Outperform Those Who Don't", u:"https://www.gallup.com/workplace/236561/employees-strengths-outperform-don.aspx"},
      {t:"Using signature strengths in pursuit of goals (summary)", u:"https://www.researchgate.net/publication/281424792_Using_signature_strengths_in_pursuit_of_goals_Effects_on_goal_progress_need_satisfaction_and_well-being_and_implications_for_coaching_psychologists"},
      {t:"Science of CliftonStrengths (overview)", u:"https://www.gallup.com/cliftonstrengths/en/253790/science-of-cliftonstrengths.aspx"}
    ];
    refs.forEach(r=>{
      const li = ce('li');
      const a = ce('a'); a.href = r.u; a.target = '_blank'; a.rel = 'noopener'; a.textContent = r.t; li.appendChild(a); ul.appendChild(li);
    });
    body.appendChild(p); body.appendChild(ul);
    return body;
  }

  function createModal(){
    const backdrop = ce('div','motivation-backdrop');
    backdrop.setAttribute('role','dialog');
    backdrop.setAttribute('aria-modal','true');

  const modal = ce('div','motivation-modal');
    const header = ce('div','motivation-modal-header');
  const title = ce('h3'); title.textContent = 'Why strengths matter';
  title.id = 'motivation-modal-title';
    const close = ce('button','motivation-close'); close.setAttribute('aria-label','Close'); close.innerHTML = '&times;';

    const body = ce('div','motivation-modal-body');
    body.appendChild(buildModalContent());

    header.appendChild(title); header.appendChild(close);
    modal.appendChild(header); modal.appendChild(body);
    backdrop.appendChild(modal);

  backdrop.setAttribute('aria-labelledby','motivation-modal-title');

  function getFocusable(){
      return backdrop.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    }
    function onKey(e){
      if(e.key === 'Escape'){ closeModal(); return; }
      if(e.key === 'Tab'){
        const focusables = getFocusable();
        if(!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    }
    function open(){
      document.body.appendChild(backdrop);
      backdrop.classList.add('open');
      prevFocus = document.activeElement;
      close.focus();
      document.addEventListener('keydown', onKey);
    }
    function closeModal(){
      backdrop.classList.remove('open');
      backdrop.remove();
      document.removeEventListener('keydown', onKey);
      if(prevFocus) prevFocus.focus();
    }
    backdrop.addEventListener('click', (e)=>{ if(e.target === backdrop) closeModal(); });
    close.addEventListener('click', closeModal);

    let prevFocus = null;
    return {open};
  }

  function enhanceMotivationBlocks(){
    const blocks = document.querySelectorAll('.motivation');
    if(!blocks.length) return;

    const modal = createModal();
    blocks.forEach(block =>{
      const btn = block.querySelector('.motivation-learn');
      if(btn){ btn.addEventListener('click', ()=> modal.open()); }
    });
  }

  // Expose
  window.enhanceMotivationBlocks = enhanceMotivationBlocks;
})();
