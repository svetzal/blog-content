/* Plain scripts so the deck also works from file:// with the network off. */
(() => {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const container = document.getElementById('talk-slides');
  window.TALK_SLIDES.forEach((slide, index) => {
    const section = document.createElement('section');
    section.id = slide.id;
    section.dataset.timing = slide.seconds;
    section.dataset.chapter = slide.chapter;
    section.className = slide.layout || '';
    const figure = slide.figure ? window.TalkFigures.draw(slide.figure, index, slide.variant) : '';
    section.innerHTML = `<div class="slide-shell"><div class="eyebrow">${esc(slide.kicker || slide.chapter)}</div><${slide.layout === 'hero' ? 'h1' : 'h2'}>${esc(slide.title)}</${slide.layout === 'hero' ? 'h1' : 'h2'}>${slide.byline ? `<div class="byline">${esc(slide.byline)}</div>` : ''}${figure ? `<div class="figure">${figure}</div>` : slide.body || ''}${slide.caption ? `<p class="caption">${esc(slide.caption)}</p>` : ''}${slide.source ? `<div class="source">${slide.source}</div>` : ''}</div><aside class="notes"><p><strong>${index + 1}. ${esc(slide.title)} · ${slide.seconds ? slide.seconds + ' seconds' : 'Reference'}</strong></p>${slide.notes.map(p => `<p>${p}</p>`).join('')}</aside>`;
    container.append(section);
    if (slide.alt) {
      const svg = section.querySelector('svg');
      svg?.setAttribute('aria-label', slide.alt);
      if (svg?.querySelector('title')) svg.querySelector('title').textContent = slide.alt;
    }
  });
  const totalTime = window.TALK_SLIDES.reduce((n,s) => n + s.seconds, 0);
  Reveal.initialize({width:1280,height:720,margin:.055,center:false,hash:true,hashOneBasedIndex:false,controls:false,progress:true,slideNumber:'c/t',showSlideNumber:'all',transition:'none',backgroundTransition:'none',totalTime,defaultTiming:70,autoPlayMedia:false,plugins:[RevealNotes]});
  function updateChrome() {document.getElementById('chapter-label').textContent=Reveal.getCurrentSlide()?.dataset.chapter || '';}
  Reveal.on('ready',updateChrome);Reveal.on('slidechanged',updateChrome);
  document.getElementById('previous').addEventListener('click',()=>Reveal.prev());
  document.getElementById('next').addEventListener('click',()=>Reveal.next());
  document.getElementById('overview').addEventListener('click',()=>Reveal.toggleOverview());
  document.getElementById('speaker').addEventListener('click',()=>Reveal.getPlugin('notes').open());
  document.getElementById('fullscreen').addEventListener('click',async()=>{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();});
})();
