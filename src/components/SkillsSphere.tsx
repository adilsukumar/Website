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
  "Express.js", "REST", "Postman", "Statistics", "PineScript", "Voice"
];

const gradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Purple
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // Pink
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", // Blue
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", // Green
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", // Orange-pink
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", // Light pink
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", // Teal-pink
  "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Deep purple-blue
  "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)", // Red-yellow
  "linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)", // Sky blue
  "linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%)", // Light green
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", // Peach
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", // Light blue
  "linear-gradient(135deg, #764ba2 0%, #667eea 100%)", // Purple reversed
  "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", // Cyan-blue
  "linear-gradient(135deg, #cd9cf2 0%, #f6f3ff 100%)", // Lavender
];

// Positions matching the screenshot - organic circular arrangement
const positions = [
  // Top area
  { x: -60, y: -200 }, { x: 80, y: -210 }, { x: -180, y: -170 }, { x: 200, y: -180 },
  { x: 0, y: -160 }, { x: -280, y: -130 }, { x: 280, y: -140 },
  
  // Upper sides
  { x: -320, y: -60 }, { x: -220, y: -80 }, { x: 220, y: -70 }, { x: 320, y: -50 },
  { x: -140, y: -100 }, { x: 140, y: -110 },
  
  // Middle area (around center)
  { x: -260, y: 20 }, { x: -180, y: 40 }, { x: 260, y: 30 }, { x: 180, y: 50 },
  { x: -320, y: 80 }, { x: 320, y: 90 }, { x: -100, y: 60 }, { x: 100, y: 70 },
  
  // Lower middle
  { x: -240, y: 130 }, { x: -140, y: 150 }, { x: 240, y: 140 }, { x: 140, y: 160 },
  { x: -60, y: 130 }, { x: 60, y: 140 }, { x: 0, y: 180 },
  
  // Bottom area  
  { x: -280, y: 200 }, { x: -180, y: 220 }, { x: -80, y: 230 }, { x: 80, y: 225 },
  { x: 180, y: 215 }, { x: 280, y: 195 }, { x: 0, y: 250 },
  
  // Extra positions
  { x: -350, y: 150 }, { x: 350, y: 160 }, { x: -300, y: -180 }, { x: 300, y: -170 },
  { x: -380, y: 0 }, { x: 380, y: 10 }, { x: -340, y: -100 }, { x: 340, y: -90 },
  { x: -200, y: 280 }, { x: 200, y: 275 }, { x: -100, y: 290 }, { x: 100, y: 285 },
  { x: -360, y: 220 }, { x: 360, y: 230 }, { x: 0, y: -250 }, { x: -120, y: -240 },
  { x: 120, y: -235 }, { x: -400, y: 100 }, { x: 400, y: 110 }, { x: -420, y: -40 },
  { x: 420, y: -30 }, { x: -250, y: -220 }, { x: 250, y: -215 },
];

const SkillsSphere = () => {
  return (
    <div className="relative w-full h-[700px] sm:h-[750px] flex items-center justify-center overflow-hidden">
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/20"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Skills container - centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Center code icon */}
        <motion.span 
          className="absolute z-30 text-6xl sm:text-7xl font-bold select-none"
          style={{ 
            color: "hsl(var(--primary))",
            textShadow: "0 0 40px hsl(var(--primary) / 0.5)",
            opacity: 0.7,
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {"</>"}
        </motion.span>

        {/* Skill badges */}
        {allSkills.map((skill, i) => {
          const pos = positions[i % positions.length];
          const gradient = gradients[i % gradients.length];
          const floatDuration = 5 + Math.random() * 3;
          const floatDelay = Math.random() * 4;
          const floatX = 4 + Math.random() * 8;
          const floatY = 4 + Math.random() * 8;
          
          return (
            <motion.div
              key={skill}
              className="absolute px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-white font-semibold text-sm sm:text-base whitespace-nowrap z-20 cursor-default"
              style={{
                background: gradient,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1,
                scale: 1,
                x: [0, floatX, -floatX * 0.5, 0],
                y: [0, -floatY, floatY * 0.5, 0],
              }}
              transition={{ 
                opacity: { delay: i * 0.02, duration: 0.4 },
                scale: { delay: i * 0.02, duration: 0.4 },
                x: { duration: floatDuration, repeat: Infinity, delay: floatDelay, ease: "easeInOut" },
                y: { duration: floatDuration, repeat: Infinity, delay: floatDelay, ease: "easeInOut" },
              }}
              whileHover={{ 
                scale: 1.15, 
                zIndex: 50,
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
              }}
            >
              {skill}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSphere;
