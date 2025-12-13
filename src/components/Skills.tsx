import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2,
  Palette,
  Zap,
  Globe,
  Database,
  Smartphone,
} from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const backgroundY = useTransform(smoothProgress, [0, 1], [200, -200]);
  const backgroundRotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const sectionOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "Building responsive, performant interfaces with React, Next.js, and modern CSS.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      color: "from-cyan-500 to-blue-500",
      emoji: "⚛️",
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Creating scalable APIs and services with Node.js, Python, and cloud platforms.",
      technologies: ["Node.js", "Python", "PostgreSQL", "AWS"],
      color: "from-green-500 to-emerald-500",
      emoji: "🗄️",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Crafting intuitive, beautiful interfaces that users love to interact with.",
      technologies: ["Figma", "Adobe XD", "Framer", "Prototyping"],
      color: "from-purple-500 to-pink-500",
      emoji: "🎨",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Building cross-platform mobile applications with React Native.",
      technologies: ["React Native", "Expo", "iOS", "Android"],
      color: "from-orange-500 to-red-500",
      emoji: "📱",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing for speed, accessibility, and exceptional user experiences.",
      technologies: ["Lighthouse", "Web Vitals", "SEO", "A11y"],
      color: "from-yellow-500 to-orange-500",
      emoji: "⚡",
    },
    {
      icon: Globe,
      title: "DevOps & Cloud",
      description: "Deploying and managing applications at scale with modern infrastructure.",
      technologies: ["Docker", "Kubernetes", "CI/CD", "Vercel"],
      color: "from-indigo-500 to-purple-500",
      emoji: "☁️",
    },
  ];

  return (
    <section
      id="skills"
      className="py-32 relative noise spotlight overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background decoration */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity: sectionOpacity }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-animated blob opacity-10"
          style={{ y: backgroundY, rotate: backgroundRotate }}
        />
        {/* Grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at center, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 rounded-full blur-3xl ${i % 2 === 0 ? 'bg-primary/20' : 'bg-secondary/20'}`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-50, 50, -50],
              x: [-30, 30, -30],
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        className="container mx-auto px-6 relative z-10" 
        ref={ref}
        style={{ opacity: sectionOpacity }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header with intense animation */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 border-gradient-animated"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.span>
              <span className="text-sm text-muted-foreground">My Expertise</span>
            </motion.div>

            <motion.h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 overflow-hidden">
              {"What I ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: -90, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
                  transition={{ 
                    delay: 0.3 + i * 0.04, 
                    duration: 0.6, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span 
                className="holographic"
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                Do
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              I specialize in building complete digital products, from concept to deployment.
            </motion.p>
          </motion.div>

          {/* Skills grid with stagger */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 100, rotateX: -20, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.9 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ 
                  y: -20, 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="group glass-strong p-6 rounded-2xl border-gradient-animated hover:glow-intense transition-smooth cursor-pointer perspective-1000 relative overflow-hidden"
              >
                {/* Animated background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0`}
                  animate={{ opacity: hoveredCard === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon with rotation */}
                <motion.div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r ${skill.color} relative overflow-hidden`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 1.1 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={hoveredCard === index ? { x: ["-100%", "100%"] } : {}}
                    transition={{ duration: 0.6 }}
                  />
                  <skill.icon className="w-7 h-7 text-white relative z-10" />
                </motion.div>

                {/* Title with emoji */}
                <motion.h3
                  className="font-display text-xl font-semibold mb-2 group-hover:text-gradient transition-smooth flex items-center gap-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {skill.title}
                  <motion.span
                    animate={hoveredCard === index ? { 
                      rotate: [0, -15, 15, 0],
                      scale: [1, 1.3, 1],
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {skill.emoji}
                  </motion.span>
                </motion.h3>

                <motion.p
                  className="text-muted-foreground text-sm mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.3 + index * 0.1 }}
                >
                  {skill.description}
                </motion.p>

                {/* Technology tags */}
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0, rotate: -10 }}
                      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                      transition={{
                        delay: 1.4 + index * 0.1 + techIndex * 0.05,
                        type: "spring",
                        stiffness: 300,
                      }}
                      whileHover={{
                        scale: 1.15,
                        y: -3,
                        backgroundColor: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                      }}
                      className="px-3 py-1 bg-muted text-xs text-muted-foreground rounded-full cursor-pointer transition-smooth"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Animated corner decoration */}
                <motion.div
                  className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${skill.color} rounded-full blur-2xl opacity-0`}
                  animate={{ opacity: hoveredCard === index ? 0.3 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
