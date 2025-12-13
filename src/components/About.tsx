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
    { value: "5+", label: "Leadership Roles", emoji: "🎯" },
    { value: "10+", label: "Projects Built", emoji: "💼" },
    { value: "6", label: "Languages Spoken", emoji: "🌍" },
  ];

  const skillKeywords = [
    { name: "Python", color: "from-yellow-400 to-blue-500", size: "text-lg" },
    { name: "AI/ML", color: "from-purple-500 to-pink-500", size: "text-xl" },
    { name: "React", color: "from-cyan-400 to-blue-500", size: "text-base" },
    { name: "TypeScript", color: "from-blue-500 to-indigo-500", size: "text-sm" },
    { name: "FinTech", color: "from-green-500 to-emerald-500", size: "text-lg" },
    { name: "Bioinformatics", color: "from-cyan-500 to-teal-500", size: "text-base" },
    { name: "Data Science", color: "from-orange-500 to-red-500", size: "text-lg" },
    { name: "Node.js", color: "from-green-400 to-green-600", size: "text-sm" },
    { name: "Deep Learning", color: "from-violet-500 to-purple-600", size: "text-base" },
    { name: "TensorFlow", color: "from-orange-400 to-yellow-500", size: "text-sm" },
    { name: "Genomics", color: "from-pink-500 to-rose-500", size: "text-base" },
    { name: "Arduino", color: "from-teal-400 to-cyan-500", size: "text-sm" },
    { name: "NLP", color: "from-indigo-400 to-purple-500", size: "text-lg" },
    { name: "Trading Bots", color: "from-emerald-400 to-green-500", size: "text-sm" },
    { name: "IoT", color: "from-blue-400 to-cyan-400", size: "text-base" },
    { name: "Gen AI", color: "from-fuchsia-500 to-pink-500", size: "text-lg" },
    { name: "PineScript", color: "from-lime-500 to-green-500", size: "text-sm" },
    { name: "Robotics", color: "from-slate-400 to-zinc-500", size: "text-base" },
    { name: "APIs", color: "from-sky-400 to-blue-500", size: "text-sm" },
    { name: "Voice AI", color: "from-rose-400 to-pink-500", size: "text-base" },
    { name: "MongoDB", color: "from-green-500 to-lime-500", size: "text-sm" },
    { name: "SQL", color: "from-blue-500 to-sky-500", size: "text-sm" },
    { name: "Git", color: "from-orange-500 to-red-600", size: "text-base" },
    { name: "Leadership", color: "from-amber-500 to-yellow-500", size: "text-lg" },
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
            {/* Skills word cloud visual */}
            <motion.div
              initial={{ opacity: 0, x: -150, rotateY: -30 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.div
                className="relative aspect-square max-w-md mx-auto"
                style={{ scale }}
              >
                {/* Decorative glow background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-animated rounded-full blur-3xl opacity-20"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Skills cloud container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Central focus text */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    >
                      <span className="text-4xl sm:text-5xl font-display font-bold holographic">
                        {"</>"}
                      </span>
                    </motion.div>

                    {/* Orbiting skills */}
                    {skillKeywords.map((skill, i) => {
                      const angle = (i / skillKeywords.length) * 2 * Math.PI;
                      const radius = 120 + (i % 3) * 30;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      
                      return (
                        <motion.div
                          key={skill.name}
                          className="absolute top-1/2 left-1/2"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { 
                            opacity: 1, 
                            scale: 1,
                            x: x,
                            y: y,
                          } : {}}
                          transition={{ 
                            delay: 0.5 + i * 0.08, 
                            type: "spring", 
                            stiffness: 150,
                            damping: 15 
                          }}
                        >
                          <motion.div
                            animate={{
                              y: [0, -8, 0],
                              x: [0, (i % 2 === 0 ? 5 : -5), 0],
                            }}
                            transition={{ 
                              duration: 3 + (i % 3), 
                              repeat: Infinity, 
                              ease: "easeInOut",
                              delay: i * 0.2
                            }}
                            whileHover={{ 
                              scale: 1.4, 
                              zIndex: 50,
                            }}
                            className={`px-3 py-1.5 rounded-lg cursor-pointer bg-gradient-to-r ${skill.color} shadow-lg`}
                          >
                            <span className={`text-white font-display font-semibold ${skill.size} whitespace-nowrap`}>
                              {skill.name}
                            </span>
                          </motion.div>
                        </motion.div>
                      );
                    })}

                    {/* Connecting lines/dots decoration */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/40 rounded-full"
                        style={{
                          x: Math.cos((i / 8) * 2 * Math.PI) * 80,
                          y: Math.sin((i / 8) * 2 * Math.PI) * 80,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.25,
                        }}
                      />
                    ))}
                  </div>
                </div>
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
              </motion.h2>

              {/* Description with word reveal */}
              <motion.div className="space-y-4 text-muted-foreground text-lg mb-10">
                {[
                  "I'm basically that guy who can't stop asking 'what if?' - whether it's about AI, finance, or why people make the decisions they do. Right now, I'm working on a FinTech app that mixes AI with psychology to help people actually stick to their money goals.",
                  "I've built everything from trading bots to voice assistants to games. Won some Olympiad medals and a robotics award along the way. But honestly? I just really enjoy figuring out how things work and turning wild ideas into something real."
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

              {/* Stats */}
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
