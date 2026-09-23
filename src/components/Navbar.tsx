import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Zap, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAdminPass: () => void;
}

export default function Navbar({ onNavigate, activeSection, onOpenAdminPass }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'services', label: 'Protocols' },
    { id: 'booking', label: 'Lab Booking' },
    { id: 'tracker', label: 'Live Telemetry' },
    { id: 'pricing', label: 'Lab Packages' },
    { id: 'reviews', label: 'Velocity Proof' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-[#0A0A0B]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Identity */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex cursor-pointer items-center space-x-2.5 font-display text-xl sm:text-2xl font-bold tracking-wider"
          id="nav-logo"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/10 border border-red-500/30 text-red-500">
            <Zap className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
          <div className="flex items-center space-x-1.5 font-display">
            <span className="text-white uppercase font-extrabold tracking-tight">KINETIC</span>
            <span className="text-red-500 font-light">//</span>
            <span className="text-zinc-500 font-medium uppercase">LAB</span>
          </div>
        </div>

        {/* Center: Live Station Telemetry Status */}
        <div className="hidden lg:flex items-center space-x-3 rounded-full border border-neutral-800/80 bg-neutral-950/60 px-4 py-1.5 text-xs font-mono">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-500">FORCE SENSORS:</span>
          <span className="text-emerald-400 font-semibold tracking-wide uppercase">1000HZ DUAL PLATES ONLINE</span>
        </div>

        {/* Right: Desktop Nav Links + Admin Pass */}
        <nav className="hidden md:flex items-center space-x-6 font-mono text-xs uppercase tracking-wider">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors duration-200 hover:text-red-400 relative py-2 cursor-pointer ${
                activeSection === item.id ? 'text-red-500 font-semibold' : 'text-zinc-400'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span 
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-red-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
          
          <button
            onClick={onOpenAdminPass}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-600/10 hover:bg-red-600/20 text-red-400 font-mono text-xs font-bold transition-all cursor-pointer"
          >
            <span>⚡ ADMIN PASS</span>
          </button>

          <button
            onClick={() => handleNavClick('booking')}
            className="relative overflow-hidden rounded-md bg-red-600 hover:bg-red-500 px-5 py-2.5 text-center font-display text-xs font-bold uppercase tracking-wider text-white transition-all shadow-lg shadow-red-600/20 cursor-pointer"
            id="nav-cta"
          >
            Schedule Assessment
          </button>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={onOpenAdminPass}
            className="px-2.5 py-1 rounded bg-red-600/10 border border-red-500/30 text-red-400 font-mono text-[10px] font-bold"
          >
            ⚡ ADMIN
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-zinc-300 hover:text-white transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-neutral-900 bg-[#0C0D12] px-4 py-6 text-center"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-2 text-base font-display font-medium uppercase tracking-wider border-b border-zinc-900/40 pb-2 ${
                    activeSection === item.id ? 'text-red-500' : 'text-zinc-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdminPass();
                  }}
                  className="w-full rounded-md border border-red-500/40 bg-red-600/10 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-red-400"
                >
                  ⚡ Access Admin Command Room
                </button>
                <button
                  onClick={() => handleNavClick('booking')}
                  className="w-full rounded-md bg-red-600 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-red-600/20"
                >
                  Schedule Assessment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
