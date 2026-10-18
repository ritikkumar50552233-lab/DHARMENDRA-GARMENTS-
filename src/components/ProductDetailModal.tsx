import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, CheckCircle2, XCircle, Info, Sparkles, MapPin } from 'lucide-react';
import { Product } from '../types/store.ts';
import { useStore } from '../context/StoreContext.tsx';
import { getProductWhatsAppUrl } from '../lib/whatsapp.ts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectProduct,
}) => {
  const { products, storeInfo } = useStore();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!product) return null;

  const images = product.images?.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'];

  const waUrl = getProductWhatsAppUrl(
    product,
    storeInfo,
    selectedSize || undefined,
    selectedColor || undefined
  );

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative z-10 border border-white/15 shadow-2xl bg-zinc-950/95 text-left my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Image Gallery */}
            <div className="flex flex-col gap-3">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 relative shadow-inner">
                <img
                  src={images[selectedImgIndex] || images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails if multiple */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                        selectedImgIndex === idx
                          ? 'border-amber-400 scale-105'
                          : 'border-white/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & WhatsApp Inquiry */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Category & Status */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-amber-300 text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full liquid-glass border border-amber-400/30">
                    {product.category || 'General'}
                  </span>
                  {product.isAvailable ? (
                    <span className="text-emerald-300 text-xs font-medium inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Available in Store
                    </span>
                  ) : (
                    <span className="text-rose-400 text-xs font-medium inline-flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      Currently Out of Stock
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl text-white font-medium tracking-tight mb-3">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-white/10">
                  <span className="text-3xl font-bold text-amber-200">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-white/40 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-white/40">Inclusive of all local taxes</span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2 font-medium">
                    Product Description
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
                    {product.description || 'No detailed description provided by store yet.'}
                  </p>
                </div>

                {/* Material / Fabric */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-white/50 mb-1.5 font-medium">
                    Material / Fabric
                  </h4>
                  <p className="text-sm text-white/90 font-medium">
                    {product.material ? (
                      <span className="text-amber-200/90">{product.material}</span>
                    ) : (
                      <span className="text-white/40 italic">Fabric information not specified</span>
                    )}
                  </p>
                </div>

                {/* Sizes Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs uppercase tracking-wider text-white/50 font-medium">
                        Select Size for Inquiry:
                      </h4>
                      {selectedSize && (
                        <span className="text-xs text-amber-300 font-semibold">
                          Selected: {selectedSize}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer ${
                            selectedSize === size
                              ? 'bg-amber-300 text-black border-amber-300 font-bold shadow-md'
                              : 'bg-white/5 text-white/80 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs uppercase tracking-wider text-white/50 font-medium">
                        Select Color for Inquiry:
                      </h4>
                      {selectedColor && (
                        <span className="text-xs text-amber-300 font-semibold">
                          Selected: {selectedColor}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color === selectedColor ? '' : color)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                            selectedColor === color
                              ? 'bg-amber-300 text-black border-amber-300 font-bold shadow-md'
                              : 'bg-white/5 text-white/80 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Showroom Offline Note */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-200 text-xs mb-6 flex items-start gap-2.5">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                  <div className="leading-relaxed">
                    <strong>Showroom Purchase Only:</strong> To maintain perfect fitting, garments are purchased in person at our Dharmendra Garments showroom. Use WhatsApp to inquire about real-time availability or reserve this piece.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3.5 px-6 rounded-full text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-900/40"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Inquire on WhatsApp (+91 9386432892)</span>
                </a>

                <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{storeInfo.address || 'Visit Dharmendra Garments showroom'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <h3 className="text-lg text-white font-medium">More from {product.category}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setSelectedImgIndex(0);
                      setSelectedSize('');
                      setSelectedColor('');
                    }}
                    className="liquid-glass rounded-xl p-3 flex gap-3 items-center border border-white/10 hover:border-amber-400/30 cursor-pointer transition-colors group"
                  >
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                      <img
                        src={rel.images?.[0] || images[0]}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-white text-xs font-medium line-clamp-1 group-hover:text-amber-300">
                        {rel.name}
                      </h4>
                      <p className="text-amber-200 text-xs font-bold mt-1">
                        ₹{rel.price.toLocaleString('en-IN')}
                      </p>
                      <span className="text-[10px] text-white/40">View piece →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
