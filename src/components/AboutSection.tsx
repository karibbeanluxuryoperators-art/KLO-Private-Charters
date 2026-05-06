import { useEffect, useRef } from 'react';

const PILLARS = [
  {
    number: '01',
    title: 'Colombia First',
    body: 'We started where we know best — Colombia. Cartagena, Bogotá, Medellín, the remote Pacific coast. We know the FBOs, the controllers, the seasonality. That knowledge is in every arrangement we make.',
  },
  {
    number: '02',
    title: 'One Point of Contact',
    body: 'You speak to one person from enquiry to wheels-up. No call centres. No ticket numbers. A single advisor who knows your trip and takes personal responsibility for it.',
  },
  {
    number: '03',
    title: 'Proposal Within 24 Hours',
    body: 'When you enquire, you receive a tailored proposal — not a price list. Aircraft options, routing, inclusions, crew profile. Complete and specific to your dates and party.',
  },
];

export default function AboutSection() {
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
    <section id="about" ref={sectionRef} className="w-full py-32 md:py-40" style={{ background: '#0A0A0A' }}>
      <div className="max-w-[1100px] mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — statement */}
          <div className="will-reveal">
            <p className="klo-label oro mb-6" style={{ fontSize: '10px', letterSpacing: '0.35em' }}>About KLO</p>
            <h2 className="klo-display text-white mb-8" style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}>
              Private aviation,<br />
              <span className="italic text-white/50">arranged properly.</span>
            </h2>
            <p className="klo-body text-white/40 mb-6 text-base" style={{ maxWidth: '380px' }}>
              KLO was built for clients who have flown private before and know the difference between a broker who finds a price and an advisor who arranges an experience.
            </p>
            <p className="klo-body text-white/30 text-sm" style={{ maxWidth: '380px' }}>
              We are not a marketplace. We are not a search engine. We are a small team with deep knowledge of Colombian aviation and the relationships to back it up.
            </p>

            {/* Signature line */}
            <div className="mt-12 pt-8 border-t flex items-center gap-5" style={{ borderColor: 'rgba(244,239,230,0.07)' }}>
              <div className="hairline opacity-40" style={{ height: '32px' }} />
              <div>
                <p className="klo-display text-white/70 italic" style={{ fontSize: '18px' }}>Juan Carlos Molina</p>
                <p className="klo-label text-white/25 mt-1" style={{ fontSize: '9px', letterSpacing: '0.20em' }}>Founder · KLO Private Charters</p>
              </div>
            </div>
          </div>

          {/* Right — pillars */}
          <div className="flex flex-col gap-10 stagger">
            {PILLARS.map((pillar) => (
              <div key={pillar.number} className="will-reveal">
                <div className="flex items-start gap-6">
                  <span className="klo-label oro opacity-50 mt-1" style={{ fontSize: '10px', minWidth: '20px' }}>
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="klo-display text-white mb-3" style={{ fontSize: '22px' }}>{pillar.title}</h3>
                    <p className="klo-body text-white/35 text-sm leading-relaxed">{pillar.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
