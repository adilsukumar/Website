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
  "Express.js", "REST", "Postman", "Statistics"
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

// Tight circular rings with proper counts
const rings = [
  { radius: 90, count: 10 },
  { radius: 145, count: 14 },
  { radius: 200, count: 18 },
  { radius: 260, count: 18 },
];

const SkillsSphere = () => {
  let skillIndex = 0;

  return (
    <div className="relative w-full h-[600px] sm:h-[650px] flex items-center justify-center">
      {/* Container for skills - centered absolutely */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Subtle glow behind */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />

        {/* Center code icon */}
        <motion.span 
          className="absolute z-30 text-4xl sm:text-5xl font-bold text-primary/60 select-none"
          style={{ textShadow: "0 0 30px hsl(var(--primary) / 0.4)" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {"</>"}
        </motion.span>

        {/* Skill rings */}
        {rings.map((ring, ringIndex) => {
          const ringSkills = allSkills.slice(skillIndex, skillIndex + ring.count);
          skillIndex += ring.count;
          
          return ringSkills.map((skill, i) => {
            const angle = (i / ring.count) * 360 - 90;
            const x = Math.cos(angle * Math.PI / 180) * ring.radius;
            const y = Math.sin(angle * Math.PI / 180) * ring.radius;
            const gradient = gradients[(ringIndex * 3 + i) % gradients.length];
            const floatDuration = 4 + Math.random() * 2;
            const floatDelay = Math.random() * 3;
            
            return (
              <motion.div
                key={skill}
                className="absolute px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-white font-medium text-[10px] sm:text-xs whitespace-nowrap z-20 cursor-default"
                style={{
                  background: gradient,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  x: [0, 2, -2, 0],
                  y: [0, -2, 2, 0],
                }}
                transition={{ 
                  opacity: { delay: (ringIndex * 0.1) + (i * 0.02), duration: 0.3 },
                  scale: { delay: (ringIndex * 0.1) + (i * 0.02), duration: 0.3 },
                  x: { duration: floatDuration, repeat: Infinity, delay: floatDelay, ease: "easeInOut" },
                  y: { duration: floatDuration, repeat: Infinity, delay: floatDelay, ease: "easeInOut" },
                }}
                whileHover={{ 
                  scale: 1.2, 
                  zIndex: 50,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                {skill}
              </motion.div>
            );
          });
        })}

        {/* Floating particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              transform: `translate(${(Math.random() - 0.5) * 300}px, ${(Math.random() - 0.5) * 300}px)`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsSphere;
