import { motion } from "framer-motion";

const allSkills = [
  "Python", "React", "AI/ML", "TensorFlow", "JavaScript", "TypeScript",
  "Node.js", "Deep Learning", "NLP", "PyTorch", "Data Science", "MongoDB",
  "Bioinformatics", "Trading Bots", "IoT", "SQL", "Docker", "Leadership",
  "Arduino", "Automation", "Gen AI", "LLMs", "Robotics", "Flask", "Django",
  "FinTech", "Git", "Linux", "APIs", "C++", "Keras", "Scikit-learn", "Pandas",
  "NumPy", "OpenCV", "YOLO", "Hugging Face", "Firebase", "PostgreSQL", "Supabase",
  "Power BI", "Excel", "Matplotlib", "Selenium", "Web Scraping", "Chatbots",
  "Voice AI", "Raspberry Pi", "Bluetooth", "Genomics", "NGS Analysis",
  "Risk Management", "Algo Trading", "Technical Analysis", "Bootstrap", "Tailwind",
  "Express.js", "REST", "Postman", "Statistics", "PineScript", "Machine Learning"
];

const gradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
  "linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
];

// Generate circular positions in multiple rings
const generateCircularPositions = () => {
  const positions: { x: number; y: number }[] = [];
  
  const rings = [
    { count: 8, radius: 140 },
    { count: 12, radius: 220 },
    { count: 16, radius: 300 },
    { count: 20, radius: 390 },
    { count: 6, radius: 470 },
  ];
  
  rings.forEach((ring, ringIndex) => {
    const offsetAngle = ringIndex * 12; // Stagger each ring
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * 360 + offsetAngle;
      const jitter = (Math.random() - 0.5) * 25;
      const x = Math.cos(angle * Math.PI / 180) * (ring.radius + jitter);
      const y = Math.sin(angle * Math.PI / 180) * (ring.radius + jitter);
      positions.push({ x, y });
    }
  });
  
  return positions;
};

const positions = generateCircularPositions();

const SkillsSphere = () => {
  return (
    <div className="relative w-full h-[700px] sm:h-[850px] flex items-center justify-center overflow-hidden">
      {/* Ambient particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Center code icon - transparent, no box */}
      <motion.span 
        className="absolute z-30 text-5xl sm:text-7xl font-bold text-primary/70 select-none"
        style={{ 
          textShadow: "0 0 40px hsl(var(--primary) / 0.4)" 
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {"</>"}
      </motion.span>

      {/* Skill badges in circular arrangement */}
      {allSkills.map((skill, i) => {
        const pos = positions[i % positions.length];
        const gradient = gradients[i % gradients.length];
        const floatDelay = Math.random() * 5;
        const floatDuration = 5 + Math.random() * 3;
        const floatX = 6 + Math.random() * 10;
        const floatY = 6 + Math.random() * 10;
        
        return (
          <motion.div
            key={skill}
            className="absolute px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-white font-semibold text-sm sm:text-base whitespace-nowrap z-20 cursor-default"
            style={{
              left: "50%",
              top: "50%",
              background: gradient,
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: pos.x,
              y: pos.y,
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              x: [pos.x, pos.x + floatX, pos.x - floatX * 0.5, pos.x],
              y: [pos.y, pos.y - floatY, pos.y + floatY * 0.5, pos.y],
            }}
            transition={{ 
              opacity: { delay: i * 0.025, duration: 0.4 },
              scale: { delay: i * 0.025, duration: 0.4 },
              x: { duration: floatDuration, repeat: Infinity, delay: floatDelay, ease: "easeInOut" },
              y: { duration: floatDuration, repeat: Infinity, delay: floatDelay, ease: "easeInOut" },
            }}
            whileHover={{ 
              scale: 1.15, 
              zIndex: 50,
              boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
            }}
          >
            {skill}
          </motion.div>
        );
      })}
    </div>
  );
};

export default SkillsSphere;
