import {createContext,useContext,useState} from 'react';
import {authApi} from '../services/api';
const Ctx=createContext();
export const useAuth=()=>useContext(Ctx);
export function AuthProvider({children}){
 const [user,setUser]=useState(()=>JSON.parse(localStorage.getItem('session')||'null'));
 const save=(u,remember=true)=>{const {password,...safe}=u;setUser(safe);if(remember)localStorage.setItem('session',JSON.stringify(safe))};
 const login=async(id,pw,remember)=>save(await authApi.login(id,pw),remember);
 const register=async u=>save(await authApi.register(u));
 const logout=()=>{setUser(null);localStorage.removeItem('session')};
 return <Ctx.Provider value={{user,login,register,logout}}>{children}</Ctx.Provider>}
