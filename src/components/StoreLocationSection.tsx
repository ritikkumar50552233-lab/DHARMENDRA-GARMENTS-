import React from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { MapPin, Navigation, Clock, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../lib/whatsapp.ts';

export const StoreLocationSection: React.FC = () => {
  const { storeInfo } = useStore();

  const exactMapsUrl = 'https://maps.app.goo.gl/3XzfUkboS4C32TKa6';
  const waUrl = getGeneralWhatsAppUrl(storeInfo, 'Gents clothing store location at Block Road, Punpun');

  return (
    <section id="location" className="bg-black py-20 md:py-28 px-6 relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_rgba(234,179,8,0.03)_0%,_transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass border border-amber-400/20 text-amber-300 text-xs tracking-widest uppercase mb-3 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>Exact Showroom Location</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-white tracking-tight font-normal">
              Dharmendra Garments
            </h2>
            <p className="text-amber-200/90 text-sm font-semibold mt-1">
              BLOCK ROAD, PUNPUN, PATNA, BIHAR • SIRF GENTS CLOTH STORE
            </p>
          </div>
          <p className="text-white/60 text-sm max-w-md">
            Punpun market mein sthit hamare showroom par aakar trial karein aur behtareen Gents kapde khareedein.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card (5 cols) */}
          <div className="lg:col-span-5 liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 shadow-xl space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl text-white font-medium mb-1">
                  Dharmendra Garments
                </h3>
                <p className="text-amber-300 text-xs uppercase tracking-wider font-bold">
                  Sirf Gents Cloth (Men&apos;s Wear)
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="liquid-glass rounded-xl p-2.5 text-amber-300 border border-white/10 flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-1 font-semibold">
                    Showroom Ka Pata
                  </h4>
                  <p className="text-white text-base font-semibold leading-relaxed">
                    BLOCK ROAD, PUNPUN, PATNA, BIHAR
                  </p>
                  <p className="text-xs text-white/50 mt-1">
                    Near Punpun Block / Market, Bihar
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="liquid-glass rounded-xl p-2.5 text-amber-300 border border-white/10 flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-1 font-semibold">
                    Timing
                  </h4>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Mon – Sun: 9:00 AM – 9:00 PM (Rozana Open)
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="liquid-glass rounded-xl p-2.5 text-amber-300 border border-white/10 flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-1 font-semibold">
                    Mobile / WhatsApp Contact
                  </h4>
                  <p className="text-amber-200 text-xl font-bold font-mono">
                    +91 9386432892
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">
                    Call ya WhatsApp par kisi bhi waqt baat karein
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <a
                href={exactMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-black hover:bg-amber-100 font-semibold py-3.5 px-5 rounded-full text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-black" />
                <span>Google Maps Par Location Kholein</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full liquid-glass border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-medium py-3 px-5 rounded-full text-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Par Inquiry (+91 9386432892)</span>
              </a>
            </div>
          </div>

          {/* Right Map Embed (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 relative min-h-[380px] bg-zinc-950 flex flex-col items-center justify-between shadow-2xl p-4 sm:p-6">
            <iframe
              title="Dharmendra Garments Block Road Punpun Patna Map"
              src="https://maps.google.com/maps?q=Punpun,+Patna,+Bihar&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px', borderRadius: '1rem' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover filter contrast-125 mb-4"
            />

            <div className="w-full flex items-center justify-between text-xs text-white/60 bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="font-mono text-amber-300">{exactMapsUrl}</span>
              <a
                href={exactMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline flex items-center gap-1 font-medium"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
