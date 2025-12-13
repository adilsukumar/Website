import { motion } from "framer-motion";

const SkillsSphere = () => {
  // Generate spark positions
  const sparks = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    angle: (i / 24) * 360,
    delay: i * 0.12,
    size: Math.random() * 4 + 2
  }));

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center overflow-hidden">
      {/* Outer glow */}
      <motion.div 
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main large sphere */}
      <motion.div 
        className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, hsl(var(--primary) / 0.9), hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.3) 80%)",
          boxShadow: "0 0 60px 15px hsl(var(--primary) / 0.5), 0 0 100px 30px hsl(var(--primary) / 0.3), inset 0 0 40px hsl(var(--primary) / 0.4)"
        }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Blue sparks shooting out */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: spark.size,
            height: spark.size,
            boxShadow: "0 0 8px 3px rgba(96, 165, 250, 0.9)"
          }}
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: [0, Math.cos(spark.angle * Math.PI / 180) * 180],
            y: [0, Math.sin(spark.angle * Math.PI / 180) * 180],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0]
          }}
          transition={{ 
            duration: 2,
            delay: spark.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="text-center">
          <motion.span 
            className="text-5xl sm:text-7xl font-display font-bold text-primary-foreground drop-shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            90+
          </motion.span>
          <p className="text-sm sm:text-base text-primary-foreground/80 mt-2">Skills in my arsenal</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsSphere;
