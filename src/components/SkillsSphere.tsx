import { motion } from "framer-motion";
import { Code } from "lucide-react";

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

const colors = ["#f472b6", "#a78bfa", "#60a5fa", "#34d399", "#fbbf24", "#f87171", "#fb923c", "#22d3ee"];

// Distribute skills in multiple rings around the center
const rings = [
  { count: 12, radius: 90 },   // Inner ring
  { count: 18, radius: 150 },  // Middle ring
  { count: 30, radius: 220 },  // Outer ring
];

const generatePositions = () => {
  const positions: { x: number; y: number; ring: number }[] = [];
  let skillIndex = 0;
  
  rings.forEach((ring, ringIndex) => {
    for (let i = 0; i < ring.count && skillIndex < allSkills.length; i++) {
      const angle = (i / ring.count) * 360 - 90 + (ringIndex * 15); // Offset each ring
      const jitter = (Math.random() - 0.5) * 20; // Small random offset
      const x = Math.cos(angle * Math.PI / 180) * (ring.radius + jitter);
      const y = Math.sin(angle * Math.PI / 180) * (ring.radius + jitter);
      positions.push({ x, y, ring: ringIndex });
      skillIndex++;
    }
  });
  
  return positions;
};

const skillPositions = generatePositions();

const SkillsSphere = () => {
  return (
    <div className="relative w-full h-[550px] sm:h-[650px] flex items-center justify-center overflow-hidden">
      {/* Outer glow effect */}
      <motion.div 
        className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hollow ring border */}
      <motion.div 
        className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full z-10"
        style={{
          background: "transparent",
          border: "3px solid hsl(var(--primary) / 0.6)",
          boxShadow: "0 0 30px 8px hsl(var(--primary) / 0.3), 0 0 60px 15px hsl(var(--primary) / 0.15), inset 0 0 20px hsl(var(--primary) / 0.2)"
        }}
        animate={{ 
          boxShadow: [
            "0 0 30px 8px hsl(var(--primary) / 0.3), 0 0 60px 15px hsl(var(--primary) / 0.15), inset 0 0 20px hsl(var(--primary) / 0.2)",
            "0 0 40px 12px hsl(var(--primary) / 0.4), 0 0 80px 20px hsl(var(--primary) / 0.2), inset 0 0 30px hsl(var(--primary) / 0.3)",
            "0 0 30px 8px hsl(var(--primary) / 0.3), 0 0 60px 15px hsl(var(--primary) / 0.15), inset 0 0 20px hsl(var(--primary) / 0.2)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Code icon in center */}
      <motion.div 
        className="absolute z-20 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Code 
          className="w-10 h-10 sm:w-14 sm:h-14 text-primary" 
          style={{ 
            filter: "drop-shadow(0 0 10px hsl(var(--primary) / 0.6))" 
          }}
        />
      </motion.div>

      {/* Randomly scattered skills */}
      {allSkills.map((skill, i) => {
        const pos = skillPositions[i];
        const colorIndex = i % colors.length;
        const size = Math.random() > 0.5 ? "text-[9px] sm:text-[11px]" : "text-[10px] sm:text-xs";
        
        return (
          <motion.span
            key={skill}
            className={`absolute ${size} font-medium px-2 py-0.5 rounded-full whitespace-nowrap z-20 cursor-default`}
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
              color: colors[colorIndex],
              textShadow: `0 0 8px ${colors[colorIndex]}50`,
              background: `${colors[colorIndex]}12`,
              border: `1px solid ${colors[colorIndex]}25`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.6, 0.9, 0.6],
              scale: 1
            }}
            transition={{ 
              opacity: { duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 },
              scale: { delay: i * 0.02, duration: 0.3 }
            }}
            whileHover={{ 
              scale: 1.3, 
              zIndex: 50, 
              opacity: 1,
              textShadow: `0 0 15px ${colors[colorIndex]}`
            }}
          >
            {skill}
          </motion.span>
        );
      })}

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/40 z-10"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${30 + Math.random() * 40}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default SkillsSphere;
