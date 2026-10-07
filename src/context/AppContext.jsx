import {createContext,useContext,useEffect,useState} from 'react';
import {applicationsApi,jobsApi,notificationsApi} from '../services/api';
const Ctx=createContext();
export const useApp=()=>useContext(Ctx);
export function AppProvider({children}){
 const [jobs,setJobs]=useState([]),[apps,setApps]=useState([]),[notes,setNotes]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState('');
 useEffect(()=>{Promise.all([jobsApi.list(),applicationsApi.list(),notificationsApi.list()])
  .then(([j,a,n])=>{setJobs(j);setApps(a);setNotes(n)}).catch(()=>setError('Could not load placement data. Please try again.')).finally(()=>setLoading(false))},[]);
 const apply=async(jobId,form)=>{
  if(apps.some(a=>a.jobId===jobId))throw new Error('You have already applied to this job.');
  const a=await applicationsApi.create({id:'a'+Date.now(),jobId,date:new Date().toISOString().slice(0,10),status:'Applied',form});
  setApps(p=>[a,...p]);
  setNotes(p=>[{id:Date.now(),type:'Company',text:'Application submitted successfully.',time:'just now',read:false},...p])};
 const markRead=id=>setNotes(p=>p.map(n=>n.id===id?{...n,read:true}:n));
 const markAll=()=>setNotes(p=>p.map(n=>({...n,read:true})));
 return <Ctx.Provider value={{jobs,apps,notes,loading,error,apply,markRead,markAll}}>{children}</Ctx.Provider>}
