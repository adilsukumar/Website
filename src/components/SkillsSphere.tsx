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
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<SkillPosition[]>([]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Calculate initial positions on a sphere
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
      setRotation(prev => prev + 0.005);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const getTransformedPosition = (pos: SkillPosition) => {
    // Rotate around Y axis
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);
    const x = pos.x * cosR - pos.z * sinR;
    const z = pos.x * sinR + pos.z * cosR;
    
    // Project to 2D with perspective
    const scale = 1 / (2 - z);
    const screenX = x * scale * 120;
    const screenY = pos.y * scale * 120;
    const opacity = (z + 1) / 2 * 0.8 + 0.2;
    const zIndex = Math.round((z + 1) * 10);
    const fontSize = 10 + (z + 1) * 3;
    
    return { screenX, screenY, opacity, zIndex, fontSize };
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] flex items-center justify-center overflow-hidden">
      {/* Glowing center orb */}
      <motion.div 
        className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-primary/30 via-purple-500/20 to-pink-500/30 blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Wireframe sphere effect */}
      <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-primary/20" />
      <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-primary/10 rotate-45" />
      <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-primary/10 -rotate-45" />
      
      {/* Orbiting skills */}
      <div ref={containerRef} className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]">
        {positions.map((pos, i) => {
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
                textShadow: `0 0 10px ${pos.color}40`
              }}
            >
              {pos.skill}
            </motion.span>
          );
        })}
      </div>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center bg-background/80 backdrop-blur-sm rounded-full px-6 py-4">
          <span className="text-4xl sm:text-5xl font-display font-bold text-gradient">90+</span>
          <p className="text-xs text-muted-foreground mt-1">Skills</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsSphere;
