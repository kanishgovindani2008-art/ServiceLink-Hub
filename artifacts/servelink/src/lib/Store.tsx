import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { initialPros, loadJson, saveJson, type Booking, type Pro } from './market';
type Store = {
  pros: Pro[]; setPros: (p:Pro[]|((old:Pro[])=>Pro[]))=>void;
  bookings: Booking[]; setBookings: (b:Booking[]|((old:Booking[])=>Booking[]))=>void;
  location: string; setLocation:(v:string)=>void; role:'Customer'|'Professional'; setRole:(v:'Customer'|'Professional')=>void;
};
const Context=createContext<Store|null>(null);
export function StoreProvider({children}:{children:ReactNode}){
  const [pros,setPros]=useState<Pro[]>(()=>loadJson('servelink-pros',initialPros));
  const [bookings,setBookings]=useState<Booking[]>(()=>loadJson('servelink-bookings',[]));
  const [location,setLocation]=useState(()=>loadJson('servelink-location','Bhopal'));
  const [role,setRole]=useState<'Customer'|'Professional'>(()=>loadJson<'Customer'|'Professional'>('servelink-role','Customer'));
  useEffect(()=>saveJson('servelink-pros',pros),[pros]);
  useEffect(()=>saveJson('servelink-bookings',bookings),[bookings]);
  useEffect(()=>saveJson('servelink-location',location),[location]);
  useEffect(()=>saveJson('servelink-role',role),[role]);
  const value=useMemo(()=>({pros,setPros,bookings,setBookings,location,setLocation,role,setRole}),[pros,bookings,location,role]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useStore(){const ctx=useContext(Context);if(!ctx)throw new Error('StoreProvider missing');return ctx;}
