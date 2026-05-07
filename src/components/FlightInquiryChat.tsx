/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDb } from '@/src/lib/firebase';
import { Message } from '@/src/types';
import { cn } from '@/lib/utils';
import { chatWithConcierge } from '@/src/services/geminiService';
import { toast } from "sonner";

interface FlightInquiryChatProps {
  className?: string;
}

export default function FlightInquiryChat({ className }: FlightInquiryChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<{ role: "user" | "model", parts: { text: string }[] }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [collectedInquiry, setCollectedInquiry] = useState<any>(null);
  
  // Anchor div at bottom of message list — scrollIntoView is bulletproof
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SUGGESTED_PROMPTS = [
    { label: "Miami → Cartagena", prompt: "I'd like to arrange a private flight from Miami to Cartagena for 4 people in December." },
    { label: "New York → Bogotá", prompt: "We need a private jet from New York to Bogotá for 8 passengers in March." },
    { label: "Bogotá → Medellín", prompt: "Looking for a domestic private flight from Bogotá to Medellín this weekend, 2 passengers." },
  ];

  useEffect(() => {
    const startChat = async () => {
      setIsTyping(true);
      const greeting = "Welcome to KLO. / Bienvenido a KLO. / Bem-vindo à KLO.\n\nI am your Personal Concierge. To begin orchestrating your mission, please state your current location and desired destination.";
      setMessages([{ id: 'init', role: 'assistant', content: greeting, timestamp: new Date() }]);
      setHistory([{ role: 'model', parts: [{ text: greeting }] }]);
      setIsTyping(false);
    };
    startChat();
  }, []);

  // Scroll to bottom whenever messages change or typing indicator appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (customValue?: string) => {
    const textToSend = customValue || inputValue;
    if (!textToSend.trim() || isTyping || isComplete) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: textToSend, timestamp: new Date() };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const newHistory = [...history, { role: 'user' as const, parts: [{ text: textToSend }] }];
    setHistory(newHistory);

    try {
      const responseText = await chatWithConcierge(newHistory);
      
      let content = responseText || '';
      let extractedData = null;

      const jsonMatch = responseText?.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        try {
          extractedData = JSON.parse(jsonMatch[0]);
          const pattern = /```(?:json)?\s*\{[\s\S]*?\}\s*```|\{[\s\S]*?\}/g;
          content = responseText.replace(pattern, '').trim();
          
          const hasRequired = extractedData.origin_airport && extractedData.destination_airport && extractedData.client_name;
          
          if (hasRequired) {
            setCollectedInquiry(extractedData);
            await saveInquiry(extractedData);
            setIsComplete(true);
          }
        } catch (e) {
          console.error("JSON parse/save error:", e);
          content = responseText || '';
        }
      }

      const assistantMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: content, 
        timestamp: new Date() 
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setHistory([...newHistory, { role: 'model', parts: [{ text: responseText || '' }] }]);
    } catch (error) {
      console.error(error);
      toast.error("Conexión interrumpida / Connection error");
    } finally {
      setIsTyping(false);
    }
  };

  const saveInquiry = async (data: any) => {
    try {
      const database = await getDb();
      await addDoc(collection(database, 'inquiries'), {
        ...data,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      toast.success("Enquiry received — we will be in touch.");
    } catch (e) {
      console.error("Error saving inquiry:", e);
    }
  };

  return (
    <Card className={cn("w-full h-full flex flex-col min-h-0 glass border-white/[0.03] shadow-[0_48px_140px_rgba(0,0,0,1)] bg-black/50 relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.04),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-30" />
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/[0.03] flex items-center justify-between z-10 bg-black/60 backdrop-blur-xl flex-none">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(197,160,89,0.5)]" />
          <div className="space-y-0.5">
            <h2 className="text-[10px] sm:text-[11px] font-display tracking-[0.3em] text-white/90 uppercase font-medium">Maria — KLO Advisor</h2>
            <p className="text-[8px] tracking-[0.1em] text-white/30 uppercase font-display">Colombia Private Charters</p>
          </div>
        </div>
        <Badge variant="outline" className="text-[9px] border-primary/20 text-primary/80 px-2.5 py-0.5 rounded-none font-display tracking-widest bg-primary/5">
          {isComplete ? "CONCLUDED" : "ESTABLISHING"}
        </Badge>
      </div>

      {/* Messages — plain div with overflow-y scroll, flex-1 so it fills space */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-10 py-6 sm:py-8 z-10">
        <div className="space-y-6 sm:space-y-8 pb-4 max-w-2xl mx-auto">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex flex-col gap-2",
                  message.role === 'user' ? "items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "max-w-[90%] sm:max-w-[80%] rounded-none p-4 sm:p-5",
                  message.role === 'user' 
                    ? "bg-primary/[0.03] border border-primary/10 text-white/90 font-light" 
                    : "bg-white/[0.02] border border-white/5 text-white/80 font-light"
                )}>
                  <p className="text-xs sm:text-[13px] leading-relaxed tracking-wide font-light font-display whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-display text-white/20 px-1">
                  {message.role === 'user' ? "Client" : "Concierge"} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-primary/40 text-[9px] uppercase tracking-[0.4em] font-display flex items-center gap-2"
            >
              <div className="flex gap-1">
                <span className="w-0.5 h-0.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-0.5 h-0.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-0.5 h-0.5 bg-primary/40 rounded-full animate-bounce" />
              </div>
              Transmission
            </motion.div>
          )}

          {messages.length === 1 && !isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-3 pt-6"
            >
              {SUGGESTED_PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.prompt)}
                  className="text-[9px] uppercase tracking-[0.3em] px-5 py-2.5 border border-white/5 bg-white/[0.02] hover:bg-primary/[0.08] hover:border-primary/30 transition-all duration-500 text-white/40 hover:text-white rounded-none font-display font-medium"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}

          {isComplete && collectedInquiry && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.5 }}
               className="mt-16 relative group"
            >
              <div className="absolute -inset-4 bg-primary/5 blur-2xl opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />
              <div className="relative border border-primary/20 bg-black/40 p-8 sm:p-12 text-center backdrop-blur-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-black border border-primary/20 text-primary text-[8px] uppercase tracking-[0.5em] py-1 font-display">
                  Confirmed Manifesto
                </div>
                <h3 className="font-serif italic text-3xl sm:text-4xl text-primary mb-12 opacity-90">Bon Voyage</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-12 text-left max-w-xl mx-auto mb-16">
                  <div className="space-y-1.5">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-display font-bold">Client Identity</p>
                    <p className="text-sm text-white/90 font-light font-display tracking-wider truncate">{collectedInquiry.client_name}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-display font-bold">Capacity</p>
                    <p className="text-sm text-white/90 font-light font-display tracking-wider">{collectedInquiry.passengers} PAX</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-display font-bold">Registry Date</p>
                    <p className="text-sm text-white/90 font-light font-display tracking-wider">MMXXVI.V.V</p>
                  </div>
                  <div className="space-y-2 col-span-2 md:col-span-1 pt-4 md:pt-0">
                    <div className="flex items-center gap-4">
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-display font-bold">Origin</p>
                        <p className="text-xs text-primary/80 font-medium font-display tracking-widest">{collectedInquiry.origin_airport}</p>
                      </div>
                      <div className="w-8 h-[1px] bg-primary/20 mt-4" />
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-display font-bold">Target</p>
                        <p className="text-xs text-primary/80 font-medium font-display tracking-widest">{collectedInquiry.destination_airport}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-display font-bold">Departure Window</p>
                    <p className="text-sm text-white/90 font-light font-display tracking-wider italic">{collectedInquiry.departure_date}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-white/30 text-[9px] font-display uppercase tracking-[0.4em] max-w-sm mx-auto leading-relaxed">
                    Logistic protocols initiated. A bespoke itinerary is being prepared for {collectedInquiry.email}.
                  </p>
                  <div className="w-12 h-[1px] bg-primary/20 mx-auto" />
                  <p className="text-[8px] uppercase tracking-[0.6em] text-primary/40 font-display">Priority Clearance</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Invisible anchor — always scrolled into view after new messages */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-6 sm:p-10 border-t border-white/[0.03] z-10 bg-black/60 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] flex-none">
        <div className="max-w-xl mx-auto flex flex-col gap-4">
          <div className="relative group">
            {!inputValue && !isComplete && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] sm:text-[11px] text-white/10 uppercase tracking-[0.4em] font-display pointer-events-none"
              >
                Where are you flying from?
              </motion.div>
            )}
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full h-12 bg-transparent border-white/5 text-white placeholder:text-transparent focus-visible:ring-0 rounded-none px-0 border-x-0 border-t-0 border-b-2 transition-all duration-700 focus:border-primary/40 text-[16px] sm:text-[15px] tracking-widest font-light font-display outline-none"
              disabled={isComplete || isTyping}
            />
          </div>
          <div className="flex justify-between items-center text-[8px] uppercase tracking-[0.4em] text-white/20 font-display font-medium">
            <span>Encrypted Connection</span>
            <span>MMXXVI</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
