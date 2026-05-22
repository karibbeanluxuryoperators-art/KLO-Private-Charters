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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const SUGGESTED_PROMPTS = [
    {
      label: "Miami → Cartagena",
      prompt: "I'd like to arrange a private flight from Miami to Cartagena for 4 people in December."
    },
    {
      label: "New York → Bogotá",
      prompt: "We need a private jet from New York to Bogotá for 8 passengers in March."
    },
    {
      label: "Bogotá → Medellín",
      prompt: "Looking for a domestic private flight from Bogotá to Medellín this weekend, 2 passengers."
    },
  ];

  useEffect(() => {
    const greeting =
      "Welcome to KLO. / Bienvenido a KLO. / Bem-vindo à KLO.\n\nI am your Personal Concierge. To begin orchestrating your journey, please share your departure and destination.";

    setMessages([
      {
        id: 'init',
        role: 'assistant',
        content: greeting,
        timestamp: new Date()
      }
    ]);

    setHistory([
      {
        role: 'model',
        parts: [{ text: greeting }]
      }
    ]);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, isTyping]);

  const handleSend = async (customValue?: string) => {
    const textToSend = customValue || inputValue;

    if (!textToSend.trim() || isTyping || isComplete) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    setInputValue('');
    setIsTyping(true);

    const newHistory = [
      ...history,
      {
        role: 'user' as const,
        parts: [{ text: textToSend }]
      }
    ];

    setHistory(newHistory);

    try {
      const responseText = await chatWithConcierge(newHistory);

      let content = responseText || '';
      let extractedData = null;

      // Detect JSON
      const jsonMatch = responseText?.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        try {
          extractedData = JSON.parse(jsonMatch[0]);

          // Remove JSON from visible UI
          content = responseText
            .replace(jsonMatch[0], '')
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

          // Fallback confirmation
          if (!content || content.length < 5) {
            content =
              "Perfect. I have everything I need. Our concierge team will contact you shortly with your tailored charter proposal.";
          }

         const hasRequired =
            extractedData.email &&
            extractedData.phone &&
            extractedData.origin_airport &&
            extractedData.destination_airport &&
            extractedData.departure_date &&
            extractedData.passengers;

          if (hasRequired) {
            setCollectedInquiry(extractedData);

            await saveInquiry(extractedData);

            // IMPORTANT:
            // Delay completion so message renders first
            setTimeout(() => {
              setIsComplete(true);
            }, 1200);
          }

        } catch (e) {
          console.error("JSON parse/save error:", e);

          content =
            "Perfect. I have everything I need. Our concierge team will contact you shortly with your tailored charter proposal.";
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content,
        timestamp: new Date()
      };

      // IMPORTANT:
      // Render assistant message BEFORE completion state
      setMessages(prev => [...prev, assistantMessage]);

      setHistory([
        ...newHistory,
        {
          role: 'model',
          parts: [{ text: responseText || '' }]
        }
      ]);

    } catch (error) {
      console.error(error);

      toast.error(
        "Connection interrupted / Conexión interrumpida"
      );

    } finally {
      setIsTyping(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const saveInquiry = async (data: any) => {
    try {
      const database = await getDb();

      await addDoc(
        collection(database, 'inquiries'),
        {
          ...data,
          status: 'pending',
          createdAt: serverTimestamp(),
        }
      );

      toast.success(
        "Inquiry received — our concierge team will contact you shortly."
      );

    } catch (e) {
      console.error("Error saving inquiry:", e);
    }
  };

  return (
    <Card
      className={cn(
        "w-full h-full flex flex-col min-h-0 glass border-white/[0.05] shadow-[0_64px_160px_rgba(0,0,0,1)] bg-black/40 relative overflow-hidden rounded-none",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-primary)/0.03,transparent_70%)] pointer-events-none" />

      {/* Top gold hairline */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20" />

      {/* HEADER */}
      <div className="p-5 sm:p-6 border-b border-white/[0.05] flex items-center justify-between z-10 bg-black/40 backdrop-blur-2xl flex-none">

        <div className="flex items-center gap-4">
          <div className="w-1 h-1 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)/0.6]" />

          <div className="space-y-0.5">
            <h2 className="klo-label text-white/90" style={{ fontSize: '11px', letterSpacing: '0.35em' }}>
              Maria — KLO Advisor
            </h2>

            <p className="klo-label text-white/25" style={{ fontSize: '8px', letterSpacing: '0.20em' }}>
              Private Aviation Concierge
            </p>
          </div>
        </div>

        <Badge
          variant="outline"
          className="text-[9px] border-primary/20 text-primary/70 px-3 py-1 rounded-none klo-label tracking-[0.25em] bg-primary/5"
        >
          {isComplete ? "CONCLUDED" : "ESTABLISHING"}
        </Badge>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-12 py-8 sm:py-12 z-10">

        <div className="space-y-8 sm:space-y-12 pb-6 max-w-2xl mx-auto">

          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{
                  opacity: 0,
                  y: 16,
                  filter: 'blur(10px)'
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)'
                }}
                transition={{
                  duration: 1.0,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={cn(
                  "flex flex-col gap-3",
                  message.role === 'user'
                    ? "items-end text-right"
                    : "items-start text-left"
                )}
              >
                <div
                  className={cn(
                    "max-w-[92%] sm:max-w-[85%] rounded-none p-5 sm:p-6",
                    message.role === 'user'
                      ? "bg-primary/[0.02] border border-primary/10 text-white/90"
                      : "bg-white/[0.015] border border-white/5 text-white/80"
                  )}
                >
                  <p className="klo-display text-base sm:text-lg leading-relaxed tracking-wide italic font-light whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>

                <span className="klo-label text-[8px] sm:text-[9px] text-white/15 px-1" style={{ letterSpacing: '0.25em' }}>
                  {message.role === 'user'
                    ? "Client"
                    : "Concierge"} •{" "}
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="klo-label text-primary/40 text-[9px] flex items-center gap-3"
              style={{ letterSpacing: '0.45em' }}
            >
              <div className="flex gap-1.5">
                <span className="w-0.5 h-0.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-0.5 h-0.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-0.5 h-0.5 bg-primary/40 rounded-full animate-bounce" />
              </div>

              Transmission
            </motion.div>
          )}

          {messages.length === 1 && !isTyping && (
            <motion.div
              initial={{
                opacity: 0,
                y: 12
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex flex-wrap gap-4 pt-8"
            >
              {SUGGESTED_PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.prompt)}
                  className="klo-label text-[9px] px-6 py-3 border border-white/5 bg-white/[0.01] hover:bg-primary/[0.05] hover:border-primary/20 transition-all duration-700 text-white/30 hover:text-white rounded-none"
                  style={{ letterSpacing: '0.35em' }}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}

          {/* FINAL CONFIRMATION CARD */}
          {isComplete && collectedInquiry && (
            <motion.div
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="mt-20 relative group"
            >
              <div className="absolute -inset-8 bg-primary/5 blur-3xl opacity-40 transition-opacity duration-1000 group-hover:opacity-60" />

              <div className="relative border border-primary/15 bg-black/60 p-10 sm:p-16 text-center backdrop-blur-3xl rounded-none">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 bg-black border border-primary/20 text-primary klo-label text-[8px] py-1.5" style={{ letterSpacing: '0.6em' }}>
                  Confirmed Manifest
                </div>

                <h3 className="klo-display italic text-4xl sm:text-5xl text-primary mb-14 opacity-90">
                  Bon Voyage
                </h3>

                <div className="space-y-6">
                  <p className="klo-label text-white/30 text-[9px] max-w-sm mx-auto leading-relaxed" style={{ letterSpacing: '0.45em' }}>
                    Your concierge request has been received. A tailored proposal is now being prepared for {collectedInquiry.email}.
                  </p>

                  <div className="w-16 h-[1px] bg-primary/15 mx-auto" />

                  <p className="klo-label text-[8px] text-primary/30" style={{ letterSpacing: '0.7em' }}>
                    Priority Concierge Active
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT */}
      <div className="p-8 sm:p-12 border-t border-white/[0.05] z-10 bg-black/60 backdrop-blur-xl shadow-[0_-32px_80px_rgba(0,0,0,0.4)] flex-none">

        <div className="max-w-xl mx-auto flex flex-col gap-6">

          <div className="relative group">

            {!inputValue && !isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 klo-label text-[10px] sm:text-[11px] text-white/10 pointer-events-none"
                style={{ letterSpacing: '0.45em' }}
              >
                Where would you like to fly?
              </motion.div>
            )}

            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleSend()
              }
              className="w-full h-14 bg-transparent border-white/5 text-white placeholder:text-transparent focus-visible:ring-0 rounded-none px-0 border-x-0 border-t-0 border-b border-white/[0.08] transition-all duration-1000 focus:border-primary/50 text-[18px] sm:text-[20px] klo-display italic font-light outline-none"
              style={{ letterSpacing: '0.05em' }}
              disabled={isComplete || isTyping}
            />
          </div>

          <div className="flex justify-between items-center klo-label text-[8px] text-white/15" style={{ letterSpacing: '0.5em' }}>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white/10" />
              Encrypted Connection
            </span>
            <span>MMXXVI</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
