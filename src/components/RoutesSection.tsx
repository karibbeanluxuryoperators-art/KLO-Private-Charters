import { useEffect, useRef } from 'react';

const ROUTES = [
  {
    from: 'Miami',
    fromCode: 'MIA',
    to: 'Cartagena',
    toCode: 'CTG',
    duration: '~2h 15m',
    type: 'Light / Midsize Jet',
    note: 'Most requested route. Direct to private terminal.',
  },
  {
    from: 'New York',
    fromCode: 'TEB',
    to: 'Bogotá',
    toCode: 'BOG',
    duration: '~5h 30m',
    type: 'Midsize / Heavy Jet',
    note: 'Ideal for corporate delegations and business travel.',
  },
  {
    from: 'Houston',
    fromCode: 'HOU',
    to: 'Cartagena',
    toCode: 'CTG',
    duration: '~2h 45m',
    type: 'Light / Midsize Jet',
    note: 'Popular for oil & gas sector and leisure.',
  },
  {
    from: 'London',
    fromCode: 'EGLF',
    to: 'Bogotá',
    toCode: 'BOG',
    duration: '~11h',
    type: 'Heavy / Ultra-Long Range',
    note: 'Transatlantic. Gulfstream G650 or Global 6000.',
  },
  {
    from: 'Bogotá',
    fromCode: 'BOG',
    to: 'Cartagena',
    toCode: 'CTG',
    duration: '~1h',
    type: 'Light Jet',
    note: 'Domestic connection. Faster than any commercial option.',
  },
  {
    from: 'Panama City',
    fromCode: 'PTY',
    to: 'Medellín',
    toCode: 'MDE',
    duration: '~1h 20m',
    type: 'Light / Midsize Jet',
    note: 'Growing demand from Panama-Colombia business corridor.',
  },
];

const DESTINATIONS = [
  { code: 'CTG', name: 'Cartagena', tagline: 'Colonial coast. Walled city. Caribbean warmth.' },
  { code: 'BOG', name: 'Bogotá', tagline: 'Capital. Business. 2,600m above the world.' },
  { code: 'MDE', name: 'Medellín', tagline: 'Innovation city. Eternal spring. Mountain air.' },
  { code: 'SMR', name: 'Santa Marta', tagline: 'Tayrona. Sierra Nevada. Oldest city in Colombia.' },
  { code: 'ADZ', name: 'San Andrés', tagline: 'Caribbean island. Crystalline sea. Complete silence.' },
  { code: 'NCU', name: 'Nuquí', tagline: 'Ultra-remote. Pacific coast. Whale season.' },
];

export default function RoutesSection() {
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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="routes" ref={sectionRef} className="w-full py-32 md:py-40" style={{ background: '#0A0A0A' }}>
      <div className="max-w-[1100px] mx-auto px-6">

        {/* Header */}
        <div className="mb-20 will-reveal">
          <p className="klo-label oro mb-5" style={{ fontSize: '10px', letterSpacing: '0.35em' }}>Routes</p>
          <h2 className="klo-display text-white" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
            Colombia,<br />
            <span className="text-white/40">from anywhere.</span>
          </h2>
        </div>

        {/* Routes table */}
        <div className="mb-24 border-t will-reveal" style={{ borderColor: 'rgba(244,239,230,0.07)' }}>
          {ROUTES.map((route, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] gap-4 py-7 border-b items-center group hover:bg-white/[0.015] transition-colors duration-500 px-2 -mx-2"
              style={{ borderColor: 'rgba(244,239,230,0.07)' }}
            >
              {/* Route */}
              <div className="flex items-center gap-4">
                <div>
                  <span className="klo-display text-white text-xl">{route.from}</span>
                  <span className="klo-label text-white/25 ml-2" style={{ fontSize: '9px' }}>{route.fromCode}</span>
                </div>
                <span className="w-8 h-[1px] opacity-30 bg-primary" />
                <div>
                  <span className="klo-display text-white text-xl">{route.to}</span>
                  <span className="klo-label text-white/25 ml-2" style={{ fontSize: '9px' }}>{route.toCode}</span>
                </div>
              </div>

              {/* Note */}
              <p className="klo-body text-white/30 text-sm hidden md:block">{route.note}</p>

              {/* Duration */}
              <p className="klo-label text-white/40 whitespace-nowrap" style={{ fontSize: '10px' }}>{route.duration}</p>

              {/* Type */}
              <p className="klo-label text-right whitespace-nowrap text-primary" style={{ fontSize: '9px', letterSpacing: '0.15em' }}>
                {route.type}
              </p>
            </div>
          ))}
        </div>

        {/* Destinations grid */}
        <div className="will-reveal mb-10">
          <p className="klo-label text-white/30 mb-10" style={{ fontSize: '10px', letterSpacing: '0.35em' }}>
            Destinations
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px stagger" style={{ background: 'rgba(244,239,230,0.06)' }}>
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.code}
              className="will-reveal p-8 md:p-10 flex flex-col gap-3 group hover:bg-white/[0.03] transition-colors duration-700 cursor-default"
              style={{ background: '#0A0A0A' }}
            >
              <span className="klo-label oro" style={{ fontSize: '10px', letterSpacing: '0.20em' }}>{dest.code}</span>
              <h3 className="klo-display text-white" style={{ fontSize: '28px' }}>{dest.name}</h3>
              <p className="klo-body text-white/30 text-sm leading-relaxed">{dest.tagline}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
