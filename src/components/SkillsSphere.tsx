import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";

// Extended skills with categories and colors matching the theme
const skillCategories = [
  {
    name: "AI & Intelligence",
    color: "hsl(280, 100%, 65%)",
    glow: "hsl(280, 100%, 65%)",
    skills: ["Gen AI", "Deep Learning", "NLP", "TensorFlow", "AI/ML", "Neural Networks", "Computer Vision"],
  },
  {
    name: "Development",
    color: "hsl(185, 100%, 50%)",
    glow: "hsl(185, 100%, 50%)",
    skills: ["React", "TypeScript", "Python", "Node.js", "APIs", "Git", "MongoDB", "SQL"],
  },
  {
    name: "Data & Analytics",
    color: "hsl(45, 100%, 60%)",
    glow: "hsl(45, 100%, 60%)",
    skills: ["Data Science", "Analytics", "Visualization", "Statistics", "Big Data"],
  },
  {
    name: "FinTech",
    color: "hsl(142, 70%, 50%)",
    glow: "hsl(142, 70%, 50%)",
    skills: ["Trading Bots", "PineScript", "Algo Trading", "Technical Analysis", "Quant"],
  },
  {
    name: "BioTech",
    color: "hsl(15, 90%, 55%)",
    glow: "hsl(15, 90%, 55%)",
    skills: ["Genomics", "Bioinformatics", "NGS", "Molecular", "Drug Discovery"],
  },
  {
    name: "Hardware & IoT",
    color: "hsl(200, 90%, 60%)",
    glow: "hsl(200, 90%, 60%)",
    skills: ["Arduino", "IoT", "Robotics", "Embedded", "Voice AI", "Sensors"],
  },
  {
    name: "Leadership",
    color: "hsl(330, 80%, 60%)",
    glow: "hsl(330, 80%, 60%)",
    skills: ["Team Lead", "Strategy", "Public Speaking", "Mentoring"],
  },
];

// Flatten all skills with their category info
const allSkills = skillCategories.flatMap((category, catIndex) =>
  category.skills.map((skill, skillIndex) => ({
    name: skill,
    category: category.name,
    color: category.color,
    glow: category.glow,
    catIndex,
    skillIndex,
  }))
);

// Generate positions in a spiral galaxy pattern
const generateGalaxyPosition = (index: number, total: number) => {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const angle = index * goldenAngle;
  const radius = 35 + Math.sqrt(index / total) * 260;
  
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 0.6,
    z: (Math.random() - 0.5) * 100,
    baseAngle: angle,
    baseRadius: radius,
  };
};

const SkillNode = ({ 
  skill, 
  position, 
  index, 
  isHovered,
  onHover,
  time,
}: { 
  skill: typeof allSkills[0];
  position: { x: number; y: number; z: number; baseAngle: number; baseRadius: number };
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  time: number;
}) => {
  // Flowing orbital movement
  const orbitSpeed = 0.0003 + (index % 5) * 0.0001;
  const floatAmplitude = 3 + (index % 7);
  const floatSpeed = 0.001 + (index % 3) * 0.0005;
  
  const currentAngle = position.baseAngle + time * orbitSpeed;
  const floatOffset = Math.sin(time * floatSpeed + index) * floatAmplitude;
  
  const animatedX = Math.cos(currentAngle) * position.baseRadius + floatOffset;
  const animatedY = Math.sin(currentAngle) * position.baseRadius * 0.6 + Math.cos(time * floatSpeed * 0.7 + index) * floatAmplitude * 0.5;

  const size = 6 + (position.z + 50) / 18;
  const opacity = 0.6 + (position.z + 50) / 120;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `calc(50% + ${animatedX}px)`,
        top: `calc(50% + ${animatedY}px)`,
        zIndex: Math.floor(position.z + 50),
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: isHovered ? 1.4 : 1,
      }}
      transition={{ 
        delay: index * 0.015,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 14,
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Outer pulse ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 4,
          height: size * 4,
          border: `1px solid ${skill.color}`,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: isHovered ? 0.6 : 0,
        }}
        animate={isHovered ? {
          scale: [1, 1.8, 2.2],
          opacity: [0.6, 0.3, 0],
        } : {}}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      
      {/* Glow aura */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 3,
          height: size * 3,
          background: `radial-gradient(circle, ${skill.glow}60, transparent 70%)`,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(4px)",
        }}
        animate={{
          scale: isHovered ? [1, 1.3, 1.1] : [1, 1.15, 1],
          opacity: isHovered ? [0.8, 1, 0.8] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: isHovered ? 0.8 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Core node */}
      <motion.div
        className="rounded-full relative"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), ${skill.color})`,
          boxShadow: `
            0 0 ${isHovered ? 25 : 10}px ${skill.glow},
            inset 0 0 ${size/3}px rgba(255,255,255,0.3)
          `,
          opacity,
        }}
      />

      {/* Skill label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-1/2 whitespace-nowrap pointer-events-none"
            style={{
              top: size + 12,
              transform: "translateX(-50%)",
            }}
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div 
              className="px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur-xl"
              style={{
                background: `linear-gradient(135deg, ${skill.color}50, ${skill.color}25)`,
                border: `1px solid ${skill.color}70`,
                color: "white",
                boxShadow: `
                  0 8px 32px ${skill.glow}50,
                  0 0 0 1px ${skill.color}30
                `,
              }}
            >
              {skill.name}
            </div>
            <div 
              className="text-[10px] text-center mt-1.5 font-medium tracking-wide uppercase"
              style={{ color: skill.color, opacity: 0.8 }}
            >
              {skill.category}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Animated flowing connection lines
const ConnectionLines = ({ 
  positions, 
  time 
}: { 
  positions: { x: number; y: number; z: number; baseAngle: number; baseRadius: number }[];
  time: number;
}) => {
  const connections: { from: number; to: number; opacity: number }[] = [];
  
  positions.forEach((pos1, i) => {
    positions.forEach((pos2, j) => {
      if (i < j) {
        const orbitSpeed1 = 0.0003 + (i % 5) * 0.0001;
        const orbitSpeed2 = 0.0003 + (j % 5) * 0.0001;
        
        const x1 = Math.cos(pos1.baseAngle + time * orbitSpeed1) * pos1.baseRadius;
        const y1 = Math.sin(pos1.baseAngle + time * orbitSpeed1) * pos1.baseRadius * 0.6;
        const x2 = Math.cos(pos2.baseAngle + time * orbitSpeed2) * pos2.baseRadius;
        const y2 = Math.sin(pos2.baseAngle + time * orbitSpeed2) * pos2.baseRadius * 0.6;
        
        const dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        if (dist < 90 && connections.length < 40) {
          connections.push({
            from: i,
            to: j,
            opacity: (1 - dist / 90) * 0.4,
          });
        }
      }
    });
  });

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(185, 100%, 50%)" stopOpacity="0.2" />
          <stop offset="50%" stopColor="hsl(280, 100%, 65%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(185, 100%, 50%)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {connections.map((conn, i) => {
        const orbitSpeed1 = 0.0003 + (conn.from % 5) * 0.0001;
        const orbitSpeed2 = 0.0003 + (conn.to % 5) * 0.0001;
        
        const x1 = Math.cos(positions[conn.from].baseAngle + time * orbitSpeed1) * positions[conn.from].baseRadius + 350;
        const y1 = Math.sin(positions[conn.from].baseAngle + time * orbitSpeed1) * positions[conn.from].baseRadius * 0.6 + 350;
        const x2 = Math.cos(positions[conn.to].baseAngle + time * orbitSpeed2) * positions[conn.to].baseRadius + 350;
        const y2 = Math.sin(positions[conn.to].baseAngle + time * orbitSpeed2) * positions[conn.to].baseRadius * 0.6 + 350;
        
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: conn.opacity }}
            transition={{ duration: 0.5 }}
          />
        );
      })}
    </svg>
  );
};

// Flowing particles with trails
const Particles = ({ time }: { time: number }) => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    baseX: Math.random() * 100,
    baseY: Math.random() * 100,
    size: 1 + Math.random() * 2,
    speed: 0.5 + Math.random() * 1,
    amplitude: 10 + Math.random() * 20,
    phase: Math.random() * Math.PI * 2,
    colorIndex: i % 3,
  }));

  return (
    <>
      {particles.map((p, i) => {
        const x = p.baseX + Math.sin(time * 0.001 * p.speed + p.phase) * p.amplitude * 0.3;
        const y = p.baseY + Math.cos(time * 0.0007 * p.speed + p.phase) * p.amplitude * 0.2;
        const opacity = 0.15 + Math.sin(time * 0.002 + p.phase) * 0.15;
        
        return (
          <div
            key={i}
            className="absolute rounded-full transition-opacity duration-1000"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              opacity,
              background: p.colorIndex === 0 
                ? "hsl(185, 100%, 50%)" 
                : p.colorIndex === 1 
                  ? "hsl(280, 100%, 65%)" 
                  : "hsl(45, 100%, 70%)",
              boxShadow: `0 0 ${p.size * 2}px currentColor`,
            }}
          />
        );
      })}
    </>
  );
};

const SkillsSphere = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 40, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), springConfig);

  // Animation loop for flowing effect
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setTime(Date.now());
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const positions = allSkills.map((_, i) => generateGalaxyPosition(i, allSkills.length));

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[700px] overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ perspective: 1200 }}
    >
      {/* Background radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 45% at 50% 50%, 
              hsl(280, 100%, 65%, 0.06) 0%, 
              hsl(185, 100%, 50%, 0.04) 40%, 
              transparent 70%
            )
          `,
        }}
      />

      {/* Floating particles */}
      <Particles time={time} />

      {/* Left side hint */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex flex-col items-start gap-3">
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
          <div className="writing-vertical text-muted-foreground/70 text-sm font-medium tracking-widest uppercase">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Hover the stars
            </motion.span>
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </motion.div>

      {/* Main galaxy container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Connection lines */}
        <ConnectionLines positions={positions} time={time} />

        {/* Center core */}
        <motion.div
          className="absolute z-30"
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Spinning outer rings */}
          <motion.div
            className="absolute rounded-full border border-primary/20"
            style={{
              width: 140,
              height: 140,
              left: -70,
              top: -70,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute rounded-full border border-secondary/20"
            style={{
              width: 100,
              height: 100,
              left: -50,
              top: -50,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Glow orbs */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 80,
              height: 80,
              left: -40,
              top: -40,
              background: `radial-gradient(circle, hsl(185, 100%, 50%, 0.15), transparent 70%)`,
              filter: "blur(10px)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 60,
              height: 60,
              left: -30,
              top: -30,
              background: `radial-gradient(circle, hsl(280, 100%, 65%, 0.2), transparent 70%)`,
              filter: "blur(8px)",
            }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          
          {/* Core text */}
          <div 
            className="relative text-5xl sm:text-6xl font-bold font-display holographic select-none"
            style={{
              textShadow: `
                0 0 20px hsl(185, 100%, 50%),
                0 0 40px hsl(185, 100%, 50%, 0.5),
                0 0 60px hsl(280, 100%, 65%, 0.3)
              `,
            }}
          >
            {"</>"}
          </div>
        </motion.div>

        {/* Skill nodes */}
        {allSkills.map((skill, index) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            position={positions[index]}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={setHoveredIndex}
            time={time}
          />
        ))}
      </motion.div>

      {/* Skill count badge */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-5 py-2.5 rounded-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 100 }}
      >
        <span className="text-muted-foreground text-sm">
          <span className="text-primary font-bold">{allSkills.length}+</span> skills across{" "}
          <span className="text-secondary font-bold">{skillCategories.length}</span> domains
        </span>
      </motion.div>

      {/* Category legend */}
      <motion.div
        className="absolute top-6 right-6 flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs backdrop-blur-md"
            style={{
              background: `${cat.color}15`,
              border: `1px solid ${cat.color}30`,
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2 + i * 0.08, type: "spring", stiffness: 100 }}
            whileHover={{ 
              scale: 1.05, 
              background: `${cat.color}25`,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: cat.color }}
              animate={{ 
                boxShadow: [
                  `0 0 4px ${cat.glow}`,
                  `0 0 8px ${cat.glow}`,
                  `0 0 4px ${cat.glow}`,
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span style={{ color: cat.color }}>{cat.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CSS for vertical text */}
      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </motion.div>
  );
};

export default SkillsSphere;
