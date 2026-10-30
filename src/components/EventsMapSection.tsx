import React, { useState } from 'react';
import { CleanupEvent, PollutionType, CleanupStatus } from '../types';
import { ISTANBUL_DISTRICTS } from '../data/mockData';
import { MapPin, Users, Calendar, Filter, CheckCircle2, AlertCircle, Sparkles, Navigation } from 'lucide-react';

interface EventsMapSectionProps {
  events: CleanupEvent[];
  onJoinEvent: (eventId: string) => void;
  onOpenReport: () => void;
}

export const EventsMapSection: React.FC<EventsMapSectionProps> = ({
  events,
  onJoinEvent,
  onOpenReport,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(events[0]?.id || null);

  const filteredEvents = events.filter((evt) => {
    if (selectedDistrict !== 'all' && evt.district !== selectedDistrict) return false;
    if (selectedType !== 'all' && evt.pollutionType !== selectedType) return false;
    if (selectedStatus !== 'all' && evt.status !== selectedStatus) return false;
    return true;
  });

  const activeEvent = events.find((e) => e.id === selectedEventId) || filteredEvents[0] || events[0];

  const getStatusBadgeClass = (status: CleanupStatus) => {
    switch (status) {
      case 'Gönüllü Aranıyor':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Temizlik Planlandı':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Devam Ediyor':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'Temizlendi':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <section id="events" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-2">
              <Navigation className="w-3.5 h-3.5" />
              <span>Saha Harekatı & Temizlik Haritası</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Onaylanan Temizlik Bölgeleri ve Etkinlikler
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Yönetici tarafından onaylanan kirli alanlar temizlik planına alınır. Harita üzerinden size en yakın bölgeyi seçip gönüllü ekibe katılabilirsiniz.
            </p>
          </div>

          <button
            onClick={onOpenReport}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors shrink-0 self-start md:self-auto"
          >
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>Yeni Kirli Alan Bildir</span>
          </button>
        </div>

        {/* Filters Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mr-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span>Filtrele:</span>
          </div>

          {/* District Filter */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Tüm İstanbul İlçeleri ({events.length})</option>
            {ISTANBUL_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Pollution Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Tüm Kirlilik Türleri</option>
            <option value="Sahil Temizliği">Sahil Temizliği</option>
            <option value="Orman Temizliği">Orman Temizliği</option>
            <option value="Park ve Bahçe Temizliği">Park ve Bahçe Temizliği</option>
            <option value="Sokak Temizliği">Sokak Temizliği</option>
            <option value="Atık Toplama">Atık Toplama</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="Gönüllü Aranıyor">Gönüllü Aranıyor</option>
            <option value="Temizlik Planlandı">Temizlik Planlandı</option>
            <option value="Devam Ediyor">Devam Ediyor</option>
            <option value="Temizlendi">Temizlendi</option>
          </select>

          {(selectedDistrict !== 'all' || selectedType !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSelectedDistrict('all');
                setSelectedType('all');
                setSelectedStatus('all');
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium underline ml-auto"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>

        {/* Interactive Istanbul Map & Selected Point Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Interactive Stylized Istanbul Map */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 text-white border border-teal-800/50 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            {/* Top map info */}
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  İstanbul Etkinlik Haritası
                </span>
                <p className="text-[11px] text-slate-300">
                  Noktalara tıklayarak etkinlik detayını görüntüleyin
                </p>
              </div>
              <div className="text-xs bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                {filteredEvents.length} Aktif Lokasyon
              </div>
            </div>

            {/* Stylized Visual Bosphorus Silhouette Canvas / Map Graphic */}
            <div className="relative my-6 h-60 w-full rounded-2xl bg-slate-950/60 border border-teal-800/30 overflow-hidden">
              
              {/* Stylized Sea / Bosphorus Channel */}
              <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Marmara Sea & Black Sea & Bosphorus S-curve */}
                <path
                  d="M 0,75 Q 30,70 48,60 T 52,40 Q 50,20 60,0 L 100,0 L 100,100 L 0,100 Z"
                  fill="#0284c7"
                />
                {/* European side land */}
                <path
                  d="M 0,0 L 55,0 Q 48,25 45,45 Q 40,55 0,65 Z"
                  fill="#065f46"
                />
                {/* Asian side land */}
                <path
                  d="M 65,0 Q 55,25 56,45 Q 60,60 100,68 L 100,0 Z"
                  fill="#047857"
                />
                {/* Golden Horn / Haliç */}
                <path
                  d="M 45,47 Q 35,46 25,48"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>

              {/* Geographic Label Watermarks */}
              <div className="absolute top-3 left-4 text-[10px] font-mono text-emerald-300/60 uppercase tracking-widest pointer-events-none">
                Avrupa Yakası (Belgrad Ormanı / Sarıyer)
              </div>
              <div className="absolute top-3 right-4 text-[10px] font-mono text-emerald-300/60 uppercase tracking-widest pointer-events-none">
                Anadolu Yakası (Beykoz / Şile)
              </div>
              <div className="absolute bottom-2 left-4 text-[10px] font-mono text-cyan-300/60 uppercase tracking-widest pointer-events-none">
                Marmara Denizi & Haliç
              </div>
              <div className="absolute bottom-2 right-4 text-[10px] font-mono text-cyan-300/60 uppercase tracking-widest pointer-events-none">
                Prens Adaları & Kadıköy
              </div>

              {/* Interactive Event Pins */}
              {events.map((evt) => {
                const isSelected = activeEvent?.id === evt.id;
                return (
                  <button
                    key={evt.id}
                    onClick={() => setSelectedEventId(evt.id)}
                    style={{ left: `${evt.mapCoords.x}%`, top: `${evt.mapCoords.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all z-20 focus:outline-none`}
                    title={`${evt.district} - ${evt.title}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span className="absolute w-8 h-8 rounded-full bg-emerald-400/50 animate-ping" />
                      )}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                          isSelected
                            ? 'bg-emerald-400 text-slate-950 scale-125 ring-2 ring-white'
                            : 'bg-emerald-600 text-white hover:scale-110'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Pin micro label */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none ${
                        isSelected
                          ? 'bg-emerald-400 text-slate-950'
                          : 'bg-slate-900/90 text-white opacity-0 group-hover:opacity-100 transition-opacity'
                      }`}
                    >
                      {evt.district}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="relative z-10 flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Gönüllü Aranıyor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Temizlik Planlandı</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Devam Eden Saha</span>
              </div>
            </div>
          </div>

          {/* Right Spotlight Card for the Selected Map Point */}
          <div className="lg:col-span-5">
            {activeEvent ? (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl flex flex-col justify-between h-full space-y-4">
                <div className="space-y-4">
                  
                  {/* Photo with Overlay status */}
                  <div className="relative rounded-2xl overflow-hidden h-48 bg-slate-100">
                    <img
                      src={activeEvent.photoUrl}
                      alt={activeEvent.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusBadgeClass(activeEvent.status)}`}>
                        {activeEvent.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {activeEvent.pollutionType}
                    </div>
                  </div>

                  {/* Title and details */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {activeEvent.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-semibold text-slate-800">{activeEvent.district}</span>
                      <span>·</span>
                      <span className="text-slate-500">{activeEvent.neighborhood}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {activeEvent.fullAddress}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeEvent.description}
                  </p>

                  {/* Volunteer progress bar */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-700 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                        Gönüllü Katılımı
                      </span>
                      <span className="font-mono text-emerald-700">
                        {activeEvent.currentVolunteers} / {activeEvent.volunteerTarget} Kişi
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (activeEvent.currentVolunteers / activeEvent.volunteerTarget) * 100)}%`
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {activeEvent.eventDate}
                      </span>
                      {activeEvent.currentVolunteers >= activeEvent.volunteerTarget ? (
                        <span className="text-emerald-700 font-bold">Kontenjan Dolmak Üzere</span>
                      ) : (
                        <span className="text-emerald-600 font-medium">
                          {activeEvent.volunteerTarget - activeEvent.currentVolunteers} gönüllü daha gerekiyor
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Action button */}
                <button
                  onClick={() => onJoinEvent(activeEvent.id)}
                  disabled={activeEvent.status === 'Temizlendi'}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                    activeEvent.status === 'Temizlendi'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/20 active:scale-98'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {activeEvent.status === 'Temizlendi'
                      ? 'Bu Bölge Başarıyla Temizlendi'
                      : 'Bu Bölgede Temizliğe Katıl'}
                  </span>
                </button>
              </div>
            ) : null}
          </div>

        </div>

        {/* Full Grid of All Approved Cleanup Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Tüm Temizlik Faaliyetleri ({filteredEvents.length})
            </h3>
            <span className="text-xs text-slate-500">
              Fotoğraf ve durum bilgileri günceldir
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  {/* Photo & badge */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={evt.photoUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getStatusBadgeClass(evt.status)}`}>
                        {evt.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-0.5 rounded-md text-[11px] font-semibold">
                      {evt.pollutionType}
                    </div>
                  </div>

                  {/* Body info */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                        {evt.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-slate-600 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-semibold">{evt.district}</span>
                        <span>·</span>
                        <span className="text-slate-500 truncate">{evt.neighborhood}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>

                    {/* Participation bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-slate-600">Gönüllü Katılımı</span>
                        <span className="font-mono text-emerald-700">
                          {evt.currentVolunteers}/{evt.volunteerTarget}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{
                            width: `${Math.min(100, (evt.currentVolunteers / evt.volunteerTarget) * 100)}%`
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.eventDate}</span>
                    </div>
                  </div>
                </div>

                {/* Action footer */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onJoinEvent(evt.id)}
                    disabled={evt.status === 'Temizlendi'}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      evt.status === 'Temizlendi'
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-200'
                    }`}
                  >
                    <span>{evt.status === 'Temizlendi' ? 'Tamamlandı' : 'Bu Temizliğe Katıl'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
