import { useEffect, useRef } from 'react';

const FLEET = [
  {
    category: 'Light Jet',
    example: 'Citation CJ3+ · Phenom 300',
    pax: '4–6',
    range: '2,400 km',
    ideal: 'Miami → Cartagena · Bogotá → CTG domestic',
    attributes: ['Fast boarding', 'Low operating cost', 'Regional excellence'],
    note: 'The sharp choice for Caribbean hops and Colombian domestic segments.',
  },
  {
    category: 'Midsize Jet',
    example: 'Citation XLS · Hawker 800XP',
    pax: '7–9',
    range: '4,200 km',
    ideal: 'Houston → Cartagena · New York → Bogotá',
    attributes: ['Stand-up cabin', 'Full galley', 'Transcontinental reach'],
    note: 'The most versatile category — covers most Colombia routes in comfort.',
  },
  {
    category: 'Super Midsize',
    example: 'Challenger 300 · Citation X',
    pax: '8–10',
    range: '5,800 km',
    ideal: 'New York → Bogotá · Los Angeles → CTG',
    attributes: ['Lie-flat capable', 'Quiet cabin', 'Extended range'],
    note: 'For longer transcontinental routes where comfort cannot be compromised.',
  },
  {
    category: 'Heavy Jet',
    example: 'Gulfstream G450 · Challenger 604',
    pax: '10–14',
    range: '7,400 km',
    ideal: 'London → Bogotá · Madrid → BOG',
    attributes: ['Full stand-up', 'Sleeping quarters', 'Private meetings'],
    note: 'Transatlantic routes and group travel at the highest level.',
  },
  {
    category: 'Ultra Long Range',
    example: 'Gulfstream G650 · Global 7500',
    pax: '14–19',
    range: '13,000 km+',
    ideal: 'Dubai → Bogotá · Singapore → CTG',
    attributes: ['Non-stop transatlantic', 'Full bedroom', 'Chef galley'],
    note: 'For clients who refuse to stop — anywhere on earth to Colombia, direct.',
  },
  {
    category: 'VIP Turboprop',
    example: 'Pilatus PC-12 · King Air 350',
    pax: '6–9',
    range: '2,800 km',
    ideal: 'Medellín → Nuquí · Bogotá → Bahía Solano',
    attributes: ['Short airstrips', 'Eco-remote access', 'Unique terrain'],
    note: 'The only way to reach Nuquí and Pacific coast destinations in style.',
  },
];

export default function FleetSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.will-reveal').forEach((el) => el.classList.add('revealed'));
          }
        });
      },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="fleet" ref={sectionRef} className="w-full py-32 md:py-40" style={{ background: '#0C0C0C' }}>
      <div className="max-w-[1100px] mx-auto px-6">

        {/* Header */}
        <div className="mb-20 will-reveal">
          <p className="klo-label oro mb-5" style={{ fontSize: '10px', letterSpacing: '0.35em' }}>Fleet</p>
          <h2 className="klo-display text-white" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
            The right aircraft<br />
            <span className="text-white/40">for every route.</span>
          </h2>
        </div>

        {/* Fleet grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px stagger" style={{ background: 'rgba(244,239,230,0.06)' }}>
          {FLEET.map((aircraft, i) => (
            <div
              key={i}
              className="will-reveal flex flex-col p-8 md:p-10 group hover:bg-white/[0.025] transition-all duration-700 cursor-default"
              style={{ background: '#0C0C0C' }}
            >
              {/* Category */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="klo-display text-white mb-1" style={{ fontSize: '24px' }}>
                    {aircraft.category}
                  </h3>
                  <p className="klo-label text-white/25" style={{ fontSize: '9px', letterSpacing: '0.15em' }}>
                    {aircraft.example}
                  </p>
                </div>
                <span className="klo-label oro text-right" style={{ fontSize: '11px', letterSpacing: '0.10em' }}>
                  {aircraft.pax} pax
                </span>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] mb-6 opacity-30" style={{ background: 'rgba(244,239,230,0.15)' }} />

              {/* Details */}
              <div className="flex flex-col gap-3 mb-6 flex-1">
                <div className="flex justify-between">
                  <span className="klo-label text-white/25" style={{ fontSize: '9px' }}>Range</span>
                  <span className="klo-label text-white/60" style={{ fontSize: '9px' }}>{aircraft.range}</span>
                </div>
                <div className="flex justify-between">
                  <span className="klo-label text-white/25" style={{ fontSize: '9px' }}>Ideal for</span>
                  <span className="klo-label text-white/60 text-right ml-4" style={{ fontSize: '9px', letterSpacing: '0.10em' }}>{aircraft.ideal}</span>
                </div>
              </div>

              {/* Note */}
              <p className="klo-body text-white/30 text-sm leading-relaxed border-t pt-5"
                style={{ borderColor: 'rgba(244,239,230,0.06)' }}>
                {aircraft.note}
              </p>

              {/* Attributes */}
              <div className="flex flex-wrap gap-2 mt-5">
                {aircraft.attributes.map((attr) => (
                  <span
                    key={attr}
                    className="klo-label text-white/20 border px-2 py-1"
                    style={{ fontSize: '8px', borderColor: 'rgba(244,239,230,0.08)', letterSpacing: '0.15em' }}
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="will-reveal mt-16 pt-8 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ borderColor: 'rgba(244,239,230,0.07)' }}>
          <p className="klo-body text-white/30 text-sm" style={{ maxWidth: '480px' }}>
            All aircraft sourced from certified operators. Every flight is arranged with verified crew,
            full insurance, and private terminal access at your destination.
          </p>
          <a
            href="#enquire"
            className="klo-label text-white/50 hover:text-white transition-colors duration-300 whitespace-nowrap flex items-center gap-3"
            style={{ fontSize: '10px' }}
          >
            Request a proposal
            <span className="w-6 h-[1px] inline-block" style={{ background: '#B8963E', opacity: 0.6 }} />
          </a>
        </div>

      </div>
    </section>
  );
}
