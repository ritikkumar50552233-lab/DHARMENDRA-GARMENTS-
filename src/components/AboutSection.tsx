import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Sparkles, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={containerRef}
      className="bg-black pt-24 md:pt-36 pb-12 md:pb-16 px-6 overflow-hidden relative border-t border-white/5"
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-start">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-amber-300/80 text-xs sm:text-sm tracking-widest uppercase mb-6 font-semibold flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>About Dharmendra Garments • Punpun, Patna</span>
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight font-normal"
        >
          Vishwas aur Shandar Quality ka{' '}
          <span className="font-instrument italic text-amber-200">bharosemand showroom</span>,{' '}
          <br className="hidden md:inline" />
          <span className="font-instrument italic text-white/70">
            aapke parivar ki har zaroorat ke liye.
          </span>
        </motion.h2>

        {/* Good words / Achhi Baatein */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-white/75 text-sm sm:text-base md:text-lg max-w-3xl font-light leading-relaxed"
        >
          <strong>Dharmendra Garments</strong>, Block Road, Punpun, Patna mein sthit ek vishesh offline clothing showroom hai. Hamara uddeshya aapko aur aapke pure parivar ko har tyohar, vivah, aur aam dinon ke liye behtareen quality ke kapde sabse sahi aur kifayati daamon par uplabdh karana hai.
        </motion.p>

        {/* 3 Trust pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="liquid-glass rounded-2xl p-6 border border-white/10"
          >
            <div className="w-10 h-10 rounded-full liquid-glass border border-amber-400/30 text-amber-300 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-white font-medium text-base mb-2">Original Quality & Kapda</h3>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Cotton, silk, denim aur formal fabrics ka direct chunav. Rang aur kapde ki behtareen gunvatta.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="liquid-glass rounded-2xl p-6 border border-white/10"
          >
            <div className="w-10 h-10 rounded-full liquid-glass border border-amber-400/30 text-amber-300 flex items-center justify-center mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-white font-medium text-base mb-2">Sahi Daam, Pura Vishwas</h3>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Bina kisi chhupe shulk ke sidhe showroom rate par behtareen khareedari ka anubhav.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="liquid-glass rounded-2xl p-6 border border-white/10"
          >
            <div className="w-10 h-10 rounded-full liquid-glass border border-amber-400/30 text-amber-300 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-white font-medium text-base mb-2">Block Road, Punpun Showroom</h3>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Showroom aakar trial room mein fit check karein aur tasalli se apni pasand ke kapde chunein.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
