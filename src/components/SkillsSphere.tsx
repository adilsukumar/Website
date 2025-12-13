import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const skills = [
  "Python", "React", "AI/ML", "TensorFlow", "Data Science", "JavaScript",
  "TypeScript", "Node.js", "FinTech", "Deep Learning", "NLP", "PyTorch",
  "Bioinformatics", "Trading Bots", "IoT", "MongoDB", "SQL", "Docker",
  "Leadership", "Arduino", "Automation", "Gen AI", "LLMs", "Robotics",
  "Flask", "Django", "C++", "Git", "Linux", "APIs"
];

const colors = ["#f472b6", "#a78bfa", "#60a5fa", "#34d399", "#fbbf24", "#f87171"];

interface SkillPosition {
  x: number;
  y: number;
  z: number;
  skill: string;
  color: string;
}

const SkillsSphere = () => {
  const [positions, setPositions] = useState<SkillPosition[]>([]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const newPositions = skills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      return {
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        skill,
        color: colors[i % colors.length]
      };
    });
    setPositions(newPositions);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.004);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const getTransformedPosition = (pos: SkillPosition) => {
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);
    const x = pos.x * cosR - pos.z * sinR;
    const z = pos.x * sinR + pos.z * cosR;
    
    const scale = 1 / (2 - z);
    const screenX = x * scale * 180;
    const screenY = pos.y * scale * 180;
    const opacity = (z + 1) / 2 * 0.8 + 0.2;
    const zIndex = Math.round((z + 1) * 10);
    const fontSize = 11 + (z + 1) * 4;
    
    return { screenX, screenY, opacity, zIndex, fontSize };
  };

  // Generate spark positions
  const sparks = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * 360,
    delay: i * 0.15,
    size: Math.random() * 4 + 2
  }));

  return (
    <div className="relative w-full h-[500px] sm:h-[550px] flex items-center justify-center overflow-hidden">
      {/* Large glowing orb */}
      <motion.div 
        className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, hsl(var(--primary)), hsl(var(--primary) / 0.6) 40%, hsl(var(--primary) / 0.2) 70%, transparent 100%)",
          boxShadow: "0 0 80px 20px hsl(var(--primary) / 0.4), 0 0 120px 40px hsl(var(--primary) / 0.2), inset 0 0 60px hsl(var(--primary) / 0.3)"
        }}
        animate={{ 
          scale: [1, 1.03, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Blue sparks */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: spark.size,
            height: spark.size,
            boxShadow: "0 0 8px 2px rgba(96, 165, 250, 0.8)"
          }}
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: [0, Math.cos(spark.angle * Math.PI / 180) * 200],
            y: [0, Math.sin(spark.angle * Math.PI / 180) * 200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: 2.5,
            delay: spark.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Orbiting skills */}
      <div className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px]">
        {positions.map((pos) => {
          const { screenX, screenY, opacity, zIndex, fontSize } = getTransformedPosition(pos);
          return (
            <motion.span
              key={pos.skill}
              className="absolute left-1/2 top-1/2 whitespace-nowrap font-medium transition-all duration-75"
              style={{
                transform: `translate(calc(-50% + ${screenX}px), calc(-50% + ${screenY}px))`,
                opacity,
                zIndex,
                fontSize: `${fontSize}px`,
                color: pos.color,
                textShadow: `0 0 12px ${pos.color}50`
              }}
            >
              {pos.skill}
            </motion.span>
          );
        })}
      </div>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="text-center">
          <span className="text-5xl sm:text-6xl font-display font-bold text-primary-foreground drop-shadow-lg">90+</span>
          <p className="text-sm text-primary-foreground/80 mt-1">Skills</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsSphere;
