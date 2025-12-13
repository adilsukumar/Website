import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Github, Twitter, Linkedin, Sparkles } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@alexchen.dev",
      href: "mailto:hello@alexchen.dev",
    },
    { icon: MapPin, label: "Location", value: "San Francisco, CA", href: "#" },
  ];

  const socials = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
    },
  };

  return (
    <section
      id="contact"
      className="py-32 relative noise overflow-hidden"
      ref={containerRef}
    >
      {/* Background decoration with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient rounded-full blur-3xl opacity-10"
          style={{ scale: backgroundScale }}
        />
        {/* Floating shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Let's work together</span>
            </motion.div>
            <motion.h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {"Let's ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, rotate: -10 }}
                  animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05, type: "spring" }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <span className="text-gradient">Connect</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Have a project in mind or just want to chat? I'd love to hear from you.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -10 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <label htmlFor={field.id} className="block text-sm font-medium mb-2">
                      {field.label}
                    </label>
                    <motion.input
                      type={field.type}
                      id={field.id}
                      whileFocus={inputVariants.focus}
                      className="w-full px-4 py-3 glass rounded-xl border-0 bg-muted focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    rows={5}
                    whileFocus={inputVariants.focus}
                    className="w-full px-4 py-3 glass rounded-xl border-0 bg-muted focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group flex items-center justify-center gap-2 px-8 py-4 bg-gradient text-primary-foreground font-display font-semibold rounded-xl overflow-hidden transition-all glow disabled:opacity-70"
                >
                  <motion.span
                    animate={isSubmitting ? { opacity: 0 } : { opacity: 1 }}
                  >
                    Send Message
                  </motion.span>
                  <motion.div
                    animate={
                      isSubmitting
                        ? { rotate: 360, x: [0, 100] }
                        : { x: 0 }
                    }
                    transition={
                      isSubmitting
                        ? { duration: 0.5 }
                        : { type: "spring", stiffness: 200 }
                    }
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </motion.button>
              </form>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 10 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Info cards */}
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      x: 10,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:glow transition-all duration-300 block"
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient rounded-xl flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-muted-foreground">{label}</div>
                      <div className="font-display font-medium">{value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="glass p-6 rounded-xl"
              >
                <h3 className="font-display font-semibold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {socials.map(({ icon: Icon, label, href }, index) => (
                    <motion.a
                      key={label}
                      href={href}
                      aria-label={label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: 0.8 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        transition: { duration: 0.4 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:glow transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-xl border-gradient cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.span
                    className="relative flex h-3 w-3"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </motion.span>
                  <span className="font-display font-semibold">Currently Available</span>
                </div>
                <motion.p
                  className="text-muted-foreground text-sm"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  I'm open to freelance projects and full-time opportunities. Let's build
                  something amazing together!
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
