import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Extended skills with categories and colors matching the theme
const skillCategories = [
  {
    name: "AI & Intelligence",
    color: "hsl(280, 100%, 65%)", // secondary violet
    glow: "hsl(280, 100%, 65%)",
    skills: ["Gen AI", "Deep Learning", "NLP", "TensorFlow", "AI/ML", "Neural Networks", "Computer Vision"],
  },
  {
    name: "Development",
    color: "hsl(185, 100%, 50%)", // primary cyan
    glow: "hsl(185, 100%, 50%)",
    skills: ["React", "TypeScript", "Python", "Node.js", "APIs", "Git", "MongoDB", "SQL"],
  },
  {
    name: "Data & Analytics",
    color: "hsl(45, 100%, 60%)", // gold
    glow: "hsl(45, 100%, 60%)",
    skills: ["Data Science", "Analytics", "Visualization", "Statistics", "Big Data"],
  },
  {
    name: "FinTech",
    color: "hsl(142, 70%, 50%)", // green
    glow: "hsl(142, 70%, 50%)",
    skills: ["Trading Bots", "PineScript", "Algo Trading", "Technical Analysis", "Quant"],
  },
  {
    name: "BioTech",
    color: "hsl(15, 90%, 55%)", // orange
    glow: "hsl(15, 90%, 55%)",
    skills: ["Genomics", "Bioinformatics", "NGS", "Molecular", "Drug Discovery"],
  },
  {
    name: "Hardware & IoT",
    color: "hsl(200, 90%, 60%)", // sky blue
    glow: "hsl(200, 90%, 60%)",
    skills: ["Arduino", "IoT", "Robotics", "Embedded", "Voice AI", "Sensors"],
  },
  {
    name: "Leadership",
    color: "hsl(330, 80%, 60%)", // pink
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
  const radius = 30 + Math.sqrt(index / total) * 280;
  
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 0.6, // Elliptical for depth
    z: (Math.random() - 0.5) * 100,
  };
};

const SkillNode = ({ 
  skill, 
  position, 
  index, 
  isHovered,
  onHover,
}: { 
  skill: typeof allSkills[0];
  position: { x: number; y: number; z: number };
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}) => {
  const scale = useSpring(1, { stiffness: 400, damping: 25 });
  const brightness = useSpring(1, { stiffness: 300, damping: 20 });
  
  useEffect(() => {
    scale.set(isHovered ? 1.3 : 1);
    brightness.set(isHovered ? 1.5 : 1);
  }, [isHovered, scale, brightness]);

  const size = 8 + (position.z + 50) / 15;
  const opacity = 0.5 + (position.z + 50) / 100;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        zIndex: Math.floor(position.z + 50),
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
      }}
      transition={{ 
        delay: index * 0.02,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Glow ring */}
      <motion.div
        className="absolute rounded-full blur-md"
        style={{
          width: size * 3,
          height: size * 3,
          background: skill.glow,
          opacity: isHovered ? 0.6 : 0.2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
        }}
      />
      
      {/* Core node */}
      <motion.div
        className="rounded-full relative"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, white, ${skill.color})`,
          boxShadow: `0 0 ${isHovered ? 20 : 8}px ${skill.glow}`,
          opacity,
          scale,
        }}
      />

      {/* Skill label */}
      <motion.div
        className="absolute left-1/2 whitespace-nowrap pointer-events-none"
        style={{
          top: size + 8,
          transform: "translateX(-50%)",
        }}
        initial={{ opacity: 0, y: -5 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : -5,
        }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="px-3 py-1.5 rounded-lg text-sm font-semibold backdrop-blur-md"
          style={{
            background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)`,
            border: `1px solid ${skill.color}60`,
            color: "white",
            boxShadow: `0 4px 20px ${skill.glow}40`,
          }}
        >
          {skill.name}
        </div>
        <div 
          className="text-xs text-center mt-1 opacity-70"
          style={{ color: skill.color }}
        >
          {skill.category}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Animated connection lines between nearby nodes
const ConnectionLines = ({ positions }: { positions: { x: number; y: number; z: number }[] }) => {
  const connections: { from: number; to: number; opacity: number }[] = [];
  
  // Find nearby nodes to connect
  positions.forEach((pos1, i) => {
    positions.forEach((pos2, j) => {
      if (i < j) {
        const dist = Math.sqrt(
          Math.pow(pos1.x - pos2.x, 2) + 
          Math.pow(pos1.y - pos2.y, 2)
        );
        if (dist < 100 && connections.length < 50) {
          connections.push({
            from: i,
            to: j,
            opacity: 1 - dist / 100,
          });
        }
      }
    });
  });

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(185, 100%, 50%)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="hsl(280, 100%, 65%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(185, 100%, 50%)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {connections.map((conn, i) => (
        <motion.line
          key={i}
          x1={positions[conn.from].x + 350}
          y1={positions[conn.from].y + 350}
          x2={positions[conn.to].x + 350}
          y2={positions[conn.to].y + 350}
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: conn.opacity * 0.3,
          }}
          transition={{ 
            delay: 0.5 + i * 0.02,
            duration: 1,
          }}
        />
      ))}
    </svg>
  );
};

// Floating particles
const Particles = () => {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
  }));

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: i % 3 === 0 
              ? "hsl(185, 100%, 50%)" 
              : i % 3 === 1 
                ? "hsl(280, 100%, 65%)" 
                : "hsl(45, 100%, 70%)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

const SkillsSphere = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 50, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-5, 5]), springConfig);

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
      style={{
        perspective: 1000,
      }}
    >
      {/* Background radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 50%, 
              hsl(280, 100%, 65%, 0.08) 0%, 
              hsl(185, 100%, 50%, 0.05) 30%, 
              transparent 70%
            )
          `,
        }}
      />

      {/* Floating particles */}
      <Particles />

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
        <ConnectionLines positions={positions} />

        {/* Center core */}
        <motion.div
          className="absolute z-30"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Outer glow rings */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 120,
              height: 120,
              left: -60,
              top: -60,
              background: `radial-gradient(circle, hsl(185, 100%, 50%, 0.2), transparent 70%)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 80,
              height: 80,
              left: -40,
              top: -40,
              background: `radial-gradient(circle, hsl(280, 100%, 65%, 0.3), transparent 70%)`,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Core text */}
          <div 
            className="relative text-6xl font-bold font-display holographic select-none"
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
          />
        ))}
      </motion.div>

      {/* Skill count badge */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-muted-foreground text-sm">
          <span className="text-primary font-bold">{allSkills.length}+</span> skills across{" "}
          <span className="text-secondary font-bold">{skillCategories.length}</span> domains
        </span>
      </motion.div>

      {/* Category legend */}
      <motion.div
        className="absolute top-4 right-4 flex flex-wrap gap-2 max-w-[200px] justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs backdrop-blur-sm"
            style={{
              background: `${cat.color}20`,
              border: `1px solid ${cat.color}40`,
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 + i * 0.1 }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: cat.color, boxShadow: `0 0 6px ${cat.glow}` }}
            />
            <span style={{ color: cat.color }}>{cat.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SkillsSphere;
