import React, { useRef, useEffect, useState } from 'react';
import {
  ArrowRight,
  Instagram,
  Twitter,
  Sparkles,
  MessageCircle,
  MapPin,
  User as UserIcon,
  Shield,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useStore } from '../context/StoreContext.tsx';
import { getGeneralWhatsAppUrl } from '../lib/whatsapp.ts';

interface HeroSectionProps {
  onOpenManifesto: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenAdmin: () => void;
  onNavClick: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenManifesto,
  onOpenAuth,
  onOpenAdmin,
  onNavClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isFadingRef = useRef<'in' | 'out' | null>(null);

  const { user, profile, isAdmin, logout } = useAuth();
  const { storeInfo } = useStore();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  // Vanilla JS requestAnimationFrame opacity animator (no CSS transitions)
  const animateOpacity = (target: number, duration: number, callback?: () => void) => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    const video = videoRef.current;
    if (!video) return;

    const startOpacity = parseFloat(video.style.opacity || '0');
    const startTime = performance.now();

    const tick = (now: number) => {
      if (!videoRef.current) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const val = startOpacity + (target - startOpacity) * progress;
      videoRef.current.style.opacity = val.toFixed(4);

      if (progress < 1) {
        animFrameIdRef.current = requestAnimationFrame(tick);
      } else {
        animFrameIdRef.current = null;
        if (callback) callback();
      }
    };

    animFrameIdRef.current = requestAnimationFrame(tick);
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isFadingRef.current !== 'in' && parseFloat(video.style.opacity || '0') < 0.95) {
      isFadingRef.current = 'in';
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
      animateOpacity(1, 500, () => {
        isFadingRef.current = null;
      });
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || isNaN(video.duration) || video.duration <= 0) return;
    const remaining = video.duration - video.currentTime;
    if (remaining <= 0.55 && isFadingRef.current !== 'out') {
      isFadingRef.current = 'out';
      animateOpacity(0, 500);
    }
  };

  const handleEnded = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.style.opacity = '0';
    }
    setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
      isFadingRef.current = 'in';
      animateOpacity(1, 500, () => {
        isFadingRef.current = null;
      });
    }, 100);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  const generalWaUrl = getGeneralWhatsAppUrl(storeInfo);

  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col justify-between bg-black select-none">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
        style={{ opacity: 0 }}
        muted
        autoPlay
        playsInline
        preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Header / Navbar */}
      <header className="relative z-30 px-3 sm:px-6 py-4 sm:py-6 w-full">
        <nav className="liquid-glass rounded-full max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-xl border border-white/15">
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="flex items-center text-white hover:opacity-95 transition-opacity"
            >
              <BrandLogo size="md" showText={true} />
            </a>

            {/* Nav links */}
            <div className="hidden lg:flex items-center gap-6 ml-8">
              <button
                type="button"
                onClick={() => onNavClick('hero')}
                className="text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => onNavClick('catalog')}
                className="text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Gents Collection
              </button>
              <button
                type="button"
                onClick={() => onNavClick('about')}
                className="text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => onNavClick('location')}
                className="text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Showroom Location
              </button>
            </div>
          </div>

          {/* Right: User / Auth Controls */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="liquid-glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-white flex items-center gap-2 border border-white/20 hover:border-amber-400/40 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[120px] truncate">
                    {profile?.displayName || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                </button>

                {/* Account Dropdown */}
                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 liquid-glass rounded-2xl p-2 shadow-2xl border border-white/15 bg-zinc-950/95 z-50">
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-white text-xs font-semibold truncate">{user.email}</p>
                      <p className="text-[10px] text-amber-300/80 uppercase tracking-wider">
                        {isAdmin ? 'Store Administrator' : 'Customer Account'}
                      </p>
                    </div>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          setAccountMenuOpen(false);
                          onOpenAdmin();
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-amber-300 hover:bg-amber-400/10 rounded-xl flex items-center gap-2 mt-1 transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setAccountMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10 rounded-xl flex items-center gap-2 mt-1 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => onOpenAuth('signup')}
                  className="text-white text-xs sm:text-sm font-medium hover:text-white/80 transition-colors cursor-pointer px-2 py-1"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="liquid-glass rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer shadow-sm border border-amber-300/30"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 md:py-12 text-center md:-translate-y-[6%]">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-amber-400/40 text-amber-300 text-xs sm:text-sm tracking-widest uppercase font-bold shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>SIRF GENTS CLOTH STORE • PUNPUN, PATNA</span>
        </div>

        {/* Suggested Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight font-instrument font-normal mb-4 leading-tight max-w-4xl">
          Dharmendra Garments <br />
          <span className="font-instrument italic text-amber-200">Exclusive Gents Wear</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed px-4 max-w-xl mb-7 font-light">
          Block Road, Punpun, Patna, Bihar. Hamare showroom par sirf Gents Cloth (Men&apos;s Wear jaise Pant, Shirt, Jeans, T-Shirt, Kurta Pajama, Coat-Pant) uchit mulyo par uplabdh hain.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-4">
          <button
            type="button"
            onClick={() => onNavClick('catalog')}
            className="w-full sm:w-auto bg-white text-black font-semibold rounded-full px-7 py-3 text-xs sm:text-sm hover:bg-amber-100 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Gents Collection Dekhein</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://maps.app.goo.gl/3XzfUkboS4C32TKa6"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto liquid-glass border border-amber-400/40 text-amber-300 hover:bg-amber-400/10 font-medium rounded-full px-7 py-3 text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 text-amber-300" />
            <span>Maps Location</span>
          </a>

          <a
            href={generalWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-full px-7 py-3 text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: 9386432892</span>
          </a>
        </div>

        {/* Quick Atelier Manifesto text button */}
        <button
          type="button"
          onClick={onOpenManifesto}
          className="mt-6 text-xs text-white/50 hover:text-white transition-colors underline cursor-pointer"
        >
          Read Our Tailoring Story & Values →
        </button>
      </div>

      {/* Social / WhatsApp / Location Footer */}
      <div className="relative z-10 flex justify-center gap-4 pb-8 sm:pb-12">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
        >
          <Instagram className="w-4 h-4" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter / X"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href={generalWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Inquiry"
          title="Direct WhatsApp: +91 9386432892"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-emerald-300 hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
        <button
          type="button"
          onClick={() => onNavClick('location')}
          aria-label="Showroom Location"
          title="Store Location & Directions"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-amber-300 hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
        >
          <MapPin className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
