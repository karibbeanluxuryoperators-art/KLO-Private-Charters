/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Plane, Crown, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDb } from '@/src/lib/firebase';
import { Message } from '@/src/types';
import { cn } from '@/lib/utils';
import { chatWithConcierge } from '@/src/services/geminiService';
import { toast } from "sonner";

export default function FlightInquiryChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<{ role: "user" | "model", parts: { text: string }[] }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Greeting
    const startChat = async () => {
      setIsTyping(true);
      const greeting = "Welcome to KLO. / Bienvenido a KLO. / Bem-vindo à KLO.\n\nI am your Personal Concierge. To begin orchestrating your mission, please state your current location and desired destination.";
      setMessages([{ id: 'init', role: 'assistant', content: greeting, timestamp: new Date() }]);
      setHistory([{ role: 'model', parts: [{ text: greeting }] }]);
      setIsTyping(false);
    };
    startChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const scroll = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      };
      
      // Execute immediately and then after a short delay for animation/render completion
      scroll();
      const timeoutId = setTimeout(scroll, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping || isComplete) return;

    const userText = inputValue;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userText, timestamp: new Date() };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const newHistory = [...history, { role: 'user' as const, parts: [{ text: userText }] }];
    setHistory(newHistory);

    try {
      const responseText = await chatWithConcierge(newHistory);
      
      // Improved JSON detection and cleaning
      let content = responseText || '';
      let extractedData = null;

      // Match JSON block including possible markdown wrappers
      const jsonMatch = responseText?.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        try {
          extractedData = JSON.parse(jsonMatch[0]);
          
          // Clean the content by removing the JSON block and its potential markdown wrappers
          const pattern = /```(?:json)?\s*\{[\s\S]*?\}\s*```|\{[\s\S]*?\}/g;
          content = responseText.replace(pattern, '').trim();
          
          // Only mark as complete if we successfully parsed valid JSON 
          // AND it has the most critical fields (to avoid premature locking with partial JSON)
          const hasRequired = extractedData.origin_airport && extractedData.destination_airport && extractedData.client_name;
          
          if (hasRequired) {
            await saveInquiry(extractedData);
            setIsComplete(true);
          }
        } catch (e) {
          console.error("JSON parse/save error:", e);
          // If JSON is invalid or incomplete, just show the full text to avoid "cutting off" something useful
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
      toast.success("Solicitud procesada / Request processed");
    } catch (e) {
      console.error("Error saving inquiry:", e);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col min-h-0 glass backdrop-blur-2xl border-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.9)] bg-black/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.08),transparent_50%)] pointer-events-none" />
      
      <div className="p-3 sm:p-4 border-b border-white/5 flex items-center justify-between z-10 bg-black/40 backdrop-blur-md flex-none">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center justify-center border border-primary/20 w-10 h-10 sm:w-12 sm:h-12 rounded-sm bg-primary/5 font-serif text-xl sm:text-2xl select-none leading-none">
            <span className="text-white">K</span>
            <span className="text-primary italic -ml-[0.12em]">L</span>
            <span className="-ml-[0.08em] text-white">O</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-2xl font-serif tracking-[0.2em] text-white font-medium uppercase leading-tight">Karibbean</h2>
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-4 bg-primary/40" />
              <p className="text-[7px] sm:text-[9px] uppercase tracking-[0.6em] text-primary font-display font-medium">Luxury Operators</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5 sm:gap-1">
           <div className="flex items-center gap-1.5">
             <div className="w-1 h-1 rounded-full bg-primary/60" />
             <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] text-white/30 font-display">Terminal 01</span>
           </div>
           <span className="text-[6px] sm:text-[8px] uppercase tracking-[0.3em] text-primary/40 font-display">MMXXIV</span>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 sm:px-8 py-3 sm:py-4 z-10" viewportRef={scrollRef}>
        <div className="space-y-4 sm:space-y-6 pb-2">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex flex-col gap-3",
                  message.role === 'user' ? "items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "flex items-center gap-2 mb-1",
                  message.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}>
                   <p className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-display">
                    {message.role === 'user' ? "Inquiry Client" : "Personal Concierge"}
                   </p>
                </div>
                <div
                  className={cn(
                    "p-5 rounded-sm text-[15px] leading-relaxed max-w-[80%] transition-shadow duration-500",
                    message.role === 'user' 
                      ? "bg-primary text-black font-medium shadow-[0_10px_30px_rgba(197,160,89,0.2)]" 
                      : "bg-white/[0.03] text-white/90 border border-white/5 font-light font-display tracking-wide"
                  )}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-primary/40 text-[9px] uppercase tracking-[0.3em] font-display pl-2">
              <span className="flex gap-1">
                <span className="w-1 h-1 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-1 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
              Typing
            </motion.div>
          )}
          {isComplete && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.98 }} 
               animate={{ opacity: 1, scale: 1 }}
               className="p-10 border border-primary/20 bg-primary/5 text-center mt-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <div className="w-12 h-[1px] bg-primary/40 mx-auto mb-6" />
                <h3 className="font-serif italic text-2xl text-primary mb-2">Flight Registered</h3>
                <p className="text-white/60 text-sm font-light tracking-wide max-w-xs mx-auto">Your private aviation mission is being prioritized by our logistics team.</p>
                <div className="w-12 h-[1px] bg-primary/40 mx-auto mt-6" />
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      <div className="p-2 sm:p-4 border-t border-white/5 bg-black/60 backdrop-blur-xl z-20 flex-none">
        <div className="flex gap-2 sm:gap-4 items-center">
          <div className="flex-1 relative group">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="REQUIREMENTS..."
              className="w-full h-10 sm:h-12 bg-transparent border-white/10 text-white placeholder:text-white/10 focus-visible:ring-primary/20 rounded-none px-0 border-x-0 border-t-0 border-b transition-all duration-500 focus:border-primary/50 text-xs sm:text-sm tracking-widest font-light font-display"
              disabled={isComplete || isTyping}
            />
          </div>
          <Button 
            onClick={handleSend} 
            disabled={isComplete || isTyping || !inputValue.trim()}
            variant="ghost"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-none hover:bg-transparent hover:text-primary transition-all group"
          >
            <Send className="w-4 h-4 sm:w-5 h-5 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

