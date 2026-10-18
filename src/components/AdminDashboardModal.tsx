import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Package,
  Layers,
  Store,
  Plus,
  Trash2,
  Edit2,
  Check,
  Save,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { Product, Category, StoreInfo } from '../types/store.ts';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const {
    products,
    categories,
    storeInfo,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    updateStoreInfo,
  } = useStore();

  const { isAdmin, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'store'>('products');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Product form state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState<number>(0);
  const [prodOriginalPrice, setProdOriginalPrice] = useState<string>('');
  const [prodImages, setProdImages] = useState<string>('');
  const [prodSizes, setProdSizes] = useState<string>('38, 40, 42, 44');
  const [prodColors, setProdColors] = useState<string>('Ivory, Maroon, Black');
  const [prodMaterial, setProdMaterial] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodIsAvailable, setProdIsAvailable] = useState<boolean>(true);
  const [prodIsFeatured, setProdIsFeatured] = useState<boolean>(false);

  // Category form state
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catImage, setCatImage] = useState('');

  // Store Info form state
  const [storeForm, setStoreForm] = useState<StoreInfo>(storeInfo);

  React.useEffect(() => {
    setStoreForm(storeInfo);
  }, [storeInfo]);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setProdName('');
    setProdDesc('');
    setProdPrice(0);
    setProdOriginalPrice('');
    setProdImages('');
    setProdSizes('38, 40, 42, 44');
    setProdColors('Ivory, Navy, Black');
    setProdMaterial('');
    setProdCategory(categories[0]?.name || '');
    setProdIsAvailable(true);
    setProdIsFeatured(false);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProdName(prod.name);
    setProdDesc(prod.description || '');
    setProdPrice(prod.price);
    setProdOriginalPrice(prod.originalPrice ? String(prod.originalPrice) : '');
    setProdImages((prod.images || []).join('\n'));
    setProdSizes((prod.sizes || []).join(', '));
    setProdColors((prod.colors || []).join(', '));
    setProdMaterial(prod.material || '');
    setProdCategory(prod.category || '');
    setProdIsAvailable(prod.isAvailable);
    setProdIsFeatured(prod.isFeatured);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || prodPrice <= 0) {
      alert('Please enter a valid product name and non-negative price.');
      return;
    }

    const imageList = prodImages
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const sizeList = prodSizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const colorList = prodColors
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const origPriceNum = prodOriginalPrice ? parseFloat(prodOriginalPrice) : null;

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, {
          name: prodName,
          description: prodDesc,
          price: Number(prodPrice),
          originalPrice: origPriceNum,
          images: imageList.length > 0 ? imageList : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'],
          sizes: sizeList,
          colors: colorList,
          material: prodMaterial,
          category: prodCategory || categories[0]?.name || 'General',
          isAvailable: prodIsAvailable,
          isFeatured: prodIsFeatured,
        });
        showStatus('Product updated successfully!');
      } else {
        await addProduct({
          name: prodName,
          description: prodDesc,
          price: Number(prodPrice),
          originalPrice: origPriceNum,
          images: imageList.length > 0 ? imageList : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'],
          sizes: sizeList,
          colors: colorList,
          material: prodMaterial,
          category: prodCategory || categories[0]?.name || 'General',
          isAvailable: prodIsAvailable,
          isFeatured: prodIsFeatured,
        });
        showStatus('New product published to showroom!');
      }
      resetProductForm();
    } catch (err) {
      alert('Error saving product: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the showroom?`)) {
      try {
        await deleteProduct(id);
        showStatus('Product removed from database.');
        if (editingProductId === id) resetProductForm();
      } catch (err) {
        alert('Error deleting: ' + (err instanceof Error ? err.message : String(err)));
      }
    }
  };

  // Category handlers
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    try {
      const slugVal = catSlug.trim() || catName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      if (editingCatId) {
        await updateCategory(editingCatId, {
          name: catName,
          slug: slugVal,
          description: catDesc,
          image: catImage,
        });
        showStatus('Category updated.');
      } else {
        await addCategory({
          name: catName,
          slug: slugVal,
          description: catDesc,
          image: catImage || 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
        });
        showStatus('New category added.');
      }
      setEditingCatId(null);
      setCatName('');
      setCatSlug('');
      setCatDesc('');
      setCatImage('');
    } catch (err) {
      alert('Error saving category: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  // Store Info handler
  const handleSaveStoreInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateStoreInfo(storeForm);
      showStatus('Store profile & Google map settings saved!');
    } catch (err) {
      alert('Error updating store info: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
          className="liquid-glass rounded-3xl max-w-5xl w-full p-6 sm:p-8 relative z-10 border border-amber-400/30 shadow-2xl bg-zinc-950/95 text-left my-8 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="liquid-glass p-2.5 rounded-xl border border-amber-400/40 text-amber-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl text-white font-medium">
                  Dharmendra Garments • Shop Owner Dashboard
                </h2>
                <p className="text-xs text-white/50">
                  Signed in as: <span className="text-amber-200">{user?.email}</span> (Administrator)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Alert */}
          {statusMessage && (
            <div className="my-3 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex gap-2 sm:gap-4 my-4 border-b border-white/10 pb-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-amber-300 text-black shadow-md font-semibold'
                  : 'liquid-glass text-white/70 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products ({products.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-amber-300 text-black shadow-md font-semibold'
                  : 'liquid-glass text-white/70 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Categories ({categories.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('store')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'store'
                  ? 'bg-amber-300 text-black shadow-md font-semibold'
                  : 'liquid-glass text-white/70 hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Store Profile & Map</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto pr-1">
            {/* TAB 1: PRODUCTS */}
            {activeTab === 'products' && (
              <div className="space-y-8">
                {/* Product Form */}
                <form
                  onSubmit={handleSaveProduct}
                  className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-4 bg-zinc-900/60"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <h3 className="text-white text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                      <Plus className="w-4 h-4 text-amber-300" />
                      <span>{editingProductId ? 'Edit Clothing Item' : 'Add New Showroom Item'}</span>
                    </h3>
                    {editingProductId && (
                      <button
                        type="button"
                        onClick={resetProductForm}
                        className="text-xs text-white/50 hover:text-white underline"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Product Name *</label>
                      <input
                        type="text"
                        required
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        placeholder="e.g. Royal Silk Hand-Embroidered Sherwani"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Category</label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Selling Price (₹) *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={prodPrice || ''}
                        onChange={(e) => setProdPrice(Number(e.target.value))}
                        placeholder="e.g. 14999"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Original Price (₹) (Optional)</label>
                      <input
                        type="number"
                        min="0"
                        value={prodOriginalPrice}
                        onChange={(e) => setProdOriginalPrice(e.target.value)}
                        placeholder="e.g. 17999 (only if genuinely applicable)"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Available Sizes (comma separated)</label>
                      <input
                        type="text"
                        value={prodSizes}
                        onChange={(e) => setProdSizes(e.target.value)}
                        placeholder="38, 40, 42, 44 or S, M, L, XL"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Available Colors (comma separated)</label>
                      <input
                        type="text"
                        value={prodColors}
                        onChange={(e) => setProdColors(e.target.value)}
                        placeholder="Ivory Gold, Royal Maroon, Navy"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase text-white/60 mb-1">Material / Fabric Details</label>
                      <input
                        type="text"
                        value={prodMaterial}
                        onChange={(e) => setProdMaterial(e.target.value)}
                        placeholder="e.g. Pure Banarasi Raw Silk with Hand Zardozi & Velvet Trims"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase text-white/60 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                        placeholder="Full description of the cut, craftsmanship, occasions, and fit..."
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase text-white/60 mb-1">Image URLs (one per line)</label>
                      <textarea
                        rows={2}
                        value={prodImages}
                        onChange={(e) => setProdImages(e.target.value)}
                        placeholder="https://images.unsplash.com/... or uploaded photo link"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center gap-6 sm:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-white/90">
                        <input
                          type="checkbox"
                          checked={prodIsAvailable}
                          onChange={(e) => setProdIsAvailable(e.target.checked)}
                          className="w-4 h-4 rounded text-amber-400"
                        />
                        <span>Available in Showroom (In Stock)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-sm text-white/90">
                        <input
                          type="checkbox"
                          checked={prodIsFeatured}
                          onChange={(e) => setProdIsFeatured(e.target.checked)}
                          className="w-4 h-4 rounded text-amber-400"
                        />
                        <span>Feature on Homepage</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      className="bg-amber-300 text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-amber-200 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingProductId ? 'Update Product' : 'Save & Publish Product'}</span>
                    </button>
                  </div>
                </form>

                {/* Existing Products List */}
                <div>
                  <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-3">
                    Showroom Product Catalog ({products.length})
                  </h3>
                  <div className="space-y-3">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        className="liquid-glass rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images?.[0]}
                            alt=""
                            className="w-12 h-16 object-cover rounded-lg bg-zinc-900 border border-white/10 flex-shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-medium text-sm sm:text-base">{p.name}</h4>
                              {p.isFeatured && (
                                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                                  Featured
                                </span>
                              )}
                              {!p.isAvailable && (
                                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                            <p className="text-amber-200 text-sm font-bold mt-0.5">
                              ₹{p.price.toLocaleString('en-IN')}
                              <span className="text-white/40 text-xs font-normal ml-2">
                                ({p.category})
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => handleEditProduct(p)}
                            className="liquid-glass p-2 rounded-lg text-white/70 hover:text-white transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="liquid-glass p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CATEGORIES */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <form
                  onSubmit={handleSaveCategory}
                  className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-4 bg-zinc-900/60"
                >
                  <h3 className="text-white text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                    <Plus className="w-4 h-4 text-amber-300" />
                    <span>{editingCatId ? 'Edit Category' : 'Create New Category'}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Category Name *</label>
                      <input
                        type="text"
                        required
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                        placeholder="e.g. Wedding & Indo-Western"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Slug (URL friendly)</label>
                      <input
                        type="text"
                        value={catSlug}
                        onChange={(e) => setCatSlug(e.target.value)}
                        placeholder="e.g. wedding-indo-western"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase text-white/60 mb-1">Category Image URL</label>
                      <input
                        type="text"
                        value={catImage}
                        onChange={(e) => setCatImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase text-white/60 mb-1">Brief Description</label>
                      <input
                        type="text"
                        value={catDesc}
                        onChange={(e) => setCatDesc(e.target.value)}
                        placeholder="Handcrafted wedding outfits, sherwanis, and festive attire"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-amber-300 text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-amber-200 transition-all cursor-pointer"
                    >
                      {editingCatId ? 'Update Category' : 'Add Category'}
                    </button>
                  </div>
                </form>

                <div className="space-y-3">
                  <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
                    Showroom Categories ({categories.length})
                  </h3>
                  {categories.map((c) => (
                    <div
                      key={c.id}
                      className="liquid-glass rounded-xl p-3.5 flex items-center justify-between border border-white/10"
                    >
                      <div>
                        <h4 className="text-white font-medium">{c.name}</h4>
                        <p className="text-white/50 text-xs">{c.description || c.slug}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCatId(c.id);
                            setCatName(c.name);
                            setCatSlug(c.slug);
                            setCatDesc(c.description || '');
                            setCatImage(c.image || '');
                          }}
                          className="liquid-glass p-2 rounded-lg text-white/70 hover:text-white"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete category "${c.name}"?`)) {
                              deleteCategory(c.id);
                            }
                          }}
                          className="liquid-glass p-2 rounded-lg text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: STORE INFO & MAP */}
            {activeTab === 'store' && (
              <form onSubmit={handleSaveStoreInfo} className="space-y-5">
                <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-4 bg-zinc-900/60">
                  <h3 className="text-white text-sm font-semibold uppercase tracking-wider text-amber-300">
                    Store Identity & WhatsApp Contact
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Showroom Name</label>
                      <input
                        type="text"
                        required
                        value={storeForm.shopName}
                        onChange={(e) => setStoreForm({ ...storeForm, shopName: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={storeForm.tagline}
                        onChange={(e) => setStoreForm({ ...storeForm, tagline: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">
                        WhatsApp Inquiry Number (Official: +91 9386432892)
                      </label>
                      <input
                        type="text"
                        required
                        value={storeForm.whatsappNumber}
                        onChange={(e) => setStoreForm({ ...storeForm, whatsappNumber: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={storeForm.phone}
                        onChange={(e) => setStoreForm({ ...storeForm, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Email</label>
                      <input
                        type="email"
                        value={storeForm.email}
                        onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-white/60 mb-1">Opening Hours</label>
                      <input
                        type="text"
                        value={storeForm.openingHours}
                        onChange={(e) => setStoreForm({ ...storeForm, openingHours: e.target.value })}
                        placeholder="Mon - Sun: 10:00 AM – 9:00 PM"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Showroom Address & Real Map Location */}
                <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-4 bg-zinc-900/60">
                  <h3 className="text-white text-sm font-semibold uppercase tracking-wider text-amber-300">
                    Physical Showroom Location & Google Map
                  </h3>

                  <div>
                    <label className="block text-xs uppercase text-white/60 mb-1">
                      Verified Showroom Address *
                    </label>
                    <textarea
                      rows={2}
                      value={storeForm.address}
                      onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
                      placeholder="Shop Number, Market Name, Landmark, City, State, Pincode"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-white/60 mb-1">
                      Google Maps Embed URL (IFrame src)
                    </label>
                    <input
                      type="text"
                      value={storeForm.mapEmbedUrl}
                      onChange={(e) => setStoreForm({ ...storeForm, mapEmbedUrl: e.target.value })}
                      placeholder="https://maps.google.com/maps?q=... or https://www.google.com/maps/embed?pb=..."
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                    />
                    <p className="text-[11px] text-white/40 mt-1">
                      If left empty, Google Maps will automatically search the showroom address entered above.
                    </p>
                  </div>
                </div>

                {/* Announcement Bar Settings */}
                <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-4 bg-zinc-900/60">
                  <h3 className="text-white text-sm font-semibold uppercase tracking-wider text-amber-300">
                    Top Announcement Bar
                  </h3>

                  <label className="flex items-center gap-2 cursor-pointer text-sm text-white/90">
                    <input
                      type="checkbox"
                      checked={storeForm.announcementActive}
                      onChange={(e) => setStoreForm({ ...storeForm, announcementActive: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-400"
                    />
                    <span>Show Announcement Banner on Homepage</span>
                  </label>

                  <div>
                    <label className="block text-xs uppercase text-white/60 mb-1">
                      Announcement Message
                    </label>
                    <input
                      type="text"
                      value={storeForm.announcement}
                      onChange={(e) => setStoreForm({ ...storeForm, announcement: e.target.value })}
                      placeholder="e.g. ✨ New Wedding Season Collection Now in Showroom!"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-amber-300 text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-amber-200 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Store Settings to Database</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
