import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { storeInfo } = useStore();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !storeInfo.announcementActive || !storeInfo.announcement?.trim()) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-600/90 via-amber-500/90 to-amber-600/90 text-black py-2 px-4 relative z-50 text-xs sm:text-sm font-medium tracking-wide flex items-center justify-between shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-center w-full pr-6">
        <Sparkles className="w-4 h-4 flex-shrink-0 animate-pulse text-black" />
        <span className="font-semibold">{storeInfo.announcement}</span>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="p-1 hover:bg-black/10 rounded-full transition-colors flex-shrink-0"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5 text-black" />
      </button>
    </div>
  );
};
