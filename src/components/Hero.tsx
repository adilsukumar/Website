import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Download } from "lucide-react";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothProgress, [0, 1], [0, 300]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.8]);

  const name = "Adil Sukumar";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      <motion.div
        className="relative z-10 container mx-auto px-6"
        style={{ opacity, scale }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Status badge */}
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
              Open to Opportunities
            </motion.span>
          </motion.div>

          {/* Main heading */}
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mb-12"
          >
            {"Founder & CEO @Spendture | AI & Bioinformatics student at VIT | I love building stuff that sits right at the edge of science, tech, and how people think."
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

          {/* CTA buttons */}
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
            <motion.a
              href="/Adil_Sukumar_Resume.pdf"
              download
              className="group px-8 py-4 glass font-display font-semibold rounded-xl relative overflow-hidden border-gradient-animated flex items-center gap-2"
              whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              <span className="relative z-10">Download Resume</span>
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex items-center gap-6"
          >
            {[
              { icon: Github, href: "https://github.com/adilsukumar", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/adilsukumar", label: "LinkedIn" },
              { icon: Mail, href: "mailto:adilsukumar24@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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

      {/* Scroll indicator */}
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
