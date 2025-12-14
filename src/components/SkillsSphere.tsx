import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import { Sparkles } from "lucide-react";

// Extended skills with categories and colors matching the theme
const skillCategories = [
  {
    name: "AI & Intelligence",
    color: "hsl(280, 100%, 65%)",
    glow: "hsl(280, 100%, 65%)",
    skills: ["Gen AI", "Deep Learning", "NLP", "TensorFlow", "AI/ML", "Neural Networks", "Computer Vision", "LLMs", "PyTorch"],
  },
  {
    name: "Development",
    color: "hsl(185, 100%, 50%)",
    glow: "hsl(185, 100%, 50%)",
    skills: ["React", "TypeScript", "Python", "Node.js", "APIs", "Git", "MongoDB", "SQL", "FastAPI", "Docker", "REST"],
  },
  {
    name: "Data & Analytics",
    color: "hsl(45, 100%, 60%)",
    glow: "hsl(45, 100%, 60%)",
    skills: ["Data Science", "Analytics", "Visualization", "Statistics", "Big Data", "Pandas", "NumPy", "Tableau"],
  },
  {
    name: "FinTech",
    color: "hsl(142, 70%, 50%)",
    glow: "hsl(142, 70%, 50%)",
    skills: ["Trading Bots", "PineScript", "Algo Trading", "Technical Analysis", "Quant", "Risk Analysis", "Backtesting"],
  },
  {
    name: "BioTech",
    color: "hsl(15, 90%, 55%)",
    glow: "hsl(15, 90%, 55%)",
    skills: ["Genomics", "Bioinformatics", "NGS", "Molecular", "Drug Discovery", "CRISPR", "Proteomics"],
  },
  {
    name: "Hardware & IoT",
    color: "hsl(200, 90%, 60%)",
    glow: "hsl(200, 90%, 60%)",
    skills: ["Arduino", "IoT", "Robotics", "Embedded", "Voice AI", "Sensors", "Raspberry Pi", "3D Printing"],
  },
  {
    name: "Leadership",
    color: "hsl(330, 80%, 60%)",
    glow: "hsl(330, 80%, 60%)",
    skills: ["Team Lead", "Strategy", "Public Speaking", "Mentoring", "Agile", "Product"],
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
  const radius = 40 + Math.sqrt(index / total) * 250;
  
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
  isInArea,
  onHover,
  onTouch,
  isTouched,
  time,
}: { 
  skill: typeof allSkills[0];
  position: { x: number; y: number; z: number; baseAngle: number; baseRadius: number };
  index: number;
  isHovered: boolean;
  isInArea: boolean;
  onHover: (index: number | null) => void;
  onTouch: (index: number | null) => void;
  isTouched: boolean;
  time: number;
}) => {
  // Different movement patterns based on index
  const patternType = index % 4;
  const baseSpeed = 0.00006 + (index % 6) * 0.00001;
  const speedMultiplier = isInArea ? 0.5 : 1;
  const t = time * baseSpeed * speedMultiplier;
  
  // Create flowing patterns that change direction smoothly
  let animatedX: number;
  let animatedY: number;
  
  if (!isInArea) {
    // Normal pattern - smooth orbital with wave variations
    const wave1 = Math.sin(t * 1.2 + index * 0.5) * 15;
    const wave2 = Math.cos(t * 0.8 + index * 0.3) * 10;
    animatedX = Math.cos(position.baseAngle + t) * position.baseRadius + wave1;
    animatedY = Math.sin(position.baseAngle + t) * position.baseRadius * 0.6 + wave2;
  } else {
    // Alternative pattern when cursor is in area - figure-8 / lemniscate variations
    const phase = index * 0.4;
    if (patternType === 0) {
      // Figure-8 pattern
      animatedX = Math.cos(t + phase) * position.baseRadius * 0.9;
      animatedY = Math.sin(t * 2 + phase) * position.baseRadius * 0.35;
    } else if (patternType === 1) {
      // Elliptical with drift
      animatedX = Math.cos(t * 0.7 + phase) * position.baseRadius + Math.sin(t * 0.3) * 20;
      animatedY = Math.sin(t * 0.7 + phase) * position.baseRadius * 0.5 + Math.cos(t * 0.2) * 15;
    } else if (patternType === 2) {
      // Gentle wave pattern
      animatedX = Math.cos(t * 0.5 + phase) * position.baseRadius * 0.85 + Math.sin(t * 1.5) * 25;
      animatedY = Math.sin(t * 0.6 + phase) * position.baseRadius * 0.55;
    } else {
      // Spiraling inward/outward
      const radiusMod = position.baseRadius * (0.85 + Math.sin(t * 0.4) * 0.15);
      animatedX = Math.cos(t * 0.8 + phase) * radiusMod;
      animatedY = Math.sin(t * 0.8 + phase) * radiusMod * 0.55;
    }
  }

  const size = 5 + (position.z + 50) / 20;
  const opacity = 0.5 + (position.z + 50) / 130;
  
  // Glow scales up on touch (click), not hover
  const glowScale = isTouched ? 2.2 : 1;
  const glowOpacity = isTouched ? 1 : 0.35;
  const coreGlow = isTouched ? 40 : 8;

  return (
    <div
      className="absolute cursor-pointer"
      style={{
        left: `calc(50% + ${animatedX}px)`,
        top: `calc(50% + ${animatedY}px)`,
        zIndex: Math.floor(position.z + 50),
        transition: "transform 0.3s ease-out",
        transform: `scale(${isTouched ? 1.8 : isHovered ? 1.3 : 1})`,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onTouch(isTouched ? null : index)}
    >
      {/* Glow aura - grows bigger and brighter on touch */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 3 * glowScale,
          height: size * 3 * glowScale,
          background: `radial-gradient(circle, ${skill.glow}${isTouched ? '90' : '40'}, transparent 70%)`,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          filter: `blur(${isTouched ? 6 : 3}px)`,
          transition: "all 0.3s ease-out",
          opacity: glowOpacity,
        }}
      />
      
      {/* Core node */}
      <div
        className="rounded-full relative"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), ${skill.color})`,
          boxShadow: `0 0 ${coreGlow}px ${skill.glow}, inset 0 0 ${size/3}px rgba(255,255,255,0.4)`,
          opacity,
          transition: "box-shadow 0.3s ease-out",
        }}
      />

      {/* Skill label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-1/2 whitespace-nowrap pointer-events-none"
            style={{
              top: size + 14,
              transform: "translateX(-50%)",
            }}
            initial={{ opacity: 0, y: -10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div 
              className="px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur-xl"
              style={{
                background: `linear-gradient(135deg, ${skill.color}50, ${skill.color}20)`,
                border: `1px solid ${skill.color}60`,
                color: "white",
                boxShadow: `0 10px 40px ${skill.glow}40, 0 0 0 1px ${skill.color}20`,
              }}
            >
              {skill.name}
            </div>
            <div 
              className="text-[10px] text-center mt-1.5 font-medium tracking-wide uppercase"
              style={{ color: skill.color, opacity: 0.85 }}
            >
              {skill.category}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Animated flowing connection lines
const ConnectionLines = ({ 
  positions, 
  time,
  isPaused,
}: { 
  positions: { x: number; y: number; z: number; baseAngle: number; baseRadius: number }[];
  time: number;
  isPaused: boolean;
}) => {
  // Use 40% speed when in area, 100% otherwise
  const speedMultiplier = isPaused ? 0.4 : 1;
  const connections: { from: number; to: number; opacity: number }[] = [];
  
  positions.forEach((pos1, i) => {
    positions.forEach((pos2, j) => {
      if (i < j) {
        const orbitSpeed1 = (0.00008 + (i % 5) * 0.00002) * speedMultiplier;
        const orbitSpeed2 = (0.00008 + (j % 5) * 0.00002) * speedMultiplier;
        
        const x1 = Math.cos(pos1.baseAngle + time * orbitSpeed1) * pos1.baseRadius;
        const y1 = Math.sin(pos1.baseAngle + time * orbitSpeed1) * pos1.baseRadius * 0.6;
        const x2 = Math.cos(pos2.baseAngle + time * orbitSpeed2) * pos2.baseRadius;
        const y2 = Math.sin(pos2.baseAngle + time * orbitSpeed2) * pos2.baseRadius * 0.6;
        
        const dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        if (dist < 80 && connections.length < 30) {
          connections.push({
            from: i,
            to: j,
            opacity: (1 - dist / 80) * 0.3,
          });
        }
      }
    });
  });

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(185, 100%, 50%)" stopOpacity="0.12" />
          <stop offset="50%" stopColor="hsl(280, 100%, 65%)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(185, 100%, 50%)" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {connections.map((conn, i) => {
        const orbitSpeed1 = (0.00008 + (conn.from % 5) * 0.00002) * speedMultiplier;
        const orbitSpeed2 = (0.00008 + (conn.to % 5) * 0.00002) * speedMultiplier;
        
        const x1 = Math.cos(positions[conn.from].baseAngle + time * orbitSpeed1) * positions[conn.from].baseRadius + 350;
        const y1 = Math.sin(positions[conn.from].baseAngle + time * orbitSpeed1) * positions[conn.from].baseRadius * 0.6 + 350;
        const x2 = Math.cos(positions[conn.to].baseAngle + time * orbitSpeed2) * positions[conn.to].baseRadius + 350;
        const y2 = Math.sin(positions[conn.to].baseAngle + time * orbitSpeed2) * positions[conn.to].baseRadius * 0.6 + 350;
        
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            opacity={conn.opacity}
          />
        );
      })}
    </svg>
  );
};

// More particles / background stars
const BackgroundStars = () => {
  const stars = useMemo(() => Array.from({ length: 120 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.5 + Math.random() * 2,
    twinkleSpeed: 2 + Math.random() * 4,
    delay: Math.random() * 3,
    colorIndex: i % 4,
  })), []);

  return (
    <>
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: star.colorIndex === 0 
              ? "hsl(185, 100%, 70%)" 
              : star.colorIndex === 1 
                ? "hsl(280, 100%, 75%)" 
                : star.colorIndex === 2
                  ? "hsl(45, 100%, 80%)"
                  : "hsl(0, 0%, 90%)",
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.twinkleSpeed,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

// Left-side shooting hint text
const HoverHint = () => {
  return (
    <motion.div
      className="absolute left-4 top-[22%] z-50 flex items-center gap-3 pointer-events-none"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: [-40, 0, -40] }}
      transition={{
        delay: 1.5,
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Shooting star trail */}
      <motion.div
        className="h-0.5 w-24 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(185, 100%, 55%), hsl(280, 100%, 70%))",
        }}
        animate={{ opacity: [0.1, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Star + text */}
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5 text-primary drop-shadow-[0_0_10px_hsl(185,100%,50%)]" />
        </motion.div>
        <motion.span
          className="text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap"
          style={{
            background:
              "linear-gradient(90deg, hsl(185, 100%, 60%), hsl(280, 100%, 70%))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Hover the stars to explore
        </motion.span>
      </div>
    </motion.div>
  );
};

const SkillsSphere = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);
  const [isInArea, setIsInArea] = useState(false);
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation loop for flowing effect
  useEffect(() => {
    let animationId: number;
    let lastTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      setTime(prev => prev + (now - lastTime));
      lastTime = now;
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const positions = useMemo(() => 
    allSkills.map((_, i) => generateGalaxyPosition(i, allSkills.length)), 
    []
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[700px] overflow-hidden"
      onMouseEnter={() => setIsInArea(true)}
      onMouseLeave={() => { setIsInArea(false); setHoveredIndex(null); }}
    >
      {/* Background radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 45% at 50% 50%, 
              hsl(280, 100%, 65%, 0.05) 0%, 
              hsl(185, 100%, 50%, 0.03) 40%, 
              transparent 70%
            )
          `,
        }}
      />

      {/* Background stars */}
      <BackgroundStars />

      {/* Top hint text */}
      <HoverHint />

      {/* Main galaxy container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Connection lines */}
        <ConnectionLines positions={positions} time={time} isPaused={isInArea} />

        {/* Center core */}
        <motion.div
          className="absolute z-30"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Spinning outer rings */}
          <motion.div
            className="absolute rounded-full border border-primary/15"
            style={{
              width: 140,
              height: 140,
              left: -70,
              top: -70,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute rounded-full border border-secondary/15"
            style={{
              width: 100,
              height: 100,
              left: -50,
              top: -50,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Glow orbs */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 80,
              height: 80,
              left: -40,
              top: -40,
              background: `radial-gradient(circle, hsl(185, 100%, 50%, 0.12), transparent 70%)`,
              filter: "blur(12px)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 60,
              height: 60,
              left: -30,
              top: -30,
              background: `radial-gradient(circle, hsl(280, 100%, 65%, 0.15), transparent 70%)`,
              filter: "blur(10px)",
            }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          
          {/* Core text */}
          <div 
            className="relative text-5xl sm:text-6xl font-bold font-display holographic select-none"
            style={{
              textShadow: `
                0 0 20px hsl(185, 100%, 50%),
                0 0 40px hsl(185, 100%, 50%, 0.4),
                0 0 60px hsl(280, 100%, 65%, 0.2)
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
            isInArea={isInArea}
            onHover={setHoveredIndex}
            onTouch={setTouchedIndex}
            isTouched={touchedIndex === index}
            time={time}
          />
        ))}
      </div>

      {/* Skill count badge */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-5 py-2.5 rounded-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 80 }}
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
        transition={{ delay: 2.5 }}
      >
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs backdrop-blur-md"
            style={{
              background: `${cat.color}12`,
              border: `1px solid ${cat.color}25`,
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.7 + i * 0.06, type: "spring", stiffness: 80 }}
            whileHover={{ 
              scale: 1.05, 
              background: `${cat.color}20`,
              transition: { duration: 0.25 }
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: cat.color }}
              animate={{ 
                boxShadow: [
                  `0 0 3px ${cat.glow}`,
                  `0 0 6px ${cat.glow}`,
                  `0 0 3px ${cat.glow}`,
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span style={{ color: cat.color }}>{cat.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsSphere;
