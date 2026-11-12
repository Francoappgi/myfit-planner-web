const DAYS=['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];
const BASE=[
[['Colazione','2 uova, pane 40 g, decaffeinato'],['Pranzo','Lenticchie 150 g, tonno 80 g, carote 150 g, pane 50 g'],['Cena','Pasta 80 g, zucchine 200 g, ricotta 60 g']],
[['Colazione','Uovo sodo, pane 50 g, ricotta 50 g'],['Pranzo','Riso 80 g, pesto 20 g, zucchine 200 g, pollo 100 g'],['Cena','Orata 200 g, patate 250 g, bietole 200 g']],
[['Colazione','Uovo, pane 50 g, parmigiano 15 g'],['Pranzo','Pollo al limone 160 g, pane 70 g, spinaci 200 g'],['Cena','Tortellini 110 g in brodo, finocchi 200 g']],
[['Colazione','2 uova sode, pane 40 g'],['Pranzo','Ceci 120 g, tonno 100 g, zucchine 200 g, pane 50 g'],['Cena','Bistecca 170 g, patate 250 g, cicoria 200 g']],
[['Colazione','Pane 60 g, ricotta 80 g, uovo'],['Pranzo','Pasta 80 g, pesto 20 g, fagiolini 200 g'],['Cena','Spigola 200 g, riso 70 g, zucchine 200 g']],
[['Colazione','2 uova, pane 50 g'],['Pranzo','Minestrone 350 g, risoni 70 g, parmigiano 20 g'],['Cena','Pizza margherita, verdure']],
[['Colazione','2 uova, pane 50 g'],['Pranzo','Spezzatino 180 g, patate 250 g, carote 150 g'],['Cena','Pasta 80 g, zucchine 200 g, tonno 100 g']]
];
const SNACKS=[
 ['Frutta fresca 150 g','Frutta fresca 150 g','Frutta fresca 150 g'],
 ['Frutta fresca 150 g','Mandorle 15 g','Carote 100 g'],
 ['Frutta fresca 150 g','Frutta fresca 150 g','Parmigiano 20 g'],
 ['Frutta fresca 150 g','Mandorle 15 g','Frutta fresca 100 g'],
 ['Frutta fresca 150 g','Frutta fresca 150 g','Parmigiano 20 g'],
 ['Frutta fresca 150 g','Mandorle 15 g','Frutta fresca 100 g'],
 ['Frutta fresca 150 g','Frutta fresca 150 g','Parmigiano 20 g']
];
const MEAL_ORDER=['Colazione','Spuntino metà mattina','Pranzo','Spuntino pomeriggio','Spuntino prima di cena','Cena'];
function ensureSixMeals(){
 if(!Array.isArray(data.meals))return;
 let changed=false;
 data.meals.forEach((meals,i)=>{
  if(!Array.isArray(meals)||meals.length!==3)return;
  const [breakfast,lunch,dinner]=meals;
  data.meals[i]=[breakfast,{name:MEAL_ORDER[1],food:SNACKS[i][0],done:false},lunch,{name:MEAL_ORDER[3],food:SNACKS[i][1],done:false},{name:MEAL_ORDER[4],food:SNACKS[i][2],done:false},dinner];
  changed=true;
 });
 if(changed)save();
}
const WORK=[['Lunedì','Forza A · multistazione · 20–30 min'],['Martedì','Tapis roulant · 15–20 min'],['Mercoledì','Recupero · passeggiata facoltativa'],['Giovedì','Forza B · multistazione · 20–30 min'],['Venerdì','Passeggiata facoltativa'],['Sabato','Passeggiata facoltativa'],['Domenica','Passeggiata facoltativa']];
const INIT={meals:BASE.map(x=>x.map(([name,food])=>({name,food,done:false}))),shopping:[{name:'Uova',amount:8,unit:'pz',double:true},{name:'Zucchine',amount:1000,unit:'g',double:true},{name:'Tonno',amount:4,unit:'scatolette',double:true},{name:'Mandorle',amount:100,unit:'g',double:false},{name:'Pane',amount:600,unit:'g',double:true}],measurements:[],symptoms:[],workouts:{},settings:{goal:null},checks:{}};
let data;try{data=JSON.parse(localStorage.getItem('myfit-v1'))||structuredClone(INIT)}catch{data=structuredClone(INIT)}
let tab='Oggi',day=(new Date().getDay()+6)%7;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=()=>localStorage.setItem('myfit-v1',JSON.stringify(data));
const app=document.getElementById('app'),nav=document.getElementById('nav');
function show(){nav.innerHTML=['Oggi','Dieta','Allenamento','Spesa','Progressi','Diario','Impostazioni'].map(t=>'<button class="'+(t===tab?'on':'')+'" data-tab="'+t+'">'+t+'</button>').join('');nav.querySelectorAll('button').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;show()});let html='';
if(tab==='Oggi'||tab==='Dieta'){html='<div class="card"><h2>Menu settimanale</h2><label>Giorno <select id="day">'+DAYS.map((d,i)=>'<option value="'+i+'" '+(i===day?'selected':'')+'>'+d+'</option>').join('')+'</select></label><p class="muted">Menu indicativo: calorie e proteine ancora da verificare. Colazione prevalentemente salata, senza yogurt.</p></div>';html+=data.meals[day].map((m,i)=>'<div class="card"><h3>'+esc(m.name)+'</h3><label><input type="checkbox" data-meal="'+i+'" '+(m.done?'checked':'')+'> Consumato</label><textarea data-food="'+i+'">'+esc(m.food)+'</textarea></div>').join('');html+='<div class="card"><small>Spuntini indicativi da personalizzare. Le quantità e la compatibilità con il piano alimentare devono essere verificate.</small></div>'}
if(tab==='Allenamento'){html='<div class="card"><h2>Allenamenti lun–gio</h2><p class="muted">Nel weekend solo passeggiate facoltative. Intensità da adattare alla pressione e alla condizione fisica.</p>'+WORK.map(([d,w],i)=>'<div class="row"><span><b>'+d+'</b><br><small>'+w+'</small></span><label><input type="checkbox" data-work="'+i+'" '+(data.workouts[i]?'checked':'')+'> Fatto</label></div>').join('')+'</div>'}
if(tab==='Spesa'){html='<div class="card"><h2>Lista della spesa</h2><p class="muted">Quantità iniziali indicative: modificabili. ×2 è indipendente per ogni prodotto.</p>'+data.shopping.map((x,i)=>'<div class="row"><label><input type="checkbox" data-check="'+i+'" '+(data.checks[i]?'checked':'')+'> '+esc(x.name)+'</label><span>'+esc(x.amount*(x.double?2:1))+' '+esc(x.unit)+'</span><label><input type="checkbox" data-double="'+i+'" '+(x.double?'checked':'')+'> ×2</label></div>').join('')+'<button class="primary" id="add">Aggiungi articolo</button> <button id="copy">Copia lista</button></div>'}
if(tab==='Progressi'){html='<div class="card"><h2>Misurazioni</h2><p>Obiettivo impostato: '+esc(data.settings.goal??'da impostare')+' kg</p><form id="measure"><label>Data <input name="date" type="date" required value="'+new Date().toISOString().slice(0,10)+'"></label><label>Peso (kg) <input name="weight" type="number" step=".1" min="20" max="350"></label><label>Girovita (cm) <input name="waist" type="number" step=".1" min="30" max="250"></label><label>Pressione sistolica <input name="sys" type="number" min="50" max="260"></label><label>Pressione diastolica <input name="dia" type="number" min="30" max="180"></label><p><button class="primary">Salva misura</button></p></form></div><div class="card"><h3>Storico</h3>'+data.measurements.slice().reverse().map(x=>'<div class="row">'+esc(x.date)+' · '+esc(x.weight||'—')+' kg · vita '+esc(x.waist||'—')+' cm · PA '+esc(x.sys||'—')+'/'+esc(x.dia||'—')+'</div>').join('')+'</div>'}
if(tab==='Diario'){html='<div class="card"><h2>Gonfiore e fame</h2><form id="symptom"><label>Data <input name="date" type="date" required value="'+new Date().toISOString().slice(0,10)+'"></label><label>Gonfiore mattina (0–10) <input name="morning" type="number" min="0" max="10"></label><label>Gonfiore sera (0–10) <input name="evening" type="number" min="0" max="10"></label><label>Fame alle 18:30 (0–10) <input name="hunger" type="number" min="0" max="10"></label><label>Note <textarea name="notes"></textarea></label><button class="primary">Salva diario</button></form></div><div class="card">'+data.symptoms.slice().reverse().map(x=>'<p>'+esc(x.date)+' · '+esc(x.morning)+'/'+esc(x.evening)+' · '+esc(x.notes)+'</p>').join('')+'</div>'}
if(tab==='Impostazioni'){html='<div class="card"><h2>Backup locale</h2><p>I dati restano sul dispositivo. Salva una copia JSON prima di cancellare i dati del browser.</p><button class="primary" id="export">Esporta backup JSON</button><label>Ripristina backup <input type="file" id="import" accept=".json,application/json"></label><label>Peso obiettivo (kg) <input type="number" step=".1" id="goal" value="'+esc(data.settings.goal??'')+'"></label></div>'}
app.innerHTML=html;
const $=s=>app.querySelector(s);if($('#day'))$('#day').onchange=e=>{day=+e.target.value;show()};
app.querySelectorAll('[data-meal]').forEach(x=>x.onchange=e=>{data.meals[day][+x.dataset.meal].done=e.target.checked;save()});
app.querySelectorAll('[data-food]').forEach(x=>x.onchange=e=>{data.meals[day][+x.dataset.food].food=e.target.value;save()});
app.querySelectorAll('[data-work]').forEach(x=>x.onchange=e=>{data.workouts[x.dataset.work]=e.target.checked;save()});
app.querySelectorAll('[data-double]').forEach(x=>x.onchange=e=>{data.shopping[+x.dataset.double].double=e.target.checked;save();show()});
app.querySelectorAll('[data-check]').forEach(x=>x.onchange=e=>{data.checks[x.dataset.check]=e.target.checked;save()});
if($('#add'))$('#add').onclick=()=>{let name=prompt('Nome articolo');if(!name)return;let amount=Number(prompt('Quantità',1));let unit=prompt('Unità (g, pz, kg...)','pz')||'pz';if(!Number.isFinite(amount)||amount<=0)return;data.shopping.push({name,amount,unit,double:false});save();show()};
if($('#copy'))$('#copy').onclick=()=>navigator.clipboard.writeText(data.shopping.map((x,i)=>(data.checks[i]?'☑ ':'☐ ')+x.name+': '+x.amount*(x.double?2:1)+' '+x.unit).join('\n')).then(()=>alert('Lista copiata')).catch(()=>alert('Copia non disponibile'));
if($('#measure'))$('#measure').onsubmit=e=>{e.preventDefault();data.measurements.push(Object.fromEntries(new FormData(e.target)));save();show()};
if($('#symptom'))$('#symptom').onsubmit=e=>{e.preventDefault();data.symptoms.push(Object.fromEntries(new FormData(e.target)));save();show()};
if($('#goal'))$('#goal').onchange=e=>{data.settings.goal=e.target.value?+e.target.value:null;save()};
if($('#export'))$('#export').onclick=()=>{const blob=new Blob([JSON.stringify({version:1,data},null,2)],{type:'application/json'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='myfit-backup-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)};
if($('#import'))$('#import').onchange=async e=>{try{const v=JSON.parse(await e.target.files[0].text());if(v.version!==1||!v.data||!Array.isArray(v.data.meals)||!Array.isArray(v.data.shopping)||!Array.isArray(v.data.measurements))throw Error('Backup non valido');if(confirm('Sovrascrivere tutti i dati locali con il backup?')){data=v.data;save();show()}}catch(err){alert('Importazione fallita: '+err.message)}};
}ensureSixMeals();show();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(console.warn);