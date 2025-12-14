import { motion } from "framer-motion";

// Skills matching the exact screenshot - spiral organic pattern around center
const skills = [
  // Top cluster
  { name: "Robotics", bg: "#6B7280", x: 20, y: -180 },
  { name: "MongoDB", bg: "#22C55E", x: 220, y: -170 },
  { name: "Voice", bg: "#F87171", x: 130, y: -155 },
  { name: "PineScript", bg: "#A855F7", x: -30, y: -130 },
  { name: "APIs", bg: "#10B981", x: 70, y: -110 },
  
  // Upper left
  { name: "IoT", bg: "#22D3EE", x: -240, y: -100 },
  { name: "Gen AI", bg: "#EC4899", x: -110, y: -70 },
  
  // Upper right
  { name: "SQL", bg: "#60A5FA", x: 200, y: -95 },
  { name: "Git", bg: "#F97316", x: 280, y: -60 },
  { name: "Leadership", bg: "#EAB308", x: 380, y: -30 },
  
  // Middle left
  { name: "Trading Bots", bg: "#22C55E", x: -190, y: -30 },
  { name: "NLP", bg: "#8B5CF6", x: -130, y: 30 },
  { name: "Arduino", bg: "#2DD4BF", x: -240, y: 80 },
  { name: "Genomics", bg: "#EF4444", x: -160, y: 130 },
  
  // Middle right
  { name: "Python", bg: "#3B82F6", x: 300, y: 30 },
  { name: "AI/ML", bg: "#EC4899", x: 320, y: 90 },
  
  // Lower left
  { name: "TensorFlow", bg: "#F59E0B", x: -50, y: 120 },
  { name: "Deep Learning", bg: "#8B5CF6", x: -100, y: 200 },
  
  // Lower center-right
  { name: "TypeScript", bg: "#60A5FA", x: 160, y: 150 },
  { name: "React", bg: "#06B6D4", x: 280, y: 155 },
  { name: "Data Science", bg: "#F97316", x: 90, y: 190 },
  { name: "FinTech", bg: "#10B981", x: 230, y: 195 },
  { name: "Bioinformatics", bg: "#14B8A6", x: 140, y: 250 },
];

const SkillsSphere = () => {
  return (
    <div className="relative w-full max-w-[900px] h-[600px] mx-auto flex items-center justify-center">
      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: "hsl(var(--muted-foreground) / 0.25)",
            left: `${10 + (i * 7) % 80}%`,
            top: `${10 + (i * 11) % 80}%`,
          }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Center code icon */}
      <motion.span 
        className="absolute z-10 text-7xl sm:text-8xl font-bold select-none holographic"
        style={{ opacity: 0.7 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {"</>"}
      </motion.span>

      {/* Skill badges */}
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          className="absolute px-5 py-2 rounded-2xl text-white font-semibold text-base whitespace-nowrap z-20 cursor-default"
          style={{
            backgroundColor: skill.bg,
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            left: "50%",
            top: "50%",
            marginLeft: skill.x,
            marginTop: skill.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.05 + i * 0.025, 
            duration: 0.4,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ 
            scale: 1.08, 
            zIndex: 50,
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
          }}
        >
          {skill.name}
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsSphere;