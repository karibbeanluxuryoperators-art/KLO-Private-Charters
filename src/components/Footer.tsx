export default function Footer() {
  return (
    <footer className="w-full border-t py-16" style={{ background: '#080808', borderColor: 'rgba(244,239,230,0.07)' }}>
      <div className="max-w-[1100px] mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="klo-display text-white" style={{ fontSize: '28px' }}>
                K<span className="oro italic">L</span>O
              </span>
            </div>
            <p className="klo-body text-white/30 text-sm leading-relaxed" style={{ maxWidth: '240px' }}>
              Private aviation into Colombia. Arranged with precision, delivered with care.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="klo-label text-white/25 mb-6" style={{ fontSize: '9px', letterSpacing: '0.30em' }}>Navigate</p>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Routes', href: '#routes' },
                { label: 'Fleet', href: '#fleet' },
                { label: 'About KLO', href: '#about' },
                { label: 'Begin Your Voyage', href: '#enquire' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="klo-label text-white/35 hover:text-white/70 transition-colors duration-300"
                  style={{ fontSize: '11px', letterSpacing: '0.15em' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="klo-label text-white/25 mb-6" style={{ fontSize: '9px', letterSpacing: '0.30em' }}>Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/1YOURNUMBERHERE"
                target="_blank"
                rel="noopener noreferrer"
                className="klo-label text-white/35 hover:oro transition-colors duration-300"
                style={{ fontSize: '11px', letterSpacing: '0.15em' }}
              >
                WhatsApp Maria →
              </a>
              <a
                href="mailto:charters@klo.io"
                className="klo-label text-white/35 hover:text-white/70 transition-colors duration-300"
                style={{ fontSize: '11px', letterSpacing: '0.15em' }}
              >
                charters@klo.io
              </a>
              <p className="klo-label text-white/20" style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
                Available 24 / 7
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ borderColor: 'rgba(244,239,230,0.07)' }}
        >
          <p className="klo-label text-white/20" style={{ fontSize: '9px', letterSpacing: '0.20em' }}>
            © 2026 KLO Private Charters · Karibbean Luxury Operators
          </p>
          <div className="flex items-center gap-6">
            <p className="klo-label text-white/15" style={{ fontSize: '9px', letterSpacing: '0.15em' }}>
              London · Miami · Cartagena
            </p>
            <div className="hairline opacity-20" style={{ height: '12px' }} />
            <p className="klo-label text-white/15" style={{ fontSize: '9px', letterSpacing: '0.15em' }}>
              All rights reserved
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
