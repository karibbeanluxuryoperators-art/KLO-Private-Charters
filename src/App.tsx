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
        <header className="flex-none pt-2 sm:pt-4 pb-1 text-center">
          <div className="text-xl sm:text-3xl font-serif font-light tracking-tighter text-white flex items-center justify-center select-none">
            <span className="flex items-center">
              <span>K</span>
              <span className="text-primary italic -ml-[0.12em]">L</span>
              <span className="-ml-[0.08em] text-white">O</span>
            </span>
          </div>
          <p className="text-primary/60 uppercase tracking-[0.4em] text-[6px] sm:text-[7px] font-display font-medium">
            Luxury Operators
          </p>
        </header>

        <main className="flex-1 min-h-0 w-full max-w-4xl mx-auto px-2 sm:px-4 pb-1 sm:pb-2 flex flex-col">
          <FlightInquiryChat />
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
