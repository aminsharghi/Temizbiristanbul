import React, { useState } from 'react';
import { IMAGES } from '../assets/images';
import { HeartHandshake, MapPin, Sparkles, ArrowRight, CheckCircle2, Waves, Trees, Compass, Users, Award } from 'lucide-react';

interface HeroProps {
  onOpenVolunteer: () => void;
  onOpenReport: () => void;
  onExploreEvents: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenVolunteer,
  onOpenReport,
  onExploreEvents,
}) => {
  const [activePhotoTab, setActivePhotoTab] = useState<'panoramic' | 'volunteers' | 'coastal'>('panoramic');

  const landmarkGalleries = [
    {
      id: 'panoramic',
      title: 'Boğaz & Tarihi Yarımada',
      subtitle: 'Kız Kulesi ve Masmavi Marmara',
      image: IMAGES.istanbulPanoramic,
      fallback: IMAGES.publicFallback.istanbulPanoramic,
      badge: 'Boğaz Hattı',
      activeCount: '18 Aktif Ekip',
    },
    {
      id: 'volunteers',
      title: 'Gönüllüler Sahada',
      subtitle: 'Kıyı ve Sahil Temizlik Seferi',
      image: IMAGES.volunteersAction,
      fallback: IMAGES.publicFallback.volunteersAction,
      badge: 'Gönüllü Hareketi',
      activeCount: '1.640+ Gönüllü',
    },
    {
      id: 'coastal',
      title: 'Ortaköy & Zümrüt Kıyılar',
      subtitle: 'Doğal Güzellikler ve Temiz Hava',
      image: IMAGES.istanbulBosphorus,
      fallback: IMAGES.publicFallback.istanbulBosphorus,
      badge: 'Mavi Koruma',
      activeCount: '48 Temizlenmiş Nokta',
    },
  ];

  const currentGallery = landmarkGalleries.find((g) => g.id === activePhotoTab) || landmarkGalleries[0];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-900 text-white pt-8 pb-16 lg:py-20">
      
      {/* Background ambient lighting and particle effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top visual pill strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>İstanbul Doğasını ve Kıyılarını Birlikte Kurtarıyoruz</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Avrupa & Anadolu Yakası 39 İlçe</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Sıfır Atık Seferberliği</span>
            </span>
          </div>
        </div>

        {/* Hero Title and Main Visual Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Slogan, Title and CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] text-balance">
                “Temiz bir İstanbul,{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                  birlikte atılan küçük adımlarla
                </span>{' '}
                başlar.”
              </h1>
              
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
                İstanbul’un masmavi Boğaz sularından Belgrad Ormanı’nın yeşil dokusuna; kıyılarımızı, parklarımızı ve sokaklarımızı plastik ve atıklardan arındırıyoruz. Çevrene duyarlı ol, gördüğün kirli noktayı bildir veya temizlik ekibimize katıl!
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenVolunteer}
                className="flex items-center gap-2.5 px-7 py-4 text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:scale-102 transition-all transform active:scale-98"
              >
                <HeartHandshake className="w-5 h-5" />
                <span>Gönüllü Olarak Katıl</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenReport}
                className="flex items-center gap-2 px-6 py-4 text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl shadow-md transition-all hover:border-amber-400/60"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Kirli Alan Bildir</span>
              </button>

              <button
                onClick={onExploreEvents}
                className="flex items-center gap-1.5 px-4 py-4 text-sm font-semibold text-emerald-300 hover:text-white underline underline-offset-4 transition-colors"
              >
                <span>Temizlik Haritası</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Indicators & Guarantees */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Eldiven ve Ekipman Sağlanır</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span>Boğaz & Kıyı Seferberliği</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-teal-400" />
                <span>Orman Koruma Birlikleri</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Composite & Interactive Photographic Showcase */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Featured Panoramic Visual Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 group bg-slate-950">
              
              {/* The Hero Image */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <img
                  src={currentGallery.image}
                  alt={currentGallery.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback to public folder if asset path is remapped
                    (e.target as HTMLImageElement).src = currentGallery.fallback;
                  }}
                  referrerPolicy="no-referrer"
                />

                {/* Gradient Scrim for perfect legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Badge on image */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-emerald-500/90 text-white backdrop-blur-md shadow-md border border-white/20">
                    {currentGallery.badge}
                  </span>
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-black/60 text-emerald-300 backdrop-blur-md border border-white/10">
                    {currentGallery.activeCount}
                  </span>
                </div>

                {/* Floating Bottom Card Details on Image */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-white drop-shadow-sm">
                      {currentGallery.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5">
                      {currentGallery.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={onExploreEvents}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-400 transition-colors shadow-sm"
                  >
                    Bölgeyi Gör
                  </button>
                </div>
              </div>

              {/* Floating Overlapping Mini Volunteer Card */}
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-emerald-400/40 shadow-xl hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Aktif Saha</div>
                  <div className="text-xs font-bold text-white">42 Gönüllü Şu An Temizlikte</div>
                </div>
              </div>

            </div>

            {/* Interactive Miniature Visual Gallery Switcher (Thumbnails) */}
            <div className="grid grid-cols-3 gap-3">
              {landmarkGalleries.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePhotoTab(item.id as any)}
                  className={`group relative rounded-2xl overflow-hidden border-2 text-left p-1.5 transition-all ${
                    activePhotoTab === item.id
                      ? 'border-emerald-400 bg-white/15 scale-102 ring-2 ring-emerald-400/50'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="relative h-16 rounded-xl overflow-hidden mb-1.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = item.fallback;
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/25" />
                  </div>
                  <div className="px-1 truncate">
                    <div className="text-[11px] font-bold text-white truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-emerald-300 truncate">
                      {item.badge}
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Full-width KPI Impact Strip with Visual Accents */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-emerald-500/30 shadow-lg hover:border-emerald-400 transition-colors">
            <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-emerald-400">
              14.250+
            </div>
            <div className="text-xs font-bold text-white mt-1">Toplanan Katı Atık (Kg)</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Plastik, cam, metal ayrıştırıldı</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-cyan-500/30 shadow-lg hover:border-cyan-400 transition-colors">
            <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-cyan-300">
              48
            </div>
            <div className="text-xs font-bold text-white mt-1">Temizlenen Kıyı & Orman</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Eski doğal güzelliğine kavuştu</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-teal-500/30 shadow-lg hover:border-teal-400 transition-colors">
            <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-teal-300">
              1.640+
            </div>
            <div className="text-xs font-bold text-white mt-1">Kayıtlı Çevre Gönüllüsü</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Saha çalışmalarında görev aldı</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-amber-500/30 shadow-lg hover:border-amber-400 transition-colors">
            <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-amber-400">
              112
            </div>
            <div className="text-xs font-bold text-white mt-1">Çözüme Ulaşan Bildirim</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Vatandaş ihbarları temizlendi</div>
          </div>
        </div>

      </div>
    </section>
  );
};
