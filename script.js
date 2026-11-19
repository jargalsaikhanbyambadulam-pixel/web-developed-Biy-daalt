const products=[
 ['Вирус вашер агаар цэвэршүүлэгч','air','🌬️'],['DWP-220','water','💧'],
 ['APPLEBIDET AB-K3814NF','bidet','🚿'],['Хамгийн ИХ багтаамжтай','water','💧'],
 ['WaterCare DWP-817S','water','💧'],['Winix TS-200S','water','💧'],
 ['Housing шүүлтүүр','filter','🧪'],['Угаалгын машины шүүлтүүр','filter','🧪'],
 ['APPLEBIDET AB-K9833','bidet','🚿'],['Winix PQ-1000','water','💧'],
 ['Шүршүүрийн шүүлтүүр','filter','🧪'],['APPLEBIDET AB-K9823R','bidet','🚿']
];
const grid=document.getElementById('grid');
products.forEach(([n,c,i],k)=>{
  grid.insertAdjacentHTML('beforeend',`<article class="card" data-cat="${c}" style="--i:${k}" tabindex="0">
   <div class="inner">
    <div class="face"><span class="icon">${i}</span><div><h3>${n}</h3><small>Дэлгэрэнгүйг харах</small></div></div>
    <div class="face back"><h3>${n}</h3><a href="https://www.bileg.us/products.php">Дэлгэрэнгүй</a></div>
   </div></article>`);
});
document.getElementById('filters').addEventListener('click',e=>{
  const b=e.target.closest('.chip'); if(!b)return;
  document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x===b));
  document.querySelectorAll('.card').forEach(c=>c.classList.toggle('hide',b.dataset.cat!=='all'&&c.dataset.cat!==b.dataset.cat));
});
/* hamburger */
const nav=document.getElementById('nav'),mb=document.getElementById('menuBtn');
mb.onclick=()=>{const o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
nav.onclick=()=>nav.classList.remove('open');
/* dark mode */
const root=document.documentElement,tb=document.getElementById('themeBtn');
const set=t=>{root.dataset.theme=t;tb.textContent=t==='dark'?'☀️':'🌙';try{localStorage.setItem('theme',t)}catch(e){}};
let saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
set(saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
tb.onclick=()=>set(root.dataset.theme==='dark'?'light':'dark');
/* Lab 9: form validation */
const checks={name:validateName,email:validateEmail,password:validatePassword,message:validateMessage};
document.getElementById('form').addEventListener('submit',e=>{
  e.preventDefault();let ok=true;
  for(const id in checks){
    const el=document.getElementById(id),msg=checks[id](el.value);
    el.classList.toggle('bad',!!msg);el.nextElementSibling.textContent=msg;
    if(msg)ok=false;
  }
  document.getElementById('ok').textContent=ok?'Баярлалаа! Таны хүсэлт хүлээн авагдлаа.':'';
});
/* Lab 9 даалгавар 1: турших код */
console.table([{expr:'0.1+0.2',value:0.1+0.2},{expr:'typeof "a"',value:typeof 'a'},{expr:'typeof null',value:typeof null}]);