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
    // Programming Languages
    { name: "Python", color: "from-yellow-400 to-blue-500", tier: 1 },
    { name: "JavaScript", color: "from-yellow-400 to-amber-500", tier: 1 },
    { name: "TypeScript", color: "from-blue-500 to-indigo-500", tier: 2 },
    { name: "C++", color: "from-blue-600 to-indigo-600", tier: 2 },
    { name: "C", color: "from-slate-500 to-blue-600", tier: 3 },
    { name: "Java", color: "from-red-500 to-orange-500", tier: 3 },
    { name: "R", color: "from-blue-400 to-sky-500", tier: 3 },
    { name: "SQL", color: "from-blue-500 to-sky-500", tier: 2 },
    { name: "PineScript", color: "from-lime-500 to-green-500", tier: 2 },
    { name: "HTML", color: "from-orange-500 to-red-500", tier: 2 },
    { name: "CSS", color: "from-blue-500 to-purple-500", tier: 2 },
    { name: "Bash", color: "from-green-600 to-emerald-600", tier: 3 },
    // Frameworks & Libraries
    { name: "React", color: "from-cyan-400 to-blue-500", tier: 1 },
    { name: "Node.js", color: "from-green-400 to-green-600", tier: 1 },
    { name: "Express.js", color: "from-gray-500 to-slate-600", tier: 2 },
    { name: "Flask", color: "from-slate-400 to-gray-500", tier: 3 },
    { name: "Django", color: "from-green-600 to-emerald-700", tier: 3 },
    { name: "Tailwind", color: "from-teal-400 to-cyan-500", tier: 2 },
    { name: "Bootstrap", color: "from-purple-500 to-violet-600", tier: 3 },
    { name: "jQuery", color: "from-blue-400 to-sky-500", tier: 3 },
    // AI/ML
    { name: "AI/ML", color: "from-purple-500 to-pink-500", tier: 1 },
    { name: "Deep Learning", color: "from-violet-500 to-purple-600", tier: 1 },
    { name: "TensorFlow", color: "from-orange-400 to-yellow-500", tier: 2 },
    { name: "PyTorch", color: "from-red-500 to-orange-500", tier: 2 },
    { name: "Keras", color: "from-red-600 to-rose-600", tier: 3 },
    { name: "Scikit-learn", color: "from-orange-500 to-yellow-500", tier: 2 },
    { name: "NLP", color: "from-indigo-400 to-purple-500", tier: 1 },
    { name: "Gen AI", color: "from-fuchsia-500 to-pink-500", tier: 1 },
    { name: "LLMs", color: "from-violet-500 to-fuchsia-500", tier: 2 },
    { name: "Neural Networks", color: "from-pink-500 to-purple-500", tier: 2 },
    { name: "Computer Vision", color: "from-teal-500 to-cyan-500", tier: 2 },
    { name: "OpenCV", color: "from-green-500 to-teal-500", tier: 3 },
    { name: "Hugging Face", color: "from-yellow-500 to-orange-500", tier: 3 },
    { name: "Transformers", color: "from-purple-400 to-pink-500", tier: 2 },
    { name: "YOLO", color: "from-rose-500 to-red-500", tier: 3 },
    // Data Science
    { name: "Data Science", color: "from-orange-500 to-red-500", tier: 1 },
    { name: "Data Analytics", color: "from-sky-500 to-blue-500", tier: 2 },
    { name: "Pandas", color: "from-indigo-500 to-blue-500", tier: 2 },
    { name: "NumPy", color: "from-blue-400 to-cyan-500", tier: 2 },
    { name: "Matplotlib", color: "from-blue-500 to-indigo-500", tier: 3 },
    { name: "Seaborn", color: "from-teal-400 to-cyan-500", tier: 3 },
    { name: "Plotly", color: "from-purple-500 to-blue-500", tier: 3 },
    { name: "Statistics", color: "from-emerald-500 to-green-500", tier: 2 },
    { name: "Excel", color: "from-green-600 to-emerald-600", tier: 3 },
    { name: "Power BI", color: "from-yellow-500 to-amber-500", tier: 3 },
    // Databases
    { name: "MongoDB", color: "from-green-500 to-lime-500", tier: 2 },
    { name: "PostgreSQL", color: "from-blue-500 to-indigo-500", tier: 3 },
    { name: "MySQL", color: "from-blue-400 to-sky-500", tier: 3 },
    { name: "Firebase", color: "from-yellow-500 to-orange-500", tier: 2 },
    { name: "Supabase", color: "from-green-500 to-emerald-500", tier: 3 },
    // Domain Expertise
    { name: "FinTech", color: "from-green-500 to-emerald-500", tier: 1 },
    { name: "Bioinformatics", color: "from-cyan-500 to-teal-500", tier: 1 },
    { name: "Genomics", color: "from-pink-500 to-rose-500", tier: 2 },
    { name: "NGS Analysis", color: "from-violet-500 to-purple-500", tier: 3 },
    { name: "Molecular Modeling", color: "from-teal-500 to-green-500", tier: 3 },
    { name: "Trading Bots", color: "from-emerald-400 to-green-500", tier: 2 },
    { name: "Algo Trading", color: "from-lime-400 to-emerald-500", tier: 2 },
    { name: "Technical Analysis", color: "from-blue-500 to-cyan-500", tier: 2 },
    { name: "Risk Management", color: "from-red-500 to-rose-500", tier: 3 },
    { name: "Behavioral Finance", color: "from-amber-500 to-yellow-500", tier: 3 },
    // Hardware/IoT
    { name: "Arduino", color: "from-teal-400 to-cyan-500", tier: 2 },
    { name: "Raspberry Pi", color: "from-rose-500 to-red-500", tier: 3 },
    { name: "IoT", color: "from-blue-400 to-cyan-400", tier: 2 },
    { name: "Robotics", color: "from-slate-400 to-zinc-500", tier: 2 },
    { name: "Embedded Systems", color: "from-gray-500 to-slate-500", tier: 3 },
    { name: "Bluetooth", color: "from-blue-500 to-indigo-500", tier: 3 },
    { name: "Sensors", color: "from-orange-500 to-amber-500", tier: 3 },
    // Tools & DevOps
    { name: "Git", color: "from-orange-500 to-red-600", tier: 2 },
    { name: "GitHub", color: "from-gray-600 to-slate-700", tier: 2 },
    { name: "VS Code", color: "from-blue-500 to-sky-500", tier: 3 },
    { name: "Docker", color: "from-blue-400 to-cyan-500", tier: 3 },
    { name: "Linux", color: "from-yellow-500 to-amber-600", tier: 3 },
    { name: "APIs", color: "from-sky-400 to-blue-500", tier: 2 },
    { name: "REST", color: "from-green-500 to-emerald-500", tier: 3 },
    { name: "Postman", color: "from-orange-500 to-red-500", tier: 3 },
    // Automation & AI
    { name: "Voice AI", color: "from-rose-400 to-pink-500", tier: 2 },
    { name: "Automation", color: "from-violet-400 to-indigo-500", tier: 2 },
    { name: "Web Scraping", color: "from-green-500 to-teal-500", tier: 3 },
    { name: "Selenium", color: "from-green-600 to-emerald-600", tier: 3 },
    { name: "Chatbots", color: "from-purple-500 to-pink-500", tier: 3 },
    // Soft Skills
    { name: "Leadership", color: "from-amber-500 to-yellow-500", tier: 1 },
    { name: "Public Speaking", color: "from-rose-500 to-red-500", tier: 2 },
    { name: "Strategy", color: "from-indigo-500 to-violet-500", tier: 2 },
    { name: "Team Building", color: "from-cyan-500 to-blue-500", tier: 2 },
    { name: "Event Management", color: "from-pink-500 to-rose-500", tier: 3 },
    { name: "Problem Solving", color: "from-emerald-500 to-green-500", tier: 2 },
    { name: "Critical Thinking", color: "from-blue-500 to-indigo-500", tier: 3 },
    { name: "Communication", color: "from-teal-500 to-cyan-500", tier: 2 },
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
      </div>

      <motion.div 
        className="container mx-auto px-6" 
        ref={ref}
        style={{ opacity }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Skills Universe - 3D Sphere Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Outer glow rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle at center, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Skills sphere container */}
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Center core */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 z-20"
                  animate={{ 
                    boxShadow: [
                      "0 0 60px 20px hsl(var(--primary) / 0.4)",
                      "0 0 80px 30px hsl(var(--primary) / 0.6)",
                      "0 0 60px 20px hsl(var(--primary) / 0.4)",
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl font-display font-bold text-white">80+</span>
                  </div>
                </motion.div>

                {/* Rotating ring 1 */}
                <motion.div
                  className="absolute inset-8 rounded-full border border-primary/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Rotating ring 2 */}
                <motion.div
                  className="absolute inset-16 rounded-full border border-secondary/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                {/* Rotating ring 3 */}
                <motion.div
                  className="absolute inset-4 rounded-full border border-primary/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />

                {/* Skills orbiting in 3D space */}
                {skillKeywords.map((skill, i) => {
                  const totalSkills = skillKeywords.length;
                  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
                  const theta = goldenAngle * i;
                  const phi = Math.acos(1 - (2 * (i + 0.5)) / totalSkills);
                  
                  const baseRadius = skill.tier === 1 ? 180 : skill.tier === 2 ? 150 : 120;
                  const x = Math.sin(phi) * Math.cos(theta) * baseRadius;
                  const y = Math.sin(phi) * Math.sin(theta) * baseRadius;
                  const z = Math.cos(phi) * baseRadius;
                  
                  const scale = (z + baseRadius) / (2 * baseRadius) * 0.5 + 0.5;
                  const opacity = scale * 0.6 + 0.4;

                  return (
                    <motion.div
                      key={skill.name}
                      className="absolute top-1/2 left-1/2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { 
                        opacity: opacity, 
                        scale: scale,
                        x: x,
                        y: y,
                      } : {}}
                      transition={{ 
                        delay: 0.2 + i * 0.02, 
                        type: "spring", 
                        stiffness: 100,
                        damping: 15 
                      }}
                      style={{ zIndex: Math.round(z + baseRadius) }}
                    >
                      <motion.div
                        animate={{
                          x: [0, Math.sin(i) * 3, 0],
                          y: [0, Math.cos(i) * 3, 0],
                        }}
                        transition={{ 
                          duration: 4 + (i % 3), 
                          repeat: Infinity, 
                          ease: "easeInOut",
                        }}
                        whileHover={{ 
                          scale: 1.5, 
                          zIndex: 100,
                          opacity: 1,
                        }}
                        className={`px-2 py-1 rounded-full cursor-pointer bg-gradient-to-r ${skill.color} shadow-lg backdrop-blur-sm border border-white/10`}
                        style={{
                          fontSize: skill.tier === 1 ? "0.75rem" : skill.tier === 2 ? "0.65rem" : "0.6rem",
                        }}
                      >
                        <span className="text-white font-display font-semibold whitespace-nowrap">
                          {skill.name}
                        </span>
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Particle effects */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/60 rounded-full"
                    animate={{
                      x: [0, Math.cos(i * 0.5) * 200, 0],
                      y: [0, Math.sin(i * 0.5) * 200, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 4 + i * 0.2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.5 }}
                className="text-center mt-4"
              >
                <span className="text-sm text-muted-foreground font-display">Skills Universe</span>
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
