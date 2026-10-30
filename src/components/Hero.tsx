import React from 'react';
import { HeartHandshake, MapPin, Sparkles, ArrowRight, CheckCircle2, Waves, Trees } from 'lucide-react';

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
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-emerald-50/60 via-teal-50/30 to-white">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission, Slogan & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mission Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>İstanbul Çevre ve Kıyı Temizliği Hareketi</span>
            </div>

            {/* Main Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              “Temiz bir İstanbul,{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                birlikte atılan küçük adımlarla
              </span>{' '}
              başlar.”
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Boğazın mavi sularından Belgrad Ormanı’nın yeşil patikalarına; kıyılarımızı, parklarımızı ve sokaklarımızı kirlilikten arındırıyoruz. Çevrene duyarlı ol, gördüğün kirli noktayı bildir veya temizlik ekibimize katılarak İstanbul’un geleceğine nefes ol.
            </p>

            {/* Key Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenVolunteer}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 transition-all transform active:scale-98"
              >
                <HeartHandshake className="w-5 h-5" />
                <span>Gönüllü Olarak Katıl</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenReport}
                className="flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs hover:border-slate-400 transition-all"
              >
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Kirli Alan Bildir</span>
              </button>

              <button
                onClick={onExploreEvents}
                className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline transition-all"
              >
                <span>Temizlik Bölgelerini İncele</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust markers */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>39 İlçede Koordinasyon</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-cyan-600" />
                <span>Deniz & Sahil Seferberliği</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-teal-600" />
                <span>Orman & Park Rehabilitasyonu</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composite of Istanbul Beauty & Volunteer Spirit */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Visual: Istanbul Bosphorus Clear Nature */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src="/src/assets/images/istanbul_bosphorus_clean_nature_1793362602758.jpg"
                  alt="İstanbul Boğazı berrak deniz ve yemyeşil sahil parkı"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Doğal Zenginliğimiz İstanbul</span>
                  </div>
                  <h3 className="font-bold text-lg leading-tight text-white drop-shadow-sm">
                    Mavi ve Yeşilin Buluştuğu Eşsiz Boğaz
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                    Geleceğe bırakacağımız en değerli miras, temiz denizler ve nefes alan kıyılardır.
                  </p>
                </div>
              </div>

              {/* Floating Overlapping Card: Volunteer Action */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-emerald-100 max-w-[280px] sm:max-w-[310px] hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-emerald-200">
                    <img
                      src="/src/assets/images/volunteers_cleaning_istanbul_1793362604700.jpg"
                      alt="İstanbul çevre gönüllüleri temizlikte"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      Gönüllü Hareketi
                    </div>
                    <div className="text-xs font-semibold text-slate-800 truncate">
                      Kız Kulesi & Moda Sahili
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Bu hafta 140+ yeni gönüllü katıldı
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Accent Badge: Active districts */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-amber-500 to-orange-600 text-white px-4 py-2 rounded-xl shadow-lg text-xs font-bold flex items-center gap-1.5">
                <span>39 İlçe El Ele</span>
              </div>

            </div>
          </div>

        </div>

        {/* Full-width KPI Impact Strip */}
        <div className="mt-14 pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-700">
              14.250+
            </div>
            <div className="text-xs font-semibold text-slate-800 mt-1">Toplanan Katı Atık (Kg)</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Plastik, cam, metal ayrıştırıldı</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-cyan-100 shadow-xs hover:border-cyan-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-cyan-700">
              48
            </div>
            <div className="text-xs font-semibold text-slate-800 mt-1">Temizlenen Kıyı & Orman</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Eski doğal haline kavuştu</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-xs hover:border-teal-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-teal-700">
              1.640+
            </div>
            <div className="text-xs font-semibold text-slate-800 mt-1">Aktif Çevre Gönüllüsü</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Saha ekiplerinde görev alıyor</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs hover:border-amber-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-600">
              112
            </div>
            <div className="text-xs font-semibold text-slate-800 mt-1">Çözüme Ulaşan Bildirim</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Vatandaş bildirimleri tamamlandı</div>
          </div>
        </div>

      </div>
    </section>
  );
};
