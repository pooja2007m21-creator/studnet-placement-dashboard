import {useState} from 'react';import {useNavigate,Link} from 'react-router-dom';import {useAuth} from '../context/AuthContext';
const email=v=>/^\S+@\S+\.\S+$/.test(v),phone=v=>/^[6-9]\d{9}$/.test(v);
function Field({label,error,...p}){return <label>{label}<input {...p}/>{error&&<small className="err">{error}</small>}</label>}
export function Login(){
 const {login}=useAuth(),nav=useNavigate(),[f,setF]=useState({id:'',pw:'',remember:true}),[show,setShow]=useState(false),[e,setE]=useState({}),[msg,setMsg]=useState('');
 const submit=async ev=>{ev.preventDefault();const er={};if(!f.id.trim())er.id='Enter your email or student ID.';if(f.pw.length<6)er.pw='Password must be at least 6 characters.';setE(er);if(Object.keys(er).length)return;
  try{await login(f.id.trim(),f.pw,f.remember);nav('/dashboard')}catch(x){setMsg(x.message)}};
 return <div className="center"><form className="card auth" onSubmit={submit} noValidate><h1>Welcome back</h1>
  {msg&&<p className="err" role="alert">{msg}</p>}
  <Field label="Email or student ID" value={f.id} error={e.id} onChange={x=>setF({...f,id:x.target.value})}/>
  <Field label="Password" type={show?'text':'password'} value={f.pw} error={e.pw} onChange={x=>setF({...f,pw:x.target.value})}/>
  <div className="row"><label className="inline"><input type="checkbox" checked={show} onChange={()=>setShow(!show)}/>Show password</label>
   <label className="inline"><input type="checkbox" checked={f.remember} onChange={()=>setF({...f,remember:!f.remember})}/>Remember me</label></div>
  <button className="btn">Log in</button><p className="muted"><a href="#reset">Forgot password?</a> · <Link to="/register">Create an account</Link></p></form></div>}
export function Register(){
 const {register}=useAuth(),nav=useNavigate(),[f,setF]=useState({name:'',studentId:'',email:'',phone:'',department:'',course:'',year:'',password:'',confirm:'',terms:false}),[e,setE]=useState({}),[msg,setMsg]=useState('');
 const set=k=>x=>setF({...f,[k]:x.target.type==='checkbox'?x.target.checked:x.target.value});
 const submit=async ev=>{ev.preventDefault();const er={};
  ['name','studentId','department','course','year'].forEach(k=>!f[k].trim()&&(er[k]='Required.'));
  if(!email(f.email))er.email='Enter a valid email address.';if(!phone(f.phone))er.phone='Enter a 10-digit mobile number.';
  if(f.password.length<6)er.password='Use at least 6 characters.';if(f.confirm!==f.password)er.confirm='Passwords do not match.';
  if(!f.terms)er.terms='Accept the terms to continue.';setE(er);if(Object.keys(er).length)return;
  try{const {confirm,terms,...u}=f;await register({...u,cgpa:'',skills:[],resume:'Not uploaded'});nav('/dashboard')}catch(x){setMsg(x.message)}};
 return <div className="center"><form className="card auth wide" onSubmit={submit} noValidate><h1>Create your account</h1>{msg&&<p className="err" role="alert">{msg}</p>}
  <div className="grid2">{[['name','Full name'],['studentId','Student ID'],['email','Email'],['phone','Phone'],['department','Department'],['course','Course'],['year','Graduation year']].map(([k,l])=><Field key={k} label={l} value={f[k]} error={e[k]} onChange={set(k)}/>)}
  <Field label="Password" type="password" value={f.password} error={e.password} onChange={set('password')}/><Field label="Confirm password" type="password" value={f.confirm} error={e.confirm} onChange={set('confirm')}/></div>
  <label className="inline"><input type="checkbox" checked={f.terms} onChange={set('terms')}/>I accept the terms and conditions</label>{e.terms&&<small className="err">{e.terms}</small>}
  <button className="btn">Register</button><p className="muted">Have an account? <Link to="/login">Log in</Link></p></form></div>}
