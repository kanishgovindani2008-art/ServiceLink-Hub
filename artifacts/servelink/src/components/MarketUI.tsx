import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Check, ChevronDown, Clock3, MapPin, Menu, Phone, Star, Wrench, X } from 'lucide-react';
import { areas, brandOptions, categories, photoFromFile, type Booking, type Category, type Pro } from '../lib/market';
import { useStore } from '../lib/Store';

export function Shell({children}:{children:ReactNode}){
  const {location,setLocation,role,setRole,bookings}=useStore();const [path,navigate]=useLocation();const [menu,setMenu]=useState(false);
  const switchRole=()=>{const next=role==='Customer'?'Professional':'Customer';setRole(next);navigate(next==='Professional'?'/professional':'/')};
  const nav=[['/','Home'],['/search','Search'],['/bookings','My Bookings'],['/profile','Profile']];
  return <div className="app-shell">
    <header className="topbar"><div className="topbar-inner">
      <Link href="/" className="brand" data-testid="link-home-brand"><span className="brand-mark"><Wrench size={19}/><i/></span><span className="brand-name"><b>Serve</b><em>link</em><small>Your Local Service. One Platform.</small></span></Link>
      <nav className="desktop-nav">{nav.map(([href,label])=><Link key={href} href={href} className={`nav-link ${path===href?'active':''}`} data-testid={`nav-${label.toLowerCase().replaceAll(' ','-')}`}>{label}{label==='My Bookings'&&bookings.length>0&&<span className="nav-count">{bookings.length}</span>}</Link>)}</nav>
      <div className="head-tools"><label className="location-select"><MapPin size={15}/><select value={location} onChange={e=>setLocation(e.target.value)} aria-label="Choose service area" data-testid="select-location">{areas.map(a=><option key={a}>{a}</option>)}</select><ChevronDown size={13}/></label><button className="role-switch" onClick={switchRole} data-testid="switch-demo-view"><span className="switch-dot"/>{role} view</button><button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation" data-testid="button-menu">{menu?<X/>:<Menu/>}</button></div>
    </div>{menu&&<nav className="mobile-menu-panel">{nav.map(([href,label])=><Link onClick={()=>setMenu(false)} key={href} href={href} className="nav-link">{label}</Link>)}<button data-testid="mobile-switch-demo-view" onClick={()=>{switchRole();setMenu(false)}}>Switch to {role==='Customer'?'Professional':'Customer'} view</button></nav>}</header>
    <main className="main-area">{children}</main>
    <nav className="bottom-nav">{nav.map(([href,label],i)=><Link key={href} href={href} className={path===href?'active':''} data-testid={`mobile-nav-${label.toLowerCase().replaceAll(' ','-')}`}><span className="bottom-icon">{['⌂','⌕','▤','◉'][i]}</span><span>{label==='My Bookings'?'Bookings':label}</span></Link>)}</nav>
    <footer className="footer"><span>Servelink <b>•</b> Your Local Service. One Platform.</span><span>Sample-data demo · Bhopal & nearby areas</span></footer>
  </div>;
}
export function ProCard({pro,onBook,onPortfolio,reason}:{pro:Pro;onBook:(p:Pro)=>void;onPortfolio:(p:Pro)=>void;reason?:string}){
  return <article className="pro-card" data-testid={`card-professional-${pro.id}`}>
    <div className="pro-head"><img src={pro.photo} alt="" className="pro-avatar"/><div className="pro-heading"><h3 data-testid={`text-professional-${pro.id}`}>{pro.name}</h3><div className="pro-category">{pro.category}<span className="sample-pill">Demo profile</span></div></div><div className="rating"><Star size={14} fill="currentColor"/><b>{pro.rating.toFixed(1)}</b><small>({pro.reviews} sample)</small></div></div>
    <div className="pro-facts"><span><MapPin size={14}/>{pro.neighborhood} · {pro.distance} km</span><span><Clock3 size={14}/>{pro.years} yrs experience</span><span><Wrench size={14}/>{pro.jobs} demo jobs</span></div>
    <div className="specialty-row">{pro.specializations.slice(0,3).map(s=><span className="specialty" key={s}>{s}</span>)}{brandOptions[pro.category]&&pro.brands?.slice(0,2).map(b=><span className="specialty brand-chip" key={b}>{b}</span>)}{brandOptions[pro.category]&&pro.brands?.length?<span className="specialty brand-chip">Brand Specialist</span>:null}{pro.vehicleTypes?.map(v=><span className="specialty" key={v}>{v}</span>)}</div>
    {reason&&<p className="match-reason">{reason}</p>}
    <div className="availability-line"><span className={pro.available?'available':'unavailable'}><i/>{pro.available?'Available today':'Schedule ahead'}</span><span>From <b>₹{pro.price}</b></span></div>
    <div className="card-actions"><button className="btn btn-soft" onClick={()=>onPortfolio(pro)} data-testid={`button-previous-work-${pro.id}`}>Previous Work</button>{pro.phone?<a className="btn btn-primary" href={`tel:${pro.phone}`} data-testid={`link-call-${pro.id}`}><Phone size={15}/>Call</a>:<button className="btn btn-primary btn-unavailable" title="No demo phone number is configured" aria-label="Call unavailable: no demo phone number configured" disabled data-testid={`button-call-unavailable-${pro.id}`}><Phone size={15}/>Call</button>}<button className="btn btn-primary" onClick={()=>onBook(pro)} data-testid={`button-book-${pro.id}`}>Book Now</button></div>
  </article>;
}
export type BookingDraft={professional:Pro;problem:string;photo?:string;category?:Category};
export function BookingDialog({draft,onClose,onSubmit}:{draft:BookingDraft|null;onClose:()=>void;onSubmit:(b:Omit<Booking,'id'|'status'>)=>void}){
  const [problem,setProblem]=useState(draft?.problem??'');const [address,setAddress]=useState('');const [date,setDate]=useState('');const [slot,setSlot]=useState('');const [photo,setPhoto]=useState<string|undefined>(draft?.photo);const [error,setError]=useState('');const [pending,setPending]=useState(false);const [done,setDone]=useState(false);
  if(!draft)return null;
  const slots=['09:00','11:30','14:00','16:30'];const unavailable=['11:30'];
  async function chooseFile(file?:File){if(!file)return;try{setPhoto(await photoFromFile(file));setError('')}catch(e){setError((e as Error).message)}}
  function submit(){if(!draft)return;if(!problem.trim()||!address.trim()||!date||!slot){setError('Add the problem, service address, preferred date and an available time.');return}const selected=draft;setError('');setPending(true);window.setTimeout(()=>{onSubmit({professionalId:selected.professional.id,category:selected.category??selected.professional.category,problem,photo,address,date,slot,price:selected.professional.price});setPending(false);setDone(true)},550)}
  return <div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
    <button className="modal-close" onClick={onClose} aria-label="Close booking" data-testid="button-close-booking"><X/></button>
    {done?<div className="booking-success"><span className="success-mark"><Check/></span><div className="eyebrow">Request received</div><h2 id="booking-title">Your request is in.</h2><p>It’s now pending until {draft.professional.name} responds. Find it anytime in My Bookings.</p><button className="btn btn-primary" onClick={onClose} data-testid="button-booking-done">Back to browsing <ArrowRight size={16}/></button></div>:
    <><div className="eyebrow">New service request</div><h2 id="booking-title">Book {draft.professional.name}</h2><p className="modal-intro">{draft.professional.category} · {draft.professional.neighborhood} <span className="sample-pill">Demo profile</span></p>
      <div className="price-note"><span>Starting price</span><strong>₹{draft.professional.price}</strong><small>Final price may change after inspection.</small></div>
      <label className="field-label">What needs attention?<textarea value={problem} onChange={e=>setProblem(e.target.value)} placeholder="Describe the issue for your professional" data-testid="input-booking-problem"/></label>
      <label className="field-label">Add a photo <span className="optional">Optional · up to 5 MB</span><input type="file" accept="image/*" onChange={e=>void chooseFile(e.target.files?.[0])} data-testid="input-booking-photo"/></label>
      {photo&&<div className="upload-preview"><img src={photo} alt="Issue preview"/><button onClick={()=>setPhoto(undefined)} data-testid="button-remove-booking-photo">Remove image</button></div>}
      <label className="field-label">Service address<input value={address} onChange={e=>setAddress(e.target.value)} placeholder="House / street / landmark" data-testid="input-booking-address"/></label>
      <label className="field-label">Preferred date<input type="date" min={new Date().toISOString().slice(0,10)} value={date} onChange={e=>setDate(e.target.value)} data-testid="input-booking-date"/></label>
      <div className="field-label">Available time <div className="slot-list">{slots.map(s=><button disabled={unavailable.includes(s)} className={`slot ${slot===s?'selected':''} ${unavailable.includes(s)?'slot-off':''}`} onClick={()=>setSlot(s)} key={s} data-testid={`button-slot-${s.replace(':','-')}`}>{s}{unavailable.includes(s)&&<small>Unavailable</small>}</button>)}</div></div>
      {error&&<div className="form-error" role="alert" data-testid="status-booking-error">{error}</div>}
      <button className="btn btn-primary submit-booking" onClick={submit} disabled={pending} data-testid="button-submit-booking">{pending?'Sending request…':'Send booking request'}<ArrowRight size={16}/></button><p className="tiny-note">Demo only. No payment is taken, and the request starts as Pending.</p>
    </>}</section></div>;
}
export function PortfolioGallery({pro,onClose}:{pro:Pro|null;onClose:()=>void}){
  const [large,setLarge]=useState<string|null>(null);if(!pro)return null;
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="portfolio-modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={onClose} aria-label="Close portfolio" data-testid="button-close-portfolio"><X/></button><div className="eyebrow">Previous work · Sample portfolio</div><h2>{pro.name}</h2><p className="modal-intro">Illustrative demo samples only — not verified real-world work.</p><div className="portfolio-grid">{pro.portfolio.map(item=><button className="portfolio-item" key={item.id} onClick={()=>setLarge(item.image)} data-testid={`button-portfolio-image-${item.id}`}><img src={item.image} alt={item.title}/><span><b>{item.title}</b><small>{item.service} · {item.date}</small><small>{item.description}</small></span></button>)}</div>{large&&<div className="image-lightbox" onClick={()=>setLarge(null)}><button aria-label="Close enlarged image" data-testid="button-close-lightbox"><X/></button><img src={large} alt="Enlarged sample portfolio"/></div>}</section></div>;
}
export function categoryIconName(c:Category){return categories.indexOf(c);}
export function StatusPill({status}:{status:Booking['status']}){return <span className={`status-pill status-${status.toLowerCase()}`}>{status}</span>}
