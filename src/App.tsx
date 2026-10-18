/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { StoreProvider } from './context/StoreContext.tsx';
import { AnnouncementBar } from './components/AnnouncementBar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ProductCatalogSection } from './components/ProductCatalogSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { StoreLocationSection } from './components/StoreLocationSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { AdminDashboardModal } from './components/AdminDashboardModal.tsx';
import { ManifestoModal } from './components/ManifestoModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { PolicyModal } from './components/PolicyModal.tsx';
import { Product } from './types/store.ts';

function MainStoreApp() {
  const { isAdmin } = useAuth();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login',
  });

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-amber-400/30 selection:text-white flex flex-col">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <AnnouncementBar />

      {/* 2. HERO & NAVBAR (With exact phone, location & maps link) */}
      <div id="hero">
        <HeroSection
          onOpenManifesto={() => setIsManifestoOpen(true)}
          onOpenAuth={handleOpenAuth}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onNavClick={handleNavClick}
        />
      </div>

      {/* 3. GENTS WEAR CATALOG (Clean offline showroom state; zero dummy photos/prices) */}
      <ProductCatalogSection
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 4. ABOUT DHARMENDRA GARMENTS SHOWROOM */}
      <AboutSection />

      {/* 5. SHOWROOM LOCATION & REAL GOOGLE MAPS (BLOCK ROAD, PUNPUN, PATNA) */}
      <StoreLocationSection />

      {/* 6. FOOTER WITH REAL VERIFIED INFO & WHATSAPP LINK */}
      <Footer
        onNavClick={handleNavClick}
        onOpenPolicy={(type) => setPolicyType(type)}
      />

      {/* MODALS */}
      {/* Product Detail Modal (for when products are added) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Admin Dashboard (Protected for store owner to upload real photos) */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Customer Authentication (Firebase Google + Email Sign Up/Login) */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={handleCloseAuth}
      />

      {/* Atelier Manifesto */}
      <ManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />

      {/* Privacy Policy & Terms Modal */}
      <PolicyModal
        isOpen={Boolean(policyType)}
        type={policyType}
        onClose={() => setPolicyType(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <MainStoreApp />
      </StoreProvider>
    </AuthProvider>
  );
}
