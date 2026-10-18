import React from 'react';
import { Product } from '../types/store.ts';
import { useStore } from '../context/StoreContext.tsx';
import { getProductWhatsAppUrl } from '../lib/whatsapp.ts';
import { MessageCircle, Eye, CheckCircle2, XCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { storeInfo } = useStore();
  const waUrl = getProductWhatsAppUrl(product, storeInfo);
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="liquid-glass rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-amber-400/40 transition-all duration-300 group shadow-lg">
      {/* Product Image Area */}
      <div className="aspect-[3/4] relative overflow-hidden bg-zinc-900">
        <img
          src={mainImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          {product.category && (
            <span className="liquid-glass text-[11px] font-medium uppercase tracking-wider text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30 backdrop-blur-md">
              {product.category}
            </span>
          )}

          {product.isAvailable ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 liquid-glass px-2.5 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              In Showroom
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-300 liquid-glass px-2.5 py-1 rounded-full border border-rose-500/30 backdrop-blur-md">
              <XCircle className="w-3 h-3 text-rose-400" />
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="liquid-glass px-4 py-2 rounded-full text-white text-xs font-medium border border-white/20 flex items-center gap-2 hover:bg-white/20 transition-all transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className="text-white font-medium text-base sm:text-lg tracking-tight mb-2 line-clamp-1 hover:text-amber-300 cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xl sm:text-2xl font-bold text-amber-200">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs sm:text-sm text-white/40 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Available Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1 font-medium">
                Available Sizes
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80 font-mono"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Available Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1 font-medium">
                Colors: <span className="text-white/70 normal-case">{product.colors.join(', ')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="liquid-glass py-2 px-3 rounded-full text-white text-xs font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 border border-white/15"
          >
            <Eye className="w-3.5 h-3.5 text-white/70" />
            <span>Details</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-3 rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-md"
            title="Inquire availability on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
