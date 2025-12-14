import { motion } from "framer-motion";

// Skills matching the screenshot layout around the center
const skills = [
  // Top cluster
  { name: "Robotics", gradient: "linear-gradient(135deg, #9CA3AF 0%, #4B5563 100%)", x: 0, y: -190 },
  { name: "MongoDB", gradient: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)", x: 210, y: -175 },
  { name: "Voice", gradient: "linear-gradient(135deg, #FB7185 0%, #F97316 100%)", x: 110, y: -160 },
  { name: "PineScript", gradient: "linear-gradient(135deg, #A3E635 0%, #22C55E 100%)", x: -20, y: -145 },
  { name: "APIs", gradient: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)", x: 70, y: -120 },
  
  // Upper left arc
  { name: "IoT", gradient: "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)", x: -210, y: -115 },
  { name: "Gen AI", gradient: "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)", x: -90, y: -80 },
  { name: "Trading Bots", gradient: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)", x: -160, y: -50 },
  { name: "NLP", gradient: "linear-gradient(135deg, #818CF8 0%, #A855F7 100%)", x: -110, y: -5 },
  { name: "Arduino", gradient: "linear-gradient(135deg, #22D3EE 0%, #14B8A6 100%)", x: -220, y: 60 },
  { name: "Genomics", gradient: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)", x: -150, y: 115 },
  { name: "TensorFlow", gradient: "linear-gradient(135deg, #FACC15 0%, #F97316 100%)", x: -30, y: 115 },
  
  // Upper right arc
  { name: "SQL", gradient: "linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)", x: 190, y: -95 },
  { name: "Git", gradient: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)", x: 265, y: -60 },
  { name: "Leadership", gradient: "linear-gradient(135deg, #FACC15 0%, #F97316 100%)", x: 340, y: -25 },
  { name: "Python", gradient: "linear-gradient(135deg, #FACC15 0%, #3B82F6 100%)", x: 270, y: 25 },
  { name: "AI/ML", gradient: "linear-gradient(135deg, #F472B6 0%, #A855F7 100%)", x: 300, y: 80 },
  
  // Lower arc
  { name: "TypeScript", gradient: "linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)", x: 170, y: 150 },
  { name: "React", gradient: "linear-gradient(135deg, #22D3EE 0%, #0EA5E9 100%)", x: 270, y: 145 },
  { name: "Data Science", gradient: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)", x: 70, y: 185 },
  { name: "Deep Learning", gradient: "linear-gradient(135deg, #A855F7 0%, #6366F1 100%)", x: -80, y: 210 },
  { name: "Bioinformatics", gradient: "linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)", x: 140, y: 235 },
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
            backgroundImage: skill.gradient,
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