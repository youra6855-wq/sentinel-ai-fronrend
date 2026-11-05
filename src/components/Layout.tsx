import { NavLink, Outlet } from 'react-router-dom'
import { Activity, Bell, ChevronDown, CircleHelp, Command, FileBarChart, Fingerprint, LayoutDashboard, Menu, Network, Search, Settings, Shield, ShieldAlert, UploadCloud, X } from 'lucide-react'
import { useState } from 'react'
const nav = [
  {label:'Workspace',items:[{to:'/',label:'Overview',icon:LayoutDashboard},{to:'/alerts',label:'Security alerts',icon:ShieldAlert,badge:'8'},{to:'/logs',label:'Log analysis',icon:UploadCloud},{to:'/rules',label:'Detection rules',icon:Fingerprint}]},
  {label:'Intelligence',items:[{to:'/ml-insights',label:'ML insights',icon:Network},{to:'/reports',label:'Reports',icon:FileBarChart}]}
]
export default function Layout(){
 const [mobile,setMobile]=useState(false)
 return <div className="app-shell">
  <aside className={`sidebar ${mobile?'sidebar-open':''}`}>
   <div className="brand"><div className="brand-mark"><Shield size={21}/></div><div><b>SENTINEL<span>AI</span></b><small>SECURITY OPERATIONS</small></div><button className="icon-btn mobile-close" onClick={()=>setMobile(false)}><X size={18}/></button></div>
   <div className="workspace-switch"><div className="workspace-avatar">S</div><div><b>Sentinel Workspace</b><small>Academic environment</small></div><ChevronDown size={15}/></div>
   <nav>{nav.map(group=><div className="nav-group" key={group.label}><p className="nav-label">{group.label}</p>{group.items.map(item=><NavLink end={item.to==='/'} onClick={()=>setMobile(false)} className={({isActive})=>`nav-link ${isActive?'active':''}`} to={item.to} key={item.to}><item.icon size={17}/><span>{item.label}</span>{item.badge&&<em>{item.badge}</em>}</NavLink>)}</div>)}</nav>
   <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><b>Need a hand?</b><p>Explore the project workspace and review your security signals.</p><a href="https://attack.mitre.org/" target="_blank" rel="noreferrer">Security reference ↗</a></div><NavLink to="/settings" className="nav-link"><Settings size={17}/>Settings</NavLink><div className="profile"><div className="profile-avatar">YA</div><div><b>Youssef Ahmed</b><small>Frontend developer</small></div><Command size={16}/></div></div>
  </aside>
  {mobile&&<div className="mobile-overlay" onClick={()=>setMobile(false)}/>}
  <main className="main-area"><header className="topbar"><button className="icon-btn mobile-menu" onClick={()=>setMobile(true)}><Menu size={19}/></button><div className="crumb"><span>Workspace</span><b>/</b><strong>Security overview</strong></div><div className="top-actions"><div className="search-top"><Search size={16}/><span>Search anything...</span><kbd>⌘ K</kbd></div><button className="icon-btn notification"><Bell size={18}/><i/></button><div className="top-user">YA</div></div></header><div className="page-wrap"><Outlet/></div><footer className="footer"><span>© 2026 Sentinel AI · Academic project prototype</span><span><i className="live-dot"/> System interface ready</span></footer></main>
 </div>
}