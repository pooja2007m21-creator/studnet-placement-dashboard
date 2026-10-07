import {useState} from 'react';
import {Routes,Route,Navigate,NavLink,Outlet,useLocation,Link} from 'react-router-dom';
import {AuthProvider,useAuth} from './context/AuthContext';
import {AppProvider,useApp} from './context/AppContext';
import {Login,Register} from './pages/Auth';
import {Dashboard,Applications,Interviews,Analytics,Notifications} from './pages/Pages';
import {Jobs,JobDetails} from './pages/Jobs';
const nav=[['dashboard','Dashboard'],['jobs','Jobs'],['applications','Applications'],['interviews','Interviews'],['analytics','Analytics'],['notifications','Notifications']];
function Shell(){
 const {user,logout}=useAuth(),{notes,loading,error}=useApp(),[open,setOpen]=useState(false);useLocation();
 if(!user)return <Navigate to="/login" replace/>;
 const unread=notes.filter(n=>!n.read).length;
 return <div className="shell">
  <button className="menu" aria-label="Toggle menu" onClick={()=>setOpen(!open)}>☰</button>
  <aside className={open?'side open':'side'} onClick={()=>setOpen(false)}>
   <h2>Placement Desk</h2>
   <nav>{nav.map(([p,l])=><NavLink key={p} to={'/'+p}>{l}{p==='notifications'&&unread>0&&<b className="pill">{unread}</b>}</NavLink>)}</nav>
   <button className="ghost" onClick={logout}>Log out</button>
  </aside>
  <main>{loading?<p className="muted">Loading your placement data…</p>:error?<p className="err">{error}</p>:<Outlet/>}</main></div>}
function NotFound(){return <div className="center"><h1>404</h1><p>That page doesn't exist.</p><Link className="btn" to="/dashboard">Back to dashboard</Link></div>}
export default function App(){
 return <AuthProvider><AppProvider><Routes>
  <Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
  <Route element={<Shell/>}>
   <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
   <Route path="/dashboard" element={<Dashboard/>}/><Route path="/jobs" element={<Jobs/>}/><Route path="/jobs/:id" element={<JobDetails/>}/>
   <Route path="/applications" element={<Applications/>}/><Route path="/interviews" element={<Interviews/>}/>
   <Route path="/analytics" element={<Analytics/>}/><Route path="/notifications" element={<Notifications/>}/>
  </Route><Route path="/*" element={<NotFound/>}/></Routes></AppProvider></AuthProvider>}
