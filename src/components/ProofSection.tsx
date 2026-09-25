import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Star, Zap, MessageSquare, ArrowLeftRight } from 'lucide-react';

export default function ProofSection() {
  const [selectedReviewIdx, setSelectedReviewIdx] = useState(0);
  const [sliderPercent, setSliderPercent] = useState(50);

  const activeReview = TESTIMONIALS[selectedReviewIdx];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPercent(Number(e.target.value));
  };

  return (
    <section id="reviews" className="relative py-20 bg-[#0A0A0B] border-t border-neutral-900 scroll-mt-20">
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-red-650/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Blocks Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-red-500 bg-red-600/10 px-3 py-1 rounded-full uppercase">
            <span>[ SPRINT DATA VERIFICATION ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Kinematic Telemetry &amp; Velocity Results
          </h2>
          <p className="text-zinc-400 font-sans text-sm font-light">
            Review certified laser timing runs, ground contact time reductions, and biomechanical sprint transformations. Drag the slider to compare start block mechanics.
          </p>
        </div>

        {/* Outer Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* LEFT: THE INTERACTIVE BEFORE/AFTER SLIDER (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-red-500" />
              Kinematic Motion Comparator
            </h3>

            {/* Slider Container Box */}
            <div className="relative h-[350px] sm:h-[420px] rounded-2xl overflow-hidden border border-neutral-900 select-none bg-neutral-900 shadow-2xl">
              
              {/* After Image (Background) */}
              <img
                src={activeReview.afterUrl}
                alt="After biomechanical sprint correction"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-125"
              />
              <div className="absolute bottom-4 right-4 z-20 bg-emerald-500/90 text-black font-mono text-xs font-semibold tracking-wider font-bold uppercase px-2.5 py-1 rounded border border-emerald-400 shadow-lg select-none">
                CALIBRATED // POST-LAB
              </div>

              {/* Before Image (Foreground overlay clip) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden z-10 pointer-events-none"
                style={{ width: `${sliderPercent}%` }}
              >
                <img
                  src={activeReview.beforeUrl}
                  alt="Before biomechanics training"
                  referrerPolicy="no-referrer"
                  className="absolute inset-y-0 left-0 w-full max-w-none h-full object-cover grayscale brightness-60 contrast-100"
                  style={{ width: '100%', minWidth: '100%', height: '100%' }}
                />
              </div>
              <div className="absolute bottom-4 left-4 z-20 bg-neutral-950/90 text-zinc-400 font-mono text-xs font-semibold tracking-wider font-bold uppercase px-2.5 py-1 rounded border border-neutral-800 shadow-lg select-none">
                BASELINE // INTAKE
              </div>

              {/* Slider divider line */}
              <div 
                className="absolute inset-y-0 z-20 pointer-events-none"
                style={{ left: `${sliderPercent}%` }}
              >
                <div className="absolute inset-y-0 w-0.5 bg-red-500 -left-[1px] shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 rounded-full bg-red-600 text-white border border-white flex items-center justify-center shadow-2xl">
                  <ArrowLeftRight className="h-4 w-4" />
                </div>
              </div>

              {/* Hidden range input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPercent}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                aria-label="Drag sprint comparison slider"
              />
            </div>

            {/* Slider help prompt */}
            <div className="flex justify-between items-center text-xs font-mono text-zinc-300 bg-[#101115] border border-neutral-900 p-4 rounded-xl">
              <span className="flex items-center gap-1.5 uppercase">
                <MessageSquare className="h-4 w-4 text-red-500" />
                Athlete Squad Context:
              </span>
              <span className="text-white font-bold tracking-wide uppercase">
                {activeReview.vehicle}
              </span>
            </div>
          </div>

          {/* RIGHT: MASONRY FEEDBACK LIST (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Coach &amp; Specialist Verifications
            </h3>

            <div className="space-y-4">
              {TESTIMONIALS.map((review, idx) => {
                const isSelected = selectedReviewIdx === idx;
                return (
                  <motion.div
                    key={review.id}
                    onClick={() => {
                      setSelectedReviewIdx(idx);
                      setSliderPercent(50);
                    }}
                    className={`rounded-2xl border p-5 cursor-pointer text-left transition-all relative overflow-hidden ${
                      isSelected 
                        ? 'border-red-500/40 bg-neutral-900' 
                        : 'border-neutral-900 bg-neutral-900/30 hover:border-neutral-800'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                    )}

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, rIdx) => (
                          <Star key={rIdx} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <span className="font-mono text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                        {review.date}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">
                        {review.author}
                      </h4>
                      <p className="font-mono text-xs font-semibold tracking-wider text-red-400 uppercase flex items-center gap-1">
                        <span>{review.vehicle}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400 font-sans italic">{review.type}</span>
                      </p>
                      
                      <p className="text-zinc-400 text-xs font-light leading-relaxed pt-2">
                        "{review.text}"
                      </p>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
