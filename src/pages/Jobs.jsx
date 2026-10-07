import {useMemo,useState} from 'react';import {Link,useParams,useNavigate} from 'react-router-dom';
import {useApp} from '../context/AppContext';import {useAuth} from '../context/AuthContext';import {daysLeft} from '../data/mockData';
export const Badge=({s})=><span className={'badge '+s.replace(/\s/g,'')}>{s}</span>;
export function Jobs(){
 const {jobs,apps}=useApp(),[q,setQ]=useState(''),[loc,setLoc]=useState(''),[type,setType]=useState(''),[sort,setSort]=useState('latest');
 const list=useMemo(()=>{const s=q.toLowerCase();
  return jobs.filter(j=>(!s||[j.company,j.title,...j.skills].some(t=>t.toLowerCase().includes(s)))&&(!loc||j.location===loc)&&(!type||j.type===type))
   .sort((a,b)=>sort==='package'?b.package-a.package:sort==='deadline'?a.deadline.localeCompare(b.deadline):sort==='company'?a.company.localeCompare(b.company):b.posted.localeCompare(a.posted))},[jobs,q,loc,type,sort]);
 const opts=k=>[...new Set(jobs.map(j=>j[k]))].map(v=><option key={v}>{v}</option>);
 return <><h1>Job openings</h1>
  <div className="filters"><input placeholder="Search company, role or skill" aria-label="Search" value={q} onChange={e=>setQ(e.target.value)}/>
   <select aria-label="Location" value={loc} onChange={e=>setLoc(e.target.value)}><option value="">All locations</option>{opts('location')}</select>
   <select aria-label="Job type" value={type} onChange={e=>setType(e.target.value)}><option value="">All types</option>{opts('type')}</select>
   <select aria-label="Sort" value={sort} onChange={e=>setSort(e.target.value)}><option value="latest">Latest</option><option value="deadline">Deadline</option><option value="package">Highest package</option><option value="company">Company name</option></select></div>
  {!list.length?<p className="empty">No jobs match these filters. Clear a filter or try another skill.</p>:
  <div className="cards">{list.map(j=>{const ap=apps.find(a=>a.jobId===j.id),dl=daysLeft(j.deadline);return <article className="card job" key={j.id}>
   <div className="logo">{j.company[0]}</div><h3>{j.title}</h3><p className="muted">{j.company} · {j.location} · {j.type}</p>
   <p><b>₹{j.package} LPA</b></p><p className="tags">{j.skills.map(s=><span key={s}>{s}</span>)}</p>
   <p className={dl<=3?'err':'muted'}>{dl<0?'Closed':dl+' days left'}</p>
   <div className="row">{ap?<Badge s={ap.status}/>:<span className="muted">Not applied</span>}<Link className="btn sm" to={'/jobs/'+j.id}>View details</Link></div></article>})}</div>}</>}
export function JobDetails(){
 const {id}=useParams(),nav=useNavigate(),{jobs,apps,apply}=useApp(),{user}=useAuth(),j=jobs.find(x=>x.id===+id),[open,setOpen]=useState(false);
 const [f,setF]=useState({cgpa:'',skills:'',cover:''}),[e,setE]=useState({}),[msg,setMsg]=useState(''),[busy,setBusy]=useState(false);
 if(!j)return <p className="empty">Job not found. <Link to="/jobs">Back to jobs</Link></p>;
 const applied=apps.some(a=>a.jobId===j.id);
 const submit=async ev=>{ev.preventDefault();const er={};const c=parseFloat(f.cgpa);
  if(!(c>=0&&c<=10))er.cgpa='Enter a CGPA between 0 and 10.';else if(c<j.minCgpa)er.cgpa='Minimum CGPA for this role is '+j.minCgpa+'.';
  if(!f.skills.trim())er.skills='List at least one skill.';if(f.cover.trim().length<20)er.cover='Write at least 20 characters.';
  setE(er);if(Object.keys(er).length)return;setBusy(true);
  try{await apply(j.id,f);setMsg('Application submitted. Track it under Applications.');setOpen(false)}catch(x){setMsg(x.message)}setBusy(false)};
 return <><button className="ghost" onClick={()=>nav(-1)}>← Back</button><div className="card detail"><div className="logo">{j.company[0]}</div>
  <h1>{j.title}</h1><p className="muted">{j.company} · {j.location} · {j.type} · ₹{j.package} LPA</p><p>{j.desc}</p>
  <h3>Eligibility</h3><p>Minimum CGPA {j.minCgpa} · {j.dept} students</p><h3>Required skills</h3><p className="tags">{j.skills.map(s=><span key={s}>{s}</span>)}</p>
  <h3>Selection process</h3><ol>{j.process.map(p=><li key={p}>{p}</li>)}</ol><p className="muted">Deadline: {j.deadline} ({daysLeft(j.deadline)} days left)</p>
  {msg&&<p role="status" className={applied?'ok':'err'}>{msg}</p>}
  <button className="btn" disabled={applied} onClick={()=>setOpen(!open)}>{applied?'Applied':'Apply now'}</button>
  {open&&<form onSubmit={submit} noValidate className="apply"><p className="muted">Applying as {user.name} ({user.email})</p>
   {[['cgpa','CGPA'],['skills','Skills (comma separated)']].map(([k,l])=><label key={k}>{l}<input value={f[k]} onChange={x=>setF({...f,[k]:x.target.value})}/>{e[k]&&<small className="err">{e[k]}</small>}</label>)}
   <label>Cover message<textarea rows="4" value={f.cover} onChange={x=>setF({...f,cover:x.target.value})}/>{e.cover&&<small className="err">{e.cover}</small>}</label>
   <button className="btn" disabled={busy}>{busy?'Submitting…':'Submit application'}</button></form>}</div></>}
