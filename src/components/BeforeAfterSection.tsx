import React, { useState, useRef } from 'react';
import { BeforeAfterStory } from '../types';
import { Split, Columns, Sparkles, MapPin, Calendar, Weight, Users, ArrowRight } from 'lucide-react';

interface BeforeAfterSectionProps {
  stories: BeforeAfterStory[];
  onOpenVolunteer: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  stories,
  onOpenVolunteer,
}) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [viewMode, setViewMode] = useState<'slider' | 'sideBySide'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const current = stories[selectedStoryIndex] || stories[0];

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  return (
    <section id="before-after" className="py-16 bg-slate-50 border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Görsel Değişim & Başarı Hikayeleri</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Öncesi ve Sonrası: İstanbul Nefes Alıyor
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Gönüllülerimizin özverili çalışmalarıyla kirlilikten arındırılan kıyı ve orman noktalarımızın somut dönüşümü.
            </p>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
            <button
              onClick={() => setViewMode('slider')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'slider'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Split className="w-3.5 h-3.5" />
              <span>Sürgülü Karşılaştırma</span>
            </button>
            <button
              onClick={() => setViewMode('sideBySide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'sideBySide'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Yan Yana Görünüm</span>
            </button>
          </div>
        </div>

        {/* Story Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {stories.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => {
                setSelectedStoryIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all border ${
                selectedStoryIndex === idx
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {story.location}
            </button>
          ))}
        </div>

        {/* Comparison Display */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
          
          {/* Story Details Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {current.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1 text-slate-700 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  {current.location}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {current.date}
                </span>
                <span>·</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium">
                  {current.category}
                </span>
              </div>
            </div>

            {/* Impact Badges */}
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-center">
                <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
                  <Weight className="w-3 h-3 text-emerald-600" /> Toplanan
                </div>
                <div className="text-sm font-extrabold font-mono text-emerald-700">
                  {current.collectedKg} kg
                </div>
              </div>

              <div className="bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-xl text-center">
                <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
                  <Users className="w-3 h-3 text-cyan-600" /> Gönüllü
                </div>
                <div className="text-sm font-extrabold font-mono text-cyan-700">
                  {current.volunteersJoined} kişi
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Area */}
          {viewMode === 'slider' ? (
            /* Interactive Split Slider */
            <div className="space-y-3">
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full h-80 sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-slate-900 border border-slate-200 shadow-inner group"
              >
                {/* Background Image: AFTER (Clean) */}
                <img
                  src={current.afterImage}
                  alt={`${current.location} Temizlik Sonrası`}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-md pointer-events-none">
                  ✓ SONRASI (Temizlendi)
                </div>

                {/* Foreground Image: BEFORE (Dirty) with clipping */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={current.beforeImage}
                    alt={`${current.location} Temizlik Öncesi Kirlilik`}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-amber-600/90 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-md pointer-events-none">
                    ✕ ÖNCESİ (Kirli Durum)
                  </div>
                </div>

                {/* Draggable Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-white text-emerald-800 rounded-full shadow-xl flex items-center justify-center font-bold text-xs border-2 border-emerald-600">
                    ↔
                  </div>
                </div>
              </div>

              {/* Slider instruction / Range Bar */}
              <div className="flex items-center gap-4 px-2">
                <span className="text-xs font-semibold text-amber-700 whitespace-nowrap">
                  Öncesi (Kirli)
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                  aria-label="Karşılaştırma sürgüsü"
                />
                <span className="text-xs font-semibold text-emerald-700 whitespace-nowrap">
                  Sonrası (Temiz)
                </span>
              </div>
            </div>
          ) : (
            /* Side-by-Side View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 group">
                <img
                  src={current.beforeImage}
                  alt="Öncesi Kirli Durum"
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-102 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-amber-600/90 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-md">
                  ÖNCESİ: Kirli ve Atık Dolu
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 text-white">
                  <p className="text-xs text-slate-200">
                    Kıyı boyunca birikmiş plastik şişeler, poşetler ve terk edilmiş atıklar.
                  </p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-200 group">
                <img
                  src={current.afterImage}
                  alt="Sonrası Temizlenmiş Durum"
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-102 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-emerald-600/90 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-md">
                  SONRASI: Tertemiz ve Doğal
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 text-white">
                  <p className="text-xs text-slate-200">
                    Gönüllülerimizin titiz çalışması sonucu temizlenip doğaya iade edilen sahil.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Narrative Summary & Action */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {current.summary}
            </p>
            <button
              onClick={onOpenVolunteer}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Ben de Bir Bölgeyi Temizlemek İstiyorum</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
