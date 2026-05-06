import { motion } from 'motion/react';
import { Toaster } from 'sonner';
import FlightInquiryChat from './components/FlightInquiryChat';

export default function App() {
  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: '#0A0A0A', height: '100dvh' }}
    >
      {/* Ambient gold glow — barely there */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute',
          top: '-10%', left: '-5%',
          width: '50%', height: '50%',
          background: 'radial-gradient(ellipse, rgba(184,150,62,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%', right: '-5%',
          width: '50%', height: '50%',
          background: 'radial-gradient(ellipse, rgba(184,150,62,0.03) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Header */}
      <motion.header
        className="flex-none pt-6 pb-4 text-center select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logotype */}
        <div className="inline-flex flex-col items-center">
          <span
            className="klo-display text-white"
            style={{ fontSize: '38px', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            <span style={{ opacity: 0.88 }}>K</span>
            <span style={{
              color: '#B8963E',
              fontStyle: 'italic',
              marginLeft: '-0.07em',
              marginRight: '-0.04em',
              opacity: 1,
            }}>L</span>
            <span style={{ opacity: 0.88 }}>O</span>
          </span>
          <span
            className="klo-label text-white/25 mt-2"
            style={{ fontSize: '8px', letterSpacing: '0.38em' }}
          >
            Private Charters
          </span>
        </div>

        {/* Hairline under header */}
        <div
          className="mx-auto mt-5"
          style={{ width: '1px', height: '32px', background: 'rgba(184,150,62,0.20)' }}
        />
      </motion.header>

      {/* Chat — fills all remaining space */}
      <motion.main
        className="flex-1 min-h-0 w-full max-w-3xl mx-auto px-3 sm:px-4 pb-2 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <FlightInquiryChat className="flex-1 min-h-0" />
      </motion.main>

      {/* Footer */}
      <motion.footer
        className="flex-none py-2 text-center"
        style={{
          borderTop: '1px solid rgba(244,239,230,0.04)',
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(12px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.2 }}
      >
        <p
          className="klo-label text-white/18"
          style={{ fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(244,239,230,0.18)' }}
        >
          Miami · Cartagena · Bogotá · Medellín
        </p>
      </motion.footer>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#161616',
            border: '1px solid rgba(244,239,230,0.08)',
            color: '#F4EFE6',
            borderRadius: '0px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.05em',
          },
        }}
      />
    </div>
  );
}
