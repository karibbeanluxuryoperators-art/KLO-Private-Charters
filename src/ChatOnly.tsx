import FlightInquiryChat from './components/FlightInquiryChat';

export default function ChatOnly() {
  return (
    <div className="h-screen w-screen bg-[#0A1518] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[80vh]">
        <FlightInquiryChat />
      </div>
    </div>
  );
}
