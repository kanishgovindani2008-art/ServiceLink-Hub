export type Category = 'Electricians' | 'Plumbers' | 'Painters' | 'Carpenters' | 'Mechanics' | 'AC Repair' | 'TV Repair' | 'Refrigerator Repair' | 'Washing Machine Repair';
export type PortfolioItem = { id: string; title: string; service: string; description: string; date: string; image: string };
export type Pro = {
  id: string; name: string; category: Category; photo: string; rating: number; reviews: number; neighborhood: string;
  distance: number; jobs: number; years: number; price: number; available: boolean; specializations: string[];
  brands?: string[]; vehicleTypes?: string[]; technologies?: string[]; models?: string[]; phone?: string; portfolio: PortfolioItem[];
};
export type Booking = {
  id: string; professionalId: string; category: Category; problem: string; photo?: string; address: string;
   date: string; slot: string; price: number; status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'; review?: number; reviewComment?: string;
};
export const categories: Category[] = ['Electricians','Plumbers','Painters','Carpenters','Mechanics','AC Repair','TV Repair','Refrigerator Repair','Washing Machine Repair'];
export const areas = ['Bhopal','Arera Colony','MP Nagar','New Market','Kolar Road','Shahpura','Bawadia Kalan','Bairagarh','Hoshangabad Road'];
export const brandOptions: Partial<Record<Category, string[]>> = {
  'AC Repair':['Voltas','Daikin','LG','Samsung','Blue Star','Hitachi','Panasonic'],
  'TV Repair':['Samsung','LG','Sony','Xiaomi','TCL'],
  'Refrigerator Repair':['LG','Samsung','Whirlpool','Haier','Godrej','Panasonic'],
  'Washing Machine Repair':['LG','Samsung','Whirlpool','IFB','Bosch','Haier'],
};
const sampleImages = [
  'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=760',
  'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=760',
  'https://images.pexels.com/photos/8486944/pexels-photo-8486944.jpeg?auto=compress&cs=tinysrgb&w=760',
];
const proPhotos = [
  'https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=320',
  'https://images.pexels.com/photos/5691624/pexels-photo-5691624.jpeg?auto=compress&cs=tinysrgb&w=320',
  'https://images.pexels.com/photos/8486932/pexels-photo-8486932.jpeg?auto=compress&cs=tinysrgb&w=320',
  'https://images.pexels.com/photos/5974054/pexels-photo-5974054.jpeg?auto=compress&cs=tinysrgb&w=320',
  'https://images.pexels.com/photos/8293651/pexels-photo-8293651.jpeg?auto=compress&cs=tinysrgb&w=320',
  'https://images.pexels.com/photos/5691631/pexels-photo-5691631.jpeg?auto=compress&cs=tinysrgb&w=320',
];
const seed: Array<[string,Category,string,number,number,number,number,string[]]> = [
  ['Ravi Soni','Electricians','Arera Colony',4.8,126,7,450,['Wiring repair','Socket & switch','Home safety']],
  ['Nadeem Khan','Plumbers','MP Nagar',4.7,94,9,350,['Leak repair','Bathroom fittings','Pipe work']],
  ['Anita Verma','Painters','Shahpura',4.9,73,8,650,['Interior painting','Wall finish','Texture work']],
  ['Vikram Patel','Carpenters','New Market',4.6,88,11,500,['Furniture repair','Door fitting','Custom shelves']],
  ['Imran Qureshi','Mechanics','Kolar Road',4.8,152,10,600,['Car diagnostics','EV Specialist','Bike & Scooter Expert']],
  ['Sandeep Yadav','AC Repair','Bawadia Kalan',4.9,117,8,550,['AC cooling issues','Split AC service','Seasonal tune-up']],
  ['Meera Joshi','TV Repair','Arera Colony',4.7,62,6,500,['LED panel repair','Smart TV setup','Board repair']],
  ['Deepak Tiwari','Refrigerator Repair','MP Nagar',4.8,83,9,450,['Cooling issues','Compressor check','Single & double door']],
  ['Aakash Jain','Washing Machine Repair','Hoshangabad Road',4.6,69,5,400,['Noise & spin issues','Front-load service','Drainage repair']],
  ['Farhan Ali','Electricians','Kolar Road',4.5,58,5,350,['Switchboard repair','Fan installation']],
  ['Pooja Mishra','AC Repair','New Market',4.7,91,6,500,['AC cooling issues','Inverter AC','Gas inspection']],
  ['Rohit Chouhan','Mechanics','MP Nagar',4.6,105,7,450,['Bike & Scooter Expert','Petrol and Diesel Vehicles','Routine service']],
];
export const initialPros: Pro[] = seed.map(([name,category,neighborhood,rating,reviews,years,price,specializations],i)=>({
  id:`pro-${i+1}`,name,category,neighborhood,rating,reviews,years,price,specializations,photo:proPhotos[i%proPhotos.length],
  distance:[1.2,2.8,3.4,1.9,4.1,2.2,1.6,3.3,2.5,5.1,3.7,1.4][i],jobs:[218,164,132,190,306,242,97,176,123,84,154,211][i],
  available:i%4!==2,portfolio:[0,1].map((n)=>({id:`${i+1}-${n}`,title:['A thoughtful repair, finished cleanly','A recent neighborhood service'][n],service:category,description:'Sample portfolio entry for this demo profile. Images are illustrative and are not proof of a real-world job.',date:`${['May','Apr'][n]} 2025`,image:sampleImages[(i+n)%sampleImages.length]})),
  ...(brandOptions[category]?{brands:brandOptions[category]!.slice(i%3,i%3+3)}:{}),
   ...(category==='Mechanics'?{vehicleTypes:i%2?['Bike','Scooter']:['Car','Bike'],technologies:i%2?['Petrol','CNG']:['EV','Petrol','Hybrid'],models:i%2?['Honda','TVS','Bajaj','Activa','Jupiter','Splendor']:['Maruti Suzuki','Hyundai','Tata','Hatchback','Sedan','SUV']}:{})
}));
export function matchCategory(text:string): Category | undefined {
  const s=text.toLowerCase();
  if(/ac|air condition|cooling|not cool/.test(s)) return 'AC Repair';
  if(/washing machine|washer|spin|laundry/.test(s)) return 'Washing Machine Repair';
  if(/socket|outlet|wire|electric|switch|power/.test(s)) return 'Electricians';
  if(/leak|tap|pipe|drain|toilet|water/.test(s)) return 'Plumbers';
  if(/paint|wall colour|wall color/.test(s)) return 'Painters';
  if(/wood|furniture|door|carpenter/.test(s)) return 'Carpenters';
  if(/car|bike|scooter|vehicle|engine|mechanic/.test(s)) return 'Mechanics';
  if(/tv|television|screen/.test(s)) return 'TV Repair';
  if(/fridge|refrigerator|freezer/.test(s)) return 'Refrigerator Repair';
  return undefined;
}
export function photoFromFile(file:File):Promise<string>{
  return new Promise((resolve,reject)=>{
    if(!file.type.startsWith('image/')) return reject(new Error('Choose an image file (JPG, PNG or WebP).'));
    if(file.size>5*1024*1024) return reject(new Error('Image must be smaller than 5 MB.'));
    const r=new FileReader();
    r.onload=()=>{const image=new Image();image.onload=()=>{const scale=Math.min(1,1280/Math.max(image.naturalWidth,image.naturalHeight));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));const context=canvas.getContext('2d');if(!context)return reject(new Error('Could not prepare this image.'));context.drawImage(image,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL('image/jpeg',.74));};image.onerror=()=>reject(new Error('This image could not be opened.'));image.src=String(r.result);};
    r.onerror=()=>reject(new Error('Could not read image.'));
    r.readAsDataURL(file);
  });
}
export const loadJson=<T,>(key:string,fallback:T):T=>{try{const v=localStorage.getItem(key);return v?JSON.parse(v) as T:fallback;}catch{return fallback;}};
export const saveJson=(key:string,value:unknown)=>localStorage.setItem(key,JSON.stringify(value));
