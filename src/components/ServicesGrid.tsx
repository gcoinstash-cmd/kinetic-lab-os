import { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data';
import { AssessmentProtocol } from '../types';
import { Activity, Gauge, Cpu, Sparkles, Sliders, Droplet, Clock, ArrowRight } from 'lucide-react';

interface ServicesGridProps {
  onSelectService: (serviceId: string) => void;
  services?: AssessmentProtocol[];
}

export default function ServicesGrid({ onSelectService, services }: ServicesGridProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'force_plate' | 'velocity' | 'biomechanics' | 'recovery'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Protocols' },
    { id: 'force_plate', label: 'Force Plates (1000Hz)' },
    { id: 'velocity', label: 'Velocity Profiling' },
    { id: 'biomechanics', label: '3D Kinematics' },
    { id: 'recovery', label: 'Readiness & FLIR' }
  ] as const;

  const filteredServices = (services || SERVICES).filter(service => 
    activeCategory === 'all' || service.category === activeCategory
  );

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="h-6 w-6" />;
      case 'Gauge': return <Gauge className="h-6 w-6" />;
      case 'Cpu': return <Cpu className="h-6 w-6" />;
      case 'Droplet': return <Droplet className="h-6 w-6" />;
      case 'Sparkles': return <Sparkles className="h-6 w-6" />;
      case 'Sliders': return <Sliders className="h-6 w-6" />;
      default: return <Activity className="h-6 w-6" />;
    }
  };

  return (
    <section id="services" className="relative py-20 bg-[#0A0A0B] border-t border-neutral-900 scroll-mt-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-3 text-xs font-mono text-red-500 uppercase tracking-widest">
              <span>[ BIOMECHANICS RADAR ]</span>
              <span className="text-zinc-700">//</span>
              <span className="text-zinc-300">1000HZ TELEMETRY SCAN</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Athletic Assessment Protocols
            </h2>
            <p className="text-zinc-400 font-sans text-sm font-light">
              Laboratory-grade biomechanical assessments for Olympic sprint programs, collegiate athletic departments, and pro sports draft prospects.
            </p>
          </div>

          {/* Filtering Tabs bar */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-md border tracking-wider uppercase transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'border-red-500 bg-red-600/10 text-red-400 font-bold'
                    : 'border-neutral-800 bg-neutral-900/40 text-zinc-400 hover:border-neutral-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="bg-neutral-950/80 border border-neutral-900 rounded-xl p-6 flex flex-col justify-between md:min-h-[300px] hover:border-red-500/40 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Accent Corner Lighting decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-600/10 to-transparent rounded-tr-xl pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100" />
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/80 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-md">
                      {renderIcon(service.icon)}
                    </div>
                    <span className="font-mono text-xs font-semibold tracking-wider text-zinc-300 bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-900 uppercase">
                      {service.category.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white group-hover:text-red-400 transition-colors duration-200">
                      {service.name}
                    </h3>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                    {service.helperText && (
                      <span className="text-xs text-zinc-300 mt-1 block font-sans leading-relaxed italic">
                        {service.helperText}
                      </span>
                    )}
                  </div>
                </div>

                {/* Technical meta metrics */}
                <div className="pt-6 mt-6 border-t border-neutral-900/60 flex items-center justify-between relative z-10 font-mono">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">Assessment Fee</span>
                    <span className="text-sm font-bold text-white font-display">${service.estimatePrice}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">Testing Window</span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-red-500" />
                      {service.duration}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(service.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-zinc-400 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300 cursor-pointer"
                    aria-label={`Book assessment ${service.name}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Info callout footer */}
        <div className="mt-12 text-center">
          <p className="inline-flex flex-col sm:flex-row sm:items-center justify-center gap-2 rounded-full border border-neutral-900 bg-neutral-950 px-6 py-2.5 text-base text-zinc-200 leading-relaxed font-mono">
            <span>⚡ Custom pro team combine setups &amp; multi-athlete rosters supported.</span>
            <button 
              onClick={() => onSelectService('markerless-3d')}
              className="text-red-400 hover:underline font-semibold cursor-pointer"
            >
              Consult Lead Biomechanist →
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
