import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowRight, Sparkles } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const backgroundX = useTransform(smoothProgress, [0, 1], [-200, 200]);
  const backgroundY = useTransform(smoothProgress, [0, 1], [100, -100]);
  const sectionScale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
  const sectionOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const projects = [
    {
      title: "Nova Dashboard",
      description: "A comprehensive analytics dashboard with real-time data visualization, built for enterprise clients.",
      image: "🚀",
      tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      gradient: "from-cyan-500 via-blue-500 to-purple-500",
    },
    {
      title: "Velocity",
      description: "High-performance e-commerce platform with AI-powered recommendations and seamless checkout.",
      image: "⚡",
      tags: ["Next.js", "Stripe", "Prisma", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      gradient: "from-orange-500 via-pink-500 to-purple-500",
    },
    {
      title: "Mindful",
      description: "Mental wellness app with guided meditations, mood tracking, and personalized insights.",
      image: "🧘",
      tags: ["React Native", "Firebase", "TensorFlow"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      gradient: "from-green-500 to-teal-500",
    },
    {
      title: "CodeCollab",
      description: "Real-time collaborative code editor with video chat and integrated AI assistant.",
      image: "👥",
      tags: ["WebRTC", "Socket.io", "Monaco Editor"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      gradient: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <section
      id="projects"
      className="py-32 relative noise spotlight overflow-hidden"
      ref={containerRef}
    >
      {/* Intense animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl blob"
          style={{ x: backgroundX, y: backgroundY }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl blob"
          style={{ x: useTransform(smoothProgress, [0, 1], [100, -100]) }}
        />
        {/* Animated lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{
              width: `${60 + i * 10}%`,
              top: `${15 + i * 18}%`,
              left: `${5 + i * 5}%`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scaleX: [0.5, 1, 0.5],
              x: [-100, 100, -100],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-primary/40' : 'bg-secondary/40'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-6" 
        ref={ref}
        style={{ scale: sectionScale, opacity: sectionOpacity }}
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
              A selection of projects I've worked on, from concept to completion.
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
                      
                      {/* Emoji with intense animation */}
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
                          <motion.a
                            href={project.liveUrl}
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2.5 bg-gradient text-primary-foreground rounded-xl font-medium flex items-center gap-2 glow"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </motion.a>
                          <motion.a
                            href={project.githubUrl}
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2.5 glass text-foreground rounded-xl font-medium flex items-center gap-2"
                          >
                            <Github className="w-4 h-4" />
                            Source
                          </motion.a>
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

                      {/* Tags with stagger */}
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
                        <motion.a
                          href={project.liveUrl}
                          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth group/link"
                          whileHover={{ x: 5 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="font-display font-medium">Live Demo</span>
                          <motion.div
                            initial={{ x: -5, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
                          whileHover={{ x: 5 }}
                        >
                          <Github className="w-4 h-4" />
                          <span className="font-display font-medium">Source</span>
                        </motion.a>
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

                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    <motion.div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center text-4xl flex-shrink-0 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative z-10">{project.image}</span>
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="font-display text-xl font-semibold group-hover:holographic transition-smooth"
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 2.3 + index * 0.1 + tagIndex * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1 bg-muted text-xs text-muted-foreground rounded-full transition-smooth"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-4 relative z-10">
                    <motion.a
                      href={project.liveUrl}
                      className="text-primary hover:text-primary/80 transition-smooth"
                      whileHover={{ scale: 1.3, rotate: 15, y: -3 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      className="text-muted-foreground hover:text-foreground transition-smooth"
                      whileHover={{ scale: 1.3, rotate: -15, y: -3 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
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
