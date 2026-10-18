import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const PhilosophySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="philosophy" ref={containerRef} className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24 font-normal"
        >
          Heritage{' '}
          <span className="font-instrument italic text-amber-300/60">x</span>{' '}
          Modern Fit
        </motion.h2>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: Video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl overflow-hidden aspect-[4/3] relative border border-white/10 shadow-2xl bg-white/[0.02]"
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
            />
          </motion.div>

          {/* Right Column: Two text blocks separated by divider */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center space-y-10"
          >
            {/* Block 1 */}
            <div>
              <p className="text-amber-300/70 text-xs tracking-widest uppercase mb-4 font-medium">
                Handpicked Premium Fabrics
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                From pure Italian wool blends and raw Banarasi silk to breathable linen and Egyptian cotton, every Dharmendra Garments creation is forged from materials that feel effortless and radiate distinction.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10" />

            {/* Block 2 */}
            <div>
              <p className="text-amber-300/70 text-xs tracking-widest uppercase mb-4 font-medium">
                Bespoke Tailoring & Finish
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                True elegance is a garment sculpted exclusively for your silhouette. Our master tailors ensure impeccable drape, razor-sharp lapels, and hand-stitched detailing that withstands trends.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
