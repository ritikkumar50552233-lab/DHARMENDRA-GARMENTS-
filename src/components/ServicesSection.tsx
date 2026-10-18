import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ServiceCardData {
  tag: string;
  title: string;
  description: string;
  videoUrl: string;
}

const services: ServiceCardData[] = [
  {
    tag: 'Wedding & Royal Couture',
    title: 'Sherwanis & Indo-Western',
    description:
      'Exquisite hand-embroidered wedding wear, regal bandhgalas, and silk kurta sets crafted for grand celebrations.',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  },
  {
    tag: 'Executive & Formal Wear',
    title: 'Bespoke Suits & Tuxedos',
    description:
      'Impeccable two-piece and three-piece Italian cut suits, black-tie tuxedos, and casual blazers cut to absolute millimeter precision.',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
  },
];

export const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="features"
      ref={containerRef}
      className="bg-black py-28 md:py-40 px-6 overflow-hidden relative"
    >
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-2 mb-2 text-amber-300/80 text-xs uppercase tracking-widest font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dharmendra Garments Atelier</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-white tracking-tight font-normal">
              Signature Collections
            </h2>
          </div>
          <span className="text-white/40 text-sm hidden md:inline font-medium uppercase tracking-wider">
            Haute Couture • Ready-to-Wear
          </span>
        </motion.div>

        {/* Two-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="liquid-glass rounded-3xl overflow-hidden group flex flex-col justify-between border border-white/10 hover:border-amber-300/40 transition-colors"
            >
              {/* Card video area */}
              <div className="aspect-video relative overflow-hidden bg-black/40">
                <video
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  src={service.videoUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card body */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="uppercase tracking-widest text-amber-300/80 text-xs font-medium">
                      {service.tag}
                    </span>
                    <a
                      href={`https://wa.me/919386432892?text=${encodeURIComponent(
                        `Hello Dharmendra Garments, I would like to inquire about ${service.title} at your Punpun, Patna showroom.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-glass rounded-full p-2 text-white/70 group-hover:text-amber-300 transition-colors"
                      title="Inquire via WhatsApp (+91 9386432892)"
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-medium">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
