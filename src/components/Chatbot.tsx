import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const builtInResponses: Record<string, string> = {
  "hi": "Hey there! 👋 I'm Alex's virtual assistant. How can I help you today?",
  "hello": "Hello! Welcome to my portfolio. Feel free to ask me anything about Alex's work!",
  "who are you": "I'm Alex Chen, a passionate full-stack developer with 5+ years of experience crafting digital experiences.",
  "what do you do": "I specialize in React, TypeScript, and Next.js. I build beautiful, performant web applications that users love.",
  "services": "I offer: 🎨 UI/UX Design, 💻 Frontend Development, 🔧 Backend Development, 📱 Responsive Web Apps, and ⚡ Performance Optimization.",
  "experience": "I have 5+ years of experience, 50+ completed projects, and 30+ happy clients worldwide!",
  "skills": "My tech stack includes React, TypeScript, Next.js, Node.js, Tailwind CSS, and more. Check out the Skills section for details!",
  "contact": "You can reach out via the Contact form below, or email me at hello@alexchen.dev. I'd love to hear from you!",
  "hire": "Awesome! I'm currently available for freelance projects. Head to the Contact section or email me directly!",
  "projects": "Check out my Projects section to see my latest work! I've built e-commerce platforms, SaaS dashboards, and more.",
  "availability": "I'm currently available for new projects! Let's build something amazing together.",
  "pricing": "Project pricing varies based on scope and complexity. Let's discuss your needs - reach out via the Contact form!",
  "timeline": "Typical projects take 2-8 weeks depending on complexity. I always deliver on time!",
  "technologies": "I work with React, TypeScript, Next.js, Node.js, PostgreSQL, MongoDB, AWS, and many more modern technologies.",
  "default": "Great question! For more details, feel free to reach out via the Contact section, or ask me about my skills, projects, or services! 😊"
};

const quickQuestions = [
  "Who are you?",
  "What services do you offer?",
  "Show me your skills",
  "How can I hire you?",
];

const findResponse = (input: string): string => {
  const lowered = input.toLowerCase();
  
  for (const [key, response] of Object.entries(builtInResponses)) {
    if (key === "default") continue;
    if (lowered.includes(key)) {
      return response;
    }
  }
  
  // Check for keywords
  if (lowered.includes("service") || lowered.includes("offer")) return builtInResponses.services;
  if (lowered.includes("skill") || lowered.includes("tech") || lowered.includes("stack")) return builtInResponses.skills;
  if (lowered.includes("project") || lowered.includes("work") || lowered.includes("portfolio")) return builtInResponses.projects;
  if (lowered.includes("contact") || lowered.includes("reach") || lowered.includes("email")) return builtInResponses.contact;
  if (lowered.includes("hire") || lowered.includes("available") || lowered.includes("freelance")) return builtInResponses.hire;
  if (lowered.includes("price") || lowered.includes("cost") || lowered.includes("rate")) return builtInResponses.pricing;
  if (lowered.includes("time") || lowered.includes("deadline") || lowered.includes("how long")) return builtInResponses.timeline;
  if (lowered.includes("experience") || lowered.includes("years")) return builtInResponses.experience;
  
  return builtInResponses.default;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey! 👋 I'm Alex's assistant. Ask me anything about skills, projects, or how to get in touch!", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: findResponse(messageText),
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient rounded-full glow cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: isOpen 
            ? "0 0 20px hsl(var(--primary) / 0.3)" 
            : ["0 0 20px hsl(var(--primary) / 0.3)", "0 0 40px hsl(var(--primary) / 0.6)", "0 0 20px hsl(var(--primary) / 0.3)"]
        }}
        transition={{ duration: 2, repeat: isOpen ? 0 : Infinity }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] glass rounded-2xl overflow-hidden border border-border/50"
          >
            {/* Header */}
            <div className="bg-gradient p-4 flex items-center gap-3">
              <motion.div
                className="p-2 bg-primary-foreground/20 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <div>
                <h3 className="font-display font-bold text-primary-foreground">Alex's Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs text-primary-foreground/80">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, x: message.isBot ? -10 : 10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: index === messages.length - 1 ? 0 : 0, type: "spring", stiffness: 200 }}
                  className={`flex gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}
                >
                  <motion.div
                    className={`p-2 rounded-full ${message.isBot ? "bg-primary/20" : "bg-secondary/20"}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {message.isBot ? (
                      <Bot className="w-4 h-4 text-primary" />
                    ) : (
                      <User className="w-4 h-4 text-secondary" />
                    )}
                  </motion.div>
                  <motion.div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.isBot
                        ? "bg-muted/50 rounded-tl-none"
                        : "bg-gradient text-primary-foreground rounded-tr-none"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </motion.div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-2"
                  >
                    <div className="p-2 rounded-full bg-primary/20">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted/50 p-3 rounded-2xl rounded-tl-none flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 bg-primary/50 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
              {quickQuestions.map((question, i) => (
                <motion.button
                  key={question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleSend(question)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-xs bg-muted/50 hover:bg-muted rounded-full whitespace-nowrap transition-colors text-muted-foreground hover:text-foreground"
                >
                  {question}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <motion.input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 bg-muted/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="p-3 bg-gradient rounded-xl text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
