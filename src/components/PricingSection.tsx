import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Scissors } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: 'Ready-to-Wear',
    price: '₹1,499+',
    period: 'per garment',
    description: 'Everyday refined elegance—designer shirts, trousers, kurtas, and casual jackets.',
    features: [
      'Pure breathable fabrics',
      'Complimentary fitting alterations',
      'Exclusive seasonal drops',
      'Store exchange guarantee',
    ],
  },
  {
    name: 'Bespoke Sartorial',
    price: '₹8,999+',
    period: 'custom suit',
    description: 'Made-to-measure 2-piece/3-piece suits, bandhgalas, and blazer ensembles.',
    features: [
      'Over 200+ imported & Indian fabrics',
      'Full body 30-point measurements',
      '2 personalized fitting sessions',
      'Custom inner lining & monogram',
    ],
    highlighted: true,
  },
  {
    name: 'Royal Trouseau',
    price: '₹24,999+',
    period: 'wedding package',
    description: 'Complete luxury groom & family wedding wear with master embroidery.',
    features: [
      'Hand-embroidered zardozi sherwani',
      'Matching stole, safa & accessories',
      'Master tailor direct consultation',
      'Express bridal/festive delivery',
    ],
  },
];

export const PricingSection: React.FC<{ onSelectTier?: (tierName: string) => void }> = ({
  onSelectTier,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="pricing" ref={containerRef} className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass border border-amber-400/20 text-amber-300 text-xs tracking-widest uppercase mb-4">
            <Scissors className="w-3.5 h-3.5" />
            <span>Tailoring & Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-normal">
            Bespoke Pricing & Packages
          </h2>
          <p className="text-white/50 text-sm mt-3">
            Handcrafted with devotion at Dharmendra Garments Clothing Shop
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`liquid-glass rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.highlighted ? 'border-amber-400/30 bg-white/[0.03]' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-amber-200/90 text-sm font-medium tracking-wide uppercase">
                    {tier.name}
                  </span>
                  {tier.highlighted && (
                    <span className="liquid-glass text-xs text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl md:text-4xl text-white font-medium tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-white/40 text-xs uppercase tracking-wider">
                    / {tier.period}
                  </span>
                </div>

                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  {tier.description}
                </p>

                <div className="w-full h-px bg-white/10 mb-6" />

                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/80">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectTier?.(tier.name)}
                className={`w-full py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  tier.highlighted
                    ? 'bg-amber-300 text-black hover:bg-amber-200 shadow-lg font-semibold'
                    : 'liquid-glass text-white hover:bg-white/10 border border-white/20'
                }`}
              >
                Inquire for {tier.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
