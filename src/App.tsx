import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRESEEDED_BOOKINGS, SERVICES, PACKAGES } from './data';
import { BookingRecord, TicketStatus } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import BookingDashboard from './components/BookingDashboard';
import ServiceTracker from './components/ServiceTracker';
import PricingMatrix from './components/PricingMatrix';
import ProofSection from './components/ProofSection';
import LeadCapture from './components/LeadCapture';
import AdminDashboard from './components/AdminDashboard';
import { 
  Zap, MapPin, Phone, Mail, ShieldCheck, Heart, ExternalLink 
} from 'lucide-react';

export default function App() {
  const [bookings, setBookings] = useState<BookingRecord[]>(PRESEEDED_BOOKINGS);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  // Admin Control Room State (1-Click Cheat Code Bypass)
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminPassModalOpen, setIsAdminPassModalOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // URL /admin bypass check on boot
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('admin') || hash.includes('admin') || search.includes('admin')) {
      setIsAdminMode(true);
      setTimeout(() => triggerToast('⚡ Biomechanist Bypass: Command Room Unlocked'), 300);
    }
  }, []);

  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassInput.trim() === 'kinetic2026') {
      setIsAdminMode(true);
      setIsAdminPassModalOpen(false);
      setAdminPassInput('');
      triggerToast('⚡ Biomechanist Command Access Granted (Cheat Code Verified)');
    } else {
      triggerToast('❌ Invalid Passkey. Use demo passcode: kinetic2026');
    }
  };

  const handleUpdateStatus = (ticketId: string, newStatus: TicketStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.ticketId === ticketId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const handleAddBooking = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleSelectServiceFromHome = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleNavigate('booking');
  };

  const handleSelectPackageService = (serviceId: string, _price: number) => {
    setSelectedServiceId(serviceId);
    handleNavigate('booking');
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // If in Admin Mode, show full Biomechanics Command OS
  if (isAdminMode) {
    return (
      <AdminDashboard onExit={() => {
        setIsAdminMode(false);
        triggerToast('Exited Admin Command Room');
      }} />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 selection:bg-red-600 selection:text-white font-sans relative">
      
      {/* Primary Header Section */}
      <Navbar 
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenAdminPass={() => setIsAdminPassModalOpen(true)}
      />

      {/* Main Single Page Sections Container */}
      <main className="relative">
        <Hero 
          onNavigate={handleNavigate}
          baysAvailable={3}
        />
        
        <ServicesGrid 
          onSelectService={handleSelectServiceFromHome}
          services={SERVICES}
        />
        
        <BookingDashboard 
          onAddBooking={handleAddBooking}
          selectedServiceId={selectedServiceId}
          clearSelectedService={() => setSelectedServiceId(null)}
          onNavigate={handleNavigate}
          services={SERVICES}
        />
        
        <ServiceTracker 
          bookings={bookings}
          onUpdateStatus={handleUpdateStatus}
        />
        
        <PricingMatrix 
          onSelectPackageService={handleSelectPackageService}
          packages={PACKAGES}
        />
        
        <ProofSection />
        
        <LeadCapture />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-[#080809] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Identity Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2 font-display text-xl font-bold">
                <div className="h-8 w-8 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500">
                  <Zap className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="text-white font-extrabold tracking-tight">KINETIC</span>
                  <span className="text-red-500 font-light mx-1">//</span>
                  <span className="text-zinc-300 font-medium">LAB</span>
                </div>
              </div>
              
              <p className="font-sans text-base text-zinc-200 leading-relaxed font-light max-w-sm leading-relaxed">
                Olympic-grade sprint testing, 1000Hz dual force plate asymmetry diagnostics, markerless 3D kinematics, and NFL combine acceleration analysis.
              </p>
              
              <div className="space-y-2 pt-2 text-xs font-semibold font-mono text-zinc-300">
                <p className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-500 shrink-0" />
                  <span>4108 Velocity Boulevard, Manhattan Beach, CA 90266</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-red-500 shrink-0" />
                  <span>(310) 555-SPEED</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-red-500 shrink-0" />
                  <span>telemetry@kineticlab-os.com</span>
                </p>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="font-display text-xs font-bold uppercase tracking-wider text-white">Lab Navigation</h5>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold font-mono font-medium">
                <button onClick={() => handleNavigate('services')} className="text-zinc-300 hover:text-red-400 text-left uppercase transition-colors cursor-pointer">Protocols</button>
                <button onClick={() => handleNavigate('booking')} className="text-zinc-300 hover:text-red-400 text-left uppercase transition-colors cursor-pointer">Scheduler</button>
                <button onClick={() => handleNavigate('tracker')} className="text-zinc-300 hover:text-red-400 text-left uppercase transition-colors cursor-pointer">Telemetry</button>
                <button onClick={() => handleNavigate('pricing')} className="text-zinc-300 hover:text-red-400 text-left uppercase transition-colors cursor-pointer">Packages</button>
                <button onClick={() => handleNavigate('reviews')} className="text-zinc-300 hover:text-red-400 text-left uppercase transition-colors cursor-pointer">Proof</button>
                <button onClick={() => setIsAdminPassModalOpen(true)} className="text-red-400 font-bold text-left uppercase transition-colors cursor-pointer">Admin Gate</button>
              </div>
            </div>

            {/* Operations telemetry */}
            <div className="md:col-span-4 space-y-4">
              <h5 className="font-display text-xs font-bold uppercase tracking-wider text-white">Testing Operations</h5>
              <div className="space-y-3 font-mono text-xs font-semibold text-zinc-300 leading-normal">
                <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                  <span>MONDAY - FRIDAY</span>
                  <span className="text-zinc-300">07:00 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                  <span>SATURDAY (COMBINE RUNS)</span>
                  <span className="text-zinc-300">08:00 AM - 03:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>SUNDAY SPRINT CAMPS</span>
                  <span className="text-red-400 font-bold uppercase">PRIVATE TEAMS ONLY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom attribution copyright row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold tracking-wider font-mono text-zinc-600 border-t border-neutral-900 pt-6">
            <div className="flex items-center space-x-1.5">
              <span>© {new Date().getFullYear()} KINETIC LAB OS. All biometric rights reserved.</span>
              <span className="hidden sm:inline">|</span>
              <span className="text-red-500 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>1000Hz Force Sensor Certified</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 select-none text-xs font-semibold tracking-wider">
              <span>Assembled for</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              <span>Aura &amp; Grid Ghost Factory™</span>
              <ExternalLink className="h-3 w-3 text-zinc-300" />
            </div>
          </div>
        </div>
      </footer>

      {/* 1-CLICK PASSKEY MODAL FOR BUYER PREVIEW */}
      <AnimatePresence>
        {isAdminPassModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#101115] border border-neutral-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative"
            >
              <div className="space-y-2 text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-2">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-display font-extrabold uppercase text-lg text-white tracking-wide">
                  Lab Director Command Room
                </h3>
                <p className="text-base text-zinc-200 leading-relaxed font-sans font-light">
                  Inspect the live athlete roster, 1000Hz force sensor feeds, and milestone billing.
                </p>
              </div>

              {/* Cheat Code Banner */}
              <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <span className="block text-xs font-semibold tracking-wider font-mono uppercase tracking-wider text-red-400 font-bold">
                    1-CLICK CHEAT CODE (BUYER PREVIEW)
                  </span>
                  <span className="text-xs font-mono font-bold text-white tracking-wider">
                    kinetic2026
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAdminPassInput('kinetic2026');
                    triggerToast('⚡ Passcode Auto-Filled: kinetic2026');
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold rounded shadow transition active:scale-95 cursor-pointer"
                >
                  AUTO-FILL
                </button>
              </div>

              <form onSubmit={handleAdminUnlock} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Director Passkey
                  </label>
                  <input
                    type="password"
                    value={adminPassInput}
                    onChange={(e) => setAdminPassInput(e.target.value)}
                    placeholder="Enter passkey..."
                    autoFocus
                    className="w-full bg-[#0E0E10] border border-neutral-800 focus:border-red-500 text-white px-4 py-2.5 rounded-lg text-sm font-mono outline-none transition-colors"
                  />
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAdminPassModalOpen(false)}
                    className="flex-1 py-2.5 border border-neutral-800 hover:border-neutral-700 text-zinc-400 text-xs uppercase tracking-wider font-mono rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-base font-semibold min-h-[44px] uppercase tracking-wider font-mono rounded-lg transition shadow cursor-pointer active:scale-95"
                  >
                    Enter Command Desk
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST SYSTEM */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#141416] text-white border border-red-500/40 px-5 py-3.5 rounded-xl shadow-2xl flex items-center space-x-3 font-mono text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
