import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, X } from "lucide-react";

import wicysCert from "@/assets/certificates/wicys-hackathon.jpg";
import entrepreneurshipCert from "@/assets/certificates/entrepreneurship-mindset.jpg";
import financeLiteracyCert from "@/assets/certificates/finance-literacy-quiz.jpg";
import responsibleAICert from "@/assets/certificates/responsible-ai.jpg";
import pythonCert from "@/assets/certificates/python-essentials.jpg";
import sebiCert from "@/assets/certificates/sebi-investor-awareness.jpg";

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const certificates = [
    {
      title: "1st Place - WiCyS Hackathon",
      issuer: "WiCyS VIT Bhopal",
      date: "2025",
      image: wicysCert,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Entrepreneurship Mindset for Young Innovators",
      issuer: "Institution's Innovation Council, VIT Bhopal",
      date: "Dec 2025",
      image: entrepreneurshipCert,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "National Financial Literacy Quiz 2026",
      issuer: "NISM & SEBI",
      date: "2026",
      image: financeLiteracyCert,
      color: "from-amber-500 to-yellow-500",
    },
    {
      title: "Responsible AI: Reimagining AI For All",
      issuer: "VIT Bhopal ACM Student Chapter",
      date: "Sep 2025",
      image: responsibleAICert,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Python Essentials",
      issuer: "Vityarthi",
      date: "Nov 2025",
      image: pythonCert,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "SEBI Investor Awareness Test",
      issuer: "SEBI & NISM",
      date: "Nov 2025",
      image: sebiCert,
      color: "from-teal-500 to-green-500",
    },
  ];

  return (
    <section id="certificates" className="py-24 relative overflow-hidden" ref={ref}>
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
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Credentials</span>
            </motion.div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="holographic">Certificates</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional certifications and course completions
            </p>
          </motion.div>

          {/* Certificates grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setSelectedCert(cert.image)}
                className="group glass rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Certificate image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cert.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                </div>

                {/* Certificate info */}
                <div className="p-4">
                  <h3 className="font-display font-bold text-sm leading-tight mb-1 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-xs">{cert.issuer}</p>
                  <p className="text-muted-foreground text-xs mt-1">{cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl max-h-[90vh]"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-12 right-0 p-2 glass rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedCert}
              alt="Certificate"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Certificates;
