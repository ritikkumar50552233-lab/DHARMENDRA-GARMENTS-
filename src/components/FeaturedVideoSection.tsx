import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FeaturedVideoSectionProps {
  onExploreMore?: () => void;
}

export const FeaturedVideoSection: React.FC<FeaturedVideoSectionProps> = ({ onExploreMore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section ref={containerRef} className="bg-black pt-6 md:pt-10 pb-16 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden aspect-video relative group shadow-2xl border border-white/5"
        >
          {/* Background Video */}
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Bottom Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
            {/* Left Card */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md shadow-lg border border-white/10">
              <p className="text-amber-300/90 text-xs tracking-widest uppercase mb-2 font-semibold">
                Dharmendra Garments • Offline Showroom
              </p>
              <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed font-light">
                Shandar kapda aur behtareen silai. Hamare Block Road, Punpun showroom par aakar fit check karein aur tasalli se apni pasand ke kapde chunein.
              </p>
            </div>

            {/* Right Button */}
            <motion.button
              type="button"
              onClick={() => {
                if (onExploreMore) {
                  onExploreMore();
                } else {
                  const el = document.getElementById('catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-xs sm:text-sm font-medium cursor-pointer self-start md:self-auto hover:bg-white/10 transition-colors whitespace-nowrap shadow-md border border-amber-300/30"
            >
              Showroom Catalog Dekhein
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
