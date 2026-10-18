import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass rounded-3xl max-w-2xl w-full p-8 md:p-12 relative z-10 border border-amber-400/20 shadow-2xl bg-zinc-950/95 text-left my-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge & Brand Logo */}
            <div className="flex items-center justify-between mb-6">
              <BrandLogo size="md" />
              <div className="flex items-center gap-1.5 text-amber-300/80 text-xs tracking-widest uppercase font-medium">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Atelier Manifesto</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl text-white font-normal tracking-tight mb-6 font-instrument italic">
              Craftsmanship then grace.
            </h3>

            {/* Content */}
            <div className="space-y-4 text-white/75 text-sm md:text-base leading-relaxed">
              <p>
                At <strong className="text-white font-medium">DHARMENDRA GARMENTS CLOTHING SHOP</strong>, we believe that clothes are not mere garments—they are wearable architecture and personal identity.
              </p>
              <p>
                Every thread, seam, and stitch is calibrated with master precision. Whether preparing for a grand wedding, an executive boardroom, or a memorable festival, our mission is to ensure you feel poised, distinguished, and entirely yourself.
              </p>
              <p className="font-instrument italic text-xl md:text-2xl text-amber-200/90 pt-3 border-t border-white/10 mt-6">
                “A garment tailored to perfection does not merely fit the body; it crowns the person.”
              </p>
            </div>

            {/* Footer action */}
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
              <a
                href="https://wa.me/919386432892?text=Hello%20Dharmendra%20Garments,%20I%20would%20like%20to%20visit%20your%20showroom%20at%20Block%20Road%20Punpun%20Patna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors"
              >
                Showroom Visit / WhatsApp Inquiry →
              </a>
              <button
                type="button"
                onClick={onClose}
                className="liquid-glass rounded-full px-6 py-2.5 text-white text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
