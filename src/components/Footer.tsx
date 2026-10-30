import React from 'react';
import { Leaf, Heart, PhoneCall, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Slogan */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                TEMİZ İSTANBUL
              </span>
            </div>

            <p className="text-sm text-slate-300 font-medium italic border-l-2 border-emerald-500 pl-3">
              “Temiz bir İstanbul, birlikte atılan küçük adımlarla başlar.”
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              İstanbul ve çevresindeki çevre kirliliğini azaltmak, kirli alanların temizlenmesini sağlamak ve çevreye duyarlı gönüllüleri bir araya getirmek için kurulmuş bağımsız sosyal sorumluluk platformu.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>39 İlçede Şeffaf & Doğrudan Saha Faaliyeti</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform Bölümleri
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('events')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Temizlik Etkinlikleri & Harita
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('before-after')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Öncesi ve Sonrası Dönüşüm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('report')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Kirli Alan Bildir
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('volunteer')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Gönüllü Kayıt Formu
                </button>
              </li>
            </ul>
          </div>

          {/* Communication & Hotline */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Çevre İhbar & İletişim
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Alo 181 Çevre, Şehircilik ve İklim Hattı</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>gonullu@temizistanbul.org</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>İstanbul / Türkiye</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] font-semibold text-slate-400 hover:text-emerald-400 underline transition-colors"
              >
                Yönetici İnceleme Paneli (Simülasyon Girişi)
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 ÇEVRE KİRLİLİGİ - Temiz İstanbul Projesi. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-2">
            <span>Hazırlayan: <strong>AMİN SHARGHİ</strong></span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">Doğa İçin Birlikte</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
