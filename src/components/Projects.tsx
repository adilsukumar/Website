import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const projects = [
    {
      title: "Nova Dashboard",
      description:
        "A comprehensive analytics dashboard with real-time data visualization, built for enterprise clients.",
      image: "🚀",
      tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      gradient: "from-cyan-500 via-blue-500 to-purple-500",
    },
    {
      title: "Velocity",
      description:
        "High-performance e-commerce platform with AI-powered recommendations and seamless checkout.",
      image: "⚡",
      tags: ["Next.js", "Stripe", "Prisma", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      gradient: "from-orange-500 via-pink-500 to-purple-500",
    },
    {
      title: "Mindful",
      description:
        "Mental wellness app with guided meditations, mood tracking, and personalized insights.",
      image: "🧘",
      tags: ["React Native", "Firebase", "TensorFlow"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      gradient: "from-green-500 to-teal-500",
    },
    {
      title: "CodeCollab",
      description:
        "Real-time collaborative code editor with video chat and integrated AI assistant.",
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
      className="py-32 relative noise overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: backgroundX }}
      >
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {"Featured ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, rotate: -10 }}
                  animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                  transition={{ delay: i * 0.05, duration: 0.4, type: "spring" }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <span className="text-gradient">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              A selection of projects I've worked on, from concept to completion.
            </motion.p>
          </motion.div>

          {/* Featured projects */}
          <div className="space-y-12 mb-16">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 100, rotateX: -10 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.2,
                    type: "spring",
                    stiffness: 50,
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="group relative glass rounded-3xl overflow-hidden border-gradient"
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
                    animate={
                      hoveredIndex === index
                        ? {
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }
                        : {}
                    }
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                  />

                  <div className="grid md:grid-cols-2 gap-8 p-8 relative z-10">
                    {/* Project visual */}
                    <motion.div
                      className={`relative aspect-video bg-muted rounded-2xl flex items-center justify-center overflow-hidden ${
                        index % 2 === 1 ? "md:order-2" : ""
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-30`}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <motion.span
                        className="text-7xl relative z-10"
                        animate={{
                          rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                          scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {project.image}
                      </motion.span>

                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={
                            hoveredIndex === index
                              ? { y: 0, opacity: 1 }
                              : { y: 20, opacity: 0 }
                          }
                          className="flex gap-4"
                        >
                          <a
                            href={project.liveUrl}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                          <a
                            href={project.githubUrl}
                            className="px-4 py-2 bg-muted text-foreground rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform"
                          >
                            <Github className="w-4 h-4" />
                            Source
                          </a>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Project info */}
                    <div className="flex flex-col justify-center">
                      <motion.h3
                        className="font-display text-2xl sm:text-3xl font-bold mb-4 group-hover:text-gradient transition-all duration-300"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + index * 0.2 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p
                        className="text-muted-foreground mb-6"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.2 }}
                      >
                        {project.description}
                      </motion.p>

                      {/* Tags with stagger */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                              delay: 0.6 + index * 0.2 + tagIndex * 0.05,
                              type: "spring",
                            }}
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "hsl(var(--primary))",
                              color: "hsl(var(--primary-foreground))",
                            }}
                            className="px-3 py-1 bg-muted text-sm text-muted-foreground rounded-full cursor-pointer transition-colors"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* Links */}
                      <motion.div
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7 + index * 0.2 }}
                      >
                        <motion.a
                          href={project.liveUrl}
                          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group/link"
                          whileHover={{ x: 5 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="font-display font-medium">Live Demo</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
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
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 1 + index * 0.15,
                    type: "spring",
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="group glass p-6 rounded-2xl border-gradient hover:glow transition-all duration-500 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 bg-gradient-to-br ${project.gradient}`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.image}
                    </motion.div>
                    <div>
                      <h3 className="font-display text-xl font-semibold group-hover:text-gradient transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.2 + index * 0.1 + tagIndex * 0.05 }}
                        className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.a
                      href={project.liveUrl}
                      className="text-primary hover:text-primary/80 transition-colors"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.2, rotate: -15 }}
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
