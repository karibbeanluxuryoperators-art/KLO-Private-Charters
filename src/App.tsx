/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import FlightInquiryChat from './components/FlightInquiryChat';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="fixed inset-0 h-[100dvh] w-full bg-[#050505] selection:bg-primary/30 selection:text-white flex flex-col overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] bg-primary/[0.04] blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-primary/[0.03] blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 flex-1 flex flex-col min-h-0 w-full"
      >
        <header className="flex-none pt-4 sm:pt-8 pb-4 text-center">
          <div className="text-3xl sm:text-4xl font-serif font-light tracking-[-0.04em] text-white flex items-center justify-center select-none group">
            <span className="flex items-center">
              <span className="opacity-90">K</span>
              <span className="text-primary italic -ml-[0.08em] opacity-100">L</span>
              <span className="-ml-[0.05em] opacity-90">O</span>
            </span>
          </div>
          <p className="text-primary/40 uppercase tracking-[0.6em] text-[7px] sm:text-[9px] font-display font-medium mt-2 transition-all duration-700 group-hover:tracking-[0.8em] group-hover:text-primary/60">
            Kariibbean Luxury Operators
          </p>
          <div className="w-4 h-[1px] bg-primary/20 mx-auto mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </header>

        <main className="flex-1 min-h-0 w-full max-w-4xl mx-auto px-2 sm:px-4 pb-1 sm:pb-2 flex flex-col">
          <FlightInquiryChat className="flex-1 min-h-0" />
        </main>

        <footer className="flex-none py-1.5 text-center opacity-30 bg-black/40 backdrop-blur-md border-t border-white/5">
          <p className="text-white text-[7px] uppercase tracking-[0.4em] font-display">
            London • Miami • Cartagena • São Paulo
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
