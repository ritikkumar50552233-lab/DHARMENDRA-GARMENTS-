import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

interface PolicyModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="liquid-glass rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative z-10 border border-white/15 shadow-2xl bg-zinc-950/95 text-left my-8 max-h-[85vh] overflow-y-auto"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <BrandLogo size="sm" showText={false} />
            <div>
              <h3 className="text-xl text-white font-medium">
                {isPrivacy ? 'Privacy Policy' : 'Terms & Showroom Conditions'}
              </h3>
              <p className="text-xs text-amber-300">Dharmendra Garments Clothing Shop</p>
            </div>
          </div>

          <div className="space-y-4 text-white/70 text-sm leading-relaxed">
            {isPrivacy ? (
              <>
                <p>
                  At <strong>Dharmendra Garments</strong>, we respect your personal privacy. We do not sell, rent, or trade your contact information to any third parties.
                </p>
                <h4 className="text-white text-sm font-semibold pt-2">Information Collected</h4>
                <p>
                  When you sign up or contact us via WhatsApp, we collect only your name, email, and phone number for fitting appointments and communication regarding product availability.
                </p>
                <h4 className="text-white text-sm font-semibold pt-2">Offline Showroom Policy</h4>
                <p>
                  Our website operates as an online showroom catalog. No online transactions, debit/credit card charges, or payment processing occur on this website. All financial transactions take place securely in person at our physical store.
                </p>
              </>
            ) : (
              <>
                <p>
                  Welcome to <strong>Dharmendra Garments</strong>. By accessing our online product showcase, you agree to these store terms.
                </p>
                <h4 className="text-white text-sm font-semibold pt-2">Product Availability & Pricing</h4>
                <p>
                  All prices and stock listings represent showroom inventory. While we strive to update records in real time via our administrator database, fabric availability and final bespoke tailoring pricing should be confirmed via WhatsApp or during your in-store visit.
                </p>
                <h4 className="text-white text-sm font-semibold pt-2">Store Purchases & Fitting</h4>
                <p>
                  All garment trials, alterations, and purchases occur at our physical showroom location. Inquiries sent via WhatsApp connect you directly with our showroom staff (+91 9386442539).
                </p>
              </>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="liquid-glass px-6 py-2 rounded-full text-xs text-white hover:bg-white/10 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
