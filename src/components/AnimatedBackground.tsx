const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Night sky gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, hsl(240 60% 20% / 0.8), transparent),
            radial-gradient(ellipse 60% 40% at 100% 20%, hsl(220 80% 30% / 0.4), transparent),
            radial-gradient(ellipse 60% 40% at 0% 80%, hsl(260 50% 25% / 0.3), transparent),
            linear-gradient(180deg, hsl(230 30% 8%) 0%, hsl(240 25% 6%) 50%, hsl(250 20% 5%) 100%)
          `
        }}
      />

      {/* Moon */}
      <div 
        className="absolute top-[8%] right-[12%] w-20 h-20 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, hsl(45 20% 95%) 0%, hsl(45 15% 85%) 50%, hsl(45 10% 75%) 100%)",
          boxShadow: `
            0 0 60px 20px hsl(45 30% 90% / 0.3),
            0 0 120px 60px hsl(45 30% 80% / 0.15),
            inset -8px -8px 20px hsl(45 10% 60% / 0.4)
          `,
        }}
      >
        {/* Moon craters */}
        <div 
          className="absolute top-[20%] left-[25%] w-4 h-4 rounded-full"
          style={{ background: "hsl(45 10% 70% / 0.5)" }}
        />
        <div 
          className="absolute top-[50%] left-[55%] w-3 h-3 rounded-full"
          style={{ background: "hsl(45 10% 70% / 0.4)" }}
        />
        <div 
          className="absolute top-[65%] left-[30%] w-2 h-2 rounded-full"
          style={{ background: "hsl(45 10% 70% / 0.3)" }}
        />
      </div>

      {/* Stars - static for performance */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: 1 + (i % 3),
            height: 1 + (i % 3),
            left: `${(i * 7.3) % 100}%`,
            top: `${(i * 5.7) % 70}%`,
            opacity: 0.3 + (i % 5) * 0.15,
          }}
        />
      ))}

      {/* Subtle gradient orbs - simplified */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(250 80% 50% / 0.15) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(200 80% 50% / 0.1) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(250 50% 60%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(250 50% 60%) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
