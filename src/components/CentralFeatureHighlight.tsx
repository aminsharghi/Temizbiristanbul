import React, { useState } from 'react';
import { Waves, Trees, Trash2, ArrowRight, ShieldCheck, Sparkles, Flame, Users, CheckCircle } from 'lucide-react';

interface CentralFeatureHighlightProps {
  onSelectType: (type: string) => void;
  onOpenVolunteer: () => void;
  onOpenReport: () => void;
}

export const CentralFeatureHighlight: React.FC<CentralFeatureHighlightProps> = ({
  onSelectType,
  onOpenVolunteer,
  onOpenReport,
}) => {
  const [activePillar, setActivePillar] = useState<'coastal' | 'forest' | 'urban'>('coastal');

  const pillars = [
    {
      id: 'coastal',
      badge: 'Mavi Seferberlik',
      title: 'Sahil ve Boğaz Kıyıları',
      icon: Waves,
      tagline: 'Marmara Denizi ve İstanbul Boğazı mikroplastik ve katı atıklardan arınıyor.',
      themeColor: 'from-cyan-500 to-blue-600',
      accentBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      stats: '18 Kıyı Noktasında Aktif',
      highlightMetric: '7.840 kg',
      highlightLabel: 'Deniz & Sahil Atığı Toplandı',
      keyActionText: 'Sahil Temizliklerine Katıl',
      cleanupType: 'Sahil Temizliği',
      points: [
        'Kayalık aralarına sıkışmış plastik şişe ve ambalajların taranması',
        'Terkedilmiş hayalet balıkçı ağlarının güvenle toplanması',
        'Kıyı şeridi izmarit ve meşrubat kutusu temizliği'
      ]
    },
    {
      id: 'forest',
      badge: 'Yeşil Seferberlik',
      title: 'Kentsel Ormanlar & Korular',
      icon: Trees,
      tagline: 'Belgrad Ormanı, Aydos, Polonezköy ve korularımızda yangın riski yaratan cam ve atıkları topluyoruz.',
      themeColor: 'from-emerald-500 to-teal-600',
      accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      stats: '14 Tabiat Alanında Aktif',
      highlightMetric: '4.910 kg',
      highlightLabel: 'Orman Atığı & Kırık Cam Arındırıldı',
      keyActionText: 'Orman Temizliklerine Katıl',
      cleanupType: 'Orman Temizliği',
      points: [
        'Güneş ışığında mercek etkisiyle yangın çıkaran cam kırıklarının temizliği',
        'Piknik alanları çevresinde plastik ve ambalaj arındırma',
        'Yaban hayatı koridoru ve dere yataklarının korunması'
      ]
    },
    {
      id: 'urban',
      badge: 'Sıfır Atık Hareketi',
      title: 'Parklar, Sokaklar ve Mahalleler',
      icon: Trash2,
      tagline: 'Mahalle sakinleri ve esnafla el ele: Daha temiz sokaklar ve sağlıklı çocuk oyun parkları.',
      themeColor: 'from-amber-500 to-orange-600',
      accentBg: 'bg-amber-50 text-amber-900 border-amber-200',
      stats: '22 Mahalle Parkında Aktif',
      highlightMetric: '3.120 kg',
      highlightLabel: 'Geri Dönüştürülebilir Atık Ayrıştırıldı',
      keyActionText: 'Park & Sokak Temizliğine Katıl',
      cleanupType: 'Park ve Bahçe Temizliği',
      points: [
        'Çocuk oyun alanları ve yürüyüş parkurlarından zararlı maddelerin toplanması',
        'Sokak hayvanları için tehlike yaratan kesici atıkların bertarafı',
        'Yerinde atık ayrıştırma ve kompost atölyeleri düzenleme'
      ]
    }
  ];

  const current = pillars.find((p) => p.id === activePillar) || pillars[0];
  const IconComponent = current.icon;

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background soft ambient glows with green, turquoise, blue, orange */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-cyan-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 via-cyan-100 to-amber-100 border border-slate-200 text-xs font-bold text-slate-800 mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>İstanbul Çevre Temizliği Eylem Merkezi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            İstanbul’un Doğasını Koruyan Üç Büyük Temizlik Seferberliği
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
            Gönüllülerimiz ve çevre dostu vatandaşlarımız her hafta şehrimizin kritik noktalarında bir araya gelerek kirliliğe dur diyor.
          </p>
        </div>

        {/* Central Aesthetic Showcase Container (Canlı ve Dikkat Çekici Merkez Alan) */}
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-teal-800/40 relative overflow-hidden">
          
          {/* Subtle colorful decorative gradients inside container */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Interactive Navigation Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 relative z-10">
            {pillars.map((pillar) => {
              const PIcon = pillar.icon;
              const isActive = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id as any)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all transform active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r ' + pillar.themeColor + ' text-white shadow-lg scale-102 ring-2 ring-white/30'
                      : 'bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <PIcon className="w-4 h-4 sm:w-5 h-5 shrink-0" />
                  <span>{pillar.title}</span>
                </button>
              );
            })}
          </div>

          {/* Main Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/20 text-emerald-300 border border-white/20">
                  {current.badge}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {current.stats}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {current.title} için El Ele Veriyoruz
              </h3>

              <p className="text-slate-300 text-base leading-relaxed">
                {current.tagline}
              </p>

              {/* Focus Points List */}
              <div className="space-y-3 pt-2">
                {current.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-slate-200">{point}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    onSelectType(current.cleanupType);
                    onOpenVolunteer();
                  }}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r ${current.themeColor} text-white shadow-lg hover:brightness-110 transition-all`}
                >
                  <Users className="w-4 h-4" />
                  <span>{current.keyActionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenReport}
                  className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                >
                  Bu Alanda Kirlilik Bildir
                </button>
              </div>
            </div>

            {/* Right Metric & Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-xl space-y-6">
                
                {/* Big Metric Display */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>Seferberlik Etki Raporu</span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-white">
                    {current.highlightMetric}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    {current.highlightLabel}
                  </div>
                </div>

                <div className="h-px bg-white/15" />

                {/* Progress bar and encouragement */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">2026 Sezonu Temizlik Hedefi</span>
                    <span className="text-emerald-300 font-bold">%84 Tamamlandı</span>
                  </div>
                  <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full rounded-full w-[84%]" />
                  </div>
                </div>

                {/* Micro Guarantee Box */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-xs text-slate-300 leading-snug">
                    Tüm temizlik ekipmanları (çöp tutucu penseler, eldivenler, dayanıklı torbalar ve su ikramı) etkinlik alanında ücretsiz temin edilir.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
