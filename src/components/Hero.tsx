import { motion } from 'motion/react';
import { Gauge, Zap, Activity, Timer, CheckCircle, ChevronDown, Layers } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  baysAvailable: number;
}

export default function Hero({ onNavigate, baysAvailable }: HeroProps) {
  const brands = [
    'TEAM USA TRACK & FIELD', 'NFL COMBINE VELOCITY', 'PREMIER LEAGUE PERFORMANCE', 'OLYMPIC SPRINT GUILD', 
    'FORCE DECKS 1000HZ', 'OPTOJUMP OPTICAL RADAR', 'HAWKIN DYNAMICS', 'CATAPULT GPS SENSORS',
    'TEAM USA TRACK & FIELD', 'NFL COMBINE VELOCITY', 'PREMIER LEAGUE PERFORMANCE', 'OLYMPIC SPRINT GUILD'
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden pt-12 md:pt-20 bg-[#0A0A0B]">
      {/* Background glow and subtle athletics grid */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.12),rgba(10,10,11,0))]" />
      
      {/* Track lane markings */}
      <div className="absolute left-6 top-32 bottom-20 w-[1px] bg-neutral-900 hidden xl:block" />
      <div className="absolute right-6 top-32 bottom-20 w-[1px] bg-neutral-900 hidden xl:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-8 z-10">
            {/* Tagline / Live Status telemetry */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 rounded-full border border-red-500/25 bg-red-600/10 px-3 py-1 text-xs font-semibold font-mono tracking-wider text-red-400 uppercase"
            >
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>High-Performance Biomechanics &amp; Sprint Testing OS</span>
            </motion.div>

            {/* Typography */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none"
              >
                Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">Top Velocity</span>.<br />
                Calibrated for <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Sub-10s Speed</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-white font-sans text-sm md:text-base max-w-xl font-normal leading-relaxed border-l-2 border-red-600 pl-4"
              >
                A high-ticket biomechanics clinic &amp; sprint acceleration testing portal equipped with 1000Hz dual force plate telemetry, 3D markerless kinematics, laser split gate profiling, and instant coach dossiers.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-zinc-400 font-sans text-sm max-w-xl leading-relaxed font-light"
              >
                We capture ground contact times (GCT) down to the millisecond, quantify left/right elastic power asymmetry, and diagnose 3-point combine start angles for Olympic sprinters, NFL prospects, and elite academy talents.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
            >
              <button 
                onClick={() => onNavigate('booking')}
                className="group relative flex items-center justify-center space-x-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-8 py-4 text-center font-display text-sm font-bold uppercase tracking-wider text-white hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-red-600/20 cursor-pointer"
                id="hero-book-cta"
              >
                <span>BOOK BIOMECHANICS ASSESSMENT</span>
                <Zap className="h-4 w-4 transition-transform group-hover:scale-110" />
              </button>

              <button 
                onClick={() => onNavigate('tracker')}
                className="flex items-center justify-center space-x-2 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900/90 transition-all font-mono text-xs uppercase tracking-wider text-zinc-300 px-6 py-4 cursor-pointer"
              >
                <span>LIVE TELEMETRY RADAR</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              </button>
            </motion.div>

            {/* Live Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-900 font-mono"
            >
              <div className="space-y-1">
                <div className="flex items-center text-red-500">
                  <span className="text-2xl font-bold font-display">{baysAvailable}</span>
                  <span className="text-zinc-600 text-sm ml-0.5">/4</span>
                </div>
                <p className="text-xs font-semibold tracking-wider uppercase text-zinc-300 tracking-wider">Testing Lanes Open</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-white">
                  <span className="text-2xl font-bold font-display">27.4</span>
                  <span className="text-red-500 text-sm ml-0.5">MPH</span>
                </div>
                <p className="text-xs font-semibold tracking-wider uppercase text-zinc-300 tracking-wider">Peak Velocity Verified</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-white">
                  <span className="text-2xl font-bold font-display">1000</span>
                  <span className="text-zinc-600 text-sm ml-0.5">Hz</span>
                </div>
                <p className="text-xs font-semibold tracking-wider uppercase text-zinc-300 tracking-wider">Force Sensor Rate</p>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Column: Athletic Sprint Visual */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-md h-[420px] rounded-2xl overflow-hidden group shadow-2xl"
            >
              {/* Glowing Accents */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 opacity-25 group-hover:opacity-40 blur transition duration-300"></div>
              
              <div className="relative h-full w-full rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200" 
                  alt="Sprinter accelerating from start blocks on track" 
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover grayscale brightness-85 contrast-125 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/40 to-transparent"></div>
                
                {/* Telemetry floating badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold tracking-wider font-mono text-zinc-400 uppercase">
                    <span>1000HZ TELEMETRY //</span>
                    <span className="text-red-400 font-bold animate-pulse">Live Optojump Feed</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm tracking-wide text-white">COMBINE 40YD SPLIT #1</span>
                    <span className="font-mono text-xs text-red-400 font-bold">1.44s (PR)</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full w-[94%] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scrolling Brand Ribbon */}
      <div className="relative w-full border-t border-b border-neutral-900 bg-neutral-950 py-3.5 overflow-hidden mt-16 md:mt-24">
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee whitespace-nowrap flex select-none text-xs font-mono font-bold tracking-widest text-zinc-300">
          {brands.map((brand, i) => (
            <span key={i} className="mx-8 uppercase hover:text-red-400 transition-colors">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
