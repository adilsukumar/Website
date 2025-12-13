import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, Sparkles, Check, ExternalLink, Instagram, Download, BookOpen } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const backgroundScale = useTransform(smoothProgress, [0, 0.5, 1], [0.6, 1.2, 0.8]);
  const backgroundRotate = useTransform(smoothProgress, [0, 1], [0, 180]);
  const sectionOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "adilsukumar24@gmail.com",
      href: "mailto:adilsukumar24@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    { 
      icon: MapPin, 
      label: "Location", 
      value: "Chennai, Tamil Nadu, India", 
      href: "#",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/adilsukumar", color: "hover:bg-gray-700" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/adilsukumar", color: "hover:bg-blue-700" },
    { icon: Mail, label: "Email", href: "mailto:adilsukumar24@gmail.com", color: "hover:bg-red-500" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/adilsukumar", color: "hover:bg-pink-600" },
    { icon: BookOpen, label: "Blog", href: "https://adilsukumar.blogspot.com", color: "hover:bg-orange-500" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 2000);
  };

  const formFields = [
    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
    { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
  ];

  return (
    <section
      id="contact"
      className="py-32 relative noise spotlight overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] bg-gradient-animated rounded-full blur-3xl opacity-15"
          style={{ scale: backgroundScale, rotate: backgroundRotate }}
        />
        
        {/* Floating shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-primary/20 w-6 h-6' : i % 3 === 1 ? 'bg-secondary/20 w-4 h-4' : 'bg-foreground/10 w-3 h-3'}`}
            style={{
              left: `${5 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-40, 40, -40],
              x: [-20, 20, -20],
              scale: [1, 1.8, 1],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}

        {/* Animated grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10" 
        ref={ref}
        style={{ opacity: sectionOpacity }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 border-gradient-animated"
            >
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm text-muted-foreground">Let's connect</span>
            </motion.div>

            <motion.h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 overflow-hidden">
              {"Get in ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.04, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span 
                className="holographic"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                Touch
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Have a project in mind, want to collaborate, or just want to connect? I'd love to hear from you!
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -20 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="perspective-1000"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, x: -50, rotateY: -10 }}
                    animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.label 
                      htmlFor={field.id} 
                      className="block text-sm font-medium mb-2"
                      animate={{ color: focusedField === field.id ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
                    >
                      {field.label}
                    </motion.label>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <motion.input
                        type={field.type}
                        id={field.id}
                        onFocus={() => setFocusedField(field.id)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3.5 glass-strong rounded-xl border-0 bg-muted focus:ring-2 focus:ring-primary focus:outline-none transition-smooth"
                        placeholder={field.placeholder}
                        animate={{
                          boxShadow: focusedField === field.id 
                            ? "0 0 30px hsl(var(--primary) / 0.3)" 
                            : "none"
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ 
                          opacity: focusedField === field.id ? 1 : 0,
                          scale: focusedField === field.id ? 1 : 1.05
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.label 
                    htmlFor="message" 
                    className="block text-sm font-medium mb-2"
                    animate={{ color: focusedField === "message" ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
                  >
                    Message
                  </motion.label>
                  <motion.div className="relative" whileHover={{ scale: 1.01 }}>
                    <motion.textarea
                      id="message"
                      rows={5}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 glass-strong rounded-xl border-0 bg-muted focus:ring-2 focus:ring-primary focus:outline-none transition-smooth resize-none"
                      placeholder="Tell me about your project or idea..."
                      animate={{
                        boxShadow: focusedField === "message" 
                          ? "0 0 30px hsl(var(--primary) / 0.3)" 
                          : "none"
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ 
                        opacity: focusedField === "message" ? 1 : 0,
                        scale: focusedField === "message" ? 1 : 1.02
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full group flex items-center justify-center gap-2 px-8 py-4 font-display font-semibold rounded-xl overflow-hidden transition-smooth disabled:cursor-not-allowed relative ${
                    isSuccess ? 'bg-green-500' : 'bg-gradient-animated glow-intense'
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%", skewX: -20 }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                  
                  <motion.span
                    className="relative z-10 text-primary-foreground"
                    animate={{ opacity: isSubmitting ? 0.5 : 1 }}
                  >
                    {isSuccess ? "Message Sent!" : isSubmitting ? "Sending..." : "Send Message"}
                  </motion.span>
                  
                  <motion.div
                    className="relative z-10"
                    animate={
                      isSubmitting
                        ? { rotate: 360 }
                        : isSuccess
                        ? { scale: [0, 1.2, 1] }
                        : { x: 0 }
                    }
                    transition={
                      isSubmitting
                        ? { duration: 1, repeat: Infinity, ease: "linear" }
                        : { duration: 0.3 }
                    }
                  >
                    {isSuccess ? (
                      <Check className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <Send className="w-5 h-5 text-primary-foreground group-hover:translate-x-1 transition-transform" />
                    )}
                  </motion.div>
                </motion.button>
              </form>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 20 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 perspective-1000"
            >
              {/* Info cards */}
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href, color }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    initial={{ opacity: 0, y: 50, rotateX: -20 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{
                      scale: 1.05,
                      x: 15,
                      rotateY: 5,
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                    }}
                    className="flex items-center gap-4 p-5 glass-strong rounded-xl hover:glow-intense transition-smooth block border-gradient-animated relative overflow-hidden group"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center flex-shrink-0 relative z-10`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="relative z-10">
                      <div className="text-sm text-muted-foreground">{label}</div>
                      <div className="font-display font-medium group-hover:text-gradient transition-smooth">{value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                className="glass-strong p-6 rounded-xl border-gradient-animated"
              >
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  Connect with me
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    👋
                  </motion.span>
                </h3>
                <div className="flex gap-4">
                  {socials.map(({ icon: Icon, label, href, color }, index) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                      transition={{
                        delay: 1.1 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      whileHover={{
                        scale: 1.3,
                        rotate: 360,
                        y: -8,
                        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-14 h-14 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-white ${color} hover:glow-intense transition-smooth`}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                className="glass-strong p-6 rounded-xl border-gradient-animated relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="font-display font-semibold">Open to Opportunities</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Currently looking for internships, collaborations, and exciting projects in AI, FinTech, and Bioinformatics.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
