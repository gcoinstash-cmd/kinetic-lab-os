import { motion } from 'motion/react';
import { PACKAGES } from '../data';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import { PackageTier } from '../types';

interface PricingMatrixProps {
  onSelectPackageService: (serviceName: string, servicePrice: number) => void;
  packages?: PackageTier[];
}

export default function PricingMatrix({ onSelectPackageService, packages }: PricingMatrixProps) {
  
  const handleSelectPkg = (pkgId: string) => {
    switch (pkgId) {
      case 'pkg-foundation':
        onSelectPackageService('force-plate', 280);
        break;
      case 'pkg-apex':
        onSelectPackageService('markerless-3d', 799);
        break;
      case 'pkg-combine':
        onSelectPackageService('combine-prep', 650);
        break;
      default:
        onSelectPackageService('force-plate', 280);
    }
  };

  return (
    <section id="pricing" className="relative py-20 bg-[#0A0A0B] border-t border-neutral-900 scroll-mt-20">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16 relative">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-red-500 bg-red-600/10 px-3 py-1 rounded-full uppercase">
            <span>[ LAB ACCESS TIERS ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Performance Testing Matrices
          </h2>
          <p className="text-zinc-400 font-sans text-sm font-light">
            Modular biomechanical evaluation packages for solo athletes, collegiate athletic teams, and professional combine cohorts.
          </p>
        </div>

        {/* Dynamic Pricing Grid cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {(packages || PACKAGES).map((tier, idx) => {
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-2xl border flex flex-col justify-between p-6 sm:p-8 relative transition-all duration-300 ${
                  tier.isPopular 
                    ? 'border-red-500 bg-neutral-900/60 ring-2 ring-red-500/20 shadow-2xl shadow-red-600/10' 
                    : 'border-neutral-900 bg-[#101115] hover:border-neutral-800'
                }`}
              >
                {/* Popular Badge */}
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white font-mono text-[9px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-red-600/30">
                    <Zap className="h-2.5 w-2.5 fill-white" />
                    <span>Gold Standard Protocol</span>
                  </div>
                )}

                {/* Card Top Area */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
                      TIER 0{idx + 1}
                    </span>
                    <h3 className="font-display text-xl font-bold uppercase text-white">
                      {tier.name}
                    </h3>
                    <p className="text-zinc-400 text-xs font-light tracking-wide min-h-[36px]">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline font-display">
                    <span className="text-4xl sm:text-5xl font-black text-white">{tier.price}</span>
                    <span className="text-xs text-zinc-500 font-mono uppercase ml-2 tracking-widest">/ testing session</span>
                  </div>

                  {/* Feature inclusions */}
                  <div className="space-y-3.5 pt-6 border-t border-neutral-900/80">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                      Protocol Specifications:
                    </span>
                    <ul className="space-y-2.5 text-xs text-zinc-300 font-sans">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2.5 leading-relaxed font-light">
                          <Check className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Button */}
                <div className="pt-8 mt-8 border-t border-neutral-900/40">
                  <button
                    onClick={() => handleSelectPkg(tier.id)}
                    className={`w-full rounded-lg py-3.5 text-center font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      tier.isPopular
                        ? 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/30'
                        : 'bg-neutral-900 text-zinc-300 hover:bg-neutral-800 border border-neutral-800'
                    }`}
                  >
                    Select {tier.name}
                  </button>
                  <p className="text-[11px] font-mono text-zinc-600 text-center mt-3">
                    ⚡ Instant digital report dossier generated.
                  </p>
                </div>

              </motion.div>
            )
          })}
        </div>

        {/* Custom Squad Notice */}
        <div className="mt-16 bg-[#101115] border border-neutral-900 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left md:max-w-xl">
            <h4 className="font-display text-base font-bold uppercase text-white tracking-wide flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-red-500" />
              Need Full Athletic Department or Combine Squad Retainers?
            </h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              We provide team-wide force plate deployments, dedicated high-speed laser sprint camps, and automated API database hooks into your coaching management platform.
            </p>
          </div>
          <button
            onClick={() => handleSelectPkg('pkg-combine')}
            className="rounded-lg border border-neutral-800 hover:border-red-500 bg-neutral-950 px-6 py-3.5 text-center text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            Squad Licensing
          </button>
        </div>

      </div>
    </section>
  );
}
