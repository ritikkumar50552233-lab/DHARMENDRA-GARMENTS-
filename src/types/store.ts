export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  images: string[];
  sizes: string[];
  colors: string[];
  material?: string;
  category: string;
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface StoreInfo {
  shopName: string;
  tagline: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  openingHours: string;
  announcement: string;
  announcementActive: boolean;
  mapEmbedUrl: string;
  googleMapsShareUrl: string;
  updatedAt?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  phone?: string;
  role?: 'admin' | 'customer';
  createdAt?: string;
}
