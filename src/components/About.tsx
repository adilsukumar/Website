import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothProgress, [0, 1], [150, -150]);
  const rotate = useTransform(smoothProgress, [0, 1], [-5, 15]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const stats = [
    { value: "5+", label: "Years Experience", emoji: "🚀" },
    { value: "50+", label: "Projects Completed", emoji: "💼" },
    { value: "30+", label: "Happy Clients", emoji: "😊" },
  ];

  const techBadges = [
    { name: "React", color: "from-cyan-400 to-blue-500", position: "-top-4 -right-4", delay: 0.5 },
    { name: "TypeScript", color: "from-blue-500 to-indigo-600", position: "-bottom-4 -left-4", delay: 0.7 },
    { name: "Next.js", color: "from-gray-600 to-gray-800", position: "top-1/2 -right-8", delay: 0.9 },
    { name: "Node.js", color: "from-green-500 to-emerald-600", position: "-top-4 left-1/4", delay: 1.1 },
  ];

  return (
    <section id="about" className="py-32 relative noise spotlight overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl blob"
          style={{ y, rotate }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl blob"
          style={{ y: useTransform(smoothProgress, [0, 1], [-100, 100]) }}
        />
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-6" 
        ref={ref}
        style={{ opacity }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image/Visual side with parallax */}
            <motion.div
              initial={{ opacity: 0, x: -150, rotateY: -30 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative perspective-1000"
            >
              <motion.div
                className="relative aspect-square max-w-md mx-auto preserve-3d"
                style={{ y, rotate, scale }}
              >
                {/* Decorative glow ring */}
                <motion.div
                  className="absolute inset-0 bg-gradient-animated rounded-3xl blur-3xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Glass card with animated border */}
                <motion.div
                  className="absolute inset-4 glass-strong rounded-3xl border-gradient-animated overflow-hidden"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />

                {/* Main image area */}
                <motion.div
                  className="absolute inset-8 bg-muted rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-animated opacity-20"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="w-full h-full flex items-center justify-center relative">
                    <motion.span
                      className="text-8xl"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.15, 1],
                        y: [0, -10, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
                    >
                      👨‍💻
                    </motion.span>
                  </div>
                </motion.div>

                {/* Floating tech badges */}
                {techBadges.map((badge, i) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ delay: badge.delay, type: "spring", stiffness: 200, damping: 15 }}
                    className={`absolute ${badge.position}`}
                  >
                    <motion.div
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
                      whileHover={{ scale: 1.3, rotate: 10 }}
                      className={`glass px-4 py-2 rounded-xl cursor-pointer bg-gradient-to-r ${badge.color} glow`}
                    >
                      <span className="text-white font-display font-semibold text-sm">
                        {badge.name}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Section title with letter animation */}
              <motion.h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 overflow-hidden">
                {"Building the ".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 60, rotateX: -90 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <motion.span 
                  className="holographic"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                >
                  future
                </motion.span>
                {" of the web".split("").map((char, i) => (
                  <motion.span
                    key={`end-${i}`}
                    initial={{ opacity: 0, y: 60, rotateX: -90 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h2>

              {/* Description with word reveal */}
              <motion.div className="space-y-4 text-muted-foreground text-lg mb-10">
                {[
                  "I'm a passionate full-stack developer with a keen eye for design and a love for creating seamless user experiences. My journey in tech started over 5 years ago, and I've been hooked ever since.",
                  "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community."
                ].map((paragraph, pIndex) => (
                  <motion.p key={pIndex}>
                    {paragraph.split(" ").map((word, wIndex) => (
                      <motion.span
                        key={wIndex}
                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{
                          delay: 1.2 + pIndex * 0.3 + wIndex * 0.02,
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="inline-block mr-1.5"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.p>
                ))}
              </motion.div>

              {/* Stats with counter animation */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 80, scale: 0.5, rotateX: -45 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
                    transition={{ 
                      duration: 0.8, 
                      delay: 1.8 + index * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -10,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className="text-center glass p-4 rounded-xl cursor-pointer group border-gradient-animated"
                  >
                    <motion.span
                      className="text-2xl block mb-2"
                      animate={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {stat.emoji}
                    </motion.span>
                    <motion.div 
                      className="font-display text-3xl font-bold holographic"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 2 + index * 0.15, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.div>
                    <motion.div 
                      className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-smooth"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 2.1 + index * 0.15 }}
                    >
                      {stat.label}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
