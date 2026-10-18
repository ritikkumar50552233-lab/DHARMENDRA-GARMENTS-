import React from 'react';
import { useStore, gentsCategories } from '../context/StoreContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { Sparkles, MessageCircle, Navigation, Plus, CheckCircle, Shirt } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../lib/whatsapp.ts';

interface ProductCatalogSectionProps {
  onOpenAdmin?: () => void;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({ onOpenAdmin }) => {
  const { storeInfo, products } = useStore();
  const { isAdmin } = useAuth();

  const waUrl = getGeneralWhatsAppUrl(storeInfo, 'Gents clothing collection at Punpun showroom');
  const mapsUrl = 'https://maps.app.goo.gl/3XzfUkboS4C32TKa6';

  return (
    <section id="catalog" className="bg-black py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Notice Badge: Gents Cloth Only */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-amber-400/40 text-amber-300 text-xs sm:text-sm tracking-wider uppercase font-semibold shadow-lg mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Yahan Sirf Gents Cloth (Men&apos;s Wear) Milte Hain</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-normal">
            Dharmendra Garments • Gents Collection
          </h2>

          <p className="text-white/70 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Block Road, Punpun, Patna, Bihar. Hamare showroom par sirf aur sirf mardana (Gents) kapde behtareen quality aur sahi daam par uplabdh hain.
          </p>
        </div>

        {/* Clean Gents Categories Grid (No photos, no prices) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {gentsCategories.map((cat) => (
            <div
              key={cat.id}
              className="liquid-glass rounded-2xl p-5 border border-white/10 hover:border-amber-400/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl liquid-glass border border-amber-400/30 text-amber-300 flex items-center justify-center mb-3">
                  <Shirt className="w-5 h-5" />
                </div>
                <h3 className="text-white font-medium text-base mb-1.5">{cat.name}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{cat.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-amber-300/80 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Showroom Mein Uplabdh</span>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Showcase Message (No dummy photos, no prices) */}
        <div className="liquid-glass rounded-3xl p-8 sm:p-12 text-center border border-amber-400/20 shadow-2xl relative">
          <h3 className="text-xl sm:text-2xl text-white font-medium mb-3">
            Gents Wear Catalog Under Live Update
          </h3>

          <p className="text-amber-200/90 text-sm font-medium mb-4">
            Showroom Owner dwara nayi photos jald hi yahan add ki jayengi.
          </p>

          <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mb-8">
            Abhi yahan koi dummy photo ya rate nahi dikhaya ja raha hai. Naye kapdon ke design aur direct availability janne ke liye hamare showroom padharein ya direct WhatsApp par sampark karein.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry: +91 9386432892</span>
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto liquid-glass border border-white/20 hover:bg-white/10 text-white font-medium px-8 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>Showroom Map Location Dekhein</span>
            </a>

            {isAdmin && onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="w-full sm:w-auto bg-amber-300 text-black font-semibold px-6 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product Photo (Owner)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
