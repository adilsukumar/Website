import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Heart, ArrowUp, Sparkles } from "lucide-react";

const Footer = () => {
  const containerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const y = useTransform(smoothProgress, [0, 1], [100, 0]);

  const links = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      ref={containerRef}
      className="py-16 border-t border-border/50 relative noise overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-animated rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: ["-50%", "-45%", "-55%", "-50%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        />
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/30 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              bottom: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ opacity, y }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Scroll to top button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ 
                scale: 1.1, 
                y: -5,
                boxShadow: "0 0 40px hsl(var(--primary) / 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="p-4 glass-strong rounded-full border-gradient-animated glow group"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
              >
                <ArrowUp className="w-6 h-6 text-primary group-hover:text-foreground transition-colors" />
              </motion.div>
            </motion.button>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a 
                href="#" 
                className="font-display text-3xl font-bold holographic flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                </motion.div>
                AC
              </motion.a>
            </motion.div>

            {/* Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center gap-8"
            >
              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ 
                    y: -5, 
                    color: "hsl(var(--primary))",
                    transition: { duration: 0.2 }
                  }}
                  className="text-muted-foreground hover:text-foreground transition-smooth relative group font-medium"
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient w-0 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
            </motion.nav>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-sm flex items-center gap-2"
            >
              <span>© {currentYear} Alex Chen.</span>
              <span className="flex items-center gap-1">
                Made with
                <motion.span
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </motion.span>
              </span>
            </motion.div>
          </div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />

          {/* Credits */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-center text-xs text-muted-foreground/50 mt-6"
          >
            Crafted with React, Tailwind CSS & Framer Motion
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
