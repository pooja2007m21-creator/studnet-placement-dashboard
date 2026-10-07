import {Link} from 'react-router-dom';import {useApp} from '../context/AppContext';import {useAuth} from '../context/AuthContext';
import {STAGES,daysLeft} from '../data/mockData';import {Badge} from './Jobs';
const jobOf=(jobs,a)=>jobs.find(j=>j.id===a.jobId)||{};
const Stat=({n,l,sub})=><div className="card stat"><b>{n}</b><span>{l}</span><small className="muted">{sub}</small></div>;
export function Dashboard(){
 const {user}=useAuth(),{jobs,apps}=useApp();
 const upcoming=apps.filter(a=>a.interview&&daysLeft(a.interview.date)>=0),sel=apps.filter(a=>a.status==='Selected');
 const deadlines=jobs.filter(j=>daysLeft(j.deadline)>=0&&!apps.some(a=>a.jobId===j.id)).sort((a,b)=>a.deadline.localeCompare(b.deadline)).slice(0,4);
 return <><h1>Welcome back, {user.name.split(' ')[0]}</h1><p className="muted">Keep an eye on your deadlines. Open roles close fast.</p>
  {sel.length>0&&<div className="congrats">🎉 Congratulations! You were selected by {sel.map(a=>jobOf(jobs,a).company).join(', ')}.</div>}
  <div className="stats"><Stat n={apps.length} l="Total applications" sub="All time"/><Stat n={apps.filter(a=>!['Selected','Rejected'].includes(a.status)).length} l="Active" sub="In progress"/>
   <Stat n={apps.filter(a=>a.interview).length} l="Interviews" sub="Scheduled or done"/><Stat n={sel.length} l="Selected" sub="Offers"/><Stat n={upcoming.length} l="Upcoming interviews" sub="Next 30 days"/></div>
  <div className="grid2"><section className="card"><h3>Upcoming interviews</h3>{upcoming.length?upcoming.map(a=><p key={a.id}><b>{jobOf(jobs,a).company}</b> · {a.interview.date}, {a.interview.time}</p>):<p className="muted">No interviews scheduled yet.</p>}</section>
  <section className="card"><h3>Upcoming deadlines</h3>{deadlines.map(j=>{const d=daysLeft(j.deadline);return <p key={j.id} className={d<=3?'err':''}><Link to={'/jobs/'+j.id}><b>{j.company}</b></Link> · {j.title} · {d} day{d===1?'':'s'} left</p>})}</section></div></>}
export function Applications(){
 const {jobs,apps}=useApp();
 if(!apps.length)return <p className="empty">You haven't applied anywhere yet. <Link to="/jobs">Browse jobs</Link></p>;
 return <><h1>Applications</h1>{apps.map(a=>{const j=jobOf(jobs,a),i=Math.max(0,STAGES.indexOf(a.status));return <div className="card" key={a.id}>
  <div className="row"><h3>{j.company} · {j.title}</h3><Badge s={a.status}/></div><p className="muted">Applied {a.date}{a.interview&&` · Interview ${a.interview.date}`}</p>
  <ol className="steps">{STAGES.map((s,k)=><li key={s} className={k<=i?'done':''}>{s}</li>)}</ol>
  <p className="muted">Next step: {STAGES[i+1]||'Offer complete'}</p></div>})}</>}
export function Interviews(){
 const {jobs,apps}=useApp(),list=apps.filter(a=>a.interview);
 return <><h1>Interview schedule</h1>{!list.length?<p className="empty">No interviews yet. They appear here once a company shortlists you.</p>:list.map(a=>{const j=jobOf(jobs,a),i=a.interview,up=daysLeft(i.date)>=0;return <div className="card" key={a.id}>
  <div className="row"><h3>{j.company} · {j.title}</h3><Badge s={up?'Upcoming':'Completed'}/></div><p>{i.type} · {i.round}</p><p className="muted">{i.date} at {i.time} · {i.where}</p></div>})}</>}
export function Analytics(){
 const {apps,jobs}=useApp(),c=s=>apps.filter(a=>a.status===s).length,rows=[['Applied',apps.length],['Shortlisted',c('Shortlisted')],['Interviews',apps.filter(a=>a.interview).length],['Selected',c('Selected')],['Rejected',c('Rejected')]],max=Math.max(1,...rows.map(r=>r[1]));
 const byCo={};jobs.forEach(j=>byCo[j.type]=(byCo[j.type]||0)+1);
 return <><h1>Analytics</h1><div className="card"><h3>Application funnel</h3>{rows.map(([l,n])=><div className="bar" key={l}><span>{l}</span><i style={{width:(n/max*100)+'%'}}/><b>{n}</b></div>)}</div>
  <div className="card"><h3>Openings by job type</h3>{Object.entries(byCo).map(([l,n])=><div className="bar" key={l}><span>{l}</span><i style={{width:(n/jobs.length*100)+'%'}}/><b>{n}</b></div>)}</div></>}
export function Notifications(){
 const {notes,markRead,markAll}=useApp();
 return <><div className="row"><h1>Notifications</h1><button className="btn sm" onClick={markAll}>Mark all as read</button></div>
  {notes.map(n=><div key={n.id} className={'card note '+(n.read?'':'unread')}><div><b>{n.type}</b><p>{n.text}</p><small className="muted">{n.time}</small></div>{!n.read&&<button className="ghost" onClick={()=>markRead(n.id)}>Mark as read</button>}</div>)}</>}
