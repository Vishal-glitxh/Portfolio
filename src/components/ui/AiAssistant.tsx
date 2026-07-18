"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Bot, Sparkles } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  isStreaming?: boolean;
}

const KNOWLEDGE: Record<string, string> = {
  "Who is Vishal?": "Vishal Suhas is an Artificial Intelligence & Machine Learning engineering student at VTU (expected graduation 2028). He is a passionate Python developer, full-stack developer, and cybersecurity enthusiast dedicated to building intelligent, secure software solutions.",
  "Skills": "Vishal's skills span Programming (Python, Java, C, C++), Frontend (HTML5, React.js, Next.js), Backend (Node.js, Express.js, Flask), Databases (MongoDB, MySQL, SQLite, Prisma ORM), Data Science (NumPy, Pandas, Scikit-learn, Power BI), AI (Machine Learning, Deep Learning, NLP, Computer Vision, AI Ethics), and Cybersecurity Fundamentals.",
  "Projects": "Featured projects: \n1. AI Question Predictor: An NLP semantic-match study companion predicting examination patterns using similarity analysis. \n2. Intelligence Development Platform (IDP): An employee analytics board visualizing workforce skills via the 9-Box Talent Matrix.",
  "Education": "Currently pursuing a Bachelor of Engineering in Artificial Intelligence & Machine Learning at Visvesvaraya Technological University (VTU). Expected graduation is in 2028.",
  "Contact": "Email: vishalsuhas0662@gmail.com \nLinkedIn: linkedin.com/in/vishalsuhas \nGitHub: github.com/Vishal-glitxh \nLocation: Bangalore, Karnataka, India",
};

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! I am Vishal's AI Assistant. Ask me anything about his skills, projects, or education." },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const streamResponse = (question: string, fullText: string) => {
    setIsTyping(true);
    
    // Setup initial empty bot response for streaming
    setMessages((prev) => [...prev, { sender: "bot", text: "", isStreaming: true }]);

    let currentLength = 0;
    const interval = setInterval(() => {
      currentLength += Math.min(3, fullText.length - currentLength);
      const partialText = fullText.slice(0, currentLength);
      
      setMessages((prev) => {
        const copy = [...prev];
        const lastMsg = copy[copy.length - 1];
        if (lastMsg && lastMsg.sender === "bot" && lastMsg.isStreaming) {
          lastMsg.text = partialText;
        }
        return copy;
      });

      if (currentLength >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
        setMessages((prev) => {
          const copy = [...prev];
          const lastMsg = copy[copy.length - 1];
          if (lastMsg) lastMsg.isStreaming = false;
          return copy;
        });
      }
    }, 20);
  };

  const handlePresetClick = (question: string) => {
    if (isTyping) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: question }]);

    const answer = KNOWLEDGE[question] || "I am currently learning more about that aspect! Ask me about Vishal's skills, projects, or education.";
    
    // Wait briefly and stream response
    setTimeout(() => {
      streamResponse(question, answer);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={toggleChat}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative p-4 rounded-full bg-slate-900 border border-cyan-500/20 text-cyan-400 hover:text-white shadow-xl shadow-cyan-950/20 hover:border-cyan-500/40 hover:scale-105 active:scale-95 transition-all select-none"
        >
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-cyan-400 border border-slate-900 animate-ping" />
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-cyan-400 border border-slate-900" />
          <MessageSquare className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Floating Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed bottom-24 right-6 z-40 w-[92%] sm:w-[380px] h-[480px] glass-card rounded-3xl overflow-hidden flex flex-col border border-slate-800 shadow-2xl select-none"
          >
            {/* Chat header */}
            <div className="px-5 py-4 border-b border-slate-900 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/10">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-xs tracking-wide font-heading flex items-center gap-1.5">
                    Vishal&apos;s Assistant
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block">LLM-Simulation API</span>
                </div>
              </div>
              
              <button
                onClick={toggleChat}
                className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-900 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat history list */}
            <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 font-body scroll-smooth">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs md:text-sm shadow-sm leading-relaxed whitespace-pre-line
                      ${
                        msg.sender === "user"
                          ? "bg-cyan-600 text-white rounded-tr-none"
                          : "bg-slate-900/80 border border-slate-900 text-slate-200 rounded-tl-none"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && messages[messages.length - 1]?.isStreaming && (
                <div className="flex justify-start">
                  <div className="flex gap-1.5 items-center px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-200" />
                  </div>
                </div>
              )}
            </div>

            {/* Presets Grid */}
            <div className="p-4 border-t border-slate-900 bg-slate-950/40">
              <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">
                Select a Question Pill
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {Object.keys(KNOWLEDGE).map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePresetClick(question)}
                    disabled={isTyping}
                    className="text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/20 text-slate-300 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
