import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowRight, Sparkles } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);



  const projects = [
    {
      title: "Spendture",
      description: "A FinTech app that uses AI and psychology to help people build better money habits. Smart reminders, journaling, the works. Still building it out.",
      image: "💰",
      tags: ["Python", "AI/ML", "FinTech", "Product Development"],
      sourceUrl: "https://www.linkedin.com/company/spendture",
      featured: true,
      gradient: "from-green-500 via-emerald-500 to-teal-500",
    },
    {
      title: "CyberSHE",
      description: "Built this at WiCyS Hackathon. It's a safety platform for women - AI harassment detection, privacy tools, encrypted messaging. We won 1st place!",
      image: "🛡️",
      tags: ["React", "TypeScript", "Node.js", "AI", "Cybersecurity"],
      sourceUrl: "https://github.com/adilsukumar/CyberSHE_WiCyS_Hackathon_.Saras-Hack-Squad",
      featured: true,
      gradient: "from-purple-500 via-pink-500 to-rose-500",
    },
    {
      title: "Student Grade Tracker",
      description: "Made this to track my own grades and study sessions. Ended up with colorful charts and analytics. Python does the heavy lifting.",
      image: "📚",
      tags: ["Python", "Data Visualization", "Education"],
      sourceUrl: null,
      featured: false,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Voice-Activated AI Assistant",
      description: "Like my own Jarvis. It handles emails, sets reminders, automates stuff on my desktop. When it doesn't know something, GPT takes over.",
      image: "🎤",
      tags: ["Python", "NLP", "Voice AI", "Automation"],
      sourceUrl: null,
      featured: false,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Smart Home Automation",
      description: "Arduino + Bluetooth + relays = controlling lights and fans from my phone. Got 3rd place in a robotics competition with this one.",
      image: "🏠",
      tags: ["Arduino", "IoT", "Bluetooth", "Robotics"],
      sourceUrl: null,
      featured: false,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "A Map of Memories",
      description: "An interactive global memory map where people pin personal stories and feelings to real places. Like a collective diary that lets you explore meaningful moments left by others around the world.",
      image: "🗺️",
      tags: ["React", "Maps API", "Node.js", "MongoDB"],
      sourceUrl: null,
      featured: false,
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section
      id="projects"
      className="py-32 relative noise spotlight"
      ref={containerRef}
      style={{ position: "relative" }}
    >
      {/* Simplified background for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="container mx-auto px-6" 
        ref={ref}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 border-gradient-animated"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm text-muted-foreground">My Work</span>
            </motion.div>

            <motion.h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 overflow-hidden">
              {"Featured ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 100, rotateY: -90 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                  transition={{ 
                    delay: 0.3 + i * 0.04, 
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
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
                Projects
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Some things I've built that I'm pretty proud of.
            </motion.p>
          </motion.div>

          {/* Featured projects */}
          <div className="space-y-16 mb-20">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 150, rotateX: -15, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
                  transition={{
                    duration: 1,
                    delay: 1 + index * 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 200, damping: 20 }
                  }}
                  className="group relative glass-strong rounded-3xl overflow-hidden border-gradient-animated perspective-1000"
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0`}
                    animate={{ opacity: hoveredIndex === index ? 0.15 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                    animate={hoveredIndex === index ? { x: ["100%", "200%"] } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <div className="grid md:grid-cols-2 gap-8 p-8 relative z-10">
                    {/* Project visual */}
                    <motion.div
                      className={`relative aspect-video bg-muted rounded-2xl flex items-center justify-center overflow-hidden ${
                        index % 2 === 1 ? "md:order-2" : ""
                      }`}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      {/* Animated background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, 0],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
                      />
                      
                      {/* Emoji */}
                      <motion.span
                        className="text-8xl relative z-10"
                        animate={{
                          rotate: hoveredIndex === index ? [0, -15, 15, -10, 10, 0] : 0,
                          scale: hoveredIndex === index ? [1, 1.3, 1.2, 1.25, 1] : 1,
                          y: hoveredIndex === index ? [0, -20, -10, -15, 0] : 0,
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {project.image}
                      </motion.span>

                      {/* Hover buttons */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end justify-center pb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          initial={{ y: 30, opacity: 0 }}
                          animate={hoveredIndex === index ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="flex gap-4"
                        >
                          {project.sourceUrl && (
                            <motion.a
                              href={project.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-5 py-2.5 bg-gradient text-primary-foreground rounded-xl font-medium flex items-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Source
                            </motion.a>
                          )}
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Project info */}
                    <div className="flex flex-col justify-center">
                      <motion.h3
                        className="font-display text-2xl sm:text-3xl font-bold mb-4 group-hover:holographic transition-smooth"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 80 : -80 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.2 + index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {project.title}
                      </motion.h3>
                      
                      <motion.p
                        className="text-muted-foreground mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1.3 + index * 0.2 }}
                      >
                        {project.description}
                      </motion.p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0, rotate: -20 }}
                            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                            transition={{
                              delay: 1.4 + index * 0.2 + tagIndex * 0.08,
                              type: "spring",
                              stiffness: 300,
                            }}
                            whileHover={{
                              scale: 1.15,
                              y: -5,
                              backgroundColor: "hsl(var(--primary))",
                              color: "hsl(var(--primary-foreground))",
                            }}
                            className="px-4 py-1.5 bg-muted text-sm text-muted-foreground rounded-full cursor-pointer transition-smooth"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* Links */}
                      <motion.div
                        className="flex gap-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1.6 + index * 0.2 }}
                      >
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <ExternalLink className="w-4 h-4" />
                          <span className="font-display font-medium">View Project</span>
                        </span>
                        {project.sourceUrl && (
                          <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span className="font-display font-medium">Source</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Other projects grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.8 }}
          >
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 80, scale: 0.85, rotateY: -10 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 2 + index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="group glass-strong p-6 rounded-2xl border-gradient-animated hover:glow-intense transition-smooth cursor-pointer perspective-1000 relative overflow-hidden"
                >
                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Emoji header */}
                    <motion.div
                      className="text-5xl mb-4"
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 0.5,
                        type: "spring",
                        stiffness: 300,
                        damping: 10
                      }}
                    >
                      {project.image}
                    </motion.div>

                    <h3 className="font-display text-xl font-bold mb-2 group-hover:text-gradient transition-smooth">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-muted text-xs text-muted-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;