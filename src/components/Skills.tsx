import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      description:
        "Building responsive, performant interfaces with React, Next.js, and modern CSS.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Database,
      title: "Backend Development",
      description:
        "Creating scalable APIs and services with Node.js, Python, and cloud platforms.",
      technologies: ["Node.js", "Python", "PostgreSQL", "AWS"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Crafting intuitive, beautiful interfaces that users love to interact with.",
      technologies: ["Figma", "Adobe XD", "Framer", "Prototyping"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Building cross-platform mobile applications with React Native.",
      technologies: ["React Native", "Expo", "iOS", "Android"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "Optimizing for speed, accessibility, and exceptional user experiences.",
      technologies: ["Lighthouse", "Web Vitals", "SEO", "A11y"],
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "DevOps & Cloud",
      description:
        "Deploying and managing applications at scale with modern infrastructure.",
      technologies: ["Docker", "Kubernetes", "CI/CD", "Vercel"],
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section
      id="skills"
      className="py-32 relative noise overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background decoration */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient rounded-full blur-3xl opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section header with text animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="font-display text-4xl sm:text-5xl font-bold mb-4 overflow-hidden"
            >
              {"What I ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <span className="text-gradient">Do</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              I specialize in building complete digital products, from concept
              to deployment.
            </motion.p>
          </motion.div>

          {/* Skills grid with stagger */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group glass p-6 rounded-2xl border-gradient hover:glow transition-all duration-500 cursor-pointer perspective-1000"
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r ${skill.color}`}
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.5 },
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                >
                  <skill.icon className="w-6 h-6 text-white" />
                </motion.div>

                <motion.h3
                  className="font-display text-xl font-semibold mb-2 group-hover:text-gradient transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {skill.title}
                </motion.h3>

                <motion.p
                  className="text-muted-foreground text-sm mb-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {skill.description}
                </motion.p>

                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: 0.6 + index * 0.1 + techIndex * 0.05,
                        type: "spring",
                      }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                      }}
                      className="px-3 py-1 bg-muted text-xs text-muted-foreground rounded-full cursor-pointer transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Animated border on hover */}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
