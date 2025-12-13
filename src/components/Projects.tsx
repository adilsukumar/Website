import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Nova Dashboard",
      description: "A comprehensive analytics dashboard with real-time data visualization, built for enterprise clients.",
      image: "🚀",
      tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Velocity",
      description: "High-performance e-commerce platform with AI-powered recommendations and seamless checkout.",
      image: "⚡",
      tags: ["Next.js", "Stripe", "Prisma", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Mindful",
      description: "Mental wellness app with guided meditations, mood tracking, and personalized insights.",
      image: "🧘",
      tags: ["React Native", "Firebase", "TensorFlow"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "CodeCollab",
      description: "Real-time collaborative code editor with video chat and integrated AI assistant.",
      image: "👥",
      tags: ["WebRTC", "Socket.io", "Monaco Editor"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-32 relative noise" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A selection of projects I've worked on, from concept to completion.
            </p>
          </motion.div>

          {/* Featured projects */}
          <div className="space-y-8 mb-12">
            {projects.filter(p => p.featured).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className="group relative glass rounded-3xl overflow-hidden border-gradient"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Project visual */}
                  <div className={`relative aspect-video bg-muted rounded-2xl flex items-center justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="absolute inset-0 bg-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-500">{project.image}</span>
                  </div>

                  {/* Project info */}
                  <div className="flex flex-col justify-center">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4 group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-muted text-sm text-muted-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      <a
                        href={project.liveUrl}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-display font-medium">Live Demo</span>
                      </a>
                      <a
                        href={project.githubUrl}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span className="font-display font-medium">Source</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other projects grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
                className="group glass p-6 rounded-2xl border-gradient hover:glow transition-all duration-500"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {project.image}
                  </div>
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
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href={project.liveUrl} className="text-primary hover:text-primary/80 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a href={project.githubUrl} className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
