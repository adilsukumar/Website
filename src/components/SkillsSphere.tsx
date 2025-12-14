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
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Purple
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // Pink
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", // Blue
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", // Green
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", // Orange-Pink
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", // Light teal-pink
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", // Light pink
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", // Peach
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Purple repeat
  "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Deep purple-blue
  "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)", // Red-yellow
  "linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)", // Sky blue
];

// Pre-calculated non-overlapping positions spread around center
const positions = [
  // Inner area (closer to center)
  { x: -120, y: -60 }, { x: 80, y: -80 }, { x: -80, y: 80 }, { x: 120, y: 60 },
  { x: -160, y: 0 }, { x: 160, y: 0 }, { x: 0, y: -120 }, { x: 0, y: 120 },
  
  // Middle ring
  { x: -220, y: -100 }, { x: -180, y: 80 }, { x: 200, y: -90 }, { x: 180, y: 100 },
  { x: -100, y: -160 }, { x: 100, y: -150 }, { x: -80, y: 170 }, { x: 110, y: 160 },
  { x: -260, y: 20 }, { x: 260, y: -20 }, { x: -240, y: -60 }, { x: 240, y: 70 },
  
  // Outer ring
  { x: -320, y: -140 }, { x: -300, y: 60 }, { x: -280, y: 140 }, { x: 320, y: -130 },
  { x: 300, y: 50 }, { x: 280, y: 150 }, { x: -180, y: -200 }, { x: 180, y: -190 },
  { x: -160, y: 220 }, { x: 160, y: 210 }, { x: 0, y: -220 }, { x: 0, y: 230 },
  
  // Far outer positions
  { x: -380, y: -80 }, { x: -360, y: 120 }, { x: 380, y: -70 }, { x: 360, y: 110 },
  { x: -420, y: 0 }, { x: 420, y: 10 }, { x: -340, y: -180 }, { x: 340, y: -170 },
  { x: -320, y: 200 }, { x: 320, y: 190 }, { x: -240, y: -240 }, { x: 240, y: -230 },
  { x: -220, y: 260 }, { x: 220, y: 250 }, { x: -100, y: -280 }, { x: 100, y: -270 },
  { x: -80, y: 290 }, { x: 80, y: 280 }, { x: -450, y: -120 }, { x: 450, y: -110 },
  { x: -430, y: 160 }, { x: 430, y: 150 }, { x: -60, y: -320 }, { x: 60, y: 310 },
  { x: -500, y: 40 }, { x: 500, y: -30 }, { x: -480, y: -60 }, { x: 480, y: 80 },
  { x: -280, y: -300 }, { x: 280, y: 290 }, { x: -180, y: 320 }, { x: 180, y: -310 },
];

const SkillsSphere = () => {
  return (
    <div className="relative w-full h-[700px] sm:h-[800px] flex items-center justify-center overflow-hidden">
      {/* Ambient particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Center code icon */}
      <motion.div 
        className="absolute z-30 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span 
          className="text-5xl sm:text-7xl font-bold text-primary/80"
          style={{ 
            textShadow: "0 0 30px hsl(var(--primary) / 0.5)" 
          }}
        >
          {"</>"}
        </span>
      </motion.div>

      {/* Skill badges */}
      {allSkills.map((skill, i) => {
        const pos = positions[i % positions.length];
        const gradient = gradients[i % gradients.length];
        const floatDelay = Math.random() * 5;
        const floatDuration = 4 + Math.random() * 3;
        const floatX = 8 + Math.random() * 12;
        const floatY = 8 + Math.random() * 12;
        
        return (
          <motion.div
            key={skill}
            className="absolute px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-white font-semibold text-sm sm:text-base whitespace-nowrap z-20 cursor-default shadow-lg"
            style={{
              left: "50%",
              top: "50%",
              background: gradient,
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
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
              opacity: { delay: i * 0.03, duration: 0.4 },
              scale: { delay: i * 0.03, duration: 0.4 },
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
  );
};

export default SkillsSphere;
