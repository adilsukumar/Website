import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "30+", label: "Happy Clients" },
  ];

  return (
    <section id="about" className="py-32 relative noise" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image/Visual side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient rounded-3xl blur-3xl opacity-20 animate-pulse-glow" />
                <div className="absolute inset-4 glass rounded-3xl border-gradient" />
                
                {/* Main image area */}
                <div className="absolute inset-8 bg-muted rounded-2xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl">👨‍💻</span>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 glass px-4 py-2 rounded-xl"
                >
                  <span className="text-primary font-display font-semibold">React</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-xl"
                >
                  <span className="text-secondary font-display font-semibold">TypeScript</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
                Building the <span className="text-gradient">future</span> of the web
              </h2>
              
              <div className="space-y-4 text-muted-foreground text-lg mb-10">
                <p>
                  I'm a passionate full-stack developer with a keen eye for design 
                  and a love for creating seamless user experiences. My journey in 
                  tech started over 5 years ago, and I've been hooked ever since.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open-source projects, or sharing knowledge with 
                  the developer community.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center glass p-4 rounded-xl"
                  >
                    <div className="font-display text-3xl font-bold text-gradient">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
