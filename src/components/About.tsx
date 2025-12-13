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

  const stats = [
    { value: "5+", label: "Leadership Roles", emoji: "🎯" },
    { value: "10+", label: "Projects Built", emoji: "💼" },
    { value: "6", label: "Languages Spoken", emoji: "🌍" },
  ];

  // All 90+ skills organized in rows for marquee
  const skillRows = [
    // Row 1 - Programming & Frameworks
    [
      { name: "Python", color: "from-yellow-400 to-blue-500" },
      { name: "JavaScript", color: "from-yellow-400 to-amber-500" },
      { name: "TypeScript", color: "from-blue-500 to-indigo-500" },
      { name: "React", color: "from-cyan-400 to-blue-500" },
      { name: "Node.js", color: "from-green-400 to-green-600" },
      { name: "C++", color: "from-blue-600 to-indigo-600" },
      { name: "C", color: "from-slate-500 to-blue-600" },
      { name: "Java", color: "from-red-500 to-orange-500" },
      { name: "R", color: "from-blue-400 to-sky-500" },
      { name: "SQL", color: "from-blue-500 to-sky-500" },
      { name: "PineScript", color: "from-lime-500 to-green-500" },
      { name: "HTML", color: "from-orange-500 to-red-500" },
      { name: "CSS", color: "from-blue-500 to-purple-500" },
      { name: "Bash", color: "from-green-600 to-emerald-600" },
      { name: "Express.js", color: "from-gray-500 to-slate-600" },
    ],
    // Row 2 - AI/ML & Data Science
    [
      { name: "AI/ML", color: "from-purple-500 to-pink-500" },
      { name: "Deep Learning", color: "from-violet-500 to-purple-600" },
      { name: "TensorFlow", color: "from-orange-400 to-yellow-500" },
      { name: "PyTorch", color: "from-red-500 to-orange-500" },
      { name: "Keras", color: "from-red-600 to-rose-600" },
      { name: "Scikit-learn", color: "from-orange-500 to-yellow-500" },
      { name: "NLP", color: "from-indigo-400 to-purple-500" },
      { name: "Gen AI", color: "from-fuchsia-500 to-pink-500" },
      { name: "LLMs", color: "from-violet-500 to-fuchsia-500" },
      { name: "Neural Networks", color: "from-pink-500 to-purple-500" },
      { name: "Computer Vision", color: "from-teal-500 to-cyan-500" },
      { name: "OpenCV", color: "from-green-500 to-teal-500" },
      { name: "Hugging Face", color: "from-yellow-500 to-orange-500" },
      { name: "Transformers", color: "from-purple-400 to-pink-500" },
      { name: "YOLO", color: "from-rose-500 to-red-500" },
    ],
    // Row 3 - Data & Databases
    [
      { name: "Data Science", color: "from-orange-500 to-red-500" },
      { name: "Data Analytics", color: "from-sky-500 to-blue-500" },
      { name: "Pandas", color: "from-indigo-500 to-blue-500" },
      { name: "NumPy", color: "from-blue-400 to-cyan-500" },
      { name: "Matplotlib", color: "from-blue-500 to-indigo-500" },
      { name: "Seaborn", color: "from-teal-400 to-cyan-500" },
      { name: "Plotly", color: "from-purple-500 to-blue-500" },
      { name: "Statistics", color: "from-emerald-500 to-green-500" },
      { name: "Excel", color: "from-green-600 to-emerald-600" },
      { name: "Power BI", color: "from-yellow-500 to-amber-500" },
      { name: "MongoDB", color: "from-green-500 to-lime-500" },
      { name: "PostgreSQL", color: "from-blue-500 to-indigo-500" },
      { name: "MySQL", color: "from-blue-400 to-sky-500" },
      { name: "Firebase", color: "from-yellow-500 to-orange-500" },
      { name: "Supabase", color: "from-green-500 to-emerald-500" },
    ],
    // Row 4 - Domain & Tools
    [
      { name: "FinTech", color: "from-green-500 to-emerald-500" },
      { name: "Bioinformatics", color: "from-cyan-500 to-teal-500" },
      { name: "Genomics", color: "from-pink-500 to-rose-500" },
      { name: "NGS Analysis", color: "from-violet-500 to-purple-500" },
      { name: "Molecular Modeling", color: "from-teal-500 to-green-500" },
      { name: "Trading Bots", color: "from-emerald-400 to-green-500" },
      { name: "Algo Trading", color: "from-lime-400 to-emerald-500" },
      { name: "Technical Analysis", color: "from-blue-500 to-cyan-500" },
      { name: "Risk Management", color: "from-red-500 to-rose-500" },
      { name: "Behavioral Finance", color: "from-amber-500 to-yellow-500" },
      { name: "Flask", color: "from-slate-400 to-gray-500" },
      { name: "Django", color: "from-green-600 to-emerald-700" },
      { name: "Tailwind", color: "from-teal-400 to-cyan-500" },
      { name: "Bootstrap", color: "from-purple-500 to-violet-600" },
      { name: "jQuery", color: "from-blue-400 to-sky-500" },
    ],
    // Row 5 - Hardware, IoT & DevOps
    [
      { name: "Arduino", color: "from-teal-400 to-cyan-500" },
      { name: "Raspberry Pi", color: "from-rose-500 to-red-500" },
      { name: "IoT", color: "from-blue-400 to-cyan-400" },
      { name: "Robotics", color: "from-slate-400 to-zinc-500" },
      { name: "Embedded Systems", color: "from-gray-500 to-slate-500" },
      { name: "Bluetooth", color: "from-blue-500 to-indigo-500" },
      { name: "Sensors", color: "from-orange-500 to-amber-500" },
      { name: "Git", color: "from-orange-500 to-red-600" },
      { name: "GitHub", color: "from-gray-600 to-slate-700" },
      { name: "VS Code", color: "from-blue-500 to-sky-500" },
      { name: "Docker", color: "from-blue-400 to-cyan-500" },
      { name: "Linux", color: "from-yellow-500 to-amber-600" },
      { name: "APIs", color: "from-sky-400 to-blue-500" },
      { name: "REST", color: "from-green-500 to-emerald-500" },
      { name: "Postman", color: "from-orange-500 to-red-500" },
    ],
    // Row 6 - Automation & Soft Skills
    [
      { name: "Voice AI", color: "from-rose-400 to-pink-500" },
      { name: "Automation", color: "from-violet-400 to-indigo-500" },
      { name: "Web Scraping", color: "from-green-500 to-teal-500" },
      { name: "Selenium", color: "from-green-600 to-emerald-600" },
      { name: "Chatbots", color: "from-purple-500 to-pink-500" },
      { name: "Leadership", color: "from-amber-500 to-yellow-500" },
      { name: "Public Speaking", color: "from-rose-500 to-red-500" },
      { name: "Strategy", color: "from-indigo-500 to-violet-500" },
      { name: "Team Building", color: "from-cyan-500 to-blue-500" },
      { name: "Event Management", color: "from-pink-500 to-rose-500" },
      { name: "Problem Solving", color: "from-emerald-500 to-green-500" },
      { name: "Critical Thinking", color: "from-blue-500 to-indigo-500" },
      { name: "Communication", color: "from-teal-500 to-cyan-500" },
      { name: "Creativity", color: "from-fuchsia-500 to-purple-500" },
      { name: "Adaptability", color: "from-orange-400 to-amber-500" },
    ],
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

      <motion.div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
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
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-12 items-start mb-16">
            {/* About Text - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <motion.div className="space-y-4 text-muted-foreground text-lg mb-10">
                {[
                  "I'm basically that guy who can't stop asking 'what if?' - whether it's about AI, finance, or why people make the decisions they do. Right now, I'm working on a FinTech app that mixes AI with psychology to help people actually stick to their money goals.",
                  "I've built everything from trading bots to voice assistants to games. Won some Olympiad medals and a robotics award along the way. But honestly? I just really enjoy figuring out how things work and turning wild ideas into something real."
                ].map((paragraph, pIndex) => (
                  <motion.p 
                    key={pIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + pIndex * 0.2 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{
                      delay: 0.8 + index * 0.15,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -10,
                    }}
                    className="glass-strong p-6 rounded-2xl text-center cursor-pointer group border-gradient-animated"
                  >
                    <motion.span 
                      className="text-3xl block mb-2"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.3 
                      }}
                    >
                      {stat.emoji}
                    </motion.span>
                    <motion.div
                      className="font-display text-3xl font-bold text-gradient mb-1"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 1 + index * 0.1, type: "spring" }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills Counter Card - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="glass-strong rounded-3xl p-8 border-gradient-animated relative overflow-hidden">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="relative z-10 text-center">
                  <motion.div
                    className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient mb-6"
                    animate={{
                      boxShadow: [
                        "0 0 40px 10px hsl(var(--primary) / 0.3)",
                        "0 0 60px 20px hsl(var(--primary) / 0.5)",
                        "0 0 40px 10px hsl(var(--primary) / 0.3)",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.span
                      className="font-display text-5xl font-bold text-primary-foreground"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    >
                      90+
                    </motion.span>
                  </motion.div>
                  
                  <h3 className="font-display text-2xl font-bold mb-2">Skills Mastered</h3>
                  <p className="text-muted-foreground text-sm">
                    From AI/ML to IoT, Finance to Leadership
                  </p>
                  
                  {/* Mini skill categories */}
                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {["AI/ML", "FinTech", "IoT", "Data", "Leadership"].map((cat, i) => (
                      <motion.span
                        key={cat}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 1 + i * 0.1, type: "spring" }}
                        className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full"
                      >
                        {cat}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skills Marquee Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div className="text-center mb-8">
              <span className="text-sm text-muted-foreground font-display">All Skills</span>
            </div>

            {/* Marquee container with gradient masks */}
            <div className="relative overflow-hidden">
              {/* Left gradient mask */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              {/* Right gradient mask */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <div className="space-y-3">
                {skillRows.map((row, rowIndex) => (
                  <motion.div
                    key={rowIndex}
                    className="flex gap-3"
                    initial={{ x: rowIndex % 2 === 0 ? "0%" : "-50%" }}
                    animate={{ 
                      x: rowIndex % 2 === 0 ? "-50%" : "0%"
                    }}
                    transition={{
                      duration: 30 + rowIndex * 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ width: "200%" }}
                  >
                    {/* Double the skills for seamless loop */}
                    {[...row, ...row].map((skill, skillIndex) => (
                      <motion.div
                        key={`${skill.name}-${skillIndex}`}
                        whileHover={{ 
                          scale: 1.15, 
                          y: -5,
                          zIndex: 20,
                        }}
                        className={`px-4 py-2 rounded-full bg-gradient-to-r ${skill.color} cursor-pointer flex-shrink-0 shadow-lg`}
                      >
                        <span className="text-white font-display font-medium text-sm whitespace-nowrap">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;