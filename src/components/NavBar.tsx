import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Routes', href: '#routes' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'About', href: '#about' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          height: '64px',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(184,150,62,0.12)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1100px] mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col select-none">
            <span className="klo-display text-white" style={{ fontSize: '22px', letterSpacing: '-0.02em' }}>
              <span style={{ opacity: 0.9 }}>K</span>
              <span className="oro italic" style={{ marginLeft: '-0.06em', marginRight: '-0.03em' }}>L</span>
              <span style={{ opacity: 0.9 }}>O</span>
            </span>
            <span className="klo-label text-white/25" style={{ fontSize: '8px', letterSpacing: '0.22em' }}>
              Private Charters
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="klo-label text-white/40 hover:text-white/80 transition-colors duration-300"
                style={{ fontSize: '11px' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <div className="hairline opacity-30" style={{ height: '20px' }} />
            <a
              href="#enquire"
              className="klo-label text-[10px] px-5 py-2.5 border oro-border text-white/80 hover:text-white hover:border-[#B8963E] transition-all duration-500"
              style={{ letterSpacing: '0.20em' }}
            >
              Begin Your Voyage
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-5 h-[1px] bg-white/60 block" />
            <span className="w-3 h-[1px] bg-white/60 block" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: '#0A0A0A' }}
        >
          <div className="flex justify-between items-center px-6 h-16">
            <span className="klo-display text-white" style={{ fontSize: '22px', letterSpacing: '-0.02em' }}>
              <span style={{ opacity: 0.9 }}>K</span>
              <span className="oro italic" style={{ marginLeft: '-0.06em', marginRight: '-0.03em' }}>L</span>
              <span style={{ opacity: 0.9 }}>O</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white/40 hover:text-white text-2xl transition-colors"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center items-center gap-10 stagger">
            {[...NAV_LINKS, { label: 'Enquire', href: '#enquire' }].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="will-reveal revealed klo-display text-white/80 hover:text-white transition-colors duration-500"
                style={{ fontSize: '40px' }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="klo-label text-white/20 text-center pb-8" style={{ fontSize: '9px' }}>
            London · Miami · Cartagena
          </p>
        </div>
      )}
    </>
  );
}
