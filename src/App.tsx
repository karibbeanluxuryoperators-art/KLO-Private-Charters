import { Toaster } from 'sonner';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import RoutesSection from './components/RoutesSection';
import FleetSection from './components/FleetSection';
import AboutSection from './components/AboutSection';
import EnquireSection from './components/EnquireSection';
import Footer from './components/Footer';
import FlightInquiryChat from './components/FlightInquiryChat';

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const isChatOnly = urlParams.get('chat') === '1';

  if (isChatOnly) {
    return (
      <div className="h-screen w-screen bg-[#0A1518] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl h-[90vh]">
          <FlightInquiryChat />
        </div>
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

  return (
    <div className="bg-[#0A1518] min-h-screen text-white selection:bg-[#B8963E]/30">
      <NavBar />

      <main>
        <HeroSection />
        <RoutesSection />
        <FleetSection />
        <AboutSection />
        <EnquireSection />
      </main>

      <Footer />

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
