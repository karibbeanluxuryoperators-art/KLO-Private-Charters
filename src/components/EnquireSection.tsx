import FlightInquiryChat from './FlightInquiryChat';
import { useEffect, useRef } from 'react';

export default function EnquireSection() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="enquire" ref={sectionRef} className="w-full py-24 md:py-32" style={{ background: '#080808' }}>
      <div className="max-w-[1100px] mx-auto px-6">

        {/* Header */}
        <div className="mb-16 will-reveal text-center" style={{ maxWidth: '560px', margin: '0 auto 64px' }}>
          <p className="klo-label oro mb-5" style={{ fontSize: '10px', letterSpacing: '0.35em' }}>Enquire</p>
          <h2 className="klo-display text-white mb-5" style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}>
            Begin your voyage.
          </h2>
          <p className="klo-body text-white/35 text-base">
            Speak with Maria — KLO's charter advisor. She'll take your details and
            you'll have a full proposal in your inbox within 24 hours.
          </p>
        </div>

        {/* Chat — full height within section */}
        <div
          className="will-reveal w-full mx-auto"
          style={{ maxWidth: '760px', height: '620px' }}
        >
          <FlightInquiryChat className="h-full" />
        </div>

        {/* WhatsApp alternative */}
        <div className="will-reveal mt-10 text-center">
          <p className="klo-body text-white/25 text-sm">
            Prefer WhatsApp?{' '}
            <a
              href="https://wa.me/1YOURNUMBERHERE"
              target="_blank"
              rel="noopener noreferrer"
              className="oro hover:text-white/70 transition-colors duration-300"
            >
              Message Maria directly →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
