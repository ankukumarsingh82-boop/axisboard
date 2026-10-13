const K='axisboard:v1',$=id=>document.getElementById(id);
let s=JSON.parse(localStorage.getItem(K)||'null')||{name:'',track:'Open Innovation',problem:'',demo:'',ms:[]};
const save=()=>localStorage.setItem(K,JSON.stringify(s));
['name','track','problem','demo'].forEach(f=>{$(f).value=s[f];$(f).oninput=e=>{s[f]=e.target.value;save()}});
function render(){const l=$('list');l.innerHTML='';s.ms.forEach((m,i)=>{const li=document.createElement('li');li.innerHTML=`<input type=checkbox ${m.done?'checked':''}> <span class="${m.done?'done':''}"></span> <small>${new Date(m.t).toLocaleString()}</small> <button>x</button>`;li.querySelector('span').textContent=m.text;li.querySelector('input').onchange=()=>{m.done=!m.done;save();render()};li.querySelector('button').onclick=()=>{s.ms.splice(i,1);save();render()};l.appendChild(li)});const d=s.ms.filter(m=>m.done).length;$('prog').textContent=s.ms.length?`(${d}/${s.ms.length})`:''}
$('add').onclick=()=>{const v=$('ms').value.trim();if(!v)return;s.ms.push({text:v,done:false,t:Date.now()});$('ms').value='';save();render()};
const brief=()=>`# ${s.name||'Untitled'}\n\n**Track:** ${s.track}\n\n## Problem\n${s.problem||'-'}\n\n## Demo\n${s.demo||'-'}\n\n## Milestones\n${s.ms.map(m=>`- [${m.done?'x':' '}] ${m.text}`).join('\n')||'-'}\n`;
$('exp').onclick=()=>$('brief').textContent=brief();
$('dl').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([brief()],{type:'text/markdown'}));a.download='submission-brief.md';a.click()};
$('reset').onclick=()=>{if(confirm('Reset?')){localStorage.removeItem(K);location.reload()}};
render();
