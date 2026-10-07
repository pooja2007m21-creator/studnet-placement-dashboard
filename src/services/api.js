// Mock REST layer. Swap each body for fetch(`${import.meta.env.VITE_API_URL}/...`) to use a real backend.
import {jobs,seedApps,seedNotes} from '../data/mockData';
const wait=(v,ms=350)=>new Promise(r=>setTimeout(()=>r(structuredClone(v)),ms));
const users=()=>JSON.parse(localStorage.getItem('users')||'[]');
export const authApi={
 async login(id,pw){const u=users().find(u=>(u.email===id||u.studentId===id)&&u.password===pw);
  if(!u)throw new Error('Incorrect ID/email or password.');return wait(u)},
 async register(u){const all=users();if(all.some(x=>x.email===u.email||x.studentId===u.studentId))throw new Error('An account with this email or student ID already exists.');
  localStorage.setItem('users',JSON.stringify([...all,u]));return wait(u)}};
export const jobsApi={list:()=>wait(jobs),get:id=>wait(jobs.find(j=>j.id===+id)||null)};
export const applicationsApi={list:()=>wait(seedApps),create:a=>wait(a,500)};
export const notificationsApi={list:()=>wait(seedNotes)};
