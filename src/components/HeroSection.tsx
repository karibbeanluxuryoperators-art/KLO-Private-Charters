import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      className="relative w-full flex flex-col justify-end overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* Background — cinematic dark gradient with subtle texture */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 60% 40%, rgba(184,150,62,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 20% 80%, rgba(184,150,62,0.04) 0%, transparent 50%),
            linear-gradient(180deg, #050505 0%, #0A0A0A 60%, #0C0C0C 100%)
          `,
          transform: `translateY(${scrollY * 0.3}px)`,
          willChange: 'transform',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(244,239,230,0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(244,239,230,0.4) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-[1100px] mx-auto px-6 pb-24 pt-40 md:pt-0 md:pb-32 w-full">

        {/* Eyebrow */}
        <motion.p
          className="klo-label oro mb-8"
          style={{ fontSize: '10px', letterSpacing: '0.40em' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Private Aviation · Colombia
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="klo-display text-white mb-8"
          style={{ fontSize: 'clamp(52px, 8vw, 112px)', maxWidth: '780px' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Arrive on
          <br />
          <span className="oro italic">your terms.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="klo-body text-white/40 mb-14"
          style={{ fontSize: '17px', maxWidth: '420px', lineHeight: 1.75 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Private jet charters into Cartagena, Bogotá, Medellín, and beyond.
          Arranged with the precision you expect.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#enquire"
            className="klo-label px-8 py-4 text-[#0A0A0A] oro-bg hover:bg-[#A07830] transition-colors duration-500"
            style={{ fontSize: '11px', letterSpacing: '0.20em' }}
          >
            Begin Your Voyage
          </a>
          <a
            href="#routes"
            className="klo-label text-white/40 hover:text-white/70 transition-colors duration-300 flex items-center gap-3"
            style={{ fontSize: '11px' }}
          >
            <span className="w-8 h-[1px] oro-bg inline-block opacity-60" />
            View Routes
          </a>
        </motion.div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        className="relative z-20 border-t w-full"
        style={{ borderColor: 'rgba(244,239,230,0.07)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.0 }}
      >
        <div className="max-w-[1100px] mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/[0.07]">
          {[
            { value: '7', label: 'Colombian Destinations' },
            { value: '24h', label: 'Proposal Turnaround' },
            { value: '6', label: 'Aircraft Categories' },
            { value: '100%', label: 'Private Terminals' },
          ].map(({ value, label }) => (
            <div key={label} className="md:px-8 first:pl-0 last:pr-0">
              <p className="klo-display text-white" style={{ fontSize: '32px' }}>{value}</p>
              <p className="klo-label text-white/30 mt-1" style={{ fontSize: '9px', letterSpacing: '0.20em' }}>{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
