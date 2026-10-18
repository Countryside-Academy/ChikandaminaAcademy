const DEFAULT_LEVELS = ["ECD A","ECD B","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7"];
const DEFAULT_SUBJECTS = ["Heritage Studies","Mathematics","English","Agriculture","Science & Technology","Arts"];
const DEFAULT_TERMS = ["Term 1","Term 2","Term const SEED_{id:1, title:"Our Ndebele Heritage - Ubuntu & Maths", grade:"ECD B", subject:"Heritage Studies", term:"Term 1", content:"Ubuntu sharing: 12 amasi cups / 4 children = 3 each. Fractions in culture! Chikandamina = knowledge that sustains."},
{id:2, title:"Counting with Seeds - Imbewu", grade:"Grade 1", subject:"Maths", term:"Term 1", content:"1 hectare = 10,000m2. Maize spacing 75cm x 25cm = 53,333 plants per hectare. Heritage counting!"},
{id:3, title:"My Family - Usapho Lwami", grade:"Grade 2", subject:"Maths", term:"Term 1", content:"Family of 5 shares 1 loaf = 1/5 each. 2 1/2 loaves = 2 full + half. Everyday fractions."},
{id:4, title:"Fractions and mixed numbers", grade:"Grade 4", subject:"Maths", term:"Term 2", content:"3/5 = 3 of 5 equal parts. Garden 5 sections, 3 maize = 3/5. 1/2=2/4=3/6. Simplify 6/12=1/2. Gogo divides sadza into 4 = 1/4 each."},
{id:5, title:"Percentages and Real Life", grade:"Grade 5", subject:"Maths", term:"Term 2", content:"50%=1/2, 25%=1/4. Airtime $10, use 20% = $2. Price $200 +10% = $220. 400 learners, 55% girls = 220 girls."},
{id:6, title:"Chikandamina - Heritage Maths", grade:"Grade 6", subject:"Heritage Maths", term:"Term 3", content:"Rondavel = cylinder + cone. Circumference = pi x diameter. Dura 500kg / 2kg per day = 250 days. Ndebele patterns use symmetry. Ancestors were mathematicians!"},
{id:7, title:"Algebra Basics - Cattle Counting", grade:"Grade 7", subject:"Maths", term:"Term 3", content:"x = unknown. x+5=12, x=7. Balance: x+3=10 => x=7. Counting cattle needs algebra daily!"},
{id:8, title:"Area and Perimeter - Fields", grade:"Grade 6", subject:"Agriculture", term:"Term 2", content:"Field 100m x 50m. Perimeter = 2x(L+W)=300m. Area=5000m2. Practical heritage maths for farming."}
];




function getStore(){
  try{
    let s = JSON.parse(localStorage.getItem('ca_data_v2')||'null');
    if(!s || !s.items || s.items.length===0){ s={items:SEED_ITEMS}; localStorage.setItem('ca_data_v2', JSON.stringify(s)); }
    return s;
  }catch(e){ return {items:SEED_ITEMS}; }
}
let store=getStore();
function saveStore(){ localStorage.setItem('ca_data_v2', JSON.stringify(store)); renderAll(); }

function fillSelect(id, options, includeAll){
  const el=document.getElementById(id);
  if(!el) return;
  el.innerHTML='';
  if(includeAll){ let o=document.createElement('option'); o.value='All'; o.textContent='All'; el.appendChild(o); }
  options.forEach(v=>{ let o=document.createElement('option'); o.value=v; o.textContent=v; el.appendChild(o); });
}

function populateSelects(){
  fillSelect('itemGrade', DEFAULT_LEVELS, false);
  fillSelect('itemSubject', DEFAULT_SUBJECTS, false);
  fillSelect('itemTerm', DEFAULT_TERMS, false);
  fillSelect('filterLevel', DEFAULT_LEVELS, true);
  fillSelect('filterSubject', DEFAULT_SUBJECTS, true);
}

function makeCard(it){
  return `<div class="card"><span style="background:#efe9d9;padding:2px 8px;border-radius:999px;font-size:12px">${it.type} - ${it.grade} - ${it.subject}</span><h3 style="margin:8px 0 4px">${it.title}</h3><small>${it.term} ${it.topic||''}</small><p>${it.instructions||''}</p>${it.questions?`<details><summary>Q&A</summary><p><b>Q:</b> ${it.questions}</p><p><b>A:</b> ${it.answer}</p></details>`:''}</div>`;
}

function renderAll(){
  const lc=document.getElementById('levelCount'); if(lc) lc.textContent=DEFAULT_LEVELS.length;
  const sc=document.getElementById('subjectCount'); if(sc) sc.textContent=DEFAULT_SUBJECTS.length;
  const ic=document.getElementById('itemCount'); if(ic) ic.textContent=store.items.length;
  const manageList=document.getElementById('manageList');
  if(manageList){ manageList.innerHTML=store.items.map(it=>`<div class="card"><b>${it.title}</b><br><small>${it.grade} • ${it.subject} • ${it.term}</small><br><button onclick="deleteItem(${it.id})" style="margin-top:8px;color:#a00;background:none;border:1px solid #fcc;border-radius:6px;padding:4px 8px;cursor:pointer">Delete</button></div>`).join(''); }
  const lib=document.getElementById('libraryList'); if(lib) lib.innerHTML=store.items.map(makeCard).join('') || '<p>No items yet</p>';
  const browseResults=document.getElementById('browseResults'); if(browseResults){ browseResults.innerHTML=store.items.slice(0,5).map(makeCard).join(''); }
  const testList=document.getElementById('testList'); if(testList) testList.innerHTML=store.items.filter(i=>i.type==='Test').map(makeCard).join('') || '<p>No tests yet</p>';
  const projectList=document.getElementById('projectList'); if(projectList) projectList.innerHTML=store.items.filter(i=>i.type==='Project').map(makeCard).join('') || '<p>No projects yet</p>';
}

function applyFilter(){
  const lvl=document.getElementById('filterLevel')?.value;
  const subj=document.getElementById('filterSubject')?.value;
  let filtered=store.items;
  if(lvl && lvl!=='All') filtered=filtered.filter(i=>i.grade===lvl);
  if(subj && subj!=='All') filtered=filtered.filter(i=>i.subject===subj);
  const browseResults=document.getElementById('browseResults');
  if(browseResults){ browseResults.innerHTML=filtered.length? filtered.map(makeCard).join('') : `<p>No items for ${lvl} + ${subj}. Try All.</p>`; }
}

window.deleteItem=function(id){ if(confirm('Delete?')){ store.items=store.items.filter(i=>i.id!==id); saveStore(); } }

document.addEventListener('DOMContentLoaded',()=>{
  populateSelects(); renderAll();
  document.querySelectorAll('nav button, [data-view]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
      if(btn.tagName==='BUTTON') btn.classList.add('active');
      const view=btn.getAttribute('data-view')||btn.dataset.view;
      if(!view) return;
      document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));
      const target=document.getElementById(view); if(target) target.classList.remove('hidden');
      window.scrollTo(0,0);
    });
  });
  const form=document.getElementById('contentForm');
  if(form){ form.addEventListener('submit',e=>{ e.preventDefault(); const newItem={ id:Date.now(), type:document.getElementById('itemType').value, grade:document.getElementById('itemGrade').value, subject:document.getElementById('itemSubject').value, term:document.getElementById('itemTerm').value, title:document.getElementById('itemTitle').value, topic:document.getElementById('itemTopic').value, instructions:document.getElementById('itemInstructions').value, questions:document.getElementById('itemQuestions').value, answer:document.getElementById('itemAnswer').value }; store.items.push(newItem); saveStore(); alert('Saved! '+newItem.title); form.reset(); populateSelects(); }); }
  const browseBtn=document.getElementById('browseBtn'); if(browseBtn) browseBtn.addEventListener('click',applyFilter);
  const fl=document.getElementById('filterLevel'); if(fl) fl.addEventListener('change',applyFilter);
  const fs=document.getElementById('filterSubject'); if(fs) fs.addEventListener('change',applyFilter);
});
