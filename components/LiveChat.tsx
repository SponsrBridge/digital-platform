
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Zap, Loader2, User, Bot, Headset, CheckCircle, Mail, UserCircle } from 'lucide-react';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

interface UserData {
  name: string;
  email: string;
}

const KNOWLEDGE_BASE = `
SponsrBridge Knowledge Base:
- Core Purpose: A strategic sponsorship revenue consultancy that operates as an embedded commercial team for B2B conferences.
- Philosophy: Sponsorship is a revenue system, not a sales function. We believe in outcome-led design and performance-aligned partnerships.
- Service Models:
  1. Full-Service Management: End-to-end ownership. Best for organisers without dedicated in-house resources.
  2. Sales Execution Partnership: Dedicated sales expertise to convert existing pipelines. Best for those with a strategy but no bandwidth.
  3. Strategic Commercial Advisory: Senior guidance for in-house teams. Best for teams needing strategic direction.
- Process: Discovery Call (45 mins), Proposal, Onboarding, Execution, and Structured Reporting.
- Pricing: Full-service is a performance-based fee + retainer. Advisory is retainer-based.
- Target Industries: Tech, Finance, Healthcare, Energy, Manufacturing, HR.
`;

const transferToLiveAgentDeclaration: FunctionDeclaration = {
  name: 'transferToLiveAgent',
  parameters: {
    type: Type.OBJECT,
    description: 'Call this function if the user asks a question outside the knowledge base or explicitly requests a human agent.',
    properties: {
      reason: {
        type: Type.STRING,
        description: 'The reason for transferring to a live agent.',
      },
    },
    required: ['reason'],
  },
};

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBoarded, setIsBoarded] = useState(false);
  const [userData, setUserData] = useState<UserData>({ name: '', email: '' });
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'model',
      text: "Hello. I'm the SponsrBridge Commercial Strategist. How can I help you transform your conference sponsorship revenue today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHandedOver, setIsHandedOver] = useState(false);
  
  const chatRef = useRef<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session with KB and Tools
  const initChat = () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatRef.current = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `You are the SponsrBridge Commercial Strategist assistant for ${userData.name} (${userData.email}). 
        Use this Knowledge Base to answer questions: ${KNOWLEDGE_BASE}
        
        Guidelines:
        - Be professional, authoritative, and consultative.
        - If a question is NOT answerable by the knowledge base, or if the user asks for a person, call 'transferToLiveAgent'.
        - Keep responses concise and insightful.`,
        tools: [{ functionDeclarations: [transferToLiveAgentDeclaration] }],
      },
    });
  };

  useEffect(() => {
    if (isBoarded && !chatRef.current) {
      initChat();
    }
  }, [isBoarded]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading, isBoarded]);

  const handleOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.email.includes('@')) {
      setIsBoarded(true);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading || isHandedOver) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMessage.text });
      
      // Check for function calls (Handover)
      if (response.functionCalls && response.functionCalls.length > 0) {
        const handoverCall = response.functionCalls.find((fc: any) => fc.name === 'transferToLiveAgent');
        if (handoverCall) {
          setIsHandedOver(true);
          setMessages(prev => [...prev, {
            id: 'handover',
            role: 'system',
            text: "Requesting human intervention...",
            timestamp: new Date()
          }]);
          return;
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: 'error',
        role: 'model',
        text: "I apologize, but I'm having trouble connecting to the commercial database. Please try again or contact hello@sponsrbridge.io.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative transition-all duration-300 ${
          isOpen ? 'bg-brand-navy border border-brand-teal text-brand-teal' : 'bg-brand-teal text-brand-navy'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
              <Zap size={24} className="fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: -12, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[320px] md:w-[400px] h-[550px] bg-brand-card/95 backdrop-blur-xl border border-brand-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-brand-border flex justify-between items-center bg-brand-navy/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-teal/10 flex items-center justify-center border border-brand-teal/30">
                  <Zap size={16} className="text-brand-teal fill-current" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-white">
                    {isHandedOver ? 'Connecting to Agent' : 'Strategy Assistant'}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isHandedOver ? 'bg-brand-blue' : 'bg-brand-teal'}`} />
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${isHandedOver ? 'text-brand-blue' : 'text-brand-teal'}`}>
                      {isHandedOver ? 'Priority Queue' : 'Online'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!isBoarded ? (
              /* Onboarding Form */
              <div className="flex-grow p-8 flex flex-col justify-center bg-brand-navy/30">
                <div className="text-center mb-8">
                    <UserCircle className="w-12 h-12 text-brand-teal mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-brand-white">Identity Verification</h3>
                    <p className="text-xs text-brand-muted mt-2">Please provide your details to access our commercial strategy database.</p>
                </div>
                <form onSubmit={handleOnboarding} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-brand-muted font-bold flex items-center gap-2">
                        <User size={12} className="text-brand-teal" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      className="w-full bg-brand-navy border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-white focus:border-brand-teal focus:outline-none transition-colors"
                      placeholder="Jane Cooper"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-brand-muted font-bold flex items-center gap-2">
                        <Mail size={12} className="text-brand-teal" /> Work Email
                    </label>
                    <input 
                      type="email" 
                      required
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="w-full bg-brand-navy border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-white focus:border-brand-teal focus:outline-none transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-teal text-brand-navy font-bold py-4 rounded-xl shadow-lg mt-4 flex items-center justify-center gap-2"
                  >
                    Authenticate & Enter
                  </motion.button>
                </form>
              </div>
            ) : isHandedOver ? (
              /* Handover State */
              <div className="flex-grow p-8 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center border border-brand-blue/30 relative">
                    <Headset className="w-10 h-10 text-brand-blue" />
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-brand-blue rounded-full -z-10"
                    />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-brand-white">Connecting with a Strategist</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">
                        I've shared your request and profile ({userData.name}) with our live team. A commercial partner will review your context and respond shortly.
                    </p>
                </div>
                <div className="pt-6 border-t border-brand-border w-full">
                    <p className="text-xs text-brand-muted mb-4 italic">High volume? Skip the queue:</p>
                    <button 
                        onClick={() => window.location.href='#contact'}
                        className="w-full bg-brand-teal text-brand-navy font-bold py-3 rounded-xl"
                    >
                        Book a Discovery Call
                    </button>
                </div>
              </div>
            ) : (
              /* Chat State */
              <>
                <div
                  ref={scrollAreaRef}
                  data-lenis-prevent
                  className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-brand-border scrollbar-track-transparent"
                >
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                          msg.role === 'user' ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue' : 'bg-brand-teal/10 border-brand-teal/30 text-brand-teal'
                        }`}>
                          {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-brand-blue text-brand-white rounded-tr-none' 
                            : 'bg-brand-navy border border-brand-border text-brand-text rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border bg-brand-teal/10 border-brand-teal/30 text-brand-teal">
                          <Bot size={16} />
                        </div>
                        <div className="p-3 rounded-2xl bg-brand-navy border border-brand-border rounded-tl-none flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 bg-brand-teal/40 rounded-full animate-bounce" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <form 
                  onSubmit={handleSend}
                  className="p-4 bg-brand-navy/50 border-t border-brand-border flex items-center gap-2"
                >
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your revenue strategy..."
                    className="flex-grow bg-brand-navy border border-brand-border rounded-xl px-4 py-2 text-sm text-brand-white focus:border-brand-teal focus:outline-none placeholder-brand-muted transition-colors"
                    disabled={isLoading}
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-xl transition-all ${
                      !input.trim() || isLoading 
                        ? 'text-brand-muted bg-brand-border cursor-not-allowed' 
                        : 'text-brand-navy bg-brand-teal'
                    }`}
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveChat;
