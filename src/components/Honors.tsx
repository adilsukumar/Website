import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Trophy, Medal, Gamepad2, Bot, Brain, Globe, BookOpen } from "lucide-react";

const Honors = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const awards = [
    {
      icon: Brain,
      title: "National Science Talent Search (NSTSE)",
      rank: "State Rank 2",
      issuer: "Unified Council",
      date: "Mar 2024",
      description: "One of India's toughest national-level science assessments across Physics, Chemistry, Biology, and Logical Reasoning.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: BookOpen,
      title: "International English Olympiad (IEO)",
      rank: "AIR 44",
      issuer: "Science Olympiad Foundation",
      date: "Feb 2024",
      description: "Zonal Rank 25, Regional Rank 34, School Rank 3 in comprehension, reasoning, and grammar.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "National Cyber Olympiad (NCO)",
      rank: "School Rank 1",
      issuer: "Science Olympiad Foundation",
      date: "Jan 2024",
      description: "International Rank 238, assessing logical reasoning, cyber awareness, and IT skills.",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: Medal,
      title: "All India Maths & Science Talent Exam",
      rank: "AIR 933",
      issuer: "Silverzone Foundation",
      date: "Apr 2024",
      description: "Top 1000 nationally in multidisciplinary competitive exam assessing analytical and scientific aptitude.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Gamepad2,
      title: "Game Development Competition",
      rank: "1st Place",
      issuer: "Chinmaya Vidyalaya Interschool Fest",
      date: "Oct 2023",
      description: "Won among 100+ schools for designing a fully functional original game from concept to code.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Bot,
      title: "Interschool Robotics Competition",
      rank: "3rd Place",
      issuer: "STEM Inter-school Challenge",
      date: "Nov 2023",
      description: "Bluetooth-controlled home automation system transforming ordinary bulbs into smart devices.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const languages = [
    { name: "Tamil", level: "Native", percent: 100 },
    { name: "Telugu", level: "Native", percent: 100 },
    { name: "English", level: "Professional", percent: 95 },
    { name: "Hindi", level: "Working", percent: 70 },
    { name: "French", level: "A2", percent: 40 },
    { name: "German", level: "A1", percent: 25 },
  ];

  return (
    <section id="honors" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
            >
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Recognition</span>
            </motion.div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Honors & <span className="holographic">Awards</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              National-level achievements and competitive recognitions
            </p>
          </motion.div>

          {/* Awards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group glass rounded-2xl p-6 relative overflow-hidden"
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${award.color}`} />
                
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${award.color} flex items-center justify-center mb-4`}>
                  <award.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-bold text-lg leading-tight pr-2">{award.title}</h3>
                </div>
                
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${award.color} text-white text-sm font-bold mb-3`}>
                  {award.rank}
                </div>

                <p className="text-muted-foreground text-sm mb-3">{award.description}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{award.issuer}</span>
                  <span>{award.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Languages section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="font-display text-2xl font-bold mb-6 text-center">
              <span className="holographic">Languages</span>
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-sm">{lang.name}</span>
                      <span className="text-xs text-muted-foreground">{lang.level}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${lang.percent}%` } : {}}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Honors;