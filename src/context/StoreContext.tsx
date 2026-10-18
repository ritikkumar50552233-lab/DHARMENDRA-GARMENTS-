import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase.ts';
import { Product, Category, StoreInfo } from '../types/store.ts';
import { useAuth } from './AuthContext.tsx';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  storeInfo: StoreInfo;
  loading: boolean;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  // Admin Operations
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateStoreInfo: (info: Partial<StoreInfo>) => Promise<void>;
}

export const defaultStoreInfo: StoreInfo = {
  shopName: 'Dharmendra Garments',
  tagline: 'Exclusive Gents Wear Clothing Showroom',
  whatsappNumber: '+91 9386432892',
  phone: '+91 9386432892',
  email: 'dharmendragarments@gmail.com',
  address: 'Block Road, Punpun, Patna, Bihar, India',
  city: 'Punpun, Patna, Bihar',
  openingHours: 'Mon – Sun: 9:00 AM – 9:00 PM (Daily Open)',
  announcement: '✨ Dharmendra Garments - Sirf Gents Cloth Showroom | Block Road, Punpun, Patna | WhatsApp: +91 9386432892',
  announcementActive: true,
  mapEmbedUrl: 'https://maps.google.com/maps?q=Punpun,+Patna,+Bihar&t=&z=15&ie=UTF8&iwloc=&output=embed',
  googleMapsShareUrl: 'https://maps.app.goo.gl/3XzfUkboS4C32TKa6',
};

export const gentsCategories: Category[] = [
  {
    id: 'cat_1',
    name: 'Gents Shirts & T-Shirts',
    slug: 'gents-shirts',
    description: 'Cotton formal shirts, casual linen shirts, party wear & branded t-shirts',
  },
  {
    id: 'cat_2',
    name: 'Gents Jeans & Casual Pants',
    slug: 'gents-jeans',
    description: 'Comfortable stretch denim jeans, ankle fit, narrow fit & cargo pants',
  },
  {
    id: 'cat_3',
    name: 'Gents Formal Trousers',
    slug: 'gents-trousers',
    description: 'Wrinkle-free office & festive formal trousers in all standard sizes',
  },
  {
    id: 'cat_4',
    name: 'Gents Kurta Pajama & Festive',
    slug: 'gents-kurta',
    description: 'Traditional cotton, silk & designer kurtas, dhoti sets & sadri jackets',
  },
  {
    id: 'cat_5',
    name: 'Coat Pant, Blazers & Suits',
    slug: 'coat-pant-suits',
    description: 'Wedding coat-pants, festive blazers, bandhgala and 2-piece/3-piece suits',
  },
  {
    id: 'cat_6',
    name: 'Gents Winter Collection',
    slug: 'winter-collection',
    description: 'Jackets, windcheaters, hoodies, cardigans and thermal wear for men',
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(gentsCategories);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(defaultStoreInfo);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // 1. Sync Store Info
    const unsubStoreInfo = onSnapshot(
      doc(db, 'storeInfo', 'main'),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as StoreInfo;
          setStoreInfo({
            ...defaultStoreInfo,
            ...data,
            whatsappNumber: '+91 9386432892',
            phone: '+91 9386432892',
            address: 'Block Road, Punpun, Patna, Bihar, India',
            city: 'Punpun, Patna, Bihar',
            googleMapsShareUrl: 'https://maps.app.goo.gl/3XzfUkboS4C32TKa6',
          });
        } else if (isAdmin) {
          setDoc(doc(db, 'storeInfo', 'main'), defaultStoreInfo).catch(() => {});
        }
      },
      (error) => {
        console.warn('Store info notice:', error);
      }
    );

    // 2. Sync Categories (Keep Gents Categories)
    setCategories(gentsCategories);

    // 3. Sync Products - ONLY genuine products uploaded by the owner (NO sample/dummy clothes)
    const unsubProducts = onSnapshot(
      collection(db, 'products'),
      (snap) => {
        const prodList: Product[] = [];
        snap.forEach((docItem) => {
          const p = docItem.data() as Omit<Product, 'id'>;
          // Filter out any legacy seed dummy products
          if (!docItem.id.startsWith('seed_prod_') && !docItem.id.startsWith('prod_1') && !docItem.id.startsWith('prod_2')) {
            prodList.push({ id: docItem.id, ...p });
          }
        });
        setProducts(prodList);
        setLoading(false);
      },
      () => {
        setProducts([]);
        setLoading(false);
      }
    );

    return () => {
      unsubStoreInfo();
      unsubProducts();
    };
  }, [isAdmin]);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newId = `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const now = new Date().toISOString();
      const newProduct: Product = {
        ...productData,
        id: newId,
        createdAt: now,
        updatedAt: now,
      };
      await setDoc(doc(db, 'products', newId), newProduct);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'products');
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const now = new Date().toISOString();
      await updateDoc(doc(db, 'products', id), {
        ...productData,
        updatedAt: now,
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `products/${id}`);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `products/${id}`);
    }
  };

  const addCategory = async (catData: Omit<Category, 'id'>) => {
    try {
      const newId = `cat_${Date.now()}`;
      await setDoc(doc(db, 'categories', newId), { ...catData, id: newId });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'categories');
    }
  };

  const updateCategory = async (id: string, catData: Partial<Category>) => {
    try {
      await updateDoc(doc(db, 'categories', id), catData);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `categories/${id}`);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `categories/${id}`);
    }
  };

  const updateStoreInfo = async (infoData: Partial<StoreInfo>) => {
    try {
      const updated = {
        ...storeInfo,
        ...infoData,
        whatsappNumber: '+91 9386432892',
        googleMapsShareUrl: 'https://maps.app.goo.gl/3XzfUkboS4C32TKa6',
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'storeInfo', 'main'), updated);
      setStoreInfo(updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'storeInfo/main');
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        storeInfo,
        loading,
        selectedCategory,
        setSelectedCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateStoreInfo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
