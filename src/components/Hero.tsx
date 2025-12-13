import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smoother spring-based transforms
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothProgress, [0, 1], [0, 300]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.8]);

  const name = "Alex Chen";

  // Smooth spring config for animations
  const springConfig = { stiffness: 100, damping: 15, mass: 1 };
  const gentleSpring = { type: "spring", stiffness: 50, damping: 20 };

  // Generate stars positions
  const stars = [...Array(80)].map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 3,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
  }));

  // Generate constellation lines
  const constellationPoints = [
    { x: 15, y: 20 }, { x: 25, y: 15 }, { x: 35, y: 25 }, { x: 30, y: 35 },
    { x: 65, y: 18 }, { x: 75, y: 22 }, { x: 80, y: 30 }, { x: 72, y: 38 },
    { x: 20, y: 70 }, { x: 30, y: 75 }, { x: 40, y: 68 }, { x: 35, y: 80 },
    { x: 70, y: 65 }, { x: 82, y: 70 }, { x: 78, y: 80 }, { x: 85, y: 85 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.15)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--secondary)/0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(185_100%_50%/0.08)_0%,_transparent_50%)]" />
      </div>

      {/* Aurora/Northern lights effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 left-0 right-0 h-[150%]"
          style={{
            background: `linear-gradient(180deg, 
              transparent 0%, 
              hsl(var(--primary) / 0.03) 20%, 
              hsl(280 100% 60% / 0.05) 40%, 
              hsl(var(--primary) / 0.08) 60%, 
              transparent 100%)`,
          }}
          animate={{
            y: [0, 100, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.div
          className="absolute top-0 left-1/4 w-1/2 h-full"
          style={{
            background: `linear-gradient(180deg, 
              hsl(var(--secondary) / 0.05) 0%, 
              transparent 30%, 
              hsl(var(--primary) / 0.03) 70%, 
              transparent 100%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [-100, 100, -100],
            scaleY: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        />
        {/* Aurora waves */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`aurora-${i}`}
            className="absolute w-full h-40"
            style={{
              top: `${10 + i * 15}%`,
              background: `linear-gradient(90deg, 
                transparent 0%, 
                hsl(${185 + i * 20} 100% 50% / ${0.02 + i * 0.01}) 30%, 
                hsl(${260 + i * 10} 100% 60% / ${0.03 + i * 0.01}) 50%, 
                hsl(${185 + i * 15} 100% 50% / ${0.02 + i * 0.01}) 70%, 
                transparent 100%)`,
              filter: "blur(30px)",
            }}
            animate={{
              x: ["-20%", "20%", "-20%"],
              opacity: [0.3, 0.8, 0.3],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </div>

      {/* Animated morphing blobs with parallax */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-[100%] h-[100%] blob"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 150, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[100%] h-[100%] blob"
          style={{
            background: "radial-gradient(circle, hsl(var(--secondary) / 0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -150, 0],
            y: [0, -80, 0],
            scale: [1.3, 1, 1.3],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        />
        {/* Floating color orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.6, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(280 100% 60% / 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(200 100% 50% / 0.15) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Starfield */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              boxShadow: `0 0 ${star.size * 2}px ${star.size}px hsl(var(--primary) / 0.3)`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </div>

      {/* Constellation lines with glowing dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Draw constellation lines */}
        {[[0,1],[1,2],[2,3],[4,5],[5,6],[6,7],[8,9],[9,10],[10,11],[12,13],[13,14],[14,15]].map(([a, b], i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${constellationPoints[a].x}%`}
            y1={`${constellationPoints[a].y}%`}
            x2={`${constellationPoints[b].x}%`}
            y2={`${constellationPoints[b].y}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
        {/* Constellation points */}
        {constellationPoints.map((point, i) => (
          <motion.circle
            key={`point-${i}`}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r="3"
            fill="hsl(var(--primary))"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </svg>

      {/* Shooting stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-32 h-0.5"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), transparent)",
              top: `${10 + i * 18}%`,
              left: "-10%",
              transform: "rotate(-15deg)",
            }}
            animate={{
              x: ["0%", "150vw"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 3 + i * 4,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Animated mesh grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Radial pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </div>

      {/* Floating particles with glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              background: i % 3 === 0 
                ? "hsl(var(--primary))" 
                : i % 3 === 1 
                ? "hsl(var(--secondary))" 
                : "hsl(200 100% 70%)",
              boxShadow: `0 0 ${10 + Math.random() * 10}px ${5}px ${
                i % 3 === 0 
                  ? "hsl(var(--primary) / 0.5)" 
                  : i % 3 === 1 
                  ? "hsl(var(--secondary) / 0.5)" 
                  : "hsl(200 100% 70% / 0.5)"
              }`,
            }}
            animate={{
              y: [-50, -200, -50],
              x: [0, (Math.random() - 0.5) * 200, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 12,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </div>

      {/* Animated energy beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute h-full w-1"
            style={{
              left: `${25 + i * 25}%`,
              background: `linear-gradient(180deg, 
                transparent 0%, 
                hsl(var(--primary) / 0.2) 30%, 
                hsl(var(--primary) / 0.4) 50%, 
                hsl(var(--primary) / 0.2) 70%, 
                transparent 100%)`,
              filter: "blur(2px)",
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleY: [0.5, 1, 0.5],
              y: ["-50%", "50%", "-50%"],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </div>

      {/* Corner glow accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-primary/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-secondary/20 to-transparent blur-3xl" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-radial from-cyan-500/10 to-transparent blur-3xl" />
      <div className="absolute top-0 right-1/3 w-64 h-64 bg-gradient-radial from-purple-500/10 to-transparent blur-3xl" />

      <motion.div
        className="relative z-10 container mx-auto px-6"
        style={{ opacity, scale }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Status badge with smooth bounce */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 50, damping: 20 }}
            className="flex items-center gap-2 mb-8"
          >
            <motion.span
              className="relative flex h-3 w-3"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary glow-intense"></span>
            </motion.span>
            <motion.span
              className="text-muted-foreground text-sm tracking-wider uppercase flex items-center gap-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            >
              <Sparkles className="w-3 h-3" />
              Available for projects
            </motion.span>
          </motion.div>

          {/* Main heading with smooth letter animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-tight"
            >
              Hi, I'm
            </motion.span>
            <div className="overflow-hidden">
              <motion.div className="holographic block font-display text-5xl sm:text-7xl lg:text-8xl font-bold">
                {name.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 80, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.3 + i * 0.06,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      color: "hsl(var(--primary))",
                      transition: { duration: 0.2 }
                    }}
                    className="inline-block cursor-default"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Subtitle with smooth word reveal */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mb-12"
          >
            {"Creative developer crafting exceptional digital experiences. I turn complex ideas into elegant, performant solutions."
              .split(" ")
              .map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.9 + i * 0.04,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
          </motion.p>

          {/* CTA buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-animated text-primary-foreground font-display font-semibold rounded-xl overflow-hidden glow-intense border-gradient-animated"
              whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%", skewX: -20 }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <span className="relative z-10">View My Work</span>
            </motion.a>
            <motion.a
              href="#contact"
              className="group px-8 py-4 glass font-display font-semibold rounded-xl relative overflow-hidden border-gradient-animated"
              whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-20"
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10">Get In Touch</span>
            </motion.a>
          </motion.div>

          {/* Social links with smooth stagger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex items-center gap-6"
          >
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 1.7 + i * 0.12,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.2,
                  y: -5,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass rounded-xl text-muted-foreground hover:text-primary hover:glow-intense transition-smooth"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator with smooth pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <motion.span
            className="text-xs tracking-widest uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          >
            Scroll
          </motion.span>
          <motion.div
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center relative overflow-hidden"
          >
            <motion.div
              className="w-1.5 h-3 bg-gradient rounded-full mt-2"
              animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
