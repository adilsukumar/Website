import { motion } from "framer-motion";

const innerSkills = [
  "Python", "React", "AI/ML", "TensorFlow", "JavaScript", "TypeScript",
  "Node.js", "Deep Learning", "NLP", "PyTorch", "Data Science", "MongoDB"
];

const middleSkills = [
  "Bioinformatics", "Trading Bots", "IoT", "SQL", "Docker", "Leadership",
  "Arduino", "Automation", "Gen AI", "LLMs", "Robotics", "Flask", "Django",
  "FinTech", "Git", "Linux", "APIs", "C++"
];

const outerSkills = [
  "Keras", "Scikit-learn", "Pandas", "NumPy", "OpenCV", "YOLO", "Hugging Face",
  "Firebase", "PostgreSQL", "Supabase", "Power BI", "Excel", "Matplotlib",
  "Selenium", "Web Scraping", "Chatbots", "Voice AI", "Raspberry Pi", "Bluetooth",
  "Genomics", "NGS Analysis", "Risk Management", "Algo Trading", "Technical Analysis",
  "Bootstrap", "Tailwind", "Express.js", "REST", "Postman", "Statistics"
];

const colors = ["#f472b6", "#a78bfa", "#60a5fa", "#34d399", "#fbbf24", "#f87171", "#fb923c", "#22d3ee"];

const SkillsSphere = () => {
  const sparks = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * 360,
    delay: i * 0.12,
    size: Math.random() * 3 + 2
  }));

  return (
    <div className="relative w-full h-[550px] sm:h-[650px] flex items-center justify-center overflow-hidden">
      {/* Outer glow */}
      <motion.div 
        className="absolute w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 60%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main sphere */}
      <motion.div 
        className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full z-10"
        style={{
          background: "radial-gradient(circle at 35% 35%, hsl(var(--primary) / 0.95), hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.3) 80%)",
          boxShadow: "0 0 40px 10px hsl(var(--primary) / 0.5), 0 0 70px 20px hsl(var(--primary) / 0.3), inset 0 0 25px hsl(var(--primary) / 0.4)"
        }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inner ring of skills */}
      {innerSkills.map((skill, i) => {
        const angle = (i / innerSkills.length) * 360 - 90;
        const radius = 100;
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        
        return (
          <motion.span
            key={skill}
            className="absolute text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap z-20"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              color: colors[i % colors.length],
              textShadow: `0 0 8px ${colors[i % colors.length]}50`,
              background: `${colors[i % colors.length]}12`,
              border: `1px solid ${colors[i % colors.length]}25`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            whileHover={{ scale: 1.2, zIndex: 50 }}
          >
            {skill}
          </motion.span>
        );
      })}

      {/* Middle ring of skills */}
      {middleSkills.map((skill, i) => {
        const angle = (i / middleSkills.length) * 360 - 90;
        const radius = 170;
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        
        return (
          <motion.span
            key={skill}
            className="absolute text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap z-20"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              color: colors[(i + 3) % colors.length],
              textShadow: `0 0 8px ${colors[(i + 3) % colors.length]}50`,
              background: `${colors[(i + 3) % colors.length]}12`,
              border: `1px solid ${colors[(i + 3) % colors.length]}25`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.03, duration: 0.3 }}
            whileHover={{ scale: 1.2, zIndex: 50 }}
          >
            {skill}
          </motion.span>
        );
      })}

      {/* Outer ring of skills */}
      {outerSkills.map((skill, i) => {
        const angle = (i / outerSkills.length) * 360 - 90;
        const radius = 250;
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        
        return (
          <motion.span
            key={skill}
            className="absolute text-[9px] sm:text-[11px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap z-20"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              color: colors[(i + 5) % colors.length],
              textShadow: `0 0 6px ${colors[(i + 5) % colors.length]}40`,
              background: `${colors[(i + 5) % colors.length]}10`,
              border: `1px solid ${colors[(i + 5) % colors.length]}20`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.75, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.02, duration: 0.3 }}
            whileHover={{ scale: 1.2, zIndex: 50, opacity: 1 }}
          >
            {skill}
          </motion.span>
        );
      })}
      
      {/* Blue sparks */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute rounded-full bg-blue-400 z-30"
          style={{
            width: spark.size,
            height: spark.size,
            boxShadow: "0 0 6px 2px rgba(96, 165, 250, 0.8)"
          }}
          animate={{ 
            x: [0, Math.cos(spark.angle * Math.PI / 180) * 140],
            y: [0, Math.sin(spark.angle * Math.PI / 180) * 140],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: 1.6,
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
            className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground drop-shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            90+
          </motion.span>
          <p className="text-[10px] sm:text-xs text-primary-foreground/80">Skills</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsSphere;
