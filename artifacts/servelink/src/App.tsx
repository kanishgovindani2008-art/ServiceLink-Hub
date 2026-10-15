import { useState, type ReactNode } from 'react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { StoreProvider, useStore } from './lib/Store';
import { BookingDialog, type BookingDraft, PortfolioGallery, Shell } from './components/MarketUI';
import { AssistantPage, BookingsPage, HomePage, PortfolioPage, ProfessionalPage, ProfilePage, SearchPage } from './pages/Pages';

function RoutedErrorBoundary({children}:{children:ReactNode}){const [location]=useLocation();return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>}
function AppRoutes(){
 const {setBookings}=useStore();const [draft,setDraft]=useState<BookingDraft|null>(null);const [portfolio,setPortfolio]=useState<BookingDraft['professional']|null>(null);
 const openBooking=(next:BookingDraft)=>setDraft(next);
 const submitBooking=(booking:Omit<import('./lib/market').Booking,'id'|'status'>)=>{setBookings(old=>[{...booking,id:`sv-${Date.now().toString(36)}`,status:'Pending'},...old])};
 return <><Switch>
  <Route path="/" component={()=> <HomePage onBook={openBooking} onPortfolio={setPortfolio}/>}/>
  <Route path="/search" component={()=> <SearchPage onBook={openBooking} onPortfolio={setPortfolio}/>}/>
  <Route path="/assistant" component={()=> <AssistantPage onBook={openBooking} onPortfolio={setPortfolio}/>}/>
  <Route path="/bookings" component={()=> <BookingsPage onBook={openBooking} onPortfolio={setPortfolio}/>}/>
  <Route path="/profile" component={ProfilePage}/>
  <Route path="/professional" component={()=> <ProfessionalPage onBook={openBooking} onPortfolio={setPortfolio}/>}/>
  <Route path="/portfolio/:id" component={()=> <PortfolioPage onBook={openBooking}/>}/>
  <Route component={NotFound}/>
 </Switch><BookingDialog key={draft?.professional.id??'closed'} draft={draft} onClose={()=>setDraft(null)} onSubmit={submitBooking}/><PortfolioGallery pro={portfolio} onClose={()=>setPortfolio(null)}/></>;
}
function App(){
 return <StoreProvider><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,'')}><RoutedErrorBoundary><AppShell/></RoutedErrorBoundary></WouterRouter><Toaster/></TooltipProvider></StoreProvider>;
}
function AppShell(){
 const [location]=useLocation();
 return <Shell><div key={location} className="page-enter"><AppRoutes/></div></Shell>;
}
export default App;
