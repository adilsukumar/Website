import { motion } from "framer-motion";

// Skills matching the screenshot layout with pill gradients
const skills = [
  { name: "Robotics", gradient: "linear-gradient(135deg, #9CA3AF 0%, #4B5563 100%)", x: -20, y: -210 },
  { name: "MongoDB", gradient: "linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)", x: 180, y: -210 },
  { name: "Voice", gradient: "linear-gradient(135deg, #FB7185 0%, #F97316 100%)", x: 80, y: -185 },
  { name: "PineScript", gradient: "linear-gradient(135deg, #A855F7 0%, #6366F1 100%)", x: -90, y: -175 },
  { name: "APIs", gradient: "linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)", x: 10, y: -155 },
  { name: "SQL", gradient: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)", x: 160, y: -140 },
  { name: "IoT", gradient: "linear-gradient(135deg, #22D3EE 0%, #0EA5E9 100%)", x: -220, y: -135 },
  { name: "Gen AI", gradient: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)", x: -130, y: -105 },
  { name: "Git", gradient: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)", x: 240, y: -105 },
  { name: "Leadership", gradient: "linear-gradient(135deg, #FACC15 0%, #F97316 100%)", x: 320, y: -70 },
  { name: "Trading Bots", gradient: "linear-gradient(135deg, #22C55E 0%, #10B981 100%)", x: -210, y: -50 },
  { name: "NLP", gradient: "linear-gradient(135deg, #818CF8 0%, #A855F7 100%)", x: -110, y: -5 },
  { name: "Python", gradient: "linear-gradient(135deg, #3B82F6 0%, #22C55E 100%)", x: 270, y: 15 },
  { name: "AI/ML", gradient: "linear-gradient(135deg, #EC4899 0%, #6366F1 100%)", x: 295, y: 65 },
  { name: "Arduino", gradient: "linear-gradient(135deg, #2DD4BF 0%, #22C55E 100%)", x: -245, y: 55 },
  { name: "Genomics", gradient: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)", x: -170, y: 95 },
  { name: "TensorFlow", gradient: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)", x: -70, y: 95 },
  { name: "TypeScript", gradient: "linear-gradient(135deg, #60A5FA 0%, #4F46E5 100%)", x: 175, y: 135 },
  { name: "React", gradient: "linear-gradient(135deg, #22D3EE 0%, #0EA5E9 100%)", x: 275, y: 135 },
  { name: "Data Science", gradient: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)", x: 55, y: 165 },
  { name: "Deep Learning", gradient: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)", x: -130, y: 180 },
  { name: "Bioinformatics", gradient: "linear-gradient(135deg, #14B8A6 0%, #22D3EE 100%)", x: 155, y: 205 },
  { name: "FinTech", gradient: "linear-gradient(135deg, #22C55E 0%, #22D3EE 100%)", x: -65, y: 220 },
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
        className="absolute z-30 text-6xl sm:text-7xl font-bold select-none holographic"
        style={{ 
          textShadow: "0 0 30px hsl(var(--primary) / 0.4)",
          opacity: 0.75,
        }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {"</>"}
      </motion.span>

      {/* Skill badges */}
      {skills.map((skill, i) => {
        const floatDuration = 8 + Math.random() * 4;
        const floatDelay = Math.random() * 4;
        const floatX = 2 + Math.random() * 3;
        const floatY = 2 + Math.random() * 3;
        
        return (
          <motion.div
            key={skill.name}
            className="absolute px-5 py-2.5 rounded-full text-white font-semibold text-sm sm:text-base whitespace-nowrap z-20 cursor-default"
            style={{
              backgroundImage: skill.gradient,
              boxShadow: "0 10px 30px rgba(15,23,42,0.55)",
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${skill.x}px), calc(-50% + ${skill.y}px))`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1,
              scale: 1,
              x: [0, floatX, -floatX, 0],
              y: [0, -floatY, floatY, 0],
            }}
            transition={{ 
              opacity: { delay: 0.2 + i * 0.04, duration: 0.5 },
              scale: { delay: 0.2 + i * 0.04, duration: 0.5, type: "spring" },
              x: { duration: floatDuration, repeat: Infinity, delay: floatDelay, ease: "easeInOut" },
              y: { duration: floatDuration, repeat: Infinity, delay: floatDelay, ease: "easeInOut" },
            }}
            whileHover={{ 
              scale: 1.12, 
              zIndex: 50,
              boxShadow: "0 16px 40px rgba(15,23,42,0.7)",
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