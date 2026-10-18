import React from 'react';
import brandLogoImg from '../assets/images/dharmendra_garments_logo_1792334381799.jpg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const imgSizeClass =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-10 h-10';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem with liquid glass circular ring */}
      <div
        className={`${imgSizeClass} rounded-full overflow-hidden border border-amber-400/40 shadow-[0_0_15px_rgba(234,179,8,0.2)] flex-shrink-0 bg-black flex items-center justify-center`}
      >
        <img
          src={brandLogoImg}
          alt="DHARMENDRA GARMENTS Logo"
          className="w-full h-full object-cover scale-110"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold tracking-wider text-sm sm:text-base uppercase leading-tight font-sans">
              DHARMENDRA GARMENTS
            </span>
          </div>
          <span className="text-amber-300/80 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium">
            Clothing Shop
          </span>
        </div>
      )}
    </div>
  );
};

export { brandLogoImg };
