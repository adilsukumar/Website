import { motion, useScroll, useTransform } from "framer-motion";
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

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "30+", label: "Happy Clients" },
  ];

  return (
    <section id="about" className="py-32 relative noise" ref={containerRef}>
      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image/Visual side with parallax */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotate: -5 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
              transition={{ duration: 1, type: "spring", stiffness: 50 }}
              className="relative"
            >
              <motion.div
                className="relative aspect-square max-w-md mx-auto"
                style={{ y, rotate }}
              >
                {/* Decorative elements with animations */}
                <motion.div
                  className="absolute inset-0 bg-gradient rounded-3xl blur-3xl opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-4 glass rounded-3xl border-gradient"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                {/* Main image area */}
                <motion.div
                  className="absolute inset-8 bg-muted rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="w-full h-full flex items-center justify-center relative">
                    <motion.span
                      className="text-8xl"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      👨‍💻
                    </motion.span>
                  </div>
                </motion.div>

                {/* Floating badges with improved animations */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute -top-4 -right-4"
                >
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    whileHover={{ scale: 1.2 }}
                    className="glass px-4 py-2 rounded-xl cursor-pointer"
                  >
                    <span className="text-primary font-display font-semibold">
                      React
                    </span>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  className="absolute -bottom-4 -left-4"
                >
                  <motion.div
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    whileHover={{ scale: 1.2 }}
                    className="glass px-4 py-2 rounded-xl cursor-pointer"
                  >
                    <span className="text-secondary font-display font-semibold">
                      TypeScript
                    </span>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                  className="absolute top-1/2 -right-8"
                >
                  <motion.div
                    animate={{
                      x: [0, 10, 0],
                      rotate: [0, -10, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    whileHover={{ scale: 1.2 }}
                    className="glass px-4 py-2 rounded-xl cursor-pointer"
                  >
                    <span className="text-primary font-display font-semibold">
                      Next.js
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="font-display text-4xl sm:text-5xl font-bold mb-6"
              >
                Building the <span className="text-gradient">future</span> of the web
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 text-muted-foreground text-lg mb-10"
              >
                <p>
                  I'm a passionate full-stack developer with a keen eye for
                  design and a love for creating seamless user experiences. My
                  journey in tech started over 5 years ago, and I've been hooked
                  ever since.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  knowledge with the developer community.
                </p>
              </motion.div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-center glass p-4 rounded-xl cursor-pointer group"
                  >
                    <div className="font-display text-3xl font-bold text-gradient">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors">
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
                      {stat.label}
                    </motion.div>
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
