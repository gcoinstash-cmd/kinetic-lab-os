import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Mail, CheckCircle2, Zap } from 'lucide-react';

export default function LeadCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorVisible(true);
      return;
    }
    setErrorVisible(false);
    setSubmitted(true);
  };

  return (
    <section 
      id="lead-capture" 
      className="w-full bg-[#101115] border-t border-neutral-900/60 py-12 md:py-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#dc2626_0.5px,transparent_0.5px)] opacity-5 [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 rounded-full border border-red-500/20 bg-red-600/10 px-2.5 py-1 text-[10px] font-mono tracking-wider text-red-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>Olympic Speed Whitepaper</span>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Sub-10.00s Acceleration Whitepaper.<br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">Instant Coach Dossier.</span>
            </h3>
            
            <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed max-w-2xl">
              Download our laboratory blueprint breaking down 10-yard start block shin angles, ground contact time (GCT) thresholds under 90ms, and reactive stiffness programming.
            </p>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-5 bg-neutral-950/80 border border-neutral-900 rounded-lg p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500/40" />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 pb-2 border-b border-neutral-900">
                    <Zap className="h-4 w-4 text-red-500" />
                    <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-widest">COACH ACCESS PORTAL</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      ENTER WORK / ATHLETICS EMAIL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-zinc-600" />
                      </div>
                      <input
                        type="email"
                        placeholder="coach@athleticdepartment.edu"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorVisible) setErrorVisible(false);
                        }}
                        className={`block w-full pl-10 pr-3 py-2.5 bg-neutral-900/80 border ${errorVisible ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-800 focus:border-red-500'} rounded text-sm text-white font-mono placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all`}
                        required
                      />
                    </div>
                    {errorVisible && (
                      <p className="text-[10px] font-mono text-red-400 mt-1">
                        * Please input a valid athletic department email.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-display font-bold text-xs uppercase tracking-wider py-3 px-6 rounded transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg shadow-red-600/20"
                  >
                    <Download className="h-4.5 w-4.5 stroke-[2.5px]" />
                    <span>DOWNLOAD SPRINT DOSSIER</span>
                  </button>
                  
                  <p className="text-[10px] font-mono text-zinc-600 text-center leading-normal">
                    Secure channel. Zero spam. Direct sports science deliverables only.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 py-4 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 border border-red-500/30 text-red-400">
                    <CheckCircle2 className="h-6 w-6 stroke-[2.5px] animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-widest text-red-400 font-bold">
                      DOSSIER TRANSMITTED // CHECK YOUR INBOX
                    </p>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
                      The Sub-10.00s Acceleration Whitepaper was successfully dispatched to <span className="text-white font-mono">{email}</span>.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setEmail('');
                    }}
                    className="inline-flex items-center space-x-1 font-mono text-[10px] uppercase text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <span>&lt; Send to another email &gt;</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}
