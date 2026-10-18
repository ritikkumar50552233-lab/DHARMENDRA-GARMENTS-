import React from 'react';
import { Instagram, Twitter, ArrowUp, MessageCircle, Phone, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { useStore } from '../context/StoreContext.tsx';
import { getGeneralWhatsAppUrl } from '../lib/whatsapp.ts';

interface FooterProps {
  onNavClick?: (id: string) => void;
  onOpenPolicy?: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenPolicy }) => {
  const { storeInfo } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waUrl = getGeneralWhatsAppUrl(storeInfo);

  return (
    <footer className="bg-black border-t border-white/10 text-white/60 py-16 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Brand & Address */}
        <div className="flex flex-col items-start gap-3">
          <BrandLogo size="md" />
          <p className="text-xs text-white/50 max-w-sm leading-relaxed mt-1">
            {storeInfo.tagline}. High quality fabrics, bespoke suits, sherwanis, and casuals available at our retail showroom.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-amber-300/80 mt-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{storeInfo.city || 'Bihar, India'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>{storeInfo.whatsappNumber}</span>
            </span>
          </div>
        </div>

        {/* Navigation & WhatsApp */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm">
          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => onNavClick?.('catalog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Gents Collection
            </button>
            <button
              type="button"
              onClick={() => onNavClick?.('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About Showroom
            </button>
            <button
              type="button"
              onClick={() => onNavClick?.('location')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Showroom Location
            </button>
            <a
              href="https://maps.app.goo.gl/3XzfUkboS4C32TKa6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:underline"
            >
              Maps Location Link
            </a>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full liquid-glass border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/10 transition-colors text-xs font-medium shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Inquire on WhatsApp</span>
          </a>

          {/* Socials & Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full p-2.5 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full p-2.5 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="liquid-glass rounded-full p-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-white/40 gap-4">
        <p>© {new Date().getFullYear()} DHARMENDRA GARMENTS. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onOpenPolicy?.('privacy')}
            className="hover:text-white transition-colors underline cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenPolicy?.('terms')}
            className="hover:text-white transition-colors underline cursor-pointer"
          >
            Terms & Conditions
          </button>
        </div>
        <p className="font-instrument italic text-amber-200/80 text-sm">
          Block Road, Punpun, Patna, Bihar • Offline Clothing Store
        </p>
      </div>
    </footer>
  );
};
