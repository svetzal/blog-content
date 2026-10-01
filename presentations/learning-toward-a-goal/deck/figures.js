/* Editable, conceptual illustrations. Shapes carry no measured quantities. */
window.TalkFigures = (() => {
  const text=(x,y,s,cls='',anchor='middle')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${s}</text>`;
  const path=(d,cls='line',extra='')=>`<path d="${d}" class="${cls}" ${extra}/>`;
  const rect=(x,y,w,h,fill='var(--white)',rx=10)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
  const circle=(x,y,r,fill)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
  const frag=(s,i=0)=>`<g class="fragment" data-fragment-index="${i}">${s}</g>`;
  const node=(x,y,label,fill='var(--teal-light)',w=210)=>rect(x-w/2,y-36,w,72,fill)+text(x,y+10,label);
  const arrow=(x,y,xx,yy,cls='line')=>path(`M${x} ${y} L${xx} ${yy}`,cls)+path(`M${xx-10} ${yy-8} L${xx} ${yy} L${xx-10} ${yy+8}`,cls);
  const cross=(x,y,r=14)=>path(`M${x-r} ${y-r} L${x+r} ${y+r} M${x-r} ${y+r} L${x+r} ${y-r}`,'blocked');
  const check=(x,y)=>path(`M${x-12} ${y} l9 10 l20 -24`,'route');
  const doc=(x,y,label,mark)=>`<g>${rect(x,y,145,180)}${path(`M${x+18} ${y+24} h65 M${x+18} ${y+46} h105 M${x+18} ${y+66} h89 M${x+18} ${y+86} h105`,'fine')}${text(x+72,y+145,label,'small')}${mark==='bad'?cross(x+111,y+24,10):mark==='good'?check(x+111,y+24):''}</g>`;
  const figures={
    routes:()=>{
      let s='';for(let i=0;i<8;i++)s+=path(`M 30 ${370-i*12} C 300 ${400-i*35} 360 ${-70+i*62} 700 ${90+i*25} S 985 ${70+i*41} 1090 ${60+i*45}`,'fine');
      return s+path('M30 370 C250 340 350 170 535 230 S800 200 1030 70','route')+circle(535,230,12,'var(--rust)')+circle(1030,70,15,'var(--teal)');
    },
    changeMind:()=>path('M80 220 H480','line')+circle(100,220,13,'var(--ink)')+node(350,220,'The plan')+path('M490 60 V355','blocked')+text(505,48,'New evidence','small warning')+frag(path('M450 220 C570 220 450 365 650 350 S820 160 1030 160','route')+text(835,120,'A different next step','accent')),
    fixedPlan:()=>{
      let s='';['Specify','Build','Deliver'].forEach((l,i)=>{s+=node(190+i*365,170,l);if(i<2)s+=arrow(298+i*365,170,430+i*365,170);});
      return s+frag(path('M920 245 V315 H190 V245','blocked')+text(555,360,'"The spec needed more detail."','warning'));
    },
    feedback:()=>node(210,145,'What we believe')+arrow(320,145,445,145)+node(560,145,'What we try')+arrow(670,145,795,145)+node(915,145,'What happens')+frag(path('M915 215 C915 360 210 360 210 215','route')+text(560,355,'What changes in our understanding?','accent')),
    spec:()=>{
      let s=rect(105,30,425,340)+path('M150 87 H455 M150 155 H455 M150 225 H455','fine');
      s+=text(150,65,'Purpose','accent','start')+text(150,130,'Boundaries','accent','start')+text(150,200,'Evidence','accent','start');
      s+=text(150,280,'Our current understanding','small quiet','start');
      return s+path('M620 310 C710 245 780 300 805 170 S925 160 985 80','route')+circle(985,80,19,'var(--teal)')+text(970,38,'Goal','accent')+text(810,360,'A direction we can question.','small');
    },
    beck:(id,v)=>{
      let s=path('M145 35 V342 H1020','line')+text(580,400,'Features delivered →','small')+`<text x="55" y="205" transform="rotate(-90 55 205)" text-anchor="middle">Options for change →</text>`;
      s+=path('M170 72 C375 84 385 205 590 278 S805 326 985 330','blocked');
      if(v==='restore')s+=frag(path('M170 72 L330 144 L330 64 L495 160 L495 75 L655 151 L655 59 L820 132 L820 49 L987 98','route')+text(870,210,'Recover options','accent'));
      else s+=text(810,268,'Harder to change','warning');
      return s;
    },
    band:()=>{
      const top='60,70 280,86 500,108 720,120 1050,126 1050,134 720,140 500,152 280,174 60,190';
      const lower='60,235 270,268 370,235 540,268 640,230 820,262 920,230 1050,241 1050,339 920,350 820,318 640,350 540,312 370,345 270,312 60,345';
      return text(60,35,'Assumptions lock together','small','start')+`<polygon points="${top}" fill="var(--rust-light)"/>`+path('M60 130 H1050','blocked')+text(60,222,'Keep important alternatives practical','small','start')+`<polygon points="${lower}" fill="var(--teal-light)"/>`+path('M60 290 H1050','route')+text(560,403,'Decide → learn → reshape → decide','small');
    },
    lenses:()=>{
      let s=circle(560,206,133,'var(--teal-light)')+text(560,195,'The problem','large')+text(560,236,'as we understand it','small');
      [[185,105,430,155,'One approach'],[930,95,690,148,'Another'],[820,340,678,285,'Another']].forEach(([x,y,xx,yy,label],i)=>{const a=path(`M${x} ${y} L${xx} ${yy}`,'fine')+circle(x,y,52,'var(--gold-light)')+text(x,y+7,label,'small');s+=i?frag(a,i-1):a;});return s;
    },
    options:(id,v)=>{
      let s='';[['Shorter form','Too much effort?'],['Guided start','Unclear choices?'],['Checks later','Too much too soon?']].forEach(([a,b],i)=>{let row=node(250,70+i*132,a,'var(--gold-light)',300)+arrow(415,70+i*132,665,70+i*132)+text(885,80+i*132,b);s+=v==='all'&&i>0?frag(row,i-1):i===0||v==='all'?row:'';});
      if(v!=='all')s+=path('M215 165 V330 M185 300 L215 330 L245 300','fine')+text(480,288,'What are we not asking?','quiet');return s;
    },
    thesis:()=>{
      let s=path('M50 185 H275','line');for(const y of [55,185,315])s+=path(`M275 185 C410 185 420 ${y} 570 ${y}`,'route')+circle(570,y,12,'var(--teal)')+path(`M570 ${y} C740 ${y} 700 185 880 185`,'fine');
      return s+circle(950,185,67,'var(--gold-light)')+text(950,199,'?','huge')+text(275,378,'Alternatives','small')+text(950,378,'Better questions','small');
    },
    system:(id,v)=>{
      const nodes=[[165,65,'Apply'],[780,65,'Check'],[165,210,'Notify'],[780,210,'Support']];let s='';
      s+=path('M270 65 H675 M165 102 V174 M780 102 V174 M270 210 H675','fine');
      if(v==='coupled'||v==='question'){
        for(const[x,y]of nodes)s+=path(`M470 336 L${x} ${y+32}`,v==='question'?'blocked':'fine');
        s+=node(470,336,'One regional rule',v==='question'?'var(--rust-light)':'var(--gold-light)',270);
        if(v==='question')s+=frag(circle(1010,126,57,'var(--teal-light)')+text(1010,140,'?','huge')+text(1020,237,'Another','small')+text(1020,267,'region?','small'));
      }else{
        s+=path('M780 102 V275 H550 V291','fine')+node(550,300,'Policy boundary','var(--teal-light)',260);
        s+=path('M460 335 L280 397 M640 335 L820 397','fine');
        s+=node(265,398,'Existing rule','var(--white)',220)+node(845,398,v==='try'?'Try another rule':'Another possibility',v==='try'?'var(--gold-light)':'var(--white)',290);
      }
      for(const[x,y,l]of nodes)s+=node(x,y,l,(v==='coupled'||v==='question')?'var(--gold-light)':'var(--white)');return s;
    },
    loop:()=>{
      let s=node(560,55,'Mission','var(--gold-light)',200)+path('M560 93 V133','fine');
      s+=node(260,198,'Assess')+arrow(369,198,450,198)+node(560,198,'Choose')+arrow(669,198,750,198)+node(860,198,'Implement');
      s+=path('M860 235 C860 365 260 365 260 235','route')+text(560,352,'Evidence changes the next objective','small accent');return s;
    },
    reassess:()=>{
      let s=circle(560,210,165,'var(--teal-light)')+circle(560,210,105,'var(--paper)')+text(560,200,'Whole','large')+text(560,251,'mission','large');
      [['What exists',165,78],['What failed',935,78],['What constrains us',930,340],['What is still unknown',177,340]].forEach(([l,x,y])=>{s+=text(x,y,l,'small')+path(`M${x} ${y+15} L${x<500?410:710} ${y<200?130:290}`,'fine');});return s;
    },
    validator:(id,v)=>{
      let s='';const names=['A','B','C','D'];for(let i=0;i<4;i++){let x=70+i*260;s+=doc(x,115,names[i],i===0?'bad':v==='all'&&i===2?'bad':'');if(v==='all')s+=path(`M${x+72} 64 V103`,'route');}
      if(v==='first')s+=path('M140 55 V102','route')+cross(276,190,22)+path('M285 190 H1020','fine ghost')+text(675,365,'Still unchecked','quiet');
      else if(v==='all')s+=text(560,365,'Keep inspecting after a failure.','accent');
      else s+=text(560,365,'Every record. Exact location. No changes.','small');return s;
    },
    evidence:()=>{
      let s='';['More than one failure','Exact file and field','Nothing modified'].forEach((l,i)=>{s+=rect(45+i*365,52,330,275,i===1?'var(--gold-light)':'var(--teal-light)')+text(210+i*365,160,'?','huge')+text(210+i*365,259,l,'small');});return s;
    },
    cycles:()=>{
      let s='';[['1','Defect','Preserved'],['2','Remainder','Landed with gaps'],['3','Complete','Mission assessed']].forEach(([n,a,b],i)=>{s+=circle(170+i*390,142,65,i===0?'var(--rust-light)':'var(--teal-light)')+text(170+i*390,166,n,'huge')+text(170+i*390,261,a)+text(170+i*390,302,b,'small quiet');if(i<2)s+=arrow(250+i*390,142,465+i*390,142,'fine');});return s;
    },
    partial:()=>{
      let s=rect(105,94,900,92,'var(--white)');for(let i=0;i<5;i++)s+=rect(111+i*177,100,170,80,i<3?'var(--teal-light)':'var(--paper)',2);
      return s+text(368,147,'Useful work integrated')+text(814,147,'Gaps visible')+path('M368 203 V275 H560','route')+text(655,286,'Next objective','accent')+text(560,365,'Task completion ≠ mission completion','small');
    },
    admission:(id,v)=>{
      let s=node(150,200,'Resume','var(--white)',170)+arrow(235,200,330,200)+node(465,200,'Save events',v==='bad'?'var(--rust-light)':'var(--teal-light)',240);
      s+=v==='bad'?arrow(590,200,810,200,'blocked')+node(945,200,'Work starts','var(--rust-light)',230):path('M592 200 H690','route')+rect(690,130,10,140,'var(--teal)',0)+text(870,191,'Start only after')+text(870,232,'durable admission');
      s+=cross(465,86,22)+text(465,43,'Save fails','warning');
      return s+(v==='bad'?text(850,333,'The record cannot explain the work.','small warning'):text(560,352,'Failure stays visible. Work does not start.','small accent'));
    },
    stale:()=>{
      let s=node(280,82,'Assessment','var(--gold-light)',310)+node(840,82,'Implementation','var(--teal-light)',310);
      s+=doc(208,185,'Old state')+doc(768,185,'New work','good')+path('M434 265 H672','fine ghost')+cross(552,265,25);
      return s+frag(text(280,396,'"Still missing."','warning')+text(840,396,'Already implemented.','accent'));
    },
    human:()=>{
      let s=path('M95 200 H810','route');for(let i=0;i<5;i++)s+=circle(140+i*138,200,13,'var(--teal)');
      s+=rect(810,70,12,260,'var(--rust)',0)+text(816,43,'Authorized limit','small warning')+text(946,145,'Owner','large')+text(946,191,'decision','large')+path('M824 235 C1040 360 1080 330 1090 225','fine');return s;
    },
    exercise:()=>{
      let s=node(170,90,'A real goal','var(--gold-light)',240);for(const y of [75,207,339])s+=path(`M292 90 C460 90 390 ${y} 550 ${y}`,'fine');
      [['Different approaches',75],['Different assumptions',207],['One small experiment',339]].forEach(([l,y],i)=>{s+=node(820,y,l,i===2?'var(--teal-light)':'var(--white)',440);});return s;
    },
    mission:()=>{
      let s='';[['Effort','Work invested'],['Output','Capability delivered'],['Outcome','People act differently'],['Mission','Purpose advances']].forEach(([a,b],i)=>{s+=circle(125+i*288,166,76,i<2?'var(--gold-light)':'var(--teal-light)')+text(125+i*288,176,a)+text(125+i*288,306,b,'small');if(i<3)s+=arrow(211+i*288,166,319+i*288,166,'fine');});return s;
    },
    closing:()=>{
      let s=path('M85 288 C295 288 290 125 492 155 S732 336 920 150','route');
      s+=circle(85,288,13,'var(--ink)')+circle(492,155,15,'var(--rust)')+circle(920,150,15,'var(--teal)');
      s+=path('M920 150 Q965 35 1080 50 M920 150 Q1010 150 1080 165 M920 150 Q995 300 1080 286','fine');
      return s+text(230,374,'Try something.')+text(568,374,'Learn something.')+text(935,374,'Choose again.');
    }
  };
  return {draw(name,id,variant){if(!figures[name])throw new Error(`Unknown illustration: ${name}`);return `<svg viewBox="0 0 1120 445" role="img" aria-label="${name.replace(/([A-Z])/g,' $1')} illustration"><title>${name.replace(/([A-Z])/g,' $1')} illustration</title>${figures[name](id,variant)}</svg>`;}};
})();
