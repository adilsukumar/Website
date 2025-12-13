import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smoother spring-based transforms
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothProgress, [0, 1], [0, 300]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.8]);

  const name = "Alex Chen";

  // Smooth spring config for animations
  const springConfig = { stiffness: 100, damping: 15, mass: 1 };
  const gentleSpring = { type: "spring", stiffness: 50, damping: 20 };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise spotlight"
    >
      {/* Animated morphing blobs with parallax */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-[120%] h-[120%] bg-gradient-animated blob opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: [0.65, 0, 0.35, 1],
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-[120%] h-[120%] bg-gradient-animated blob opacity-20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: [0.65, 0, 0.35, 1],
          }}
        />
        {/* Floating orbs with smooth animations */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.65, 0, 0.35, 1],
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-secondary/30 rounded-full blur-3xl blob"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.15, 0.3],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: [0.65, 0, 0.35, 1],
          }}
        />
      </motion.div>

      {/* Animated grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-primary/40' : i % 3 === 1 ? 'bg-secondary/40' : 'bg-foreground/20'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
            animate={{
              y: [-20, -150, -20],
              x: [0, (Math.random() - 0.5) * 100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-6"
        style={{ opacity, scale }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Status badge with smooth bounce */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 50, damping: 20 }}
            className="flex items-center gap-2 mb-8"
          >
            <motion.span
              className="relative flex h-3 w-3"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary glow-intense"></span>
            </motion.span>
            <motion.span
              className="text-muted-foreground text-sm tracking-wider uppercase flex items-center gap-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            >
              <Sparkles className="w-3 h-3" />
              Available for projects
            </motion.span>
          </motion.div>

          {/* Main heading with smooth letter animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-tight"
            >
              Hi, I'm
            </motion.span>
            <div className="overflow-hidden">
              <motion.div className="holographic block font-display text-5xl sm:text-7xl lg:text-8xl font-bold">
                {name.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 80, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.3 + i * 0.06,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      color: "hsl(var(--primary))",
                      transition: { duration: 0.2 }
                    }}
                    className="inline-block cursor-default"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Subtitle with smooth word reveal */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mb-12"
          >
            {"Creative developer crafting exceptional digital experiences. I turn complex ideas into elegant, performant solutions."
              .split(" ")
              .map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.9 + i * 0.04,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
          </motion.p>

          {/* CTA buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-animated text-primary-foreground font-display font-semibold rounded-xl overflow-hidden glow-intense border-gradient-animated"
              whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%", skewX: -20 }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <span className="relative z-10">View My Work</span>
            </motion.a>
            <motion.a
              href="#contact"
              className="group px-8 py-4 glass font-display font-semibold rounded-xl relative overflow-hidden border-gradient-animated"
              whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-20"
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10">Get In Touch</span>
            </motion.a>
          </motion.div>

          {/* Social links with smooth stagger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex items-center gap-6"
          >
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 1.7 + i * 0.12,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.2,
                  y: -5,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass rounded-xl text-muted-foreground hover:text-primary hover:glow-intense transition-smooth"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator with smooth pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <motion.span
            className="text-xs tracking-widest uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          >
            Scroll
          </motion.span>
          <motion.div
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center relative overflow-hidden"
          >
            <motion.div
              className="w-1.5 h-3 bg-gradient rounded-full mt-2"
              animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
