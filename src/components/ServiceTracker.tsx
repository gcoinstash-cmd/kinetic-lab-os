import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingRecord, TicketStatus } from '../types';
import { 
  Search, Shield, Activity, Play, User, Calendar, AlertCircle, Zap, CheckCircle2, ChevronRight, RotateCcw
} from 'lucide-react';

interface ServiceTrackerProps {
  bookings: BookingRecord[];
  onUpdateStatus: (ticketId: string, newStatus: TicketStatus) => void;
}

const STATUS_PIPELINE: { key: TicketStatus; label: string; desc: string }[] = [
  { key: 'inspection', label: 'Limb Asymmetry Scan', desc: '1000Hz dual force plate baseline and RFD check.' },
  { key: 'parts_ordered', label: 'Markerless Kinematics', desc: '8-camera 240fps multi-view video tracking.' },
  { key: 'in_progress', label: 'Laser Split Gate Run', desc: 'Active Optojump 10yd/40yd timing trap sprints.' },
  { key: 'quality_check', label: 'Report Certification', desc: 'Biomechanist review & asymmetry index verification.' },
  { key: 'ready', label: 'Dossier Released', desc: 'Full digital telemetry dossier transmitted to athlete & coach.' }
];

export default function ServiceTracker({ bookings, onUpdateStatus }: ServiceTrackerProps) {
  const [searchId, setSearchId] = useState('');
  const [activeTicket, setActiveTicket] = useState<BookingRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    
    if (searchId.trim() === '') {
      setErrorMsg('Please input an assessment ticket code.');
      return;
    }

    const match = bookings.find(b => b.ticketId.toUpperCase() === searchId.trim().toUpperCase());
    if (match) {
      setActiveTicket(match);
    } else {
      setActiveTicket(null);
      setErrorMsg('Ticket ID not located. Try KNT-9502, KNT-4108, or KNT-7721.');
    }
  };

  useEffect(() => {
    if (activeTicket) {
      const updated = bookings.find(b => b.ticketId === activeTicket.ticketId);
      if (updated) {
        setActiveTicket(updated);
      }
    }
  }, [bookings, activeTicket]);

  const handleAdvanceStatus = () => {
    if (!activeTicket) return;
    const currentIndex = STATUS_PIPELINE.findIndex(s => s.key === activeTicket.status);
    if (currentIndex < STATUS_PIPELINE.length - 1) {
      setIsSimulating(true);
      const nextStatus = STATUS_PIPELINE[currentIndex + 1].key;
      setTimeout(() => {
        onUpdateStatus(activeTicket.ticketId, nextStatus);
        setIsSimulating(false);
      }, 500);
    }
  };

  const handleRegressionStatus = () => {
    if (!activeTicket) return;
    const currentIndex = STATUS_PIPELINE.findIndex(s => s.key === activeTicket.status);
    if (currentIndex > 0) {
      setIsSimulating(true);
      const prevStatus = STATUS_PIPELINE[currentIndex - 1].key;
      setTimeout(() => {
        onUpdateStatus(activeTicket.ticketId, prevStatus);
        setIsSimulating(false);
      }, 500);
    }
  };

  const getStatusNumber = (status: TicketStatus) => {
    const idx = STATUS_PIPELINE.findIndex(s => s.key === status);
    return idx !== -1 ? idx : 0;
  };

  const currentStep = activeTicket ? getStatusNumber(activeTicket.status) : 0;
  const progressPercentage = activeTicket ? ((currentStep) / (STATUS_PIPELINE.length - 1)) * 100 : 0;

  const getSpecialistDetails = (serviceId: string) => {
    switch (serviceId) {
      case 'markerless-3d':
        return { name: "Dr. Aris Thorne", role: "Director of 3D Kinematics", lane: "Sprint Chamber Alpha (8-Cam Array)" };
      case 'force-plate':
        return { name: "Elena Rostova", role: "Force Plate Specialist", lane: "Force Sensor Runway (Dual 1000Hz Decks)" };
      case 'combine-prep':
        return { name: "Coach Vince Tyler", role: "Combine Acceleration Coach", lane: "Optojump Laser Lane #2" };
      default:
        return { name: "Sarah Alvarez, CSCS", role: "Senior Sports Scientist", lane: "Testing Lane #1" };
    }
  };

  const specialist = activeTicket ? getSpecialistDetails(activeTicket.serviceId) : null;

  return (
    <section id="tracker" className="relative py-20 bg-[#0A0A0B] border-t border-neutral-900 scroll-mt-20">
      <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.06),transparent_65%)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-red-500 bg-red-600/10 px-3 py-1 rounded-full uppercase">
            <span>[ REALTIME SPRINT METRICS ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Kinetic Lab Live Assessment Tracker
          </h2>
          <p className="text-zinc-400 font-sans text-sm font-light">
            Monitor real-time sensor calibration, laser timing trap verification, and biomechanical report certifications. Key in an assessment ticket ID to sync with testing stations.
          </p>
        </div>

        {/* Input Terminal Area */}
        <div className="max-w-xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-zinc-600" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="INPUT TICKET CODE (e.g. KNT-9502, KNT-4108)"
                className="w-full bg-[#101115] border border-neutral-900 rounded-lg pl-11 pr-4 py-3.5 text-sm uppercase text-white font-mono tracking-wider focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-zinc-600 transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white font-display font-bold text-base font-semibold min-h-[44px] uppercase tracking-wider px-6 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-red-600/20"
            >
              <span>Sync</span>
            </button>
          </form>

          {errorMsg && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs text-red-400 font-mono text-center flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </motion.p>
          )}

          <div className="mt-4 flex justify-center gap-4 text-xs font-semibold tracking-wider font-mono text-zinc-300">
            <span>PRELOADED LAB CODES:</span>
            <button onClick={() => { setSearchId('KNT-9502'); setTimeout(() => handleSearch(), 50); }} className="text-red-400 border-b border-dashed border-red-500/40 hover:text-white transition-colors cursor-pointer">KNT-9502 (In Progress)</button>
            <button onClick={() => { setSearchId('KNT-4108'); setTimeout(() => handleSearch(), 50); }} className="text-red-400 border-b border-dashed border-red-500/40 hover:text-white transition-colors cursor-pointer">KNT-4108 (Baseline)</button>
            <button onClick={() => { setSearchId('KNT-7721'); setTimeout(() => handleSearch(), 50); }} className="text-red-400 border-b border-dashed border-red-500/40 hover:text-white transition-colors cursor-pointer">KNT-7721 (Certified)</button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTicket ? (
            <motion.div
              key={activeTicket.ticketId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Tracking Progression pipeline (8 cols) */}
              <div className="lg:col-span-8 bg-[#101115] rounded-2xl border border-neutral-900 p-6 sm:p-8 space-y-8 flex flex-col justify-between">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold tracking-wider font-mono text-zinc-300 uppercase tracking-widest">[ ATHLETE TELEMETRY LOG ]</span>
                    <h3 className="font-display text-xl font-bold uppercase text-white">
                      {activeTicket.vehicleMake} // {activeTicket.vehicleModel}
                    </h3>
                    <p className="text-base text-zinc-200 leading-relaxed font-mono flex items-center gap-1.5 uppercase">
                      <span>Ticket: {activeTicket.ticketId}</span>
                      <span className="text-zinc-600">•</span>
                      <span>Athlete: {activeTicket.customerName}</span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs font-semibold tracking-wider font-mono text-zinc-300 uppercase tracking-widest block">CURRENT PHASE</span>
                    <span className="inline-flex rounded-full bg-red-600/15 border border-red-500/30 px-3 py-1 text-xs font-mono font-bold tracking-wide text-red-400 uppercase mt-1">
                      {STATUS_PIPELINE[currentStep].label}
                    </span>
                  </div>
                </div>

                {/* Progress Bar & Nodes */}
                <div className="space-y-12 py-6 relative">
                  <div className="absolute top-[88px] sm:top-8 left-6 right-6 h-1.5 bg-neutral-900 rounded-full overflow-hidden hidden sm:block">
                    <div 
                      className="bg-red-600 h-full rounded-full transition-all duration-700 ease-out shadow-lg shadow-red-600/40"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                    {STATUS_PIPELINE.map((stage, idx) => {
                      const isCompleted = idx < currentStep;
                      const isActive = idx === currentStep;
                      
                      return (
                        <div key={stage.key} className="flex sm:flex-col items-center text-left sm:text-center space-x-4 sm:space-x-0 space-y-0 sm:space-y-3 relative">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-red-600 text-white font-semibold' 
                              : isActive 
                              ? 'bg-[#101115] border-2 border-red-500 text-red-400 ring-4 ring-red-500/10 scale-110' 
                              : 'bg-neutral-900 border border-neutral-800 text-zinc-600'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="h-4 w-4 stroke-[3px]" /> : idx + 1}
                          </div>

                          <div className="space-y-0.5 max-w-[120px] sm:max-w-none">
                            <span className={`block font-display text-xs font-semibold font-bold uppercase tracking-wider ${
                              isActive ? 'text-red-400' : isCompleted ? 'text-zinc-200' : 'text-zinc-300'
                            }`}>
                              {stage.label}
                            </span>
                            <span className="block text-[9px] font-sans text-zinc-300 leading-normal hidden md:block">
                              {stage.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Simulation Control Row */}
                <div className="pt-6 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs font-semibold font-mono text-zinc-300">
                    <span>STATUS CONTROL (DEMO SIMULATOR):</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleRegressionStatus}
                      disabled={currentStep === 0 || isSimulating}
                      className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-zinc-400 text-base font-semibold min-h-[44px] font-mono uppercase disabled:opacity-40 cursor-pointer"
                    >
                      &lt; Prior Stage
                    </button>
                    <button
                      onClick={handleAdvanceStatus}
                      disabled={currentStep === STATUS_PIPELINE.length - 1 || isSimulating}
                      className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white text-base font-semibold min-h-[44px] font-mono font-bold uppercase disabled:opacity-40 cursor-pointer shadow-md shadow-red-600/20"
                    >
                      Next Stage &gt;
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Lab Station & Biomechanist Details (4 cols) */}
              <div className="lg:col-span-4 bg-[#101115] rounded-2xl border border-neutral-900 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-xs font-semibold tracking-wider font-mono text-zinc-300 uppercase tracking-widest">[ LAB SPECIFICATIONS ]</span>
                  
                  {specialist && (
                    <div className="space-y-4 pt-2">
                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2">
                        <div className="flex items-center space-x-2 text-red-500">
                          <Activity className="h-4 w-4" />
                          <span className="font-mono text-xs uppercase font-bold">Assigned Specialist</span>
                        </div>
                        <div className="font-display font-bold text-white text-sm">{specialist.name}</div>
                        <div className="text-xs font-semibold font-mono text-zinc-400">{specialist.role}</div>
                      </div>

                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2">
                        <div className="flex items-center space-x-2 text-zinc-400">
                          <Zap className="h-4 w-4 text-red-500" />
                          <span className="font-mono text-xs uppercase font-bold">Testing Chamber</span>
                        </div>
                        <div className="text-xs font-mono text-zinc-300">{specialist.lane}</div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 pt-2 text-xs font-mono text-zinc-400">
                    <div className="flex justify-between py-1 border-b border-neutral-900">
                      <span className="text-zinc-300">Scheduled Date:</span>
                      <span className="text-white">{activeTicket.selectedDate}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-900">
                      <span className="text-zinc-300">Time Slot:</span>
                      <span className="text-white">{activeTicket.selectedTime}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-zinc-300">Assessment Fee:</span>
                      <span className="text-emerald-400 font-bold">${activeTicket.priceEstimate}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-red-600/10 border border-red-500/20 text-xs font-semibold font-mono text-red-400 leading-relaxed">
                  ✓ Certified 1000Hz sensor calibration active. Telemetry data encrypted and routed to player profile vault.
                </div>
              </div>

            </motion.div>
          ) : null}
        </AnimatePresence>

      </div>
    </section>
  );
}
