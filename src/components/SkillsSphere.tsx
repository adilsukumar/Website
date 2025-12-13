import { motion } from "framer-motion";

const skills = [
  "Python", "React", "AI/ML", "TensorFlow", "Data Science", "JavaScript",
  "TypeScript", "Node.js", "FinTech", "Deep Learning", "NLP", "PyTorch",
  "Bioinformatics", "Trading Bots", "IoT", "MongoDB", "SQL", "Docker",
  "Leadership", "Arduino", "Automation", "Gen AI", "LLMs", "Robotics"
];

const colors = ["#f472b6", "#a78bfa", "#60a5fa", "#34d399", "#fbbf24", "#f87171"];

const SkillsSphere = () => {
  const sparks = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    angle: (i / 16) * 360,
    delay: i * 0.15,
    size: Math.random() * 3 + 2
  }));

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] flex items-center justify-center overflow-hidden">
      {/* Outer glow */}
      <motion.div 
        className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main sphere */}
      <motion.div 
        className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full z-10"
        style={{
          background: "radial-gradient(circle at 35% 35%, hsl(var(--primary) / 0.9), hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.3) 80%)",
          boxShadow: "0 0 50px 12px hsl(var(--primary) / 0.5), 0 0 80px 25px hsl(var(--primary) / 0.3), inset 0 0 30px hsl(var(--primary) / 0.4)"
        }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Skills arranged in circle */}
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * 360 - 90;
        const radius = 160;
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        
        return (
          <motion.span
            key={skill}
            className="absolute text-xs sm:text-sm font-medium px-2 py-1 rounded-full whitespace-nowrap"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              color: colors[i % colors.length],
              textShadow: `0 0 10px ${colors[i % colors.length]}60`,
              background: `${colors[i % colors.length]}15`,
              border: `1px solid ${colors[i % colors.length]}30`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.15, zIndex: 50 }}
          >
            {skill}
          </motion.span>
        );
      })}
      
      {/* Blue sparks */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute rounded-full bg-blue-400 z-20"
          style={{
            width: spark.size,
            height: spark.size,
            boxShadow: "0 0 6px 2px rgba(96, 165, 250, 0.8)"
          }}
          animate={{ 
            x: [0, Math.cos(spark.angle * Math.PI / 180) * 120],
            y: [0, Math.sin(spark.angle * Math.PI / 180) * 120],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: 1.8,
            delay: spark.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <div className="text-center">
          <motion.span 
            className="text-4xl sm:text-5xl font-display font-bold text-primary-foreground drop-shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            90+
          </motion.span>
          <p className="text-xs sm:text-sm text-primary-foreground/80 mt-1">Skills</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsSphere;
