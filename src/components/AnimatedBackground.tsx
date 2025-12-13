import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient with more color */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, hsl(270 80% 40% / 0.5), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, hsl(200 100% 50% / 0.3), transparent),
            radial-gradient(ellipse 60% 40% at 0% 80%, hsl(320 80% 50% / 0.25), transparent),
            linear-gradient(180deg, hsl(240 20% 8%) 0%, hsl(260 30% 6%) 50%, hsl(240 20% 5%) 100%)
          `
        }}
      />

      {/* Large animated gradient orbs */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(270 100% 60% / 0.4) 0%, hsl(280 100% 50% / 0.2) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 200, 100, 0],
          y: [0, 100, 200, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(200 100% 60% / 0.4) 0%, hsl(180 100% 50% / 0.2) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -150, -50, 0],
          y: [0, -100, -150, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(320 100% 60% / 0.3) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: ["-50%", "-30%", "-70%", "-50%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated wave lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(270 100% 70%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(270 100% 70%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(270 100% 70%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(200 100% 60%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(200 100% 60%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(200 100% 60%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M 0 ${300 + i * 150} Q 25% ${250 + i * 150} 50% ${300 + i * 150} T 100% ${300 + i * 150}`}
            fill="none"
            stroke={i % 2 === 0 ? "url(#waveGrad1)" : "url(#waveGrad2)"}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4 + (i % 4) * 3,
            height: 4 + (i % 4) * 3,
            left: `${(i * 3.3) % 100}%`,
            top: `${(i * 7.7) % 100}%`,
            background: i % 3 === 0 
              ? "hsl(270 100% 70%)" 
              : i % 3 === 1 
              ? "hsl(200 100% 70%)" 
              : "hsl(320 100% 70%)",
            boxShadow: `0 0 ${15 + (i % 5) * 5}px ${
              i % 3 === 0 
                ? "hsl(270 100% 70% / 0.6)" 
                : i % 3 === 1 
                ? "hsl(200 100% 70% / 0.6)" 
                : "hsl(320 100% 70% / 0.6)"
            }`,
          }}
          animate={{
            y: [0, -100 - (i % 5) * 30, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * 50, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 8 + (i % 5) * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(270 100% 70%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(270 100% 70%) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated glow spots */}
      <motion.div
        className="absolute top-[20%] right-[20%] w-4 h-4 rounded-full bg-purple-500"
        style={{ boxShadow: "0 0 60px 30px hsl(270 100% 60% / 0.5)" }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[15%] w-3 h-3 rounded-full bg-cyan-400"
        style={{ boxShadow: "0 0 50px 25px hsl(200 100% 60% / 0.5)" }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-[60%] right-[40%] w-3 h-3 rounded-full bg-pink-500"
        style={{ boxShadow: "0 0 40px 20px hsl(320 100% 60% / 0.4)" }}
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
