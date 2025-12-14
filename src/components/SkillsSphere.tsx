import { motion } from "framer-motion";

// Skills matching the screenshot layout
const skills = [
  { name: "Robotics", color: "#6B7280", x: -10, y: -220 },
  { name: "MongoDB", color: "#22C55E", x: 180, y: -210 },
  { name: "Voice", color: "#F87171", x: 80, y: -180 },
  { name: "PineScript", color: "#A855F7", x: -80, y: -170 },
  { name: "APIs", color: "#10B981", x: 20, y: -150 },
  { name: "SQL", color: "#60A5FA", x: 160, y: -140 },
  { name: "IoT", color: "#06B6D4", x: -220, y: -130 },
  { name: "Gen AI", color: "#EC4899", x: -120, y: -100 },
  { name: "Git", color: "#F97316", x: 240, y: -100 },
  { name: "Leadership", color: "#EAB308", x: 320, y: -70 },
  { name: "Trading Bots", color: "#22C55E", x: -200, y: -50 },
  { name: "NLP", color: "#A855F7", x: -100, y: 0 },
  { name: "Python", color: "#3B82F6", x: 280, y: 20 },
  { name: "AI/ML", color: "#EC4899", x: 300, y: 70 },
  { name: "Arduino", color: "#2DD4BF", x: -240, y: 60 },
  { name: "Genomics", color: "#EF4444", x: -160, y: 100 },
  { name: "TensorFlow", color: "#F59E0B", x: -60, y: 90 },
  { name: "TypeScript", color: "#60A5FA", x: 180, y: 130 },
  { name: "React", color: "#06B6D4", x: 280, y: 130 },
  { name: "Data Science", color: "#F97316", x: 60, y: 160 },
  { name: "Deep Learning", color: "#8B5CF6", x: -120, y: 180 },
  { name: "Bioinformatics", color: "#14B8A6", x: 160, y: 200 },
  { name: "FinTech", color: "#10B981", x: -60, y: 220 },
];

const SkillsSphere = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible">
      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-muted-foreground/30"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
          }}
          animate={{
            y: [0, -15, 0],
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
      <motion.span 
        className="absolute z-30 text-6xl sm:text-7xl font-bold select-none"
        style={{ 
          color: "hsl(var(--primary))",
          textShadow: "0 0 30px hsl(var(--primary) / 0.4)",
          opacity: 0.6,
        }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {"</>"}
      </motion.span>

      {/* Skill badges */}
      {skills.map((skill, i) => {
        const floatDuration = 6 + Math.random() * 3;
        const floatDelay = Math.random() * 4;
        const floatX = 3 + Math.random() * 5;
        const floatY = 3 + Math.random() * 5;
        
        return (
          <motion.div
            key={skill.name}
            className="absolute px-4 py-2 rounded-xl text-white font-semibold text-sm whitespace-nowrap z-20 cursor-default"
            style={{
              backgroundColor: skill.color,
              boxShadow: `0 4px 15px ${skill.color}40`,
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${skill.x}px), calc(-50% + ${skill.y}px))`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1,
              scale: 1,
              x: [0, floatX, -floatX * 0.5, 0],
              y: [0, -floatY, floatY * 0.5, 0],
            }}
            transition={{ 
              opacity: { delay: i * 0.04, duration: 0.5 },
              scale: { delay: i * 0.04, duration: 0.5, type: "spring" },
              x: { duration: floatDuration, repeat: Infinity, delay: floatDelay, ease: "easeInOut" },
              y: { duration: floatDuration, repeat: Infinity, delay: floatDelay, ease: "easeInOut" },
            }}
            whileHover={{ 
              scale: 1.15, 
              zIndex: 50,
              boxShadow: `0 8px 25px ${skill.color}60`,
            }}
          >
            {skill.name}
          </motion.div>
        );
      })}
    </div>
  );
};

export default SkillsSphere;