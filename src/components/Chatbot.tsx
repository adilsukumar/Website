import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const builtInResponses: Record<string, string[]> = {
  // Commands
  "help": [
    "🚀 Commands: /skills /projects /contact /random /joke /about\n\nOr just ask me anything! 🌟",
    "Available: /skills, /projects, /achievements, /contact, /random, /joke\n\nJust chat naturally too! 😊"
  ],
  "/skills": [
    "🛠️ Python, JavaScript, React, AI/ML, Data Science, FinTech, IoT, Arduino\n\n80+ skills total! Check Skills section! 🚀",
    "⚡ Core: Python, JS, React, Node.js\n🤖 AI/ML: TensorFlow, PyTorch\n💰 FinTech: Trading bots, Blockchain\n\n80+ skills! 🌟"
  ],
  
  "/projects": [
    "🚀 Spendture (FinTech AI), CyberSHE (1st place hackathon), Voice AI Assistant, Smart Home IoT, Game Dev (1st place)\n\nCheck Projects section! 🌟",
    "💰 Spendture: AI FinTech app\n🛡️ CyberSHE: Safety platform (won!)\n🤖 Voice AI: Like JARVIS\n🎮 Game: 1st place winner! ✨"
  ],
  
  "/achievements": [
    "🏆 NSTSE State Rank 2, IEO AIR 44, NCO School Rank 1, Game Dev 1st place, Robotics 3rd, WiCyS Hackathon 1st! 💎",
    "⭐ Multiple Olympiad medals, Hackathon wins, Competition champion, Leadership roles! 🚀"
  ],
  
  "/contact": [
    "📧 adilsukumar24@gmail.com\n💼 linkedin.com/in/adilsukumar\n🐙 github.com/adilsukumar\n\nUse contact form below! 🚀",
    "📡 Email, LinkedIn, GitHub, Contact form\n\nAlways open to connect! 🌟"
  ],
  
  "/random": [
    "🎲 RANDOM FACT GENERATOR:\n\nAdil speaks 6 languages fluently! That's like having a universal translator built-in! 🌍\n\nLanguages: Tamil, Telugu, English, Hindi, French (A2), German (A1)\n\nPretty cool for intergalactic communication! 👽",
    "🌟 SURPRISE FACT:\n\nAdil has 80+ skills! That's more skills than most RPG characters at max level! 🎮\n\nFrom Python to Psychology, Arduino to AI - he's basically a real-life skill tree! 🌳",
    "⚡ MIND-BLOWING FACT:\n\nAdil built a voice AI assistant that's like having JARVIS! It handles emails, sets reminders, and when stumped, calls GPT for backup! 🤖\n\nTalk about standing on the shoulders of giants! 🚀",
    "🎯 COOL DISCOVERY:\n\nSpendture combines AI with behavioral psychology! It's not just another budgeting app - it actually helps people change their money habits! 💰\n\nTechnology + Psychology = Magic! ✨"
  ],
  
  "/joke": [
    "😄 HUMOR PROTOCOL ACTIVATED:\n\nWhy do programmers prefer dark mode?\nBecause light attracts bugs! 🐛\n\n*NOVA processing laughter... complete* 🤖",
    "🎭 COMEDY SUBROUTINE:\n\nHow many programmers does it take to change a light bulb?\nNone! That's a hardware problem! 💡\n\n*Error 404: Humor not found... just kidding!* 😂",
    "😂 JOKE DATABASE ACCESS:\n\nWhy did the developer go broke?\nBecause he used up all his cache! 💰\n\n*NOVA's comedy circuits are functioning optimally!* 🤖",
    "🎪 ENTERTAINMENT MODE:\n\nWhat's a programmer's favorite hangout place?\nFoo Bar! 🍺\n\n*Initiating laugh track... beep boop!* 🤖"
  ],
  
  "/about": [
    "🌟 ADIL SUKUMAR - PROFILE LOADED:\n\n🎓 BTech Computer Science (AI/ML Specialization)\n🚀 Founder & CEO of Spendture\n🏆 Multi-competition winner\n🌍 Polyglot (6 languages)\n🤖 AI enthusiast & FinTech innovator\n🎯 Building solutions that matter\n\nMission: Use technology to solve real-world problems! 🌎",
    "👨‍💻 SUBJECT: ADIL SUKUMAR\n\nStatus: Student, Entrepreneur, Innovator\nSpecialty: Turning ideas into reality\nPassion: AI, FinTech, Problem-solving\nAchievements: 80+ skills, Multiple awards\nCurrent Project: Spendture (FinTech revolution)\nGoal: Making technology accessible & impactful\n\nA true digital native building tomorrow! 🚀"
  ],
  // Greetings
  "hi": [
    "Hey there! 👋 Welcome to Adil's portfolio! What would you like to know?",
    "Hi! Great to meet you! I'm NOVA, Adil's virtual assistant. How can I help?",
    "Hello! 🌟 Ready to explore Adil's work? Ask me anything!"
  ],
  "hello": [
    "Hello! 👋 I'm NOVA - Adil's AI assistant. What can I tell you about him?",
    "Hey! Welcome! Feel free to ask about Adil's skills, projects, or experience!",
    "Hi there! Nice to see you here! What brings you to Adil's portfolio?"
  ],
  "hey": [
    "Hey! 👋 What's up? I'm here to help you learn about Adil!",
    "Hey there! Ready to explore? Ask away!",
    "Hey! Great to see you! What would you like to know?"
  ],
  
  // How are you
  "how are you": [
    "I'm doing great, thanks for asking! 🌟 Always happy to chat about Adil's work. How are you?",
    "Fantastic! Running at optimal performance 😄 How about you?",
    "Pretty good! Just here helping visitors learn about Adil. How can I assist you today?"
  ],
  "how's it going": [
    "Going great! Always excited to meet new people. What brings you here today?",
    "Pretty awesome! I love chatting with visitors. What can I tell you?",
    "Wonderful! Thanks for asking! What would you like to explore?"
  ],
  "what's up": [
    "Not much, just helping visitors explore Adil's portfolio! What's up with you?",
    "Just here doing my thing! 😊 What can I help you discover today?",
    "The sky! 😄 Just kidding - I'm here to help! What would you like to know?"
  ],
  
  // About Adil
  "who are you": [
    "I'm NOVA, Adil Sukumar's virtual assistant! Adil is a passionate developer and entrepreneur studying BTech in Computer Science with AI/ML specialization. He's building cool stuff in FinTech and AI!",
    "I'm NOVA! 🤖 I represent Adil Sukumar - a tech enthusiast who loves AI, finance, and building things that matter. He's currently working on Spendture, a FinTech app!"
  ],
  "who is adil": [
    "Adil Sukumar is a BTech student specializing in AI/ML, with a passion for FinTech, bioinformatics, and building impactful solutions. He's the founder of Spendture and has won multiple competitions!",
    "Adil is a developer, entrepreneur, and multi-talented creator! He speaks 6 languages, has 80+ skills, and has built everything from trading bots to games!"
  ],
  "tell me about adil": [
    "Adil is basically that person who can't stop asking 'what if?' 💡 He's working on a FinTech app called Spendture, has built trading bots, voice assistants, and even won a game development competition. Pretty cool, right?",
    "Where do I start? 😄 Adil is a CS student with AI/ML focus, speaks 6 languages, has leadership experience across 5+ roles, and builds everything from IoT projects to AI apps!"
  ],
  
  // Skills
  "skills": [
    "Adil has 80+ skills! 🚀 Highlights: Python, JavaScript, React, AI/ML, Deep Learning, FinTech, Bioinformatics, Arduino, and leadership. Check the Skills section for the full universe!",
    "Oh, skills? There's a LOT! Programming (Python, JS, C++), AI/ML, Data Science, IoT with Arduino, and soft skills like leadership and public speaking. The Skills Universe shows all 80+!"
  ],
  "what can adil do": [
    "Better question: what CAN'T he do? 😄 Coding (Python, JS, React), AI/ML, Data Science, IoT, FinTech, Game Dev, and he speaks 6 languages! Check the Skills section!",
    "Adil can build web apps, train ML models, create trading bots, develop games, work with IoT, and lead teams. His 80+ skills cover tech, finance, and leadership!"
  ],
  
  // Projects
  "projects": [
    "Check out the Projects section! 🎯 Highlights: Spendture (his FinTech baby), CyberSHE (won 1st at WiCyS Hackathon), a Voice AI Assistant, and more!",
    "Adil's built some cool stuff! Spendture (AI + psychology for better money habits), CyberSHE (women's safety platform), trading bots, games, and IoT projects!"
  ],
  "spendture": [
    "Spendture is Adil's baby! 💰 It's a FinTech app that uses AI and behavioral psychology to help people build better money habits. Smart reminders, journaling, the works!",
    "Adil is building Spendture - a FinTech app combining AI with psychology to help people actually stick to their financial goals. It's his passion project!"
  ],
  "cybershe": [
    "CyberSHE is a women's safety platform Adil built at WiCyS Hackathon - it has AI harassment detection, privacy tools, and encrypted messaging. They won 1st place! 🏆",
    "CyberSHE won 1st at WiCyS Hackathon! It's a cybersecurity platform for women with AI-powered harassment detection and privacy tools."
  ],
  
  // Experience
  "experience": [
    "Adil has 5+ leadership roles, 10+ projects built, 6 languages spoken, and multiple competition wins including robotics and game development! 🏆",
    "Lots of experience! Leadership across multiple organizations, hackathon wins, Olympiad medals, and hands-on experience in AI, FinTech, IoT, and more!"
  ],
  
  // Contact
  "contact": [
    "Want to reach Adil? Check the Contact section below! You can also find him on LinkedIn and GitHub. He'd love to connect! 📬",
    "Head to the Contact section at the bottom! Adil is always open to interesting conversations and opportunities!"
  ],
  "hire": [
    "Interested in working with Adil? Awesome! 🎉 Use the Contact form or check his LinkedIn. He's open to exciting opportunities!",
    "Looking to hire Adil? Great choice! Reach out via the Contact section - he's always excited about new challenges!"
  ],
  
  // Fun responses
  "thanks": [
    "You're welcome! 😊 Anything else you'd like to know?",
    "Happy to help! Feel free to ask more questions!",
    "My pleasure! 🌟 What else can I tell you?"
  ],
  "thank you": [
    "You're very welcome! 💫 Let me know if you need anything else!",
    "Glad I could help! Anything else on your mind?",
    "Anytime! 🙌 Feel free to explore more!"
  ],
  "bye": [
    "Goodbye! 👋 Come back anytime! Hope you enjoyed learning about Adil!",
    "See you! 🌟 Thanks for stopping by Adil's portfolio!",
    "Bye! Have a great day! Don't forget to check out the projects! 😊"
  ],
  "goodbye": [
    "Take care! 👋 Feel free to come back and chat anytime!",
    "Goodbye! Hope to see you again! 🌟",
    "Bye for now! Best of luck with everything!"
  ],
  "nice": [
    "Right? 😊 Anything else you'd like to explore?",
    "Glad you think so! What else can I show you?",
    "Thanks! What would you like to know more about?"
  ],
  "cool": [
    "I know, right? 😎 Adil has some pretty cool stuff! What else interests you?",
    "Pretty cool indeed! Want to know more about anything specific?",
    "Glad you're impressed! There's lots more to explore!"
  ],
  "awesome": [
    "Absolutely! 🔥 What else would you like to discover?",
    "Right? Want to dive deeper into any topic?",
    "Thanks! Adil would love to hear that! What else can I help with?"
  ],
  
  // Random/Fun
  "joke": [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😄",
    "Why did the developer go broke? Because he used up all his cache! 💰",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡"
  ],
  "fun fact": [
    "Fun fact: Adil speaks 6 languages! That's more than some apps have localizations for! 🌍",
    "Did you know? Adil won 1st place in a game development competition against 100+ schools! 🎮",
    "Fun fact: Adil has 80+ skills ranging from AI to Arduino to Behavioral Finance! 🧠"
  ],
  
  // Default
  "default": [
    "Interesting question! 🤔 For more details, check the relevant section or ask me about skills, projects, or how to contact Adil!",
    "I'd love to help with that! Try asking about Adil's skills, projects, experience, or how to get in touch! 💡",
    "Great question! Explore the portfolio sections above, or ask me specifically about skills, projects, or contact info! 😊"
  ]
};

const quickQuestions = [
  "/help",
  "/skills", 
  "/projects",
  "/contact",
  "/random",
  "Who is Adil?",
];

const getRandomResponse = (responses: string[]): string => {
  return responses[Math.floor(Math.random() * responses.length)];
};

const findResponse = (input: string): string => {
  const lowered = input.toLowerCase().trim();
  
  // Command matches first (exact)
  if (lowered.startsWith('/')) {
    const command = lowered.split(' ')[0];
    if (builtInResponses[command]) {
      return getRandomResponse(builtInResponses[command]);
    }
  }
  
  // Direct matches
  for (const [key, responses] of Object.entries(builtInResponses)) {
    if (key === "default" || key.startsWith('/')) continue;
    if (lowered === key || lowered.includes(key)) {
      return getRandomResponse(responses);
    }
  }
  
  // Keyword matching
  if (lowered.includes("how are") || lowered.includes("how're") || lowered.includes("how r u")) {
    return getRandomResponse(builtInResponses["how are you"]);
  }
  if (lowered.includes("service") || lowered.includes("offer") || lowered.includes("do for me")) {
    return "Adil offers expertise in: 🎨 UI/UX Design, 💻 Full-Stack Development, 🤖 AI/ML Solutions, 📊 Data Analytics, and 🔧 IoT Projects. Check the Contact section to discuss your needs!";
  }
  if (lowered.includes("skill") || lowered.includes("tech") || lowered.includes("stack") || lowered.includes("know")) {
    return getRandomResponse(builtInResponses["skills"]);
  }
  if (lowered.includes("project") || lowered.includes("work") || lowered.includes("portfolio") || lowered.includes("built")) {
    return getRandomResponse(builtInResponses["projects"]);
  }
  if (lowered.includes("contact") || lowered.includes("reach") || lowered.includes("email") || lowered.includes("connect")) {
    return getRandomResponse(builtInResponses["contact"]);
  }
  if (lowered.includes("hire") || lowered.includes("available") || lowered.includes("freelance") || lowered.includes("work with")) {
    return getRandomResponse(builtInResponses["hire"]);
  }
  if (lowered.includes("experience") || lowered.includes("years") || lowered.includes("background")) {
    return getRandomResponse(builtInResponses["experience"]);
  }
  if (lowered.includes("adil") || lowered.includes("about him") || lowered.includes("about you")) {
    return getRandomResponse(builtInResponses["tell me about adil"]);
  }
  if (lowered.includes("thank") || lowered.includes("thx") || lowered.includes("ty")) {
    return getRandomResponse(builtInResponses["thanks"]);
  }
  if (lowered.includes("joke") || lowered.includes("funny") || lowered.includes("laugh")) {
    return getRandomResponse(builtInResponses["joke"]);
  }
  if (lowered.includes("fun fact") || lowered.includes("interesting") || lowered.includes("did you know")) {
    return getRandomResponse(builtInResponses["fun fact"]);
  }
  if (lowered.includes("great") || lowered.includes("amazing") || lowered.includes("wonderful") || lowered.includes("fantastic")) {
    return "Glad you're enjoying it! 🌟 What else would you like to explore about Adil's work?";
  }
  if (lowered.includes("help") || lowered.includes("command") || lowered.includes("what can you do")) {
    return getRandomResponse(builtInResponses["help"]);
  }
  if (lowered.includes("random fact") || lowered.includes("surprise me") || lowered.includes("tell me something")) {
    return getRandomResponse(builtInResponses["/random"]);
  }
  if (lowered.includes("achievement") || lowered.includes("award") || lowered.includes("win") || lowered.includes("medal")) {
    return getRandomResponse(builtInResponses["/achievements"]);
  }
  
  return getRandomResponse(builtInResponses["default"]);
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "🚀 Hey! I'm NOVA - Adil's AI assistant! \n\nType '/help' for commands or just chat! What would you like to know? 🌟", isBot: true }
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
                <h3 className="font-display font-bold text-primary-foreground">NOVA</h3>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs text-primary-foreground/80">Adil's AI Assistant</span>
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