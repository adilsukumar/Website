import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Zap, Globe, Database, Smartphone } from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "Building responsive, performant interfaces with React, Next.js, and modern CSS.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Creating scalable APIs and services with Node.js, Python, and cloud platforms.",
      technologies: ["Node.js", "Python", "PostgreSQL", "AWS"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Crafting intuitive, beautiful interfaces that users love to interact with.",
      technologies: ["Figma", "Adobe XD", "Framer", "Prototyping"],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Building cross-platform mobile applications with React Native.",
      technologies: ["React Native", "Expo", "iOS", "Android"],
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing for speed, accessibility, and exceptional user experiences.",
      technologies: ["Lighthouse", "Web Vitals", "SEO", "A11y"],
    },
    {
      icon: Globe,
      title: "DevOps & Cloud",
      description: "Deploying and managing applications at scale with modern infrastructure.",
      technologies: ["Docker", "Kubernetes", "CI/CD", "Vercel"],
    },
  ];

  return (
    <section id="skills" className="py-32 relative noise" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient rounded-full blur-3xl opacity-5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              What I <span className="text-gradient">Do</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I specialize in building complete digital products, from concept to deployment.
            </p>
          </motion.div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group glass p-6 rounded-2xl border-gradient hover:glow transition-all duration-500"
              >
                <div className="w-12 h-12 bg-gradient rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-gradient transition-all duration-300">
                  {skill.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {skill.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-xs text-muted-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
