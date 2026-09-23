import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { AthleteDiscipline, AssessmentProtocol, BookingRecord } from '../types';
import { 
  Zap, Calendar, Clock, Check, 
  ChevronRight, ChevronLeft, ShieldCheck, 
  Sparkles, DollarSign, Activity, Settings, Copy
} from 'lucide-react';

interface BookingDashboardProps {
  onAddBooking: (newBooking: BookingRecord) => void;
  selectedServiceId: string | null;
  clearSelectedService: () => void;
  onNavigate: (sectionId: string) => void;
  services?: AssessmentProtocol[];
}

const DISCIPLINES: { id: AthleteDiscipline; label: string; desc: string }[] = [
  { id: 'sprint', label: 'Sprint & Track (100m/200m)', desc: 'Blocks, acceleration vectoring, top-end velocity (MPH)' },
  { id: 'football', label: 'NFL Combine Prep', desc: '10yd & 40yd laser split gates, 3-point start mechanics' },
  { id: 'soccer', label: 'Premier League Match Speed', desc: 'Markerless kinematics, deceleration & change of direction' },
  { id: 'olympic', label: 'Decathlon & Olympic Multi-Event', desc: '1000Hz force plate asymmetry, RSI tendon stiffness' }
];

const PRELOAD_PROGRAMS: Record<AthleteDiscipline, { program: string; focus: string }[]> = {
  sprint: [
    { program: 'Team USA Sprint Squad', focus: '100m Dash Specialist' },
    { program: 'Collegiate Division 1 Track', focus: '60m Indoor Split Focus' },
    { program: 'Diamond League Pro Track', focus: '200m Speed Endurance' }
  ],
  football: [
    { program: 'Ohio State Football', focus: 'Wide Receiver (Sub-4.40s Combine)' },
    { program: 'Alabama Crimson Tide', focus: 'Cornerback (Hip Turn & Acceleration)' },
    { program: 'NFL Draft Showcase Camp', focus: 'Running Back (10yd Burst)' }
  ],
  soccer: [
    { program: 'Arsenal FC Academy', focus: 'Winger (Maximum Sprint Velocity)' },
    { program: 'Real Madrid Castilla', focus: 'Fullback (Repeated Sprint Ability)' },
    { program: 'US Men’s National Team', focus: 'Striker (Box Attack Acceleration)' }
  ],
  olympic: [
    { program: 'Federal Athletics Federation', focus: 'Decathlon Sprint Transition' },
    { program: 'Olympic Bobsled & Skeleton', focus: 'Push Athlete Block Explosiveness' },
    { program: 'Long Jump Runway Program', focus: 'Penultimate Stride Velocity' }
  ]
};

const TIME_SLOTS = [
  '08:30 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'
];

export default function BookingDashboard({ onAddBooking, selectedServiceId, clearSelectedService, onNavigate, services }: BookingDashboardProps) {
  const [step, setStep] = useState(1);
  const [discipline, setDiscipline] = useState<AthleteDiscipline>('sprint');
  const [program, setProgram] = useState('');
  const [eventFocus, setEventFocus] = useState('');
  
  const [selectedService, setSelectedService] = useState<AssessmentProtocol>((services || SERVICES)[0]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [athleteName, setAthleteName] = useState('');
  const [athleteEmail, setAthleteEmail] = useState('');
  const [athletePhone, setAthletePhone] = useState('');
  const [athleteNotes, setAthleteNotes] = useState('');

  const [generatedTicket, setGeneratedTicket] = useState<BookingRecord | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const activeList = services || SERVICES;
    const match = activeList.find(s => s.id === selectedService?.id);
    if (match) setSelectedService(match);
  }, [services]);

  useEffect(() => {
    if (selectedServiceId) {
      const activeList = services || SERVICES;
      const found = activeList.find(s => s.id === selectedServiceId);
      if (found) {
        setSelectedService(found);
        setStep(2);
      }
    }
  }, [selectedServiceId, services]);

  const isStepValid = () => {
    switch (step) {
      case 1:
        return discipline !== null && program.trim() !== '' && eventFocus.trim() !== '';
      case 2:
        return selectedService !== null;
      case 3:
        return selectedDate !== '' && selectedTime !== '';
      case 4:
        return athleteName.trim() !== '' && athleteEmail.trim() !== '' && athletePhone.trim() !== '';
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (isStepValid() && step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newTicketId = `KNT-${randomDigits}`;

    const newBooking: BookingRecord = {
      id: `booking-${Date.now()}`,
      ticketId: newTicketId,
      customerName: athleteName,
      email: athleteEmail,
      phone: athletePhone,
      vehicleType: discipline,
      vehicleMake: program,
      vehicleModel: eventFocus,
      serviceId: selectedService.id,
      selectedDate,
      selectedTime,
      notes: athleteNotes,
      priceEstimate: selectedService.estimatePrice,
      status: 'inspection'
    };

    onAddBooking(newBooking);
    setGeneratedTicket(newBooking);
    setStep(5);
    clearSelectedService();
  };

  const handleCopyTicketId = () => {
    if (!generatedTicket) return;
    navigator.clipboard.writeText(generatedTicket.ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetBooking = () => {
    setStep(1);
    setProgram('');
    setEventFocus('');
    setAthleteName('');
    setAthleteEmail('');
    setAthletePhone('');
    setAthleteNotes('');
    setGeneratedTicket(null);
  };

  return (
    <section id="booking" className="relative py-20 bg-[#0A0A0B] border-t border-neutral-900 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-red-500 bg-red-600/10 px-3 py-1 rounded-full uppercase">
            <span>[ ATHLETIC INTAKE PORTAL ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Schedule Biomechanical Assessment
          </h2>
          <p className="text-zinc-400 font-sans text-sm font-light">
            Designate athletic discipline, select testing protocols, book your laser timing window, and generate an active assessment ticket ID.
          </p>
        </div>

        {/* Wizard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 bg-[#101115] rounded-2xl border border-neutral-900 overflow-hidden shadow-2xl relative">
            {step < 5 && (
              <div className="border-b border-neutral-900 bg-neutral-950/80 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        step === num 
                          ? 'bg-red-600 text-white font-bold' 
                          : step > num 
                          ? 'bg-neutral-800 text-red-400 border border-red-500/30' 
                          : 'bg-neutral-900 text-zinc-600 border border-neutral-900'
                      }`}>
                        {step > num ? <Check className="h-4 w-4" /> : num}
                      </div>
                      {num < 4 && (
                        <div className={`w-8 h-[2px] ml-2 ${step > num ? 'bg-red-500/30' : 'bg-neutral-900'}`} />
                      )}
                    </div>
                  ))}
                </div>
                
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest hidden sm:inline">
                  Step {step} of 4: {
                    step === 1 ? 'Select Discipline' :
                    step === 2 ? 'Select Protocol' :
                    step === 3 ? 'Testing Window' :
                    'Coach Credentials'
                  }
                </span>
              </div>
            )}

            <form onSubmit={handleSubmitBooking} className="p-6 sm:p-8 space-y-6">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: ATHLETE DISCIPLINE */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                        Select Athletic Discipline
                      </h3>
                      <p className="text-xs text-zinc-400 font-light">
                        Calibrates sensor sample rates (1000Hz ground reaction forces or high-speed kinematic video).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {DISCIPLINES.map((d) => {
                        const isSelected = discipline === d.id;
                        return (
                          <div
                            key={d.id}
                            onClick={() => setDiscipline(d.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                              isSelected 
                                ? 'border-red-500 bg-red-600/10 text-white' 
                                : 'border-neutral-800 bg-neutral-900/40 text-zinc-400 hover:border-neutral-700 hover:text-zinc-200'
                            }`}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-red-600 text-white' : 'bg-neutral-900 text-zinc-400'}`}>
                                <Zap className="h-4 w-4" />
                              </div>
                              <span className="font-display font-bold text-sm uppercase tracking-wide">{d.label}</span>
                            </div>
                            <p className="text-[11px] font-sans text-zinc-400 leading-normal">{d.desc}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Program Selectors */}
                    <div className="p-4 border border-neutral-800 bg-neutral-900/40 rounded-xl space-y-3">
                      <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-red-500" />
                        Archetype Program Pre-sets
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {PRELOAD_PROGRAMS[discipline]?.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setProgram(item.program);
                              setEventFocus(item.focus);
                            }}
                            className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-950 text-left text-xs hover:border-red-500/40 transition cursor-pointer"
                          >
                            <span className="block text-[9px] text-zinc-500 font-mono uppercase">{item.program}</span>
                            <span className="block font-display text-[11px] text-zinc-200 uppercase font-semibold">{item.focus}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase text-zinc-500">
                          Program / Team *
                        </label>
                        <input
                          type="text"
                          required
                          value={program}
                          onChange={(e) => setProgram(e.target.value)}
                          placeholder="e.g. Team USA Track / Ohio State WR"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase text-zinc-500">
                          Event / Position *
                        </label>
                        <input
                          type="text"
                          required
                          value={eventFocus}
                          onChange={(e) => setEventFocus(e.target.value)}
                          placeholder="e.g. 100m Dash / Combine Slot WR"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: PROTOCOL */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                        Configure Testing Protocol
                      </h3>
                      <p className="text-xs text-zinc-400 font-light">
                        Select laboratory biomechanical protocols. All tests include instant digitized telemetry exports.
                      </p>
                    </div>

                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                      {(services || SERVICES).map((srv) => {
                        const isSelected = selectedService?.id === srv.id;
                        return (
                          <div
                            key={srv.id}
                            onClick={() => setSelectedService(srv)}
                            className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                              isSelected 
                                ? 'border-red-500 bg-red-600/10' 
                                : 'border-neutral-800 bg-neutral-900/20 hover:border-neutral-700'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isSelected ? 'bg-red-600 text-white' : 'bg-neutral-800 text-zinc-400'}`}>
                                {isSelected ? <Check className="h-4.5 w-4.5" /> : <Activity className="h-4.5 w-4.5" />}
                              </div>
                              <div className="space-y-1">
                                <span className={`block font-display text-sm font-bold uppercase tracking-wide ${isSelected ? 'text-red-400' : 'text-white'}`}>
                                  {srv.name}
                                </span>
                                <span className="block text-[11px] text-zinc-400 line-clamp-1 font-sans">{srv.description}</span>
                              </div>
                            </div>
                            
                            <div className="text-right font-mono text-xs pl-4 shrink-0">
                              <span className="block font-bold text-white">${srv.estimatePrice}</span>
                              <span className="block text-[10px] text-zinc-500 uppercase">{srv.duration}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: SCHEDULE */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                        Testing Chamber Timeslot
                      </h3>
                      <p className="text-xs text-zinc-400 font-light">
                        Select an open assessment window on the runway.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase text-zinc-500">
                          Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase text-zinc-500">
                          Timeslot *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const isSelected = selectedTime === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTime(slot)}
                                className={`px-2 py-2.5 rounded-lg border text-xs font-mono transition-all uppercase cursor-pointer ${
                                  isSelected 
                                    ? 'border-red-500 bg-red-600/10 text-red-400 font-bold' 
                                    : 'border-neutral-800 bg-neutral-900/40 text-zinc-400 hover:border-neutral-700 hover:text-white'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: CONTACT */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                        Athlete / Coach Information
                      </h3>
                      <p className="text-xs text-zinc-400 font-light">
                        Where your telemetry dossier and kinematic charts will be delivered.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase text-zinc-500">
                          Athlete / Coach Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={athleteName}
                          onChange={(e) => setAthleteName(e.target.value)}
                          placeholder="e.g. Christian Coleman Jr."
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase text-zinc-500">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={athleteEmail}
                          onChange={(e) => setAthleteEmail(e.target.value)}
                          placeholder="athlete@teamusatrack.org"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-xs font-mono uppercase text-zinc-500">
                          Phone Signal *
                        </label>
                        <input
                          type="tel"
                          required
                          value={athletePhone}
                          onChange={(e) => setAthletePhone(e.target.value)}
                          placeholder="(310) 555-0142"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-xs font-mono uppercase text-zinc-500">
                          Target Goals / Injury Notes (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={athleteNotes}
                          onChange={(e) => setAthleteNotes(e.target.value)}
                          placeholder="e.g. Shaving 0.10s off 40yd split, prior hamstring strain, blocks setup review"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-sans"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: CONFIRMATION */}
                {step === 5 && generatedTicket && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8 text-center py-6"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-600/10 border border-red-500/30 text-red-500">
                      <ShieldCheck className="h-8 w-8 animate-bounce" />
                    </div>

                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="font-display text-2xl font-black uppercase text-white tracking-wide">
                        Assessment Confirmed!
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        Testing session scheduled in the Kinetic Lab runway. Use the ticket code below to monitor your real-time assessment status.
                      </p>
                    </div>

                    <div className="max-w-md mx-auto border-2 border-dashed border-neutral-800 rounded-2xl bg-neutral-950 p-6 space-y-6 text-left relative overflow-hidden">
                      <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">KINETIC LAB // BIOMECHANICS DOSSIER</span>
                        <span className="inline-flex rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                          Confirmed
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                        <div>
                          <span className="block text-[10px] text-zinc-500 uppercase">Ticket ID</span>
                          <span className="block font-bold text-red-400 text-sm font-display tracking-wider">
                            {generatedTicket.ticketId}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-zinc-500 uppercase">Athlete</span>
                          <span className="block font-semibold text-zinc-200 truncate">{generatedTicket.customerName}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-zinc-500 uppercase">Program</span>
                          <span className="block font-semibold text-zinc-200">{generatedTicket.vehicleMake}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-zinc-500 uppercase">Protocol</span>
                          <span className="block font-semibold text-zinc-200 truncate">{selectedService.name}</span>
                        </div>
                        <div className="col-span-2 pt-2 border-t border-neutral-900 flex justify-between items-center bg-neutral-900/40 p-3 rounded-lg border border-neutral-900">
                          <div>
                            <span className="block text-[10px] text-zinc-500 uppercase">Date &amp; Time</span>
                            <span className="block text-[11px] font-bold text-white">
                              {generatedTicket.selectedDate} @ {generatedTicket.selectedTime}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="block text-[10px] text-zinc-400 uppercase">Fee</span>
                            <span className="block text-sm font-bold text-red-400 font-display">${generatedTicket.priceEstimate}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyTicketId}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 px-4 py-3 text-center text-xs font-mono font-semibold text-zinc-300 flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <Copy className="h-4 w-4 text-red-400" />
                        <span>{copied ? 'Copied to Clipboard!' : 'Copy Ticket Code'}</span>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-sm mx-auto">
                      <button
                        type="button"
                        onClick={() => onNavigate('tracker')}
                        className="w-full rounded-lg bg-red-600 hover:bg-red-500 px-6 py-3.5 text-center font-display text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/20 transition cursor-pointer"
                      >
                        Enter Tracker Radar
                      </button>
                      <button
                        type="button"
                        onClick={handleResetBooking}
                        className="w-full text-zinc-500 hover:text-white transition py-2 text-xs font-mono uppercase tracking-wider cursor-pointer"
                      >
                        Book Another Athlete
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {step < 5 && (
                <div className="pt-6 border-t border-neutral-900 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={step === 1}
                    className={`flex items-center space-x-2 text-xs font-mono uppercase tracking-wider py-2 px-3 rounded-lg border ${
                      step === 1 
                        ? 'border-transparent text-zinc-700 cursor-not-allowed' 
                        : 'border-neutral-800 text-zinc-400 hover:text-white hover:border-neutral-700 cursor-pointer'
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!isStepValid()}
                      className={`flex items-center justify-center space-x-2 rounded-lg py-3 px-6 text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                        isStepValid()
                          ? 'bg-red-600 hover:bg-red-500 text-white cursor-pointer shadow-lg shadow-red-600/20'
                          : 'bg-neutral-900 text-zinc-600 border border-neutral-900 cursor-not-allowed'
                      }`}
                    >
                      <span>Next Block</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid()}
                      className={`flex items-center justify-center space-x-2 rounded-lg py-3 px-8 text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
                        isStepValid()
                          ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20'
                          : 'bg-neutral-900 text-zinc-600 border border-neutral-900 cursor-not-allowed'
                      }`}
                    >
                      Confirm Lab Session
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Lab Specs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#101115] border border-neutral-900 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">[ LAB CERTIFICATION ]</span>
              <h4 className="font-display font-bold text-white text-base uppercase">Hardware &amp; Camera Array</h4>
              
              <ul className="space-y-3 text-xs font-mono text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Dual 1000Hz In-Ground Force Plates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>8-Cam High-Speed 240fps Kinematic Tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Triple Wireless Laser Split Timing Traps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>PostgreSQL Cloud Sync for Coaches &amp; Agents</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-900 text-xs font-mono text-zinc-400 space-y-2">
              <div className="text-red-400 font-bold uppercase">⚡ Need 1-Click Demo Access?</div>
              <p className="text-[11px] text-zinc-500">
                To bypass scheduling and inspect the director's command desk, click <strong>ADMIN PASS</strong> in the top navigation bar. Passkey: <code>kinetic2026</code>.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
